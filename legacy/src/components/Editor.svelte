<script>
  import { scenes, rerender } from '../stores/store.js';
  import DragGui from './DragGui.svelte';
  import TopBar from './TopBar.svelte';
  import ImgUpload from './ImgUpload.svelte';
  
  export let key;
  export let pos;
  export let showEditor;

  let imageUrl = null;

  let scene = $scenes[key];
  const textKey = scene.text === undefined && scene.texto !== undefined ? 'texto' : 'text';
  $: text = scene[textKey];
  $: { $scenes[key] = scene }

  function acceptEdit() {
    $scenes[key][textKey] = text;
    if (imageUrl !== null) $scenes[key].image = imageUrl;
    showEditor = false;
    $rerender = !$rerender;
  }
</script>

<DragGui {pos}>
  <TopBar bind:toggle={showEditor}/>
  <div><h1>{key}</h1></div>
  <div>
    <h2 class="no-select">Texto</h2>
    <textarea bind:value={text} on:mousedown|stopPropagation></textarea>
  </div>
  <div>
    <h2 class="no-select">Imagen (opcional)</h2>
    <div>
      <label for="inp">Url:</label>
      <input id="inp" type="text" bind:value={imageUrl} on:mousedown|stopPropagation />
      o
      <ImgUpload bind:imageUrl/>
    </div>
  <div class="bar">
    <button class="gui-button" on:click={acceptEdit}>Aceptar</button>
  </div>
</DragGui>

<style>

  h1 {
    font-size: 16px;
    margin: 4px 0px;
    padding: 0px;
    text-align: center;
  }

  h2 {
    font-size: 14px;
    margin: 4px 0px;
    padding: 0px;
  }

  textarea {
    min-width: 100%;
    min-height: 4em;
    max-width: 700px;
    max-height: 10em;
  }
</style>

