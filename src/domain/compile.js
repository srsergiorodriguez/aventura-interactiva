// @ts-check

import { setOwn } from './errors.js';
import { presentationToEngineTheme } from './presentation.js';

/** @typedef {import('./project.js').Project} Project */

/**
 * Compile a project to the shape consumed by Aventura. This function is pure:
 * it never mutates the project and shares image strings by reference.
 *
 * @param {Project} project
 */
export function compileProject(project) {
  /** @type {Record<string, any>} */
  const scenes = {};

  for (const [sceneId, scene] of Object.entries(project.scenes)) {
    const {
      id: _id,
      display: _display,
      drawing: _drawing,
      image,
      options,
      areas,
      ...rest
    } = scene;

    /** @type {Record<string, any>} */
    const compiled = { ...rest };
    if (image != null) compiled.image = image;

    compiled.options = (options || []).map((option) => {
      const {
        id: _optionId,
        target,
        scene: _staleScene,
        ...optionRest
      } = /** @type {any} */ (option);
      /** @type {Record<string, any>} */
      const out = { ...optionRest };
      if (target != null) out.scene = target;
      return out;
    });

    compiled.areas = (areas || []).map((area) => {
      const {
        id: _areaId,
        name: _name,
        target,
        scene: _staleScene,
        ...areaRest
      } = /** @type {any} */ (area);
      /** @type {Record<string, any>} */
      const out = { ...areaRest };
      if (target != null) out.scene = target;
      return out;
    });

    setOwn(scenes, sceneId, compiled);
  }

  return {
    scenes,
    startSceneId: project.story.startSceneId,
    lang: project.story.lang,
    options: {
      ...project.runtime,
      defaultCSS: true,
      theme: presentationToEngineTheme(project.presentation),
      grammar: project.grammar ?? {},
      igrama: project.igrama ?? null,
    },
    presentation: project.presentation,
    meta: project.meta,
  };
}
