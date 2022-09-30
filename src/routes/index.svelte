<script>
  import DesignWindow from '../components/DesignWindow.svelte';
</script>

<section class="general no-select">
  <h1>Aventura interactiva (beta)</h1>
  <DesignWindow/>
  <footer class="no-select">Sergio Rodríguez Gómez — 2022 — v0.0.2b</footer>
</section>

<style>
  :global(:root){
    --project-stroke: black;
    --project-fill: #41535b;
    --project-fill-light: #74838a;
    --input-stroke: #004cff;
    --scene-stroke: #ff373a;
    --area-stroke: #ffb300;
    --scene-fill: #fff1da;
    --drag-stroke: rgb(21, 182, 226);
    --drag-fill: rgb(224, 253, 252);
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
    padding: 5px;
    cursor: pointer;
	}

  :global(body) {
    background: rgb(49, 49, 49);
  }

  * {
    font-family: "Helvetica", Sans-Serif;
  }

  h1 {
    margin: 0px;
    padding: 10px;
    color: black;
    background: var(--drag-fill);
    font-size: 20px;
    text-align: center;
  }

  footer {
    text-align: center;
    font-size: 12px;
    padding: 10px 0px;
    color: var(--drag-fill);
  }
</style>