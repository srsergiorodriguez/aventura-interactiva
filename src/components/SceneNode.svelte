<script>
  import { scenes } from '../stores/store.js';
  import { getSceneKey, getOptionsKey, getTextKey, getImgKey } from '../stores/helpers.js';
  import Editor from './Editor.svelte';
  import NewOutput from './NewOutput.svelte';
  import DragNode from './DragNode.svelte';
  import NewArea from './NewArea.svelte';

  export let key;
  export let movingNode = false;

  let scene = $scenes[key];
  $: { scene = $scenes[key] }

  const optionsKey = $getOptionsKey(scene);
  const imgKey = $getImgKey(scene);
  const textKey = $getTextKey(scene);
  let nodeOutputs;

  let showEditor = false;
  let showNewOutput = false;
  let showNewArea = false;

  if (scene.display === undefined) { scene.display = {x: 0, y: 0, ops: [], areas: []} }
  if (scene.display.areas === undefined) {scene.display.areas = []};

  function outputTextChanged() { setOutputWidth(this) }

  function setOutputWidth(node) {
    const i = +node.getAttribute('i');
    node.style.width = (node.value.length * 6.1) + 'px';
    scene[optionsKey][i].btn = node.value;
    resetOutputs();
  }

  function getPosOps(node) { getPos(node, 'ops') }
  function getPosArea(node) { getPos(node, 'areas') }
  function getPos(node, type) {
    const i = +node.getAttribute('i');
    if (scene.display[type][i] === undefined) {
        scene.display[type][i] = {
        x: node.offsetLeft,
        y: node.offsetTop,
        rewiring: false
      }
    } else {
      Object.assign(scene.display[type][i], {
        x: node.offsetLeft,
        y: node.offsetTop
      })
    }
    $scenes[key] = scene;
  }

  function resetOutputs() {
    if (nodeOutputs === undefined) return
    const outputs = nodeOutputs.getElementsByClassName('output');
    for (let o of outputs) { getPos(o, o.getAttribute("type")) }
  }

  function resetWirings() {
    const keys = Object.keys($scenes);
    for (let k of keys) {
      const s = $scenes[k];
      const optionsKey = $getOptionsKey(s);
      for (let i = 0; i < s.display.ops.length; i++) {
        const sceneKey = $getSceneKey(s[optionsKey][i]);
        if (s.display.ops[i].rewiring) {
          s.display.ops[i].rewiring = false;
          s[optionsKey][i][sceneKey] = s.display.ops[i].prevWiring;
        }
      }
      for (let i = 0; i < s.display.areas.length; i++) {
        const sceneKey = $getSceneKey(s.areas[i]);
        if (s.display.areas[i].rewiring) {
          s.display.areas[i].rewiring = false;
          s.areas[i][sceneKey] = s.display.areas[i].prevWiring;
        }
      }

      $scenes[k] = s;
    }
  }

  function dragOutput(node) {
    const i = +node.getAttribute('i');
    const type = node.getAttribute('type');
    const k = type === 'ops' ? optionsKey : 'areas';
    node.addEventListener('click', () => {
      resetWirings();
      const sceneKey = $getSceneKey(scene[k][i]);
      if (!scene.display[type][i].rewiring) {
        scene.display[type][i].prevWiring = scene[k][i][sceneKey];
        scene.display[type][i].rewiring = true;
        scene[k][i][sceneKey] = undefined;
      }
		});
  }

  function handleInputClick() {
    const keys = Object.keys($scenes);
    let output;
    let type;
    for (let k of keys) {
      const s = $scenes[k];
      for (let i = 0; i < s.display.ops.length; i++) {
        const op = s.display.ops[i];
        if (op.rewiring) {
          op.rewiring = false;
          output = {scene: s, i};
          type = "ops";
        }
      }

      for (let i = 0; i < s.display.areas.length; i++) {
        const a = s.display.areas[i];
        if (a.rewiring) {
          a.rewiring = false;
          output = {scene: s, i};
          type = "areas";
        }
      }
    }
    if (output === undefined) return
    const optionsKey = $getOptionsKey(output.scene);
    const k = type === 'ops' ? optionsKey : 'areas';
    const sceneKey = $getSceneKey(output.scene[k][output.i]);
    output.scene[k][output.i][sceneKey] = key;
  }

  function removeOption() {
    if (scene[optionsKey] !== undefined) {
      scene[optionsKey].pop();
      scene.display.ops.pop();
      $scenes = $scenes;
    }
  }

  function removeArea() {
    if (scene.areas !== undefined) {
      scene.areas.pop();
      scene.display.areas.pop();
      $scenes = $scenes;
    }
  }

  function removeNode() {
    for (let k of Object.keys($scenes)) {
      const optionsKey = $getOptionsKey($scenes[k]);
      if ($scenes[k][optionsKey] === undefined) continue;
      for (let o of $scenes[k][optionsKey]) {
        const sceneKey = $getSceneKey(o);
        if (o[sceneKey] === key) {
          o[sceneKey] = undefined;
        }
      }
    }
    delete $scenes[key];
    $scenes = $scenes;
  }

  function toggleEditor() { showEditor = true }
  function toggleNewOutput() { showNewOutput = true }
  function toggleNewArea() { showNewArea = true }
