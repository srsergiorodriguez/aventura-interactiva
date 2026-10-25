# Testing — Aventura Interactiva

Status: proposed target, 2026-10-25.

## 1. Philosophy

Test the things that can be wrong in a way a human cannot see: document
serialization, graph invariants, compile output, export escaping, presentation
mapping, drawing geometry, and translation completeness.

Do not test pixels. Do not test layout. Do not snapshot DOM. Visual quality is
verified by the manual checklist in section 8, not by a test suite that breaks
every time a margin changes.

The app is small enough that a fast, deterministic unit suite plus a disciplined
manual pass is more valuable than a broad, brittle UI suite.

## 2. Tooling

Add as dev dependencies:

- `vitest` — test runner, Node environment for pure modules.
- `svelte-check` — Svelte/JS diagnostics.
- `fake-indexeddb` — IndexedDB adapter tests only.

Scripts:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "check": "svelte-check --tsconfig ./jsconfig.json",
  "build": "vite build"
}
```

- `npm run check` must pass before a task is considered done.
- `npm run test` must pass before a task is considered done.
- `npm run build` must pass before a sprint is considered done.
- CI (when added): `npm ci && npm run check && npm run test && npm run build`.
- Tests live next to the module as `*.test.js` under `domain/`, `export/`,
  `drawing/`, `persistence/`, and `i18n/`.
- No test may depend on network access, real time, real randomness, or a browser.

## 3. What is allowed

Only these categories are in scope:

1. **Pure document functions** — parse, migrate, serialize, validate, compile,
   stable IDs, start scene, scene/option/area commands.
2. **Pure export functions** — `buildStoryDocument`, `buildStoryCSS`, escaping,
   determinism, filename slugs.
3. **Pure presentation functions** — preset expansion, theme mapping, contrast
   checks, custom CSS validation.
4. **Pure drawing model** — seeded jitter, frame composition order, undo/clear,
   serialization. Not canvas pixels.
5. **Data adapters** — IndexedDB save/load round-trip with `fake-indexeddb`, quota
   error handling. Not UI.
6. **Message catalogs** — key parity, placeholder parity, no empty values.

## 4. What is forbidden

These tests are review blockers:

- Screenshot comparisons or visual regression tools.
- Playwright/Cypress assertions on layout, element positions, CSS, or responsive
  breakpoints.
- DOM snapshots and Svelte component snapshots.
- Assertions on CSS class names, computed styles, or exact markup structure
  (except stable semantic markers in the exported document, see below).
- Tests for Svelte Flow behavior, drag/drop, zoom, or minimap.
- Tests that require a real browser, canvas rendering, fonts, or images.
- Mocking Svelte internals or testing `$effect` timing.
- Tests for third-party library behavior.
- Coverage percentage targets. Cover the branches that protect data; do not chase
  a number.

Export tests may assert that a document **contains** a required element or escaped
sequence (e.g., `id="story-root"`, no raw `</script>` from user text). They must not
assert the full HTML string or byte-for-byte CSS. Determinism is tested by building
twice from the same snapshot and comparing outputs.

## 5. Test matrix

| Area | File | Must cover |
|------|------|------------|
| Project schema | `domain/project.test.js` | defaults; native parse; unknown version rejection; malformed input is all-or-nothing; project round-trip. |
| Legacy migration | `domain/project.test.js` | plain scene map; `display`; missing display → deterministic layout; options/areas → targets; fields preserved (`deadEnd`, `plop`, `title`, `scene`, `viz`, `meta`, unknown); start inferred once and stored. |
| Scene commands | `domain/scenes.test.js` | add scene; duplicate ID rejected; option add/remove with stable IDs; removing option 0 does not rewire option 1; area add/remove; set/clear target; deleting a scene clears or reports references; start set/clear. |
| Validation | `domain/validate.test.js` | no scenes; missing start; dangling option/area target; empty button; unreachable scene warning; external image warning. |
| Compile | `domain/compile.test.js` | editor fields stripped; engine fields preserved; `scene` targets from stable IDs; null targets omitted; runtime options; no mutation of project; data URLs shared by reference. |
| Presentation fonts | `domain/presentation.test.js`, `assets/fonts/font-data.test.js` | nine embedded woff2 families; unique stacks; unknown ids fall back to mono; selected font CSS and license are embedded in export. |
| Presentation | `domain/presentation.test.js` | preset expansion; manual edit → custom; theme mapping; CSS values escaped; contrast of all presets ≥ 4.5:1 for text/accent pairs. |
| Export | `export/document.test.js` | title/lang; `</script>` in text/grammar escaped; `</style>` in custom CSS escaped; deterministic output; start scene included; required page markers; builder is pure (shared by preview/export, verified in review). |
| i18n | `i18n/messages.test.js` | same keys in `en`/`es`; no empty values; same placeholders; `t()` interpolation; unknown key falls back and warns only in dev. |
| Autosave | `persistence/autosave.test.js` | save/load round-trip; snapshot is plain; quota rejection surfaces a typed error; clear removes current. |
| Drawing model | `drawing/model.test.js` | seeded jitter is deterministic; same seed + strokes = same frame plan; solid brush, textured brush, and eraser; texture pattern is deterministic; eraser restores background; erase-all; ten-step history restores strokes/erase-all; scheme roles; no anti-aliasing; serialization round-trip. |
| Drawing encode | `src/drawing/encode.test.js` | 3-frame GIF data URL; deterministic output; 128/256 test sizes; exact scheme colors; the real MiniGif adapter is exercised. |
| MiniGif | `src/lib/MiniGif.test.js` | fixed 5-color frame fixture produces a valid GIF header (dimensions, frame count, palette size, delay); deterministic bytes for fixed input; engine igrama compatibility fixture. |
| Files | `persistence/files.test.js` | project filename slug; wrong extension rejected; legacy `.json` accepted; no download side effects in tests. |

### 5.1 Required fixtures

Keep fixtures small; never commit the 4.2MB workshop story.

- `tests/fixtures/legacy-mini.json` — 3 scenes, options, one area, one image data
  URL, `deadEnd`, `plop`, a custom unknown field, and `display`. Used to prove
  lossless import.
- `tests/fixtures/project-mini.json` — native project with start, theme, grammar,
  and one drawing. Used for compile/export round-trip.
- `tests/fixtures/hostile-text.js` — scene text and title containing `</script>`,
  `</style>`, quotes, newlines, emoji, and accented characters.
- `tests/fixtures/drawing-mini.js` — 2 solid-brush strokes, 1 textured-brush stroke, 1 eraser stroke, known seed.

Fixtures are data, not generated at test time. If a fixture needs an image, use a
tiny 1×1 GIF data URL, not a workshop asset.

### 5.2 MiniGif gate tests

The MiniGif audit happens before the drawing UI. It is tested as data, not as a
browser canvas:

- Build frames as RGBA typed arrays directly and call `makeGif()` in Node.
- Parse the GIF header and graphic-control extensions to assert dimensions, frame
  count, palette size, and delay.
- Keep one fixture that represents the engine's igrama path; compare behavior after
  any optimization. Byte-for-byte comparison is allowed for a deliberate
  compatibility fixture, but must be updated only with a measured reason.
- The app adapter rejects zero frames, mismatched dimensions, and empty palettes with a localized error; the vendored behavior is documented.
- Encoding time and memory are **manual benchmarks**, recorded in `diary.md`; they
  are not CI assertions.

## 6. Determinism rules

- Domain functions must not call `Date.now()`, `Math.random()`, or `crypto.randomUUID()`
  directly. Inject an ID generator and a clock where needed, with deterministic
  defaults for tests.
- Drawing jitter uses a seeded PRNG stored in the stroke (`seed`). Rendering never
  calls `Math.random()`.
- Export functions must be deterministic for the same snapshot. No timestamps, no
  random keys.
- Tests use fake timers for debounce; never `sleep()`.

## 7. Regression cases that must stay fixed

These are the specific bugs found in the audit. Each gets a test:

1. Removing option index 0 must not cause the remaining option to point at the
   removed option's target.
2. Deleting an edge must clear the target, so the compiled scene does not retain a
   hidden branch.
3. Importing a scene with `deadEnd`, `plop`, `title`, `scene`, `viz`, or an unknown
   field must preserve it through compile and export.
4. The start scene must remain the same after moving nodes.
5. A story text containing `</script>` must not break the exported HTML.
6. Saving and loading a project must preserve theme, grammar, igrama, story
   language, start scene, and drawings.
7. A drawing must produce identical frame plans for the same source/seed.
8. All preset text/accent pairs must meet 4.5:1 contrast.
9. MiniGif's output for a fixed 5-color, 3-frame fixture keeps the same dimensions,
   frame count, delay, and palette after optimization; the igrama path still works.
10. MiniGif failures are mapped to localized editor messages, never surfaced as
    raw English console text or a silent empty image.

## 8. Manual QA checklist

Run before merging a sprint and before a release. Record the date and result in
`diary.md`.

### 8.1 Parity

1. Open a story with images, options, areas, and a theme.
2. Click playtest. In a second tab, export the HTML and open the file.
3. Compare at 1440×900 and 390×844: background, page width, padding, vertical
   alignment, font, text size, button layout, image frame, and spacing.
4. Change each presentation preset and a color; repeat. The preview must reflect
   the change on reload, and the export must match.
5. Check that the editor's font, buttons, and CSS do not appear inside the preview
   iframe.

### 8.2 Data safety

1. Import a legacy story with every engine field. Export it again; diff the scene
   JSON (ignore editor metadata).
2. Delete an option that has a wire; verify the remaining options still target the
   correct scenes.
3. Delete a wire; export; verify the target is gone.
4. Refresh the browser; the project is restored.
5. Save the project file, clear the site data, open the file; everything is
   restored.
6. **New Project → open `Por la ventana` five times in a row, rapidly.** Every
   time, verify all 27 scene nodes and all wires appear without reloading, at a
   fitted viewport. This is the regression check for the old Workspace remount
   race.
7. Move the start node; playtest; the story still starts at the marked scene.

### 8.3 Internationalization

1. Switch UI language; check all visible strings, placeholders, errors, and aria
   labels.
2. Set story language independently; export; verify `<html lang>`.
3. Trigger duplicate scene, no scenes, bad JSON, bad image, and missing target
   errors; all are localized and actionable.
4. Check Spanish text fits the 300px sidebar and modal headers.

### 8.4 Drawing

1. Draw with mouse and touch; verify line boil and no scroll while drawing.
2. Test the solid brush, the textured brush, the eraser, the size slider at all
   six positions, all six schemes, and the custom scheme editor.
3. Undo ten times; verify it walks back the last ten actions and then disables.
   Repeat with erase-all; verify the canvas returns and the action is undone.
   Confirm the GIF delay is 250ms (4 fps).
4. Save; verify the node thumbnail animates in color and the scene image renders.
5. Reopen the studio; the source is restored; make a change and save again.
6. Change the project color scheme in Settings; verify the preview and the studio
   paint colors match, then save and verify the GIF uses those colors.
7. Export; verify the GIF loops at 4 fps and the HTML is self-contained.
7. Measure file size and encode time; record both in `diary.md`; warn if a single
   drawing exceeds ~200KB.
8. Verify the undo label is localized as "undo" / "deshacer", never "oops".

### 8.5 Accessibility and resilience

1. Open every modal with keyboard; Tab/Shift+Tab stays inside; Escape closes; focus returns to the trigger.
2. Settings tabs respond to Left/Right/Home/End, and focus visibility is clear on all controls.
3. Area boxes and resize handles are keyboard-focusable; arrow keys move/resize; Shift uses a larger step.
4. Check color contrast of errors and muted text.
5. Disable network; reload the app (after first load) and open an export; both work
   with embedded fonts and no remote requests.
6. Try a corrupted project file; the app remains usable and the error is localized.
7. Check Chrome, Safari, and Firefox on macOS; check Safari on iPad if available.

## 9. Definition of done

A task is done only when:

- New pure logic has tests for its success, boundary, and failure paths.
- The regression cases it touches are covered.
- `npm run check`, `npm run test`, and `npm run build` pass.
- The relevant manual checklist items are run and recorded.
- Docs (`architecture.md`, `design-system.md`, `plan.md`) are updated if the
  behavior or contract changed.
- `diary.md` has an entry explaining what changed and why.

A sprint is done when the manual parity and data-safety sections pass on a project
with at least 20 scenes and 10 images, plus the drawing section when applicable.
