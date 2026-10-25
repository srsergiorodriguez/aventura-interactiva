// @ts-check

import { hasScene } from './project.js';

/** @typedef {import('./project.js').Project} Project */

/**
 * @typedef {Object} ValidationIssue
 * @property {string} code
 * @property {string} [sceneId]
 * @property {string} [optionId]
 * @property {string} [areaId]
 * @property {string} [target]
 * @property {'option'|'area'|'continue'|'image'} [kind]
 */

/**
 * Validate the document before playtest/export. Codes are stable; the UI localizes
 * them. Warnings do not block, errors do.
 *
 * @param {Project} project
 * @returns {{ errors: ValidationIssue[], warnings: ValidationIssue[] }}
 */
export function validateProject(project) {
  /** @type {ValidationIssue[]} */
  const errors = [];
  /** @type {ValidationIssue[]} */
  const warnings = [];
  const sceneIds = Object.keys(project.scenes);

  if (sceneIds.length === 0) {
    errors.push({ code: 'NO_SCENES' });
    return { errors, warnings };
  }

  const start = project.story.startSceneId;
  if (!start) {
    errors.push({ code: 'NO_START' });
  } else if (!hasScene(project, start)) {
    errors.push({ code: 'START_NOT_FOUND', sceneId: start });
  }

  for (const [sceneId, scene] of Object.entries(project.scenes)) {
    if (!scene.text.trim()) {
      warnings.push({ code: 'EMPTY_SCENE_TEXT', sceneId });
    }

    const image = scene.image;
    if (isExternalImage(image)) {
      warnings.push({ code: 'EXTERNAL_IMAGE', sceneId, kind: 'image' });
    }

    for (const option of scene.options) {
      if (!option.btn.trim()) {
        errors.push({ code: 'EMPTY_OPTION_LABEL', sceneId, optionId: option.id });
      }
      if (option.target && !hasScene(project, option.target)) {
        errors.push({
          code: 'MISSING_TARGET',
          sceneId,
          optionId: option.id,
          target: option.target,
          kind: 'option',
        });
      }
      if (isExternalImage(option.image)) {
        warnings.push({
          code: 'EXTERNAL_IMAGE',
          sceneId,
          optionId: option.id,
          kind: 'image',
        });
      }
    }

    for (const area of scene.areas) {
      if (area.target && !hasScene(project, area.target)) {
        errors.push({
          code: 'MISSING_TARGET',
          sceneId,
          areaId: area.id,
          target: area.target,
          kind: 'area',
        });
      }
    }

    const anyScene = /** @type {any} */ (scene);
    if (typeof anyScene.scene === 'string' && anyScene.scene) {
      if (!hasScene(project, anyScene.scene)) {
        errors.push({
          code: 'MISSING_TARGET',
          sceneId,
          target: anyScene.scene,
          kind: 'continue',
        });
      }
    }
  }

  if (start && hasScene(project, start)) {
    for (const sceneId of unreachableScenes(project, start)) {
      warnings.push({ code: 'UNREACHABLE_SCENE', sceneId });
    }
  }

  return { errors, warnings };
}

/**
 * @param {Project} project
 * @param {string} start
 * @returns {string[]}
 */
function unreachableScenes(project, start) {
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const sceneId = /** @type {string} */ (queue.shift());
    if (visited.has(sceneId)) continue;
    const scene = project.scenes[sceneId];
    if (!scene) continue;
    visited.add(sceneId);

    for (const option of scene.options) {
      if (option.target) queue.push(option.target);
    }
    for (const area of scene.areas) {
      if (area.target) queue.push(area.target);
    }
    const anyScene = /** @type {any} */ (scene);
    if (typeof anyScene.scene === 'string' && anyScene.scene) {
      queue.push(anyScene.scene);
    }
  }

  return Object.keys(project.scenes).filter((id) => !visited.has(id));
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isExternalImage(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    !value.startsWith('data:')
  );
}
