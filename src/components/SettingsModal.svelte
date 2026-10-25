<script>
  import { tick } from 'svelte';
  import {
    app,
    applyPresentationPreset,
    updateIgrama,
    updatePresentation,
    updateProjectPalette,
    updateRuntime,
    updateStoryLanguage,
    updateStoryMeta,
  } from '../state.svelte.js';
  import { FONT_STACKS, PRESENTATION_PRESETS } from '../domain/presentation.js';
  import { i18n } from '../lib/i18n.svelte.js';
  import { messageForError } from '../lib/error-message.js';
  import { notify } from '../ui/toast.svelte.js';
  import Modal from '../ui/Modal.svelte';

  let { isOpen = false, onClose, onPreview } = $props();

  let tab = $state('story');
  const tabIds = ['story', 'presentation', 'advanced'];

  /** @param {KeyboardEvent} event */
  async function handleTabKeys(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = tabIds.indexOf(tab);
    let next = index;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabIds.length) % tabIds.length;
    if (event.key === 'ArrowRight') next = (index + 1) % tabIds.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabIds.length - 1;
    tab = tabIds[next];
    await tick();
    document.getElementById(`tab-${tab}`)?.focus();
  }

  const presets = Object.entries(PRESENTATION_PRESETS);
  const currentPreset = $derived(app.project.palette.presetId);
  const fontStack = $derived(
    FONT_STACKS[app.project.presentation.typography.font] || FONT_STACKS.mono,
  );
  const fontName = $derived(
    i18n.t(`font_${app.project.presentation.typography.font}`),
  );

  $effect(() => {
    if (isOpen) tab = 'story';
  });

  function showError(error) {
    notify(messageForError(error), 'error');
  }

  function setPresentation(patch) {
    try {
      updatePresentation(patch);
    } catch (error) {
      showError(error);
    }
  }

  function setRuntime(key, value) {
    try {
      updateRuntime({ [key]: value });
    } catch (error) {
      showError(error);
    }
  }

  function applyPreset(presetId) {
    try {
      applyPresentationPreset(presetId);
    } catch (error) {
      showError(error);
    }
  }

  function presetLabel() {
    const preset = PRESENTATION_PRESETS[currentPreset];
    return preset
      ? i18n.t(preset.labelKey)
      : i18n.t('preset_custom');
  }

  function setProjectColor(index, color) {
    try {
      const colors = [...app.project.palette.colors];
      colors[index] = color;
      updateProjectPalette(colors);
    } catch (error) {
      showError(error);
    }
  }

  function handleIgramaUpload(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const parsed = JSON.parse(String(loadEvent.target?.result ?? ''));
        updateIgrama(parsed);
      } catch {
        notify(i18n.t('invalid_json'), 'error');
      }
    };
    reader.readAsText(file);
    input.value = '';
  }
</script>

<Modal
  {isOpen}
  title={i18n.t('settings')}
  size="medium"
  bodyFlush
  onClose={onClose}
