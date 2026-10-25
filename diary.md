# Diary — Aventura Interactiva

A running log for `agent-dev`. Read the latest entry before starting a task. Append
after every successful task: what changed, why, what was verified, and what is next.
Do not rewrite history; correct it with a new entry.

---

## 2026-10-25 — Audit, architecture, and plan (no code)

**Branch:** `agent-dev` (clean; same commit as `main` at the start).
**Scope:** understanding and planning only. No application code was written.

> Update: D1–D5 were confirmed later the same day, and the drawing tool details below
> were simplified. See the next entry. The audit findings still stand.

### What I read

- The full editor source: `App.svelte`, `Workspace.svelte`, `Sidebar.svelte`,
  `SceneNode.svelte`, `PreviewModal.svelte`, `OptionsModal.svelte`,
  `GrammarModal.svelte`, `AreaModal.svelte`, `state.svelte.js`, `helpers.js`,
  `i18n.svelte.js`, `app.css`, and the vendored `aventura.esm.js` /
  `MiniGif.js`.
- The Aventura library README (scenes, options, areas, images, igramas, grammar,
  `defaultCSS`, rendering classes).
- The workshop story `Por la ventana.json`: 27 scenes, 15 embedded images,
  14 animated GIFs, 4.24MB of base64 image data. This is the real workload.
- WigglyPaint's official page and the author's design essay. The relevant
  constraints are: three buffers/frames, ~12fps line boil, five colors, one-step
  undo, opinionated presets, no infinite combinatorics.

### What I verified in the running app

I ran the Vite app and inspected the board, inspector, options, grammar, and
playtest in headless Chrome. I also generated the export HTML from the same state
and opened it in a separate page.

Key measured finding: preview and export are not the same presentation.

- Preview story container: 600px wide, `padding: 0`, 2px black border, 6px hard
  shadow, top-aligned in the modal.
- Export story container: 600px wide, `padding: 32px 16px`, no border, no shadow,
  vertically centered in the viewport.

Other confirmed findings:

- `save JSON` exports only scene data. Theme, grammar, igrama, start, and language
  are not in the file.
- Removing option 0 leaves the remaining option compiled with the removed option's
  target while the edge handle still points elsewhere.
- Deleting a wire does not remove the target stored in the node data.
- Import drops `deadEnd`, `plop`, `title`, `scene`, `viz`, `meta`, and unknown
  fields; it also has a duplicate `image` key.
- No autosave, undo, or project persistence exists.
- Export interpolates JSON into a `<script>` without escaping.
- Preview injects the engine and theme CSS into the editor document and relies on
  a global `#storygeneraldiv`.
- UI tokens exist, but inline styles, duplicated modal CSS, hard-coded colors, and
  duplicated Svelte Flow overrides bypass them.
- All alerts, some placeholders, and the duplicate-scene error are hard-coded
  English; `t()` has no interpolation or key-parity safety; UI language and exported
  story language are the same setting.
- No tests, no `svelte-check`, no CI.
- MiniGif is duplicated in `public/` and `src/lib/`; the vendored engine has no
  version marker.

### What I wrote

- `architecture.md` — boundaries, target module map, project schema, invariants,
  one-renderer preview/export, persistence, drawing model, engine boundary,
  migration, decisions.
- `design-system.md` — editor tokens, components, strict anti-inline/anti-duplication
  rules, accessibility, story presets, drawing studio UI, i18n content rules.
- `testing.md` — only pure/data tests; explicitly forbids visual/layout tests;
  regression cases; manual parity/data/drawing QA.
- `plan.md` — release sequence and the active S1 checklist.
- `diary.md` — this entry.

### Decisions taken (pending user confirmation)

1. The editor remains browser-only. No native backend.
2. The canonical model is a `Project` document; Svelte Flow is a projection with
   stable option/area IDs (`opt:<id>`, `area:<id>`).
3. The start scene is explicit, stored, and shown on the canvas.
4. Preview and export share `buildStoryDocument()`; preview runs in an iframe from a
   Blob URL, not in the editor document.
5. Autosave uses IndexedDB; project files are `.aventura.json`; legacy story JSON
   remains importable.
6. UI language and story language are separate settings.
7. Drawing is an automatic 3-frame line-boil studio with a fixed 128×128 canvas,
   1024×1024 GIF export, five-color presets, four tools, and one-step undo.
8. Presentation is an app-owned model + CSS layered over the engine's default CSS;
   the engine is not forked for styling.

### Verification

- The app builds and runs (Vite 8, Svelte 5). The production build succeeds but emits
  accessibility warnings for labels that are not associated with their controls
  (OptionsModal and others), confirming the design-system finding.
- No repository files were changed before this docs round.
- The audit was performed against the running app and the real 4.2MB story.
- No automated tests exist yet, so this entry claims manual inspection only.

### Next

- Get confirmation on D1–D5 in `plan.md`.
- Start S1: harness, project model/migration, stable links/start/validation, store
  projection, IndexedDB autosave, and the shared renderer/iframe.
- Do not start presentation or drawing UI until S1's acceptance criteria pass.

---

## 2026-10-25 — Plan refined: decisions confirmed, simpler drawing, MiniGif gate

**Branch:** `agent-dev`.
**Sprint/task:** planning; no code.

### What changed

The author confirmed D1–D5:

- D1: automatic 3-frame line boil; no manual frames.
- D2: fixed 128×128 internal canvas, 1024×1024 GIF, 5-color palettes.
- D3: autosave and restore the last project.
- D4: native `.aventura.json` project file; legacy story JSON stays importable.
- D5: expand presentation customization beyond the current theme fields.

