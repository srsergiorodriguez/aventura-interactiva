# Plan — Aventura Interactiva

Status: S4 complete — release candidate verified on `Por la ventana` in Chrome.
S1–S4 complete; 104 tests, 0 warnings, build passes. `main` merge remains.

S3 verification: 104 tests; preview/export still byte-identical.
Import/remount race fixed after S3: New Project → open a 27-scene file now shows
all 27 without reloading. Safari/Firefox are deferred by the project owner.
Next: S4 coherence, accessibility, i18n audit, cross-browser QA, and release.
Branch: `agent-dev`. Date: 2026-10-25.

## Release goal

Ship a release that keeps the workshop's low barrier and adds:

1. A trustworthy project: nothing is lost on refresh, save, or import.
2. Preview and export that are the same document.
3. Presentation customization that is broader but still constrained.
4. An in-app drawing studio that produces constrained wiggly GIFs.
5. One design system and a coherent bilingual interface.

The order is deliberate: **fix the document and the renderer before adding
features**. Otherwise the drawing and presentation work will be built on the same
dual-source bugs the audit found.

## Release sequence

| Sprint | Deliverable | Gate |
|--------|-------------|------|
| **S1 — One document, one renderer** (complete) | Project model, stable links, explicit start, autosave, preview/export parity, validation. | Lossless import/export; preview and export byte-identical for the same snapshot; refresh restores; tests pass. |
| **S2 — Presentation** (complete) | Presentation model, presets, Story/Presentation/Advanced settings, shared CSS, story language. | Every preset and control matches in preview and export; no editor CSS inside the story. |
| **S3 — MiniGif review + drawing studio** (complete) | Encoder audit and targeted optimization, then the constrained 3-frame wiggly GIF studio integrated into the image section. | MiniGif gate complete; mouse/touch drawing, deterministic frames, GIF saved/reopened/exported; size target met. |
| **S4 — Coherence and release** | Primitive migration across all modals/panels, full i18n audit, accessibility, cross-browser QA, docs, release candidate. | Manual QA complete on a 20+ scene project; both locales; build passes; merge to `main`. |

S2 and S3 can swap after S1 if the drawing feature is needed sooner. Both depend
only on S1's document, renderer, and design primitives. S3 has a mandatory MiniGif
review gate before any drawing UI.

## Pre-S3 gate — MiniGif review (complete)

This gate was completed before the studio UI. It found a real encoder bug, fixed
it with targeted patches, and recorded the measured decision.

- [x] Baseline three 1024×1024 frames with five exact colors: encode time, output
      size, and memory in Node and Chrome. Safari/Firefox were unavailable; the
      limitation is recorded in `VENDOR.md`.
- [x] Audit correctness and API: found corrupt LZW clear/EOI codes on padded
      custom palettes, plus avoidable allocations and weak validation.
- [x] Keep the engine's igrama path working: auto-palette output is byte-identical
      before/after; data-level GIF tests cover dimensions, frames, delay, table size,
      and clear code.
- [x] Measure and choose: targeted patches; no rewrite and no Worker.
- [x] Record the decision, patches, and benchmarks in `src/lib/VENDOR.md` and
      `diary.md`.
- [x] Only then start the studio.

## Completed sprint — S1: One document, one renderer

### Why this sprint

The audit found four issues that make the requested features unsafe:

- The saved JSON is not the project (theme, grammar, igrama, start are absent).
- Array-index handles can silently rewire a story when an option is removed.
- Preview and export use different wrappers, so "tested" is not "shipped".
- A refresh destroys the workshop.

S1 fixes those and creates the seams the next two features need. It does **not**
add the drawing studio or the presentation UI.

### Tasks

#### S1.1 — Harness and docs

- [x] Write `architecture.md`, `design-system.md`, `testing.md`, `plan.md`,
      `diary.md`.
- [x] Add `vitest`, `svelte-check`, `fake-indexeddb`; add `test`, `test:watch`,
      `check` scripts.
- [x] Enable meaningful JS checking for `domain/`, `export/`, and `persistence/`
      with `// @ts-check` (drawing/ when it exists).
- [x] Add local `npm run verify` (`check`, `test`, `build`); CI can reuse it later.

#### S1.2 — Project document and migration

- [x] Add `domain/project.js`: `createProject`, `parseProject`, `serializeProject`,
      version/migration, defaults.
