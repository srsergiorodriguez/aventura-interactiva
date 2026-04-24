<script>
  import { i18n } from '../lib/i18n.svelte.js';

  let { 
    isOpen = false, 
    nodeData, 
    onSave, 
    onClose 
  } = $props();

  let imgRef;
  let containerRef;
  
  let workingAreas = $state([]);
  let isDrawing = $state(false);
  let startX = $state(0);
  let startY = $state(0);
  let currentBox = $state(null);
  let imgLoaded = $state(false);

  $effect(() => {
    if (isOpen && nodeData && nodeData.data) {
      workingAreas = JSON.parse(JSON.stringify(nodeData.data.areas || []));
      imgLoaded = false;
    }
  });

  function getMousePos(e) {
    const rect = imgRef.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    return { x, y };
  }

  function handlePointerDown(e) {
    if (!imgLoaded) return;
    isDrawing = true;
    const pos = getMousePos(e);
    startX = pos.x;
    startY = pos.y;
    currentBox = { x: startX, y: startY, w: 0, h: 0 };
  }

  function handlePointerMove(e) {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    
    currentBox = {
      x: Math.min(pos.x, startX),
      y: Math.min(pos.y, startY),
      w: Math.abs(pos.x - startX),
      h: Math.abs(pos.y - startY)
    };
  }

  function handlePointerUp() {
    if (!isDrawing) return;
    isDrawing = false;
    
    if (currentBox && currentBox.w > 10 && currentBox.h > 10) {
      const scaleX = imgRef.naturalWidth / imgRef.width;
      const scaleY = imgRef.naturalHeight / imgRef.height;
      const nextNumber = workingAreas.length + 1;
      
      const scaledW = currentBox.w * scaleX;
      const scaledH = currentBox.h * scaleY;
      const scaledTopLeftX = currentBox.x * scaleX;
      const scaledTopLeftY = currentBox.y * scaleY;
      
      workingAreas.push({
        name: `area ${nextNumber}`, 
        btn: "", 
        tooltip: "", 
        x: Math.round(scaledTopLeftX + (scaledW / 2)),
        y: Math.round(scaledTopLeftY + (scaledH / 2)),
        w: Math.round(scaledW),
        h: Math.round(scaledH)
      });
    }
    currentBox = null;
  }

  function handleSave() {
    onSave(workingAreas);
    onClose();
  }

  // --- DRAG & RESIZE LOGIC ---
  let draggingIdx = $state(null);
  let resizingIdx = $state(null);
  let dragStartX = $state(0);
  let dragStartY = $state(0);
  let startBounds = $state(null);

  function startBoxDrag(e, idx, type) {
    e.stopPropagation(); 
    if (type === 'resize') resizingIdx = idx; else draggingIdx = idx;
    
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    startBounds = { ...workingAreas[idx] };
    
    window.addEventListener('pointermove', handleBoxMove);
    window.addEventListener('pointerup', handleBoxUp);
  }

  function handleBoxMove(e) {
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    const scaleX = imgRef.naturalWidth / imgRef.width;
    const scaleY = imgRef.naturalHeight / imgRef.height;
    const natDx = dx * scaleX;
    const natDy = dy * scaleY;

    const area = workingAreas[draggingIdx !== null ? draggingIdx : resizingIdx];

    if (draggingIdx !== null) {
      let newCenterX = startBounds.x + natDx;
      let newCenterY = startBounds.y + natDy;

      area.x = Math.max(area.w / 2, Math.min(imgRef.naturalWidth - area.w / 2, Math.round(newCenterX)));
      area.y = Math.max(area.h / 2, Math.min(imgRef.naturalHeight - area.h / 2, Math.round(newCenterY)));
      
    } else if (resizingIdx !== null) {
      const startTLX = startBounds.x - startBounds.w / 2;
      const startTLY = startBounds.y - startBounds.h / 2;

      let newW = startBounds.w + natDx;
      let newH = startBounds.h + natDy;

      newW = Math.max(10, Math.min(imgRef.naturalWidth - startTLX, newW));
      newH = Math.max(10, Math.min(imgRef.naturalHeight - startTLY, newH));

      area.w = Math.round(newW);
      area.h = Math.round(newH);
      
      area.x = Math.round(startTLX + area.w / 2);
      area.y = Math.round(startTLY + area.h / 2);
    }
  }

  function handleBoxUp() {
    draggingIdx = null;
    resizingIdx = null;
    window.removeEventListener('pointermove', handleBoxMove);
    window.removeEventListener('pointerup', handleBoxUp);
  }
</script>

