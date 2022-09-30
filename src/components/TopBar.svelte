<script>
  export let toggle;
  function toggleEditor() {
    toggle = false;
  }
</script>

<div class="top-bar">
  <button class="x-button" on:click={toggleEditor}>X</button>
</div>

<style>
  .top-bar {
    display: flex;
    justify-content: right;
  }
</style>