- [x] Store `meta`, `story{lang,startSceneId}`, `scenes`, `presentation`, `runtime`,
      `grammar`, `igrama`, `view`.
- [x] Add stable `option.id` / `area.id`; convert `scene` targets to `target`.
- [x] Preserve all engine scene fields on legacy import (`deadEnd`, `plop`, `title`,
      `scene`, `viz`, `meta`, unknown fields).
- [x] Deterministic layout fallback for imported scenes without `display`.
- [x] Infer and store the start scene once on legacy import.
- [x] Tests + fixtures: `legacy-mini.json`, `project-mini.json`.

#### S1.3 — Commands, links, start, validation

- [x] Add `domain/scenes.js` commands: add scene, update text, add/remove option,
      add/remove area, set/clear target, set start, delete scene.
- [x] Handles use `opt:<id>` / `area:<id>`; removing option 0 does not affect
      option 1.
- [x] Deleting a wire clears the target; compiling never reads stale data.
- [x] Deleting a scene clears or reports every reference.
- [x] Add `domain/validate.js`: no scenes, no start, dangling targets, empty
      labels, unreachable scenes, external images.
- [x] Add `domain/compile.js`: pure compile with shallow copies; strip editor-only
      fields; preserve unknown engine fields.
- [x] Regression tests for `testing.md` §7 cases 1–6. Cases 7–8 belong to S3/S2.

#### S1.4 — Store and flow projection

- [x] Refactor `state.svelte.js` into a session store (`project`, `selectedSceneId`,
      `viewport`, `saveState`, `lastSavedAt`) with explicit actions.
- [x] Remove nested mutation from components; `SceneNode` receives `{sceneId}` and
      derives the scene.
- [x] Build flow nodes/edges from the project; write `display` on drag stop; update
      targets on connect; clear targets on edge delete.
- [x] Keep the existing canvas look and interactions; no visual redesign this
      sprint.
- [x] Add a start-scene badge and a "set as start" action in the inspector.
- [x] Add the `Toast` primitive (tokens + `aria-live`) and replace new/edited
      `alert()` calls; localize them.

#### S1.5 — Persistence

- [x] Add `persistence/autosave.js` using IndexedDB (`aventura-interactiva` /
      `projects` / `current`), with a plain snapshot.
- [x] Wire debounced ~1s autosave into the session store.
- [x] Restore the current project on boot; fall back to the demo story.
- [x] Add New project (confirm), Open project, Save project (`.aventura.json`).
- [x] Keep legacy story JSON import; native project save is the primary path.
      Story JSON export is deferred (not needed for S1).
- [x] Surface saving / saved / error states; handle quota errors.
- [x] Tests with `fake-indexeddb`; round-trip includes theme, grammar, igrama,
      start, images, drawings (field present even if unused).

#### S1.6 — One renderer

- [x] Add `export/escape.js`, `export/document.js`, `export/presentation-css.js`.
- [x] Build with `adventureContainer: "story-root"`; page wrapper owns width,
      padding, background, and vertical alignment.
- [x] Escape JSON (`<` → `\u003c`), `<title>`, and custom CSS (`</style`).
- [x] Preview uses a Blob URL in an iframe; destroy iframe and revoke URL on close.
- [x] Export downloads the same string; filename from `meta.title` slug.
- [x] Remove the engine import and `#storygeneraldiv` handling from
      `PreviewModal`; no global theme style.
- [x] Add a reload button in the preview toolbar.
- [x] Tests for determinism, hostile text, and required document markers.

#### S1.7 — Verify and document

- [x] Run `npm run check`, `npm run test`, `npm run build` (70 tests, 0 errors,
      build passes).
- [x] Run the manual parity and data-safety checklist on the 27-scene
      `Por la ventana.json`.
- [x] Confirm preview and export are identical: same 4,311,680-byte document and
      the same SHA-256 (`3dacd163…b550`) at 1440×900. Identical bytes imply the
      same responsive layout at 390×844.
- [x] Update `diary.md` and tick this plan.
- [x] Review diff; no unrelated visual changes.

### Checkpoint (2026-10-25)

