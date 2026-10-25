// @ts-check

import { isPlainObject } from './errors.js';

export const FONT_STACKS = Object.freeze({
  mono: '"Inconsolata", ui-monospace, "Courier New", monospace',
  book: '"EB Garamond", Georgia, "Times New Roman", serif',
  sans: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  grotesk: '"Space Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
  humanist: '"Source Sans 3", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  rounded: '"Nunito", "Avenir Next", Avenir, "Trebuchet MS", sans-serif',
  typewriter: '"Courier Prime", "Courier New", Courier, monospace',
  palatino: '"Crimson Pro", "Palatino Linotype", "Book Antiqua", Palatino, serif',
  school: '"Patrick Hand", "Comic Sans MS", "Chalkboard SE", cursive',
});

/**
 * @typedef {Object} PresentationColors
 * @property {string} background
 * @property {string} text
 * @property {string} accentBackground
 * @property {string} accentText
 * @property {string} buttonBackground
 * @property {string} buttonText
 * @property {string} buttonHoverBackground
 * @property {string} buttonHoverText
 */

/**
 * @typedef {Object} PresentationTypography
 * @property {string} font
 * @property {number} size
 * @property {number} lineHeight
 * @property {'left'|'center'} align
 */

/**
 * @typedef {Object} PresentationLayout
 * @property {number} maxWidth
 * @property {number} padding
 * @property {'top'|'center'} verticalAlign
 */

/**
 * @typedef {Object} PresentationShape
 * @property {string} buttonBorder
 * @property {string} containerBorder
 * @property {string} borderRadius
 */

/**
 * @typedef {Object} Presentation
 * @property {string} presetId
 * @property {PresentationColors} colors
 * @property {PresentationTypography} typography
 * @property {PresentationLayout} layout
 * @property {{ layout: 'inline'|'stack' }} buttons
 * @property {{ frame: boolean }} image
 * @property {PresentationShape} shape
 * @property {string} customCSS
 */

/**
 * Presentation is app data. It maps to Aventura's theme and to the extra page CSS
 * built by export/presentation-css.js.
 *
 * @type {Readonly<Presentation>}
 */
export const DEFAULT_PRESENTATION = Object.freeze({
  presetId: 'papel',
  colors: Object.freeze({
    background: '#ffffff',
    text: '#000000',
    accentBackground: '#00bfff',
    accentText: '#000000',
    buttonBackground: '#ffd23f',
    buttonText: '#000000',
    buttonHoverBackground: '#000000',
    buttonHoverText: '#ffffff',
  }),
  typography: Object.freeze({
    font: 'mono',
    size: 1.1,
    lineHeight: 1.5,
    align: 'left',
  }),
  layout: Object.freeze({
    maxWidth: 600,
    padding: 32,
    verticalAlign: 'center',
  }),
  buttons: Object.freeze({
    layout: 'inline',
  }),
  image: Object.freeze({
    frame: true,
  }),
  shape: Object.freeze({
    buttonBorder: '2px solid #000000',
    containerBorder: 'none',
    borderRadius: '0px',
  }),
  customCSS: '',
});

/**
 * Curated color schemes. Each has one background and four paint/UI colors:
 * background, ink, accent, support, highlight. Layout, typography, and custom CSS
 * are preserved when a scheme is applied.
 *
 * @typedef {Object} PresentationPreset
 * @property {string} labelKey
 * @property {string[]} palette
 */

/** @type {Record<string, PresentationPreset>} */
export const PRESENTATION_PRESETS = Object.freeze({
  papel: {
    labelKey: 'preset_papel',
    palette: ['#ffffff', '#000000', '#00bfff', '#ffd23f', '#ff5252'],
  },
  fosforo: {
    labelKey: 'preset_fosforo',
    palette: ['#07130b', '#b8f5a6', '#2f6b3a', '#eaffdf', '#6ee7b7'],
  },
  cianotipo: {
    labelKey: 'preset_cianotipo',
    palette: ['#0a2a43', '#e6f6ff', '#59c2ff', '#ffd166', '#ff6b6b'],
  },
  pulpa: {
    labelKey: 'preset_pulpa',
    palette: ['#f3e7d3', '#2a1a12', '#b8431f', '#e8b07a', '#7a8f5a'],
  },
  noche: {
    labelKey: 'preset_noche',
    palette: ['#121212', '#f2f2f2', '#ffcc00', '#ff6b9d', '#5bc0eb'],
  },
  menta: {
    labelKey: 'preset_menta',
    palette: ['#eafff4', '#073b2a', '#ff6b6b', '#6ee7b7', '#ffd166'],
  },
});

/**
 * Apply a preset while keeping the author's layout, image frame, button layout,
 * and custom CSS.
 *
 * @param {Presentation} presentation
 * @param {string} presetId
 * @returns {Presentation}
 */
