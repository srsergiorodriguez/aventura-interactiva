// @ts-check

import { DomainError, isPlainObject, setOwn, hasOwn } from './errors.js';
import {
  PRESENTATION_PRESETS,
  createPresentation,
  paletteForPreset,
  presentationWithPalette,
  presetIdForPalette,
} from './presentation.js';

/** @typedef {import('./presentation.js').Presentation} Presentation */

/**
 * @typedef {Object} SceneOption
 * @property {string} id
 * @property {string} btn
 * @property {string|null} target
 * @property {string} [text]
 * @property {string} [image]
 */

/**
 * @typedef {Object} SceneArea
 * @property {string} id
 * @property {string} name
 * @property {string} btn
 * @property {string} tooltip
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {string|null} target
 * @property {string} [text]
 */

/**
 * @typedef {Object} Scene
 * @property {string} id
 * @property {string} text
 * @property {string|null} image
 * @property {SceneOption[]} options
 * @property {SceneArea[]} areas
 * @property {{ x: number, y: number } | null} display
 * @property {Record<string, any>} [drawing]
 */

/**
 * @typedef {Object} RuntimeOptions
 * @property {number} typewriterSpeed
 * @property {boolean} evalTags
 * @property {boolean} backBtn
 * @property {boolean} restartBtn
 * @property {boolean} adventureScroll
 * @property {boolean} adventureSlide
 * @property {'png'|'gif'} igramaFormat
 */

/**
 * @typedef {Object} ProjectMeta
 * @property {string} title
 * @property {string} author
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ProjectPalette
 * @property {string} presetId // scheme id or 'custom'
 * @property {string[]} colors // [background, ink, accent, support, highlight]
 */

/**
 * @typedef {Object} Project
 * @property {'aventura-interactiva'} format
 * @property {1} version
 * @property {ProjectMeta} meta
 * @property {{ lang: 'en'|'es', startSceneId: string|null }} story
 * @property {Record<string, Scene>} scenes
 * @property {Presentation} presentation
 * @property {ProjectPalette} palette
 * @property {RuntimeOptions} runtime
 * @property {Record<string, any>} grammar
 * @property {Record<string, any>|null} igrama
 * @property {{ viewport: { x: number, y: number, zoom: number } }} view
 */

export const PROJECT_FORMAT = 'aventura-interactiva';
export const DEFAULT_PROJECT_PALETTE = Object.freeze({
  presetId: 'papel',
  colors: Object.freeze(paletteForPreset('papel')),
});
export const PROJECT_VERSION = 1;

/** @type {RuntimeOptions} */
export const DEFAULT_RUNTIME = Object.freeze({
  typewriterSpeed: 20,
  evalTags: false,
  backBtn: false,
  restartBtn: false,
  adventureScroll: false,
  adventureSlide: false,
  igramaFormat: 'png',
});

/**
 * @param {unknown} value
 * @param {import('./presentation.js').Presentation|null} [presentation]
 * @returns {ProjectPalette}
 */
function normalizeProjectPalette(value, presentation = null) {
  const source = isPlainObject(value) ? value : {};
  const requestedPreset =
    typeof source.presetId === 'string' &&
    (source.presetId === 'custom' || PRESENTATION_PRESETS[source.presetId])
      ? source.presetId
      : null;

  let fallbackPreset = requestedPreset && requestedPreset !== 'custom'
    ? requestedPreset
    : presentation && PRESENTATION_PRESETS[presentation.presetId]
      ? presentation.presetId
      : 'papel';
  let fallbackColors = paletteForPreset(fallbackPreset);
  if (
    !requestedPreset &&
    presentation &&
    !PRESENTATION_PRESETS[presentation.presetId]
  ) {
    fallbackColors = [
      presentation.colors.background,
      presentation.colors.text,
      presentation.colors.accentBackground,
      presentation.colors.buttonBackground,
      presentation.colors.accentText,
    ];
    fallbackPreset = 'custom';
  }

  const input = Array.isArray(source.colors) ? source.colors : [];
  const colors = Array.from({ length: 5 }, (_, index) => {
    const color = input[index];
    return typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color)
      ? color
      : fallbackColors[index];
  });
  const presetId = presetIdForPalette(colors) || fallbackPreset;
  return { ...source, presetId, colors };
}

/**
 * @param {unknown} value
 * @returns {RuntimeOptions}
 */
