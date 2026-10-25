<script>
  import { tick } from 'svelte';
  import { i18n } from '../lib/i18n.svelte.js';

  let {
    isOpen = false,
    title = '',
    onClose,
    children,
    footer,
    headerActions,
    size = 'medium',
    bodyClass = '',
    bodyFlush = false,
  } = $props();

  /** @type {HTMLDivElement|undefined} */
  let panelEl = $state();
  let previousFocus = null;

  /** @returns {HTMLElement[]} */
  function focusableElements() {
    if (!panelEl) return [];
    return Array.from(
      panelEl.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((node) => node.offsetParent !== null);
  }

  $effect(() => {
    if (!isOpen) return;

    previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const keydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = focusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        panelEl?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panelEl?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', keydown, true);
    void tick().then(() => {
      if (!isOpen) return;
      const focusable = focusableElements();
      (focusable[0] || panelEl)?.focus();
    });

    return () => {
      document.removeEventListener('keydown', keydown, true);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  });
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div
      class="modal-content modal-{size}"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabindex="-1"
      bind:this={panelEl}
    >
      <header class="modal-header">
        <h3>{title}</h3>
        <div class="modal-header-actions">
          {@render headerActions?.()}
          <button class="btn-close" aria-label={i18n.t('dismiss')} onclick={onClose}>x</button>
        </div>
      </header>

      <div class="modal-body {bodyFlush ? 'modal-body-flush' : ''} {bodyClass}">
        {@render children?.()}
      </div>

      {#if footer}
        <footer class="modal-footer">
          {@render footer()}
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: var(--overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .modal-content {
    background: var(--bg-color);
    border: var(--border-main);
    box-shadow: 8px 8px 0 var(--text-color);
    width: min(680px, calc(100vw - 32px));
    max-height: 92vh;
    display: flex;
    flex-direction: column;
    outline: none;
  }

  .modal-small {
    width: min(430px, calc(100vw - 32px));
  }

  .modal-medium {
    width: min(680px, calc(100vw - 32px));
  }

  .modal-large {
    width: min(760px, calc(100vw - 32px));
  }

  .modal-wide {
    width: min(900px, calc(100vw - 32px));
  }

  .modal-full {
    width: 100vw;
    height: 100vh;
    max-width: 1400px;
    max-height: 96vh;
  }

  .modal-header {
    padding: 0.75rem 1rem;
    background: var(--text-color);
    color: var(--bg-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
  }

  .modal-header h3 {
    margin: 0;
    text-transform: lowercase;
  }

  .modal-body {
    padding: 1.1rem 1.25rem;
    overflow-y: auto;
    min-height: 0;
  }

  .modal-body-flush {
    padding: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .modal-header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .modal-footer {
    padding: 0.75rem 1.25rem 1.1rem;
    border-top: var(--border-main);
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  @media (max-width: 620px) {
    .modal-content {
      max-height: 94vh;
    }
  }
</style>
