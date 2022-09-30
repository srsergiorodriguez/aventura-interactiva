<script>
  import { scenes } from '../stores/store.js';
  export let key;
  export let movingNode = false;

  let scene = $scenes[key];
  $: { scene = $scenes[key] }

  if (scene.display === undefined) {
    scene.display = {x: 0, y: 0, ops: []};
  }

  function drag(node) {
		let moving = false;

		node.style.left = `${scene.display.x}px`;
    node.style.top = `${scene.display.y}px`;

		node.addEventListener('mousedown', () => {
		  moving = true;
      movingNode = true;
		});

		window.addEventListener('mousemove', (e) => {
			if (moving) {
        scene.display.x += e.movementX;
				scene.display.y += e.movementY;
        node.style.left = `${scene.display.x}px`;
				node.style.top = `${scene.display.y}px`;
        $scenes[key] = scene;
			}
		});
		
		window.addEventListener('mouseup', () => {
		  moving = false;
      movingNode = false;
		});
	}
</script>

<div use:drag class="scene-node-container">
  <slot></slot>
</div>
 
<style>
  .scene-node-container {
    padding: 10px 5px;
    border: solid 2px var(--scene-stroke);
    border-radius: 10px;
    background: var(--scene-fill);
    cursor: move;
    position: absolute;
    user-select: none;
    display: grid;
    grid-gap: 5px;
  }
</style>