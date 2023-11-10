import { c as create_ssr_component } from "../../chunks/index2.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ':root{--project-stroke:black;--project-fill:#41535b;--project-fill-light:#6a8e9e;--input-stroke:#0084ff;--scene-stroke:#ff373a;--area-stroke:#ffb300;--scene-fill:#fff1da;--drag-stroke:black;--drag-fill:#bbd6e2;--btn-hover:#88a4ae;--btn-active:#536a74;--main-font:"Arial", Sans-Serif;font-family:var(--main-font)}.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.x-button{background:none;border:none;cursor:pointer;border-radius:1em;max-width:2em;max-height:2em}.x-button:hover{background:var(--btn-hover)}.x-button:active{background:var(--btn-active)}body{background:var(--project-fill-light)}button, label, textarea{font-family:var(--main-font)}.gui-button{background:white;border-radius:4px;border:solid 1px var(--drag-stroke);cursor:pointer}button:hover{background:var(--btn-hover)}button:active{background:var(--btn-active)}.gui-button:hover{background:var(--btn-hover)}.gui-button:active{background:var(--btn-active)}.bar{display:flex;justify-content:right}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-eoco9y_START --><style>@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;500;700&display=swap");
  </style><!-- HEAD_svelte-eoco9y_END -->`, ""}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
