<script>
  import { scenes, currentWiring, rerender } from '../stores/store.js';
  import { getSceneKey, getOptionsKey, getTextKey, getImgKey } from '../stores/helpers.js';

  import DragNode from './DragNode.svelte';
  import NewOption from './NewOption.svelte';
  import NewArea from './NewArea.svelte';
  import Editor from './Editor.svelte'

  export let movingNode = false;
  export let key;

  // TOGGLES
  let showEditor = false;
  let showNewOption = false;
  let showNewArea = false;

  function toggleEditor() { showEditor = true }
  function toggleNewOption() { showNewOption = true }
  function toggleNewArea() { showNewArea = true }
  

  let scene = $scenes[key];
  $: { scene = $scenes[key] }
  const textKey = $getTextKey(scene);
  const optionsKey = $getOptionsKey(scene);
  const imgKey = $getImgKey(scene);

  if (scene.display === undefined) {scene.display = {x: 0, y: 0 }}

  function optionTextChanged() { setOptionWidth(this) }
  function setOptionWidth(node) {
    const i = +node.getAttribute('i');
    node.style.width = (node.value.length * 6.1) + 'px';
    scene[optionsKey][i].btn = node.value;
    $scenes = $scenes;
  }
  
  function areaNameChanged() { setAreaWidth(this) }
  function setAreaWidth(node) {
    const i = +node.getAttribute('i');
    node.style.width = (node.value.length * 6.1) + 'px';
    scene.areas[i].name = node.value;
    $scenes = $scenes;
  }

  // OUTPUT

  function clickOutput(e) {
    const node = e.target;
    const i = +node.getAttribute('i');
    const type = node.getAttribute('type');
    if ($currentWiring !== undefined) {
      if ($currentWiring.key === key && $currentWiring.i === i && $currentWiring.type === type) {
        $currentWiring = undefined
        const options = type === 'ops' ? optionsKey : 'areas';
        const sceneKey = $getSceneKey(scene[options][i]);
        scene[options][i][sceneKey] = undefined;
        return
      }
    }
    $currentWiring = {key, i, type};
  }

  // INPUT

  function clickInput() {
    if ($currentWiring === undefined) return
    const outputScene = $scenes[$currentWiring.key];
    const outputOptions = $currentWiring.type === 'ops' ? $getOptionsKey(outputScene) : 'areas';
    const sceneKey = $getSceneKey(outputScene[outputOptions][$currentWiring.i]);
    outputScene[outputOptions][$currentWiring.i][sceneKey] = key;
    $currentWiring = undefined;
  }

  // REMOVE

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
      if ($scenes[k].areas !== undefined) {
        for (let o of $scenes[k].areas) {
          const sceneKey = $getSceneKey(o);
          if (o[sceneKey] === key) {
            o[sceneKey] = undefined;
          }
        }
      }
      
    }
    delete $scenes[key];
    $scenes = $scenes;
  }

  // REMOVE OPTION
  function removeOption(e) {
    const node = e.target;
    const i = +node.getAttribute('i');
    $scenes[key][optionsKey].splice(i, 1);
    $scenes = $scenes;
    $rerender = !$rerender;
  }

  function removeArea(e) {
    const node = e.target;
    const i = +node.getAttribute('i');
    $scenes[key].areas.splice(i, 1);
    $scenes = $scenes;
    $rerender = !$rerender;
  }

  function removeImage() {
    delete $scenes[key][imgKey]
    delete $scenes[key].areas
    $scenes = $scenes;
    $rerender = !$rerender;
  }

</script>

<DragNode {scene} {key} bind:movingNode={movingNode}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:mousedown|stopPropagation on:click={clickInput} {key} class="connection input"></div>
  <h1>Escena: {key}</h1>

  {#if scene[imgKey] !== undefined && scene[imgKey] !== null}
    <div class="img-preview-container">
      <img src={scene[imgKey]} alt="Preview" class="img-preview">
      <button class="x-button image-x-button" on:click={removeImage}>x</button>
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
        <button on:click={toggleNewOption}>+</button>
      </div>
    </div>

    {#if scene[imgKey] !== undefined && scene[imgKey] !== null}
      <div>
        <span class="btns-name">área</span>
        <div class="node-btns-div">
          <button on:click={toggleNewArea}>+</button>
        </div>
      </div>
    {/if}
  </div>
  
  {#key $rerender}
    <div class="node-outputs">
      {#each $scenes[key][optionsKey] || [] as op, i ('op'+i)}
        <div class="output-container">
          <input type="text" class="output-text" value={op.btn} use:setOptionWidth|once on:change={optionTextChanged} on:mousedown|stopPropagation {i}/>
          <button class="x-button" on:click={removeOption} {i}>x</button>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div type="ops" {key} content={op.btn} class="connection output option-connection" on:click={clickOutput} {i} on:mousedown|stopPropagation></div>
        </div>
      {/each}

      {#each $scenes[key].areas || [] as a, i ('a'+i)}
        <div class="output-container">
          <input type="text" class="output-text" value={a.name} use:setAreaWidth|once on:change={areaNameChanged} on:mousedown|stopPropagation {i}/>
          <button class="x-button" on:click={removeArea} {i}>x</button>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div type="areas" {key} content={a.name} class="connection output area-connection" on:click={clickOutput} {i} on:mousedown|stopPropagation></div>
        </div>
      {/each}
    </div>
  {/key}
</DragNode>

{#if showEditor}
  <Editor bind:showEditor={showEditor} {key} pos={scene.display}/>
{/if}

{#if showNewOption}
  <NewOption bind:showNewOption {key} pos={scene.display}/>
{/if}

{#if showNewArea}
  <NewArea bind:showNewArea={showNewArea} {key} pos={scene.display}/>
{/if}
 
<style>
  .node-btns {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    border-top: 1px var(--scene-stroke) solid;
  }

  .node-btns-div {
    display: flex;
    justify-content: center;
  }

  .btns-name {
    font-size: 10px;
    text-align: left;
  }

  .node-btns-div button {
    background: white;
    border-radius: 4px;
    border: solid 1px var(--scene-stroke);
    cursor: pointer;
  }

  .node-btns-div button:hover {
    background: var(--btn-hover);
  }

  .node-btns-div button:active {
    background: var(--btn-active);
  }

  input {
    background: white;
    border: none;
    border-bottom: solid 1px var(--scene-stroke);
  }

  .connection {
    margin: auto;
    width: 10px;
    height: 10px;
    cursor: pointer;
    border-radius: 10px;
    background: var(--input-stroke);
  }

  .connection:hover {
    border: solid 2px var(--drag-stroke);
  }

  .area-connection {
    background: var(--area-stroke);
  }

  .option-connection {
    background: var(--scene-stroke);
  }

  .input {
    position: absolute;
    left: 50%;
    top: -5px;
  }

  /* OUTPUTS */

  .node-outputs {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 1em;
    border-top: var(--scene-stroke) 1px solid;
    padding-top: 0.5em;
  }

  .output-container {
    display: flex;
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
    font-size: 1em;
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
    max-height: 200px;
    display: flex;
    margin: auto;
  }

  .img-preview {
    max-width: 100%;
    pointer-events: none;
    display: inline;
  }
</style>