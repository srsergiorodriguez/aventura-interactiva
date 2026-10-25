<script>
  import Modal from '../ui/Modal.svelte';
  import { i18n } from '../lib/i18n.svelte.js';

  let { isOpen = false, onClose, onDemo, onBlank } = $props();
</script>

<Modal
  {isOpen}
  title={i18n.t('new_project')}
  size="small"
  onClose={onClose}
>
  {#snippet children()}
    <p class="question">{i18n.t('new_project_question')}</p>

    <button class="choice" type="button" onclick={onDemo}>
      <strong>{i18n.t('new_project_demo')}</strong>
      <span>{i18n.t('new_project_demo_hint')}</span>
    </button>

    <button class="choice" type="button" onclick={onBlank}>
      <strong>{i18n.t('new_project_blank')}</strong>
      <span>{i18n.t('new_project_blank_hint')}</span>
    </button>

    <p class="hint">{i18n.t('new_project_warning')}</p>
  {/snippet}

  {#snippet footer()}
    <button class="btn btn-secondary" onclick={onClose}>
      {i18n.t('cancel')}
    </button>
  {/snippet}
</Modal>

<style>
  .question {
    margin: 0 0 0.25rem;
    font-weight: bold;
  }

  .choice {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    width: 100%;
    text-align: left;
    padding: 0.75rem 0.9rem;
    font-family: inherit;
    background: var(--bg-color);
    color: var(--text-color);
    border: var(--border-main);
    cursor: pointer;
    margin-bottom: 0.75rem;
  }

  .choice:hover,
  .choice:focus-visible {
    background: var(--accent-color);
    outline: none;
  }

  .choice strong {
    font-size: 1rem;
  }

  .choice span {
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .hint {
    margin: 0.25rem 0 0;
    font-size: 0.8rem;
    opacity: 0.75;
  }
</style>
