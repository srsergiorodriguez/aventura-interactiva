<script>
  import { scenes } from '../stores/store.js';
  import DragGui from './DragGui.svelte';
  import TopBar from './TopBar.svelte';
  import { getImgKey } from '../stores/helpers.js';
  
  export let key;
  export let pos;
  export let showNewArea;

  $: btn = '';
  $: tooltip = '';
  $: name = 'area';

  let image;

  let scene = $scenes[key];
  const imgKey = $getImgKey(scene);
  let area = {};
  let areaDiv;
  let coords;

  function drag(node) {
		let moving = false;

		node.addEventListener('mousedown', (e) => {
      e.preventDefault();
		  moving = true;
      coords = {x1: e.offsetX, y1: e.offsetY, x2: e.offsetX, y2: e.offsetY}
		});
    
		node.addEventListener('mousemove', (e) => {
			if (moving) { adjustCoords(e) }
		});
		
		node.addEventListener('mouseup', (e) => { out(e) });
    node.addEventListener('mouseout', (e) => { out(e)});

    function out(e) {
      if (coords === undefined || !moving) return
		  moving = false;
      const rect = adjustCoords(e);
      const proportioned = {};
      for (let k of Object.keys(rect)) {
        proportioned[k] = Math.floor(rect[k] * image.naturalWidth / image.width);
      }
      Object.assign(area, {...proportioned });
      area.x = Math.floor(proportioned.x + proportioned.w/2);
      area.y = Math.floor(proportioned.y + proportioned.h/2);
    }
	}

  function adjustCoords(e) {
    coords.x2 = e.offsetX;
    coords.y2 = e.offsetY;

    const minX = Math.min(coords.x1, coords.x2);
    const maxX = Math.max(coords.x1, coords.x2);
    const minY = Math.min(coords.y1, coords.y2);
    const maxY = Math.max(coords.y1, coords.y2);

    const rect = {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY
    }

    areaDiv.style.width = `${rect.w}px`;
    areaDiv.style.height = `${rect.h}px`;
    areaDiv.style.top = `${rect.y}px`;
    areaDiv.style.left = `${rect.x}px`; 

    return rect
  }

  function acceptEdit() {
    if (area === undefined) { alert('debes escoger un area / you must choose an area'); return}
    Object.assign(area, {btn, tooltip, name});
    if ($scenes[key].areas === undefined) { $scenes[key].areas = [] }
    $scenes[key].areas.push(area);
    $scenes = $scenes;
    showNewArea = false;
  }

</script>

<DragGui {pos}>
  <TopBar bind:toggle={showNewArea}/>
  <div><h1>{key}</h1></div>
  <div class="inputs">
    <div class="input">
      <h2>Nombre de referencia</h2>
      <input bind:value={name} on:mousedown|stopPropagation/>
    </div>
    <div class="input">
      <h2>Btn</h2>
      <input bind:value={btn} on:mousedown|stopPropagation/>
    </div>
    <div class="input">
      <h2>Tooltip</h2>
      <input bind:value={tooltip} on:mousedown|stopPropagation/>
    </div>
  </div>
  <div class="area-normal-container">
    <div class="area-absolute-container" on:mousedown|stopPropagation>
      <div class="area-container">
        <img src={scene[imgKey]} alt="Preview" class="img-preview" bind:this={image} use:drag>
        {#if coords}
          <div class="area" on:mousedown|stopPropagation bind:this={areaDiv}>{btn}</div>
        {/if}
      </div>
    </div>
  </div>
  
  <div class="bar">
    <button on:click={acceptEdit}>Aceptar</button>
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
    font-size: 12px;
    margin: 4px 0px;
    padding: 0px;
  }

  .inputs {
    width: 100%;
    display: flex;
    gap: 5px;
  }

  .area-normal-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .area-absolute-container {
    position: relative;
  }

  .area {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0px;
    height: 0px;
    border: solid 1px red;
    pointer-events: none;

    color: white;
    -webkit-text-fill-color: black;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: white;
  }

  .img-preview {
    cursor: crosshair;
    border: solid 1px lightgray;
    max-width: 100%;
    max-height: 500px;
  }

  .bar {
    display: flex;
    justify-content: right;
  }
</style>