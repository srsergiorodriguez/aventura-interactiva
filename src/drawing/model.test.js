import { describe, expect, it } from 'vitest';
import {
  DRAWING_WIDTH,
  addStroke,
  clearDrawing,
  createDrawing,
  frameToRgba,
  normalizeDrawing,
  paletteColors,
  renderDrawingFrames,
  renderFrameIndices,
} from './model.js';

const stroke = (overrides = {}) => ({
  id: 's1',
  tool: 'brush',
  paint: 2,
  size: 2,
  points: [[64, 64]],
  seed: 42,
  ...overrides,
});

describe('drawing model', () => {
  it('renders three background frames for an empty drawing', () => {
    const drawing = createDrawing();
    const frames = renderDrawingFrames(drawing);
    expect(frames).toHaveLength(3);
    for (const frame of frames) {
      expect(frame).toHaveLength(DRAWING_WIDTH * DRAWING_WIDTH);
      expect(frame.every((value) => value === 0)).toBe(true);
    }
  });

  it('is deterministic for the same strokes and seed', () => {
    const drawing = addStroke(createDrawing(), stroke());
    const first = renderDrawingFrames(drawing);
    const second = renderDrawingFrames(drawing);
    expect(first.map((frame) => Array.from(frame))).toEqual(
      second.map((frame) => Array.from(frame)),
    );
    const different = renderFrameIndices(
      { ...drawing, strokes: [{ ...drawing.strokes[0], seed: 99 }] },
      0,
    );
    expect(Array.from(different)).not.toEqual(Array.from(first[0]));
  });

  it('applies the selected paint color and erases to background', () => {
    const painted = addStroke(createDrawing(), stroke());
    const frame = renderFrameIndices(painted, 0);
    expect(frame).toContain(2);

    const erased = addStroke(
      painted,
      stroke({ id: 's2', tool: 'eraser', paint: 4, seed: 42 }),
    );
    const erasedFrame = renderFrameIndices(erased, 0);
    expect(erasedFrame).not.toContain(2);
  });

  it('makes the textured brush sparser than the solid brush', () => {
    const solid = addStroke(createDrawing(), stroke({ size: 3 }));
    const texture = addStroke(
      createDrawing(),
      stroke({ size: 3, tool: 'texture' }),
    );
    const solidPixels = renderFrameIndices(solid, 0).filter((value) => value !== 0).length;
    const texturePixels = renderFrameIndices(texture, 0).filter((value) => value !== 0).length;
    expect(texturePixels).toBeGreaterThan(0);
    expect(texturePixels).toBeLessThan(solidPixels);
  });

  it('supports six sizes and clamps malformed sizes', () => {
    const recovered = normalizeDrawing({
      paletteId: 'tinta',
      strokes: [
        stroke({ size: 6 }),
        stroke({ id: 's2', size: 42 }),
        stroke({ id: 's3', size: 0 }),
      ],
    });
    expect(recovered.strokes.map((item) => item.size)).toEqual([6, 6, 2]);
  });

  it('clears all strokes immutably', () => {
    const drawing = addStroke(createDrawing(), stroke());
    const cleared = clearDrawing(drawing);
    expect(drawing.strokes).toHaveLength(1);
    expect(cleared.strokes).toEqual([]);
  });

  it('recovers a valid source and drops malformed strokes', () => {
    const recovered = normalizeDrawing({
      paletteId: 'noche',
      strokes: [
        stroke(),
        { tool: 'fill', points: [[1, 1]] },
        { tool: 'brush', points: [] },
      ],
    });
    expect(recovered).toMatchObject({
      frames: 3,
      delay: 25,
    });
    expect(recovered).not.toHaveProperty('paletteId');
    expect(recovered.strokes).toHaveLength(1);
    expect(normalizeDrawing(null)).toBeNull();
    expect(normalizeDrawing({ strokes: 'no' })).toBeNull();
  });

  it('expands index frames to exact RGBA colors at output size', () => {
    const drawing = addStroke(createDrawing(), stroke({ paint: 1 }));
    const indices = renderFrameIndices(drawing, 0);
    const rgba = frameToRgba(
      indices,
      ['#ffffff', '#141414', '#ff5252', '#ffd23f', '#2f6bff'],
      256,
    );
    expect(rgba).toHaveLength(256 * 256 * 4);
    expect([rgba[0], rgba[1], rgba[2], rgba[3]]).toEqual([255, 255, 255, 255]);
    // Every pixel must be one of the exact two palette colors in use.
    const colors = new Set();
    for (let i = 0; i < rgba.length; i += 4) {
      colors.add(`${rgba[i]},${rgba[i + 1]},${rgba[i + 2]}`);
    }
    expect([...colors].every((color) => color === '255,255,255' || color === '20,20,20')).toBe(true);
  });
});

describe('project drawing colors', () => {
  const projectColors = ['#101418', '#f5f5f5', '#7bdff2', '#ff9f1c', '#ff5d8f'];

  it('uses the project colors and ignores a legacy palette id', () => {
    expect(paletteColors(projectColors)).toEqual(projectColors);
    const drawing = normalizeDrawing({
      paletteId: 'noche',
      strokes: [],
    });
    expect(drawing).not.toHaveProperty('paletteId');
    expect(paletteColors()).toHaveLength(5);
  });

  it('expands frames with project colors', () => {
    const indices = new Uint8Array(DRAWING_WIDTH * DRAWING_WIDTH);
    const rgba = frameToRgba(indices, projectColors, 128);
    expect([rgba[0], rgba[1], rgba[2]]).toEqual([16, 20, 24]);
  });
});
