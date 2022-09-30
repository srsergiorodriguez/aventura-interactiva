<script>
  import { scenes } from '../stores/store.js';
  import DragGui from './DragGui.svelte';
  import TopBar from './TopBar.svelte';
  export let showNewScene;
  export let offset;

  let s = $scenes;
  let pos = {x: (offset.x * -1) + 20, y: (offset.y * -1) + 20};
  let displace;
  $: text = '';

  function acceptEdit() {
    if (/^\d/.test(text) === true) {alert('El nombre de la escena no puede empezar con un número /\nThe name of the scene cannot start with a number'); return}
    let formatedText = text.replace(/\s/gi,'_').replace(/\W/,'').replace(/[;.,:{}()<>$%&!¡?¿"'/\\#@&*+-]/gi,'');
    formatedText = normalizeAccents(formatedText);
    s[formatedText] = {text: '', display: {x: pos.x, y:  pos.y, ops: [], areas: []}};
    $scenes[formatedText] = s[formatedText];
    showNewScene = false;
  }

  function normalizeAccents(str) {
	const accents = ['á','é','í','ó','ú','ü','ñ'];
	const normalized = ['a','e','i','o','u','u','n'];
	const strLower = str.toLowerCase();
	let newStr = '';
	for (let i = 0; i < str.length; i++) {
		const lowerChar = strLower.charAt(i);
		const strChar = str.charAt(i);
		if (accents.includes(lowerChar)) {
			let index;
			for (let j = 0; j < accents.length; j++) {
				if (accents[j] === lowerChar) {
					index = j;
					break
				}
			}
			if (strChar === strChar.toUpperCase()) {
				newStr += normalized[index].toUpperCase();
			} else {
				newStr += normalized[index];
			}
		} else {
			newStr += strChar;
		}
	}
	return newStr
}
</script>

<DragGui {pos} bind:displace>
  <TopBar bind:toggle={showNewScene}/>
  <div>
    <label for="inp">Escena:</label>
    <input id="inp" type="text" bind:value={text} on:mousedown|stopPropagation/>
  </div>
  <div class="bar">
    <button on:click={acceptEdit}>Aceptar</button>
  </div>
</DragGui>

<style>
  .bar {
    display: flex;
    justify-content: right;
  }
</style>