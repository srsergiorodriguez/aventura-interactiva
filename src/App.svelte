<script>
  import Workspace from './components/Workspace.svelte';
  import { loadDefaultStory } from './state.svelte.js';

  // Load dummy data on mount
  $effect(() => {
    loadDefaultStory();
  });
</script>

<main>
  <Workspace />
</main>