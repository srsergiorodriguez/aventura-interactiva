import { describe, expect, it } from 'vitest';
import legacyFixture from '../../tests/fixtures/legacy-mini.json';
import projectFixture from '../../tests/fixtures/project-mini.json';
import { DomainError } from './errors.js';
import {
  createProject,
  parseProject,
  parseProjectText,
  serializeProject,
  touchProject,
} from './project.js';

const FIXED_NOW = () => '2026-01-01T00:00:00.000Z';

/**
 * @param {() => unknown} fn
 * @returns {DomainError}
 */
function expectDomainError(fn) {
  try {
    fn();
  } catch (error) {
    expect(error).toBeInstanceOf(DomainError);
    return /** @type {DomainError} */ (error);
  }
  throw new Error('Expected a DomainError');
}

describe('createProject', () => {
  it('creates an empty native project with deterministic defaults', () => {
    const project = createProject({ now: FIXED_NOW });
    expect(project.format).toBe('aventura-interactiva');
    expect(project.version).toBe(1);
    expect(project.scenes).toEqual({});
    expect(project.story).toEqual({ lang: 'es', startSceneId: null });
    expect(project.meta.createdAt).toBe(FIXED_NOW());
    expect(project.presentation.presetId).toBe('papel');
    expect(project.palette.colors).toHaveLength(5);
    expect(project.palette.presetId).toBe('papel');
    expect(project.runtime.typewriterSpeed).toBe(20);
    expect(project.view.viewport).toEqual({ x: 0, y: 0, zoom: 1 });
  });
});

describe('legacy migration', () => {
  it('preserves engine fields, links, images, and unknown fields', () => {
    const project = parseProject(legacyFixture, { now: FIXED_NOW });

    expect(project.story.startSceneId).toBe('inicio');
    expect(project.story.lang).toBe('es');

    const start = project.scenes.inicio;
    expect(start.text).toBe('Start');
    expect(start.image).toMatch(/^data:image\/gif;base64,/);
    expect(start.display).toEqual({ x: 100, y: 200 });
    expect(start.plop).toBe(true);
    expect(start.title).toBe('Start');
    expect(start.customField).toEqual({ keep: true });

    expect(start.options).toHaveLength(2);
    expect(start.options[0]).toMatchObject({ id: 'opt_1', btn: 'Go B', target: 'b' });
    expect(start.options[1]).toMatchObject({
      id: 'opt_2',
      btn: 'Go C',
      text: 'intermediate',
      target: 'c',
    });
    expect(start.areas[0]).toMatchObject({
      id: 'area_1',
      name: 'door',
      btn: 'Area',
      tooltip: 'tip',
      text: 'area text',
      target: 'b',
      x: 10,
      y: 20,
      w: 30,
      h: 40,
    });

    expect(project.scenes.b.text).toBe('B');
    expect(project.scenes.b.image).toMatch(/^data:image\/gif;base64,/);
    expect(project.scenes.b.deadEnd).toBe(true);
    expect(project.scenes.c.scene).toBe('b');
    expect(project.scenes.c.viz).toEqual({ type: 'fixture' });
  });

  it('assigns a deterministic layout when display is missing', () => {
    const project = parseProject(
      { a: { text: 'A' }, b: { text: 'B' } },
      { now: FIXED_NOW },
    );
    expect(project.scenes.a.display).toEqual({ x: 100, y: 150 });
    expect(project.scenes.b.display).toEqual({ x: 380, y: 150 });
    expect(project.story.startSceneId).toBe('a');
  });

  it('infers and stores the start scene only once', () => {
    const project = parseProject(legacyFixture, { now: FIXED_NOW });
    const moved = {
      ...project,
      scenes: {
        ...project.scenes,
        inicio: {
          ...project.scenes.inicio,
          display: { x: 9999, y: 9999 },
        },
      },
    };
    expect(moved.story.startSceneId).toBe('inicio');
  });

  it('does not allow scene keys to pollute the scenes prototype', () => {
    const input = JSON.parse('{"__proto__":{"text":"P"}}');
    const project = parseProject(input, { now: FIXED_NOW });
    expect(Object.hasOwn(project.scenes, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(project.scenes)).toBe(Object.prototype);
  });

  it('rejects non-scene values instead of partially importing', () => {
    const error = expectDomainError(() =>
      parseProject({ a: 'not a scene' }, { now: FIXED_NOW }),
    );
    expect(error.code).toBe('INVALID_STORY');
  });
});

describe('native projects', () => {
  it('round-trips through JSON without losing presentation or drawing source', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const text = serializeProject(project);
    const parsed = parseProjectText(text, { now: FIXED_NOW });

    expect(parsed).toEqual(project);
    expect(parsed.scenes.b.drawing).toEqual(projectFixture.scenes.b.drawing);
    expect(parsed.presentation.typography.font).toBe('book');
    expect(parsed.presentation.layout.maxWidth).toBe(480);
    expect(parsed.palette.colors).toEqual(project.palette.colors);
    expect(parsed.runtime.typewriterSpeed).toBe(0);
  });

  it('rejects unknown versions', () => {
    const error = expectDomainError(() =>
      parseProject({ ...projectFixture, version: 2 }, { now: FIXED_NOW }),
    );
    expect(error.code).toBe('UNSUPPORTED_VERSION');
  });

  it('rejects an unsupported story language', () => {
    const error = expectDomainError(() =>
      parseProject(
        { ...projectFixture, story: { ...projectFixture.story, lang: 'fr' } },
        { now: FIXED_NOW },
      ),
    );
    expect(error.code).toBe('INVALID_LANG');
  });

  it('rejects duplicate option ids', () => {
    const input = {
      ...projectFixture,
      scenes: {
        a: {
          ...projectFixture.scenes.a,
          options: [
            { id: 'opt_1', btn: 'One', target: 'b' },
            { id: 'opt_1', btn: 'Two', target: 'b' },
          ],
        },
      },
    };
    const error = expectDomainError(() =>
      parseProject(input, { now: FIXED_NOW }),
    );
    expect(error.code).toBe('DUPLICATE_OPTION_ID');
  });

  it('rejects malformed JSON with a stable code', () => {
    const error = expectDomainError(() => parseProjectText('{', { now: FIXED_NOW }));
    expect(error.code).toBe('INVALID_JSON');
  });

  it('touches updatedAt without changing the rest of the project', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const touched = touchProject(project, () => '2026-02-02T00:00:00.000Z');
    expect(touched.meta.updatedAt).toBe('2026-02-02T00:00:00.000Z');
    expect(touched.meta.createdAt).toBe(project.meta.createdAt);
    expect(touched.scenes).toBe(project.scenes);
  });
});
