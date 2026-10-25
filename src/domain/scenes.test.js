import { describe, expect, it } from 'vitest';
import { DomainError } from './errors.js';
import { createProject } from './project.js';
import {
  addArea,
  addOption,
  addScene,
  deleteScene,
  removeArea,
  removeOption,
  sceneIdFromName,
  setAreaTarget,
  setOptionTarget,
  setSceneAreas,
  setSceneDrawing,
  setSceneImage,
  setSceneDisplay,
  setSceneText,
  setStartScene,
  updateOption,
  updateScene,
  validateSceneName,
} from './scenes.js';

const FIXED_NOW = () => '2026-01-01T00:00:00.000Z';

/**
 * @returns {string}
 */
function expectDomainError(fn) {
  try {
    fn();
  } catch (error) {
    expect(error).toBeInstanceOf(DomainError);
    return /** @type {DomainError} */ (error).code;
  }
  throw new Error('Expected a DomainError');
}

/**
 * @param {string} name
 * @param {number} x
 * @param {number} y
 */
function addTestScene(project, name, x = 0, y = 0) {
  return addScene(project, { name, position: { x, y } });
}

describe('scene IDs and names', () => {
  it('folds accents and punctuation into stable IDs', () => {
    expect(sceneIdFromName('Hola Mundo!')).toBe('hola_mundo');
    expect(sceneIdFromName('áccento')).toBe('accento');
    expect(sceneIdFromName('escena 1')).toBe('escena_1');
    expect(sceneIdFromName('a-b')).toBe('a-b');
    expect(sceneIdFromName('a.b')).toBe('a_b');
  });

  it('rejects empty, numeric, and duplicate names', () => {
    expect(validateSceneName('', {})).toMatchObject({ valid: false, code: 'EMPTY_NAME' });
    expect(validateSceneName('1 start', {})).toMatchObject({
      valid: false,
      code: 'STARTS_WITH_NUMBER',
    });
    expect(validateSceneName('a', { a: {} })).toMatchObject({
      valid: false,
      code: 'DUPLICATE_SCENE',
    });
    expect(validateSceneName('ok', {})).toMatchObject({
      valid: true,
      id: 'ok',
      code: null,
    });
  });
});

describe('addScene', () => {
  it('adds the first scene, sets it as start, and uses the requested position', () => {
    const project = createProject({ now: FIXED_NOW });
    const result = addTestScene(project, 'Hola Mundo!', 12, 34);
    expect(result.sceneId).toBe('hola_mundo');
    expect(result.project.story.startSceneId).toBe('hola_mundo');
    expect(result.project.scenes.hola_mundo).toMatchObject({
      id: 'hola_mundo',
      text: '',
      image: null,
      options: [],
      areas: [],
      display: { x: 12, y: 34 },
    });
  });

  it('does not change the start after the first scene', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    project = addTestScene(project, 'b').project;
    expect(project.story.startSceneId).toBe('a');
  });

  it('rejects duplicates without mutating the project', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    const before = project.scenes;
    expect(expectDomainError(() => addTestScene(project, 'a'))).toBe(
      'DUPLICATE_SCENE',
    );
    expect(project.scenes).toBe(before);
  });

  it('uses a deterministic default position', () => {
    const project = addScene(createProject({ now: FIXED_NOW }), { name: 'a' }).project;
    expect(project.scenes.a.display).toEqual({ x: 100, y: 150 });
  });
});

describe('scene editing', () => {
  it('updates text and display without changing the id', () => {
    let project = addTestScene(createProject({ now: FIXED_NOW }), 'a').project;
    project = setSceneText(project, 'a', 'Hello');
    project = setSceneDisplay(project, 'a', { x: 5, y: 6 });
    expect(project.scenes.a.text).toBe('Hello');
    expect(project.scenes.a.display).toEqual({ x: 5, y: 6 });

    project = updateScene(project, 'a', { id: 'hacked', text: 'Changed' });
    expect(project.scenes.a.id).toBe('a');
    expect(project.scenes.a.text).toBe('Changed');
  });
});

describe('options and stable links', () => {
  it('uses stable option IDs and keeps the remaining target after removing the first option', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    project = addTestScene(project, 'b').project;
    project = addTestScene(project, 'c').project;

    const first = addOption(project, 'a', { btn: 'Go B', target: 'b' });
    project = first.project;
    const second = addOption(project, 'a', { btn: 'Go C', target: 'c' });
    project = second.project;

    expect(first.optionId).toBe('opt_1');
    expect(second.optionId).toBe('opt_2');
    expect(project.scenes.a.options.map((option) => option.id)).toEqual([
      'opt_1',
      'opt_2',
    ]);

    project = removeOption(project, 'a', first.optionId);
    expect(project.scenes.a.options).toEqual([
      { id: 'opt_2', btn: 'Go C', target: 'c' },
    ]);
  });

  it('clears a target explicitly without removing the option', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    project = addTestScene(project, 'b').project;
    const added = addOption(project, 'a', { btn: 'Go B', target: 'b' });
    project = setOptionTarget(added.project, 'a', added.optionId, null);
    expect(project.scenes.a.options[0]).toMatchObject({
      id: added.optionId,
      target: null,
    });
  });

  it('rejects missing targets and unknown options', () => {
    let project = addTestScene(createProject({ now: FIXED_NOW }), 'a').project;
    expect(expectDomainError(() => addOption(project, 'a', { target: 'nope' }))).toBe(
      'TARGET_NOT_FOUND',
    );
    expect(expectDomainError(() => removeOption(project, 'a', 'opt_9'))).toBe(
      'OPTION_NOT_FOUND',
    );
  });

  it('keeps option IDs immutable during updates', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    const added = addOption(project, 'a', { btn: 'One' });
    project = updateOption(added.project, 'a', added.optionId, {
      id: 'other',
      btn: 'Two',
    });
    expect(project.scenes.a.options[0]).toEqual({
      id: 'opt_1',
      btn: 'Two',
      target: null,
    });
  });
});

