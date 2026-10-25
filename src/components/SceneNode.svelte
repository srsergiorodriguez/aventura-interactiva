<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { app, selectScene } from '../state.svelte.js';
  import { i18n } from '../lib/i18n.svelte.js';

  let { data, id } = $props();

  const scene = $derived(app.project.scenes[data.sceneId]);
  const selected = $derived(app.selectedSceneId === id);
  const isStart = $derived(app.project.story.startSceneId === id);
</script>

<div
  class="scene-node {selected ? 'selected' : ''}"
  role="button"
  tabindex="0"
  aria-pressed={selected}
  aria-label={id}
  onclick={() => selectScene(id)}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectScene(id);
    }
  }}
>
  <Handle type="target" position={Position.Left} class="brutalist-handle handle-target" />

  <header class="node-header">
    <strong>{id}</strong>
    {#if isStart}
      <span class="start-badge">{i18n.t('start_badge')}</span>
    {/if}
  </header>

  {#if scene}
    <div class="node-body">
      {#if scene.image}
        <div class="img-preview">
          <img src={scene.image} alt={i18n.t('scene_image_alt', { name: id })} />
        </div>
      {/if}
      <p class="node-text">
        {scene.text
          ? scene.text.length > 50
            ? scene.text.slice(0, 50) + '...'
            : scene.text
          : i18n.t('empty_text')}
      </p>
    </div>

    {#if scene.options.length > 0}
      <div class="node-outputs">
        {#each scene.options as option (option.id)}
          <div class="output-row">
            <span>> {option.btn || i18n.t('empty_text')}</span>
            <Handle
              type="source"
              position={Position.Right}
              id={`opt:${option.id}`}
              class="brutalist-handle handle-source"
            />
          </div>
        {/each}
      </div>
    {/if}

    {#if scene.areas.length > 0}
      <div class="node-outputs areas">
        {#each scene.areas as area (area.id)}
          <div class="output-row">
            <span>[area] {area.name || i18n.t('empty_text')}</span>
            <Handle
              type="source"
              position={Position.Right}
              id={`area:${area.id}`}
              class="brutalist-handle handle-source area-source"
            />
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .scene-node {
    background: var(--bg-color);
    border: var(--border-main);
    width: 200px;
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 1);
    transition: transform 0.1s ease, box-shadow 0.1s ease, border-color 0.1s ease;
  }

  .scene-node.selected {
    border-color: var(--accent-color);
    box-shadow: 6px 6px 0px var(--accent-color);
    z-index: 10;
  }

  .node-header {
    background: var(--text-color);
    color: var(--bg-color);
    padding: 4px 8px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .start-badge {
    background: var(--accent-color);
    color: var(--text-color);
    font-size: 0.65rem;
    line-height: 1;
    padding: 2px 4px;
  }

  .node-body {
    padding: 8px;
    font-size: 0.85rem;
    border-bottom: var(--border-main);
  }

  .node-text {
    margin: 0;
  }

  .img-preview {
    margin-bottom: 8px;
    border-bottom: 2px solid var(--text-color);
    padding-bottom: 8px;
  }

  .img-preview img {
    max-width: 100%;
    height: auto;
    display: block;
    border: 1px solid var(--text-color);
  }

  .output-row {
    position: relative;
    padding: 4px 8px;
    border-bottom: 1px solid #ccc;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
  }

  .output-row:last-child {
    border-bottom: none;
  }

  :global(.brutalist-handle) {
    width: 10px;
    height: 10px;
    border-radius: 0;
    border: var(--border-main);
    background: var(--bg-color);
  }

  :global(.handle-source) {
    right: -6px;
  }

  :global(.area-source) {
    border-color: var(--accent-color);
  }

  :global(.handle-target) {
    left: -2px;
    top: 14px;
  }
</style>
