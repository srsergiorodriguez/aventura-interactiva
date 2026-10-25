import { describe, expect, it } from 'vitest';
import { createProject, parseProject } from './project.js';
import {
  addOption,
  addScene,
  setSceneText,
  setStartScene,
} from './scenes.js';
import { validateProject } from './validate.js';

const FIXED_NOW = () => '2026-01-01T00:00:00.000Z';

describe('validateProject', () => {
  it('reports an empty project without also reporting a missing start', () => {
    const report = validateProject(createProject({ now: FIXED_NOW }));
    expect(report.errors).toEqual([{ code: 'NO_SCENES' }]);
  });

  it('reports a missing start when scenes exist', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addScene(project, { name: 'a' }).project;
    project = setSceneText(project, 'a', 'A');
    project = setStartScene(project, null);
    expect(validateProject(project).errors).toContainEqual({ code: 'NO_START' });
  });

  it('reports a start that no longer exists', () => {
    const project = parseProject(
      {
        format: 'aventura-interactiva',
        version: 1,
        story: { lang: 'es', startSceneId: 'missing' },
        scenes: { a: { text: 'A' } },
      },
      { now: FIXED_NOW },
    );
    expect(validateProject(project).errors).toContainEqual({
      code: 'START_NOT_FOUND',
      sceneId: 'missing',
    });
  });

  it('reports missing option and area targets', () => {
    const project = parseProject(
      {
        a: {
          text: 'A',
          options: [{ btn: 'Bad', scene: 'nope' }],
          areas: [{ x: 0, y: 0, w: 10, h: 10, scene: 'gone' }],
        },
      },
      { now: FIXED_NOW },
    );
    const codes = validateProject(project).errors.map((error) => error.code);
    expect(codes).toContain('MISSING_TARGET');
    expect(
      validateProject(project).errors.filter((error) => error.code === 'MISSING_TARGET'),
    ).toHaveLength(2);
  });

  it('reports an empty option label and a missing continue target', () => {
    const project = parseProject(
      {
        a: {
          text: 'A',
          scene: 'nowhere',
          options: [{ btn: '', scene: null }],
        },
      },
      { now: FIXED_NOW },
    );
    const report = validateProject(project);
    expect(report.errors.map((error) => error.code)).toContain(
      'EMPTY_OPTION_LABEL',
    );
    expect(report.errors.map((error) => error.code)).toContain('MISSING_TARGET');
    expect(report.errors.find((error) => error.kind === 'continue')).toBeTruthy();
  });

  it('warns about empty scenes, external images, and unreachable scenes', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addScene(project, { name: 'a' }).project;
    project = addScene(project, { name: 'b' }).project;
    project = setSceneText(project, 'a', 'A');
    project = setSceneText(project, 'b', 'B');
    project = {
      ...project,
      scenes: {
        ...project.scenes,
        a: { ...project.scenes.a, image: 'https://example.com/a.png' },
      },
    };

    const report = validateProject(project);
    expect(report.warnings.map((warning) => warning.code)).toContain(
      'EXTERNAL_IMAGE',
    );
    expect(report.warnings.map((warning) => warning.code)).toContain(
      'UNREACHABLE_SCENE',
    );
    expect(report.warnings.find((warning) => warning.code === 'EXTERNAL_IMAGE')).toMatchObject({
      sceneId: 'a',
      kind: 'image',
    });
    expect(report.warnings.find((warning) => warning.code === 'UNREACHABLE_SCENE')).toMatchObject({
      sceneId: 'b',
    });
  });

  it('accepts a connected project with no errors', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addScene(project, { name: 'a' }).project;
    project = addScene(project, { name: 'b' }).project;
    project = setSceneText(project, 'a', 'A');
    project = setSceneText(project, 'b', 'B');
    const added = addOption(project, 'a', { btn: 'Go', target: 'b' });
    project = added.project;

    const report = validateProject(project);
    expect(report.errors).toEqual([]);
    expect(report.warnings).toEqual([]);
  });
});
