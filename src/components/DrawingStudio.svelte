<script>
  import { tick, untrack } from 'svelte';
  import {
    DRAWING_WIDTH,
    addStroke,
    clearDrawing,
    createDrawing,
    normalizeDrawing,
    paletteColors,
    paletteRgb,
    renderFrameIndices,
  } from '../drawing/model.js';
  import { encodeDrawingGif } from '../drawing/encode.js';
  import { app } from '../state.svelte.js';
  import { i18n } from '../lib/i18n.svelte.js';
  import { notify } from '../ui/toast.svelte.js';
  import Modal from '../ui/Modal.svelte';

  let { isOpen = false, scene, onSave, onClose } = $props();

  let drawing = $state(createDrawing());
  let selectedTool = $state('brush');
  let selectedPaint = $state(1);
  let selectedSize = $state(2);
  let frame = $state(0);
  let history = $state([]);
  let isDrawing = $state(false);
  let isSaving = $state(false);
  /** @type {HTMLCanvasElement|undefined} */
  let canvasEl = $state();

  const projectPalette = $derived(app.project.palette?.colors || []);

  $effect(() => {
    if (!isOpen) return;

    drawing = normalizeDrawing(scene?.drawing) || createDrawing();
    selectedTool = 'brush';
    selectedPaint = 1;
    selectedSize = 2;
    history = [];
    frame = 0;

    const timer = setInterval(() => {
      frame = (frame + 1) % 3;
      drawFrame(frame);
    }, 250);

    untrack(() => drawFrame(0));

    return () => clearInterval(timer);
  });

  /**
   * @param {number} index
   */
  function drawFrame(index) {
    if (!canvasEl) return;
    const context = canvasEl.getContext('2d');
    if (!context) return;
    const indices = renderFrameIndices(drawing, index);
    const colors = paletteRgb(projectPalette);
    const image = context.createImageData(DRAWING_WIDTH, DRAWING_WIDTH);
    for (let i = 0; i < indices.length; i++) {
      const color = colors[indices[i]] || colors[0];
      const offset = i * 4;
      image.data[offset] = color[0];
      image.data[offset + 1] = color[1];
      image.data[offset + 2] = color[2];
      image.data[offset + 3] = 255;
    }
    context.putImageData(image, 0, 0);
  }

  function redraw() {
    drawFrame(frame);
  }

  /**
   * @param {PointerEvent} event
   * @returns {[number, number]}
   */
  function pointFromEvent(event) {
    const rect = canvasEl?.getBoundingClientRect();
    if (!rect || rect.width === 0) return [0, 0];
    return [
      Math.max(
        0,
        Math.min(
          DRAWING_WIDTH - 1,
          Math.floor(((event.clientX - rect.left) / rect.width) * DRAWING_WIDTH),
        ),
      ),
      Math.max(
        0,
        Math.min(
          DRAWING_WIDTH - 1,
          Math.floor(((event.clientY - rect.top) / rect.height) * DRAWING_WIDTH),
        ),
      ),
    ];
  }

  function randomSeed() {
    return (
      (Math.floor(Math.random() * 0xffffffff) ^
        Math.floor(performance.now())) >>>
      0
    );
  }

  /** @param {PointerEvent} event */
  function pointerDown(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    canvasEl?.setPointerCapture(event.pointerId);
    pushHistory();
    const point = pointFromEvent(event);
    drawing = addStroke(drawing, {
      id: `s${Date.now().toString(36)}-${drawing.strokes.length + 1}`,
      tool: selectedTool,
      paint: selectedPaint,
      size: selectedSize,
      points: [point],
      seed: randomSeed(),
    });
    isDrawing = true;
    redraw();
  }

  /** @param {PointerEvent} event */
  function pointerMove(event) {
    if (!isDrawing) return;
    event.preventDefault();
    const point = pointFromEvent(event);
    const strokes = drawing.strokes.slice();
    const last = strokes[strokes.length - 1];
    if (!last) return;
    const previous = last.points[last.points.length - 1];
    if (previous[0] === point[0] && previous[1] === point[1]) return;
    strokes[strokes.length - 1] = {
      ...last,
      points: [...last.points, point],
    };
    drawing = { ...drawing, strokes };
    redraw();
  }

  /** @param {PointerEvent} event */
  function pointerUp(event) {
    if (!isDrawing) return;
    isDrawing = false;
    try {
      canvasEl?.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be gone.
    }
  }

  function pushHistory() {
    history = [...history.slice(-9), drawing.strokes.slice()];
  }

  function undo() {
    if (history.length === 0) return;
    const strokes = history[history.length - 1];
    history = history.slice(0, -1);
    drawing = { ...drawing, strokes };
    redraw();
  }

  function eraseAll() {
    if (drawing.strokes.length === 0) return;
    pushHistory();
    drawing = clearDrawing(drawing);
    redraw();
  }

  function chooseTool(tool) {
    selectedTool = tool;
  }

  function chooseSize(size) {
    selectedSize = size;
  }

  async function save() {
    if (isSaving) return;
    isSaving = true;
    await tick();
    try {
      const source = $state.snapshot(drawing);
      const { image } = encodeDrawingGif(source, {
        projectColors: projectPalette,
      });
      onSave(image, source);
      onClose();
    } catch (error) {
      notify(i18n.t('drawing_error'), 'error');
    } finally {
      isSaving = false;
    }
  }
</script>

<Modal
  {isOpen}
  title={i18n.t('drawing')}
  size="wide"
  bodyFlush
  onClose={onClose}
