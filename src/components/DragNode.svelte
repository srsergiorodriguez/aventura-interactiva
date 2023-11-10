<script>
  export let scene;
  export let movingNode = false;
  export let key;

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
			}
		});
		
		window.addEventListener('mouseup', () => {
		  moving = false;
      movingNode = false;
		});
	}
</script>

<div use:drag class="scene-node-container" {key}>
  <slot></slot>
</div>
 
<style>
  .scene-node-container {
    padding: 0.8em;
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