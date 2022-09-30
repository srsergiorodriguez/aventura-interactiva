<script>
  import SceneNode from './SceneNode.svelte';
  import Connections from './Connections.svelte';
  import Page from './Page.svelte';
  import DragGui from './DragGui.svelte';
  import TopBar from './TopBar.svelte';
  import { scenes } from '../stores/store.js';
  import { a } from '../stores/aventura.js';
  import { saveJSON, saveHTML, generateInteractive } from '../stores/helpers.js';
  import {afterUpdate } from 'svelte';

  afterUpdate(() => {if (showTest) { scrollTo(0, 0) }});

  $: mouse = {x: 0, y: 0};
  $: keys = Object.keys($scenes);

  let movingNode = false;
  let showNewScene = false;
  let showTest = false;
  let testPos = {x: 40, y: 40};
  let input;
  
  function onChange() {
    const file = input.files[0];
    if (file.type === 'application/json') {
      $scenes = {};
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const data = reader.result;
        const obj = JSON.parse(data);
        $scenes = obj;
      });
      this.value = null;
      reader.readAsText(file);
			return
    } else {
      alert("Formato de archivo incorrecto / incorrect file format");
    }
  }

  function toggleNewScene() { showNewScene = true }
  function toggleTest() { showTest = true; }
  function resetScenes() { $scenes = {} }
  
  function testStory() {
    console.log($scenes);
    const prevContainer = document.getElementById('storygeneraldiv');
    if (prevContainer) prevContainer.remove();
    const aventura = new $a('es', {typewriterSpeed: 20});
    const topScene = Object.entries($scenes).sort((a, b) => a[1].display.y - b[1].display.y);
    if (topScene.length === 0) { alert("No hay escenas / There are no scenes"); return }
    aventura.setScenes($scenes).startAdventure(topScene[0][0]);
    const parent = document.getElementById('test-story-container');
    const child = document.getElementById('storygeneraldiv');
    parent.appendChild(child);
  }

  function exportStory() {
    $saveJSON($scenes, 'aventuraInteractiva');
  }

  function toFront(node) {
    [...document.getElementsByClassName("scene-node-container")].forEach(e => e.style.zIndex = "0");
    node.target.firstChild.style.zIndex = "1";
  }

  function saveInteractive() {
    const topScene = Object.entries($scenes).sort((a, b) => a[1].display.y - b[1].display.y);
    if (topScene.length === 0) { alert("No hay escenas / There are no scenes"); return }
    const lib = $a.toString();
    const sce = JSON.stringify($scenes);
    const html = $generateInteractive(lib, sce, topScene[0][0]);
    $saveHTML(html);
  }

</script>
<input type="file" id="load-input" bind:this={input} on:change={onChange} hidden/>
<div class="design-window-container">
  <div class="toolbar">
    <div class="project-toolbar">
      <button class="toolbar-button" on:click={resetScenes}>Nuevo proyecto</button>
      <label class="toolbar-button" for="load-input">Importar</label>
      <button class="toolbar-button" on:click={exportStory}>Exportar</button>
      <button class="toolbar-button" on:click={toggleTest}>Previsualizar</button>
      <button class="toolbar-button" on:click={saveInteractive}>Generar interactivo final</button>
    </div>
    <div class="scene-toolbar">
      <button class="toolbar-button" on:click={toggleNewScene}>Nueva escena</button>
    </div>
  </div>
  <div class="static-page-container">
    <div class="page-container">
      <Page {movingNode} bind:showNewScene bind:mouse={mouse} let:offset>
        {#each keys as key (key)}
          <div on:mouseenter={toFront} class="scene-node-container">
            <SceneNode {key} bind:movingNode={movingNode} />
          </div>
        {/each}
        <svg class="connections-container">
          {#each keys as key (key)}
            <Connections {key} {mouse}/>
          {/each}
        </svg>      
      </Page>
    </div>
  </div>
</div>
{#if showTest}
  <DragGui pos={testPos}>
    <TopBar bind:toggle={showTest}/>
    <div use:testStory class="test-story-container" id="test-story-container"></div>
  </DragGui>
{/if}

<style>
  .toolbar { 
    margin: 4px 0px;
    display: flex;
    justify-content: space-between;
  }

  .toolbar-button {
    font-size: 16px;
    border: solid 1px black;
    background: white;
    padding: 5px;
    cursor: pointer;
    text-align: center;
  }

  .toolbar-button:hover {
    background: lightgray;
  }

  .toolbar-button {
    border: var(--project-stroke) solid 2px;
    color: var(--project-stroke);
    background: var(--drag-fill);
    border-radius: 5px;
  }

  .scene-toolbar button {
    background: var(--scene-stroke);
    border: var(--scene-fill) solid 2px;
    color: var(--scene-fill);
    border-radius: 5px;
  }

  .design-window-container {
    width: 100%;
  }

  .static-page-container {
    width: 100%;
    height: 800px;
  }

  .page-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: solid 3px rgb(107, 107, 107);
    margin: auto;
    position: relative; /* contains all nodes */
    overflow: hidden;
  }

  .connections-container {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .test-story-container {
    width: 700px;
  }
</style>