import { describe, expect, it } from 'vitest';
import { addStroke, createDrawing } from './model.js';
import { encodeDrawingGif } from './encode.js';

const stroke = {
  id: 's1',
  tool: 'brush',
  paint: 2,
  size: 3,
  points: [
    [20, 20],
    [100, 100],
  ],
  seed: 7,
};

function decode(dataUrl) {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

describe('encodeDrawingGif', () => {
  it('encodes a deterministic 3-frame GIF data URL', () => {
    const drawing = addStroke(createDrawing(), stroke);
    const first = encodeDrawingGif(drawing, { outputSize: 128 });
    const second = encodeDrawingGif(drawing, { outputSize: 128 });

    expect(first.image).toMatch(/^data:image\/gif;base64,/);
    expect(first.bytes).toBeGreaterThan(100);
    expect(second.image).toBe(first.image);

    const bytes = decode(first.image);
    expect(String.fromCharCode(...bytes.slice(0, 6))).toBe('GIF89a');
    expect(bytes[6] | (bytes[7] << 8)).toBe(128);
    expect(bytes[8] | (bytes[9] << 8)).toBe(128);

    // Graphics Control Extension: delay 25 centiseconds = 4 fps.
    const gce = [0x21, 0xf9, 0x04, 0x00, 0x19, 0x00];
    let found = false;
    for (let i = 0; i <= bytes.length - gce.length; i++) {
      if (gce.every((byte, offset) => bytes[i + offset] === byte)) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });

  it('writes project palette colors into the GIF table', () => {
    const drawing = addStroke(createDrawing(), stroke);
    const projectColors = ['#101418', '#f5f5f5', '#7bdff2', '#ff9f1c', '#ff5d8f'];
    const bytes = decode(
      encodeDrawingGif(drawing, { outputSize: 128, projectColors }).image,
    );
    const tableSize = 1 << ((bytes[10] & 0b111) + 1);
    expect(tableSize).toBe(8);
    expect(Array.from(bytes.slice(13, 28))).toEqual([
      16, 20, 24, 245, 245, 245, 123, 223, 242, 255, 159, 28, 255, 93, 143,
    ]);
  });

  it('supports a larger output size', () => {
    const drawing = addStroke(createDrawing(), stroke);
    const large = encodeDrawingGif(drawing, { outputSize: 256 });
    const bytes = decode(large.image);
    expect(bytes[6] | (bytes[7] << 8)).toBe(256);
    expect(bytes[8] | (bytes[9] << 8)).toBe(256);
  });
});
