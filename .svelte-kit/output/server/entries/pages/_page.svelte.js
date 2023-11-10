import { c as create_ssr_component, a as subscribe, b as add_attribute, v as validate_component, e as escape, d as each } from "../../chunks/index2.js";
import { w as writable, r as readable } from "../../chunks/index.js";
const rerender = writable(true);
const currentWiring = writable(void 0);
const scenes = writable({
  inicio: {
    texto: "Érase una vez un círculo...",
    display: {
      x: 150,
      y: 90
    },
    opciones: [
      {
        btn: "dejar tranquilo",
        escena: "final1"
      },
      {
        btn: "aplastar",
        escena: "final2"
      }
    ]
  },
  final1: {
    texto: "Perfecto, un final redondo",
    sinSalida: true,
    display: {
      x: 50,
      y: 300
    }
  },
  final2: {
    texto: "Parece que la historia formó una elipsis",
    sinSalida: true,
    display: {
      x: 230,
      y: 300
    }
  }
});
const getSceneKey = readable(
  (s) => s.scene === void 0 && s.escena !== void 0 ? "escena" : "scene"
);
const getOptionsKey = readable(
  (s) => s.options === void 0 && s.opciones !== void 0 ? "opciones" : "options"
);
const getTextKey = readable(
  (s) => s.text === void 0 && s.texto !== void 0 ? "texto" : "text"
);
const getImgKey = readable(
  (s) => s.image === void 0 && s.imagen !== void 0 ? "imagen" : "image"
);
function saveFile(str, type, filename) {
  const a2 = document.createElement("a");
  a2.href = URL.createObjectURL(new Blob([str], { type }));
  a2.setAttribute("download", filename);
  document.body.appendChild(a2);
  a2.click();
  document.body.removeChild(a2);
}
const saveJSON = readable(
  (obj, filename) => {
    saveFile(JSON.stringify(obj, null, 2), "application/json", `${filename.includes(".json") ? filename : filename + ".json"}`);
  }
);
const saveHTML = readable(
  (str) => {
    saveFile(str, "text/plain;charset=utf-8", "index.html");
  }
);
const generate = function(aventura, scenes2, start) {
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
  `;
  const base = `
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
  </body>
  <script>
    const lang = "es";
    const options = {typewriterSpeed: 20, defaultCSS: false};
  <\/script>
  <style>
    ${style}
  </style>
  <script>
    const A = ${aventura}
  <\/script>
  <script>
    const scenes = ${scenes2};
    const aventura = new A(lang, options);
    aventura.setScenes(scenes).startAdventure('${start}');
  <\/script>
</html>
`;
  return base;
};
const generateInteractive = readable(generate);
class Aventura {
  constructor(lang = "en", options) {
    this.lang = lang === "en" || lang === "es" ? lang : "en";
    this.options = {
      typewriterSpeed: 50,
      defaultCSS: true,
      adventureContainer: void 0,
      adventureScroll: false,
      adventureSlide: true,
      evalTags: false,
      igramaFormat: "png",
      urlWord: "URL",
      vizWidth: 1e3,
      vizHeight: 1e3,
      vizBg: "#313131",
      vizCol: "black",
      vizImageSize: 50,
      vizLoading: true,
      minigifOptions: {},
      sceneCallback: (s) => {
        return s;
      }
      // Returns the current scene
    };
    if (options) {
      this.options = Object.assign(this.options, this.setOptionsTranslations(options));
    }
    this.grammarError = false;
    this.scenesError = false;
    this.fijarGramatica = this.setGrammar;
    this.expandirGramatica = this.expandGrammar;
    this.probarGramatica = this.testGrammar;
    this.fijarEscenas = this.setScenes;
    this.fijarDatosEscenas = this.setDataScenes;
    this.iniciarAventura = this.startAdventure;
    this.probarEscenas = this.testScenes;
    this.cargarJSON = this.loadJSON;
    this.modeloMarkov = this.getMarkovModel;
    this.fijarMarkov = this.setMarkov;
    this.cadenaMarkov = this.markovChain;
    this.probarDistribucion = this.testDistribution;
    this.markovSeparator = /[^\S\r\n]+/i;
    this.fijarIgrama = this.setIgrama;
    this.expandirIgrama = this.expandIgrama;
    this.mostrarIgrama = this.showIgrama;
    this.textoIgrama = this.getIgramaText;
    this.imgsMemo = {};
    this.storyPreload = {};
  }
  // MAIN INPUT FUNCTIONS
  setOptionsTranslations(options) {
    const trans = {
      "velocidadMaquina": "typewriterSpeed",
      "CSSporDefecto": "defaultCSS",
      "contenedorAventura": "adventureContainer",
      "rolloAventura": "adventureScroll",
      "deslizarAImagen": "adventureSlide",
      "ejecutarEtiquetas": "evalTags",
      "formatoIgrama": "igramaFormat",
      "palabraUrl": "urlWord",
      "anchoVis": "vizWidth",
      "altoVis": "vizHeight",
      "fondoVis": "vizBg",
      "colorVis": "vizCol",
      "tamanoImagenVis": "visImageSize",
      "cargandoVis": "vizLoading",
      "opcionesMinigif": "minigifOptions",
      "funcionEscena": "sceneCallback"
    };
    for (let [k, v] of Object.entries(options)) {
      if (trans[k] !== void 0) {
        options[trans[k]] = v;
        delete options[k];
      }
    }
    return options;
  }
  setGrammar(grammar) {
    this.grammar = grammar;
    return this;
  }
  setIgrama(model) {
    this.igrama = model;
    for (let [key, value] of Object.entries(model.grammar)) {
    }
    return this;
  }
  setScenes(scenes2) {
    if (this.options.defaultCSS) {
      this.setCSS();
    }
    this.scenes = scenes2;
    for (let key of Object.keys(scenes2)) {
      this.scenes[key].key = key;
      const im = this.scenes[key].image || this.scenes[key].imagen;
      if (im !== void 0) {
        if (this.storyPreload[im] === void 0) {
          this.storyPreload[im] = new Image();
          this.storyPreload[im].src = im;
          this.storyPreload[im].className = "storyimage";
        }
      }
    }
    return this;
  }
  async setDataScenes(scenes2, data = void 0, meta = []) {
    if (this.options.defaultCSS) {
      this.setCSS();
    }
    if (typeof d3 === "undefined") {
      console.error(this.lang === "es" ? "Para crear visualizaciones debes tener también la librería D3" : "To create visualizations you must have also the D3 library");
      return;
    }
    this.scenes = JSON.parse(JSON.stringify(scenes2));
    this.metaKeys = meta;
    if (data !== void 0) {
      this.data = JSON.parse(JSON.stringify(data));
      await this.setViz(this.scenes, this.data);
    }
    this.setScenes(this.scenes);
    return this;
  }
  async setViz(scenes2, data) {
    const keys = Object.keys(scenes2);
    const vizFunction = { "compare": compareViz, "scatter": scatterViz, "pack": packViz };
    let vizCount = 0;
    for (let k of keys) {
      if (scenes2[k].viz === void 0)
        continue;
      vizCount++;
    }
    let loadState = 0;
    let generaldiv;
    const loadMsg = this.lang === "en" ? "Loading..." : "Cargando...";
    if (this.options.vizLoading) {
      generaldiv = document.createElement("div");
      generaldiv.id = "storygeneraldiv";
      generaldiv.className = "storydiv";
      generaldiv.textContent = loadMsg;
      const parent = this.options.adventureContainer !== void 0 ? document.getElementById(this.options.adventureContainer) : document.body;
      parent.appendChild(generaldiv);
    }
    function pbar(v, n = 15) {
      let str = "";
      for (let i = 0; i < Math.ceil(n); i++) {
        str += i < v * n ? "|" : "-";
      }
      return str;
    }
    for (let k of keys) {
      if (scenes2[k].viz === void 0)
        continue;
      const { filter, type, x, y } = scenes2[k].viz;
      if (vizFunction[type] === void 0 || x === void 0 || y === void 0) {
        const errorMsg = this.lang === "es" ? `Parámetros incorrectos de visualización en la escena "${k}"` : `Incorrect parameteres in the scene "${k}"`;
        console.error(errorMsg);
      }
      let filtered = data;
      for (let f of filter) {
        const fn = this.filterFn(f);
        filtered = fn(filtered);
      }
      let prevLoadState = loadState;
      const { viz, areas } = await vizFunction[type](this, filtered, x, y, (progress) => {
        loadState = prevLoadState + progress / vizCount;
        const percentage = Math.ceil(loadState * 100);
        if (this.options.vizLoading) {
          generaldiv.textContent = `${loadMsg} ${pbar(loadState)} ${percentage}%`;
        }
      });
      scenes2[k].image = viz;
      scenes2[k].areas = areas;
    }
    for (let d of data) {
      if (d.ID === void 0) {
        const errorMsg = this.lang === "es" ? `Todos los datos deben tener un valor único con la clave ID` : `All data must have a unique value with the ID key`;
        console.error(errorMsg);
        this.scenes = {};
        break;
      }
      scenes2[`ind_${d.ID}`] = {
        text: `${d.CONT || ""}`,
        meta: d.ID,
        dataScene: true,
        options: [{ btn: "<<<", scene: `ind_${d.ID}` }]
      };
      if (d.IMGURL !== void 0) {
        scenes2[`ind_${d.ID}`].image = d.IMGURL;
      }
      if (d.URL !== void 0) {
        scenes2[`ind_${d.ID}`].url = d.URL;
      }
    }
    generaldiv.remove();
  }
  filterFn(f) {
    const comp = f[1];
    if (comp === "=" || comp === "==" || comp === "===") {
      return (data) => data.filter((d) => b(d[f[0]]) == b(f[2]));
    } else if (comp === "<") {
      return (data) => data.filter((d) => b(d[f[0]]) < b(f[2]));
    } else if (comp === ">") {
      return (data) => data.filter((d) => b(d[f[0]]) > b(f[2]));
    } else {
      return (data) => data;
    }
    function b(v) {
      return v === "true" ? true : v === "false" ? false : v;
    }
  }
  setMarkov(model) {
    this.markov = model;
    return this;
  }
  // GRAMMAR EXPANSION
  expandGrammar(start) {
    const firstString = this.selectGrammarRule(this.grammar[start]);
    return this.grammarRuleRecursion(firstString);
  }
  expandIgrama(start) {
    const grammar = this.igrama.grammar;
    const firstString = this.selectGrammarRule(grammar[start]);
    const result = this.grammarRuleRecursion(firstString, grammar).split("|").map((drawing) => this.decodeDrawing(drawing));
    return result;
  }
  grammarRuleRecursion(string, g) {
    let grammar = g || this.grammar;
    let newstring = this.setNewRules(string);
    const ruleList = newstring.match(/<[\w\d.,/#]+>/gi);
    if (!ruleList) {
      return newstring;
    }
    for (let rule of ruleList) {
      const transformations = this.defineTransformations(rule);
      newstring = newstring.replace(rule, () => {
        rule = rule.replace(/[<>]/gi, "");
        rule = rule.replace(/#[\w\d.,/]+#/g, "");
        const ruleArray = rule.search(/[.]/) > -1 ? this.getNestedObject(grammar, rule.match(/[\w\d]+/g)) : (
          // if there is a path for the rule
          grammar[rule]
        );
        if (!ruleArray) {
          const errorMsg = this.lang === "es" ? `Se intentó expandir desde la regla "${rule}", pero no se pudo encontrar` : `Tried to expand from rule "${rule}", but couldn't find it`;
          console.error(errorMsg);
        }
        const preTransformed = this.selectGrammarRule(ruleArray);
        return this.transformString(preTransformed, transformations);
      });
    }
    return this.grammarRuleRecursion(newstring, grammar);
  }
  // GRAMMAR RULE CREATION
  setNewRules(string, g) {
    let grammar;
    if (g === void 0) {
      grammar = this.grammar;
    } else {
      grammar = g;
    }
    let newstring = string;
    const rules = newstring.match(/\$[\w\d]+\$\[[\w\d:,-]+\]/ig);
    if (rules) {
      while (rules.length) {
        const newrule = rules.pop();
        newstring = newstring.replace(newrule, "");
        const { symbol, pairsString } = /\$(?<symbol>[\w\d]+)\$\[(?<pairsString>[\w\d:,-]+)\]/i.exec(newrule).groups;
        const pairs = pairsString.match(/[-]?[\w\d]+:[\w\d]+/gi).map((d) => /(?<remove>[-]?)(?<key>[\w\d]+)[ ]?:[ ]?(?<value>[\w\d]+)/gi.exec(d).groups);
        if (pairs) {
          grammar[symbol] = grammar[symbol] || {};
          for (let p of pairs) {
            const ruleArray = grammar[p.value];
            if (!ruleArray) {
              const errorMsg = this.lang === "es" ? `Se intentó crear la nueva regla "${symbol}", pero no se pudo encontrar "${p.value}" para producir la subregla "${p.key}"` : `Tried to create new rule: "${symbol}", but couldn't find "${p.value}" to produce "${p.key}" subrule`;
              console.error(errorMsg);
            }
            const remove = p.remove === "-" ? true : false;
            const assigned = this.selectGrammarRule(ruleArray);
            if (remove) {
              const choiceIndex = ruleArray.indexOf(assigned);
              grammar[p.value] = [...ruleArray.slice(0, choiceIndex), ...ruleArray.slice(choiceIndex + 1)];
            }
            grammar[symbol][p.key] = [assigned];
          }
        }
      }
    }
    return newstring;
  }
  // INTERACTIVE STORY
  startAdventure(start) {
    const generaldiv = document.createElement("div");
    generaldiv.id = "storygeneraldiv";
    const parent = this.options.adventureContainer !== void 0 ? document.getElementById(this.options.adventureContainer) : document.body;
    parent.appendChild(generaldiv);
    this.prevScene = start;
    this.goToScene(this.scenes[start]);
    return this;
  }
  goToScene(scene) {
    const generaldiv = document.getElementById("storygeneraldiv");
    if (!this.options.adventureScroll || scene.plop === true) {
      const prevstorydivs = [...document.getElementsByClassName("storydiv")];
      prevstorydivs.map((e) => e.remove());
    }
    const prevareas = [...document.getElementsByClassName("storyimage-area")];
    prevareas.map((e) => e.remove());
    const storydiv = document.createElement("div");
    storydiv.className = "storydiv";
    generaldiv.appendChild(storydiv);
    if (scene.image || scene.imagen) {
      const storyImageContainer = document.createElement("div");
      storyImageContainer.className = "storyimage-container";
      storydiv.appendChild(storyImageContainer);
      const src = scene.image || scene.imagen;
      const image = !this.options.adventureScroll ? this.storyPreload[src] : this.storyPreload[src].cloneNode();
      storyImageContainer.appendChild(image);
      if (scene.areas) {
        if (image.complete) {
          this.setAreas(image, storyImageContainer, scene.areas);
        } else {
          image.onload = () => {
            this.setAreas(image, storyImageContainer, scene.areas);
          };
        }
      }
    } else if (scene.igrama !== void 0) {
      const storyImageContainer = document.createElement("div");
      storyImageContainer.className = "storyimage-container";
      storydiv.appendChild(storyImageContainer);
      const layers = this.expandIgrama(scene.igrama);
      scene.igramaText = this.getIgramaText(layers);
      this.igramaDataUrl(layers, this.options.igramaFormat).then((url) => {
        const image = new Image();
        image.src = url;
        image.className = "storyimage";
        storyImageContainer.appendChild(image);
      });
    }
    if (scene.title || scene.titulo) {
      const title_container = document.createElement("div");
      title_container.className = "storytitle-container";
      storydiv.appendChild(title_container);
      const title = document.createElement("h1");
      title.className = "storytitle";
      title.textContent = scene.title || scene.titulo;
      title_container.appendChild(title);
    }
    if (scene.meta !== void 0) {
      const meta_container = document.createElement("div");
      meta_container.className = "storymeta-container";
      storydiv.appendChild(meta_container);
      const dataPoint = this.data.find((d) => d.ID == scene.meta);
      for (let mk of this.metaKeys) {
        if (dataPoint[mk] === void 0)
          continue;
        const div = document.createElement("div");
        div.className = "storymeta-subcontainer";
        meta_container.appendChild(div);
        const key = document.createElement("span");
        key.className = "storymeta-key";
        key.textContent = `${mk}: `;
        div.appendChild(key);
        const val = document.createElement("span");
        val.className = "storymeta-val";
        val.textContent = dataPoint[mk];
        div.appendChild(val);
      }
    }
    const paragraph_container = document.createElement("div");
    paragraph_container.className = "storyp-container";
    if (scene.text || scene.texto || scene.igramaText) {
      storydiv.appendChild(paragraph_container);
    }
    const paragraph = document.createElement("p");
    paragraph.className = "storyp";
    paragraph.textContent = "";
    paragraph_container.appendChild(paragraph);
    if (scene.url) {
      const url = document.createElement("a");
      url.className = "storyurl";
      url.href = scene.url;
      url.target = "_blank";
      url.textContent = this.options.urlWord;
      paragraph_container.appendChild(url);
    }
    if (this.options.adventureSlide) {
      document.getElementById("storygeneraldiv").scrollIntoView({ behavior: "smooth", block: "end" });
    }
    this.typewriter(paragraph, scene);
    if (this.data) {
      if (scene.viz !== void 0) {
        this.prevScene = scene.key;
      } else {
        if (scene.dataScene === true) {
          scene.options[0].scene = this.prevScene;
        }
      }
    }
    this.options.sceneCallback(scene);
  }
  setAreas(imgSource, parent, areas) {
    const dims = imgSource.getBoundingClientRect();
    const dimsC = parent.getBoundingClientRect();
    window.onresize = () => {
      if (document.getElementsByClassName("storyimage-area").length > 0) {
        this.setAreas(imgSource, parent, areas);
      }
    };
    const prevareas = [...document.getElementsByClassName("storyimage-area")];
    prevareas.map((e) => e.remove());
    for (let a2 of areas) {
      let area = document.createElement("div");
      area.className = "storyimage-area";
      const left = (a2.x - Math.floor(a2.w / 2)) * dims.width / imgSource.naturalWidth;
      area.style.left = `${dims.left - dimsC.left + left}px`;
      const top = (a2.y - Math.floor(a2.h / 2)) * dims.height / imgSource.naturalHeight;
      area.style.top = `${dims.top - dimsC.top + top}px`;
      area.style.width = `${a2.w * dims.width / imgSource.naturalWidth}px`;
      area.style.height = `${a2.h * dims.height / imgSource.naturalHeight}px`;
      area.textContent = a2.btn || "";
      if (left > 0 && left < dims.width && top > 0 && top < dims.height) {
        parent.appendChild(area);
      }
      area.style.fontSize = `${18 * dims.height / imgSource.naturalHeight}px`;
      area.onclick = () => {
        const e = a2.scene || a2.escena;
        this.goToScene(this.scenes[e]);
      };
      if (a2.tooltip !== void 0) {
        area.onmouseover = () => {
          area.textContent = a2.tooltip || "";
          area.style.zIndex = "100";
        };
        area.onmouseout = () => {
          area.textContent = a2.btn || "";
          area.style.zIndex = "0";
        };
      }
    }
  }
  async typewriter(paragraph, scene) {
    const textContent = scene.text || scene.texto || scene.igramaText || "";
    let text = this.grammar ? this.grammarRuleRecursion(textContent) : textContent;
    text = text.replace(/\n/g, "<br>");
    if (this.options.typewriterSpeed > 0) {
      let i = 0;
      await new Promise((r) => {
        const interval = setInterval(() => {
          const textpart = text.substring(0, i);
          if (this.options.evalTags) {
            paragraph.innerHTML = textpart;
          } else {
            paragraph.textContent = textpart;
          }
          i++;
          if (i > text.length) {
            clearInterval(interval);
            r(true);
          }
        }, Math.floor(this.options.typewriterSpeed));
      });
      this.optionButtons(scene);
    } else {
      if (this.options.evalTags) {
        paragraph.innerHTML = text;
      } else {
        paragraph.textContent = text;
      }
      this.optionButtons(scene);
    }
  }
  optionButtons(scene) {
    const storydivs = [...document.getElementsByClassName("storydiv")];
    const storydiv = storydivs[storydivs.length - 1];
    const prevbuttons = [...document.getElementsByClassName("storybutton-container")];
    prevbuttons.map((e) => e.remove());
    const btns_container = document.createElement("div");
    btns_container.className = "storybutton-container";
    storydiv.appendChild(btns_container);
    if (scene.options || scene.opciones) {
      const options = scene.options || scene.opciones;
      for (let option of options) {
        const optionButton = document.createElement("button");
        optionButton.className = "storybutton";
        optionButton.textContent = option.btn;
        btns_container.appendChild(optionButton);
        optionButton.addEventListener("click", () => {
          const includesText = option.text || option.texto;
          if (includesText === void 0) {
            const nextScene = option.scene || option.escena;
            this.goToScene(this.scenes[nextScene]);
          } else {
            this.goToScene(option);
          }
        });
      }
    } else if (scene.scene || scene.escena) {
      const nextScene = scene.scene || scene.escena;
      const continueButton = document.createElement("button");
      continueButton.className = "storybutton";
      continueButton.textContent = this.lang === "en" ? "Continue" : "Continuar";
      btns_container.appendChild(continueButton);
      continueButton.addEventListener("click", () => {
        this.goToScene(this.scenes[nextScene]);
      });
    }
    if (this.options.adventureSlide) {
      document.getElementById("storygeneraldiv").scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }
  // GRAMMAR UTILITIES
  selectGrammarRule(array) {
    if (array.length === 0)
      return "";
    if (array.prob) {
      const chooser = Math.random() * array.prob.reduce((a2, c) => a2 + c);
      let count = 0;
      for (let i = 0; i < array.prob.length; i++) {
        if (count <= chooser && chooser < count + array.prob[i]) {
          return array[i];
        }
        count += array.prob[i];
      }
    }
    const choiceIndex = Math.floor(Math.random() * array.length);
    const choice = array[choiceIndex];
    return choice;
  }
  getNestedObject(object, pathArray) {
    return pathArray.reduce((obj, key) => obj && obj[key] !== void 0 ? obj[key] : void 0, object);
  }
  defineTransformations(rule) {
    let transformations = {};
    const trans = /#(?<trans>[\w\d,]+)#/gi.exec(rule);
    const transformationList = trans ? trans.groups.trans.match(/[\w]+/gi) : [];
    for (let t of transformationList) {
      transformations[t] = true;
    }
    return transformations;
  }
  transformString(string, transformations) {
    let tempString = string;
    if (transformations.CAPITALIZE) {
      tempString = tempString.charAt(0).toUpperCase() + tempString.slice(1);
    }
    if (transformations.ALLCAPS) {
      tempString = tempString.toUpperCase();
    }
    return tempString;
  }
  // IGRAMA UTILITIES
  decodeDrawing(data) {
    if (data === "") {
      return [];
    }
    const [type, content, attribute] = data.split("%%");
    let decoded = {};
    if (type === "vector") {
      decoded.content = content.split("**").map((doodle) => {
        const [color, weight, v] = doodle.split("&");
        const xy = [];
        xy.color = color;
        xy.weight = weight;
        if (v === void 0)
          return xy;
        const flat = v.split(",");
        for (let i = 0; i < flat.length; i += 2) {
          xy.push([+flat[i], +flat[i + 1]]);
        }
        return xy;
      });
    } else {
      decoded.content = content;
    }
    decoded.attribute = attribute;
    decoded.type = type;
    return decoded;
  }
  // MARKOV MODEL
  async getMarkovModel(filename, ngram = 1, save = false) {
    let text = await (await fetch(`./${filename}`)).text();
    text = text.replace(/([,:.;])/g, " $1").replace(/[()\¿¡!?”“—-]/g, "").toLowerCase();
    const words = text.split(this.markovSeparator);
    const fragments = {};
    for (let i = 0; i < words.length - ngram; i++) {
      let f = "";
      for (let j = 0; j < ngram; j++) {
        f += j === 0 ? words[i + j] : " " + words[i + j];
      }
      if (fragments[f] === void 0) {
        fragments[f] = {};
      }
      const nextWord = words[i + ngram];
      if (fragments[f][nextWord] === void 0) {
        fragments[f][nextWord] = 1;
      } else {
        fragments[f][nextWord]++;
      }
    }
    const mProbs = {};
    for (let f of Object.keys(fragments)) {
      const keys = Object.keys(fragments[f]);
      mProbs[f] = { probs: [], grams: keys };
      let sum = 0;
      for (let i = 0; i < keys.length; i++) {
        sum += fragments[f][keys[i]];
      }
      for (let i = 0; i < keys.length; i++) {
        mProbs[f].probs[i] = fragments[f][keys[i]] / sum;
      }
    }
    if (save) {
      const filenameParts = filename.split("/");
      this.saveJSON(mProbs, `${filenameParts[filenameParts.length - 1]}_markovModel_${ngram}N.json`);
    }
    return mProbs;
  }
  // MARKOV CHAIN
  markovChain(chainLength, seed, newLineProbability = 0.1) {
    let result = seed === void 0 || this.markov[seed] === void 0 ? this.randomMarkovWord() : seed;
    let currentGram = result;
    for (let chain = 0; chain < chainLength - 1; chain++) {
      let nextWord = this.getNextMarkov(this.markov[currentGram]);
      if (nextWord === void 0) {
        nextWord = this.getNextMarkov(this.randomMarkovWord());
      }
      let tempList = currentGram.split(this.markovSeparator);
      tempList.push(nextWord);
      tempList = tempList.slice(1).join(" ");
      currentGram = tempList;
      result += ` ${nextWord}`;
    }
    const formatted = this.formatMarkov(result, newLineProbability);
    return formatted;
  }
  // MARKOV UTILITIES
  randomMarkovWord() {
    const choice = Math.floor(Math.random() * Object.keys(this.markov).length);
    return Object.keys(this.markov)[choice];
  }
  getNextMarkov(data) {
    const rnd = Math.random();
    let count = 0;
    if (data === void 0)
      return void 0;
    for (let i = 0; i < data.probs.length; i++) {
      if (count <= rnd && rnd < count + data.probs[i]) {
        return data.grams[i];
      }
      count += data.probs[i];
    }
  }
  formatMarkov(str, newLineProbability = 0.1) {
    let formatted = str.replace(/ ([,:.;])/g, "$1");
    formatted = formatted.replaceAll(/([.]) ([\wáéíóú])/ig, (match, c1, c2, offset, fullString) => {
      const rnd = Math.random();
      if (rnd < newLineProbability) {
        return `.
${c2.toUpperCase()}`;
      } else {
        return `. ${c2.toUpperCase()}`;
      }
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  // GENERAL UTILITIES
  async loadJSON(path) {
    return await (await fetch(path)).json();
  }
  saveJSON(obj, filename) {
    const a2 = document.createElement("a");
    a2.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json"
    }));
    a2.setAttribute("download", `${filename.includes(".json") ? filename : filename + ".json"}`);
    document.body.appendChild(a2);
    a2.click();
    document.body.removeChild(a2);
  }
  // DEBUGGING TOOLS
  testScenes(scenes2) {
    const testScenes = scenes2 || this.scenes;
    if (!testScenes) {
      const errorMsg = this.lang === "es" ? "No hay escenas para probar" : "There are not scenes to test";
      console.error(errorMsg);
    }
    let deadEnds = [];
    for (let e of Object.keys(testScenes)) {
      const scene = testScenes[e];
      if (scene.options || scene.opciones) {
        const options = scene.options || scene.opciones;
        const filtered = options.filter((d) => !testScenes[d.scene || d.escena]);
        deadEnds = [...deadEnds, ...filtered.map((d) => `${e} => ${d.btn} => ${d.scene || d.escena}`)];
      } else {
        if (scene.deadEnd || scene.sinSalida) {
          continue;
        }
        if (!testScenes[scene.scene || scene.escena]) {
          deadEnds.push(`${e} => ${scene.scene || scene.escena}`);
        }
      }
    }
    if (deadEnds.length > 0) {
      const errorMsg = this.lang === "es" ? `Las siguientes escenas no llevan a ningún lado: ${deadEnds.join(", ")}` : `The following scenes are dead ends: ${deadEnds.join(", ")}`;
      console.error(errorMsg);
      this.scenesError = true;
    }
    return this;
  }
  testGrammar(grammar) {
    const testGrammar = grammar || this.grammar;
    if (!testGrammar) {
      const errorMsg = this.lang === "es" ? "No hay gramática para probar" : "There is not grammar to test";
      console.error(errorMsg);
    }
    for (let e of Object.keys(testGrammar)) {
      const rules = testGrammar[e];
      for (let rule of rules) {
        const refsMatch = rule.match(/<([\w\d]+)>/gi);
        const references = refsMatch ? refsMatch.map((d) => d.replace(/[<>]/g, "")) : [];
        const newRulesMatch = rule.match(/\$[\w\d]+\$\[([\w\d.,:]+)\]/gi);
        const newRules = newRulesMatch ? newRulesMatch.map((d) => {
          return d.match(/([ ]?:[\w\d]+)/g).map((x) => /[ ]?:(?<key>[\w\d]+)/.exec(x).groups.key);
        }).reduce((a2, c) => [...a2, ...c], []) : [];
        const deadEnds = [...references, ...newRules].filter((d) => !testGrammar[d]);
        if (deadEnds.length > 0) {
          const errorMsg = this.lang === "es" ? `Las siguientes reglas, que se referencian en "${e}", no existen: ${deadEnds.join(", ")}` : `The following rules, referenced in "${e}", do not exist: ${deadEnds.join(", ")}`;
          this.grammarError = true;
          console.error(errorMsg);
        }
      }
    }
    return this;
  }
  testDistribution(markov) {
    const testMarkov = markov || this.markov;
    if (testMarkov === void 0) {
      const errorMsg = this.lang === "es" ? "No hay modelo Markov para probar" : "There is not Markov model to test";
      console.error(errorMsg);
    }
    const distributions = {};
    const x = {};
    let c = 0;
    const values = Object.values(testMarkov);
    for (let v of values) {
      for (let p of v.probs) {
        const aprox = (Math.round(p / 0.05) * 0.05).toFixed(2);
        x[c] = aprox;
        c++;
        if (distributions[aprox] === void 0) {
          distributions[aprox] = 1;
        } else {
          distributions[aprox]++;
        }
      }
    }
    console.log("------------------------------------ DIST ------------------------------------");
    const max = Math.max(...Object.values(distributions));
    const sorted = Object.entries(distributions).sort((a2, b) => a2[0] > b[0] ? 1 : a2[0] < b[0] ? -1 : 0);
    for (let d of sorted) {
      console.log(`${d[0]}... ${"|".repeat(Math.ceil(d[1] * 100 / max))}`);
    }
    console.log("------------------------------------ DIST ------------------------------------");
    return this;
  }
  // DRAW IMAGES
  async showIgrama(layers, format = "png", cont) {
    const dataUrl = await this.igramaDataUrl(layers, format);
    const img = new Image();
    img.src = dataUrl;
    if (cont == void 0) {
      document.body.appendChild(img);
    } else {
      document.getElementById(cont).appendChild(img);
    }
  }
  async igramaDataUrl(layers, format = "png") {
    const width = this.igrama.metadata.width;
    const height = this.igrama.metadata.height;
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.fillStyle = this.igrama.metadata.bg || "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    await this.drawLayers(layers, ctx);
    let dataUrl;
    if (format === "png") {
      dataUrl = canvas.toDataURL();
    } else if (format === "gif") {
      if (typeof MiniGif === "undefined") {
        console.error(this.lang === "es" ? "Para crear Gifs debes tener también la librería MiniGif" : "To create Gifs you must have also the MiniGif library");
        return "";
      }
      const options = {
        colorResolution: 7,
        dither: false,
        delay: 50
      };
      Object.assign(options, this.minigifOptions);
      const gif = new MiniGif(options);
      gif.addFrame(canvas);
      const layerWiggle = this.getLayerWiggle(layers);
      ctx.fillStyle = this.igrama.metadata.bg || "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      await this.drawLayers(layerWiggle, ctx);
      gif.addFrame(canvas);
      const buffer = gif.makeGif();
      const base64 = await this.base64_arraybuffer(buffer);
      dataUrl = "data:image/gif;base64," + base64;
    }
    canvas.remove();
    return dataUrl;
  }
  async base64_arraybuffer(data) {
    const base64url = await new Promise((r) => {
      const reader = new FileReader();
      reader.onload = () => r(reader.result);
      reader.readAsDataURL(new Blob([data]));
    });
    return base64url.split(",", 2)[1];
  }
  getLayerWiggle(layers) {
    const r = 3;
    const layerWiggle = JSON.parse(JSON.stringify(layers));
    const rndRng = (a2, b) => Math.floor(a2 + Math.random() * (b - a2));
    for (let [i, layer] of layerWiggle.entries()) {
      if (layer.type === "vector") {
        for (let [j, doodle] of layer.content.entries()) {
          for (let [k, v] of doodle.entries()) {
            let rnd = Math.random();
            if (rnd < 0.5) {
              v[0] += rndRng(-r, r);
            } else {
              v[1] += rndRng(-r, r);
            }
          }
          doodle.color = layers[i].content[j].color;
          doodle.weight = layers[i].content[j].weight;
        }
      }
    }
    return layerWiggle;
  }
  getIgramaText(layers) {
    const text = layers.map((d) => d.attribute).reverse().join(" ").trim();
    return text;
  }
  async drawLayers(layers, ctx) {
    for (let [index, layer] of layers.entries()) {
      if (layer.type === "url") {
        const { w, h, x, y } = this.igrama.sections[index];
        if (this.imgsMemo[layer.content] === void 0) {
          const img = new Image();
          img.src = layer.content;
          this.imgsMemo[layer.content] = await new Promise((resolve) => {
            img.addEventListener("load", () => {
              resolve(img);
            }, false);
          });
        }
        ctx.drawImage(this.imgsMemo[layer.content], x, y, w, h);
      } else if (layer.type == "vector") {
        for (let doodle of layer.content) {
          if (doodle.length === 0)
            continue;
          const spline = this.getSpline(doodle);
          this.drawSpline(spline, ctx, doodle.color, doodle.weight);
        }
      }
    }
  }
  drawSpline(spline, ctx, color, weight) {
    ctx.lineWidth = weight;
    ctx.strokeStyle = color;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.beginPath();
    for (let i = 0; i < spline.length; i++) {
      if (i === 0) {
        ctx.moveTo(...spline[0]);
      } else {
        ctx.lineTo(...spline[i]);
      }
    }
    ctx.stroke();
  }
  getSpline(points) {
    let spline = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p = [];
      p[0] = i > 0 ? points[i - 1] : points[0];
      p[1] = points[i];
      p[2] = points[i + 1];
      p[3] = i < points.length - 2 ? points[i + 2] : points[points.length - 1];
      for (let t = 0; t < 1; t += 0.05) {
        const s = this.getSplinePoint(t, p);
        spline.push(s);
      }
    }
    return spline;
  }
  getSplinePoint(t, p) {
    const p1 = Math.floor(t) + 1;
    const p2 = p1 + 1;
    const p3 = p2 + 1;
    const p0 = p1 - 1;
    const tt = t * t;
    const ttt = tt * t;
    const q1 = -ttt + 2 * tt - t;
    const q2 = 3 * ttt - 5 * tt + 2;
    const q3 = -3 * ttt + 4 * tt + t;
    const q4 = ttt - tt;
    const tx = 0.5 * (p[p0][0] * q1 + p[p1][0] * q2 + p[p2][0] * q3 + p[p3][0] * q4);
    const ty = 0.5 * (p[p0][1] * q1 + p[p1][1] * q2 + p[p2][1] * q3 + p[p3][1] * q4);
    return [tx, ty];
  }
  // INTERACTIVE STORY DOM UTILITIES
  setCSS() {
    const css2 = document.createElement("style");
    css2.id = "adventurestyle";
    css2.innerHTML = defaultStyling;
    document.getElementsByTagName("head")[0].appendChild(css2);
  }
}
async function compareViz(instance, data, h1, h2, imgLoadCallback = () => {
}) {
  const filtered = [data.find((d) => d.ID == h1), data.find((d) => d.ID == h2)];
  const width = instance.options.vizWidth;
  const height = instance.options.vizHeight;
  let progress = 0;
  const imgs = [];
  for (let f of filtered) {
    const img = new Image();
    img.setAttribute("crossorigin", "anonymous");
    img.src = f.IMGURL;
    await new Promise((r) => {
      img.onload = () => {
        r(true);
      };
    });
    imgs.push({ url: f.IMGURL, img, ID: f.ID });
    imgLoadCallback(progress / filtered.length);
    progress++;
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = instance.options.vizBg;
  ctx.fillRect(0, 0, width, height);
  const areas = [];
  let count = 0;
  for (let i of imgs) {
    const m = parseInt(width / 2) * 0.1;
    const w = parseInt(width / 2) - m;
    const h = parseInt(w * i.img.height / i.img.width);
    const x = count * (w + m) + w / 2 + m / 2;
    const y = height / 2;
    ctx.save();
    ctx.translate(-w / 2, -h / 2);
    ctx.drawImage(i.img, x, y, w, h);
    ctx.restore();
    const area = {
      x,
      y,
      w,
      h,
      btn: "",
      scene: `ind_${i.ID}`,
      tooltip: ""
    };
    areas.push(area);
    count++;
  }
  const viz = canvas.toDataURL("image/png");
  canvas.remove();
  return { viz, areas };
}
async function scatterViz(instance, data, vx, vy, imgLoadCallback = () => {
}) {
  const width = instance.options.vizWidth;
  const height = instance.options.vizHeight;
  const size = instance.options.vizImageSize;
  const margin = { l: 0.2 * width, r: 0.1 * width, t: 0.1 * height, b: 0.1 * height };
  const wm = width - margin.l - margin.r;
  const hm = height - margin.t - margin.b;
  const filtered = data;
  const domainX = [...new Set(filtered.map((d) => d[vx]))];
  const domainY = [...new Set(filtered.map((d) => d[vy]))];
  const scaleX = d3.scalePoint().domain(domainX).range([0, wm]).padding(0.5).round(true);
  const scaleY = d3.scalePoint().domain(domainY).range([0, hm]).padding(0.5).round(true);
  let progress = 0;
  const imgs = [];
  for (let d of filtered) {
    if (instance.imgsMemo[d.IMGURL] === void 0) {
      const img = new Image();
      img.setAttribute("crossorigin", "anonymous");
      img.src = d.IMGURL;
      instance.imgsMemo[d.IMGURL] = await new Promise((r) => {
        img.onload = () => {
          r(img);
        };
      });
    }
    imgs.push({ url: d.IMGURL, x: scaleX(d[vx]), y: scaleY(d[vy]), img: instance.imgsMemo[d.IMGURL], r: size, ID: d.ID });
    imgLoadCallback(progress / filtered.length);
    progress++;
  }
  d3.forceSimulation(imgs).force("charge", d3.forceManyBody().strength(5)).force("collide", d3.forceCollide(10)).tick(200);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = instance.options.vizBg;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = instance.options.vizCol;
  ctx.font = "14px serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let d of domainX) {
    ctx.fillStyle = instance.options.vizCol;
    ctx.fillText(d, margin.l + scaleX(d), margin.t + hm + margin.b / 2);
  }
  ctx.beginPath();
  ctx.moveTo(margin.l, margin.t + hm);
  ctx.lineTo(margin.l + wm, margin.t + hm);
  ctx.stroke();
  ctx.textAlign = "right";
  for (let d of domainY) {
    ctx.fillStyle = instance.options.vizCol;
    ctx.fillText(d, margin.l - 5, margin.t + scaleY(d));
  }
  ctx.beginPath();
  ctx.moveTo(margin.l, margin.t);
  ctx.lineTo(margin.l, margin.t + hm);
  ctx.stroke();
  ctx.strokeStyle = instance.options.vizCol;
  const areas = [];
  for (let i of imgs) {
    const w = size;
    const h = w * i.img.height / i.img.width;
    const x = i.x + margin.l;
    const y = i.y + margin.t;
    ctx.save();
    ctx.translate(-w / 2, -h / 2);
    ctx.drawImage(i.img, x, y, w, h);
    ctx.restore();
    const area = {
      x,
      y,
      w,
      h,
      btn: "",
      scene: `ind_${i.ID}`,
      tooltip: ""
    };
    areas.push(area);
  }
  const viz = canvas.toDataURL("image/png");
  canvas.remove();
  return { viz, areas };
}
async function packViz(instance, data, h1, h2, imgLoadCallback = () => {
}) {
  const width = instance.options.vizWidth;
  const height = instance.options.vizHeight;
  const filtered = data;
  const groups = d3.rollup(filtered, (v) => v.length, (d) => d[h1], (d) => d[h2]);
  const childrenAccessorFn = ([key, value]) => value.size && Array.from(value);
  const root = d3.hierarchy(groups, childrenAccessorFn).sum(([, value]) => value).sort((a2, b) => b.value - a2.value);
  const scheme = [...d3.schemeGreys[4]].reverse();
  const desc = root.descendants();
  const color = (v) => scheme[v];
  d3.pack(root).size([width, height]).padding(20)(root);
  const imgs = [];
  let progress = 0;
  for (let f of filtered) {
    for (let d of root.leaves()) {
      if (f[h1] === d.parent.data[0] && f[h2] === d.data[0]) {
        if (instance.imgsMemo[f.IMGURL] === void 0) {
          const img = new Image();
          img.setAttribute("crossorigin", "anonymous");
          img.src = f.IMGURL;
          instance.imgsMemo[f.IMGURL] = await new Promise((r) => {
            img.onload = () => {
              r(img);
            };
          });
        }
        imgs.push({ url: f.IMGURL, x: d.x, y: d.y, r: instance.options.vizImageSize, img: instance.imgsMemo[f.IMGURL], ID: f.ID });
      }
    }
    imgLoadCallback(progress / filtered.length);
    progress++;
  }
  d3.forceSimulation(imgs).force("collide", d3.forceCollide(20)).tick(200);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = instance.options.vizBg;
  ctx.fillRect(0, 0, width, height);
  ctx.font = "12px serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let d of desc) {
    ctx.save();
    ctx.translate(d.x, d.y);
    ctx.strokeStyle = instance.options.vizCol;
    ctx.fillStyle = color(d.depth);
    ctx.beginPath();
    ctx.ellipse(0, 0, d.r, d.r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = instance.options.vizCol;
    ctx.fillText(d.depth === 1 || d.depth === 2 ? d.data[0] : "", 0, -d.r - 5);
    ctx.restore();
  }
  const areas = [];
  for (let i of imgs) {
    const w = parseInt(50);
    const h = parseInt(w * i.img.height / i.img.width);
    const x = i.x;
    const y = i.y;
    ctx.save();
    ctx.translate(-w / 2, -h / 2);
    ctx.drawImage(i.img, x, y, w, h);
    ctx.restore();
    const area = {
      x,
      y,
      w,
      h,
      btn: "",
      scene: `ind_${i.ID}`,
      tooltip: ""
    };
    areas.push(area);
  }
  const viz = canvas.toDataURL("image/png");
  canvas.remove();
  return { viz, areas };
}
const defaultStyling = `#storygeneraldiv {
  box-sizing: border-box;
  margin: auto;
  max-width: 600px;
  font-family: 'Courier New', Courier, monospace;
  background: white;
}

.storydiv {
  box-sizing: border-box;
  border: solid black 1px;
  width: 100%;
  display: flex;
  padding: 1em;
  flex-direction: column;
}

.storytitle {
  font-size: 2em;
  margin: 0.1em 0;
}

.storyp {
  font-size: 1em;
}

.storymeta-container {
  margin: 0.5em 0;
}

.storymeta-key {
  font-weight: 700;
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
  box-sizing: border-box;
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
`;
const a = readable(Aventura);
const Toolbar_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".toolbar.svelte-1wzh48a.svelte-1wzh48a{margin:0.2em 0em;display:flex;gap:4em}.subtoolbar.svelte-1wzh48a.svelte-1wzh48a{display:flex;gap:0.1em}.toolbar-button.svelte-1wzh48a.svelte-1wzh48a{font-size:0.9em;padding:0.5em;cursor:pointer;text-align:center;border:none;border-radius:5px;border:var(--project-stroke) solid 1px;font-family:var(--main-font)}.toolbar-button.svelte-1wzh48a.svelte-1wzh48a:hover{background:var(--btn-hover)}.toolbar-button.svelte-1wzh48a.svelte-1wzh48a:active{background:var(--btn-active)}.project-toolbar.svelte-1wzh48a button.svelte-1wzh48a,label.svelte-1wzh48a.svelte-1wzh48a{background:var(--project-fill-light);color:var(--project-stroke)}.scene-toolbar.svelte-1wzh48a button.svelte-1wzh48a{background:var(--scene-fill);color:var(--project-stroke)}",
  map: null
};
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_saveHTML;
  let $$unsubscribe_generateInteractive;
  let $$unsubscribe_scenes;
  let $$unsubscribe_a;
  let $$unsubscribe_saveJSON;
  $$unsubscribe_saveHTML = subscribe(saveHTML, (value) => value);
  $$unsubscribe_generateInteractive = subscribe(generateInteractive, (value) => value);
  $$unsubscribe_scenes = subscribe(scenes, (value) => value);
  $$unsubscribe_a = subscribe(a, (value) => value);
  $$unsubscribe_saveJSON = subscribe(saveJSON, (value) => value);
  let { showNewScene } = $$props;
  let { showTest } = $$props;
  if ($$props.showNewScene === void 0 && $$bindings.showNewScene && showNewScene !== void 0)
    $$bindings.showNewScene(showNewScene);
  if ($$props.showTest === void 0 && $$bindings.showTest && showTest !== void 0)
    $$bindings.showTest(showTest);
  $$result.css.add(css$9);
  $$unsubscribe_saveHTML();
  $$unsubscribe_generateInteractive();
  $$unsubscribe_scenes();
  $$unsubscribe_a();
  $$unsubscribe_saveJSON();
  return `<div class="${"toolbar svelte-1wzh48a"}"><input type="${"file"}" id="${"load-input"}" hidden>
  <div class="${"project-toolbar subtoolbar svelte-1wzh48a"}"><button class="${"toolbar-button svelte-1wzh48a"}">Nuevo proyecto</button>
    <label class="${"toolbar-button svelte-1wzh48a"}" for="${"load-input"}">Importar</label>
    <button class="${"toolbar-button svelte-1wzh48a"}">Exportar</button>
    <button class="${"toolbar-button svelte-1wzh48a"}">Previsualizar</button>
    <button class="${"toolbar-button svelte-1wzh48a"}">Generar interactivo final</button></div>
  <div class="${"scene-toolbar subtoolbar svelte-1wzh48a"}"><button class="${"toolbar-button svelte-1wzh48a"}">Nueva escena</button></div>
</div>`;
});
const DragNode_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".scene-node-container.svelte-sua7yb{padding:0.8em;border:solid 2px var(--scene-stroke);border-radius:10px;background:var(--scene-fill);cursor:move;position:absolute;user-select:none;display:grid;grid-gap:5px}",
  map: null
};
const DragNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { scene } = $$props;
  let { movingNode = false } = $$props;
  let { key } = $$props;
  if ($$props.scene === void 0 && $$bindings.scene && scene !== void 0)
    $$bindings.scene(scene);
  if ($$props.movingNode === void 0 && $$bindings.movingNode && movingNode !== void 0)
    $$bindings.movingNode(movingNode);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  $$result.css.add(css$8);
  return `<div class="${"scene-node-container svelte-sua7yb"}"${add_attribute("key", key, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
const DragGui_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".draggui.svelte-lq1cua{box-sizing:border-box;display:grid;grid-gap:10px;position:absolute;padding:10px;border:solid 3px var(--drag-stroke);border-radius:10px;background:var(--drag-fill);z-index:3}",
  map: null
};
const DragGui = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pos } = $$props;
  let { displace = { x: pos.x, y: pos.y } } = $$props;
  if ($$props.pos === void 0 && $$bindings.pos && pos !== void 0)
    $$bindings.pos(pos);
  if ($$props.displace === void 0 && $$bindings.displace && displace !== void 0)
    $$bindings.displace(displace);
  $$result.css.add(css$7);
  return `<div class="${"draggui svelte-lq1cua"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
