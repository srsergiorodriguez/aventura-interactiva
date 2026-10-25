// @ts-check

import { DomainError } from './domain/errors.js';
import {
  createProject,
  hasScene,
  parseProject,
  parseProjectText,
  serializeProject,
  touchProject,
} from './domain/project.js';
import {
  addOption as addOptionToProject,
  addScene as addSceneToProject,
  deleteScene as deleteSceneFromProject,
  removeOption as removeOptionFromProject,
  setAreaTarget,
  setOptionTarget,
  setSceneAreas as replaceSceneAreas,
  setSceneDisplay,
  setSceneDrawing,
  setSceneImage,
  setSceneText,
  setStartScene,
  updateOption as updateOptionInProject,
  updateScene,
} from './domain/scenes.js';
import { parseHandle, toFlowEdges, toFlowNodes } from './domain/flow.js';
import { validateProject } from './domain/validate.js';
import {
  PRESENTATION_PRESETS,
  createPresentation,
  paletteForPreset,
  presentationWithPalette,
  presetIdForPalette,
  withPresentationPreset,
} from './domain/presentation.js';
import { buildStoryDocument } from './export/document.js';
import { storyFilename } from './export/escape.js';
import { downloadFile } from './lib/helpers.js';
import { engineSource, miniGifSource } from './lib/engine.js';
import {
  isAutosaveAvailable,
  loadProject as loadAutosave,
  saveProject as saveAutosave,
} from './persistence/autosave.js';

/** @typedef {import('./domain/project.js').Project} Project */

const now = () => new Date().toISOString();

export const app = $state({
  project: createProject({ now }),
  /** @type {string|null} */
  selectedSceneId: null,
  projectEpoch: 0,
  ready: false,
  /** @type {'idle'|'saving'|'saved'|'error'|'unavailable'} */
  saveState: 'idle',
  /** @type {string|null} */
  lastSavedAt: null,
  /** @type {string|null} */
  lastError: null,
});

export const canvas = $state({
  /** @type {Array<Record<string, any>>} */
  nodes: [],
  /** @type {Array<Record<string, any>>} */
  edges: [],
});

let saveTimer = /** @type {ReturnType<typeof setTimeout>|null} */ (null);
let saving = false;
let saveQueued = false;
let visibilityBound = false;

/**
 * @returns {Project}
 */
function createDemoProject() {
  let project = createProject({ title: '' });
  let added = addSceneToProject(project, {
    name: 'inicio',
    position: { x: 100, y: 150 },
  });
  project = added.project;

  added = addSceneToProject(project, {
    name: 'tranquilo',
    position: { x: 400, y: 150 },
  });
  project = added.project;

  added = addSceneToProject(project, {
    name: 'aplastar',
    position: { x: 400, y: 250 },
  });
  project = added.project;

  project = setSceneText(project, 'inicio', 'érase una vez un círculo...');
  project = setSceneText(project, 'tranquilo', 'perfecto, un final redondo.');
  project = setSceneText(
    project,
    'aplastar',
    'parece que la historia dio una elipsis.',
  );

  project = addOptionToProject(project, 'inicio', {
    btn: 'dejar tranquilo',
    target: 'tranquilo',
  }).project;
  project = addOptionToProject(project, 'inicio', {
    btn: 'aplastar',
    target: 'aplastar',
  }).project;
  project = setStartScene(project, 'inicio');
  return project;
}

export function syncFlow() {
  canvas.nodes = toFlowNodes(app.project);
  canvas.edges = toFlowEdges(app.project);
}

/**
 * @param {Project} project
 */
function adoptProject(project) {
  app.project = project;
  app.selectedSceneId = null;
  app.projectEpoch += 1;
  syncFlow();
}

/**
 * @param {Project} next
 * @param {{ sync?: boolean, autosave?: boolean }} [options]
 */
function commit(next, options = {}) {
  app.project = next;
  if (options.sync) syncFlow();
  if (options.autosave !== false) scheduleAutosave();
}