Done: document model/migration, stable commands, compile, validation, presentation
model, shared document builder, IndexedDB adapter, session store/flow projection,
autosave, project files, iframe playtest, export, Toast, start badge, 70 tests.
The app now runs on the new document. Real workshop-story import, autosave reload,
native project open, option/edge deletion, start changes, and exact preview/export
parity were verified in Chrome.

### Acceptance criteria

S1 is complete when:

1. Importing and re-exporting a valid legacy story preserves every engine field
   and every link.
2. Removing option 0 or deleting a wire cannot leave a wrong or hidden target.
3. The start scene is explicit, visible, and stable across node moves.
4. Refresh restores the project; save/open round-trips theme, grammar, igrama,
   language, start, images, and drawings.
5. Preview and export are produced by the same function; the same snapshot yields
   the same HTML bytes.
6. No engine CSS, DOM, or globals leak into the editor.
7. Validation blocks broken playtests/exports with localized, actionable errors.
8. `check`, `test`, and `build` pass; manual parity and data-safety pass.
9. New UI uses tokens and `t()`; no new inline styles or hard-coded English.

### Out of scope for S1

- Presentation presets and controls (S2).
- Drawing studio (S3).
- Full migration of all existing modals to the `Modal` primitive (S4; Preview uses
  it now).
- Main-editor undo/redo.
- Scene search, rename, multiple stories.
- Native shell, cloud, collaboration.
- Visual redesign of the canvas or sidebar.

### Risks

| Risk | Mitigation |
|------|------------|
| Refactoring the graph breaks familiar interactions. | Keep the node visuals and handle behavior; manual canvas QA each task; do not change zoom/drag semantics. |
| IndexedDB quota with 4MB+ projects. | Debounce, no deep clones, surface quota errors, keep project files as the durable backup. |
| Preview iframe feels different from the old modal. | Full-size iframe inside the existing modal; toolbar outside; manual parity at desktop and phone widths. |
| Legacy files have fields we do not know. | Pass through unknown scene fields; regression fixture includes one. |
| Start inference on old files is wrong. | Infer once, show the badge, let the author change it before export. |
| S1 grows into a full rewrite. | Stop at the document, store, persistence, and renderer; defer presentation/drawing and cosmetic refactors. |

## Confirmed decisions

Confirmed by the author on 2026-10-25. They constrain S2/S3 but do not change the
active S1 work.

| # | Decision | Confirmed choice | Impact |
|---|----------|------------------|--------|
| D1 | Drawing model | Automatic 3-frame line boil; no manual frames or onion skin. | Preserves the WigglyPaint charm and keeps the UI small. |
| D2 | Drawing canvas | Fixed 128×128 internal, 1024×1024 GIF, 5 colors (background + 4 paints). | Consistent output and small files; no arbitrary sizes. |
| D3 | Autosave | Restore the last project on boot, with a visible New action. | Safest for workshops; changes the current "demo every time" behavior. |
| D4 | Project save | Native `.aventura.json` by default; legacy story JSON as an advanced export. | Keeps theme/grammar/igrama; retains interoperability. |
| D5 | Presentation scope | More styling options: six color schemes (or custom scheme colors) + typography + size + width + alignment + button/image options + advanced custom CSS. | Broad but bounded; no page builder. |

## Confirmed drawing scope (S3)

This is the contract for the drawing sprint. Do not add tools beyond it.

- Automatic three-frame line boil at 4fps (250ms); no manual frame editing, onion skin,
  or timeline.
- Fixed 128×128 internal canvas, displayed 4× nearest-neighbor, exported at
  1024×1024.
- One project color scheme: five colors (background, ink, accent, support,
  highlight). Six presets or a custom edit, used by both the story theme and the
  drawing studio. No per-drawing color picker, eyedropper, or transparency.
- Two drawing tools only: solid brush and textured/dithered brush. Eraser. Six
  shared sizes selected with a range slider. No fill, no marker/ink layers, no
  under-painting.
- Ten-step undo labeled "undo" / "deshacer". No "oops".
- Erase all clears immediately and is undoable; no confirmation dialog.
- MiniGif review gate complete before the studio UI.
- Every studio string, palette name, tooltip, error, and `aria-label` in both
  locales; no literal English in components.

### S1 verification record (2026-10-25)

