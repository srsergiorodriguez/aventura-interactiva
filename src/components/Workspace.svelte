<script>
  import { SvelteFlow, Background, Controls, MiniMap, addEdge } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import SceneNode from './SceneNode.svelte';
  import Sidebar from './Sidebar.svelte';
  import { aventuraState } from '../state.svelte.js';

  // Map the custom node type to the Svelte Flow renderer
  const nodeTypes = { sceneNode: SceneNode };

  /**
   * Intercepts new connections to enforce a 1:1 Output-to-Input rule.
   * If a wire already exists from the exact same option button, it is 
   * removed before the new connection is established.
   */
  function handleConnect(connection) {
    const filteredEdges = aventuraState.edges.filter(
      (edge) => !(edge.source === connection.source && edge.sourceHandle === connection.sourceHandle)
    );
    
    aventuraState.edges = addEdge(connection, filteredEdges);
  }
</script>

<div class="app-layout">
  <div class="workspace-wrapper">
    <SvelteFlow 
      bind:nodes={aventuraState.nodes} 
      bind:edges={aventuraState.edges} 
      bind:viewport={aventuraState.viewport}
      {nodeTypes}
      fitView
      onpaneclick={() => aventuraState.selectedNodeId = null}
      onconnect={handleConnect}
      proOptions={{ hideAttribution: true }}
    >
      <Background variant="dots" gap={20} size={1} color="#cccccc" />
      <Controls showInteractive={false} />
      <MiniMap nodeColor="#000" maskColor="rgba(255, 255, 255, 0.8)" />
    </SvelteFlow>
  </div>

  <Sidebar />
</div>

<style>
  /* Base Layout */
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

  /* =========================================
     SVELTE FLOW OVERRIDES
     ========================================= */
  
  /* Standard wires */
  :global(.svelte-flow__edge-path) {
    stroke: var(--text-color) !important;
    stroke-width: 2 !important;
  }

  /* Make wires easier to grab */
  :global(.svelte-flow__edge-interaction) {
    stroke-width: 25 !important;
  }

  /* Highlight wire on hover */
  :global(.svelte-flow__edge:hover .svelte-flow__edge-path) {
    stroke: var(--accent-color) !important;
  }

  /* Highly visible SELECTED state for easy deletion */
  :global(.svelte-flow__edge.selected .svelte-flow__edge-path) {
    stroke: var(--accent-color, red) !important; 
    stroke-width: 4 !important; 
    stroke-dasharray: 5, 5;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    from { stroke-dashoffset: 20; }
    to { stroke-dashoffset: 0; }
  }

  /* UI Controls styling */
  :global(.svelte-flow__controls), :global(.svelte-flow__minimap) {
    border: var(--border-main) !important;
    border-radius: 0 !important;
    box-shadow: 4px 4px 0px rgba(0,0,0,1) !important;
    background: var(--bg-color) !important;
  }
  
  :global(.svelte-flow__controls-button) {
    border-bottom: var(--border-main) !important;
    border-radius: 0 !important;
    fill: var(--text-color) !important;
  }
</style>