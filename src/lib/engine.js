// @ts-check

import Aventura from './aventura.esm.js';
import engineSource from './aventura.esm.js?raw';
import miniGifSource from './MiniGif.js?raw';

/**
 * The only place that knows where the story runtime comes from. Components and
 * the export builder must not import the vendored files directly.
 */
export { Aventura, engineSource, miniGifSource };
export const storySources = { engineSource, miniGifSource };