- `npm test`: 70 passed, 10 files.
- `npm run check`: 0 errors, 12 warnings (all in the old modal markup; S4).
- `npm run build`: passes; bundle ~394 kB.
- Real story: 27 scenes, 41 options, 14 embedded GIFs, 4.25 MB.
- UI: import, 27 nodes, start badge, image/area modal, color change, preview,
  autosave, reload, native project open, New project, option removal, edge
  deletion (`target: null`), and start reassignment.
- Preview vs export: both 4,311,680 bytes, SHA-256
  `3dacd1638f132bcb9b31136927583719011074e927248f0ddf23cbec06dbb550`.
- Known dev-only noise: Svelte Flow suggests `$state.raw` for nodes/edges; nested
  raw state is not valid in this store shape. No functional impact at workshop
  sizes.

## Completed sprint — S2: Presentation

### Why this sprint

S1 made the story a single document and one renderer. S2 uses that foundation to
replace the ad-hoc options modal with a coherent Story/Presentation/Advanced
settings surface, and to make presentation a first-class, portable part of the
project. Preview and export must remain byte-identical.

### Tasks

#### S2.1 — Presentation presets and data

> Superseded in S3: presets are now five-color schemes shared with the drawing
> studio; typography, layout, and custom CSS are preserved when one is applied.

- [x] Add six presets (Papel, Fósforo, Cianotipo, Pulpa, Noche, Menta) as pure data
      in `domain/presentation.js`.
- [x] Each preset sets eight colors, a font, and a legible button border; layout and
      custom CSS are preserved.
- [x] Add `withPresentationPreset(presentation, id)` and mark manual edits as
      `custom`; stale preset ids normalize to `custom`.
- [x] Tests for preset completeness, valid hex values, contrast, and layout
      preservation.

#### S2.2 — Settings structure

- [x] Replace `OptionsModal.svelte` with `SettingsModal.svelte`.
- [x] Tabs: Story, Presentation, Advanced. Header button says "settings".
- [x] Footer: close and playtest (closes settings, opens preview).
- [x] Keep the existing modal visual language; full primitive migration stays in S4.
- [x] Keyboard/ARIA basics for tabs and labels.
- [x] Move New Project out of the hidden creator panel into the sidebar footer so it
      is always reachable.
- [x] Replace the plain confirmation with a two-choice dialog: restore the built-in
      demo story or start blank. The demo is never lost to autosave again.
- [x] Fix the canvas viewport after project replacement: an explicit post-mount
      fit runs after nodes/images measure, with `minZoom=0.15` and a 100% fit cap.
      New Project → load the 27-scene story now shows all 27 nodes without a
      reload.

#### S2.3 — Story metadata and language

- [x] Edit project title and author; title drives `<title>` and filenames.
- [x] Story language (`en`/`es`) is a project field, independent of the UI language.
- [x] Reading behavior: typewriter speed, back/restart buttons, adventure scroll.
- [x] `evalTags` moves to Advanced with a clear warning.

#### S2.4 — Presentation controls

- [x] Preset cards with swatches and selected state; "custom" state after manual
      edits.
- [x] Eight color controls (page, text, accent, buttons, hover).
- [x] Typography: font, size, line height, alignment.
- [x] Layout: page width, padding, vertical alignment.
- [x] Buttons: inline/stacked.
- [x] Image: frame on/off.
- [x] Shape: button border, container border, radius.
- [x] Advanced: custom CSS, scoped to the story and escaped for `</style>`.

#### S2.5 — Renderer parity

- [x] Update `buildStoryCSS` where new controls need CSS.
- [x] Keep one builder for preview and export.
- [x] Re-run the exact preview/export SHA check on the workshop story.
- [x] Confirm `<html lang>` and `<title>` follow story metadata.

#### S2.6 — i18n, tests, docs, QA

- [x] Add every new string to EN/ES; no hard-coded UI text.
- [x] Update tests/fixtures as needed.
- [x] Update `diary.md` and this checklist.
- [x] Run check/test/build and manual QA at 1440×900 and 390×844.

### Acceptance criteria

S2 is complete when:

1. Six presets and every control render identically in preview and export.
2. Story title, author, and language appear in the exported document.
3. Manual edits leave preset mode and are saved/restored in the project file.
4. Custom CSS affects the story only, never the editor, and cannot close the style
   element.