The drawing scope is **simpler than WigglyPaint** and supersedes the tool details in
the previous entry:

- Two drawing tools: a solid brush and a dithered/textured brush. Eraser. No fill.
- Three shared sizes; no ink/marker layers or under-painting.
- Five colors per palette: background plus four paints. Six presets, no custom
  colors, no transparency.
- One-step undo labeled "undo" / "deshacer", never "oops".
- Erase all clears immediately and is undoable; no confirmation dialog.
- Everything else stays constrained: fixed canvas, three frames, no timeline,
  onion skin, layers, or frame editing.

MiniGif gets a mandatory review gate before the drawing UI: baseline encode of
three 1024×1024 five-color frames, correctness/API audit, engine igrama
compatibility fixture, measured optimization only, and a documented decision. The
gate is in `plan.md` and `architecture.md` §12.1.

### Why

- The author wants the drawing studio to be quicker and less intimidating than
  WigglyPaint, not a clone.
- MiniGif is shared with the engine's igrama path, so unmeasured rewrites are risky.
- The encoder blocks the save action; its performance and palette handling need
  facts before the studio UI commits to them.
- The simplified tool set also reduces drawing-model and i18n surface area.

### Docs updated

- `architecture.md`: drawing model/tools/palette, MiniGif review gate, out-of-scope,
  migration sequence, decisions log.
- `design-system.md`: drawing studio wireframe and palette, undo/erase-all behavior,
  tool names, no fill/layers.
- `testing.md`: drawing model/encode tests, MiniGif data tests, regression cases,
  manual drawing QA.
- `plan.md`: confirmed decisions, pre-S3 MiniGif gate, confirmed drawing scope,
  release criteria.

### Verification

- Documentation-only change. No application code, no dependency changes, no build
  changes.
- No tests exist yet; this remains a planning artifact.
- The plan is ready for a final go-ahead, then S1.

### Next

- Wait for the author's final "start" confirmation.
- Begin S1.1/S1.2: harness, project document, migration, fixtures.
- Do not start MiniGif work until S3; do not start presentation UI until S2.

---

## 2026-10-25 — S1 foundation: document, compiler, builder, autosave adapter

**Branch:** `agent-dev`.
**Sprint/task:** S1.1–S1.3, plus the pure parts of S1.5/S1.6.

### What changed

Added the app's pure foundation without wiring it to the running UI yet:

- `src/domain/project.js` — native project schema/defaults, legacy migration,
  parse/serialize, deterministic layout, stable start, timestamp touch.
- `src/domain/scenes.js` — add/update scene, options and areas with stable IDs,
  target set/clear, image replacement, whole-area replacement, start set, scene
  deletion that clears references.
- `src/domain/compile.js` — pure project → Aventura scenes/options compile.
- `src/domain/validate.js` — missing start/targets, empty labels/text, external
  images, unreachable scenes.
- `src/domain/presentation.js` — presentation model/defaults and engine theme map.
- `src/export/escape.js`, `presentation-css.js`, `document.js` — one shared story
  document builder with script/style/title escaping and an iframe-ready page shell.
- `src/persistence/autosave.js` — IndexedDB adapter for the current project.
- `src/**/*.test.js` and `tests/fixtures/*` — 66 tests covering migration, stable
  links, deletion, compile, validation, export, presentation, and IndexedDB.

Tooling:

- `vitest`, `svelte-check`, `fake-indexeddb`.
- `npm test`, `npm run test:watch`, `npm run check`, `npm run verify`.
- `// @ts-check` on the new pure modules; `svelte-check` reports 0 errors.

### Why

- The audit's data-loss and rewiring bugs live in the document layer. Fixing them
  first means the drawing/presentation sprints build on stable IDs and one source
  of truth.
- The shared document builder is the only way to guarantee preview/export parity;
  it is now tested independently of Svelte.
- The autosave adapter is tested before it is wired to the store, so quota/IDB
  failures can be handled deliberately.

### Verification

- `npm test`: 66 passed, 9 files.
- `npm run check`: 0 errors, 29 pre-existing accessibility warnings in old
  components.
- `npm run build`: passes (Vite 8).
- Imported the real `Por la ventana.json` (27 scenes, 41 options, 14 embedded GIFs,
  4.25 MB): parse 22 ms, compile 1 ms, 0 validation errors, 0 warnings. Data URLs
  are shared, not deep-cloned.
- Built a 4.31 MB standalone document from that story with the new builder and
  rendered it in headless Chrome; the scene image, text, and options display
  correctly with `adventureContainer: "story-root"`.
- No UI behavior has changed yet. The app still uses `state.svelte.js` and the old
  preview/export paths.

### Not done

- S1.4 store/flow projection and SceneNode/Sidebar migration.
- S1.5 boot restore, New/Open/Save UI, debounced autosave wiring, status toast.
- S1.6 PreviewModal iframe, export/download through the new builder, removal of the
  engine-in-editor path.
- S1.7 manual parity/data QA on the workshop story.

### Notes

- `runtime.igramaFormat` was added to the project because the engine needs it and
  the old options object had it; it is `png` by default.
- Presentation now includes a `shape` section for button border, container border,
  and radius, preserving the engine theme fields.
- The builder includes MiniGif only when `igrama` is present and
  `igramaFormat === 'gif'`; the app-facing MiniGif source will be wired in S3.
- The 29 check warnings are pre-existing label/association issues; the design
  system migration in S4 removes them.

### Next

