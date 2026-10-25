<script>
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import { untrack } from 'svelte';
  import '@xyflow/svelte/dist/style.css';
  import SceneNode from './SceneNode.svelte';
  import ViewportFitter from './ViewportFitter.svelte';
  import Sidebar from './Sidebar.svelte';
  import {
    app,
    canvas,
    connectFlowConnection,
    deleteFlowItems,
    moveFlowNodes,
    saveViewport,
  } from '../state.svelte.js';
  import { messageForError } from '../lib/error-message.js';
  import { notify } from '../ui/toast.svelte.js';

  const nodeTypes = { sceneNode: SceneNode };

  let flowViewport = $state({ ...app.project.view.viewport });

  let viewportEpoch = -1;

  $effect(() => {
    // Project replacement updates the same Svelte Flow instance now. Reset the
    // bound viewport before the fitter runs so the old project's pan/zoom cannot
    // leak into the new one. Do not track the project viewport here: fitting
    // writes it through saveViewport, which would otherwise re-trigger this
    // effect forever.
    const epoch = app.projectEpoch;
    if (epoch === viewportEpoch) return;
    viewportEpoch = epoch;
    untrack(() => {
      flowViewport = { ...app.project.view.viewport };
    });
  });

  function handleConnect(connection) {
    try {
      connectFlowConnection(connection);
    } catch (error) {
      notify(messageForError(error), 'error');
    }
  }

  async function handleBeforeDelete({ nodes, edges }) {
    try {
      deleteFlowItems({ nodes, edges });
    } catch (error) {
      notify(messageForError(error), 'error');
    }
    // The store has already applied and reprojected the deletion.
    return false;
  }

  function handleDragStop({ nodes }) {
    try {
      moveFlowNodes(nodes);
    } catch (error) {
      notify(messageForError(error), 'error');
    }
  }

  function handleMoveEnd(_event, viewport) {
    flowViewport = viewport;
    saveViewport(viewport);
  }
</script>

<div class="app-layout">
  <div class="workspace-wrapper">
    <SvelteFlow
      bind:nodes={canvas.nodes}
      bind:edges={canvas.edges}
      bind:viewport={flowViewport}
      {nodeTypes}
      minZoom={0.15}
      onpaneclick={() => (app.selectedSceneId = null)}
      onconnect={handleConnect}
      onbeforedelete={handleBeforeDelete}
      onnodedragstop={handleDragStop}
      onmoveend={handleMoveEnd}
      proOptions={{ hideAttribution: true }}
    >
      <ViewportFitter resetKey={app.projectEpoch} />
      <Background variant="dots" gap={20} size={1} color="#cccccc" />
      <Controls showInteractive={false} />
      <MiniMap nodeColor="#000" maskColor="rgba(255, 255, 255, 0.8)" />
    </SvelteFlow>
  </div>

  <Sidebar />
</div>

<style>
  .app-layout {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .workspace-wrapper {
    flex-grow: 1;
    height: 100%;
    background: var(--bg-color);
  }

  :global(.svelte-flow__edge-interaction) {
    stroke-width: 25 !important;
  }

  :global(.svelte-flow__edge-path) {
    stroke: var(--text-color) !important;
    stroke-width: 2 !important;
  }

  :global(.svelte-flow__edge:hover .svelte-flow__edge-path) {
    stroke: var(--accent-color) !important;
  }

  :global(.svelte-flow__edge.selected .svelte-flow__edge-path) {
    stroke: var(--accent-color, red) !important;
    stroke-width: 4 !important;
    stroke-dasharray: 5, 5;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 20;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  :global(.svelte-flow__controls),
  :global(.svelte-flow__minimap) {
    border: var(--border-main) !important;
    border-radius: 0 !important;
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 1) !important;
    background: var(--bg-color) !important;
  }

  :global(.svelte-flow__controls-button) {
    border-bottom: var(--border-main) !important;
    border-radius: 0 !important;
    fill: var(--text-color) !important;
  }
</style>
