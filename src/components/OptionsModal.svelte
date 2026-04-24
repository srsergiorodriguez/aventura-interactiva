<script>
  import { aventuraState } from '../state.svelte.js';
  import { i18n } from '../lib/i18n.svelte.js';

  let { isOpen = false, onClose } = $props();

  function handleIgramaUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        aventuraState.options.igrama = parsed;
      } catch (err) {
        alert("Failed to parse Igrama JSON file!");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div class="modal-content">
      <header class="modal-header">
        <h3 style="margin: 0;">{i18n.t('engine_opts')}</h3>
        <button class="btn-close" onclick={onClose}>x</button>
      </header>
      
      <div class="modal-body">
        
        <div class="control-group">
          <label>{i18n.t('typewriter_speed')}</label>
          <input type="number" bind:value={aventuraState.options.typewriterSpeed} min="0" />
        </div>
        
        <div class="checkbox-group">
          <label><input type="checkbox" bind:checked={aventuraState.options.evalTags} /> {i18n.t('enable_eval')}</label>
          <label><input type="checkbox" bind:checked={aventuraState.options.backBtn} /> {i18n.t('enable_back')}</label>
          <label><input type="checkbox" bind:checked={aventuraState.options.restartBtn} /> {i18n.t('enable_restart')}</label>
          <label><input type="checkbox" bind:checked={aventuraState.options.adventureScroll} /> {i18n.t('adventure_scroll')}</label>
        </div>

        <h4 class="ui-section-title" style="margin-top: 1rem;">{i18n.t('base_colors')}</h4>
        <div class="color-grid">
          <div class="control-group">
            <label>{i18n.t('background')}</label>
            <input type="color" class="color-picker" bind:value={aventuraState.options.theme.background} />
          </div>
          <div class="control-group">
            <label>{i18n.t('text_color')}</label>
            <input type="color" class="color-picker" bind:value={aventuraState.options.theme.text} />
          </div>
          <div class="control-group">
            <label>{i18n.t('accent_bg')}</label>
            <input type="color" class="color-picker" bind:value={aventuraState.options.theme.accentBackground} />
          </div>
          <div class="control-group">
            <label>{i18n.t('accent_text')}</label>
            <input type="color" class="color-picker" bind:value={aventuraState.options.theme.accentText} />
          </div>
        </div>

        <h4 class="ui-section-title" style="margin-top: 1rem;">{i18n.t('button_colors')}</h4>
        <div class="color-grid">
          <div class="control-group">
            <label>{i18n.t('btn_bg')}</label>
            <input type="color" class="color-picker" bind:value={aventuraState.options.theme.buttonBg} />
          </div>
          <div class="control-group">
            <label>{i18n.t('btn_text')}</label>
            <input type="color" class="color-picker" bind:value={aventuraState.options.theme.buttonText} />
          </div>
          <div class="control-group">
            <label>{i18n.t('hover_bg')}</label>
            <input type="color" class="color-picker" bind:value={aventuraState.options.theme.buttonHoverBg} />
          </div>
          <div class="control-group">
            <label>{i18n.t('hover_text')}</label>
            <input type="color" class="color-picker" bind:value={aventuraState.options.theme.buttonHoverText} />
          </div>
        </div>

        <h4 class="ui-section-title" style="margin-top: 1rem;">{i18n.t('geometry_type')}</h4>
        <div class="control-group">
          <label>{i18n.t('btn_border_css')}</label>
          <input type="text" bind:value={aventuraState.options.theme.buttonBorder} />
        </div>
        <div class="control-group">
          <label>{i18n.t('container_border_css')}</label>
          <input type="text" bind:value={aventuraState.options.theme.containerBorder} />
        </div>
        <div class="control-group">
          <label>{i18n.t('border_radius')}</label>
          <input type="text" bind:value={aventuraState.options.theme.borderRadius} />
        </div>
        <div class="control-group">
          <label>{i18n.t('font_family')}</label>
          <textarea rows="3" bind:value={aventuraState.options.theme.fontFamily}></textarea>
        </div>

        <h4 class="ui-section-title" style="margin-top: 1rem;">{i18n.t('igrama_integration')}</h4>
        <div class="control-group" style="margin-bottom: 0.5rem;">
          <label>{i18n.t('igrama_format')}</label>
          <select bind:value={aventuraState.options.igramaFormat} class="format-select">
            <option value="png">png</option>
            <option value="gif">gif</option>
          </select>
        </div>
        <div class="control-group">
          {#if aventuraState.options.igrama}
            <div style="margin-bottom: 0.5rem; font-size: 0.85rem; font-weight: bold; color: var(--accent-color);">
              ✓ {i18n.t('igrama_loaded')}
            </div>
            <button class="btn btn-danger w-full" onclick={() => aventuraState.options.igrama = null}>
              {i18n.t('remove_igrama')}
            </button>
          {:else}
            <label class="btn btn-secondary w-full file-upload-btn" style="text-align: center; border-style: dashed; padding: 0.5rem; cursor: pointer; display: block;">
              {i18n.t('upload_igrama')}
              <input type="file" accept=".json" onchange={handleIgramaUpload} hidden />
            </label>
          {/if}
        </div>

      </div>
    </div>
  </div>
{/if}

<style>
  /* Layout constraints */
  .modal-backdrop { 
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
    background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; 
  }
  
  .modal-content { 
    background: var(--bg-color); border: var(--border-main); width: 450px; 
    box-shadow: 8px 8px 0px rgba(0,0,0,1); display: flex; flex-direction: column; 
  }
  
  .modal-header { 
    padding: 1rem; background: var(--text-color); color: var(--bg-color); 
    display: flex; justify-content: space-between; align-items: center; 
  }
  
  .modal-body { 
    padding: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem; 
    max-height: 80vh; overflow-y: auto;
  }
  
  .control-group label { 
    display: block; font-weight: bold; margin-bottom: 0.2rem; font-size: 0.9rem;
  }
  
  .color-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  }

  .color-picker { 
    width: 100%; height: 35px; border: var(--border-main); 
    cursor: pointer; padding: 0; background: var(--bg-color);
  }
  
  .checkbox-group { 
    display: flex; flex-direction: column; gap: 0.5rem; 
    border: 1px dashed var(--text-color); padding: 1rem; background: #fafafa;
  }
  
  .checkbox-group label { font-weight: normal; cursor: pointer; }

  .format-select {
    padding: 0.2rem;
    width: 100%;
    text-align: center;
  }
</style>