function normalizeRuntime(value) {
  const source = isPlainObject(value) ? value : {};
  const speed = Number(source.typewriterSpeed);
  return {
    typewriterSpeed:
      Number.isFinite(speed) && speed >= 0
        ? Math.round(speed)
        : DEFAULT_RUNTIME.typewriterSpeed,
    evalTags: Boolean(source.evalTags ?? DEFAULT_RUNTIME.evalTags),
    backBtn: Boolean(source.backBtn ?? DEFAULT_RUNTIME.backBtn),
    restartBtn: Boolean(source.restartBtn ?? DEFAULT_RUNTIME.restartBtn),
    adventureScroll: Boolean(
      source.adventureScroll ?? DEFAULT_RUNTIME.adventureScroll,
    ),
    // Deprecated in the UI; kept false to avoid layout jumps.
    adventureSlide: false,
    igramaFormat: source.igramaFormat === 'gif' ? 'gif' : 'png',
  };
}

/**
 * @param {unknown} value
 * @param {() => string} now
 * @returns {ProjectMeta}
 */
function normalizeMeta(value, now) {
  const source = isPlainObject(value) ? value : {};
  const timestamp = now();
  return {
    ...source,
    title: typeof source.title === 'string' ? source.title : '',
    author: typeof source.author === 'string' ? source.author : '',
    createdAt:
      typeof source.createdAt === 'string' ? source.createdAt : timestamp,
    updatedAt:
      typeof source.updatedAt === 'string' ? source.updatedAt : timestamp,
  };
}

/**
 * @param {unknown} value
 * @returns {Project['view']}
 */