- S1.4: refactor the session store, project the flow from the document, and move
  SceneNode/Sidebar off nested mutation.
- Then S1.5/S1.6: boot/autosave UI and the iframe preview/export path.
- Do not start presentation or drawing UI before S1 acceptance.

---

## 2026-10-25 — S1 integrated: one document, one renderer, autosave

**Branch:** `agent-dev`.
**Sprint/task:** S1.4–S1.7.

### What changed

- Replaced the old `aventuraState` singleton with a session store in
  `state.svelte.js`: one `Project`, flow projection, explicit actions, autosave,
  project files, export, validation, and a boot lifecycle.
- `Workspace` now binds to projected nodes/edges. Node data carries only
  `{sceneId}`; `SceneNode` derives from the project. Connections use
  `opt:<id>`/`area:<id>` handles. Edge and node deletion route through the store.
- `Sidebar` uses the store actions, adds a start badge/action, autosave status,
  native project open/save, localized errors, and a Toast instead of alerts.
- `PreviewModal` builds a Blob from `buildStoryDocument()` and renders it in an
  iframe. It has a reload button and revokes the URL on close. No engine DOM or
  theme CSS enters the editor.
- `OptionsModal` now edits `presentation`, `runtime`, and `igrama` in the project
  instead of the old options object. `GrammarModal` edits `project.grammar`.
  `AreaModal` edits a scene's areas through the stable-ID command.
- Added `domain/flow.js`, `lib/engine.js`, `ui/Toast.svelte`, `ui/toast.svelte.js`,
  `lib/error-message.js`, i18n interpolation, and new EN/ES strings.
- Removed the duplicate `public/MiniGif.js` and the script tag from `index.html`.
  The vendored MiniGif is now a single raw source behind `lib/engine.js`.
- Legacy story import is the primary open path; native `.aventura.json` is the
  primary save. Story JSON export was deferred.

### Why

- The document and preview/export paths must be single-source before presentation
  and drawing features can be safe.
- Autosave plus a real project file removes the workshop's biggest data-loss risk.
- Stable IDs and target-based edges fix the option-removal/rewire bugs found in the
  audit.
- An iframe is the only reliable way to prevent editor CSS from touching the
  story.

### Verification

- `npm test`: 70 passed, 10 files.
- `npm run check`: 0 errors, 12 warnings (old modal markup and non-reactive refs;
  S4).
- `npm run build`: passes.
- Imported `Por la ventana.json` through the UI: 27 scenes, 41 options, 14
  embedded GIFs.
- Opened/edited a scene, waited for autosave, reloaded: text and project restored.
- Opened the native project file: 27 scenes, start `inicio`, dark presentation
  color restored.
- Removed option 0: option count went 2→1 and the rendered edge count dropped by
  one. Deleted an edge through the store: `target` became `null`, edges 41→40.
- Changed start to `paloma`: badge moved and preview used the new start. Set it
  back to `inicio`.
- Changed the background to `#101010`; preview body computed `rgb(16, 16, 16)`.
- Preview vs export: both 4,311,680 bytes and SHA-256
  `3dacd1638f132bcb9b31136927583719011074e927248f0ddf23cbec06dbb550`.
- New project: one `inicio` scene, start badge, saved state.
- UI language switched to English: labels, start badge, and save state changed;
  story language remained independent.

### Known notes

- Svelte Flow logs dev-only `$state.raw` suggestions for nodes/edges. Nested raw
  state is invalid in this store shape; no functional impact at workshop sizes.
- The 12 remaining `svelte-check` warnings are old modal/label/ref issues slated
  for S4.
- The current canvas may fit before image dimensions settle on very large stories;
  the Controls fit button is available. Consider a post-image fit in polish.

### Next

- S1 is complete. Write the S2 Presentation checklist before code.
- S2 must preserve the byte-identical preview/export check.
- Then S3 MiniGif gate + drawing studio.

---

## 2026-10-25 — S2 presentation: presets, metadata, settings tabs

**Branch:** `agent-dev`.
**Sprint/task:** S2.1–S2.6.

### What changed

- Added six curated presets to `domain/presentation.js`: Papel, Fósforo,
  Cianotipo, Pulpa, Noche, Menta. Each sets eight colors, a font, and a legible
  button border while preserving layout, image frame, button layout, and custom
  CSS.
- Added stale-preset normalization: if a project says "papel" but its colors no
  longer match, it becomes `custom`. Manual presentation edits always become
  `custom`.
- Replaced `OptionsModal.svelte` with `SettingsModal.svelte`:
  - **Story**: title, author, story language, typewriter speed, back/restart,
    adventure scroll.
  - **Presentation**: preset cards, eight colors, font, size, line height, text
    alignment, page width, page padding, vertical alignment, button layout, image
    frame, and shape fields.
  - **Advanced**: eval-tags warning, custom CSS, igrama upload/format.
  - Footer closes or opens the playtest; the settings modal closes first.
- Added store actions `applyPresentationPreset`, `updateStoryMeta`, and
  `updateStoryLanguage`.
- Added EN/ES strings for every new control, preset, hint, and warning.
- Story title/author now drive `<title>` and `<meta name="author">`; story
  language drives `<html lang>` independently from the editor UI language.
- No new application dependency.

### Why

- Presentation was the second requested feature; S1's one-renderer model makes
  it safe to expose more controls.
- Presets keep the workshop barrier low while still allowing detailed changes.
- Story language must be decoupled from UI language for correct exported
  metadata.
- Custom CSS must remain an advanced story-only escape hatch, never editor CSS.

### Verification

