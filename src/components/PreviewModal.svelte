<script>
  import { onDestroy, untrack } from 'svelte';
  import { app } from '../state.svelte.js';
  import { validateProject } from '../domain/validate.js';
  import { buildStoryDocument } from '../export/document.js';
  import { engineSource, miniGifSource } from '../lib/engine.js';
  import { messageForError } from '../lib/error-message.js';
  import { i18n } from '../lib/i18n.svelte.js';
  import Modal from '../ui/Modal.svelte';
  import { notify } from '../ui/toast.svelte.js';

  let { isOpen = false, onClose } = $props();

  let iframeSrc = $state(null);
  /** @type {string|null} */
  let objectUrl = null;

  function cleanup() {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
    iframeSrc = null;
  }

  function buildDocument() {
    cleanup();

    const validation = validateProject(app.project);
    if (validation.errors.length > 0) {
      notify(i18n.t('validation_errors'), 'error');
      onClose();
      return;
    }

    try {
      const html = buildStoryDocument($state.snapshot(app.project), {
        engineSource,
        miniGifSource,
      });
      objectUrl = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
      iframeSrc = objectUrl;
    } catch (error) {
      notify(messageForError(error), 'error');
      onClose();
    }
  }

  $effect(() => {
    if (isOpen) {
      untrack(() => buildDocument());
    } else {
      cleanup();
    }
  });

  onDestroy(cleanup);
</script>

<Modal
  {isOpen}
  title={i18n.t('testing_story')}
  size="full"
  bodyFlush
  onClose={onClose}
>
  {#snippet headerActions()}
    <button class="btn btn-secondary" onclick={buildDocument}>
      {i18n.t('reload_preview')}
    </button>
  {/snippet}

  {#snippet children()}
    {#if iframeSrc}
      <iframe
        src={iframeSrc}
        title={i18n.t('preview_iframe_title')}
      ></iframe>
    {/if}
  {/snippet}
</Modal>

<style>
  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    background: #fff;
    flex: 1;
    min-height: 0;
  }
</style>
