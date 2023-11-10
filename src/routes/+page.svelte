<script>
  import MainWindow from '../components/MainWindow.svelte';
</script>

<section class="general no-select">
  <div class="main-title">
    <h1>Aventura interactiva</h1>
    <span>Un editor de historias interactivas para la librería <a href="https://github.com/srsergiorodriguez/aventura/blob/master/README_es.md" target="_blank" rel="noreferrer">Aventura.js</a></span>
  </div>
  
  <MainWindow/>
  <footer class="no-select">Sergio Rodríguez Gómez — 2023 — v1.0.0</footer>
</section>

<style>
  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    border-radius: 5px;
    border: 1px solid var(--project-stroke);
  }

  h1 {
    margin: 0px;
    padding: 0em 0em;
    color: var(--project-stroke);
    font-size: 1.5em;
    text-align: center;
  }

  span {
    text-align: center;
    color: var(--project-stroke);
  }

  a {
    color: var(--project-stroke);
  }

  footer {
    text-align: center;
    font-size: 12px;
    padding: 10px 0px;
    color: var(--project-stroke);
  }
</style>