function normalizeView(value) {
  const source = isPlainObject(value) ? value : {};
  const viewport = isPlainObject(source.viewport) ? source.viewport : {};
  const x = Number(viewport.x);
  const y = Number(viewport.y);
  const zoom = Number(viewport.zoom);
  return {
    ...source,
    viewport: {
      x: Number.isFinite(x) ? x : 0,
      y: Number.isFinite(y) ? y : 0,
      zoom: Number.isFinite(zoom) && zoom > 0 ? zoom : 1,
    },
  };
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function normalizeGrammar(value) {
  if (value == null) return {};
  if (!isPlainObject(value)) {
    throw new DomainError('INVALID_GRAMMAR');
  }
  return value;
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>|null}
 */
function normalizeIgrama(value) {
  if (value == null) return null;
  if (!isPlainObject(value)) {
    throw new DomainError('INVALID_IGRAMA');
  }
  return value;
}

/**
 * @param {unknown} value
 * @returns {{ x: number, y: number } | null}
 */
function normalizeDisplay(value) {
  if (!isPlainObject(value)) return null;
  const x = Number(value.x);
  const y = Number(value.y);
  return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function asText(value) {
  if (typeof value === 'string') return value;
  if (value == null) return '';
  return String(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function asTarget(value) {
  if (value == null || value === '') return null;
  if (typeof value !== 'string') {
    throw new DomainError('INVALID_TARGET');
  }
  return value;
}

/**
 * @param {Record<string, any>} raw
 * @param {string} sceneId
 * @param {number} index
 * @returns {SceneOption}
 */
function normalizeOption(raw, sceneId, index) {
  if (!isPlainObject(raw)) {
    throw new DomainError('INVALID_OPTION', { sceneId, index });
  }

  const { id: rawId, scene, target, ...rest } = raw;
  const id =
    typeof rawId === 'string' && rawId.trim() ? rawId.trim() : `opt_${index + 1}`;
  const resolved = target !== undefined ? target : scene;

  return {
    ...rest,
    id,
    btn: asText(raw.btn),
    target: asTarget(resolved),
  };
}

/**
 * @param {Record<string, any>} raw
 * @param {string} sceneId
 * @param {number} index
 * @returns {SceneArea}
 */
function normalizeArea(raw, sceneId, index) {
  if (!isPlainObject(raw)) {
    throw new DomainError('INVALID_AREA', { sceneId, index });
  }

  const { id: rawId, scene, target, ...rest } = raw;
  const x = Number(raw.x);
  const y = Number(raw.y);
  const w = Number(raw.w);
  const h = Number(raw.h);

  if (![x, y, w, h].every(Number.isFinite)) {
    throw new DomainError('INVALID_AREA_COORDINATES', { sceneId, index });
  }

  const id =
    typeof rawId === 'string' && rawId.trim()
      ? rawId.trim()
      : `area_${index + 1}`;
  const resolved = target !== undefined ? target : scene;

  return {
    ...rest,
    id,
    name: asText(raw.name),
    btn: asText(raw.btn),
    tooltip: asText(raw.tooltip),
    x,
    y,
    w,
    h,
    target: asTarget(resolved),
  };
}

/**
 * @param {string} sceneId
 * @param {unknown} raw
 * @returns {Scene}
 */
function normalizeScene(sceneId, raw) {
  if (!isPlainObject(raw)) {
    throw new DomainError('INVALID_SCENE', { sceneId });
  }

  const {
    id: _ignoredId,
    text,
    texto,
    image,
    imagen,
    options,
    opciones,
    areas,
    display,
    drawing,
    ...rest
  } = raw;

  const rawOptions = options ?? opciones ?? [];
  const rawAreas = areas ?? [];
  if (!Array.isArray(rawOptions)) {
    throw new DomainError('INVALID_OPTIONS', { sceneId });
  }
  if (!Array.isArray(rawAreas)) {
    throw new DomainError('INVALID_AREAS', { sceneId });
  }

  const normalizedOptions = rawOptions.map((option, index) =>
    normalizeOption(option, sceneId, index),
  );
  const normalizedAreas = rawAreas.map((area, index) =>
    normalizeArea(area, sceneId, index),
  );

  assertUniqueIds(
    normalizedOptions.map((option) => option.id),
    'DUPLICATE_OPTION_ID',
    sceneId,
  );
  assertUniqueIds(
    normalizedAreas.map((area) => area.id),
    'DUPLICATE_AREA_ID',
    sceneId,
  );

  const imageValue = image ?? imagen;
  if (imageValue != null && typeof imageValue !== 'string') {
    throw new DomainError('INVALID_IMAGE', { sceneId });
  }

  /** @type {Scene} */
  const scene = {
    ...rest,
    id: sceneId,
    text: typeof text === 'string' ? text : asText(texto),
    image: imageValue ?? null,
    options: normalizedOptions,
    areas: normalizedAreas,
    display: normalizeDisplay(display),
  };

  if (drawing != null) {
    if (!isPlainObject(drawing)) {
      throw new DomainError('INVALID_DRAWING', { sceneId });
    }
    scene.drawing = drawing;
  }

  return scene;
}

/**
 * @param {string[]} ids
 * @param {string} code
 * @param {string} sceneId
 */
function assertUniqueIds(ids, code, sceneId) {
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) {
      throw new DomainError(code, { sceneId, id });
    }
    seen.add(id);
  }
}

/**
 * Fill missing canvas positions with a deterministic grid. Layout must never be
 * random: importing the same file twice should produce the same canvas.
 *
 * @param {Record<string, Scene>} scenes
 */
function assignDeterministicLayout(scenes) {
  Object.values(scenes).forEach((scene, index) => {
    if (!scene.display) {
      scene.display = {
        x: 100 + (index % 4) * 280,
        y: 150 + Math.floor(index / 4) * 180,
      };
    }
  });
}

/**
 * @param {Record<string, Scene>} scenes
 * @returns {string|null}
 */
function inferStartScene(scenes) {
  const sorted = Object.values(scenes).sort((a, b) => {
    const ay = a.display?.y ?? 0;
    const by = b.display?.y ?? 0;
    if (ay !== by) return ay - by;
    const ax = a.display?.x ?? 0;
    const bx = b.display?.x ?? 0;
    if (ax !== bx) return ax - bx;
    return a.id.localeCompare(b.id);
  });
  return sorted.length > 0 ? sorted[0].id : null;
}

/**
 * @param {Record<string, unknown>} rawScenes
 * @returns {Record<string, Scene>}
 */
function normalizeScenes(rawScenes) {
  /** @type {Record<string, Scene>} */
  const scenes = {};
  for (const [id, raw] of Object.entries(rawScenes)) {
    if (!id.trim()) {
      throw new DomainError('INVALID_SCENE_ID');
    }
    setOwn(scenes, id, normalizeScene(id, raw));
  }
  assignDeterministicLayout(scenes);
  return scenes;
}

/**
 * @param {string} lang
 * @param {boolean} strict
 * @returns {'en'|'es'}
 */
function normalizeLang(lang, strict) {
  if (lang === 'en' || lang === 'es') return lang;
  if (strict) throw new DomainError('INVALID_LANG', { lang });
  return 'es';
}

/**
 * @param {Record<string, any>} input
 * @param {{ now: () => string }} options
 * @returns {Project}
 */
function parseNative(input, options) {
  const version = input.version ?? PROJECT_VERSION;
  if (version !== PROJECT_VERSION) {
    throw new DomainError('UNSUPPORTED_VERSION', { version });
  }

  if (!isPlainObject(input.scenes)) {
    throw new DomainError('INVALID_SCENES');
  }

  const scenes = normalizeScenes(input.scenes);
  const story = isPlainObject(input.story) ? input.story : {};
  const startSceneId =
    typeof story.startSceneId === 'string' && story.startSceneId
      ? story.startSceneId
      : null;
  const presentation = createPresentation(input.presentation);
  const palette = normalizeProjectPalette(input.palette, presentation);
  const syncedPresentation = createPresentation({
    ...presentationWithPalette(presentation, palette.colors),
    presetId: palette.presetId,
  });

  return {
    ...input,
    format: PROJECT_FORMAT,
    version: PROJECT_VERSION,
    meta: normalizeMeta(input.meta, options.now),
    story: {
      ...story,
      lang: story.lang == null ? 'es' : normalizeLang(story.lang, true),
      startSceneId,
    },
    scenes,
    presentation: syncedPresentation,
    palette,
    runtime: normalizeRuntime(input.runtime),
    grammar: normalizeGrammar(input.grammar),
    igrama: normalizeIgrama(input.igrama),
    view: normalizeView(input.view),
  };
}

/**
 * @param {Record<string, any>} input
 * @param {{ now: () => string }} options
 * @returns {Project}
 */
function parseLegacy(input, options) {
  const entries = Object.entries(input);
  for (const [id, scene] of entries) {
    if (!isPlainObject(scene)) {
      throw new DomainError('INVALID_STORY', { sceneId: id });
    }
  }

  const scenes = normalizeScenes(input);
  return {
    format: PROJECT_FORMAT,
    version: PROJECT_VERSION,
    meta: normalizeMeta({}, options.now),
    story: {
      lang: 'es',
      startSceneId: inferStartScene(scenes),
    },
    scenes,
    presentation: createPresentation(),
    palette: normalizeProjectPalette({}),
    runtime: normalizeRuntime({}),
    grammar: {},
    igrama: null,
    view: normalizeView({}),
  };
}

/**
 * Create an empty native project.
 *
 * @param {{ lang?: string, title?: string, author?: string, now?: () => string }} [options]
 * @returns {Project}
 */
export function createProject(options = {}) {
  const now = options.now || (() => new Date().toISOString());
  const timestamp = now();
  const lang = normalizeLang(options.lang || 'es', false);
  return {
    format: PROJECT_FORMAT,
    version: PROJECT_VERSION,
    meta: {
      title: typeof options.title === 'string' ? options.title : '',
      author: typeof options.author === 'string' ? options.author : '',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    story: { lang, startSceneId: null },
    scenes: {},
    presentation: createPresentation(),
    palette: normalizeProjectPalette({}),
    runtime: { ...DEFAULT_RUNTIME },
    grammar: {},
    igrama: null,
    view: { viewport: { x: 0, y: 0, zoom: 1 } },
  };
}

/**
 * Parse an already-decoded JSON value as a native project or a legacy scene map.
 *
 * @param {unknown} input
 * @param {{ now?: () => string }} [options]
 * @returns {Project}
 */
export function parseProject(input, options = {}) {
  const now = options.now || (() => new Date().toISOString());
  if (!isPlainObject(input)) {
    throw new DomainError('INVALID_PROJECT');
  }
  if (input.format === PROJECT_FORMAT) {
    return parseNative(input, { now });
  }
  return parseLegacy(input, { now });
}

/**
 * @param {string} text
 * @param {{ now?: () => string }} [options]
 * @returns {Project}
 */
export function parseProjectText(text, options = {}) {
  let decoded;
  try {
    decoded = JSON.parse(text);
  } catch (error) {
    throw new DomainError('INVALID_JSON', {
      message: error instanceof Error ? error.message : String(error),
    });
  }
  return parseProject(decoded, options);
}

/**
 * @param {Project} project
 * @returns {string}
 */
export function serializeProject(project) {
  return `${JSON.stringify(project, null, 2)}\n`;
}

/**
 * Return a copy with an updated `meta.updatedAt`, for autosave and project saves.
 *
 * @param {Project} project
 * @param {() => string} [now]
 * @returns {Project}
 */
export function touchProject(project, now = () => new Date().toISOString()) {
  return {
    ...project,
    meta: { ...project.meta, updatedAt: now() },
  };
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @returns {boolean}
 */
export function hasScene(project, sceneId) {
  return (
    typeof sceneId === 'string' &&
    sceneId.length > 0 &&
    hasOwn(project.scenes, sceneId)
  );
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @returns {Scene}
 */
export function getScene(project, sceneId) {
  if (!hasScene(project, sceneId)) {
    throw new DomainError('SCENE_NOT_FOUND', { sceneId });
  }
  return project.scenes[sceneId];
}
