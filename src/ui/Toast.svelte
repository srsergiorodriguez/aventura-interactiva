<script>
  import { dismiss, toastState } from './toast.svelte.js';
  import { i18n } from '../lib/i18n.svelte.js';
</script>

<div class="toast-stack" aria-live="polite">
  {#each toastState.items as item (item.id)}
    <div class="toast {item.tone}" role={item.tone === 'error' ? 'alert' : 'status'}>
      <span>{item.message}</span>
      <button
        class="toast-close"
        type="button"
        aria-label={i18n.t('dismiss')}
        onclick={() => dismiss(item.id)}
      >×</button>
    </div>
  {/each}
</div>

<style>
  .toast-stack {
    position: fixed;
    left: 16px;
    bottom: 16px;
    z-index: 3000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: min(420px, calc(100vw - 32px));
  }

  .toast {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 14px;
    background: var(--bg-color);
    color: var(--text-color);
    border: var(--border-main);
    box-shadow: 4px 4px 0 #000;
    font-size: 0.9rem;
    line-height: 1.35;
  }

  .toast.error {
    border-color: #c81e1e;
    box-shadow: 4px 4px 0 #c81e1e;
  }

  .toast-close {
    margin-left: auto;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-weight: bold;
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
  }

  .toast-close:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }
</style>
