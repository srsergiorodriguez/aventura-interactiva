import { i18n } from './lib/i18n.svelte';

export const aventuraState = $state({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  grammar: {},
  igrama: null,
  igramaFormat: 'png',
  viewport: { x: 0, y: 0, zoom: 1 },
  options: {
    typewriterSpeed: 20,
    adventureScroll: false,
    adventureSlide: false, // Deprecated in UI; locked to false to prevent layout jumps
    evalTags: false,
    backBtn: false,
    restartBtn: false,
    defaultCSS: true,
    theme: {
      background: '#ffffff',
      text: '#000000',
      // Native system monospace stack for zero-dependency rendering
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      accentBackground: '#00bfff',
      accentText: '#000000',
      buttonBorder: '2px solid #000000',
      borderRadius: '0px',
      containerBorder: 'none',
      buttonBg: '#ffffff',
      buttonText: '#000000',
      buttonHoverBg: '#000000',
      buttonHoverText: '#ffffff'
    }
  }
});


// ==========================================
// UI & CANVAS WORKSPACE HELPERS
// ==========================================
export function loadDefaultStory() {
  aventuraState.nodes = [
    {
      id: 'inicio',
      type: 'sceneNode',
      position: { x: 100, y: 150 },
      data: {
        text: "érase una vez un círculo...",
        options: [{ btn: "dejar tranquilo" }, { btn: "aplastar" }],
        areas: []
      }
    },
    {
      id: 'tranquilo',
      type: 'sceneNode',
      position: { x: 400, y: 150 },
      data: {
        text: "perfecto, un final redondo.",
        options: [],
        areas: []
      }
    },
    {
      id: 'aplastar',
      type: 'sceneNode',
      position: { x: 400, y: 250 },
      data: {
        text: "parece que la historia dio una elipsis.",
        options: [],
        areas: []
      }
    }
  ];

  aventuraState.edges = [
    {
      id: 'e-inicio-tranquilo-op_0',
      source: 'inicio',
      target: 'tranquilo',
      sourceHandle: 'op_0'
    },
    {
      id: 'e-inicio-aplastar-op_1',
      source: 'inicio',
      target: 'aplastar',
      sourceHandle: 'op_1'
    }
  ];
}

export function addScene(name) {
  if (!name || name.trim() === '') return alert(i18n.t('must_name_scene'));
  if (/^\d/.test(name)) return alert(i18n.t('no_number_scene_name'));
  
  // Sanitize input to create a safe, machine-readable ID
  let formattedId = name.toLowerCase().replace(/\s/gi,'_').replace(/\W/,'').replace(/[;.,:{}()<>$%&!¡?¿"'/\\#@&*+-]/gi,'');
  
  if (aventuraState.nodes.find(n => n.id === formattedId)) {
    return alert('a scene with that name already exists');
  }

  // Calculate viewport center to spawn the new node in the user's current field of view.
  // Accounts for the 300px sidebar offset and the canvas's current pan/zoom coordinates.
  const screenCenterX = (window.innerWidth - 300) / 2; 
  const screenCenterY = window.innerHeight / 2;
  const { x: panX, y: panY, zoom } = aventuraState.viewport;

  const spawnX = (screenCenterX - panX) / zoom;
  const spawnY = (screenCenterY - panY) / zoom;

  const newNode = {
    id: formattedId,
    type: 'sceneNode',
    position: { x: spawnX, y: spawnY },
    data: { text: "", options: [], areas: [] }
  };

  aventuraState.nodes = [...aventuraState.nodes, newNode];
}

export function updateSelectedNodeData(newData) {
  if (!aventuraState.selectedNodeId) return;
  
  aventuraState.nodes = aventuraState.nodes.map(node => {
    if (node.id === aventuraState.selectedNodeId) {
      return { ...node, data: { ...node.data, ...newData } };
    }
    return node;
  });
}


// ==========================================
// DATA BRIDGE: ENGINE <-> WORKSPACE
// ==========================================

/**
 * Compiles Svelte Flow Nodes & Edges back into Aventura JSON format.
 * Extracts layout coordinates and resolves visual graph edges into structural scene targets.
 */
export function compileFlowToAventura() {
  const story = {};

  aventuraState.nodes.forEach(node => {
    // Deep clone to prevent mutation of the active UI state during compilation
    const sceneData = JSON.parse(JSON.stringify(node.data));
    sceneData.display = { x: Math.round(node.position.x), y: Math.round(node.position.y) };

    const outgoingEdges = aventuraState.edges.filter(e => e.source === node.id);

    // Map visual edges back to their respective option or area targets
    outgoingEdges.forEach(edge => {
      if (!edge.sourceHandle) return;
      
      // sourceHandles follow the pattern: 'op_0', 'area_1'
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

/**
 * Parses an imported Aventura JSON file and translates it into Svelte Flow Nodes & Edges.
 */
export function loadAventuraToFlow(aventuraJSON) {
  const newNodes = [];
  const newEdges = [];

  for (const [key, data] of Object.entries(aventuraJSON)) {
    // 1. Reconstruct the Scene Node
    newNodes.push({
      id: key,
      type: 'sceneNode',
      position: data.display || { x: Math.random() * 200, y: Math.random() * 200 },
      data: {
        text: data.text || data.texto || "",
        image: data.image || data.imagen || null,
        image: data.image || data.imagen,
        options: data.options || data.opciones || [],
        areas: data.areas || []
      }
    });

    // 2. Reconstruct edges for standard options
    if (data.options) {
      data.options.forEach((op, index) => {
        if (op.scene) {
          newEdges.push({
            id: `e-${key}-${op.scene}-op_${index}`,
            source: key,
            target: op.scene,
            sourceHandle: `op_${index}`
          });
        }
      });
    }

    // 3. Reconstruct edges for image map areas
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