</script>

<DragNode {key} bind:movingNode={movingNode}>
  <div on:mousedown|stopPropagation on:click={handleInputClick} class="connection input"></div>
  <h1>Escena: {key}</h1>
  {#if scene[imgKey] !== undefined && scene[imgKey] !== null}
    <div class="img-preview-container">
      <img on:load={resetOutputs} src={scene[imgKey]} alt="Preview" class="img-preview">
    </div>
  {/if}
  <div class="p-container"><p class="text-p">{scene[textKey].length < 210 ? scene[textKey] : scene[textKey].slice(0, 210) + '...'}</p></div>
  <div class="node-btns">
    <div>
      <span class="btns-name">escena</span>
      <div class="node-btns-div">
        <button on:click={toggleEditor}>editar</button>
        <button on:click={removeNode}>x</button>
      </div>
    </div>
    <div>
      <span class="btns-name">btn</span>
      <div class="node-btns-div">
        <button on:click={removeOption}>-</button>
        <button on:click={toggleNewOutput}>+</button>
      </div>
    </div>
    {#if scene[imgKey] !== undefined && scene[imgKey] !== null}
      <div>
        <span class="btns-name">área</span>
        <div class="node-btns-div">
          <button on:click={removeArea}>-</button>
          <button on:click={toggleNewArea}>+</button>
        </div>
      </div>
    {/if}
  </div>
  <div bind:this={nodeOutputs} class="node-outputs">
    {#each scene[optionsKey] || [] as op, i ('op'+i)}
      <div class="output-container">
        <input type="text" class="output-text" value={op.btn} use:setOutputWidth|once on:change={outputTextChanged} on:mousedown|stopPropagation {i}/>
        <div use:getPosOps|once use:dragOutput type="ops" class="connection output option-connection" on:mousedown|stopPropagation {i}></div>
      </div>
    {/each}
    {#each scene.areas || [] as a, i ('a'+i)}
      <div class="output-container">
        <span class="output-text">{a.name}</span>
        <div use:getPosArea|once use:dragOutput type="areas" class="connection output area-connection" on:mousedown|stopPropagation {i}></div>
      </div>
    {/each}
  </div>  
</DragNode>
{#if showEditor}
  <Editor bind:showEditor={showEditor} {key} pos={scene.display}/>
{/if}
{#if showNewOutput}
  <NewOutput bind:showNewOutput={showNewOutput} {key} pos={scene.display}/>
{/if}
{#if showNewArea}
  <NewArea bind:showNewArea={showNewArea} {key} pos={scene.display}/>
{/if}
 
<style>
  .node-btns {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    border-top: 1px black solid;
  }

  .node-btns-div {
    display: flex;
    justify-content: center;
  }

  .btns-name {
    font-size: 10px;
    text-align: left;
  }

  .node-btns button {
    background: white;
    border-radius: 4px;
    border: solid 1px var(--scene-stroke);
    cursor: pointer;
  }

  .node-btns button:hover {
    background: lightgray;
  }

  .connection {
    margin: auto;
    width: 10px;
    height: 10px;
    cursor: pointer;
    border-radius: 10px;
    background: var(--input-stroke);
  }

  .area-connection {
    background: var(--area-stroke);
  }

  .option-connection {
    background: var(--scene-stroke);
  }

  .input {
    position: absolute;
    left: 0%;
    top: 0px;
  }

  /* OUTPUTS */

  .node-outputs {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 3px;
  }

  .output-container {
    padding: 1px;
  }

  .output-text {
    font-size: 12px;
    min-width: 15px;
  }

  .output {
    position: absolute;
    bottom: -5px;
  }

  h1 {
    margin: 0px;
    padding: 0px;
    font-size: 16px;
    text-align: center;
  }

  .p-container {
    display: flex;
    justify-content: center;
  }

  .text-p {
    max-width: 300px;
    font-size: 12px;
    padding: 0px;
    margin: 0px;
  }

  .img-preview-container {
    max-width: 100px;
    margin: auto;
  }

  .img-preview {
    max-width: 100%;
    pointer-events: none;
  }
</style>