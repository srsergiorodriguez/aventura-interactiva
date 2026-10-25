// @ts-check

import { createPresentation } from '../domain/presentation.js';
import { escapeStyle } from './escape.js';

/**
 * @param {unknown} value
 * @param {number} fallback
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

/**
 * @param {unknown} value
 * @param {string} fallback
 * @returns {string}
 */
function hexColor(value, fallback) {
  return typeof value === 'string' && /^#[0-9a-f]{3,8}$/i.test(value)
    ? value
    : fallback;
}

/**
 * Build the page-level CSS that sits on top of Aventura's default story CSS. This
 * is the only stylesheet used by preview and export.
 *
 * @param {import('../domain/presentation.js').Presentation} presentation
 * @returns {string}
 */
export function buildStoryCSS(presentation) {
  const p = createPresentation(presentation);
  const width = clampNumber(p.layout.maxWidth, 600, 320, 1200);
  const padding = clampNumber(p.layout.padding, 32, 0, 200);
  const fontSize = clampNumber(p.typography.size, 1.1, 0.8, 2);
  const lineHeight = clampNumber(p.typography.lineHeight, 1.5, 1, 2.5);
  const align = p.typography.align === 'center' ? 'center' : 'left';
  const vertical =
    p.layout.verticalAlign === 'top' ? 'flex-start' : 'center';
  const buttons = p.buttons.layout === 'stack' ? 'stack' : 'inline';
  const imageBorder = p.image.frame ? '2px solid var(--av-text)' : 'none';
  const background = hexColor(p.colors.background, '#ffffff');
  const text = hexColor(p.colors.text, '#000000');

  return `
/* Page shell. Aventura styles .storygeneraldiv; this wrapper owns the page. */
html, body {
  margin: 0;
  min-height: 100%;
}

body {
  background: ${background};
  color: ${text};
}

.story-page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${vertical};
  gap: 1.5rem;
  width: 100%;
  min-height: 100vh;
  padding: ${padding}px;
}

.story-page[data-scroll="true"] {
  justify-content: flex-start;
}

.story-page > #storygeneraldiv {
  width: 100%;
  max-width: ${width}px;
  margin: 0;
  padding: 0;
  background: transparent;
}

#story-root .storyp {
  font-size: ${fontSize}em;
  line-height: ${lineHeight};
  text-align: ${align};
}

#story-root .storybutton-container {
  display: flex;
  flex-direction: ${buttons === 'stack' ? 'column' : 'row'};
  flex-wrap: wrap;
  align-items: ${buttons === 'stack' ? 'stretch' : 'center'};
  gap: 0.5rem;
}

#story-root .storybutton {
  margin: 0;
}

.story-page[data-buttons="stack"] .storybutton {
  width: 100%;
}

#story-root .storyimage-container {
  border: ${imageBorder};
}

${escapeStyle(p.customCSS)}
`.trim();
}
