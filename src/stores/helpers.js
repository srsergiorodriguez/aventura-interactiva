import { readable } from 'svelte/store';

export const getSceneKey = readable(
  (s) => s.scene === undefined && s.escena !== undefined ? 'escena' : 'scene'
)

export const getOptionsKey = readable(
  (s) => s.options === undefined && s.opciones !== undefined ? 'opciones' : 'options'
)

export const getTextKey = readable(
  (s) => s.text === undefined && s.texto !== undefined ? 'texto' : 'text'
)

export const getImgKey = readable(
  (s) => s.image === undefined && s.imagen !== undefined ? 'imagen' : 'image'
)

function saveFile(str, type, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([str], {type}));
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const saveJSON = readable(
  (obj, filename) => {
    saveFile(JSON.stringify(obj, null, 2), "application/json",`${filename.includes('.json') ? filename : filename+'.json'}`);
  }
)

export const saveHTML = readable(
  (str) => {
    saveFile(str, "text/plain;charset=utf-8", "index.html");
  }
)

const generate = function(aventura, scenes, start, options) {
  const style = `
  #storygeneraldiv {
    box-sizing: border-box;
    margin: auto;
    max-width: 600px;
    font-family: 'Courier New', Courier, monospace;
    background: white;
  }
  
  .storydiv {
    border: solid black 1px;
    width: 100%;
    display: flex;
    padding: 10px;
    flex-direction: column;
    box-sizing: border-box;
  }
  
  .storyp {
    font-size: 18px;
    min-height: 25px;
  }
  
  .storybutton-container {
    margin: auto;
  }
  
  .storybutton {
    background: white;
    box-shadow: none;
    border: solid 1px;
    margin: 0px 1em 0px 0px;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    cursor: pointer;
  }
  
  .storybutton:hover {
    color: white;
    background: black;
  }
  
  .storyimage-container {
    box-sizing: content-box;
    position: relative;
    width: 100%;
    margin: auto;
  }
  
  .storyimage {
    justify-content: center;
    width: 100%;
    margin: auto;
    border-radius: 20px;
    display: block;
  }
  
  .storyimage-area {
    font-size: 14px;
    position: absolute;
    cursor: pointer;
    text-align: center;
    color: black;
    background: #ffffff00;
    border: solid 1px black;
  }
  
  .storyimage-area:hover {
    background: #ffffff33;
  }
  
  @media screen and (max-device-width: 500px) {
    #storygeneraldiv {
      max-width:100%;
    }
    .storyp {
      font-size: 7vw;
    }
    .storybutton {
      font-size: 10vw;
    }
  }
  `
  const base = 
`
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
  </body>
  <script>
    const lang = "es";
    const options = ${options}
    options.defaultCSS = false;
    options.sceneCallback =  function(e) {
      if (this.prevScene === undefined) this.prevScene = [];
      const backSymbol = "<--";
      const restartSymbol = "Reiniciar";
      if (this.backBtn && this.prevScene.length > 0 && this.topScene !== e.key) {
        if (this.prevScene[this.prevScene.length - 2] === e.key) {
          this.prevScene = this.prevScene.slice(0, - 2);
        }
        if (e.options !== undefined) {
          // Ya hay lista de botones
          const found = e.options.find(d => d.btn === backSymbol);
          if (found === undefined) {
            e.options.push({btn: backSymbol, scene: this.prevScene[this.prevScene.length - 1]}); // Añadir un nuevo botón
          } else {
            // Actualizar el botón que ya existe
            found.scene = this.prevScene[this.prevScene.length - 1];
          }
        } else {
          // No hay lista de opciones, crear una nueva
          e.options = [];
          e.options.push({btn: backSymbol, scene: this.prevScene[this.prevScene.length - 1]});
        }
      }
      this.prevScene.push(e.key);
      
      if (this.topScene === undefined) { this.topScene = e.key }
      if (this.restartBtn && (this.topScene !== undefined) && this.topScene !== e.key) {
        if (e.options !== undefined) {
          if (e.options.filter(d => d.btn === restartSymbol).length < 1) {
            e.options.push({btn: restartSymbol, scene: this.topScene});
          }
        } else {
          e.options = [];
          e.options.push({btn: restartSymbol, scene: this.topScene});
        }
      }
    }
  </script>
  <style>
    ${style}
  </style>
  <script>
    const A = ${aventura}
  </script>
  <script>
    const scenes = ${scenes};
    const aventura = new A(lang, options);
    aventura.setScenes(scenes).startAdventure('${start}');
  </script>
</html>
`
  return base
}

export const generateInteractive = readable(generate);