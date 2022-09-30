<script>
  import { scenes } from '../stores/store.js';
  import { getOptionsKey } from '../stores/helpers.js';
  import DragGui from './DragGui.svelte';
  import TopBar from './TopBar.svelte';

  export let key;
  export let pos;
  export let showNewOutput;

  const optionsKey = $getOptionsKey($scenes[key]);
  $: text = '';

  function acceptEdit() {
    if ($scenes[key][optionsKey] === undefined) { $scenes[key][optionsKey] = [] }
    $scenes[key][optionsKey].push({btn: text});
    $scenes = $scenes;
    showNewOutput = false;
  }
</script>

<DragGui {pos}>
  <TopBar bind:toggle={showNewOutput}/>
  <div>
    <label for="inp">Btn:</label>
    <input id="inp" type="text" bind:value={text} on:mousedown|stopPropagation/>
  </div>
  <div class="bar">
    <button on:click={acceptEdit}>Aceptar</button>
  </div>
</DragGui>

<style>
  .bar {
    display: flex;
    justify-content: right;
  }
</style>