describe('areas', () => {
  it('adds, updates, and removes an area with a stable target', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    project = addTestScene(project, 'b').project;
    const added = addArea(project, 'a', {
      name: 'door',
      btn: 'Open',
      tooltip: 'tip',
      x: 10,
      y: 20,
      w: 30,
      h: 40,
      target: 'b',
    });
    project = added.project;
    expect(project.scenes.a.areas[0]).toMatchObject({
      id: 'area_1',
      name: 'door',
      target: 'b',
    });

    project = setAreaTarget(project, 'a', added.areaId, null);
    expect(project.scenes.a.areas[0].target).toBeNull();

    project = removeArea(project, 'a', added.areaId);
    expect(project.scenes.a.areas).toEqual([]);
    expect(expectDomainError(() => removeArea(project, 'a', 'area_9'))).toBe(
      'AREA_NOT_FOUND',
    );
  });

  it('replaces the image and clears areas by default', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    project = addTestScene(project, 'b').project;
    const area = addArea(project, 'a', { x: 1, y: 2, w: 3, h: 4, target: 'b' });
    project = area.project;
    project = setSceneImage(project, 'a', 'data:image/gif;base64,AAAA');
    expect(project.scenes.a.image).toBe('data:image/gif;base64,AAAA');
    expect(project.scenes.a.areas).toEqual([]);
  });

  it('can keep areas when an image is replaced in place', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    const area = addArea(project, 'a', { x: 1, y: 2, w: 3, h: 4 });
    project = area.project;
    project = setSceneImage(project, 'a', 'data:image/gif;base64,AAAA', {
      clearAreas: false,
    });
    expect(project.scenes.a.areas).toHaveLength(1);
  });

  it('replaces all areas while preserving stable IDs and assigning new ones', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    project = addTestScene(project, 'b').project;
    const first = addArea(project, 'a', { x: 1, y: 2, w: 3, h: 4 });
    project = first.project;

    project = setSceneAreas(project, 'a', [
      { id: first.areaId, x: 10, y: 20, w: 30, h: 40, target: 'b' },
      { x: 50, y: 60, w: 70, h: 80, name: 'new' },
    ]);

    expect(project.scenes.a.areas).toHaveLength(2);
    expect(project.scenes.a.areas[0]).toMatchObject({
      id: first.areaId,
      x: 10,
      y: 20,
      target: 'b',
    });
    expect(project.scenes.a.areas[1]).toMatchObject({
      id: 'area_2',
      x: 50,
      y: 60,
      target: null,
    });
  });

  it('stores an editable drawing and its rendered image together', () => {
    let project = addTestScene(createProject({ now: FIXED_NOW }), 'a').project;
    const drawing = { version: 1, width: 128, height: 128, strokes: [] };
    project = setSceneDrawing(project, 'a', 'data:image/gif;base64,AAAA', drawing);
    expect(project.scenes.a.image).toBe('data:image/gif;base64,AAAA');
    expect(project.scenes.a.drawing).toEqual(drawing);
  });

  it('clears the drawing source when a photographed image replaces it', () => {
    let project = addTestScene(createProject({ now: FIXED_NOW }), 'a').project;
    project = setSceneDrawing(project, 'a', 'data:image/gif;base64,AAAA', {
      version: 1,
      strokes: [],
    });
    project = setSceneImage(project, 'a', 'data:image/webp;base64,BBBB');
    expect(project.scenes.a.drawing).toBeNull();
  });

  it('rejects invalid coordinates', () => {
    let project = addTestScene(createProject({ now: FIXED_NOW }), 'a').project;
    expect(
      expectDomainError(() =>
        addArea(project, 'a', { x: 0, y: 0, w: 0, h: Number.NaN }),
      ),
    ).toBe('INVALID_AREA_COORDINATES');
  });
});

describe('start and deletion', () => {
  it('sets and rejects start scenes', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    project = addTestScene(project, 'b').project;
    project = setStartScene(project, 'b');
    expect(project.story.startSceneId).toBe('b');
    expect(expectDomainError(() => setStartScene(project, 'nope'))).toBe(
      'TARGET_NOT_FOUND',
    );
  });

  it('clears option, area, and continue references when a scene is deleted', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addTestScene(project, 'a').project;
    project = addTestScene(project, 'b').project;

    const option = addOption(project, 'a', { btn: 'Go B', target: 'b' });
    project = option.project;
    const area = addArea(project, 'a', {
      x: 1,
      y: 2,
      w: 3,
      h: 4,
      target: 'b',
    });
    project = area.project;
    project = updateScene(project, 'a', { scene: 'b' });
    project = setStartScene(project, 'b');

    const deleted = deleteScene(project, 'b');
    project = deleted.project;

    expect(deleted.cleared).toBe(3);
    expect(project.scenes.a.options[0].target).toBeNull();
    expect(project.scenes.a.areas[0].target).toBeNull();
    expect(project.scenes.a.scene).toBeUndefined();
    expect(project.story.startSceneId).toBe('a');
  });
});
