<script>
  export let pos;
  export let displace = {x: pos.x, y: pos.y};

  function setPos(node) {
    node.style.left = `${displace.x}px`;
    node.style.top = `${displace.y}px`;
  }

  function drag(node) {
		let moving = false;
    node.style.left = `${displace.x}px`;
    node.style.top = `${displace.y}px`;

		node.addEventListener('mousedown', () => {
		  moving = true;
		});
    
		window.addEventListener('mousemove', (e) => {
			if (moving) {
        displace.x += e.movementX;
				displace.y += e.movementY;
        node.style.left = `${displace.x}px`;
        node.style.top = `${displace.y}px`;
        node.style.cursor = 'grabbing';
			}
		});
		
		window.addEventListener('mouseup', () => {
		  moving = false;
      node.style.cursor = 'grab';
		});
	}
</script>

<div use:setPos|once use:drag class="draggui" on:mousedown|stopPropagation>
  <slot></slot>
</div>


<style>
  .draggui {
    box-sizing: border-box;
    display: grid;
    grid-gap: 10px;
    position: absolute;
    padding: 10px;
    border: solid 3px var(--drag-stroke);
    border-radius: 10px;
    background: var(--drag-fill);
    z-index: 2;
  }
</style>