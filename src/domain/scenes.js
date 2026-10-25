// @ts-check

import { DomainError, hasOwn, isPlainObject, setOwn } from './errors.js';
import { getScene, hasScene } from './project.js';

/** @typedef {import('./project.js').Project} Project */
/** @typedef {import('./project.js').Scene} Scene */
/** @typedef {import('./project.js').SceneOption} SceneOption */
/** @typedef {import('./project.js').SceneArea} SceneArea */

/**
 * Turn a human scene name into a stable, URL-safe key. Accents are folded, spaces
 * become underscores, and unsupported punctuation becomes an underscore.
 *
 * @param {unknown} name
 * @returns {string}
 */
export function sceneIdFromName(name) {
  if (typeof name !== 'string') return '';
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[_-]+|[_-]+$/g, '')
    .slice(0, 48)
    .replace(/[_-]+$/g, '');
}

/**
 * @typedef {Object} SceneNameResult
 * @property {boolean} valid
 * @property {string} id
 * @property {'EMPTY_NAME'|'STARTS_WITH_NUMBER'|'INVALID_NAME'|'DUPLICATE_SCENE'|null} code
 */

/**
 * Validate a scene name and produce the ID it would create. The UI can call this
 * live; addScene calls it again as the authority.
 *
 * @param {unknown} name
 * @param {Record<string, Scene>} scenes
 * @returns {SceneNameResult}
 */
export function validateSceneName(name, scenes) {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  const id = sceneIdFromName(trimmed);

  if (!trimmed) return { valid: false, id: '', code: 'EMPTY_NAME' };
  if (/^\d/.test(trimmed)) {
    return { valid: false, id, code: 'STARTS_WITH_NUMBER' };
  }
  if (!id) return { valid: false, id: '', code: 'INVALID_NAME' };
  if (hasOwn(scenes, id)) {
    return { valid: false, id, code: 'DUPLICATE_SCENE' };
  }
  return { valid: true, id, code: null };
}

/**
 * @param {Array<{ id: string }>} items
 * @param {'opt'|'area'} prefix
 * @returns {string}
 */
