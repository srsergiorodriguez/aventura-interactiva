import { n as noop, a as safe_not_equal, c as create_ssr_component, b as subscribe, v as validate_component, e as escape, d as add_attribute, f as each } from "../../_app/immutable/chunks/index-86d6ae29.js";
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const scenes = writable({
  inicio: {
    texto: "\xC9rase una vez un c\xEDrculo...",
    display: {
      ops: [],
      areas: [],
      x: 40,
      y: 40
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
      ops: [],
      areas: [],
      x: 40,
      y: 250
    }
  },
  final2: {
    texto: "Parece que la historia form\xF3 una elipsis",
    sinSalida: true,
    display: {
      ops: [],
      areas: [],
      x: 220,
      y: 250
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
const DragGui_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".draggui.svelte-1r8lyx3{box-sizing:border-box;display:grid;grid-gap:10px;position:absolute;padding:10px;border:solid 3px var(--drag-stroke);border-radius:10px;background:var(--drag-fill);z-index:2}",
  map: null
};
const DragGui = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pos } = $$props;
  let { displace = { x: pos.x, y: pos.y } } = $$props;
  if ($$props.pos === void 0 && $$bindings.pos && pos !== void 0)
    $$bindings.pos(pos);
  if ($$props.displace === void 0 && $$bindings.displace && displace !== void 0)
    $$bindings.displace(displace);
  $$result.css.add(css$8);
  return `<div class="${"draggui svelte-1r8lyx3"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
const TopBar_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".top-bar.svelte-15bdkib{display:flex;justify-content:right}",
  map: null
};
const TopBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toggle } = $$props;
  if ($$props.toggle === void 0 && $$bindings.toggle && toggle !== void 0)
    $$bindings.toggle(toggle);
  $$result.css.add(css$7);
  return `<div class="${"top-bar svelte-15bdkib"}"><button class="${"x-button"}">X</button>
</div>`;
});
const ImgUpload_svelte_svelte_type_style_lang = "";
const Editor_svelte_svelte_type_style_lang = "";
const NewOutput_svelte_svelte_type_style_lang = "";
const DragNode_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".scene-node-container.svelte-14kdql5{padding:10px 5px;border:solid 2px var(--scene-stroke);border-radius:10px;background:var(--scene-fill);cursor:move;position:absolute;user-select:none;display:grid;grid-gap:5px}",
  map: null
};
const DragNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $scenes, $$unsubscribe_scenes;
  $$unsubscribe_scenes = subscribe(scenes, (value) => $scenes = value);
  let { key } = $$props;
  let { movingNode = false } = $$props;
  let scene = $scenes[key];
  if (scene.display === void 0) {
    scene.display = { x: 0, y: 0, ops: [] };
  }
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.movingNode === void 0 && $$bindings.movingNode && movingNode !== void 0)
    $$bindings.movingNode(movingNode);
  $$result.css.add(css$6);
  {
    {
      scene = $scenes[key];
    }
  }
  $$unsubscribe_scenes();
  return `<div class="${"scene-node-container svelte-14kdql5"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
const NewArea_svelte_svelte_type_style_lang = "";
const SceneNode_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".node-btns.svelte-ank1gn.svelte-ank1gn{display:flex;justify-content:space-around;gap:10px;border-top:1px black solid}.node-btns-div.svelte-ank1gn.svelte-ank1gn{display:flex;justify-content:center}.btns-name.svelte-ank1gn.svelte-ank1gn{font-size:10px;text-align:left}.node-btns.svelte-ank1gn button.svelte-ank1gn{background:white;border-radius:4px;border:solid 1px var(--scene-stroke);cursor:pointer}.node-btns.svelte-ank1gn button.svelte-ank1gn:hover{background:lightgray}.connection.svelte-ank1gn.svelte-ank1gn{margin:auto;width:10px;height:10px;cursor:pointer;border-radius:10px;background:var(--input-stroke)}.area-connection.svelte-ank1gn.svelte-ank1gn{background:var(--area-stroke)}.option-connection.svelte-ank1gn.svelte-ank1gn{background:var(--scene-stroke)}.input.svelte-ank1gn.svelte-ank1gn{position:absolute;left:0%;top:0px}.node-outputs.svelte-ank1gn.svelte-ank1gn{display:flex;justify-content:left;align-items:center;gap:3px}.output-container.svelte-ank1gn.svelte-ank1gn{padding:1px}.output-text.svelte-ank1gn.svelte-ank1gn{font-size:12px;min-width:15px}.output.svelte-ank1gn.svelte-ank1gn{position:absolute;bottom:-5px}h1.svelte-ank1gn.svelte-ank1gn{margin:0px;padding:0px;font-size:16px;text-align:center}.p-container.svelte-ank1gn.svelte-ank1gn{display:flex;justify-content:center}.text-p.svelte-ank1gn.svelte-ank1gn{max-width:300px;font-size:12px;padding:0px;margin:0px}.img-preview-container.svelte-ank1gn.svelte-ank1gn{max-width:100px;margin:auto}.img-preview.svelte-ank1gn.svelte-ank1gn{max-width:100%;pointer-events:none}",
  map: null
};
const SceneNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $scenes, $$unsubscribe_scenes;
  let $$unsubscribe_getSceneKey;
  let $getOptionsKey, $$unsubscribe_getOptionsKey;
  let $getTextKey, $$unsubscribe_getTextKey;
  let $getImgKey, $$unsubscribe_getImgKey;
  $$unsubscribe_scenes = subscribe(scenes, (value) => $scenes = value);
  $$unsubscribe_getSceneKey = subscribe(getSceneKey, (value) => value);
  $$unsubscribe_getOptionsKey = subscribe(getOptionsKey, (value) => $getOptionsKey = value);
  $$unsubscribe_getTextKey = subscribe(getTextKey, (value) => $getTextKey = value);
  $$unsubscribe_getImgKey = subscribe(getImgKey, (value) => $getImgKey = value);
  let { key } = $$props;
  let { movingNode = false } = $$props;
  let scene = $scenes[key];
  const optionsKey = $getOptionsKey(scene);
  const imgKey = $getImgKey(scene);
  const textKey = $getTextKey(scene);
  let nodeOutputs;
  if (scene.display === void 0) {
    scene.display = { x: 0, y: 0, ops: [], areas: [] };
  }
  if (scene.display.areas === void 0) {
    scene.display.areas = [];
  }
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.movingNode === void 0 && $$bindings.movingNode && movingNode !== void 0)
    $$bindings.movingNode(movingNode);
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
      { key, movingNode },
      {
        movingNode: ($$value) => {
          movingNode = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="${"connection input svelte-ank1gn"}"></div>
  <h1 class="${"svelte-ank1gn"}">Escena: ${escape(key)}</h1>
  ${scene[imgKey] !== void 0 && scene[imgKey] !== null ? `<div class="${"img-preview-container svelte-ank1gn"}"><img${add_attribute("src", scene[imgKey], 0)} alt="${"Preview"}" class="${"img-preview svelte-ank1gn"}"></div>` : ``}
  <div class="${"p-container svelte-ank1gn"}"><p class="${"text-p svelte-ank1gn"}">${escape(scene[textKey].length < 210 ? scene[textKey] : scene[textKey].slice(0, 210) + "...")}</p></div>
  <div class="${"node-btns svelte-ank1gn"}"><div><span class="${"btns-name svelte-ank1gn"}">escena</span>
      <div class="${"node-btns-div svelte-ank1gn"}"><button class="${"svelte-ank1gn"}">editar</button>
        <button class="${"svelte-ank1gn"}">x</button></div></div>
    <div><span class="${"btns-name svelte-ank1gn"}">btn</span>
      <div class="${"node-btns-div svelte-ank1gn"}"><button class="${"svelte-ank1gn"}">-</button>
        <button class="${"svelte-ank1gn"}">+</button></div></div>
    ${scene[imgKey] !== void 0 && scene[imgKey] !== null ? `<div><span class="${"btns-name svelte-ank1gn"}">\xE1rea</span>
        <div class="${"node-btns-div svelte-ank1gn"}"><button class="${"svelte-ank1gn"}">-</button>
          <button class="${"svelte-ank1gn"}">+</button></div></div>` : ``}</div>
  <div class="${"node-outputs svelte-ank1gn"}"${add_attribute("this", nodeOutputs, 0)}>${each(scene[optionsKey] || [], (op, i) => {
            return `<div class="${"output-container svelte-ank1gn"}"><input type="${"text"}" class="${"output-text svelte-ank1gn"}"${add_attribute("value", op.btn, 0)}${add_attribute("i", i, 0)}>
        <div type="${"ops"}" class="${"connection output option-connection svelte-ank1gn"}"${add_attribute("i", i, 0)}></div>
      </div>`;
          })}
    ${each(scene.areas || [], (a2, i) => {
            return `<div class="${"output-container svelte-ank1gn"}"><span class="${"output-text svelte-ank1gn"}">${escape(a2.name)}</span>
        <div type="${"areas"}" class="${"connection output area-connection svelte-ank1gn"}"${add_attribute("i", i, 0)}></div>
      </div>`;
          })}</div>`;
        }
      }
    )}
${``}
${``}
${``}`;
  } while (!$$settled);
  $$unsubscribe_scenes();
  $$unsubscribe_getSceneKey();
  $$unsubscribe_getOptionsKey();
  $$unsubscribe_getTextKey();
  $$unsubscribe_getImgKey();
  return $$rendered;
});
const Connections_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".op-connection.svelte-1lsc27u{stroke:var(--scene-stroke);stroke-width:3px}.a-connection.svelte-1lsc27u{stroke:var(--area-stroke);stroke-width:3px}",
  map: null
};
const Connections = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let opCoords;
  let aCoords;
  let $scenes, $$unsubscribe_scenes;
  $$unsubscribe_scenes = subscribe(scenes, (value) => $scenes = value);
  let { key } = $$props;
  let { mouse } = $$props;
  let scene = $scenes[key];
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.mouse === void 0 && $$bindings.mouse && mouse !== void 0)
    $$bindings.mouse(mouse);
  $$result.css.add(css$4);
  {
    {
      scene = $scenes[key];
    }
  }
  opCoords = (scene.options || scene.opciones || []).map((s, i) => {
    const toScene = s.escena || s.scene;
    if (toScene === void 0) {
      if (scene.display.ops[i].rewiring) {
        return mouse;
      } else {
        return scene.display;
      }
    } else {
      return $scenes[toScene].display;
    }
  });
  aCoords = (scene.areas || []).map((s, i) => {
    const toScene = s.escena || s.scene;
    if (toScene === void 0) {
      if (scene.display.areas[i].rewiring) {
        return mouse;
      } else {
        return scene.display;
      }
    } else {
      return $scenes[toScene].display;
    }
  });
  $$unsubscribe_scenes();
  return `<g>${each(scene.display.ops || [], (op, i) => {
    return `<line class="${"op-connection svelte-1lsc27u"}"${add_attribute("x1", scene.display.x + op.x + 7, 0)}${add_attribute("y1", scene.display.y + op.y + 10, 0)}${add_attribute("x2", opCoords[i].x + 5, 0)}${add_attribute("y2", opCoords[i].y + 5, 0)}></line>`;
  })}${each(scene.display.areas || [], (op, i) => {
    return `<line class="${"a-connection svelte-1lsc27u"}"${add_attribute("x1", scene.display.x + op.x + 7, 0)}${add_attribute("y1", scene.display.y + op.y + 10, 0)}${add_attribute("x2", aCoords[i].x + 5, 0)}${add_attribute("y2", aCoords[i].y + 5, 0)}></line>`;
  })}</g>`;
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
  <div class="${"bar svelte-1bhrmvp"}"><button>Aceptar</button></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_scenes();
  return $$rendered;
});
const Page_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: '.node-page.svelte-1e9gr7d{position:absolute;box-sizing:border-box;width:2000px;height:5000px;background:var(--project-fill);background-image:url("../assets/blueprint.png");background-size:40px;overflow:hidden;cursor:grab;border:dashed 2px var(--drag-fill);;}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_scenes;
  let $$unsubscribe_getSceneKey;
  let $$unsubscribe_getOptionsKey;
  $$unsubscribe_scenes = subscribe(scenes, (value) => value);
  $$unsubscribe_getSceneKey = subscribe(getSceneKey, (value) => value);
  $$unsubscribe_getOptionsKey = subscribe(getOptionsKey, (value) => value);
  let { movingNode } = $$props;
  let { mouse } = $$props;
  let { showNewScene } = $$props;
  const displace = { x: 0, y: 0 };
  if ($$props.movingNode === void 0 && $$bindings.movingNode && movingNode !== void 0)
    $$bindings.movingNode(movingNode);
  if ($$props.mouse === void 0 && $$bindings.mouse && mouse !== void 0)
    $$bindings.mouse(mouse);
  if ($$props.showNewScene === void 0 && $$bindings.showNewScene && showNewScene !== void 0)
    $$bindings.showNewScene(showNewScene);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"node-page svelte-1e9gr7d"}">${slots.default ? slots.default({}) : ``}
  ${showNewScene ? `${validate_component(NewScene, "NewScene").$$render(
      $$result,
      { offset: displace, showNewScene },
      {
        showNewScene: ($$value) => {
          showNewScene = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}
</div>`;
  } while (!$$settled);
  $$unsubscribe_scenes();
  $$unsubscribe_getSceneKey();
  $$unsubscribe_getOptionsKey();
  return $$rendered;
});
class Aventura {
  constructor(lang = "en", options) {
    this.lang = lang === "en" || lang === "es" ? lang : "en";
    this.options = {
      typewriterSpeed: 50,
      defaultCSS: true,
      adventureContainer: void 0,
      adventureScroll: false,
      igramaFormat: "png",
      minigifOptions: {},
      sceneCallback: (s) => {
        return s;
      }
    };
    if (options) {
      this.options = Object.assign(this.options, options);
    }
    this.grammarError = false;
    this.scenesError = false;
    this.fijarGramatica = this.setGrammar;
    this.expandirGramatica = this.expandGrammar;
    this.probarGramatica = this.testGrammar;
    this.fijarEscenas = this.setScenes;
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
  setMarkov(model) {
    this.markov = model;
    return this;
  }
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
        const ruleArray = rule.search(/[.]/) > -1 ? this.getNestedObject(grammar, rule.match(/[\w\d]+/g)) : grammar[rule];
        if (!ruleArray) {
          const errorMsg = this.lang === "es" ? `Se intent\xF3 expandir desde la regla "${rule}", pero no se pudo encontrar` : `Tried to expand from rule "${rule}", but couldn't find it`;
          console.error(errorMsg);
        }
        const preTransformed = this.selectGrammarRule(ruleArray);
        return this.transformString(preTransformed, transformations);
      });
    }
    return this.grammarRuleRecursion(newstring, grammar);
  }
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
              const errorMsg = this.lang === "es" ? `Se intent\xF3 crear la nueva regla "${symbol}", pero no se pudo encontrar "${p.value}" para producir la subregla "${p.key}"` : `Tried to create new rule: "${symbol}", but couldn't find "${p.value}" to produce "${p.key}" subrule`;
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
  startAdventure(start) {
    if (this.options.defaultCSS) {
      this.setCSS();
    }
    const generaldiv = document.createElement("div");
    generaldiv.id = "storygeneraldiv";
    const parent = this.options.adventureContainer !== void 0 ? document.getElementById(this.options.adventureContainer) : document.body;
    parent.appendChild(generaldiv);
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
    const paragraph_container = document.createElement("div");
    paragraph_container.className = "storyp-container";
    if (scene.text || scene.texto || scene.igramaText) {
      storydiv.appendChild(paragraph_container);
    }
    const paragraph = document.createElement("p");
    paragraph.className = "storyp";
    paragraph.innerHTML = "";
    paragraph_container.appendChild(paragraph);
    document.getElementById("storygeneraldiv").scrollIntoView({ behavior: "smooth", block: "end" });
    this.typewriter(paragraph, scene);
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
      area.innerHTML = a2.btn || "";
      parent.appendChild(area);
      area.style.fontSize = `${18 * dims.height / imgSource.naturalHeight}px`;
      area.onclick = () => {
        const e = a2.scene || a2.escena;
        this.goToScene(this.scenes[e]);
      };
      if (a2.tooltip !== void 0) {
        area.onmouseover = () => {
          area.innerHTML = a2.tooltip || "";
          area.style.zIndex = "100";
        };
        area.onmouseout = () => {
          area.innerHTML = a2.btn || "";
          area.style.zIndex = "0";
        };
      }
    }
  }
  typewriter(paragraph, scene) {
    const textContent = scene.text || scene.texto || scene.igramaText || "";
    let text = this.grammar ? this.grammarRuleRecursion(textContent) : textContent;
    text = text.replace(/\n/g, "<br>");
    if (this.options.typewriterSpeed > 0) {
      let i = 0;
      const interval = setInterval(() => {
        const textpart = text.substring(0, i);
        paragraph.innerHTML = textpart;
        i++;
        if (i > text.length) {
          clearInterval(interval);
          this.optionButtons(scene);
        }
      }, Math.floor(this.options.typewriterSpeed));
    } else {
      paragraph.innerHTML = text;
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
        optionButton.innerHTML = option.btn;
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
      continueButton.innerHTML = this.lang === "en" ? "Continue" : "Continuar";
      btns_container.appendChild(continueButton);
      continueButton.addEventListener("click", () => {
        this.goToScene(this.scenes[nextScene]);
      });
    }
    document.getElementById("storygeneraldiv").scrollIntoView({ behavior: "smooth", block: "end" });
  }
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
      const errorMsg = this.lang === "es" ? `Las siguientes escenas no llevan a ning\xFAn lado: ${deadEnds.join(", ")}` : `The following scenes are dead ends: ${deadEnds.join(", ")}`;
      console.error(errorMsg);
      this.scenesError = true;
    }
    return this;
  }
  testGrammar(grammar) {
    const testGrammar = grammar || this.grammar;
    if (!testGrammar) {
      const errorMsg = this.lang === "es" ? "No hay gram\xE1tica para probar" : "There is not grammar to test";
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
        console.error(this.lang === "es" ? "Para crear Gifs debes tener tambi\xE9n la librer\xEDa MiniGif" : "To create Gifs you must have also the MiniGif library");
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
  setCSS() {
    const css2 = document.createElement("style");
    css2.id = "adventurestyle";
    css2.innerHTML = defaultStyling;
    document.getElementsByTagName("head")[0].appendChild(css2);
  }
}
const defaultStyling = `#storygeneraldiv {
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
const a = readable(Aventura);
const DesignWindow_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".toolbar.svelte-1htln5w.svelte-1htln5w{margin:4px 0px;display:flex;justify-content:space-between}.toolbar-button.svelte-1htln5w.svelte-1htln5w{font-size:16px;border:solid 1px black;background:white;padding:5px;cursor:pointer;text-align:center}.toolbar-button.svelte-1htln5w.svelte-1htln5w:hover{background:lightgray}.toolbar-button.svelte-1htln5w.svelte-1htln5w{border:var(--project-stroke) solid 2px;color:var(--project-stroke);background:var(--drag-fill);border-radius:5px}.scene-toolbar.svelte-1htln5w button.svelte-1htln5w{background:var(--scene-stroke);border:var(--scene-fill) solid 2px;color:var(--scene-fill);border-radius:5px}.design-window-container.svelte-1htln5w.svelte-1htln5w{width:100%}.static-page-container.svelte-1htln5w.svelte-1htln5w{width:100%;height:800px}.page-container.svelte-1htln5w.svelte-1htln5w{box-sizing:border-box;width:100%;height:100%;border:solid 3px rgb(107, 107, 107);margin:auto;position:relative;overflow:hidden}.connections-container.svelte-1htln5w.svelte-1htln5w{width:100%;height:100%;pointer-events:none}.test-story-container.svelte-1htln5w.svelte-1htln5w{width:700px}",
  map: null
};
const DesignWindow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mouse;
  let keys;
  let $$unsubscribe_saveHTML;
  let $$unsubscribe_generateInteractive;
  let $scenes, $$unsubscribe_scenes;
  let $$unsubscribe_a;
  let $$unsubscribe_saveJSON;
  $$unsubscribe_saveHTML = subscribe(saveHTML, (value) => value);
  $$unsubscribe_generateInteractive = subscribe(generateInteractive, (value) => value);
  $$unsubscribe_scenes = subscribe(scenes, (value) => $scenes = value);
  $$unsubscribe_a = subscribe(a, (value) => value);
  $$unsubscribe_saveJSON = subscribe(saveJSON, (value) => value);
  let movingNode = false;
  let showNewScene = false;
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    mouse = { x: 0, y: 0 };
    keys = Object.keys($scenes);
    $$rendered = `<input type="${"file"}" id="${"load-input"}" hidden>
<div class="${"design-window-container svelte-1htln5w"}"><div class="${"toolbar svelte-1htln5w"}"><div class="${"project-toolbar"}"><button class="${"toolbar-button svelte-1htln5w"}">Nuevo proyecto</button>
      <label class="${"toolbar-button svelte-1htln5w"}" for="${"load-input"}">Importar</label>
      <button class="${"toolbar-button svelte-1htln5w"}">Exportar</button>
      <button class="${"toolbar-button svelte-1htln5w"}">Previsualizar</button>
      <button class="${"toolbar-button svelte-1htln5w"}">Generar interactivo final</button></div>
    <div class="${"scene-toolbar svelte-1htln5w"}"><button class="${"toolbar-button svelte-1htln5w"}">Nueva escena</button></div></div>
  <div class="${"static-page-container svelte-1htln5w"}"><div class="${"page-container svelte-1htln5w"}">${validate_component(Page, "Page").$$render(
      $$result,
      { movingNode, showNewScene, mouse },
      {
        showNewScene: ($$value) => {
          showNewScene = $$value;
          $$settled = false;
        },
        mouse: ($$value) => {
          mouse = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ offset }) => {
          return `${each(keys, (key) => {
            return `<div class="${"scene-node-container"}">${validate_component(SceneNode, "SceneNode").$$render(
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
        <svg class="${"connections-container svelte-1htln5w"}">${each(keys, (key) => {
            return `${validate_component(Connections, "Connections").$$render($$result, { key, mouse }, {}, {})}`;
          })}</svg>`;
        }
      }
    )}</div></div></div>
${``}`;
  } while (!$$settled);
  $$unsubscribe_saveHTML();
  $$unsubscribe_generateInteractive();
  $$unsubscribe_scenes();
  $$unsubscribe_a();
  $$unsubscribe_saveJSON();
  return $$rendered;
});
const index_svelte_svelte_type_style_lang = "";
const css = {
  code: ':root{--project-stroke:black;--project-fill:#41535b;--project-fill-light:#74838a;--input-stroke:#004cff;--scene-stroke:#ff373a;--area-stroke:#ffb300;--scene-fill:#fff1da;--drag-stroke:rgb(21, 182, 226);--drag-fill:rgb(224, 253, 252)}.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.x-button{background:none;border:none;padding:5px;cursor:pointer}body{background:rgb(49, 49, 49)}.svelte-1fid4at{font-family:"Helvetica", Sans-Serif}h1.svelte-1fid4at{margin:0px;padding:10px;color:black;background:var(--drag-fill);font-size:20px;text-align:center}footer.svelte-1fid4at{text-align:center;font-size:12px;padding:10px 0px;color:var(--drag-fill)}',
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="${"general no-select svelte-1fid4at"}"><h1 class="${"svelte-1fid4at"}">Aventura interactiva (beta)</h1>
  ${validate_component(DesignWindow, "DesignWindow").$$render($$result, {}, {}, {})}
  <footer class="${"no-select svelte-1fid4at"}">Sergio Rodr\xEDguez G\xF3mez \u2014 2022 \u2014 v0.0.2b</footer>
</section>`;
});
export {
  Routes as default
};
