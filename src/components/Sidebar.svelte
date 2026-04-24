<script>
  import { aventuraState, addScene, updateSelectedNodeData, compileFlowToAventura, loadAventuraToFlow } from '../state.svelte.js';
  import { processImageFile, downloadFile, findStartNode, generateStandaloneHTML } from '../lib/helpers.js';
  import { i18n } from '../lib/i18n.svelte.js';

  import AreaModal from './AreaModal.svelte';
  import PreviewModal from './PreviewModal.svelte';
  import OptionsModal from './OptionsModal.svelte';
  import GrammarModal from './GrammarModal.svelte';

  // Imports the engine code as a raw string for standalone HTML compilation
  import rawEngineCode from '../lib/aventura.esm.js?raw';
  import rawMiniGifCode from '../lib/MiniGif.js?raw';

  let newSceneInput = $state('');
  let isAreaModalOpen = $state(false);
  let isPreviewModalOpen = $state(false);
  let isOptionsModalOpen = $state(false);
  let isGrammarModalOpen = $state(false);

  // Reactive derivation of the currently selected node's data
  let selectedNode = $derived(aventuraState.nodes.find(n => n.id === aventuraState.selectedNodeId));

  // --- NODE DATA HANDLERS ---
  
  function handleAddScene() {
    addScene(newSceneInput);
    newSceneInput = '';
  }

  function handleTextChange(e) {
    updateSelectedNodeData({ text: e.target.value });
  }

  function addOption() {
    const currentOptions = selectedNode.data.options || [];
    updateSelectedNodeData({ options: [...currentOptions, { btn: "new option" }] });
  }

  function updateOption(index, value) {
    const newOptions = [...selectedNode.data.options];
    newOptions[index].btn = value;
    updateSelectedNodeData({ options: newOptions });
  }

  function removeOption(index) {
    const newOptions = selectedNode.data.options.filter((_, i) => i !== index);
    updateSelectedNodeData({ options: newOptions });
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const webpDataUrl = await processImageFile(file);
      updateSelectedNodeData({ image: webpDataUrl });
    } catch (err) {
      alert("failed to process image");
    }
  }

  // --- I/O PIPELINE ---

  function handleExportJSON() {
    const storyJSON = compileFlowToAventura();
    downloadFile(JSON.stringify(storyJSON, null, 2), "historia_aventura.json", "application/json");
  }

  function handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        loadAventuraToFlow(parsed);
        aventuraState.selectedNodeId = null; 
      } catch (err) {
        alert("Failed to parse JSON file!");
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  }

  function handleExportHTML() {
    if (aventuraState.nodes.length === 0) return alert("no scenes to export!");
    let storyJSON = compileFlowToAventura();
    const startNode = findStartNode(aventuraState.nodes);
    
    const htmlString = generateStandaloneHTML(
      rawEngineCode, 
      storyJSON, 
      aventuraState.options, 
      startNode, 
      i18n.lang, 
      rawMiniGifCode
    );
    
    downloadFile(htmlString, "juego_aventura.html", "text/html");
  }
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <div class="header-top">
      <div>
        <h1>aventura interactiva</h1>
        <p>v2</p>
      </div>
      <div class="lang-toggle" style="display: flex; gap: 0.5rem;">
        <button class="btn {i18n.lang === 'en' ? 'btn-primary' : 'btn-secondary'}" style="padding: 0.1rem 0.4rem;" onclick={() => i18n.lang = 'en'}>EN</button>
        <button class="btn {i18n.lang === 'es' ? 'btn-primary' : 'btn-secondary'}" style="padding: 0.1rem 0.4rem;" onclick={() => i18n.lang = 'es'}>ES</button>
      </div>
    </div>
    
    <button class="btn btn-primary w-full mt-1" onclick={() => isPreviewModalOpen = true}>{i18n.t('test_story')}</button>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.25rem;">
      <button class="btn btn-secondary" onclick={() => isGrammarModalOpen = true}>{i18n.t('grammar_editor')}</button>
      <button class="btn btn-secondary" onclick={() => isOptionsModalOpen = true}>{i18n.t('engine_opts')}</button>
    </div>
  </div>

  <div class="sidebar-content">
    {#if selectedNode}
      <div class="editor-panel">
        <h3 class="ui-section-title">{i18n.t('editing')} {selectedNode.id}</h3>
        
        <div class="control-group">
          <label>{i18n.t('text')}</label>
          <textarea rows="6" value={selectedNode.data.text} oninput={handleTextChange}></textarea>
        </div>

        <div class="control-group">
          <label>{i18n.t('options')}</label>
          {#each selectedNode.data.options || [] as op, i}
            <div class="option-row">
              <input type="text" value={op.btn} oninput={(e) => updateOption(i, e.target.value)} />
              <button class="btn btn-danger" onclick={() => removeOption(i)}>x</button>
            </div>
          {/each}
          <button class="btn btn-secondary w-full mt-1" onclick={addOption}>{i18n.t('add_option')}</button>
        </div>

        <div class="control-group">
          <label>{i18n.t('image')}</label>
          {#if selectedNode.data.image}
            <div class="image-preview-mini">
              <img src={selectedNode.data.image} alt="preview" />
              <button class="btn btn-danger w-full mt-1" onclick={() => updateSelectedNodeData({ image: null, areas: [] })}>{i18n.t('btn_remove_img')}</button>
            </div>
            <button class="btn btn-primary w-full mt-1" onclick={() => isAreaModalOpen = true}>{i18n.t('btn_edit_areas')}</button>
          {:else}
            <label class="btn btn-secondary w-full file-upload-btn">
              {i18n.t('btn_upload_img')}
              <input type="file" accept="image/*" onchange={handleImageUpload} hidden />
            </label>
          {/if}
        </div>

        {#if aventuraState.options.igrama}
          <div class="control-group">
            <label>{i18n.t('igrama_rule')}</label>
            <input 
              type="text" 
              placeholder={i18n.t('igrama_placeholder')}
              value={selectedNode.data.igrama || ''} 
              oninput={(e) => updateSelectedNodeData({ igrama: e.target.value })} 
              style="width: 100%; box-sizing: border-box; padding: 0.5rem; font-family: monospace;"
            />
          </div>
        {/if}

        <button class="btn btn-secondary w-full" style="border-style: dashed; margin-top: 2rem;" onclick={() => aventuraState.selectedNodeId = null}>
          {i18n.t('back_canvas')}
        </button>
      </div>

    {:else}
      <div class="creator-panel">
        <h3 class="ui-section-title">{i18n.t('add_scene')}</h3>
        <div class="control-group">
          <input type="text" placeholder="scene_name" bind:value={newSceneInput} onkeydown={(e) => e.key === 'Enter' && handleAddScene()} />
          <button class="btn btn-secondary w-full mt-1" onclick={handleAddScene}>{i18n.t('btn_create')}</button>
        </div>
      </div>
    {/if}
  </div>

  <footer class="sidebar-footer">
    <div class="io-grid">
      <label class="btn btn-secondary io-btn">
        {i18n.t('load_json')}
        <input type="file" accept=".json" onchange={handleImportJSON} hidden />
      </label>
      <button class="btn btn-secondary io-btn" onclick={handleExportJSON}>{i18n.t('save_json')}</button>
      <button class="btn btn-primary io-btn btn-export" onclick={handleExportHTML}>{i18n.t('export_html')}</button>
    </div>
    
    <div class="credits" style="text-align: center; margin-top: 1rem; font-size: 0.75rem; opacity: 0.7;">
      {i18n.t('powered_by')} <strong>Aventura</strong> | 
      <a href="https://github.com/srsergiorodriguez/aventura" target="_blank" style="color: inherit;">{i18n.t('source_code')}</a>
    </div>
  </footer>
</aside>

<PreviewModal isOpen={isPreviewModalOpen} onClose={() => isPreviewModalOpen = false} />
<AreaModal isOpen={isAreaModalOpen} nodeData={selectedNode} onSave={(newAreas) => updateSelectedNodeData({ areas: newAreas })} onClose={() => isAreaModalOpen = false} />
<OptionsModal isOpen={isOptionsModalOpen} onClose={() => isOptionsModalOpen = false} />
<GrammarModal isOpen={isGrammarModalOpen} onClose={() => isGrammarModalOpen = false} />

<style>
  /* Layout constraints */
  .sidebar {
    width: 300px;
    background: var(--bg-color);
    border-left: var(--border-main);
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-shrink: 0;
  }
  
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: var(--border-main);
    background: var(--text-color);
    color: var(--bg-color);
  }
  
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .header-top h1 { margin: 0; font-size: 1.5rem; }
  .header-top p { margin: 0; font-size: 0.9rem; opacity: 0.8; }

  .sidebar-content {
    flex-grow: 1;
    overflow-y: auto;
  }

  .editor-panel, .creator-panel { padding: 1.5rem; }

  /* Input Groupings */
  .control-group { margin-bottom: 1.5rem; }
  .control-group label { display: block; font-weight: bold; margin-bottom: 0.5rem; }
  .option-row { display: flex; gap: 0.5rem; margin: 4px 0; }
  
  .file-upload-btn { display: block; border-style: dashed; }
  .image-preview-mini img { width: 100%; border: var(--border-main); display: block; }

  /* Footer Section */
  .sidebar-footer {
    padding: 1rem;
    background: var(--text-color);
    border-top: var(--border-main);
    color: var(--bg-color);
  }

  .io-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  
  .io-btn { padding: 0.5rem 0.2rem; font-size: 0.85rem; }
  .btn-export { grid-column: span 2; font-size: 1rem; }
</style>