- `npm test`: 77 passed, 10 files.
- `npm run check`: 0 errors, 12 warnings (old modal/label/ref issues; S4).
- `npm run build`: passes.
- Six presets; contrast and layout-preservation tests.
- Noche changed bg/text/button border; manual edits switched the state to
  `personalizado`.
- Story metadata (`Test Story`, `Tester`, `en`) survived autosave and reload.
- Preview computed: lang `en`, title/author meta, `rgb(18,18,18)` background,
  720px page, 16px padding, stacked buttons, no image frame, Georgia font,
  centered text.
- Custom CSS `body { background: #123456; }` changed the story iframe to
  `rgb(18,52,86)` while the editor stayed white.
- Preview vs export: both 4,311,715 bytes and SHA-256
  `05941dfb049497e6fe8cdc5f9b225aa50fdc1eaf28698001de3b414fa9e28e9b`.
- Settings fits 390×844 without horizontal overflow (362px modal, three tabs).
- Native project file preserved title/author/language, `noche`, 720px/top layout,
  typography, custom CSS, stacked buttons, and no image frame.

### Notes

- Live side-by-side presentation editing is deferred; the settings footer's
  playtest button is the current loop.
- The editor itself remains desktop-first; the exported story and settings modal
  work at phone width.
- `OptionsModal.svelte` is gone. No references remain.
- The 12 check warnings are still the old AreaModal/Sidebar label and ref issues.

### Next

- S3 starts with the MiniGif gate (baseline, correctness/API, compatibility,
  measured optimization decision). No drawing UI before the gate closes.
- After the gate: the simplified two-brush + eraser studio, erase-all, one-step
  undo, fixed 128→1024, six 5-color palettes.

---

## 2026-10-25 — Follow-up: New Project is always visible

**Branch:** `agent-dev`.
**Task:** usability follow-up after loading `Por la ventana`.

### What changed

- Moved the New Project action from the creator panel (only visible when no scene
  was selected) to the sidebar footer, always reachable above Open/Save/Export.
- The action still asks for confirmation and creates a fresh project with one
  `inicio`/`start` scene, default settings, and a saved autosave state.
- No other UI or data behavior changed.

### Why

- After loading a large story, clearing it required returning to the canvas with
  nothing selected. That was not discoverable.
- The footer is the project-level action area, so New Project belongs there.

### Verification

- `npm run check`: 0 errors, 12 old warnings.
- `npm run build`: passes.
- Existing New Project flow was already exercised in S1/S2 (one start scene,
  saved state, remount); only its location changed.

### Note on the reported failure

The clean Chrome dev and production runs both imported `Por la ventana` (27
scenes), previewed it, navigated from `una paloma` to `Continuar`, and exported a
standalone file. The user confirmed a reload fixed it. The likely cause was stale
Vite HMR after a transient invalid `$state.raw` edit during development; a hard
refresh is the fix.

### Next

- S3: MiniGif gate, then the drawing studio.

---

## 2026-10-25 — Fix: canvas stayed on the previous project's viewport

**Branch:** `agent-dev`.
**Trigger:** pressing New Project, then loading `Por la ventana`, showed only the
first scene until the tab was reloaded.

### What changed

- Added `ViewportFitter.svelte`, mounted inside `SvelteFlow`. On each Workspace
  mount it fits at once, then again after 250ms and 1s so image dimensions have
  settled.
- Set `maxZoom: 1` for the fit (a one-node project should not zoom to 200%).
- Set `minZoom={0.15}` on the flow so the 27-scene workshop graph can actually fit
  in the viewport instead of being clamped at 50%.
- Removed the `fitView` prop; the explicit fitter is the single behavior.

### Why

The 27 scenes were loaded in the document, but the canvas retained the previous
single-node viewport/zoom. A reload remounted the flow and looked correct, which
made it look like an import failure. The graph was never incomplete.

### Verification

- New Project → load `Por la ventana`: 27 nodes, fit transform
  `translate(342.981px, 184.465px) scale(0.193841)`, all 27 visible in the
  1440×757 viewport.
- New Project alone: one node at scale 1 (not 2).
- Direct load/reload still works.
- `npm run check`: 0 errors, 12 old warnings.
- `npm run build`: passes.
- `npm test`: 77 passed.

### Next

- S3 MiniGif gate, then drawing studio.

---

## 2026-10-25 — New Project choice: demo or blank

**Branch:** `agent-dev`.
**Trigger:** the default three-scene demo was overwritten by autosave and could not
be recovered.

### What changed

- Added `NewProjectModal.svelte`, opened by the existing footer **proyecto nuevo**
  button. It offers:
  - **historia de ejemplo** — restores `createDemoProject()` (three original scenes).
  - **proyecto en blanco** — one empty `inicio`/`start` scene.
  - cancel.
- `newProject(mode)` now accepts `'blank'` or `'demo'`; both replace the current
  project and immediately autosave the new state.
- No extra sidebar button was added; the footer still has one New Project action.
- Added EN/ES strings for the question, both choices, hints, warning, and cancel.

### Why

- Autosave is correct, but it makes an implicit starter project irrecoverable.
- The demo is generated code, so it should be offered as a recoverable example, not
  stored as precious state.
- A two-choice modal is clearer than another footer button and adds no permanent
  chrome.

### Verification

- New Project opens the dialog with exactly two choices.
- **historia de ejemplo** → 3 nodes and the original text/options.
- **proyecto en blanco** → 1 empty `inicio` scene.
- `npm test`: 77 passed.
- `npm run check`: 0 errors, 12 old warnings.
- `npm run build`: passes.