export function scheduleAutosave() {
  if (!app.ready) return;
  if (!isAutosaveAvailable()) {
    app.saveState = 'unavailable';
    return;
  }
  if (saveTimer) clearTimeout(saveTimer);
  app.saveState = 'saving';
  saveTimer = setTimeout(() => {
    saveTimer = null;
    void saveNow();
  }, 1000);
}

export async function saveNow() {
  if (!isAutosaveAvailable()) {
    app.saveState = 'unavailable';
    return;
  }
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  if (saving) {
    saveQueued = true;
    return;
  }

  saving = true;
  const snapshot = touchProject($state.snapshot(app.project), now);
  try {
    await saveAutosave(snapshot);
    app.project = { ...app.project, meta: snapshot.meta };
    app.lastSavedAt = snapshot.meta.updatedAt;
    app.saveState = 'saved';
    app.lastError = null;
  } catch (error) {
    app.saveState = 'error';
    app.lastError =
      error && typeof error === 'object' && 'code' in error
        ? String(/** @type {{ code?: unknown }} */ (error).code)
        : 'SAVE_FAILED';
  } finally {
    saving = false;
    if (saveQueued) {
      saveQueued = false;
      void saveNow();
    }
  }
}

let initPromise = /** @type {Promise<void>|null} */ (null);

export function initApp() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    /** @type {Project|null} */
    let restored = null;
    if (isAutosaveAvailable()) {
      try {
        const saved = await loadAutosave();
        if (saved) restored = parseProject(saved);
      } catch (error) {
        app.lastError =
          error && typeof error === 'object' && 'code' in error
            ? String(/** @type {{ code?: unknown }} */ (error).code)
            : 'PROJECT_OPEN_ERROR';
      }
    }

    if (restored) {
      adoptProject(restored);
      app.ready = true;
      app.saveState = 'saved';
      app.lastSavedAt = restored.meta.updatedAt;
    } else {
      adoptProject(createDemoProject());
      app.ready = true;
      if (!isAutosaveAvailable()) {
        app.saveState = 'unavailable';
      } else {
        scheduleAutosave();
      }
    }

    if (!visibilityBound && typeof window !== 'undefined') {
      visibilityBound = true;
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && app.ready) {
          void saveNow();
        }
      });
    }
  })();
  return initPromise;
}

/**
 * @param {string|null} sceneId
 */
export function selectScene(sceneId) {
  app.selectedSceneId = sceneId;
}

/**
 * @param {string} name
 * @param {{ x: number, y: number }} position
 */
export function addScene(name, position) {
  const result = addSceneToProject(app.project, { name, position });
  commit(result.project, { sync: true });
  app.selectedSceneId = result.sceneId;
  return result.sceneId;
}

/**
 * @param {string} sceneId
 * @param {string} text
 */
export function updateSceneText(sceneId, text) {
  commit(setSceneText(app.project, sceneId, text));
}

/**
 * @param {string} sceneId
 * @param {string} btn
 */
export function addSceneOption(sceneId, btn) {
  const result = addOptionToProject(app.project, sceneId, { btn });
  commit(result.project, { sync: true });
  return result.optionId;
}

/**
 * @param {string} sceneId
 * @param {string} optionId
 * @param {string} btn
 */
export function updateSceneOption(sceneId, optionId, btn) {
  commit(updateOptionInProject(app.project, sceneId, optionId, { btn }));
}

/**
 * @param {string} sceneId
 * @param {string} optionId
 */
export function removeSceneOption(sceneId, optionId) {
  commit(removeOptionFromProject(app.project, sceneId, optionId), {
    sync: true,
  });
}

/**
 * @param {string} sceneId
 */
export function setStartSceneId(sceneId) {
  commit(setStartScene(app.project, sceneId));
}

/**
 * @param {string} sceneId
 * @param {string|null} image
 * @param {{ clearAreas?: boolean }} [options]
 */
export function setSceneImageData(sceneId, image, options = {}) {
  commit(setSceneImage(app.project, sceneId, image, options));
}

