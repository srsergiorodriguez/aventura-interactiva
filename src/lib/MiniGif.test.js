import { describe, expect, it } from 'vitest';
import { MiniGif } from './MiniGif.js';

const PALETTE = [
  [255, 253, 247],
  [20, 20, 20],
  [255, 82, 82],
  [255, 210, 63],
  [47, 107, 255],
];

/**
 * Tiny structural GIF reader, enough to assert dimensions, frame count, delay,
 * palette size, and the first LZW clear code.
 */
function readGif(buffer) {
  const bytes = new Uint8Array(buffer);
  const width = bytes[6] | (bytes[7] << 8);
  const height = bytes[8] | (bytes[9] << 8);
  const packed = bytes[10];
  const tableSize = 1 << ((packed & 0b111) + 1);
  let pos = 13 + tableSize * 3;
  let frames = 0;
  const delays = [];
  let firstImage = null;

  while (pos < bytes.length) {
    const marker = bytes[pos++];
    if (marker === 0x3b) break;
    if (marker === 0x21) {
      const label = bytes[pos++];
      if (label === 0xf9) {
        const size = bytes[pos++];
        delays.push(bytes[pos + 1] | (bytes[pos + 2] << 8));
        pos += size;
        pos += 1; // block terminator
      } else {
        while (pos < bytes.length) {
          const size = bytes[pos++];
          if (size === 0) break;
          pos += size;
        }
      }
    } else if (marker === 0x2c) {
      frames += 1;
      pos += 8; // left, top, width, height
      const descriptorPacked = bytes[pos++];
      if (descriptorPacked & 0b10000000) {
        throw new Error('test reader does not handle local color tables');
      }
      const minimumCodeSize = bytes[pos++];
      const blockSize = bytes[pos++];
      if (firstImage === null) {
        firstImage = { minimumCodeSize, firstByte: bytes[pos] };
      }
      pos += blockSize;
      while (pos < bytes.length) {
        const size = bytes[pos++];
        if (size === 0) break;
        pos += size;
      }
    } else {
      throw new Error(`unexpected GIF marker ${marker}`);
    }
  }

  return { width, height, tableSize, frames, delays, firstImage };
}

function makeFrames() {
  const frames = [];
  for (let frame = 0; frame < 3; frame++) {
    const pixels = new Uint8ClampedArray(8 * 8 * 4);
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const color = PALETTE[(x + y + frame) % PALETTE.length];
        const i = (y * 8 + x) * 4;
        pixels[i] = color[0];
        pixels[i + 1] = color[1];
        pixels[i + 2] = color[2];
        pixels[i + 3] = 255;
      }
    }
    frames.push(pixels);
  }
  return frames;
}

describe('MiniGif custom palette', () => {
  it('writes a valid structure and the correct clear code for 5 colors', () => {
    const gif = new MiniGif({ customPalette: PALETTE, delay: 8 });
    for (const frame of makeFrames()) gif.addFramePixels(frame, 8, 8);
    const buffer = gif.makeGif();
    const info = readGif(buffer);

    expect(info).toMatchObject({
      width: 8,
      height: 8,
      tableSize: 8,
      frames: 3,
      delays: [8, 8, 8],
    });
    expect(info.firstImage.minimumCodeSize).toBe(3);
    // 5 colors pad to an 8-entry table, so the clear code is 8, not 5.
    expect(info.firstImage.firstByte & 0x0f).toBe(8);
  });

  it('is deterministic for the same frames', () => {
    const make = () => {
      const gif = new MiniGif({ customPalette: PALETTE, delay: 8 });
      for (const frame of makeFrames()) gif.addFramePixels(frame, 8, 8);
      return gif.makeGif();
    };
    expect(Array.from(make())).toEqual(Array.from(make()));
  });

  it('rejects mismatched frame dimensions', () => {
    const gif = new MiniGif({ customPalette: PALETTE });
    gif.addFramePixels(makeFrames()[0], 8, 8);
    expect(() => gif.addFramePixels(new Uint8ClampedArray(4 * 4 * 4), 4, 4)).toThrow(
      /same dimensions/,
    );
  });

  it('rejects pixel buffers that do not match their dimensions', () => {
    const gif = new MiniGif({ customPalette: PALETTE });
    expect(() => gif.addFramePixels(new Uint8ClampedArray(10), 8, 8)).toThrow(
      /dimensions do not match/,
    );
  });
});