### Next

- S3 MiniGif gate, then the drawing studio.

---

## 2026-10-25 — S3: MiniGif gate + constrained drawing studio

> Superseded by the S3 refinement entry below: 8fps, size slider, tool icons,
> ten-step undo, and the project palette.

**Branch:** `agent-dev`.
**Sprint/task:** S3.0 gate, drawing model, studio, integration, QA.

### MiniGif gate (before UI)

The gate found a real correctness bug: with a five-color custom palette, MiniGif
pads the GIF color table to eight entries but wrote the LZW clear/EOI codes as
`palette.length` (5/6) instead of `1 << minimumCodeSize` (8/9). All custom-palette
GIFs were structurally corrupt; ffmpeg reported `LZW decode failed` and rendered a
blank frame. Auto-palette output worked because 256 colors need no padding.

Targeted patches:

- correct clear/EOI codes for padded custom palettes;
- full-RGB exact-color memoization for custom palettes (the old low-nibble mask
  could map a paint to a neighboring color);
- skip the unused `allPixels` copy for custom palettes;
- validate frame dimensions in `addFramePixels`/`makeGif`;
- add `addFramePixels` (raw RGBA, no DOM) and the ES export.

Measurements, 3×1024×1024, five colors, 80ms:

| | Before | After |
|---|---:|---:|
| Encode | 276.8 ms | 159.1 ms |
| Output | 20,724 B, corrupt | 20,738 B, valid |
| External delta | ~14.2 MB | ~2.2 MB |
| ffmpeg | LZW failure | clean |

Auto-palette igrama fixture output is byte-identical before/after. Chrome studio
save produced a valid 1,024×1,024, 3-frame, 12.5 fps GIF of 8,396 B. Safari/Firefox
were not automatable here (Safari remote automation disabled, Firefox absent); this
limitation is recorded in `VENDOR.md`.

### Drawing model and studio

- `drawing/model.js`: six five-color palettes (background + four paints), seeded
  three-frame line boil, solid brush, one fixed checker/textured brush, eraser,
  three shared sizes, pure frame-index rendering, exact RGBA nearest expansion.
- `drawing/encode.js`: 1024×1024 GIF data URL via MiniGif `addFramePixels`.
- `DrawingStudio.svelte`: 128×128 canvas shown at 4× (pixelated), live 80ms loop,
  palette/tool/size controls, one-step undo, immediate erase-all (undoable), no
  confirm dialogs, cancel/save.
- Sidebar image section now offers **dibujar** or **editar dibujo**. Saving stores
  both `scene.drawing` and the GIF in `scene.image`; replacing/removing the image
  clears the source. Aventura compile and HTML export strip `drawing`; the project
  file keeps it.
- EN/ES strings for all studio UI and palettes; no hard-coded English.
- No fill, layers, timeline, onion skin, custom colors, or transparency.

### Verification

- `npm test`: 93 passed, 13 files.
- `npm run check`: 0 errors, 12 old warnings (AreaModal/Sidebar; S4).
- `npm run build`: passes.
- Solid stroke 160 non-background pixels; undo returned to 0; textured Noche
  stroke saved; reopened the source; reloaded and saw the GIF + edit button.
- Generated GIF: 8,396 B, 1024×1024, 3 frames, 12.5 fps; all frames differ (line
  boil); ffmpeg decodes.
- Export: includes GIF data URL, no `drawing` source; preview shows the image.
- Studio fits 390×844 without horizontal overflow.
- Native project file includes the drawing source.

### Notes

- `VENDOR.md` is the encoder memory: upstream URL, patches, benchmark, limits.
- The MiniGif fix also repairs custom-palette igrama GIFs.
- S4 remains: primitive migration, full i18n/a11y audit, Safari/Firefox QA,
  release checklist, docs, merge to main.

### Next

- S4 coherence and release. No new feature work without a plan update.

---

## 2026-10-25 — S3 refinements: project palette, 8fps, slider, icons, 10 undos

> Superseded by the unified-scheme entry below. There is no longer a separate
> seven-palette drawing picker.

**Branch:** `agent-dev`.
**Trigger:** workshop feedback after the first S3 pass.

### Changes

- **Animation speed:** `DRAWING_DELAY` changed from 8 (80ms, 12.5 fps) to 12
  (120ms, 8.3 fps). Both the live canvas interval and the exported GIF use 12.
- **Size slider:** replaced the three size buttons with a range input (1–3) and a
  visible numeric value. The brush/eraser sizes remain 2/4/6 internal pixels.
- **Tool icons:** added inline SVG brush, dotted/textured brush, and eraser icons
  next to their labels. Icons are `aria-hidden`; the text remains the accessible
  name.
- **More undo:** replaced the one-step snapshot with a ten-entry history. Each
  stroke and erase-all pushes a snapshot; undo walks back up to ten actions.
  Disabled buttons now have a shared `.btn:disabled` treatment.
- **Project palette:**
  - Added `project.palette.colors` = `[background, ink, accent, support, highlight]`
    to the native project schema with a Tinta default for old/legacy projects.
  - Settings → Presentation has five color pickers and **aplicar al tema**.
  - `presentationWithPalette()` maps the five colors to the eight story theme
    colors; accent/button text is chosen with WCAG luminance (`contrastText`).
  - The drawing studio now has seven palettes: the project palette first, then the
    six fixed presets. New drawings default to `paletteId: 'project'`; encoding
    resolves the project colors.
  - Project files/autosave include the palette; export includes the rendered GIF.

### Verification