/**
 * @param {string} sceneId
 * @param {string} image
 * @param {Record<string, any>} drawing
 */
export function setSceneDrawingData(sceneId, image, drawing) {
  commit(setSceneDrawing(app.project, sceneId, image, drawing));
}

/**
 * @param {string} sceneId
 * @param {Array<Record<string, any>>} areas
 */
export function saveSceneAreas(sceneId, areas) {
  commit(replaceSceneAreas(app.project, sceneId, areas), { sync: true });
}

/**
 * @param {string} sceneId
 * @param {Record<string, any>} patch
 */
export function updateSceneField(sceneId, patch) {
  commit(updateScene(app.project, sceneId, patch));
}

/**
 * @param {Array<Record<string, any>>} nodes
 */
export function moveFlowNodes(nodes) {
  let next = app.project;
  for (const node of nodes) {
    if (!node?.id || !hasScene(next, node.id)) continue;
    next = setSceneDisplay(next, node.id, node.position);
  }
  commit(next);
}

/**
 * @param {{ source: string, sourceHandle?: string|null, target: string }} connection
 */
export function connectFlowConnection(connection) {
  if (!connection.sourceHandle) return;
  const parsed = parseHandle(connection.sourceHandle);
  if (!parsed || !connection.target) return;

  const next =
    parsed.kind === 'option'
      ? setOptionTarget(
          app.project,
          connection.source,
          parsed.id,
          connection.target,
        )
      : setAreaTarget(
          app.project,
          connection.source,
          parsed.id,
          connection.target,
        );

  commit(next, { sync: true });
}

/**
 * @param {{ nodes: Array<Record<string, any>>, edges: Array<Record<string, any>> }} input
 */
export function deleteFlowItems({ nodes, edges }) {
  let next = app.project;

  for (const edge of edges) {
    const parsed = parseHandle(edge.sourceHandle);
    if (!parsed || !hasScene(next, edge.source)) continue;
    try {
      next =
        parsed.kind === 'option'
          ? setOptionTarget(next, edge.source, parsed.id, null)
          : setAreaTarget(next, edge.source, parsed.id, null);
    } catch {
      // The option/area may already be gone; deleting the scene below will
      // clear any remaining references.
    }
  }

  for (const node of nodes) {
    if (!hasScene(next, node.id)) continue;
    next = deleteSceneFromProject(next, node.id).project;
  }

  if (app.selectedSceneId && !hasScene(next, app.selectedSceneId)) {
    app.selectedSceneId = null;
  }
  commit(next, { sync: true });
}

/**
 * @param {{ x: number, y: number, zoom: number }} viewport
 */
export function saveViewport(viewport) {
  if (![viewport?.x, viewport?.y, viewport?.zoom].every(Number.isFinite)) return;
  commit(
    {
      ...app.project,
      view: {
        ...app.project.view,
        viewport: { x: viewport.x, y: viewport.y, zoom: viewport.zoom },
      },
    },
    { sync: false },
  );
}

/**
 * @param {Record<string, any>} patch
 */
export function updateRuntime(patch) {
  commit(
    {
      ...app.project,
      runtime: { ...app.project.runtime, ...patch },
    },
    { sync: false },
  );
}

/**
 * @param {Record<string, any>} patch
 */
export function updatePresentation(patch) {
  const current = app.project.presentation;
  const next = createPresentation({
    ...current,
    ...patch,
    presetId: 'custom',
    colors: { ...current.colors, ...(patch.colors || {}) },
    typography: { ...current.typography, ...(patch.typography || {}) },
    layout: { ...current.layout, ...(patch.layout || {}) },
    buttons: { ...current.buttons, ...(patch.buttons || {}) },
    image: { ...current.image, ...(patch.image || {}) },
    shape: { ...current.shape, ...(patch.shape || {}) },
  });
  commit({ ...app.project, presentation: next }, { sync: false });
}

/**
 * @param {string} presetId
 */
