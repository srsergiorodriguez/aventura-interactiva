import { describe, expect, it } from 'vitest';
import projectFixture from '../../tests/fixtures/project-mini.json';
import { parseHandle, toFlowEdges, toFlowNodes } from './flow.js';
import { parseProject } from './project.js';

const FIXED_NOW = () => '2026-01-01T00:00:00.000Z';

describe('flow projection', () => {
  it('projects scenes to nodes with only the scene id as data', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const nodes = toFlowNodes(project);
    expect(nodes).toHaveLength(2);
    expect(nodes[0]).toMatchObject({
      id: 'a',
      type: 'sceneNode',
      position: { x: 100, y: 150 },
      data: { sceneId: 'a' },
    });
  });

  it('projects option and area targets to edges with stable handles', () => {
    const project = parseProject(
      {
        a: {
          text: 'A',
          options: [{ btn: 'Go', scene: 'b' }],
          areas: [{ x: 0, y: 0, w: 10, h: 10, scene: 'b' }],
        },
        b: { text: 'B' },
      },
      { now: FIXED_NOW },
    );
    const edges = toFlowEdges(project);
    expect(edges).toEqual([
      {
        id: 'e:a:opt:opt_1',
        source: 'a',
        target: 'b',
        sourceHandle: 'opt:opt_1',
      },
      {
        id: 'e:a:area:area_1',
        source: 'a',
        target: 'b',
        sourceHandle: 'area:area_1',
      },
    ]);
  });

  it('does not create edges to missing scenes', () => {
    const project = parseProject(
      { a: { text: 'A', options: [{ btn: 'Bad', scene: 'nope' }] } },
      { now: FIXED_NOW },
    );
    expect(toFlowEdges(project)).toEqual([]);
  });

  it('parses option and area handles', () => {
    expect(parseHandle('opt:opt_1')).toEqual({ kind: 'option', id: 'opt_1' });
    expect(parseHandle('area:area_2')).toEqual({ kind: 'area', id: 'area_2' });
    expect(parseHandle('op_1')).toBeNull();
    expect(parseHandle('')).toBeNull();
  });
});