5. No new inline styles, raw colors, or hard-coded English in the new settings UI.
6. `check`, `test`, and `build` pass; the preview/export SHA check is green.
7. The 27-scene workshop story opens, previews, exports, and reloads with the new
   settings.

### Out of scope for S2

- A live side-by-side presentation preview (use the playtest button for now; live
  editing is a polish candidate).
- Font uploads or runtime webfont fetches.
- Full modal/button/field primitive migration (S4).
- Drawing studio (S3).


### S2 verification record (2026-10-25)

- `npm test`: 77 passed, 10 files.
- `npm run check`: 0 errors, 12 warnings (old modal/label/ref issues; S4).
- `npm run build`: passes; bundle ~410 kB.
- Six presets; preset completeness, contrast, and layout preservation tested.
- Applying Noche changed background, text, and button border; manual layout edits
  flipped the state to "personalizado".
- Story tab: title `Test Story`, author `Tester`, language `en`; persisted through
  reload and autosave.
- Preview computed: lang `en`, title `Test Story`, author meta, background
  `rgb(18,18,18)`, 720px page, 16px padding, stacked buttons, no image frame,
  Georgia font, centered text.
- Custom CSS `body { background: #123456; }`: story iframe became
  `rgb(18,52,86)` while the editor stayed `rgb(255,255,255)`.
- Preview vs export: both 4,311,715 bytes and SHA-256
  `05941dfb049497e6fe8cdc5f9b225aa50fdc1eaf28698001de3b414fa9e28e9b`.
- Settings modal fits 390×844 without horizontal overflow (362px modal, 3 tabs).
- Native project file preserved title/author/language, preset, layout, typography,
  colors, custom CSS, button layout, and image frame.
- New Project → load `Por la ventana` now leaves 27 nodes visible (fit transform
  `scale(0.1938)`) without a tab reload; the previous one-node viewport is gone.
- New Project dialog: “historia de ejemplo” restores the 3-scene demo; “proyecto en
  blanco” creates one empty `inicio` scene. One footer button, no extra chrome.

## S3 — MiniGif review + drawing studio (complete)

### Delivered

- Fixed MiniGif's custom-palette LZW clear/EOI codes, exact-color quantization,
  duplicate pixel allocation, and frame validation. Added `addFramePixels` and the
  ES export.
- Added `drawing/model.js` (palettes, seeded line-boil rendering, brushes, eraser,
  RGBA expansion) and `drawing/encode.js` (1024×1024 GIF data URL).
- Added `DrawingStudio.svelte`: 128×128 canvas at 4×, three-frame live loop, solid
  brush, one fixed textured brush, eraser, one six-position size slider (2–12px),
  six shared color schemes plus custom scheme colors, ten-step undo, erase-all,
  save/cancel, pointer/touch drawing, inline tool icons. The studio has no palette
  picker; it shows the four paint colors from the active scheme.
- Integrated the image section: **dibujar** / **editar dibujo**, clearing the drawing
  source when a photographed image replaces it, preserving source + GIF in the
  project, stripping source from the Aventura compile/HTML export.
- Added `project.palette` (`presetId` + five colors). Settings shows the six
  schemes and a custom five-color editor; choosing or editing a scheme applies it
  to the story theme and the studio immediately. The mapping derives readable
  story text/borders. The studio reads the same scheme and has no palette picker.
- Added EN/ES strings for every studio label, palette, tool, and error.

### S3 verification record (2026-10-25)

- `npm test`: 104 passed, 14 files.
- `npm run check`: 0 errors, 12 old warnings in 3 files.
- `npm run build`: passes.
- MiniGif target: 3×1024×1024, 5 colors, 80ms. Before: 276.8 ms, corrupted output
  (ffmpeg “LZW decode failed”, blank frame), ~14.2 MB external delta. After:
  159.1 ms, valid output, 20,738 B, ~2.2 MB external delta.
- Auto-palette igrama fixture: byte-identical before/after (2,607 B).
- Chrome studio save: 6,881 B, 1024×1024 GIF, 3 frames, 250ms (4 fps), unified scheme colors, valid.
- UI: drew a solid stroke (160 non-background pixels), undo returned to 0, drew a
  textured stroke with Noche/size 3, saved, reopened the source, reloaded and saw
  the GIF and “editar dibujo” again.
- Export HTML contains the GIF data URL and **no `drawing` source**; story preview
  shows the drawing image.