export function applyPresentationPreset(presetId) {
  const preset = PRESENTATION_PRESETS[presetId];
  if (!preset) throw new DomainError('INVALID_PRESET', { presetId });
  const next = withPresentationPreset(app.project.presentation, presetId);
  if (next.presetId !== presetId) return;
  commit(
    {
      ...app.project,
      presentation: next,
      palette: { presetId, colors: paletteForPreset(presetId) },
    },
    { sync: false },
  );
}

/**
 * @param {{ title?: string, author?: string }} patch
 */
export function updateStoryMeta(patch) {
  const meta = { ...app.project.meta };
  if (typeof patch.title === 'string') meta.title = patch.title;
  if (typeof patch.author === 'string') meta.author = patch.author;
  commit({ ...app.project, meta }, { sync: false });
}

/**
 * @param {string[]} colors
 */
export function updateProjectPalette(colors) {
  if (!Array.isArray(colors) || colors.length !== 5) {
    throw new DomainError('INVALID_PALETTE');
  }
  const normalized = colors.map((color) =>
    typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color)
      ? color
      : null,
  );
  if (normalized.some((color) => !color)) {
    throw new DomainError('INVALID_PALETTE');
  }
  const safeColors = /** @type {string[]} */ (normalized);
  const next = presentationWithPalette(app.project.presentation, safeColors);
  commit(
    {
      ...app.project,
      presentation: next,
      palette: {
        ...app.project.palette,
        presetId: presetIdForPalette(safeColors),
        colors: safeColors,
      },
    },
    { sync: false },
  );
}

/**
 * @param {'en'|'es'} lang
 */
export function updateStoryLanguage(lang) {
  if (lang !== 'en' && lang !== 'es') {
    throw new DomainError('INVALID_LANG', { lang });
  }
  commit(
    {
      ...app.project,
      story: { ...app.project.story, lang },
    },
    { sync: false },
  );
}

/**
 * @param {Record<string, any>} grammar
 */
export function updateGrammar(grammar) {
  commit({ ...app.project, grammar }, { sync: false });
}

/**
 * @param {Record<string, any>|null} igrama
 */
export function updateIgrama(igrama) {
  commit({ ...app.project, igrama }, { sync: false });
}

/**
 * @param {'blank'|'demo'} [mode]
 */
export function newProject(mode = 'blank') {
  if (mode === 'demo') {
    adoptProject(createDemoProject());
  } else {
    const lang = app.project.story.lang;
    const sceneName = lang === 'en' ? 'start' : 'inicio';
    let project = createProject({ lang, title: '' });
    const added = addSceneToProject(project, {
      name: sceneName,
      position: { x: 100, y: 150 },
    });
    project = added.project;
    adoptProject(project);
  }
  app.saveState = 'idle';
  void saveNow();
}

/**
 * @param {string} text
 * @param {string} [fallbackTitle]
 */
export function openProjectText(text, fallbackTitle = '') {
  let project = parseProjectText(text);
  if (!project.meta.title && fallbackTitle.trim()) {
    project = {
      ...project,
      meta: { ...project.meta, title: fallbackTitle.trim() },
    };
  }
  adoptProject(project);
  app.saveState = 'saving';
  void saveNow();
  return project;
}

export function saveProjectFile() {
  const snapshot = touchProject($state.snapshot(app.project), now);
  const filename = storyFilename(snapshot.meta.title).replace(
    /\.html$/,
    '.aventura.json',
  );
  downloadFile(serializeProject(snapshot), filename, 'application/json');
  app.project = { ...app.project, meta: snapshot.meta };
}

/**
 * @returns {string}
 */
export function exportStoryHTML() {
  const validation = validateProject(app.project);
  if (validation.errors.length > 0) {
    throw new DomainError('EXPORT_BLOCKED', {
      errors: validation.errors,
    });
  }

  const snapshot = $state.snapshot(app.project);
  const html = buildStoryDocument(snapshot, {
    engineSource,
    miniGifSource,
  });
  const filename = storyFilename(snapshot.meta.title);
  downloadFile(html, filename, 'text/html');
  return filename;
}

export function getValidation() {
  return validateProject(app.project);
}
