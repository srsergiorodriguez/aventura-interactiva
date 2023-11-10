<script>
  export let imageUrl;

  let input;
  let image;

  function loadImage() {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        image.setAttribute("src", reader.result);
        imageUrl = reader.result;
      });
      reader.readAsDataURL(file);
    } 
  }
</script>


<input type="file" id="load-image" bind:this={input} on:change={loadImage} hidden/>
<label class="gui-button" for="load-image">Cargar archivo</label>
<div class="image-preview-container" id="image-preview-container">
  <img src={imageUrl} alt="Preview" class={`img-preview ${imageUrl ? "" : "hide"}`} bind:this={image}>
</div>

<style>
  .hide {
    display: none;
  }

  .image-preview-container {
    max-width: 150px;
    max-height: 300px;
    margin: 10px auto;
  }

  label {
    padding: 0.2em;
    font-size: 14px;
  }

  .img-preview {
    max-width: 100%;
    max-height: 100%;
    border: solid 1px lightgray;
  }
  
</style>