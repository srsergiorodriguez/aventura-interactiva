// @ts-nocheck
// src/state.svelte.js
export const aventuraState = $state({
  nodes: [],
  edges: [],
  options: {
    typewriterSpeed: 20,
    // ... all your old default options
  }
});

// --- THE DATA BRIDGE ---

/**
 * Converts Aventura JSON into Svelte Flow Nodes & Edges
 */
export function loadAventuraToFlow(aventuraJSON) {
  const newNodes = [];
  const newEdges = [];

  for (const [key, data] of Object.entries(aventuraJSON)) {
    // 1. Create the Node
    newNodes.push({
      id: key,
      type: 'sceneNode', // Tells Svelte Flow to use our custom component
      position: data.display || { x: Math.random() * 200, y: Math.random() * 200 },
      data: {
        text: data.text || data.texto || "",
        image: data.image || data.imagen || null,
        options: data.options || data.opciones || [],
        areas: data.areas || []
      }
    });

    // 2. Create the Edges (Connections) for Options
    if (data.options) {
      data.options.forEach((op, index) => {
        if (op.scene) {
          newEdges.push({
            id: `e-${key}-${op.scene}-op_${index}`,
            source: key,
            target: op.scene,
            sourceHandle: `op_${index}` // Connects exactly to this specific button
          });
        }
      });
    }

    // 3. Create the Edges for Areas
    if (data.areas) {
      data.areas.forEach((area, index) => {
        if (area.scene) {
          newEdges.push({
            id: `e-${key}-${area.scene}-area_${index}`,
            source: key,
            target: area.scene,
            sourceHandle: `area_${index}`
          });
        }
      });
    }
  }

  aventuraState.nodes = newNodes;
  aventuraState.edges = newEdges;
}

/**
 * Compiles Svelte Flow Nodes & Edges back into Aventura JSON
 */
export function compileFlowToAventura() {
  const story = {};

  aventuraState.nodes.forEach(node => {
    // Deep copy the data so we don't mutate the UI state
    const sceneData = JSON.parse(JSON.stringify(node.data));
    sceneData.display = { x: Math.round(node.position.x), y: Math.round(node.position.y) };

    // Find all edges originating from this node
    const outgoingEdges = aventuraState.edges.filter(e => e.source === node.id);

    // Reattach the target 'scene' string to the options and areas
    outgoingEdges.forEach(edge => {
      const [type, indexStr] = edge.sourceHandle.split('_');
      const index = parseInt(indexStr);

      if (type === 'op' && sceneData.options[index]) {
        sceneData.options[index].scene = edge.target;
      } else if (type === 'area' && sceneData.areas[index]) {
        sceneData.areas[index].scene = edge.target;
      }
    });

    story[node.id] = sceneData;
  });

  return story;
}