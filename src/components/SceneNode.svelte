<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { aventuraState } from '../state.svelte.js'; 
  import { i18n } from '../lib/i18n.svelte.js';
  
  let { data, id } = $props();
</script>

<div 
  class="scene-node {aventuraState.selectedNodeId === id ? 'selected' : ''}" 
  onclick={() => aventuraState.selectedNodeId = id}
>
  <Handle type="target" position={Position.Left} class="brutalist-handle handle-target" />

  <header class="node-header">
    <strong>{id}</strong>
  </header>

  <div class="node-body">
    {#if data.image}
      <div class="img-preview">
        <img src={data.image} alt="scene thumbnail" />
      </div>
    {/if}
    <p class="node-text">
      {data.text ? (data.text.length > 50 ? data.text.slice(0, 50) + '...' : data.text) : i18n.t('empty_text')}
    </p>
  </div>

  {#if data.options && data.options.length > 0}
    <div class="node-outputs">
      {#each data.options as op, i}
        <div class="output-row">
          <span>> {op.btn}</span>
          <Handle type="source" position={Position.Right} id={`op_${i}`} class="brutalist-handle handle-source" />
        </div>
      {/each}
    </div>
  {/if}

  {#if data.areas && data.areas.length > 0}
    <div class="node-outputs areas">
      {#each data.areas as area, i}
        <div class="output-row">
          <span>[area] {area.name}</span>
          <Handle type="source" position={Position.Right} id={`area_${i}`} class="brutalist-handle handle-source area-source" />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .scene-node {
    background: var(--bg-color);
    border: var(--border-main);
    width: 200px;
    box-shadow: 4px 4px 0px rgba(0,0,0,1);
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
  }

  .node-body {
    padding: 8px;
    font-size: 0.85rem;
    border-bottom: var(--border-main);
  }

  .node-text { margin: 0; }

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
    filter: grayscale(100%); 
  }

  .output-row {
    position: relative;
    padding: 4px 8px;
    border-bottom: 1px solid #ccc;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
  }
  
  .output-row:last-child { border-bottom: none; }

  :global(.brutalist-handle) {
    width: 10px;
    height: 10px;
    border-radius: 0;
    border: var(--border-main);
    background: var(--bg-color);
  }
  
  :global(.handle-source) { right: -6px; }
  :global(.area-source) { border-color: var(--accent-color); }
  
  :global(.handle-target) { 
    left: -2px; 
    top: 14px;
  }
</style>