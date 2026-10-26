// @ts-check

import { compileProject } from '../domain/compile.js';
import { DomainError } from '../domain/errors.js';
import { escapeHtml, jsonForScript } from './escape.js';
import { buildStoryCSS } from './presentation-css.js';
import { fontFaceCSS, fontLicenseNotice } from '../assets/fonts/font-data.js';
import { softwareLicenseNotice } from './software-licenses.js';

/** @typedef {import('../domain/project.js').Project} Project */

/**
 * @typedef {Object} StoryDocumentSources
 * @property {string} engineSource
 * @property {string} [miniGifSource]
 */

/**
 * MiniGif is authored as an ES module for the app but embedded as a plain class in
 * the classic part of the story document. Strip its export statement.
 *
 * @param {string} source
 * @returns {string}
 */
function stripMiniGifExport(source) {
  return source.replace(/\r?\nexport\s*\{\s*MiniGif\s*\};?\s*$/u, '');
}

/**
 * The Aventura bundle is also embedded as a classic IIFE so an exported HTML file
 * works when opened directly from disk, without depending on file:// module rules.
 *
 * @param {string} source
 * @returns {string}
 */
function stripEngineExport(source) {
  return source.replace(/\r?\nexport\s*\{\s*Aventura\s+as\s+default\s*\};?\s*$/u, '');
}

/**
 * HTML comments cannot contain a double hyphen. Keep the full font license in
 * every exported story that embeds a font.
 *
 * @param {string} text
 * @returns {string}
 */
function commentSafe(text) {
  return text.replace(/--/g, '- -');
}

/**
 * @param {Project} project
 * @returns {boolean}
 */
function needsMiniGif(project) {
  return Boolean(project.igrama && project.runtime.igramaFormat === 'gif');
}

/**
 * Build the one and only story document. Preview and export both call this.
 *
 * @param {Project} project
 * @param {StoryDocumentSources} sources
 * @returns {string}
 */
export function buildStoryDocument(project, sources) {
  if (!sources || typeof sources.engineSource !== 'string') {
    throw new DomainError('MISSING_ENGINE_SOURCE');
  }

  const compiled = compileProject(project);
  if (!compiled.startSceneId) {
    throw new DomainError('MISSING_START');
  }

  const includeMiniGif = needsMiniGif(project);
  if (includeMiniGif && typeof sources.miniGifSource !== 'string') {
    throw new DomainError('MISSING_MINIGIF_SOURCE');
  }

  const title = project.meta.title.trim() || 'Aventura';
  const author = project.meta.author.trim();
  const options = {
    ...compiled.options,
    adventureContainer: 'story-root',
  };
  const miniGif = includeMiniGif
    ? `${stripMiniGifExport(/** @type {string} */ (sources.miniGifSource))}\nwindow.MiniGif = MiniGif;`
    : '';
  const authorMeta = author
    ? `\n  <meta name="author" content="${escapeHtml(author)}">`
    : '';
  const fontCSS = fontFaceCSS(project.presentation.typography.font);
  const fontLicense = commentSafe(fontLicenseNotice(project.presentation.typography.font));
  const softwareLicense = commentSafe(softwareLicenseNotice({ includeMiniGif }));
  const loadingLabel = compiled.lang === 'en' ? 'Loading story…' : 'Cargando historia…';
  const engineCode = stripEngineExport(sources.engineSource);

  return `<!doctype html>
<html lang="${escapeHtml(compiled.lang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">${authorMeta}
  <title>${escapeHtml(title)}</title>
  <!--
${fontLicense}

${softwareLicense}
  -->
  <style>
${fontCSS}
${buildStoryCSS(project.presentation)}
  </style>
  <style>
    #story-loading {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 2rem;
      box-sizing: border-box;
      font: 1rem/1.4 system-ui, sans-serif;
      background: #ffffff;
      color: #000000;
    }
  </style>
</head>
<body>
  <main id="story-root" class="story-page" data-scroll="${String(
    Boolean(compiled.options.adventureScroll),
  )}" data-buttons="${project.presentation.buttons.layout === 'stack' ? 'stack' : 'inline'}">
    <div id="story-loading" role="status" aria-live="polite">${loadingLabel}</div>
    <noscript>This story needs JavaScript enabled. / Esta historia necesita JavaScript activado.</noscript>
  </main>

  <script>
(() => {
${miniGif}
${engineCode}
window.Aventura = Aventura;
})();
  </script>

  <script>
(() => {
const scenes = ${jsonForScript(compiled.scenes)};
const options = ${jsonForScript(options)};
const engine = new window.Aventura(${jsonForScript(compiled.lang)}, options);
if (typeof engine.setGrammar === 'function') {
  engine.setGrammar(options.grammar || {});
}
if (options.igrama && typeof engine.setIgrama === 'function') {
  engine.setIgrama(options.igrama);
}
engine.setScenes(scenes).startAdventure(${jsonForScript(compiled.startSceneId)});
document.getElementById('story-loading')?.remove();
})();
  </script>
</body>
</html>
`;
}