>
  {#snippet children()}
      <div class="tabs" role="tablist" tabindex="-1" aria-label={i18n.t('settings')} onkeydown={handleTabKeys}>
        <button
          id="tab-story"
          class="tab {tab === 'story' ? 'active' : ''}"
          role="tab"
          tabindex={tab === 'story' ? 0 : -1}
          aria-selected={tab === 'story'}
          aria-controls="panel-story"
          onclick={() => (tab = 'story')}
        >{i18n.t('settings_story')}</button>
        <button
          id="tab-presentation"
          class="tab {tab === 'presentation' ? 'active' : ''}"
          role="tab"
          tabindex={tab === 'presentation' ? 0 : -1}
          aria-selected={tab === 'presentation'}
          aria-controls="panel-presentation"
          onclick={() => (tab = 'presentation')}
        >{i18n.t('settings_presentation')}</button>
        <button
          id="tab-advanced"
          class="tab {tab === 'advanced' ? 'active' : ''}"
          role="tab"
          tabindex={tab === 'advanced' ? 0 : -1}
          aria-selected={tab === 'advanced'}
          aria-controls="panel-advanced"
          onclick={() => (tab = 'advanced')}
        >{i18n.t('settings_advanced')}</button>
      </div>

      <div class="settings-body">
        {#if tab === 'story'}
          <div id="panel-story" role="tabpanel" aria-labelledby="tab-story">
            <div class="control-group">
              <label for="project-title">{i18n.t('project_title')}</label>
              <input
                id="project-title"
                type="text"
                value={app.project.meta.title}
                oninput={(event) =>
                  updateStoryMeta({ title: event.currentTarget.value })}
              />
            </div>

            <div class="control-group">
              <label for="project-author">{i18n.t('project_author')}</label>
              <input
                id="project-author"
                type="text"
                value={app.project.meta.author}
                oninput={(event) =>
                  updateStoryMeta({ author: event.currentTarget.value })}
              />
            </div>

            <div class="control-group">
              <label for="story-language">{i18n.t('story_language')}</label>
              <select
                id="story-language"
                value={app.project.story.lang}
                onchange={(event) =>
                  updateStoryLanguage(event.currentTarget.value)}
              >
                <option value="es">{i18n.t('language_es')}</option>
                <option value="en">{i18n.t('language_en')}</option>
              </select>
              <p class="hint">{i18n.t('story_language_hint')}</p>
            </div>

            <h4 class="ui-section-title">{i18n.t('reading_behavior')}</h4>
            <div class="control-group">
              <label for="typewriter-speed">{i18n.t('typewriter_speed')}</label>
              <input
                id="typewriter-speed"
                type="number"
                min="0"
                value={app.project.runtime.typewriterSpeed}
                oninput={(event) =>
                  setRuntime(
                    'typewriterSpeed',
                    Number(event.currentTarget.value),
                  )}
              />
            </div>

            <div class="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={app.project.runtime.backBtn}
                  onchange={(event) =>
                    setRuntime('backBtn', event.currentTarget.checked)}
                />
                {i18n.t('enable_back')}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={app.project.runtime.restartBtn}
                  onchange={(event) =>
                    setRuntime('restartBtn', event.currentTarget.checked)}
                />
                {i18n.t('enable_restart')}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={app.project.runtime.adventureScroll}
                  onchange={(event) =>
                    setRuntime('adventureScroll', event.currentTarget.checked)}
                />
                {i18n.t('adventure_scroll')}
              </label>
            </div>
          </div>
        {:else if tab === 'presentation'}
          <div id="panel-presentation" role="tabpanel" aria-labelledby="tab-presentation">
            <h4 class="ui-section-title">{i18n.t('color_schemes')}</h4>
            <div class="preset-grid">
              {#each presets as [id, preset] (id)}
                <button
                  class="preset {currentPreset === id ? 'active' : ''}"
                  type="button"
                  aria-pressed={currentPreset === id}
                  onclick={() => applyPreset(id)}
                >
                  <span class="swatches" aria-hidden="true">
                    {#each preset.palette as color}
                      <span style:background={color}></span>
                    {/each}
                  </span>
                  <span class="preset-name">{i18n.t(preset.labelKey)}</span>
                </button>
              {/each}
            </div>
            <p class="preset-state">
              {presetLabel()} · <span class="hint-inline">{i18n.t('preset_hint')}</span>
            </p>

            <h4 class="ui-section-title">{i18n.t('project_palette')}</h4>
            <p class="hint">{i18n.t('project_palette_hint')}</p>
            <div class="color-grid project-palette">
              {#each app.project.palette.colors as color, index}
                <div class="control-group">
                  <label for={`project-color-${index}`}>
                    {i18n.t([
                      'palette_background',
                      'palette_ink',
                      'palette_accent',
                      'palette_support',
                      'palette_highlight',
                    ][index])}
                  </label>
                  <input
                    id={`project-color-${index}`}
                    type="color"
                    class="color-picker"
                    value={color}
                    oninput={(event) =>
                      setProjectColor(index, event.currentTarget.value)}
                  />
                </div>
              {/each}
            </div>
            <h4 class="ui-section-title">{i18n.t('typography')}</h4>
            <div class="font-picker-row">
              <div class="control-group">
                <label for="font-family">{i18n.t('font_family')}</label>
                <select id="font-family"
                  value={app.project.presentation.typography.font}
                  onchange={(event) => setPresentation({ typography: { font: event.currentTarget.value } })}>
                  <option value="mono">{i18n.t('font_mono')}</option>
                  <option value="book">{i18n.t('font_book')}</option>
                  <option value="sans">{i18n.t('font_sans')}</option>
                  <option value="grotesk">{i18n.t('font_grotesk')}</option>
                  <option value="humanist">{i18n.t('font_humanist')}</option>
                  <option value="rounded">{i18n.t('font_rounded')}</option>
                  <option value="typewriter">{i18n.t('font_typewriter')}</option>
                  <option value="palatino">{i18n.t('font_palatino')}</option>
                  <option value="school">{i18n.t('font_school')}</option>
                </select>
              </div>
              <div class="font-preview" style:font-family={fontStack}>
                <span class="font-preview-caption">{i18n.t('font_preview')}</span>
                <span class="font-preview-sample">{i18n.t('font_preview_text')}</span>
                <span class="font-preview-name">{fontName}</span>
              </div>
            </div>
            <div class="two-col">
              <div class="control-group">
                <label for="text-size">{i18n.t('text_size')}</label>
                <select id="text-size"
                  value={String(app.project.presentation.typography.size)}
                  onchange={(event) => setPresentation({ typography: { size: Number(event.currentTarget.value) } })}>
                  <option value="0.95">0.95 em</option>
                  <option value="1.1">1.1 em</option>
                  <option value="1.25">1.25 em</option>
                </select>
              </div>
              <div class="control-group">
                <label for="line-height">{i18n.t('line_height')}</label>
                <select id="line-height"
                  value={String(app.project.presentation.typography.lineHeight)}
                  onchange={(event) => setPresentation({ typography: { lineHeight: Number(event.currentTarget.value) } })}>
                  <option value="1.35">1.35</option>
                  <option value="1.5">1.5</option>
                  <option value="1.65">1.65</option>
                </select>
              </div>
            </div>
            <div class="control-group">
              <label for="text-align">{i18n.t('text_align')}</label>
              <select id="text-align"
                value={app.project.presentation.typography.align}
                onchange={(event) => setPresentation({ typography: { align: event.currentTarget.value } })}>
                <option value="left">{i18n.t('align_left')}</option>
                <option value="center">{i18n.t('align_center')}</option>
              </select>
            </div>

            <h4 class="ui-section-title">{i18n.t('layout')}</h4>
            <div class="two-col">
              <div class="control-group">
                <label for="page-width">{i18n.t('page_width')}</label>
                <select id="page-width"
                  value={String(app.project.presentation.layout.maxWidth)}
                  onchange={(event) => setPresentation({ layout: { maxWidth: Number(event.currentTarget.value) } })}>
                  <option value="480">480 px</option>
                  <option value="600">600 px</option>
                  <option value="720">720 px</option>
                </select>
              </div>
              <div class="control-group">
                <label for="page-padding">{i18n.t('page_padding')}</label>
                <select id="page-padding"
                  value={String(app.project.presentation.layout.padding)}
                  onchange={(event) => setPresentation({ layout: { padding: Number(event.currentTarget.value) } })}>
                  <option value="16">16 px</option>
                  <option value="32">32 px</option>
                  <option value="48">48 px</option>
                </select>
              </div>
            </div>
            <div class="control-group">
              <label for="vertical-align">{i18n.t('vertical_align')}</label>
              <select id="vertical-align"
                value={app.project.presentation.layout.verticalAlign}
                onchange={(event) => setPresentation({ layout: { verticalAlign: event.currentTarget.value } })}>
                <option value="top">{i18n.t('align_top')}</option>
                <option value="center">{i18n.t('align_middle')}</option>
              </select>
            </div>

            <div class="control-group">
              <label for="buttons-layout">{i18n.t('buttons_layout')}</label>
              <select id="buttons-layout"
                value={app.project.presentation.buttons.layout}
                onchange={(event) => setPresentation({ buttons: { layout: event.currentTarget.value } })}>
                <option value="inline">{i18n.t('buttons_inline')}</option>
                <option value="stack">{i18n.t('buttons_stack')}</option>
              </select>
            </div>
            <div class="checkbox-group">
              <label>
                <input type="checkbox"
                  checked={app.project.presentation.image.frame}
                  onchange={(event) => setPresentation({ image: { frame: event.currentTarget.checked } })} />
                {i18n.t('image_frame')}
              </label>
            </div>

            <h4 class="ui-section-title">{i18n.t('shape')}</h4>
            <div class="control-group">
              <label for="button-border">{i18n.t('btn_border_css')}</label>
              <input id="button-border" type="text"
                value={app.project.presentation.shape.buttonBorder}
                oninput={(event) => setPresentation({ shape: { buttonBorder: event.currentTarget.value } })} />
            </div>
            <div class="control-group">
              <label for="container-border">{i18n.t('container_border_css')}</label>
              <input id="container-border" type="text"
                value={app.project.presentation.shape.containerBorder}
                oninput={(event) => setPresentation({ shape: { containerBorder: event.currentTarget.value } })} />
            </div>
            <div class="control-group">
              <label for="border-radius">{i18n.t('border_radius')}</label>
              <input id="border-radius" type="text"
                value={app.project.presentation.shape.borderRadius}
                oninput={(event) => setPresentation({ shape: { borderRadius: event.currentTarget.value } })} />
            </div>
          </div>
        {:else}
          <div id="panel-advanced" role="tabpanel" aria-labelledby="tab-advanced">
            <div class="checkbox-group">
              <label>
                <input type="checkbox"
                  checked={app.project.runtime.evalTags}
                  onchange={(event) => setRuntime('evalTags', event.currentTarget.checked)} />
                {i18n.t('enable_eval')}
              </label>
              <p class="hint warning">{i18n.t('eval_warning')}</p>
            </div>

            <div class="control-group">
              <label for="custom-css">{i18n.t('custom_css')}</label>
              <textarea id="custom-css" rows="6" spellcheck="false"
                value={app.project.presentation.customCSS}
                oninput={(event) => setPresentation({ customCSS: event.currentTarget.value })}></textarea>
              <p class="hint">{i18n.t('custom_css_hint')}</p>
            </div>

            <h4 class="ui-section-title">{i18n.t('igrama_integration')}</h4>
            <div class="control-group">
              <label for="igrama-format">{i18n.t('igrama_format')}</label>
              <select id="igrama-format"
                value={app.project.runtime.igramaFormat}
                onchange={(event) => setRuntime('igramaFormat', event.currentTarget.value)}>
                <option value="png">png</option>
                <option value="gif">gif</option>
              </select>
            </div>
            <div class="control-group">
              {#if app.project.igrama}
                <div class="igrama-loaded">✓ {i18n.t('igrama_loaded')}</div>
                <button class="btn btn-danger w-full" onclick={() => updateIgrama(null)}>
                  {i18n.t('remove_igrama')}
                </button>
              {:else}
                <label class="btn btn-secondary w-full file-upload-btn">
                  {i18n.t('upload_igrama')}
                  <input type="file" accept=".json" onchange={handleIgramaUpload} hidden />
                </label>
              {/if}
            </div>
          </div>
        {/if}
      </div>
  {/snippet}

  {#snippet footer()}
    <button class="btn btn-secondary" onclick={onClose}>
      {i18n.t('settings_close')}
    </button>
    {#if onPreview}
      <button class="btn btn-primary" onclick={onPreview}>
        {i18n.t('test_story')}
      </button>
    {/if}
  {/snippet}
</Modal>

<style>
  .tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: var(--border-main);
    flex-shrink: 0;
  }

  .tab {
    font-family: inherit;
    font-weight: bold;
    background: var(--bg-color);
    color: var(--text-color);
    border: 0;
    border-right: 1px solid var(--text-color);
    padding: 0.6rem 0.4rem;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .tab:last-child {
    border-right: 0;
  }

  .tab.active {
    background: var(--accent-color);
  }

  .tab:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: -4px;
  }

  .settings-body {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
    min-height: 0;
  }

  .control-group {
    margin-bottom: 1rem;
  }

  .control-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .font-picker-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 1rem;
    align-items: start;
    margin-bottom: 1rem;
  }

  .font-picker-row .control-group {
    margin-bottom: 0;
  }

  .font-preview {
    border: var(--border-main);
    background: var(--bg-color);
    color: var(--text-color);
    padding: 0.45rem 0.65rem 0.55rem;
    min-height: 64px;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    overflow: hidden;
  }

  .font-preview-caption,
  .font-preview-name {
    font-family: 'Inconsolata', monospace;
    font-size: 0.7rem;
    opacity: 0.65;
  }

  .font-preview-sample {
    font-size: 1.35rem;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .font-preview-name {
    font-size: 0.75rem;
    opacity: 0.8;
  }

  @media (max-width: 620px) {
    .font-picker-row {
      grid-template-columns: 1fr;
    }
  }

  .hint {
    margin: 0.35rem 0 0;
    font-size: 0.8rem;
    opacity: 0.75;
    line-height: 1.35;
  }

  .hint.warning {
    opacity: 1;
  }

  .hint-inline {
    font-weight: normal;
    opacity: 0.75;
  }

  .color-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .project-palette {
    margin-bottom: 0.5rem;
  }

  .color-picker {
    width: 100%;
    height: 35px;
    border: var(--border-main);
    cursor: pointer;
    padding: 0;
    background: var(--bg-color);
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px dashed var(--text-color);
    padding: 1rem;
    background: var(--bg-color);
    margin-bottom: 1rem;
  }

  .checkbox-group label {
    font-weight: normal;
    cursor: pointer;
  }

  .preset-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .preset {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: stretch;
    padding: 0.5rem;
    background: var(--bg-color);
    color: var(--text-color);
    border: 2px solid var(--text-color);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .preset.active {
    background: var(--accent-color);
    box-shadow: 4px 4px 0 var(--text-color);
  }

  .preset:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }

  .swatches {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    height: 18px;
    border: 1px solid var(--text-color);
  }

  .swatches span {
    display: block;
  }

  .preset-name {
    text-align: left;
  }

  .preset-state {
    margin: 0 0 1.25rem;
    font-weight: bold;
    font-size: 0.85rem;
  }

  .file-upload-btn {
    display: block;
    border-style: dashed;
    text-align: center;
    cursor: pointer;
  }

  .igrama-loaded {
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    font-weight: bold;
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', monospace;
    font-size: 0.85rem;
  }
</style>