- Studio at 390×844: no horizontal overflow (362px modal), canvas fits.
- Settings selects are app-styled (`appearance: none`, ink chevron, 35px height).
- Story typography offers nine bundled OFL families; the selected woff2 is
  embedded in preview/export with its copyright and OFL text, and the editor no
  longer loads Google Fonts. The font selector has a live sample card.
- Licensing: footer **licencias** opens the bundled font/license list with full
  OFL/MIT texts; the exported story carries the selected font's notice as an HTML
  comment.
- Import race: removed the keyed Workspace remount; one Svelte Flow instance now
  receives the re-projected canvas. Five rapid New Project → open
  `Por la ventana` cycles gave 1 blank node then 27 loaded nodes each time, all 27
  visible, with no console errors and no reload.
- Ten-step undo includes erase-all; no fill, layers, timeline, onion skin,
  per-drawing custom colors, or transparency.

### Notes / limits

- Safari and Firefox were not automated in this environment; the GIF is standard
  GIF89a and validated with ffmpeg/tests. Cross-browser QA remains S4.
- The studio's animated canvas and saved GIF use exactly the five scheme colors;
  export is 1024px nearest-neighbor from the 128px grid.

## S4 — Coherence and release (in progress)

### Completed

- [x] Remove the 68 copied reference files from `src/` (they were byte-identical
      duplicates of `motivomotivoForReference`); restore the app-only check scope.
- [x] Add `ui/Modal.svelte` with backdrop, focus trap, Escape close, focus
      restoration, body scroll lock, and header/footer snippets.
- [x] Migrate all seven dialogs: Settings, Drawing, Preview, New Project,
      Licenses, Areas, Grammar.
- [x] `svelte-check`: **0 errors, 0 warnings**.
- [x] Keyboard/ARIA cleanup: scene node button semantics, area labels, keyboard
      area nudge/resize, tablist arrow-key navigation, document `lang` synced to
      the UI locale.
- [x] Static inline styles removed; only dynamic canvas geometry remains inline.
- [x] Metadata: README replaced, app title updated, package version **2.1.0**.
- [x] Chrome QA: every migrated modal opens/closes, focus is trapped and restored,
      Escape works, area/drawing layouts are intact.
- [x] EN/ES key parity: 196/196 keys; no `alert`/`confirm` flows.

### Release verification (Chrome, `Por la ventana`)

- [x] Imported 27 scenes; all 27 visible and wired; start scene `inicio`.
- [x] Native save/round-trip: 27 scenes, format/version/palette/font preserved.
- [x] Autosave + reload restored all 27 scenes.
- [x] English UI and document lang; Spanish restored.
- [x] Six schemes × 5 swatches, custom 5 colors, live font preview.
- [x] Preview and export **byte-identical**: 4,355,150 bytes, SHA-256
      `d75b3f7dc868849ce1bdcda015564021c4d737dc172dea34c329f12ed7bf08f2`.
- [x] 15 GIF data URLs in export; no editable drawing source; no Google Fonts.
- [x] Drawing studio on a real scene: draw/save/edit/reopen, then restored the
      original 27-scene project.
- [x] Mobile 390px: no horizontal overflow; sidebar 302px.
- [x] Safari/Firefox explicitly deferred by the owner; reference folder deleted.
- [ ] Commit `agent-dev` and merge to `main`.

### Notes

- Chrome QA covers the full release flow on the workshop-sized story.
- Bundle remains ~843 kB minified / 442 kB gzip because all selectable font data is
  bundled.

## Release definition

A release candidate is ready when:

- S1–S4 are complete and the manual checklist passes on a real workshop-sized
  project (20+ scenes, 10+ images, at least one drawing).
- Import/export round-trips are lossless for supported fields.
- The MiniGif gate is complete; the studio uses the reviewed encoder and a
  compatibility fixture protects the engine igrama path.
- Both locales are complete; no hard-coded UI strings.
- The exported story works offline in Chrome, Firefox, and Safari.
- `npm run check`, `npm run test`, and `npm run build` pass.
- `architecture.md`, `design-system.md`, `testing.md`, and `diary.md` reflect the
  shipped behavior.
- The version is bumped and `main` is merged from `agent-dev`.

Until then, `agent-dev` is the integration branch and `main` stays release-only.
