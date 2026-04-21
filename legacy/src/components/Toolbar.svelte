<script>
  import { scenes, options } from '../stores/store'
  import { saveJSON, saveHTML, generateInteractive } from '../stores/helpers'
  import { a } from '../stores/aventura'

  export let showNewScene;
  export let showTest;

  let input;

  let showOptions = false;

  function toggleNewScene() { showNewScene = true }
  function toggleShowOptions() {showOptions = !showOptions}

  function resetScenes() { $scenes = {} }

  function loadScenes() {
    resetScenes();
    const file = input.files[0];
    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        $scenes = {};
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

  function exportScenes() {
    $saveJSON($scenes, 'aventuraInteractiva');
  }

  function toggleTest() { showTest = true }

  function saveInteractive() {
    const topScene = Object.entries($scenes).sort((a, b) => a[1].display.y - b[1].display.y);
    if (topScene.length === 0) { alert("No hay escenas / There are no scenes"); return }
    const lib = $a.toString();
    const sce = JSON.stringify($scenes);
    const opts = JSON.stringify($options);
    const html = $generateInteractive(lib, sce, topScene[0][0], opts);
    $saveHTML(html);
  }

  function setOption(key, v) {
    $options[key] = v;
  }
</script>
<div class="toolbar">
  <input type="file" id="load-input" bind:this={input} on:change={loadScenes} hidden/>
  <div class="project-toolbar subtoolbar">
    <button class="toolbar-button" on:click={resetScenes}>Nuevo proyecto</button>
    <label class="toolbar-button" for="load-input">Importar</label>
    <button class="toolbar-button" on:click={exportScenes}>Exportar</button>
    <button class="toolbar-button" on:click={toggleTest}>Previsualizar</button>
    <button class="toolbar-button" on:click={saveInteractive}>Generar interactivo final</button>
    <button class="toolbar-button" on:click={toggleShowOptions}>Opciones</button>
  </div>
  <div class="scene-toolbar subtoolbar">
    <button class="toolbar-button" on:click={toggleNewScene}>Nueva escena</button>
  </div>
</div>
{#if showOptions}
<div class="toolbar">
  <div class="scene-toolbar subtoolbar">
    <div class="option">
      <label for="back">Botón regresar: </label>
      <input type="checkbox" id="back" checked={$options["backBtn"]} on:click={(e) => {setOption("backBtn", e.target.checked)}}>
    </div>
    <div class="option">
      <label for="back">Botón reiniciar: </label>
      <input type="checkbox" id="back" checked={$options["restartBtn"]} on:click={(e) => {setOption("restartBtn", e.target.checked)}}>
    </div>
    <div class="option">
      <label for="speed">Intervalo texto: </label>
      <input type="range" id="speed" min="1" max="80" value={$options["typewriterSpeed"]} on:input={(e) => {setOption("typewriterSpeed", +e.target.value)}}>
      <span>{$options["typewriterSpeed"]}</span>
    </div>
    <div class="option">
      <label for="slide">Deslizar a imagen: </label>
      <input type="checkbox" id="slide" checked={$options["adventureSlide"]} on:click={(e) => {setOption("adventureSlide", e.target.checked)}}>
    </div>
    <div class="option">
      <label for="roll">Modo rollo: </label>
      <input type="checkbox" id="roll" checked={$options["adventureScroll"]} on:click={(e) => {setOption("adventureScroll", e.target.checked)}}>
    </div>
    <div class="option">
      <label for="eval">Evaluar etiquetas HTML: </label>
      <input type="checkbox" id="eval" checked={$options["evalTags"]} on:click={(e) => {setOption("evalTags", e.target.checked)}}>
    </div>
  </div>
</div>
{/if}
<style>
  .toolbar { 
    margin: 0.2em 0em;
    display: flex;
    gap: 4em;
  }

  .subtoolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.1em;
  }

  .option {
    display: flex;
    padding: 0.4em;
    border: solid 1px;
    border-radius: 5px;
    align-items: center;
  }

  input, label {
    font-family: var(--main-font);
    font-size: 0.9em;
  }

  .toolbar-button {
    font-size: 0.9em;
    padding: 0.5em;
    cursor: pointer;
    text-align: center;
    border: none;
    border-radius: 5px;
    border: var(--project-stroke) solid 1px;
    font-family: var(--main-font);
  }

  .toolbar-button:hover {
    background: var(--btn-hover);
  }

  .toolbar-button:active {
    background: var(--btn-active);
  }

  .project-toolbar button, label {
    background: var(--project-fill-light);
    color: var(--project-stroke);
  }

  .scene-toolbar button {
    background: var(--scene-fill);
    color: var(--project-stroke);
  }
</style>