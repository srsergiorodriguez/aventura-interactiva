<script>
  import { scenes } from '../stores/store.js';
  import { getSceneKey, getOptionsKey } from '../stores/helpers.js';
  import NewScene from './NewScene.svelte';
  export let movingNode;
  export let mouse;
  export let showNewScene;

  const blueprint = '../../static/blueprint.png';

  let moving = false;
  const displace = {x: 0, y: 0};

  function setPos(node) {
    node.style.left = `${displace.x}px`;
    node.style.top = `${displace.y}px`;
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
      $scenes[k] = s;
    }
  }

  function mouseDown() {
    moving = true;
    this.style.cursor = 'grabbing';
    resetWirings();
  }

  function mouseUp() {
    moving = false;
    this.style.cursor = 'grab';
  }

  function mouseMove(e) {
		if (moving && !movingNode) {
      const contW = +(getComputedStyle(this.offsetParent).width.replace('px',''));
      const w = +(getComputedStyle(this).width.replace('px',''));

      const contH = +(getComputedStyle(this.offsetParent).height.replace('px',''));
      const h = +(getComputedStyle(this).height.replace('px',''));
      
      displace.x += e.movementX;
			displace.y += e.movementY;
      displace.x = displace.x > 0 ? 0 : contW - displace.x > w ? contW - w : displace.x;
      displace.y = displace.y > 0 ? 0 : contH - displace.y > h ? contH - h : displace.y;
      this.style.left = `${displace.x}px`;
      this.style.top = `${displace.y}px`;
		}
    mouse = {x: e.offsetX, y: e.offsetY};

    let el = e.target;
    while (true) {
      if (el === this) break
      mouse.x += el.offsetLeft;
      mouse.y += el.offsetTop;
      el = el.offsetParent
    }
	}
</script>

<div
  class="node-page" use:setPos
  on:mousedown={mouseDown}
  on:mouseup={mouseUp}
  on:mousemove={mouseMove}
  >
  <slot></slot>
  {#if showNewScene}
    <NewScene bind:showNewScene={showNewScene} offset={displace}/>
  {/if}
</div>

<style>
  .node-page {
    position: absolute;
    box-sizing: border-box;
    width: 2000px;
    height: 5000px;
    background: var(--project-fill);
    background-image: url("../assets/blueprint.png");
    background-size: 40px;
    overflow: hidden;
    cursor: grab;
    border: dashed 2px var(--drag-fill);;
  }
</style>