<script>
  import { useSvelteFlow } from '@xyflow/svelte';

  let { resetKey = 0 } = $props();

  const { fitView } = useSvelteFlow();

  $effect(() => {
    // Read the key so this effect re-runs whenever the project changes.
    resetKey;
    let cancelled = false;

    async function fit(duration) {
      if (cancelled) return;
      try {
        await fitView({ padding: 0.16, duration, maxZoom: 1 });
      } catch {
        // The flow may be mid-update; ignore and let the next fit try.
      }
    }

    // Give Svelte Flow a frame to measure nodes, then re-fit after data-URL
    // images have had time to settle. This now runs on project replacement too,
    // because the Workspace is no longer remounted.
    // Never call fitView synchronously inside the effect: it updates the bound
    // node measured dimensions and can re-enter the effect.
    const initial = setTimeout(() => void fit(0), 0);
    const first = setTimeout(() => void fit(180), 250);
    const second = setTimeout(() => void fit(0), 1000);

    return () => {
      cancelled = true;
      clearTimeout(initial);
      clearTimeout(first);
      clearTimeout(second);
    };
  });
</script>