- `npm test`: 99 passed, 13 files.
- New tests: contrast/mapping, project palette sorting/fallback, project GIF
  colors, and a Graphics Control Extension assertion for delay 12 (120ms).
- Settings: changed the project palette to dark/white/cyan/orange/pink and clicked
  **aplicar al tema**; preview computed background `rgb(16,20,24)`, text
  `rgb(245,245,245)`, button `rgb(255,159,28)` with black text.
- Studio: 7 palettes, project active; canvas background `[16,20,24]`; slider value
  2→3; 3 tool icons.
- Drew 11 one-point strokes, pressed undo 10 times: one stroke remained and undo
  became disabled (history cap 10).
- Saved project drawing: `paletteId: 'project'`, `delay: 12`, 1 stroke;
  GIF 5,790 B, 1024×1024, 3 frames, PIL reports duration 120ms, colour table
  `#101418/#f5f5f5/#7bdff2/#ff9f1c/#ff5d8f`.
- Export still omits `drawing`; preview/export share the applied theme.

### Notes

- Existing drawings saved with an old palette keep their GIF until reopened and
  saved again; changing project palette colors does not rewrite existing GIFs.
- The project palette is for the story theme and studio, not the editor chrome.
- S4 remains the coherence/release pass.

---

## 2026-10-25 — S3 final feel pass: 4fps, six sizes, tamer boil, styled selects

**Branch:** `agent-dev`.
**Trigger:** last workshop feedback on animation speed, wiggle, brush range, and
the Settings selectors.

### Changes

- **4 fps:** `DRAWING_DELAY` is now 25 centiseconds = 250ms. Live loop and exported
  GIF both use 250ms.
- **Tamer wiggle:** removed per-point random radius variation and the old 50/25/25
  point jitter. Each frame now shifts a whole stroke by at most one internal pixel
  (with 55% chance of no shift), with only a 10% chance of a single-point nudge.
  The three frames still differ, but the stroke edges stay coherent.
- **Six brush sizes:** slider range 1–6, mapping to 2/4/6/8/10/12 internal pixels;
  normalization clamps stroke sizes to 1–6. The visible value is the 1–6 position.
- **Settings selectors:** added app-wide select styling (`appearance: none`, paper
  background, ink border, custom chevron, accent focus) and color-input styling
  matching the existing fields. This covers all selects in ajustes.

### Verification

- `npm test`: 100 passed, 13 files.
- Chrome studio save with size 6: 7,786 B GIF, 1024×1024, 3 frames, PIL reports
  duration 250ms (exactly 4 fps).
- Frames differ (line boil) but the largest deltas are modest; no jitter returned.
- Settings select computed style: `appearance: none`, custom SVG background,
  35px height, ink border, accent focus.
- Slider min/max 1/6; largest brush visibly paints a much wider stroke.
- `npm run check`: 0 errors, 12 old warnings; build passes.

### Next

- S4 coherence/release.

---

## 2026-10-25 — One color scheme for story and drawing

**Branch:** `agent-dev`.
**Trigger:** story UI schemes and drawing palettes were separate systems; the
drawing studio let authors choose a palette that did not match the story.

### Design

- The six presets are now **five-color schemes**: background, ink, accent, support,
  highlight. They contain no typography or border data.
- `project.palette` is `{ presetId, colors }`. Selecting a scheme in Settings sets
  that palette and maps it to the eight story-theme colors
  (`presentationWithPalette`): support becomes the button background, hover uses
  ink/background, accent/button text is contrast-derived, and the button border is
  ink.
- Typography, layout, buttons, image frame, and custom CSS are preserved when a
  scheme is applied. The separate eight "base color" pickers were removed; the
  project palette is the single color source.
- Editing one of the five colors creates a custom scheme and applies it
  immediately to preview and drawing. There is no Apply button.
- The drawing studio has **no palette picker**. It shows the four paint swatches
  from the current project scheme and uses its background. `DrawingDoc` no longer
  stores `paletteId`; old sources are normalized to the current scheme.
- Loading a project syncs presentation colors from its palette, so an older file
  cannot show a story theme and drawing scheme that disagree.

### Verification

- Settings: 6 scheme cards × 5 swatches; Papel active by default; no base color
  section; 5 custom color inputs.
- Selecting Noche: palette `#121212/#f2f2f2/#ffcc00/#ff6b9d/#5bc0eb`; preview
  background `rgb(18,18,18)`, text `rgb(242,242,242)`, button
  `rgb(255,107,157)` with black text.
- Editing accent to `#ff00ff`: scheme becomes custom; preview and studio update
  immediately; studio paint swatches are white/magenta/pink/blue.
- Studio: 0 palette cards, 4 paint swatches, project background; saved drawing
  source has no `paletteId`; GIF is 1024×1024, 3 frames, 250ms.
- `npm test`: 99 passed.
- `npm run check`: 0 errors, 12 old warnings.
- Build passes.

### Notes

- Existing GIFs are baked pixels; changing the scheme does not rewrite them until
  the drawing is reopened and saved.
- The scheme applies to the preview/export story and the drawing studio, not the
  editor chrome.
- Historical diary entries describing six drawing palettes and a separate project
  palette are superseded by this entry.

---

## 2026-10-25 — Fix: import showed only the first scene after New Project

**Branch:** `agent-dev`.
**Symptom:** New Project (blank, one node), then open `Por la ventana` (27 scenes):
the editor showed only the first scene until a page reload.

### Root cause