{#if isOpen && nodeData}
  <div class="modal-backdrop">
    <div class="modal-content">
      <header class="modal-header">
        <h3 style="margin: 0;">{i18n.t('draw_areas')} {nodeData.data.text ? nodeData.data.text.slice(0, 20) : i18n.t('no_text')}...</h3>
        <button class="btn-close" onclick={onClose}>x</button>
      </header>
      
      <div class="modal-body">
        <div class="canvas-wrapper">
          <div 
            class="drawing-container" 
            bind:this={containerRef}
            onpointerdown={handlePointerDown}
            onpointermove={handlePointerMove}
            onpointerup={handlePointerUp}
            onpointerleave={handlePointerUp}
          >
            <img 
              src={nodeData.data.image} 
              alt="scene map" 
              bind:this={imgRef} 
              draggable="false" 
              onload={() => imgLoaded = true} 
            />
            
            {#if imgLoaded && imgRef}
              {#each workingAreas as area, i}
                <div class="area-box" style="
                  left: {(area.x - area.w / 2) / (imgRef.naturalWidth / imgRef.width)}px; 
                  top: {(area.y - area.h / 2) / (imgRef.naturalHeight / imgRef.height)}px; 
                  width: {area.w / (imgRef.naturalWidth / imgRef.width)}px; 
                  height: {area.h / (imgRef.naturalHeight / imgRef.height)}px;
                  pointer-events: auto; 
                  cursor: move;"
                  onpointerdown={(e) => startBoxDrag(e, i, 'drag')}
                >
                  <span class="area-label">{area.name}</span>
                  {#if area.btn}
                    <div class="area-btn-preview">{area.btn}</div>
                  {/if}
                  <div class="resize-handle" onpointerdown={(e) => startBoxDrag(e, i, 'resize')}></div>
                </div>
              {/each}
              
              {#if currentBox}
                <div class="area-box area-box-active" style="left: {currentBox.x}px; top: {currentBox.y}px; width: {currentBox.w}px; height: {currentBox.h}px;"></div>
              {/if}
            {/if}
          </div>
        </div>

        <div class="sidebar-areas">
            <h4 class="ui-section-title" style="margin-top: 0;">{i18n.t('mapped_areas')}</h4>
            {#each workingAreas as area, i}
              <div class="area-edit-row">
                <label>{i18n.t('placeholder_name')}:</label>
                <input type="text" bind:value={area.name} />
                
                <label>{i18n.t('placeholder_btn')}:</label>
                <input type="text" bind:value={area.btn} placeholder={i18n.t('leave_empty')} />
                
                <label>{i18n.t('placeholder_tooltip')}:</label>
                <input type="text" bind:value={area.tooltip} />
                
                <button class="btn btn-danger w-full mt-1" onclick={() => workingAreas = workingAreas.filter((_, idx) => idx !== i)}>{i18n.t('btn_remove')}</button>
              </div>
            {/each}
          {#if workingAreas.length === 0}
            <p class="empty-state" style="font-size: 0.9rem;">{i18n.t('empty_area_msg')}</p>
          {/if}
        </div>
      </div>

      <footer class="modal-footer">
        <button class="btn btn-primary" onclick={handleSave}>{i18n.t('btn_save_areas')}</button>
      </footer>
    </div>
  </div>
{/if}

<style>
  /* Base Layout */
  .modal-backdrop { 
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
    background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; 
  }
  
  .modal-content { 
    background: var(--bg-color); border: var(--border-main); width: 90vw; height: 90vh; 
    max-width: 1200px; display: flex; flex-direction: column; box-shadow: 8px 8px 0px rgba(0,0,0,1); 
  }
  
  .modal-header, .modal-footer { 
    padding: 1rem; background: var(--text-color); color: var(--bg-color); 
    display: flex; justify-content: space-between; align-items: center; 
  }
  
  .modal-body { 
    flex-grow: 1; display: flex; overflow: hidden; 
  }
  
  .canvas-wrapper { 
    flex-grow: 1; background: #eee; padding: 1rem; overflow: auto; 
    display: flex; align-items: center; justify-content: center; 
  }

  .drawing-container { 
    position: relative; display: inline-block; cursor: crosshair; user-select: none;
    box-shadow: 4px 4px 0px rgba(0,0,0,1); 
  }

  .drawing-container img { 
    max-width: 100%; max-height: 70vh; display: block; user-select: none; pointer-events: none; 
  }

  .sidebar-areas { 
    width: 300px; border-left: var(--border-main); padding: 1rem; overflow-y: auto; background: var(--bg-color); 
  }
  
  .area-edit-row { 
    margin-bottom: 1rem; padding: 0.5rem; border: 1px dashed var(--text-color); 
  }
  
  .area-edit-row label { 
    font-size: 0.8rem; font-weight: bold; display: block; margin-top: 0.5rem; 
  }

  /* Interactive Elements */
  .area-box {
    position: absolute;
    border: dashed 2px var(--text-color);
    box-sizing: border-box;
    touch-action: none;
    background: rgba(255, 255, 255, 0.3);
  }

  .area-label {
    position: absolute;
    top: -24px;
    left: -2px;
    background: var(--text-color);
    color: var(--bg-color);
    padding: 2px 8px;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
  }

  .area-box-active {
    border-color: var(--accent-color);
    z-index: 10;
    background: rgba(0, 191, 255, 0.1);
  }

  .area-btn-preview {
    margin: auto;
    background: rgba(255,255,255,0.8);
    color: var(--text-color);
    padding: 2px 6px;
    font-size: 0.8rem;
    font-weight: bold;
    pointer-events: none;
  }

  .resize-handle {
    position: absolute;
    right: -6px; bottom: -6px;
    width: 12px; height: 12px;
    background: var(--text-color);
    cursor: se-resize;
  }

  .area-box:hover .resize-handle {
    background: var(--accent-color);
  }
</style>