import { describe, expect, it } from 'vitest';
import legacyFixture from '../../tests/fixtures/legacy-mini.json';
import projectFixture from '../../tests/fixtures/project-mini.json';
import { compileProject } from './compile.js';
import { addOption, addScene } from './scenes.js';
import { createProject, parseProject } from './project.js';

const FIXED_NOW = () => '2026-01-01T00:00:00.000Z';

describe('compileProject', () => {
  it('compiles targets, strips editor-only fields, and preserves engine fields', () => {
    const project = parseProject(legacyFixture, { now: FIXED_NOW });
    const compiled = compileProject(project);
    const start = compiled.scenes.inicio;

    expect(start.display).toBeUndefined();
    expect(start.drawing).toBeUndefined();
    expect(start.customField).toEqual({ keep: true });
    expect(start.plop).toBe(true);
    expect(start.title).toBe('Start');
    expect(start.options).toEqual([
      { btn: 'Go B', scene: 'b' },
      { btn: 'Go C', text: 'intermediate', scene: 'c' },
    ]);
    expect(start.areas).toEqual([
      {
        btn: 'Area',
        tooltip: 'tip',
        text: 'area text',
        x: 10,
        y: 20,
        w: 30,
        h: 40,
        scene: 'b',
      },
    ]);
    expect(start.options[0].id).toBeUndefined();
    expect(start.options[0].target).toBeUndefined();
    expect(start.areas[0].id).toBeUndefined();
    expect(start.areas[0].name).toBeUndefined();
  });

  it('shares image strings by reference instead of deep-cloning them', () => {
    const project = parseProject(legacyFixture, { now: FIXED_NOW });
    const compiled = compileProject(project);
    expect(compiled.scenes.inicio.image).toBe(project.scenes.inicio.image);
  });

  it('builds engine options from runtime and presentation', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const compiled = compileProject(project);

    expect(compiled.startSceneId).toBe('a');
    expect(compiled.lang).toBe('es');
    expect(compiled.options.defaultCSS).toBe(true);
    expect(compiled.options.typewriterSpeed).toBe(0);
    expect(compiled.options.theme.background).toBe('#ffffff');
    expect(compiled.options.theme.fontFamily).toContain('Georgia');
    expect(compiled.options.grammar).toEqual({ base: ['hola'] });
    expect(compiled.options.igrama).toBeNull();
    expect(compiled.scenes.b.deadEnd).toBe(true);
    expect(compiled.scenes.b.drawing).toBeUndefined();
  });

  it('omits null links instead of serializing scene:null', () => {
    let project = createProject({ now: FIXED_NOW });
    project = addScene(project, { name: 'a' }).project;
    const added = addOption(project, 'a', { btn: 'Unlinked' });
    project = added.project;
    const compiled = compileProject(project);
    expect(compiled.scenes.a.options[0]).toEqual({ btn: 'Unlinked' });
    expect('scene' in compiled.scenes.a.options[0]).toBe(false);
  });

  it('does not mutate the project', () => {
    const project = parseProject(legacyFixture, { now: FIXED_NOW });
    const before = JSON.stringify(project);
    compileProject(project);
    expect(JSON.stringify(project)).toBe(before);
  });

  it('keeps empty options and areas arrays for the engine', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const compiled = compileProject(project);
    expect(compiled.scenes.b.options).toEqual([]);
    expect(compiled.scenes.b.areas).toEqual([]);
  });
});
