# Vendored Runtime Notes

## Aventura

- File: `src/lib/aventura.esm.js`
- Version: no version marker in the vendored file (README: v2.4.1 era).
- Source: https://github.com/srsergiorodriguez/aventura
- Policy: do not edit for app features. App-specific behavior lives in
  `src/export/` and `src/domain/`.

## MiniGif

- File: `src/lib/MiniGif.js`
- Upstream: https://github.com/srsergiorodriguez/minigif (v1.1.0 per header)
- Single source: `public/MiniGif.js` was removed in S1. The app imports the class
  directly for the drawing studio; the export builder embeds the raw source for
  igrama GIFs.

### Patches (S3 gate, 2026-10-25)

1. **Correct LZW clear/EOI codes for custom palettes.** The GIF clear code is
   `1 << minimumCodeSize`, based on the padded global color table, not
   `palette.length`. With five colors the table is padded to eight, so clear/EOI
   must be 8/9, not 5/6. The old output was structurally corrupt: ffmpeg reported
   `LZW decode failed` and rendered a blank first frame.
2. **Exact-color quantization for custom palettes.** The old low-nibble mask
   (`& 0xF0`) could map a flat paint color to a neighboring palette entry. Custom
   palettes now use full RGB with an exact-match memo; automatic palettes keep the
   old path.
3. **Do not allocate `allPixels` for custom palettes.** It was only needed for
   median-cut quantization, so the custom path now avoids a multi-megabyte copy.
4. **Validate frame dimensions** in `addFramePixels` and `makeGif`.
5. **Add `addFramePixels`** for deterministic RGBA buffers without canvas/DOM.
6. **Add the ES export** used by the drawing studio. The export builder strips the
   export line before embedding.

### Gate benchmark

Target: 3 frames, 1024×1024, five exact colors, delay 8 (80ms; the studio now
uses 25 = 250ms), no dither.

| | Before patches | After patches |
|---|---:|---:|
| Encode time (Node) | 276.8 ms | 159.1 ms |
| GIF size | 20,724 B | 20,738 B |
| External memory delta | ~14.2 MB | ~2.2 MB |
| ffmpeg decode | **LZW failure / blank** | **valid** |
| Frames | 3 | 3 |
| Rate | 12.5 fps | 12.5 fps |

Decision: targeted patches, no rewrite and no Worker. The fixed encoder is fast
enough for the studio's save action, the output is valid, and the auto-palette
igrama path is unchanged. A fixed 128×128 shapes fixture produced **byte-identical
auto-palette output** before and after the patches (`shapes-auto-128.gif`, 2,607 B).
A real Chrome studio save produced a valid 1,024×1,024, 3-frame, 250ms (4 fps)
GIF of 6,881 B using the project scheme and the largest brush. The 159 ms number above is Node 26 on arm64; Chrome's save is subjectively
instant. Safari/Firefox were not automated because Safari remote automation is
disabled on this machine and Firefox is not installed; the output is standard
GIF89a and is covered by the structural tests and ffmpeg.

### Validation

- `src/lib/MiniGif.test.js`: dimensions, frame count, delay, padded table size,
  clear code, determinism, and dimension errors.
- Manual: all custom-palette test GIFs decode cleanly with ffmpeg; the generated
  1024×1024 studio frame renders correctly.
