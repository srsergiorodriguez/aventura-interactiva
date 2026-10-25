<script>
  import licenses from '../assets/fonts/licenses.json';
  import { i18n } from '../lib/i18n.svelte.js';
  import Modal from '../ui/Modal.svelte';

  let { isOpen = false, onClose } = $props();
</script>

<Modal
  {isOpen}
  title={i18n.t('licenses')}
  size="large"
  onClose={onClose}
>
  {#snippet children()}
    <p class="intro">{i18n.t('licenses_intro')}</p>

    <h4>{i18n.t('font_licenses')}</h4>
    {#each licenses.fonts as font (font.id)}
      <article class="license-entry">
        <div class="license-heading">
          <strong>{font.name}</strong>
          <span>{font.licenseName}</span>
        </div>
        <p class="copyright">{font.copyright}</p>
        <p class="links">
          <a href={font.source} target="_blank" rel="noreferrer">
            {i18n.t('font_source')}
          </a>
          <a href={font.licenseUrl} target="_blank" rel="noreferrer">
            {font.licenseName}
          </a>
        </p>
      </article>
    {/each}

    <details class="license-details">
      <summary>{i18n.t('license_ofl')}</summary>
      <pre>{licenses.ofl}</pre>
    </details>

    <h4>{i18n.t('software_licenses')}</h4>
    {#each licenses.software as item (item.name)}
      <article class="license-entry">
        <div class="license-heading">
          <strong>{item.name}</strong>
          <span>{item.licenseName}</span>
        </div>
        <p class="copyright">{item.copyright}</p>
        <p class="links">
          <a href={item.source} target="_blank" rel="noreferrer">
            {i18n.t('font_source')}
          </a>
        </p>
      </article>
    {/each}

    <details class="license-details">
      <summary>{i18n.t('license_mit')}</summary>
      <pre>{licenses.mit}</pre>
    </details>

    <p class="app-credit">Aventura Interactiva · Sergio Rodríguez Gómez</p>
  {/snippet}

  {#snippet footer()}
    <button class="btn btn-secondary" onclick={onClose}>
      {i18n.t('settings_close')}
    </button>
  {/snippet}
</Modal>

<style>
  .intro {
    margin-top: 0;
    font-size: 0.9rem;
  }

  h4 {
    border-bottom: var(--border-main);
    padding-bottom: 0.25rem;
    margin: 1.2rem 0 0.6rem;
  }

  .license-entry {
    border: 1px solid var(--text-color);
    padding: 0.55rem 0.7rem;
    margin-bottom: 0.5rem;
  }

  .license-heading {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.9rem;
  }

  .license-heading span {
    opacity: 0.7;
    font-size: 0.8rem;
    text-align: right;
  }

  .copyright {
    margin: 0.3rem 0;
    font-size: 0.78rem;
    opacity: 0.8;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
    margin: 0;
    font-size: 0.78rem;
  }

  .links a {
    color: inherit;
    text-decoration: underline;
  }

  .license-details {
    border: 1px dashed var(--text-color);
    padding: 0.5rem 0.7rem;
    margin-top: 0.7rem;
  }

  .license-details summary {
    cursor: pointer;
    font-weight: bold;
  }

  pre {
    max-height: 220px;
    overflow: auto;
    white-space: pre-wrap;
    font-size: 0.72rem;
    line-height: 1.35;
    border-top: 1px solid var(--text-color);
    padding-top: 0.5rem;
    margin-bottom: 0;
  }

  .app-credit {
    margin: 1.1rem 0 0;
    font-size: 0.8rem;
    opacity: 0.7;
    text-align: center;
  }
</style>
