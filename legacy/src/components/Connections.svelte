<script>
  import { getOptionsKey, getSceneKey } from '../stores/helpers';
import { scenes, currentWiring } from '../stores/store';
import { onMount } from 'svelte';

export let key;
export let pageMouse;
export let movingNode;

let scene = $scenes[key];
let optionsKey = $getOptionsKey(scene);

let ready = false;
onMount(() => { ready = true })

$: if (pageMouse || $scenes || movingNode) {
  scene.display = scene.display;
}

function getCoord1(axis, type, i) {
  const output = document.querySelector(`[type=${type}][i="${i}"][key=${key}]`);
  if (!output) return $scenes[key].display[axis]
  const offset = axis === "x" ? output.offsetLeft : output.offsetTop;
  const size = axis === "x" ? output.offsetWidth / 2 + 2: output.offsetHeight;
  
  return $scenes[key].display[axis] + offset + size;
}

function getCoord2(axis, type, i) {
  const optionsKey_ = type === 'ops' ? optionsKey : 'areas';
  const option = scene[optionsKey_][i];
  const sceneKey = $getSceneKey(option);
  const toScene = scene[optionsKey_][i][sceneKey];

  if ($currentWiring !== undefined) {
    if ($currentWiring.key === key && $currentWiring.i === i && $currentWiring.type === type) {
      return pageMouse[axis]
    }
  }
  
  if (toScene === undefined) {
    return getCoord1(axis, type, i)
  } else {
    const input = document.querySelector(`.input[key=${toScene}]`);
    return $scenes[toScene].display[axis] + (axis === "x" ? input.offsetLeft : input.offsetTop) + 7;
  }
  
}

function getPath(type, i) {
  const from = {x: getCoord1('x',type, i), y: getCoord1('y',type, i)};
  const to = {x: getCoord2('x',type, i), y: getCoord2('y',type, i)};
  const mid1 = (to.y - from.y)/2;
  const mid2 = (from.y - to.y)/2;
  return `M ${from.x}, ${from.y} C ${from.x}, ${from.y + mid1} ${to.x}, ${to.y + mid2} ${to.x}, ${to.y}`
}

</script>

{#if ready}
<g>
{#each scene[optionsKey] || [] as _, i ('op'+i)}
  <path class='connection op-connection' d={getPath('ops',i)} />
{/each}
{#each scene.areas || [] as _, i ('a'+i)}
  <path class='connection a-connection' d={getPath('areas',i)} />
{/each}
</g>
{/if}

<style>
.connection {
  fill: none;
  stroke-width: 3px;
}

.op-connection {
  stroke: var(--scene-stroke);
}

.a-connection {
  stroke: var(--area-stroke);
}
</style>