`App.svelte` wrapped `<Workspace />` in `{#key app.projectEpoch}`. On import,
`adoptProject()` set the project and canvas to the 27 imported nodes, then the key
change destroyed the old Workspace. During teardown, the old Svelte Flow instance
wrote its stale one-node `bind:nodes` back into `canvas.nodes`; the new Workspace
bound to that stale array. The project itself was fine, which is why a reload —
creating a fresh flow from the project — appeared to fix it. The earlier viewport
fitter addressed zoom but could not recover lost node data.

### Fix

- Removed the keyed remount from `App.svelte`; the Workspace and Svelte Flow
  instance are long-lived.
- `Workspace` resets its bound viewport once per `projectEpoch`, using `untrack` so
  `saveViewport` cannot re-trigger the effect.
- `ViewportFitter` now takes `resetKey={app.projectEpoch}` and re-runs its fit on
  project replacement. Fit calls are scheduled with timers, not run synchronously
  inside the effect (synchronous `fitView` updates bound node measurements and can
  cause an effect-depth loop).
- `projectEpoch` now means “reset viewport/refit”, not “remount workspace”.

### Verification

- Five rapid cycles (40ms after blank, 500ms after load) and the earlier five with
  normal waits: blank showed 1 node; every load showed 27 nodes, transform
  `translate(342.981px, 255.965px) scale(0.193841)`, all 27 visible.
- Direct load also shows 27.
- No `effect_update_depth_exceeded`; console clean.
- No page reload needed.
- 99 tests pass; check 0 errors; build passes.

### Regression guard

`testing.md` 8.2 now requires five rapid New Project → open `Por la ventana` cycles
with all 27 nodes and wires visible and no reload.

---

## 2026-10-25 — More story fonts

**Branch:** `agent-dev`.
**Trigger:** the story typography selector offered only mono, serif, and sans.

### Changes

- Expanded `FONT_STACKS` from 3 to 9 curated **system** stacks, with no webfont
  download:
  - `mono`, `book`, `sans`
  - `grotesk` (Helvetica/Arial)
  - `humanist` (Segoe/Tahoma/Verdana)
  - `rounded` (Avenir/Trebuchet)
  - `typewriter` (Courier)
  - `palatino` (Palatino/Book Antiqua)
  - `school` (Comic Sans/Chalkboard with cursive fallback)
- Added all nine to the Settings font selector with EN/ES labels. Renamed the
  Spanish field label to **fuente** so it no longer repeats the section heading
  **tipografía**.
- Preview/export still share `presentationToEngineTheme()` and the same map; no
  per-font CSS or extra asset path. The selected id is persisted in the project.
- Added a data test: nine distinct stacks, generic fallback on every stack,
  `school` resolves for the engine, unknown ids fall back to mono.

### Verification

- Selector lists 9 options.
- Selected `typewriter`; preview `.storyp` computed font is
  `"Courier New", Courier, "Nimbus Mono PS", monospace`.
- Project file has `typography.font: "typewriter"`; after reload the selector still
  shows typewriter.
- `npm test`: 100 passed.
- `npm run check`: 0 errors, 12 old warnings.
- Build passes.

### Notes

- Fonts are deliberately system stacks, not remote Google Fonts, so export remains
  self-contained and offline-safe. Exact rendering may vary slightly by platform
  because the stacks resolve to installed fonts.

---

## 2026-10-25 — Self-hosted Google Fonts + licenses

**Branch:** `agent-dev`.
**Trigger:** system font stacks assume the user's OS has the same fonts, so exports
were not visually portable.

### Fonts

- Downloaded nine OFL families from Google Fonts as latin woff2:
  Inconsolata, EB Garamond, Inter, Space Grotesk, Source Sans 3, Nunito, Courier
  Prime, Crimson Pro, and Patrick Hand.
- Files live in `src/assets/fonts/`; each font's copyright + full OFL text lives
  in `licenses.json` / `OFL.txt`.
- `font-data.js` imports the woff2 with Vite `?inline`, so the exact same bytes are
  available as data URLs. The story document embeds only the selected family's
  `@font-face` rules; preview and export share byte-identical HTML.
- The selected font's copyright and full OFL text are included in the exported
  HTML as a comment. No Google Fonts requests at runtime.
- The editor's own Inconsolata is now local (`mono.woff2`); removed the Google
  Fonts `@import`.
- Settings labels now show the actual family names.
- The footer has a **licencias** link opening a modal with all nine fonts, their
  copyrights/sources, full OFL, and MIT notices for Svelte, Svelte Flow, and
  MiniGif.

### Verification

- Editor: `document.fonts.check('16px Inconsolata') === true`; no Google requests
  in the network log.
- Selected EB Garamond: preview `.storyp` computes
  `"EB Garamond", Georgia, ...`, and the preview iframe reports the font loaded.
- Export: 129,529 B for the demo, contains `@font-face`, EB Garamond data URL, the
  OFL notice, and no `fonts.googleapis.com`.
- Licenses modal: 9 font entries + 3 software entries, 2 full-license sections.
- `npm test`: 104 passed, 14 files.
- `npm run check`: 0 errors, 12 old warnings (reference files are excluded in
  `jsconfig.json`).
- Build passes; bundle is ~843 kB minified / 442 kB gzip because all font data is
  bundled for selection. This is acceptable for now; S4 can code-split export-only
  font data if needed.

### Notes

- Fonts are embedded, not remote; exports work offline and on any OS.
- The app has no separate EULA; the modal lists the open-source font/software
  notices and the application credit.

---

## 2026-10-25 — Live font preview in Settings

**Branch:** `agent-dev`.
**Trigger:** choosing a font by name alone did not show what it looked like.

