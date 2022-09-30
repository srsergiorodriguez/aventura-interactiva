<script>
  export let imageUrl;

  let input;
  let image;

  let showImage = false;

  function onChange() {
    const file = input.files[0];
		
    if (file) {
			showImage = true;
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imageUrl = reader.result;
        image.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);
			return
    } 
		showImage = false; 
  }
</script>


<input type="file" bind:this={input} on:change={onChange}/>
<div class="image-preview-container" id="image-preview-container">
  {#if showImage}
    <img src="" alt="Preview" class="img-preview" bind:this={image}>
  {/if}
</div>

<style>
  .image-preview-container {
    max-width: 150px;
    max-height: 300px;
    margin: 10px auto;
  }

  .img-preview {
    max-width: 100%;
    max-height: 100%;
    border: solid 1px lightgray;
  }
  
</style>