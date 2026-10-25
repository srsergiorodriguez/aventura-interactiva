// @ts-check

import { hasScene } from './project.js';

/** @typedef {import('./project.js').Project} Project */

/**
 * @param {string} handle
 * @returns {{ kind: 'option'|'area', id: string } | null}
 */
export function parseHandle(handle) {
  if (typeof handle !== 'string') return null;
  if (handle.startsWith('opt:')) {
    const id = handle.slice(4);
    return id ? { kind: 'option', id } : null;
  }
  if (handle.startsWith('area:')) {
    const id = handle.slice(5);
    return id ? { kind: 'area', id } : null;
  }
  return null;
}

/**
 * The canvas is a projection of the project, not a second document. Node data
 * carries only the scene ID; SceneNode derives the content from the project.
 *
 * @param {Project} project
 * @returns {Array<Record<string, any>>}
 */
export function toFlowNodes(project) {
  return Object.values(project.scenes).map((scene) => ({
    id: scene.id,
    type: 'sceneNode',
    position: scene.display
      ? { x: scene.display.x, y: scene.display.y }
      : { x: 0, y: 0 },
    data: { sceneId: scene.id },
  }));
}

/**
 * @param {Project} project
 * @returns {Array<Record<string, any>>}
 */
export function toFlowEdges(project) {
  /** @type {Array<Record<string, any>>} */
  const edges = [];

  for (const scene of Object.values(project.scenes)) {
    for (const option of scene.options) {
      if (!option.target || !hasScene(project, option.target)) continue;
      edges.push({
        id: `e:${scene.id}:opt:${option.id}`,
        source: scene.id,
        target: option.target,
        sourceHandle: `opt:${option.id}`,
      });
    }
    for (const area of scene.areas) {
      if (!area.target || !hasScene(project, area.target)) continue;
      edges.push({
        id: `e:${scene.id}:area:${area.id}`,
        source: scene.id,
        target: area.target,
        sourceHandle: `area:${area.id}`,
      });
    }
  }

  return edges;
}