const TopBar_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".top-bar.svelte-15bdkib{display:flex;justify-content:right}",
  map: null
};
const TopBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toggle } = $$props;
  if ($$props.toggle === void 0 && $$bindings.toggle && toggle !== void 0)
    $$bindings.toggle(toggle);
  $$result.css.add(css$6);
  return `<div class="${"top-bar svelte-15bdkib"}"><button class="${"x-button"}">X</button>
</div>`;
});
const NewOption_svelte_svelte_type_style_lang = "";
const NewArea_svelte_svelte_type_style_lang = "";
const ImgUpload_svelte_svelte_type_style_lang = "";
const Editor_svelte_svelte_type_style_lang = "";
const SceneNode_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".node-btns.svelte-cnz2jn.svelte-cnz2jn{display:flex;justify-content:space-around;gap:10px;border-top:1px var(--scene-stroke) solid}.node-btns-div.svelte-cnz2jn.svelte-cnz2jn{display:flex;justify-content:center}.btns-name.svelte-cnz2jn.svelte-cnz2jn{font-size:10px;text-align:left}.node-btns-div.svelte-cnz2jn button.svelte-cnz2jn{background:white;border-radius:4px;border:solid 1px var(--scene-stroke);cursor:pointer}.node-btns-div.svelte-cnz2jn button.svelte-cnz2jn:hover{background:var(--btn-hover)}.node-btns-div.svelte-cnz2jn button.svelte-cnz2jn:active{background:var(--btn-active)}input.svelte-cnz2jn.svelte-cnz2jn{background:white;border:none;border-bottom:solid 1px var(--scene-stroke)}.connection.svelte-cnz2jn.svelte-cnz2jn{margin:auto;width:10px;height:10px;cursor:pointer;border-radius:10px;background:var(--input-stroke)}.connection.svelte-cnz2jn.svelte-cnz2jn:hover{border:solid 2px var(--drag-stroke)}.area-connection.svelte-cnz2jn.svelte-cnz2jn{background:var(--area-stroke)}.option-connection.svelte-cnz2jn.svelte-cnz2jn{background:var(--scene-stroke)}.input.svelte-cnz2jn.svelte-cnz2jn{position:absolute;left:50%;top:-5px}.node-outputs.svelte-cnz2jn.svelte-cnz2jn{display:flex;justify-content:left;align-items:center;gap:1em;border-top:var(--scene-stroke) 1px solid;padding-top:0.5em}.output-container.svelte-cnz2jn.svelte-cnz2jn{display:flex}.output-text.svelte-cnz2jn.svelte-cnz2jn{font-size:12px;min-width:15px}.output.svelte-cnz2jn.svelte-cnz2jn{position:absolute;bottom:-5px}h1.svelte-cnz2jn.svelte-cnz2jn{margin:0px;padding:0px;font-size:1em;text-align:center}.p-container.svelte-cnz2jn.svelte-cnz2jn{display:flex;justify-content:center}.text-p.svelte-cnz2jn.svelte-cnz2jn{max-width:300px;font-size:12px;padding:0px;margin:0px}.img-preview-container.svelte-cnz2jn.svelte-cnz2jn{max-width:100px;max-height:200px;display:flex;margin:auto}.img-preview.svelte-cnz2jn.svelte-cnz2jn{max-width:100%;pointer-events:none;display:inline}",
  map: null
};
const SceneNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_rerender;
  let $scenes, $$unsubscribe_scenes;
  let $$unsubscribe_getSceneKey;
  let $getOptionsKey, $$unsubscribe_getOptionsKey;
  let $$unsubscribe_currentWiring;
  let $getImgKey, $$unsubscribe_getImgKey;
  let $getTextKey, $$unsubscribe_getTextKey;
  $$unsubscribe_rerender = subscribe(rerender, (value) => value);
  $$unsubscribe_scenes = subscribe(scenes, (value) => $scenes = value);
  $$unsubscribe_getSceneKey = subscribe(getSceneKey, (value) => value);
  $$unsubscribe_getOptionsKey = subscribe(getOptionsKey, (value) => $getOptionsKey = value);
  $$unsubscribe_currentWiring = subscribe(currentWiring, (value) => value);
  $$unsubscribe_getImgKey = subscribe(getImgKey, (value) => $getImgKey = value);
  $$unsubscribe_getTextKey = subscribe(getTextKey, (value) => $getTextKey = value);
  let { movingNode = false } = $$props;
  let { key } = $$props;
  let scene = $scenes[key];
  const textKey = $getTextKey(scene);
  const optionsKey = $getOptionsKey(scene);
  const imgKey = $getImgKey(scene);
  if (scene.display === void 0) {
    scene.display = { x: 0, y: 0 };
  }
  if ($$props.movingNode === void 0 && $$bindings.movingNode && movingNode !== void 0)
    $$bindings.movingNode(movingNode);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  $$result.css.add(css$5);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        scene = $scenes[key];
      }
    }
    $$rendered = `${validate_component(DragNode, "DragNode").$$render(
      $$result,
      { scene, key, movingNode },
      {
        movingNode: ($$value) => {
          movingNode = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `
  <div${add_attribute("key", key, 0)} class="${"connection input svelte-cnz2jn"}"></div>
  <h1 class="${"svelte-cnz2jn"}">Escena: ${escape(key)}</h1>

  ${scene[imgKey] !== void 0 && scene[imgKey] !== null ? `<div class="${"img-preview-container svelte-cnz2jn"}"><img${add_attribute("src", scene[imgKey], 0)} alt="${"Preview"}" class="${"img-preview svelte-cnz2jn"}">
      <button class="${"x-button image-x-button"}">x</button></div>` : ``}

  <div class="${"p-container svelte-cnz2jn"}"><p class="${"text-p svelte-cnz2jn"}">${escape(scene[textKey].length < 210 ? scene[textKey] : scene[textKey].slice(0, 210) + "...")}</p></div>
  <div class="${"node-btns svelte-cnz2jn"}"><div><span class="${"btns-name svelte-cnz2jn"}">escena</span>
      <div class="${"node-btns-div svelte-cnz2jn"}"><button class="${"svelte-cnz2jn"}">editar</button>
        <button class="${"svelte-cnz2jn"}">x</button></div></div>

    <div><span class="${"btns-name svelte-cnz2jn"}">btn</span>
      <div class="${"node-btns-div svelte-cnz2jn"}"><button class="${"svelte-cnz2jn"}">+</button></div></div>

    ${scene[imgKey] !== void 0 && scene[imgKey] !== null ? `<div><span class="${"btns-name svelte-cnz2jn"}">área</span>
        <div class="${"node-btns-div svelte-cnz2jn"}"><button class="${"svelte-cnz2jn"}">+</button></div></div>` : ``}</div>
  
  <div class="${"node-outputs svelte-cnz2jn"}">${each($scenes[key][optionsKey] || [], (op, i) => {
            return `<div class="${"output-container svelte-cnz2jn"}"><input type="${"text"}" class="${"output-text svelte-cnz2jn"}"${add_attribute("value", op.btn, 0)}${add_attribute("i", i, 0)}>
          <button class="${"x-button"}"${add_attribute("i", i, 0)}>x</button>
          
          <div type="${"ops"}"${add_attribute("key", key, 0)}${add_attribute("content", op.btn, 0)} class="${"connection output option-connection svelte-cnz2jn"}"${add_attribute("i", i, 0)}></div>
        </div>`;
          })}

      ${each($scenes[key].areas || [], (a2, i) => {
            return `<div class="${"output-container svelte-cnz2jn"}"><input type="${"text"}" class="${"output-text svelte-cnz2jn"}"${add_attribute("value", a2.name, 0)}${add_attribute("i", i, 0)}>
          <button class="${"x-button"}"${add_attribute("i", i, 0)}>x</button>
          
          <div type="${"areas"}"${add_attribute("key", key, 0)}${add_attribute("content", a2.name, 0)} class="${"connection output area-connection svelte-cnz2jn"}"${add_attribute("i", i, 0)}></div>
        </div>`;
          })}</div>`;
        }
      }
    )}

${``}

${``}

${``}`;
  } while (!$$settled);
  $$unsubscribe_rerender();
  $$unsubscribe_scenes();
  $$unsubscribe_getSceneKey();
  $$unsubscribe_getOptionsKey();
  $$unsubscribe_currentWiring();
  $$unsubscribe_getImgKey();
  $$unsubscribe_getTextKey();
  return $$rendered;
});
const Connections_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".connection.svelte-1h0rpzd{fill:none;stroke-width:3px}.op-connection.svelte-1h0rpzd{stroke:var(--scene-stroke)}.a-connection.svelte-1h0rpzd{stroke:var(--area-stroke)}",
  map: null
};
const Connections = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $scenes, $$unsubscribe_scenes;
  let $$unsubscribe_currentWiring;
  let $$unsubscribe_getSceneKey;
  let $getOptionsKey, $$unsubscribe_getOptionsKey;
  $$unsubscribe_scenes = subscribe(scenes, (value) => $scenes = value);
  $$unsubscribe_currentWiring = subscribe(currentWiring, (value) => value);
  $$unsubscribe_getSceneKey = subscribe(getSceneKey, (value) => value);
  $$unsubscribe_getOptionsKey = subscribe(getOptionsKey, (value) => $getOptionsKey = value);
  let { key } = $$props;
  let { pageMouse } = $$props;
  let { movingNode } = $$props;
  let scene = $scenes[key];
  $getOptionsKey(scene);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.pageMouse === void 0 && $$bindings.pageMouse && pageMouse !== void 0)
    $$bindings.pageMouse(pageMouse);
  if ($$props.movingNode === void 0 && $$bindings.movingNode && movingNode !== void 0)
    $$bindings.movingNode(movingNode);
  $$result.css.add(css$4);
  {
    if (pageMouse || $scenes || movingNode) {
      scene.display = scene.display;
    }
  }
  $$unsubscribe_scenes();
  $$unsubscribe_currentWiring();
  $$unsubscribe_getSceneKey();
  $$unsubscribe_getOptionsKey();
  return `${``}`;
});
const NewScene_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".bar.svelte-1bhrmvp{display:flex;justify-content:right}",
  map: null
};
const NewScene = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let text;
  let $$unsubscribe_scenes;
  $$unsubscribe_scenes = subscribe(scenes, (value) => value);
  let { showNewScene } = $$props;
  let { offset } = $$props;
  let pos = {
    x: offset.x * -1 + 20,
    y: offset.y * -1 + 20
  };
  let displace;
  if ($$props.showNewScene === void 0 && $$bindings.showNewScene && showNewScene !== void 0)
    $$bindings.showNewScene(showNewScene);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    text = "";
    $$rendered = `${validate_component(DragGui, "DragGui").$$render(
      $$result,
      { pos, displace },
      {
        displace: ($$value) => {
          displace = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(TopBar, "TopBar").$$render(
            $$result,
            { toggle: showNewScene },
            {
              toggle: ($$value) => {
                showNewScene = $$value;
                $$settled = false;
              }
            },
            {}
          )}
  <div><label for="${"inp"}">Escena:</label>
    
    <input id="${"inp"}" type="${"text"}"${add_attribute("value", text, 0)}></div>
  <div class="${"bar svelte-1bhrmvp"}"><button class="${"gui-button"}">Aceptar</button></div>`;
        }
      }
    )}

