<svelte:head>
  <style>
      @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;500;700&display=swap");
  </style>
</svelte:head>

<slot></slot>

<style>
  :global(:root){
    --project-stroke: black;
    --project-fill: #41535b;
    --project-fill-light: #6a8e9e;
    --input-stroke: #0084ff;
    --scene-stroke: #ff373a;
    --area-stroke: #ffb300;
    --scene-fill: #fff1da;
    --drag-stroke: black;
    --drag-fill: #bbd6e2;
    --btn-hover: #88a4ae;
    --btn-active: #536a74;

    --main-font: "Arial", Sans-Serif;
    font-family: var(--main-font);
  }

  :global(.no-select)  {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  :global(.x-button) {
		background: none;
    border: none;
    cursor: pointer;
    border-radius: 1em;
    max-width: 2em;
    max-height: 2em;
	}

  :global(.x-button:hover) {
    background: var(--btn-hover);
  }

  :global(.x-button:active) {
    background: var(--btn-active);
  }

  :global(body) {
    background: var(--project-fill-light);
    /* background: var(--project-fill); */
  }

  :global(button, label, textarea) {
    font-family: var(--main-font);
  }

  :global(.gui-button) {
    background: white;
    border-radius: 4px;
    border: solid 1px var(--drag-stroke);
    cursor: pointer;
  }

  :global(button:hover) {
    background: var(--btn-hover);
  }

  :global(button:active) {
    background: var(--btn-active);
  }

  :global(.gui-button:hover) {
    background: var(--btn-hover);
  }

  :global(.gui-button:active) {
    background: var(--btn-active);
  }

  :global(.bar) {
    display: flex;
    justify-content: right;
  }
</style>