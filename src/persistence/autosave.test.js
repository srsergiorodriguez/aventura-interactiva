import { IDBFactory } from 'fake-indexeddb';
import { describe, expect, it } from 'vitest';
import {
  PersistenceError,
  clearProject,
  isAutosaveAvailable,
  loadProject,
  saveProject,
} from './autosave.js';

const FIXED_NOW = () => '2026-01-01T00:00:00.000Z';

/**
 * @returns {any}
 */
function sampleProject() {
  return {
    format: 'aventura-interactiva',
    version: 1,
    meta: {
      title: 'Mini',
      author: '',
      createdAt: FIXED_NOW(),
      updatedAt: FIXED_NOW(),
    },
    story: { lang: 'es', startSceneId: 'a' },
    scenes: {
      a: {
        id: 'a',
        text: 'Hola',
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        options: [],
        areas: [],
        display: { x: 0, y: 0 },
        drawing: { version: 1, width: 128, height: 128, strokes: [] },
      },
    },
    presentation: {},
    runtime: {},
    grammar: {},
    igrama: null,
    view: { viewport: { x: 0, y: 0, zoom: 1 } },
  };
}

describe('autosave adapter', () => {
  it('round-trips a project through IndexedDB', async () => {
    const indexedDB = new IDBFactory();
    const project = sampleProject();

    await saveProject(project, { indexedDB });
    const loaded = await loadProject({ indexedDB });

    expect(loaded).toEqual(project);
  });

  it('returns null when there is no saved project', async () => {
    const indexedDB = new IDBFactory();
    await expect(loadProject({ indexedDB })).resolves.toBeNull();
  });

  it('clears the saved project', async () => {
    const indexedDB = new IDBFactory();
    await saveProject(sampleProject(), { indexedDB });
    await clearProject({ indexedDB });
    await expect(loadProject({ indexedDB })).resolves.toBeNull();
  });

  it('reports a typed error when IndexedDB is unavailable', async () => {
    await expect(
      saveProject(sampleProject(), { indexedDB: /** @type {any} */ ({}) }),
    ).rejects.toMatchObject({ code: 'UNAVAILABLE' });
  });

  it('detects availability', () => {
    expect(isAutosaveAvailable(new IDBFactory())).toBe(true);
    expect(isAutosaveAvailable(undefined)).toBe(false);
  });

  it('uses a typed error class', () => {
    const error = new PersistenceError('SAVE_FAILED', { cause: 'quota' });
    expect(error).toBeInstanceOf(Error);
    expect(error.code).toBe('SAVE_FAILED');
    expect(error.details.cause).toBe('quota');
  });
});