>
  {#snippet children()}
      <div class="studio-body">
        <div class="canvas-column">
          <canvas
            bind:this={canvasEl}
            width={DRAWING_WIDTH}
            height={DRAWING_WIDTH}
            aria-label={i18n.t('drawing')}
            onpointerdown={pointerDown}
            onpointermove={pointerMove}
            onpointerup={pointerUp}
            onpointercancel={pointerUp}
          ></canvas>
          <p class="hint">{i18n.t('drawing_hint')}</p>
        </div>

        <aside class="controls">
          <section>
            <h4>{i18n.t('tool')}</h4>
            <div class="tool-buttons">
              <button
                class="btn tool-choice {selectedTool === 'brush' ? 'btn-primary' : 'btn-secondary'}"
                type="button"
                aria-pressed={selectedTool === 'brush'}
                onclick={() => chooseTool('brush')}
              >
                <svg class="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20c2.5-.5 4.2-1.5 5.4-3.3L19 7.2 16.8 5 7.3 14.6C5.5 15.8 4.5 17.5 4 20Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                <span>{i18n.t('brush')}</span>
              </button>
              <button
                class="btn tool-choice {selectedTool === 'texture' ? 'btn-primary' : 'btn-secondary'}"
                type="button"
                aria-pressed={selectedTool === 'texture'}
                onclick={() => chooseTool('texture')}
              >
                <svg class="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20c2.5-.5 4.2-1.5 5.4-3.3L19 7.2 16.8 5 7.3 14.6C5.5 15.8 4.5 17.5 4 20Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <circle cx="8" cy="4" r="1" fill="currentColor"/>
                  <circle cx="12" cy="7" r="1" fill="currentColor"/>
                  <circle cx="5" cy="8" r="1" fill="currentColor"/>
                </svg>
                <span>{i18n.t('textured_brush')}</span>
              </button>
              <button
                class="btn tool-choice {selectedTool === 'eraser' ? 'btn-primary' : 'btn-secondary'}"
                type="button"
                aria-pressed={selectedTool === 'eraser'}
                onclick={() => chooseTool('eraser')}
              >
                <svg class="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m5 16 8-8 5 5-8 8H5v-5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="m10 9 5 5" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span>{i18n.t('eraser')}</span>
              </button>
            </div>
          </section>

          <section>
            <h4>{i18n.t('size')}</h4>
            <div class="size-slider">
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={selectedSize}
                aria-label={i18n.t('size')}
                oninput={(event) =>
                  chooseSize(Number(event.currentTarget.value))}
              />
              <span class="size-value">{selectedSize}</span>
            </div>
          </section>

          <section>
            <h4>{i18n.t('paint_color')}</h4>
            <div class="paint-buttons">
              {#each paletteColors(projectPalette).slice(1) as color, index}
                <button
                  class="paint-swatch {selectedPaint === index + 1 ? 'active' : ''}"
                  type="button"
                  aria-label={`${i18n.t('brush')} ${index + 1}`}
                  aria-pressed={selectedPaint === index + 1}
                  style:background={color}
                  onclick={() => (selectedPaint = index + 1)}
                ></button>
              {/each}
            </div>
            <p class="hint">{i18n.t('drawing_palette_hint')}</p>
          </section>

          <div class="actions">
            <button class="btn btn-secondary" type="button" onclick={undo} disabled={history.length === 0}>
              {i18n.t('undo')}
            </button>
            <button class="btn btn-danger" type="button" onclick={eraseAll} disabled={drawing.strokes.length === 0}>
              {i18n.t('erase_all')}
            </button>
          </div>
        </aside>
    </div>
  {/snippet}

  {#snippet footer()}
    <button class="btn btn-secondary" onclick={onClose} disabled={isSaving}>
      {i18n.t('cancel')}
    </button>
    <button class="btn btn-primary" onclick={save} disabled={isSaving}>
      {isSaving ? i18n.t('saving') : i18n.t('save_drawing')}
    </button>
  {/snippet}
</Modal>

<style>
  .studio-body {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    overflow-y: auto;
    min-height: 0;
  }

  .canvas-column {
    flex: 1 1 512px;
    min-width: 0;
  }

  canvas {
    display: block;
    width: min(100%, 512px);
    aspect-ratio: 1;
    border: var(--border-main);
    image-rendering: pixelated;
    touch-action: none;
    cursor: crosshair;
    background: #fff;
  }

  .hint {
    max-width: 512px;
    margin: 0.5rem 0 0;
    font-size: 0.8rem;
    opacity: 0.75;
    line-height: 1.35;
  }

  .controls {
    flex: 0 1 280px;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .controls h4 {
    margin: 0 0 0.35rem;
    font-size: 0.85rem;
    border-bottom: 1px solid var(--text-color);
    padding-bottom: 0.2rem;
  }

  .tool-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .tool-buttons .btn {
    flex: 1;
    padding-left: 0.35rem;
    padding-right: 0.35rem;
    font-size: 0.8rem;
  }

  .tool-choice {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }

  .tool-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .size-slider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .size-slider input {
    flex: 1;
    accent-color: var(--text-color);
  }

  .size-value {
    min-width: 1rem;
    text-align: center;
    font-weight: bold;
  }

  .paint-buttons {
    display: flex;
    gap: 0.4rem;
  }

  .paint-swatch {
    width: 34px;
    height: 34px;
    border: 2px solid var(--text-color);
    cursor: pointer;
    padding: 0;
  }

  .paint-swatch.active {
    outline: 3px solid var(--accent-color);
    outline-offset: 2px;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  .actions .btn {
    flex: 1;
  }

  @media (max-width: 760px) {
    .studio-body {
      flex-direction: column;
    }

    .canvas-column {
      flex-basis: auto;
    }

    .controls {
      flex-basis: auto;
    }
  }
</style>
