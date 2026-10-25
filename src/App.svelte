<script>
  import { onMount } from 'svelte';
  import Workspace from './components/Workspace.svelte';
  import Toast from './ui/Toast.svelte';
  import { app, initApp } from './state.svelte.js';
  import { i18n } from './lib/i18n.svelte.js';

  onMount(() => {
    void initApp();
  });

  $effect(() => {
    document.documentElement.lang = i18n.lang;
  });
</script>

{#if app.ready}
  <Workspace />
{:else}
  <div class="boot">
    <p>{i18n.t('loading')}</p>
  </div>
{/if}

<Toast />

<style>
  .boot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    font-family: var(--font-ui, 'Inconsolata', monospace);
  }

  .boot p {
    margin: 0;
    font-weight: bold;
  }
</style>
