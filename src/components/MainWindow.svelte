<script>
  import Toolbar from './Toolbar.svelte'
  import Page from './Page.svelte'
  import DragGui from './DragGui.svelte';
  import TopBar from './TopBar.svelte';

  import { scenes } from '../stores/store'
  import { a } from '../stores/aventura'
 
  let showNewScene = false;
  let showTest = false;
  let testPos = {x: 40, y: 40};

  function testStory() {
    console.log($scenes);
    const prevContainer = document.getElementById('storygeneraldiv');
    if (prevContainer) prevContainer.remove();
    const aventura = new $a('es', {
      adventureSlide: false,
      typewriterSpeed: 20
    });
    const topScene = Object.entries($scenes).sort((a, b) => a[1].display.y - b[1].display.y);
    if (topScene.length === 0) { alert("No hay escenas / There are no scenes"); return }
    aventura.setScenes($scenes).startAdventure(topScene[0][0]);
    const parent = document.getElementById('test-story-container');
    const child = document.getElementById('storygeneraldiv');
    parent.appendChild(child);
  }

</script>
<div class="main-window-container">
  <Toolbar bind:showNewScene bind:showTest />
  <div class="static-page-container">
    <div class="page-container">
      <Page bind:showNewScene />
    </div>
  </div>
  {#if showTest}
    <DragGui pos={testPos}>
      <TopBar bind:toggle={showTest}/>
      <div use:testStory class="test-story-container" id="test-story-container"></div>
    </DragGui>
  {/if}
</div>

<style>
  .main-window-container {
    width: 100%;
  }

  .static-page-container {
    width: 100%;
    height: 740px;
  }

  .page-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: solid var(--project-stroke);
    border-width: 3px;
    margin: auto;
    position: relative; /* contains all nodes */
    overflow: hidden;
  }

  .test-story-container {
    min-width: 600px;
  }
</style>