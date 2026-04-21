<script>
  import { scenes } from '../stores/store.js';
  import { getOptionsKey } from '../stores/helpers.js';
  import DragGui from './DragGui.svelte';
  import TopBar from './TopBar.svelte';

  export let key;
  export let pos;
  export let showNewOption;

  const optionsKey = $getOptionsKey($scenes[key]);
  $: text = '';

  function acceptEdit() {
    if ($scenes[key][optionsKey] === undefined) { $scenes[key][optionsKey] = [] }
    $scenes[key][optionsKey].push({ btn: text });
    $scenes = $scenes;
    showNewOption = false;
  }

  function keyHandler(e) {
    if (e.key === 'Enter') {
      acceptEdit();
    }
    if (e.key === 'Escape') {
      showNewOption = false;
    }
  }
  
</script>

<DragGui {pos}>
  <TopBar bind:toggle={showNewOption}/>
  <div>
    <label for="inp">Btn:</label>
    <!-- svelte-ignore a11y-autofocus -->
    <input id="inp" type="text" bind:value={text} on:mousedown|stopPropagation autofocus/>
  </div>
  <div class="bar">
    <button class="gui-button" on:click={acceptEdit}>Aceptar</button>
  </div>
</DragGui>

<svelte:window on:keydown={keyHandler} />

<style>
  .bar {
    display: flex;
    justify-content: right;
  }
</style>