### Change

- The typography field is now a two-column row on desktop: the font `<select>` on
  the left and a bordered sample card on the right.
- The card renders “Había una vez…” / “Once upon a time…” in the **actual selected
  embedded font**, with a small preview caption and the family name. It updates
  immediately when the selector changes.
- All nine story fonts are also declared as `@font-face` in the editor (from local
  woff2 files), so the preview is not a fallback system font. Stacks collapse to one
  column below 620px.

### Verification

- Inconsolata, EB Garamond, Patrick Hand, and Crimson Pro previews all report the
  expected computed family and `document.fonts.check(...) === true`.
- Screenshot at 1440×900 shows the selector and sample side by side.
- `npm run verify`: 104 tests pass, check 0 errors, build passes.

---

## 2026-10-25 — S4: modal primitive, zero warnings, release metadata

**Branch:** `agent-dev`.

### Source cleanup

- Removed 68 copied reference files from `src/` after confirming every one was
  byte-identical to its `motivomotivoForReference` counterpart. This included the
  Motivo components, routes/stores, reference libs, reference font set, and
  `InterTight.ttf`. `jsconfig` no longer needs exclusion rules.

### Shared modal

- Added `src/ui/Modal.svelte`: single backdrop, header/footer snippets, sizes,
  focus trap, Escape close, focus restoration, and body scroll lock.
- Migrated all seven dialogs: Settings, Drawing, Preview, New Project, Licenses,
  Areas, Grammar.
- Preview keeps its reload action through a `headerActions` snippet; Drawing and
  Areas use a flush body.

### Accessibility / warnings

- SceneNode now has button semantics and `aria-pressed`.
- Area inputs have associated labels; the image map has a role/label; areas and
  resize handles are keyboard-focusable and arrow-key adjustable.
- Sidebar group labels are non-label text; option inputs/remove buttons have
  accessible names.
- Settings tabs use roving tabindex plus Left/Right/Home/End navigation.
- Document `<html lang>` follows the editor locale.
- Static inline styles removed from Sidebar/Area; canvas geometry remains dynamic.
- `svelte-check`: **0 errors, 0 warnings**.

### Release metadata

- Replaced the Svelte template README with application docs and QA status.
- `index.html` title is now “Aventura Interactiva”; package version **2.1.0**.
- Font/software licenses remain available through the footer **licencias** dialog.

### QA

- Chrome: every modal opens, traps focus, closes on Escape, restores focus to the
  trigger, and retains its layout. Settings, Drawing, Area, Preview, Licenses,
  New Project, and Grammar checked.
- 104 tests pass; build passes.

### Final release pass on `Por la ventana`

- 27 scenes imported; all 27 visible/wired; native project saved with 27 scenes,
  format/version/palette/font preserved.
- Autosave + reload restored 27 scenes.
- English UI and `<html lang>` checked, then Spanish restored.
- Six schemes × five swatches, custom palette, and live font preview checked.
- Preview and export were byte-identical: **4,355,150 bytes**, SHA-256
  `d75b3f7dc868849ce1bdcda015564021c4d737dc172dea34c329f12ed7bf08f2`.
- Export contained 15 GIF data URLs, no editable drawing source, no Google Fonts.
- Drawing: drew and saved on a real scene, reopened the source, then re-imported
  the original story and verified 27 scenes / 14 images.
- Mobile 390px: no horizontal overflow, sidebar 302px.
- No browser console errors.
- `motivomotivoForReference/` deleted.
- Safari/Firefox testing deferred by the owner.

- Release candidate is `2.1.0`; committed on `agent-dev`, fast-forwarded to `main`,
  and tagged **v2.1.0** locally.

---

## 2026-10-25 — v2.1.1: exported HTML opens directly from disk

**Branch:** `main`.
**Symptom:** double-clicking the exported `.html` did not open the story.

### Investigation

- Reproduced by opening the downloaded 4.2 MB file through `file://` in Chrome;
  the old module-based export actually rendered headless, so the report could be a
  browser-specific `file://` module restriction or the blank preload period.
- The export used two inline `<script type="module">` blocks. There were no imports,
  but some local-file/browser combinations block module execution.
- The body was empty until the 4 MB document and 14 GIFs had parsed and preloaded,
  which can look like “nothing opened”.

### Fix

- Embedded Aventura and MiniGif in a **classic inline IIFE** instead of module
  scripts; stripped the Aventura default export before embedding.
- Wrapped the boot code in a second classic IIFE to avoid global collisions.
- Added a visible `Cargando historia… / Loading story…` status inside `#story-root`,
  removed after `startAdventure()`, plus a `<noscript>` fallback.

### Verification

- Exported `Por la ventana` (4,355,635 B) and opened the downloaded file directly
  with `file://`: title “Por la ventana”, story visible, loading status removed, no
  console errors.
- Preview still renders the same story; export contains no
  `<script type="module">` and no `export { Aventura as default }`.
- 104 tests pass; 0 check warnings; build passes.
- Version bumped to **2.1.1** and tagged locally.

### Note

If double-clicking still opens a text editor or nothing at all, the OS file
association for `.html` is wrong; use **Open With → Chrome**. The file itself now
opens directly in Chrome from `file://`.

---

<!--
Template for future entries:

## YYYY-MM-DD — Task name

**Branch:** agent-dev
**Sprint/task:** S1.x
**Changed:** files/modules
**Why:** the problem and the intended outcome
**Verified:** commands, tests, manual checks
**Notes/risks:** anything the next agent must know
**Next:** the next task
-->
