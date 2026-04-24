<script>
  import { aventuraState, compileFlowToAventura } from '../state.svelte.js';
  import { findStartNode } from '../lib/helpers.js';
  import { i18n } from '../lib/i18n.svelte.js';
  import Aventura from '../lib/aventura.esm.js';

  let { isOpen = false, onClose } = $props();
  
  let containerRef;

  $effect(() => {
    if (isOpen && containerRef) {
      
      containerRef.innerHTML = '';
      const oldGlobalDiv = document.getElementById('storygeneraldiv');
      if (oldGlobalDiv) oldGlobalDiv.remove();

      const oldThemeStyles = document.getElementById('aventura-theme-styles');
      if (oldThemeStyles) oldThemeStyles.remove();

      if (aventuraState.nodes.length === 0) {
        alert(i18n.t('no_scenes'));
        onClose();
        return;
      }

      let storyJSON = compileFlowToAventura();
      const startNodeId = findStartNode(aventuraState.nodes);

      const engineOptions = JSON.parse(JSON.stringify(aventuraState.options));
      const engine = new Aventura(i18n.lang, engineOptions);

      engine.setGrammar(engineOptions.grammar || {});

      if (engineOptions.igrama) {
        engine.setIgrama(engineOptions.igrama);
      }
      
      engine.setScenes(storyJSON).startAdventure(startNodeId);

      requestAnimationFrame(() => {
        const generatedDiv = document.getElementById('storygeneraldiv');
        if (generatedDiv) {
          containerRef.appendChild(generatedDiv);
        }
      });
    }
  });
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div class="modal-content">
      <header class="modal-header">
        <h3>{i18n.t('testing_story')}</h3>
        <button class="btn-close" onclick={onClose}>x</button>
      </header>
      
      <div class="modal-body">
        <div class="story-container" bind:this={containerRef}></div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Layout constraints */
  .modal-backdrop {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: flex; align-items: center; justify-content: center;
    z-index: 2000;
  }

  .modal-content {
    background: var(--bg-color); border: var(--border-main);
    width: 100vw; height: 100vh; max-width: 800px; max-height: 90vh;
    display: flex; flex-direction: column;
    box-shadow: 12px 12px 0px rgba(0,0,0,1);
  }

  .modal-header {
    padding: 1rem; background: var(--text-color); color: var(--bg-color);
    display: flex; justify-content: space-between; align-items: center;
  }
  
  .modal-header h3 { 
    margin: 0; text-transform: lowercase; font-family: 'Inconsolata', monospace; 
  }

  /* Engine Container Constraints */
  .modal-body {
    flex-grow: 1; 
    overflow-y: auto; 
    padding: 2rem;
    display: flex; 
    justify-content: center; 
    align-items: flex-start;
    background: #eee;
  }

  .story-container {
    width: 100%; 
    max-width: 600px;
    background: var(--bg-color);
    border: var(--border-main);
    box-shadow: 6px 6px 0px rgba(0,0,0,0.2);
    /* min-height: 50vh; */
    height: fit-content;
  }
</style>