`;
  } while (!$$settled);
  $$unsubscribe_scenes();
  return $$rendered;
});
const Page_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: '.node-page.svelte-j7o2a0{position:absolute;box-sizing:border-box;width:2500px;height:7000px;background:var(--project-fill);background-image:url("../assets/blueprint.png");background-size:40px;overflow:hidden;cursor:grab;border:dashed 2px var(--drag-fill)}.connections-container.svelte-j7o2a0{width:100%;height:100%;pointer-events:none}.minimap-container.svelte-j7o2a0{position:absolute;border:solid 3px var(--project-stroke);;;background:var(--project-fill-light);right:10px;top:10px;width:125px;height:350px;z-index:2;cursor:pointer}.minimap-rect.svelte-j7o2a0{fill:var(--scene-fill)}',
  map: null
};
const Page$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let keys;
  let $scenes, $$unsubscribe_scenes;
  let $$unsubscribe_getSceneKey;
  let $$unsubscribe_getOptionsKey;
  $$unsubscribe_scenes = subscribe(scenes, (value) => $scenes = value);
  $$unsubscribe_getSceneKey = subscribe(getSceneKey, (value) => value);
  $$unsubscribe_getOptionsKey = subscribe(getOptionsKey, (value) => value);
  let { showNewScene } = $$props;
  let movingNode;
  let pageMouse = {};
  const pageDisplacement = { x: 0, y: 0 };
  if ($$props.showNewScene === void 0 && $$bindings.showNewScene && showNewScene !== void 0)
    $$bindings.showNewScene(showNewScene);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    keys = Object.keys($scenes);
    $$rendered = `<div class="${"node-page svelte-j7o2a0"}">${each(keys, (key) => {
      return `<div class="${"scene-node-container-div"}"${add_attribute("key", key, 0)}>${validate_component(SceneNode, "SceneNode").$$render(
        $$result,
        { key, movingNode },
        {
          movingNode: ($$value) => {
            movingNode = $$value;
            $$settled = false;
          }
        },
        {}
      )}
    </div>`;
    })}
  <svg class="${"connections-container svelte-j7o2a0"}">${each(keys, (key) => {
      return `${validate_component(Connections, "Connections").$$render($$result, { key, pageMouse, movingNode }, {}, {})}`;
    })}</svg>

  ${showNewScene ? `${validate_component(NewScene, "NewScene").$$render(
      $$result,
      { offset: pageDisplacement, showNewScene },
      {
        showNewScene: ($$value) => {
          showNewScene = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div>
<div class="${"minimap-container svelte-j7o2a0"}">${``}
</div>`;
  } while (!$$settled);
  $$unsubscribe_scenes();
  $$unsubscribe_getSceneKey();
  $$unsubscribe_getOptionsKey();
  return $$rendered;
});
const MainWindow_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".main-window-container.svelte-1sigivs{width:100%}.static-page-container.svelte-1sigivs{width:100%;height:740px}.page-container.svelte-1sigivs{box-sizing:border-box;width:100%;height:100%;border:solid var(--project-stroke);border-width:3px;margin:auto;position:relative;overflow:hidden}.test-story-container.svelte-1sigivs{min-width:600px}",
  map: null
};
const MainWindow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_scenes;
  let $$unsubscribe_a;
  $$unsubscribe_scenes = subscribe(scenes, (value) => value);
  $$unsubscribe_a = subscribe(a, (value) => value);
  let showNewScene = false;
  let showTest = false;
  let testPos = { x: 40, y: 40 };
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"main-window-container svelte-1sigivs"}">${validate_component(Toolbar, "Toolbar").$$render(
      $$result,
      { showNewScene, showTest },
      {
        showNewScene: ($$value) => {
          showNewScene = $$value;
          $$settled = false;
        },
        showTest: ($$value) => {
          showTest = $$value;
          $$settled = false;
        }
      },
      {}
    )}
  <div class="${"static-page-container svelte-1sigivs"}"><div class="${"page-container svelte-1sigivs"}">${validate_component(Page$1, "Page").$$render(
      $$result,
      { showNewScene },
      {
        showNewScene: ($$value) => {
          showNewScene = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>
  ${showTest ? `${validate_component(DragGui, "DragGui").$$render($$result, { pos: testPos }, {}, {
      default: () => {
        return `${validate_component(TopBar, "TopBar").$$render(
          $$result,
          { toggle: showTest },
          {
            toggle: ($$value) => {
              showTest = $$value;
              $$settled = false;
            }
          },
          {}
        )}
      <div class="${"test-story-container svelte-1sigivs"}" id="${"test-story-container"}"></div>`;
      }
    })}` : ``}
</div>`;
  } while (!$$settled);
  $$unsubscribe_scenes();
  $$unsubscribe_a();
  return $$rendered;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".main-title.svelte-18pgm1v{display:flex;justify-content:space-between;align-items:center;padding:1em;border-radius:5px;border:1px solid var(--project-stroke)}h1.svelte-18pgm1v{margin:0px;padding:0em 0em;color:var(--project-stroke);font-size:1.5em;text-align:center}span.svelte-18pgm1v{text-align:center;color:var(--project-stroke)}a.svelte-18pgm1v{color:var(--project-stroke)}footer.svelte-18pgm1v{text-align:center;font-size:12px;padding:10px 0px;color:var(--project-stroke)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="${"general no-select"}"><div class="${"main-title svelte-18pgm1v"}"><h1 class="${"svelte-18pgm1v"}">Aventura interactiva</h1>
    <span class="${"svelte-18pgm1v"}">Un editor de historias interactivas para la librería <a href="${"https://github.com/srsergiorodriguez/aventura/blob/master/README_es.md"}" target="${"_blank"}" rel="${"noreferrer"}" class="${"svelte-18pgm1v"}">Aventura.js</a></span></div>
  
  ${validate_component(MainWindow, "MainWindow").$$render($$result, {}, {}, {})}
  <footer class="${"no-select svelte-18pgm1v"}">Sergio Rodríguez Gómez — 2023 — v1.0.0</footer>
</section>`;
});
export {
  Page as default
};
