import * as universal from '../entries/pages/_layout.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/entry/_layout.svelte.bf8aa09e.js","_app/immutable/chunks/index.4d86df2e.js","_app/immutable/entry/_layout.js.984db11e.js","_app/immutable/chunks/_layout.da46b06b.js"];
export const stylesheets = ["_app/immutable/assets/_layout.f41f79f1.css"];
export const fonts = [];