function nextItemId(items, prefix) {
  let max = 0;
  for (const item of items) {
    const match = new RegExp(`^${prefix}_(\\d+)$`).exec(item.id);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return `${prefix}_${max + 1}`;
}

/**
 * @param {number} index
 * @returns {{ x: number, y: number }}
 */
function defaultScenePosition(index) {
  return {
    x: 100 + (index % 4) * 280,
    y: 150 + Math.floor(index / 4) * 180,
  };
}

/**
 * @param {Project} project
 * @param {Scene} scene
 * @returns {Project}
 */
function replaceScene(project, scene) {
  const scenes = { ...project.scenes };
  setOwn(scenes, scene.id, scene);
  return { ...project, scenes };
}

/**
 * @param {string|null|undefined} target
 * @param {Project} project
 * @param {Record<string, any>} details
 * @returns {string|null}
 */
function requireTarget(target, project, details) {
  if (target == null || target === '') return null;
  if (typeof target !== 'string' || !hasScene(project, target)) {
    throw new DomainError('TARGET_NOT_FOUND', { ...details, target });
  }
  return target;
}

/**
 * @param {Project} project
 * @param {{ name: string, position?: { x: number, y: number } }} input
 * @returns {{ project: Project, sceneId: string }}
 */
export function addScene(project, input) {
  const result = validateSceneName(input?.name, project.scenes);
  if (!result.valid) {
    throw new DomainError(result.code || 'INVALID_NAME', {
      name: input?.name,
      id: result.id,
    });
  }

  const index = Object.keys(project.scenes).length;
  const position =
    input.position && Number.isFinite(input.position.x) && Number.isFinite(input.position.y)
      ? { x: input.position.x, y: input.position.y }
      : defaultScenePosition(index);

  /** @type {Scene} */
  const scene = {
    id: result.id,
    text: '',
    image: null,
    options: [],
    areas: [],
    display: position,
  };

  const scenes = { ...project.scenes };
  setOwn(scenes, scene.id, scene);

  return {
    sceneId: scene.id,
    project: {
      ...project,
      scenes,
      story: {
        ...project.story,
        startSceneId: project.story.startSceneId ?? scene.id,
      },
    },
  };
}

/**
 * Generic, shallow scene-field update. Commands that change links or images should
 * use the dedicated helpers below.
 *
 * @param {Project} project
 * @param {string} sceneId
 * @param {Record<string, any>} patch
 * @returns {Project}
 */
export function updateScene(project, sceneId, patch) {
  const scene = getScene(project, sceneId);
  const { id: _ignored, ...safePatch } = patch;
  return replaceScene(project, { ...scene, ...safePatch, id: sceneId });
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {string} text
 * @returns {Project}
 */
export function setSceneText(project, sceneId, text) {
  return updateScene(project, sceneId, { text: String(text ?? '') });
}

/**
 * Replace the scene image. Removing the image also clears image-map areas, since
 * their coordinates refer to the old image.
 *
 * @param {Project} project
 * @param {string} sceneId
 * @param {string|null} image
 * @param {{ clearAreas?: boolean }} [options]
 * @returns {Project}
 */
export function setSceneImage(project, sceneId, image, options = {}) {
  if (image != null && typeof image !== 'string') {
    throw new DomainError('INVALID_IMAGE', { sceneId });
  }
  const nextImage = image ? image : null;
  const clearAreas = options.clearAreas !== false;
  return updateScene(project, sceneId, {
    image: nextImage,
    // A photographed/imported image invalidates the editable drawing source.
    drawing: null,
    ...(clearAreas ? { areas: [] } : {}),
  });
}

/**
 * Save a drawing's rendered GIF and its editable source together. Editor-only
 * source never reaches Aventura; compileProject strips `drawing`.
 *
 * @param {Project} project
 * @param {string} sceneId
 * @param {string} image
 * @param {Record<string, any>} drawing
 * @returns {Project}
 */
export function setSceneDrawing(project, sceneId, image, drawing) {
  if (typeof image !== 'string' || !image) {
    throw new DomainError('INVALID_IMAGE', { sceneId });
  }
  if (!isPlainObject(drawing)) {
    throw new DomainError('INVALID_DRAWING', { sceneId });
  }
  return updateScene(project, sceneId, { image, drawing });
}

/**
 * Replace all areas of a scene while preserving stable IDs where provided. New
 * areas get IDs that do not collide with the current scene.
 *
 * @param {Project} project
 * @param {string} sceneId
 * @param {Array<Record<string, any>>} input
 * @returns {Project}
 */
export function setSceneAreas(project, sceneId, input) {
  const scene = getScene(project, sceneId);
  if (!Array.isArray(input)) {
    throw new DomainError('INVALID_AREAS', { sceneId });
  }

  /** @type {Set<string>} */
  const used = new Set();
  const nextId = () => {
    let number = 1;
    while (
      used.has(`area_${number}`) ||
      scene.areas.some((area) => area.id === `area_${number}`)
    ) {
      number += 1;
    }
    return `area_${number}`;
  };

  const areas = input.map((raw, index) => {
    if (!isPlainObject(raw)) {
      throw new DomainError('INVALID_AREA', { sceneId, index });
    }
    const {
      id: rawId,
      scene: rawScene,
      target: rawTarget,
      ...rest
    } = raw;
    const x = Number(raw.x);
    const y = Number(raw.y);
    const w = Number(raw.w);
    const h = Number(raw.h);
    if (![x, y, w, h].every(Number.isFinite)) {
      throw new DomainError('INVALID_AREA_COORDINATES', { sceneId, index });
    }

    let id =
      typeof rawId === 'string' && rawId.trim() ? rawId.trim() : nextId();
    if (used.has(id)) id = nextId();
    used.add(id);

    const target = requireTarget(
      rawTarget !== undefined ? rawTarget : rawScene ?? null,
      project,
      { sceneId, areaId: id },
    );

    return {
      ...rest,
      id,
      name: typeof raw.name === 'string' ? raw.name : '',
      btn: typeof raw.btn === 'string' ? raw.btn : '',
      tooltip: typeof raw.tooltip === 'string' ? raw.tooltip : '',
      x,
      y,
      w,
      h,
      target,
    };
  });

  return replaceScene(project, { ...scene, areas });
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {{ x: number, y: number }} display
 * @returns {Project}
 */
export function setSceneDisplay(project, sceneId, display) {
  if (!Number.isFinite(display?.x) || !Number.isFinite(display?.y)) {
    throw new DomainError('INVALID_DISPLAY', { sceneId, display });
  }
  return updateScene(project, sceneId, {
    display: { x: display.x, y: display.y },
  });
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {{ btn?: string, target?: string|null }} [input]
 * @returns {{ project: Project, optionId: string }}
 */
export function addOption(project, sceneId, input = {}) {
  const scene = getScene(project, sceneId);
  const id = nextItemId(scene.options, 'opt');
  /** @type {SceneOption} */
  const option = {
    id,
    btn: typeof input.btn === 'string' ? input.btn : '',
    target: requireTarget(input.target ?? null, project, { sceneId, optionId: id }),
  };
  return {
    optionId: id,
    project: replaceScene(project, {
      ...scene,
      options: [...scene.options, option],
    }),
  };
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {string} optionId
 * @param {{ btn?: string, target?: string|null, text?: string, image?: string }} patch
 * @returns {Project}
 */
export function updateOption(project, sceneId, optionId, patch) {
  const scene = getScene(project, sceneId);
  const index = scene.options.findIndex((option) => option.id === optionId);
  if (index === -1) {
    throw new DomainError('OPTION_NOT_FOUND', { sceneId, optionId });
  }

  const current = scene.options[index];
  const nextTarget =
    patch.target === undefined
      ? current.target
      : requireTarget(patch.target, project, { sceneId, optionId });

  /** @type {SceneOption} */
  const next = {
    ...current,
    ...patch,
    id: current.id,
    target: nextTarget,
  };
  const options = scene.options.slice();
  options[index] = next;
  return replaceScene(project, { ...scene, options });
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {string} optionId
 * @param {string|null} target
 * @returns {Project}
 */
export function setOptionTarget(project, sceneId, optionId, target) {
  return updateOption(project, sceneId, optionId, { target });
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {string} optionId
 * @returns {Project}
 */
export function removeOption(project, sceneId, optionId) {
  const scene = getScene(project, sceneId);
  if (!scene.options.some((option) => option.id === optionId)) {
    throw new DomainError('OPTION_NOT_FOUND', { sceneId, optionId });
  }
  return replaceScene(project, {
    ...scene,
    options: scene.options.filter((option) => option.id !== optionId),
  });
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {{ name?: string, btn?: string, tooltip?: string, x: number, y: number, w: number, h: number, target?: string|null }} input
 * @returns {{ project: Project, areaId: string }}
 */
export function addArea(project, sceneId, input) {
  const scene = getScene(project, sceneId);
  if (![input.x, input.y, input.w, input.h].every(Number.isFinite)) {
    throw new DomainError('INVALID_AREA_COORDINATES', { sceneId });
  }
  const id = nextItemId(scene.areas, 'area');
  /** @type {SceneArea} */
  const area = {
    id,
    name: typeof input.name === 'string' ? input.name : '',
    btn: typeof input.btn === 'string' ? input.btn : '',
    tooltip: typeof input.tooltip === 'string' ? input.tooltip : '',
    x: input.x,
    y: input.y,
    w: input.w,
    h: input.h,
    target: requireTarget(input.target ?? null, project, { sceneId, areaId: id }),
  };
  return {
    areaId: id,
    project: replaceScene(project, {
      ...scene,
      areas: [...scene.areas, area],
    }),
  };
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {string} areaId
 * @param {Partial<SceneArea> & { target?: string|null }} patch
 * @returns {Project}
 */
export function updateArea(project, sceneId, areaId, patch) {
  const scene = getScene(project, sceneId);
  const index = scene.areas.findIndex((area) => area.id === areaId);
  if (index === -1) {
    throw new DomainError('AREA_NOT_FOUND', { sceneId, areaId });
  }

  const current = scene.areas[index];
  const next = { ...current, ...patch, id: current.id, target: current.target };
  if (![next.x, next.y, next.w, next.h].every(Number.isFinite)) {
    throw new DomainError('INVALID_AREA_COORDINATES', { sceneId, areaId });
  }
  if (patch.target !== undefined) {
    next.target = requireTarget(patch.target, project, { sceneId, areaId });
  }

  const areas = scene.areas.slice();
  areas[index] = next;
  return replaceScene(project, { ...scene, areas });
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {string} areaId
 * @param {string|null} target
 * @returns {Project}
 */
export function setAreaTarget(project, sceneId, areaId, target) {
  return updateArea(project, sceneId, areaId, { target });
}

/**
 * @param {Project} project
 * @param {string} sceneId
 * @param {string} areaId
 * @returns {Project}
 */
export function removeArea(project, sceneId, areaId) {
  const scene = getScene(project, sceneId);
  if (!scene.areas.some((area) => area.id === areaId)) {
    throw new DomainError('AREA_NOT_FOUND', { sceneId, areaId });
  }
  return replaceScene(project, {
    ...scene,
    areas: scene.areas.filter((area) => area.id !== areaId),
  });
}

/**
 * @param {Project} project
 * @param {string|null} sceneId
 * @returns {Project}
 */
export function setStartScene(project, sceneId) {
  if (sceneId !== null && !hasScene(project, sceneId)) {
    throw new DomainError('TARGET_NOT_FOUND', { target: sceneId });
  }
  return {
    ...project,
    story: { ...project.story, startSceneId: sceneId },
  };
}

/**
 * Delete a scene and clear every reference to it. If it was the start scene, the
 * first remaining scene becomes the start. Returns the number of cleared links.
 *
 * @param {Project} project
 * @param {string} sceneId
 * @returns {{ project: Project, cleared: number }}
 */
export function deleteScene(project, sceneId) {
  getScene(project, sceneId);

  const scenes = { ...project.scenes };
  delete scenes[sceneId];
  let cleared = 0;

  for (const [id, scene] of Object.entries(scenes)) {
    let changed = false;
    const options = scene.options.map((option) => {
      if (option.target !== sceneId) return option;
      changed = true;
      cleared += 1;
      return { ...option, target: null };
    });
    const areas = scene.areas.map((area) => {
      if (area.target !== sceneId) return area;
      changed = true;
      cleared += 1;
      return { ...area, target: null };
    });

    const anyScene = /** @type {Scene & { scene?: string }} */ (scene);
    let nextScene = scene;
    if (anyScene.scene === sceneId) {
      const { scene: _removed, ...withoutContinue } = anyScene;
      nextScene = /** @type {Scene} */ (withoutContinue);
      changed = true;
      cleared += 1;
    }

    if (changed) {
      setOwn(scenes, id, {
        ...nextScene,
        options,
        areas,
      });
    }
  }

  const remaining = Object.keys(scenes);
  const startSceneId =
    project.story.startSceneId === sceneId
      ? (remaining[0] ?? null)
      : project.story.startSceneId;

  return {
    cleared,
    project: {
      ...project,
      scenes,
      story: { ...project.story, startSceneId },
    },
  };
}
