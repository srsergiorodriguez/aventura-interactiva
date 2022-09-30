<script>
  import { scenes } from '../stores/store.js';
  export let key;
  export let mouse;

  let scene = $scenes[key];
  $: { scene = $scenes[key] }

  $: opCoords = (scene.options || scene.opciones || []).map((s, i) => {
    const toScene = s.escena || s.scene;
    if (toScene === undefined) {
      if (scene.display.ops[i].rewiring) { 
        return mouse
      } else {
        return scene.display
      }
    } else {
      return $scenes[toScene].display
    }
  });

  $: aCoords = (scene.areas || []).map((s, i) => {
    const toScene = s.escena || s.scene;
    if (toScene === undefined) {
      if (scene.display.areas[i].rewiring) { 
        return mouse
      } else {
        return scene.display
      }
    } else {
      return $scenes[toScene].display
    }
  });

</script>
<g>
  {#each scene.display.ops || [] as op, i ('op'+i)}
    <line class='op-connection' x1={scene.display.x + op.x + 7} y1={scene.display.y + op.y + 10} x2={opCoords[i].x + 5} y2={opCoords[i].y + 5}></line>
  {/each}
  {#each scene.display.areas || [] as op, i ('a'+i)}
    <line class='a-connection' x1={scene.display.x + op.x + 7} y1={scene.display.y + op.y + 10} x2={aCoords[i].x + 5} y2={aCoords[i].y + 5}></line>
  {/each}
</g>

<style>
  .op-connection {
    stroke: var(--scene-stroke);
    stroke-width: 3px;
  }

  .a-connection {
    stroke: var(--area-stroke);
    stroke-width: 3px;
  }
</style>