export function withPresentationPreset(presentation, presetId) {
  const preset = PRESENTATION_PRESETS[presetId];
  const current = createPresentation(presentation);
  if (!preset) return current;

  return createPresentation({
    ...presentationWithPalette(current, preset.palette),
    presetId,
  });
}

/**
 * @param {string} presetId
 * @returns {string[]}
 */
export function paletteForPreset(presetId) {
  const preset = PRESENTATION_PRESETS[presetId];
  return preset ? [...preset.palette] : [...PRESENTATION_PRESETS.papel.palette];
}

/**
 * @param {string[]} colors
 * @returns {string}
 */
export function presetIdForPalette(colors) {
  if (!Array.isArray(colors) || colors.length < 5) return 'custom';
  for (const [id, preset] of Object.entries(PRESENTATION_PRESETS)) {
    if (preset.palette.every((color, index) => color === colors[index])) {
      return id;
    }
  }
  return 'custom';
}

/**
 * Pick black or white text for a colored surface.
 *
 * @param {string} hex
 * @returns {'#000000'|'#ffffff'}
 */
export function contrastText(hex) {
  const value = String(hex).replace('#', '');
  const full = value.length === 3
    ? value.split('').map((part) => part + part).join('')
    : value;
  const channels = [0, 2, 4].map((index) => parseInt(full.slice(index, index + 2), 16) / 255);
  const linear = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  const black = (luminance + 0.05) / 0.05;
  const white = 1.05 / (luminance + 0.05);
  return black >= white ? '#000000' : '#ffffff';
}

/**
 * Map the project's five-color palette to the story theme. The highlight is
 * drawing-only; story text on accent/button surfaces is chosen for contrast.
 *
 * @param {Presentation} presentation
 * @param {string[]} colors [background, ink, accent, support, highlight]
 * @returns {Presentation}
 */
export function presentationWithPalette(presentation, colors) {
  const current = createPresentation(presentation);
  if (!Array.isArray(colors) || colors.length < 5) return current;
  const [background, ink, accent, support] = colors;
  return createPresentation({
    ...current,
    presetId: 'custom',
    colors: {
      background,
      text: ink,
      accentBackground: accent,
      accentText: contrastText(accent),
      buttonBackground: support,
      buttonText: contrastText(support),
      buttonHoverBackground: ink,
      buttonHoverText: background,
    },
    shape: {
      ...current.shape,
      buttonBorder: `2px solid ${ink}`,
    },
  });
}

/**
 * @template {Record<string, any>} T
 * @param {unknown} value
 * @param {T} fallback
 * @returns {T}
 */
function mergeSection(value, fallback) {
  return /** @type {T} */ ({
    ...fallback,
    ...(isPlainObject(value) ? value : {}),
  });
}

/**
 * @param {unknown} input
 * @returns {Presentation}
 */
export function createPresentation(input = {}) {
  const source = isPlainObject(input) ? input : {};
  /** @type {Presentation} */
  const presentation = {
    ...DEFAULT_PRESENTATION,
    ...source,
    presetId:
      typeof source.presetId === 'string'
        ? source.presetId
        : DEFAULT_PRESENTATION.presetId,
    colors: mergeSection(source.colors, DEFAULT_PRESENTATION.colors),
    typography: mergeSection(source.typography, DEFAULT_PRESENTATION.typography),
    layout: mergeSection(source.layout, DEFAULT_PRESENTATION.layout),
    buttons: mergeSection(source.buttons, DEFAULT_PRESENTATION.buttons),
    image: mergeSection(source.image, DEFAULT_PRESENTATION.image),
    shape: mergeSection(source.shape, DEFAULT_PRESENTATION.shape),
    customCSS:
      typeof source.customCSS === 'string'
        ? source.customCSS
        : DEFAULT_PRESENTATION.customCSS,
  };

  return presentation;
}

/**
 * Map the app presentation model to Aventura's flat theme object.
 *
 * @param {Presentation} presentation
 */
export function presentationToEngineTheme(presentation) {
  const p = createPresentation(presentation);
  return {
    background: p.colors.background,
    text: p.colors.text,
    fontFamily:
      FONT_STACKS[/** @type {keyof typeof FONT_STACKS} */ (p.typography.font)] ||
      FONT_STACKS.mono,
    accentBackground: p.colors.accentBackground,
    accentText: p.colors.accentText,
    buttonBorder: p.shape.buttonBorder,
    borderRadius: p.shape.borderRadius,
    containerBorder: p.shape.containerBorder,
    buttonBg: p.colors.buttonBackground,
    buttonText: p.colors.buttonText,
    buttonHoverBg: p.colors.buttonHoverBackground,
    buttonHoverText: p.colors.buttonHoverText,
  };
}
