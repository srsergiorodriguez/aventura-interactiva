<script>
  import SceneNode from './SceneNode.svelte';
  import Connections from './Connections.svelte';
  import NewScene from './NewScene.svelte';

  import { scenes } from '../stores/store.js';

  import { onMount } from 'svelte';
  import { getOptionsKey, getSceneKey } from '../stores/helpers';

  let ready = false;
  onMount(() => {ready = true })

  export let showNewScene;

  $: keys = Object.keys($scenes);

  $: minimapScenes = Object.entries($scenes);

  $: if (pageMouse) { minimapScenes = minimapScenes }

  let movingNode;
  let pageMouse = {};

  let w, h;
  let movingPage = false;
  const pageDisplacement = {x: 0, y: 0};
  let scaleFactor = 20;
  let minimapKey;

  function setPageFromMinimap(e) {
    const nodePage = document.querySelector(".node-page");
    const nodeStyle = getComputedStyle(nodePage);
    const nodeW = +nodeStyle.width.replace('px','');
    const nodeH = +nodeStyle.height.replace('px','');
    const pageContainer = document.querySelector(".page-container");
    const pageStyle = getComputedStyle(pageContainer);
    const contBorder = +pageStyle.borderWidth.replace('px','') * 2;
    const contW = +pageStyle.width.replace('px','') - contBorder;
    const contH = +pageStyle.height.replace('px','') - contBorder;
    pageDisplacement.x = (-e.offsetX * scaleFactor) + (contW/2);
    pageDisplacement.y = (-e.offsetY * scaleFactor) + (contH/2);
    pageDisplacement.x = pageDisplacement.x > 0 ? 0 : -pageDisplacement.x > nodeW - contW ? -nodeW + contW : pageDisplacement.x;
    pageDisplacement.y = pageDisplacement.y > 0 ? 0 : -pageDisplacement.y > nodeH - contH ? -nodeH + contH : pageDisplacement.y;
    nodePage.style.left = `${pageDisplacement.x}px`;
    nodePage.style.top = `${pageDisplacement.y}px`;
  }

  function mouseDown() {
    movingPage = true;
    this.style.cursor = 'grabbing';
  }

  function mouseUp() {
    movingPage = false;
    this.style.cursor = 'grab';
  }

  function mouseMove(e) {
		if (movingPage && !movingNode) {
      if (w === undefined) { w = +(getComputedStyle(this).width.replace('px','')) };
      if (h === undefined) { h = +(getComputedStyle(this).height.replace('px','')) };
      const contBorder = +(getComputedStyle(this.offsetParent).borderWidth.replace('px','')) * 2;
      const contW = +(getComputedStyle(this.offsetParent).width.replace('px','')) - contBorder;
      const contH = +(getComputedStyle(this.offsetParent).height.replace('px','')) - contBorder;

      pageDisplacement.x += e.movementX;
			pageDisplacement.y += e.movementY;
      pageDisplacement.x = pageDisplacement.x > 0 ? 0 : contW - pageDisplacement.x > w ? contW - w : pageDisplacement.x;
      pageDisplacement.y = pageDisplacement.y > 0 ? 0 : contH - pageDisplacement.y > h ? contH - h : pageDisplacement.y;
      this.style.left = `${pageDisplacement.x}px`;
      this.style.top = `${pageDisplacement.y}px`;
		}

    pageMouse = {x: e.offsetX, y: e.offsetY};

    let el = e.target;
    while (true) {
      if (el === this) break
      pageMouse.x += el.offsetLeft;
      pageMouse.y += el.offsetTop;
      el = el.offsetParent
    }
	}

  function toFront(node) {
    [...document.getElementsByClassName("scene-node-container")].forEach(e => e.style.zIndex = "0");
    node.target.firstChild.style.zIndex = "1";
  }

  function getNodeSize(key, dimension) {
    const nodeContainer = document.querySelector(`.scene-node-container[key=${key}]`);
    const nodeStyle = getComputedStyle(nodeContainer);
    return Math.floor(+nodeStyle[dimension].replace("px","") / scaleFactor)
  }

  function getNodeTarget(base, op, axis) {
    const targetSceneKey = op[$getSceneKey(op)];
    const targetScene = $scenes[targetSceneKey];
    if (targetScene  === undefined) return (base.display[axis]/scaleFactor) 
    return targetScene.display[axis]/scaleFactor + (axis === "x" ? getNodeSize(targetSceneKey, "width")/2 : 0)
  }
</script>

<div
  class="node-page"
  on:mousedown={mouseDown}
  on:mouseup={mouseUp}
  on:mousemove={mouseMove}
  on:mouseleave={mouseUp}
  >
  {#each keys as key (key)}
    <div on:mouseenter={toFront} class="scene-node-container-div" {key}>
      <SceneNode {key} bind:movingNode/>
    </div>
  {/each}
  <svg class="connections-container">
    {#each keys as key (key)}
      <Connections {key} {pageMouse} {movingNode}/>
    {/each}
  </svg>

  {#if showNewScene}
    <NewScene bind:showNewScene offset={pageDisplacement}/>
  {/if}
</div>
<div class="minimap-container" on:mousedown|stopPropagation>
  {#if ready}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <svg width="100%" height="100%" on:click={setPageFromMinimap}>
      {#each minimapScenes as [key_, scene_] (key_)}

        {#each scene_[$getOptionsKey(scene_)] || [] as op, i (i)}
          <line 
            x1={scene_.display.x/scaleFactor + getNodeSize(key_, "width")/2}
            y1={scene_.display.y/scaleFactor + getNodeSize(key_, "height")}
            x2={getNodeTarget(scene_, op, "x")}
            y2={getNodeTarget(scene_, op, "y")}
            stroke="var(--scene-stroke)"
          >
          </line>
        {/each}

        {#each scene_.areas || [] as op, i (i)}
          <line 
            x1={scene_.display.x/scaleFactor + getNodeSize(key_, "width")/2}
            y1={scene_.display.y/scaleFactor + getNodeSize(key_, "height")}
            x2={getNodeTarget(scene_, op, "x")}
            y2={getNodeTarget(scene_, op, "y")}
            stroke="var(--area-stroke)"
          >
          </line>
        {/each}

        <rect class="minimap-rect"
          x={scene_.display.x/scaleFactor}
          y={scene_.display.y/scaleFactor}
          width={getNodeSize(key_, "width")}
          height={getNodeSize(key_, "height")}
          on:mouseleave={() => {minimapKey = undefined}}
          on:mouseenter={() => {minimapKey = key_}}
        >
        </rect>
        
      {/each}
      {#if minimapKey !== undefined}
        <text x={5} y={343} fill={"#ffffff99"} font-size="0.9em">{minimapKey}</text>
      {/if}
    </svg>
  {/if}
</div>

<style>
  .node-page {
    position: absolute;
    box-sizing: border-box;
    width: 2500px;
    height: 7000px;
    background: var(--project-fill);
    background-image: url("../assets/blueprint.png");
    background-size: 40px;
    overflow: hidden;
    cursor: grab;
    border: dashed 2px var(--drag-fill);
  }

  .connections-container {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .minimap-container {
    position: absolute;
    border: solid 3px var(--project-stroke);;
    background: var(--project-fill-light);
    right: 10px;
    top: 10px;
    width: 125px;
    height: 350px;
    z-index: 2;
    cursor: pointer;
  }

  .minimap-rect {
    fill: var(--scene-fill);
  }
</style>