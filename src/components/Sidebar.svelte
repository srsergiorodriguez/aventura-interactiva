<script>
  import {
    app,
    addScene,
    addSceneOption,
    newProject,
    openProjectText,
    removeSceneOption,
    saveProjectFile,
    saveSceneAreas,
    setSceneDrawingData,
    setSceneImageData,
    setStartSceneId,
    exportStoryHTML,
    updateSceneField,
    updateSceneOption,
    updateSceneText,
  } from '../state.svelte.js';
  import { processImageFile } from '../lib/helpers.js';
  import { i18n } from '../lib/i18n.svelte.js';
  import { messageForError } from '../lib/error-message.js';
  import { notify } from '../ui/toast.svelte.js';

  import AreaModal from './AreaModal.svelte';
  import PreviewModal from './PreviewModal.svelte';
  import SettingsModal from './SettingsModal.svelte';
  import NewProjectModal from './NewProjectModal.svelte';
  import DrawingStudio from './DrawingStudio.svelte';
  import LicensesModal from './LicensesModal.svelte';
  import GrammarModal from './GrammarModal.svelte';

  let newSceneInput = $state('');
  let isAreaModalOpen = $state(false);
  let isPreviewModalOpen = $state(false);
  let isSettingsModalOpen = $state(false);
  let isNewProjectModalOpen = $state(false);
  let isDrawingStudioOpen = $state(false);
  let isLicensesModalOpen = $state(false);
  let isGrammarModalOpen = $state(false);

  const selectedScene = $derived(
    app.selectedSceneId ? app.project.scenes[app.selectedSceneId] : null,
  );
  const isStart = $derived(
    Boolean(selectedScene && app.project.story.startSceneId === selectedScene.id),
  );
  const saveLabel = $derived.by(() => {
    switch (app.saveState) {
      case 'saving':
        return i18n.t('saving');
      case 'saved':
        return i18n.t('saved');
      case 'error':
        return i18n.t('save_error');
      case 'unavailable':
        return i18n.t('autosave_unavailable');
      default:
        return '';
    }
  });

  function showError(error) {
    notify(messageForError(error), 'error');
  }

  function spawnPosition() {
    const sidebar = 300;
    const centerX = (window.innerWidth - sidebar) / 2;
    const centerY = window.innerHeight / 2;
    const { x, y, zoom } = app.project.view.viewport;
    return {
      x: (centerX - x) / zoom,
      y: (centerY - y) / zoom,
    };
  }

  function handleAddScene() {
    try {
      addScene(newSceneInput, spawnPosition());
      newSceneInput = '';
    } catch (error) {
      showError(error);
    }
  }

  function handleTextChange(event) {
    if (!selectedScene) return;
    updateSceneText(selectedScene.id, event.currentTarget.value);
  }

  function handleAddOption() {
    if (!selectedScene) return;
    try {
      addSceneOption(selectedScene.id, i18n.t('new_option'));
    } catch (error) {
      showError(error);
    }
  }

  function handleUpdateOption(optionId, value) {
    if (!selectedScene) return;
    try {
      updateSceneOption(selectedScene.id, optionId, value);
    } catch (error) {
      showError(error);
    }
  }

  function handleRemoveOption(optionId) {
    if (!selectedScene) return;
    try {
      removeSceneOption(selectedScene.id, optionId);
    } catch (error) {
      showError(error);
    }
  }

  async function handleImageUpload(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file || !selectedScene) return;
    try {
      const image = await processImageFile(file);
      setSceneImageData(selectedScene.id, image);
    } catch (error) {
      showError(error);
    } finally {
      input.value = '';
    }
  }

  function handleRemoveImage() {
    if (!selectedScene) return;
    setSceneImageData(selectedScene.id, null);
  }

  function handleIgramaRule(event) {
    if (!selectedScene) return;
    updateSceneField(selectedScene.id, { igrama: event.currentTarget.value });
  }

  function handleSetStart() {
    if (!selectedScene) return;
    try {
      setStartSceneId(selectedScene.id);
    } catch (error) {
      showError(error);
    }
  }

  function handleSaveAreas(areas) {
    if (!selectedScene) return;
    try {
      saveSceneAreas(selectedScene.id, areas);
    } catch (error) {
      showError(error);
    }
  }

  function handleSaveDrawing(image, drawing) {
    if (!selectedScene) return;
    try {
      setSceneDrawingData(selectedScene.id, image, drawing);
    } catch (error) {
      showError(error);
    }
  }

  async function handleOpenProject(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const title = file.name.replace(/\.json$/i, '');
      openProjectText(text, title);
      notify(i18n.t('project_loaded'));
    } catch (error) {
      showError(error);
    } finally {
      input.value = '';
    }
  }

  function handleSaveProject() {
    try {
      saveProjectFile();
    } catch (error) {
      showError(error);
    }
  }

  function handleExportHTML() {
    try {
      exportStoryHTML();
    } catch (error) {
      showError(error);
    }
  }

  function handleNewProject(mode) {
    isNewProjectModalOpen = false;
    newProject(mode);
  }
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <div class="header-top">
      <div>
        <h1>{i18n.t('title')}</h1>
        <p>{i18n.t('subtitle')}</p>
      </div>
      <div class="lang-toggle">
        <button
          class="btn {i18n.lang === 'en' ? 'btn-primary' : 'btn-secondary'}"
          onclick={() => (i18n.lang = 'en')}
        >EN</button>
        <button
          class="btn {i18n.lang === 'es' ? 'btn-primary' : 'btn-secondary'}"
          onclick={() => (i18n.lang = 'es')}
        >ES</button>
      </div>
    </div>

    <button class="btn btn-primary w-full mt-1" onclick={() => (isPreviewModalOpen = true)}>
      {i18n.t('test_story')}
    </button>
    <div class="header-actions">
      <button class="btn btn-secondary" onclick={() => (isGrammarModalOpen = true)}>
        {i18n.t('grammar_editor')}
      </button>
      <button class="btn btn-secondary" onclick={() => (isSettingsModalOpen = true)}>
        {i18n.t('settings')}
      </button>
    </div>
  </div>

  <div class="sidebar-content">
    {#if selectedScene}
      <div class="editor-panel">
        <h3 class="ui-section-title">{i18n.t('editing')} {selectedScene.id}</h3>

        <div class="control-group">
          <label for="scene-text">{i18n.t('text')}</label>
          <textarea
            id="scene-text"
            rows="6"
            value={selectedScene.text}
            oninput={handleTextChange}
          ></textarea>
        </div>

        <div class="control-group">
          <span class="control-label">{i18n.t('options')}</span>
          {#each selectedScene.options as option, index (option.id)}
            <div class="option-row">
              <input
                type="text"
                value={option.btn}
                aria-label={`${i18n.t('options')} ${index + 1}`}
                oninput={(event) =>
                  handleUpdateOption(option.id, event.currentTarget.value)}
              />
              <button
                class="btn btn-danger"
                aria-label={`${i18n.t('btn_remove')} ${index + 1}`}
                onclick={() => handleRemoveOption(option.id)}
              >x</button>
            </div>
          {/each}
          <button class="btn btn-secondary w-full mt-1" onclick={handleAddOption}>
            {i18n.t('add_option')}
          </button>
        </div>

        <div class="control-group">
          <span class="control-label">{i18n.t('image')}</span>
          {#if selectedScene.image}
            <div class="image-preview-mini">
              <img src={selectedScene.image} alt={i18n.t('scene_image_alt', { name: selectedScene.id })} />
              <button class="btn btn-danger w-full mt-1" onclick={handleRemoveImage}>
                {i18n.t('btn_remove_img')}
              </button>
            </div>
            <button
              class="btn btn-primary w-full mt-1"
              onclick={() => (isAreaModalOpen = true)}
            >
              {i18n.t('btn_edit_areas')}
            </button>
          {:else}
            <label class="btn btn-secondary w-full file-upload-btn">
              {i18n.t('btn_upload_img')}
              <input type="file" accept="image/*" onchange={handleImageUpload} hidden />
            </label>
          {/if}
        </div>

        <button
          class="btn btn-primary w-full drawing-button"
          onclick={() => (isDrawingStudioOpen = true)}
        >
          {selectedScene.drawing ? i18n.t('edit_drawing') : i18n.t('draw')}
        </button>

        {#if app.project.igrama}
          <div class="control-group">
            <label for="igrama-rule">{i18n.t('igrama_rule')}</label>
            <input
              id="igrama-rule"
              type="text"
              placeholder={i18n.t('igrama_placeholder')}
              value={selectedScene.igrama || ''}
              oninput={handleIgramaRule}
            />
          </div>
        {/if}

        <div class="control-group start-group">
          {#if isStart}
            <p class="start-note">● {i18n.t('story_start')}</p>
          {:else}
            <button class="btn btn-secondary w-full" onclick={handleSetStart}>
              {i18n.t('set_start')}
            </button>
          {/if}
        </div>

        <button
          class="btn btn-secondary w-full back-button"
          onclick={() => (app.selectedSceneId = null)}
        >
          {i18n.t('back_canvas')}
        </button>
      </div>
    {:else}
      <div class="creator-panel">
        <h3 class="ui-section-title">{i18n.t('add_scene')}</h3>
        <div class="control-group">
          <label for="new-scene-name">{i18n.t('scene_name_placeholder')}</label>
          <input
            id="new-scene-name"
            type="text"
            placeholder={i18n.t('scene_name_placeholder')}
            bind:value={newSceneInput}
            onkeydown={(event) => event.key === 'Enter' && handleAddScene()}
          />
          <button class="btn btn-secondary w-full mt-1" onclick={handleAddScene}>
            {i18n.t('btn_create')}
          </button>
        </div>

      </div>
    {/if}
  </div>

  <footer class="sidebar-footer">
    <button
      class="btn btn-secondary w-full new-project-button"
      onclick={() => (isNewProjectModalOpen = true)}
    >
      {i18n.t('new_project')}
    </button>

    <div class="io-grid">
      <label class="btn btn-secondary io-btn">
        {i18n.t('open_project')}
        <input type="file" accept=".json,application/json" onchange={handleOpenProject} hidden />
      </label>
      <button class="btn btn-secondary io-btn" onclick={handleSaveProject}>
        {i18n.t('save_project')}
      </button>
      <button class="btn btn-primary io-btn btn-export" onclick={handleExportHTML}>
        {i18n.t('export_html')}
      </button>
    </div>

    {#if saveLabel}
      <p class="save-state {app.saveState}">{saveLabel}</p>
    {/if}

    <div class="credits">
      {i18n.t('powered_by')} <strong>Aventura</strong> |
      <a href="https://github.com/srsergiorodriguez/aventura" target="_blank" rel="noreferrer">
        {i18n.t('source_code')}
      </a>
      |
      <button class="credits-link" onclick={() => (isLicensesModalOpen = true)}>
        {i18n.t('licenses')}
      </button>
    </div>
  </footer>
</aside>

<PreviewModal isOpen={isPreviewModalOpen} onClose={() => (isPreviewModalOpen = false)} />
<AreaModal
  isOpen={isAreaModalOpen}
  scene={selectedScene}
  onSave={handleSaveAreas}
  onClose={() => (isAreaModalOpen = false)}
/>
<LicensesModal
  isOpen={isLicensesModalOpen}
  onClose={() => (isLicensesModalOpen = false)}
/>
<DrawingStudio
  isOpen={isDrawingStudioOpen}
  scene={selectedScene}
  onSave={handleSaveDrawing}
  onClose={() => (isDrawingStudioOpen = false)}
/>
<NewProjectModal
  isOpen={isNewProjectModalOpen}
  onClose={() => (isNewProjectModalOpen = false)}
  onDemo={() => handleNewProject('demo')}
  onBlank={() => handleNewProject('blank')}
/>
<SettingsModal
  isOpen={isSettingsModalOpen}
  onClose={() => (isSettingsModalOpen = false)}
  onPreview={() => {
    isSettingsModalOpen = false;
    isPreviewModalOpen = true;
  }}
/>
<GrammarModal isOpen={isGrammarModalOpen} onClose={() => (isGrammarModalOpen = false)} />

<style>
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

  .header-top h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .header-top p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .lang-toggle {
    display: flex;
    gap: 0.5rem;
  }

  .lang-toggle .btn {
    padding: 0.1rem 0.4rem;
  }

  .header-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }

  .sidebar-content {
    flex-grow: 1;
    overflow-y: auto;
  }

  .editor-panel,
  .creator-panel {
    padding: 1.5rem;
  }

  .control-group {
    margin-bottom: 1.5rem;
  }

  .control-group label,
  .control-label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .option-row {
    display: flex;
    gap: 0.5rem;
    margin: 4px 0;
  }

  .file-upload-btn {
    display: block;
    border-style: dashed;
  }

  .image-preview-mini img {
    width: 100%;
    border: var(--border-main);
    display: block;
  }

  .drawing-button {
    margin-top: 0.5rem;
  }

  .start-group {
    margin-top: 2rem;
  }

  .start-note {
    margin: 0;
    padding: 0.35rem 0.5rem;
    background: var(--accent-color);
    color: var(--text-color);
    font-weight: bold;
    text-align: center;
  }

  .back-button {
    border-style: dashed;
    margin-top: 2rem;
  }

  .new-project-button {
    border-style: dashed;
    margin-bottom: 0.5rem;
  }

  .credits-link {
    background: none;
    border: 0;
    padding: 0;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }

  .credits-link:hover {
    color: var(--accent-color);
  }

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

  .io-btn {
    padding: 0.5rem 0.2rem;
    font-size: 0.85rem;
  }

  .btn-export {
    grid-column: span 2;
    font-size: 1rem;
  }

  .save-state {
    margin: 0.75rem 0 0;
    font-size: 0.75rem;
    opacity: 0.75;
    text-align: center;
  }

  .save-state.error {
    color: #ffb4b4;
    opacity: 1;
  }

  .credits {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.75rem;
    opacity: 0.7;
  }

  .credits a {
    color: inherit;
  }
</style>
