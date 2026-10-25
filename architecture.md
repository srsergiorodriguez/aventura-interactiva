# Architecture — Aventura Interactiva

Status: proposed target architecture, based on the `agent-dev` audit of 2026-10-25.
Scope: the editor application in this repository. The Aventura library is a vendored
runtime dependency, not part of the editor's architecture.

## 1. What this app is

A browser-only authoring tool for Aventura stories. An author creates scenes on a
node canvas, wires options and image areas to targets, attaches images/GIFs, writes
grammars, customizes presentation, plays the story, and exports a self-contained
HTML file.

The product constraints are deliberate:

- Low barrier. A workshop participant must be able to make a scene and connect it
  within minutes.
- One file in, one file out. The exported story must run offline, with no server.
- Constraints over combinatorics. The drawing tool, in particular, must remain
  small and opinionated.
- The editor chrome is monochrome and brutalist; the story content is the color.

## 2. System boundaries

There is **no native backend** in this release. No Tauri, Electrobun, Lua, or SDL3.
Adding one later would only make sense for filesystem, printing, or packaging; it
must not leak into the story model or renderer.

The system has four boundaries:

```text
┌──────────────────────────────────────────────────────────────┐
│ Editor (Svelte 5, browser)                                    │
│                                                              │
│  UI components ──commands──▶ Project document (in memory)    │
│       ▲                            │                         │
│       │ derived                    │ debounced snapshot      │
│       └──────── flow projection    ▼                         │
│                              IndexedDB (autosave)            │
│                                                              │
│  Playtest ◀── Blob URL ── buildStoryDocument(project) ──▶ Export
└──────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │ Story document (iframe / file)   │
                    │ Aventura + MiniGif + story data  │
                    │ No access to editor CSS or state │
                    └──────────────────────────────────┘
```

Non-negotiable boundaries:

1. **Editor chrome and story presentation are separate worlds.** The editor's
   `app.css` must never style `.story*`, `#storygeneraldiv`, or `--av-*` elements.
2. **The story runtime never runs in the editor document.** Preview is an iframe
   built from the exact same HTML string as the exported file.
3. **No shared globals between editor and story.** Only serialized project data,
   images, and generated CSS cross the boundary.
4. **No framework event bus.** Svelte runes are the reactive system; the only
   "events" are explicit commands on the project store and the one-way document
   build for preview/export.

## 3. Current architecture (as-is)

```text
App.svelte
└── Workspace.svelte ── SvelteFlow (nodes/edges bound directly to state)
    ├── SceneNode.svelte ── reads selectedNodeId, writes it on click
    └── Sidebar.svelte
        ├── compileFlowToAventura() ── nodes/edges ──▶ scene JSON
        ├── generateStandaloneHTML() ── engine raw + scene JSON ──▶ export
        ├── PreviewModal.svelte ── engine imported as module ──▶ app DOM
        ├── OptionsModal.svelte ── engine options + theme, live-bound
        ├── GrammarModal.svelte ── grammar editor + engine test
        └── AreaModal.svelte ── image-map rectangles, local copy

state.svelte.js
├── aventuraState ($state singleton): nodes, edges, options, grammar, igrama
├── loadDefaultStory()
├── addScene()
├── compileFlowToAventura()
└── loadAventuraToFlow()
```

This was a reasonable prototype: small, direct, and fast to change. It is now at
its limit. The main structural fact is that **there is no single document**. Graph
edges, scene data, `options`, `grammar`, and `igrama` are separate mutable islands;
the project file only saves one of them.

### 3.1 Strengths to preserve

- The scene/option/area mental model is clear and maps directly to Aventura.
- The canvas interaction (handles, wires, node cards, minimap) is legible.
- The brutalist shell is distinctive; it does not look like generic SaaS.
- Export is one file. That is the right product decision.
- The engine and MiniGif are already vendored; the app has no runtime server.

### 3.2 Audit findings

| # | Finding | Evidence | Consequence |
|---|---------|----------|-------------|
| A1 | Preview and export are built by different code paths with different wrappers. | Preview computed style: 600px wide, `padding: 0`, 2px border, 6px shadow. Export: 600px, `padding: 32px 16px`, no border, vertically centered. | "What I tested" is not "what I shipped". |
| A2 | `save JSON` saves scenes only. | `handleExportJSON()` calls `compileFlowToAventura()`; theme, grammar, igrama, start, and project language are not included. | A reloaded project silently loses its presentation and generative logic. |
| A3 | Option/area connections are addressed by array index (`op_0`, `area_1`). | Probe: remove option 0; remaining option "go c" compiles with `scene: "b"` while the edge `op_1` points to `c`. | Editing options can silently rewire a story. |
| A4 | Deleting a wire does not clear the scene target stored in node data. | Probe: after removing `op_0`, compiled option still has `scene: "b"`. | A deleted branch remains reachable in export. |
| A5 | Import drops most engine scene fields. | `loadAventuraToFlow()` reconstructs only text/image/options/areas; `deadEnd`, `plop`, `title`, `scene`, `viz`, `meta`, `dataScene` are discarded. Duplicate `image` key at lines 187–188. | Importing and re-saving a valid story is lossy. |
| A6 | No persistence or autosave. | No `localStorage`, `sessionStorage`, or IndexedDB usage in `src/`. | A refresh or crash destroys workshop work. |
| A7 | Start scene is inferred from canvas position. | `findStartNode()` sorts by Y then X; imported stories without `display` get random positions. | Moving a node changes where the story starts. Imported stories start randomly. |
| A8 | Export data is interpolated into `<script>` without escaping. | `generateStandaloneHTML()` uses `JSON.stringify()` directly. A scene containing `</script>` breaks the file. | Valid story text can corrupt or inject into exports. |
| A9 | Preview injects global CSS and a global `#storygeneraldiv` into the editor document. | `StoryUI.init()` appends to `document.body`; `_injectThemeCSS()` writes a singleton `<style>`; PreviewModal moves the div and removes styles on the next open. | CSS/state leaks, cleanup bugs, and an engine instance that outlives the modal. |
| A10 | Four modals duplicate backdrop/header/footer CSS with different widths, z-indexes, and opacities. | `AreaModal`, `GrammarModal`, `OptionsModal`, `PreviewModal`. | Inconsistent UI and expensive changes. |
| A11 | Design tokens exist but are bypassed. | Inline `style=` in Sidebar, Options, Area, and Settings; hard-coded `#eee`, `#fafafa`, `#ffebee`, `red`, `green`, `orange`; two copies of Svelte Flow overrides. | No single design system. |
| A12 | i18n is a flat dictionary with silent fallback and no interpolation. | Hard-coded English alerts ("failed to process image", "no scenes to export!"), `scene_name`, duplicate-name error, `v2`. UI language also decides export `<html lang>`. | Untranslated strings and wrong accessibility metadata. |
| A13 | No tests, no type check, no CI. | `package.json` has only dev/build/preview; `checkJs: false`. | Data-integrity regressions are invisible. |
| A14 | MiniGif exists twice; the engine has no version marker. | `public/MiniGif.js` and `src/lib/MiniGif.js` are identical copies; `aventura.esm.js` is versionless. | Silent drift between preview and export. |
| A15 | No validation before playtest/export. | Missing targets and empty stories only surface as console errors or a blank modal. | Workshop dead ends are discovered too late. |

**S1 status (2026-10-25):** A1–A9, A12 (partially), A14, and A15 are addressed by
the new document/store/renderer. **S2 status:** story metadata/language, the
Story/Presentation/Advanced settings surface, and custom story CSS are
implemented; A1/A2 parity remains verified. **S3 status:** the drawing studio,
the unified six-scheme color system, and the MiniGif fixes are in. A10, A11, and
A13 remain for S4.

## 4. Target principles

1. **One document.** A single serializable `Project` is the source of truth. Flow
   nodes and edges are a projection, not a second document.
2. **One renderer.** `buildStoryDocument(snapshot)` produces the only story HTML.
   Preview displays those bytes in an iframe; export downloads those same bytes.
3. **Pure core, thin UI.** Scene operations, compilation, validation, presentation
   CSS, and drawing geometry are pure functions. Svelte components dispatch
   commands and render state.
4. **Stable identity.** Scenes, options, and areas have stable IDs. Array indexes
   are an engine serialization detail, never a UI identity.
5. **Explicit start.** The start scene is stored, visible on the canvas, and not
   derived from layout.
6. **No global runtime.** The engine does not execute in the editor document.
7. **Self-contained export.** Images are data URLs; fonts and scripts are embedded
   or system-provided. No CDN dependency at play time.
8. **Validate before play.** The app knows about missing targets and missing start
   scenes before the engine does.

## 5. Target module map

```text
src/
├── main.js
├── App.svelte
├── app.css                    # editor tokens + reset only
├── state.svelte.js            # session store: project, selection, viewport, autosave
│
├── domain/                    # pure, no DOM, no Svelte
│   ├── project.js             # schema, defaults, parse/migrate/serialize
│   ├── scenes.js              # add/remove/rename scene, options, areas, targets
│   ├── compile.js             # project -> Aventura scene JSON + runtime options
│   ├── validate.js            # broken targets, missing start, warnings
│   └── presentation.js        # presentation model, presets, engine theme mapping
│
├── drawing/                   # pure model + browser-only encoder
│   ├── model.js               # DrawingDoc, strokes, seeded jitter, frame commands
│   ├── render.js              # strokes -> 3 composited canvases (browser)
│   └── encode.js              # MiniGif adapter -> GIF data URL
│
├── export/
│   ├── document.js            # buildStoryDocument(snapshot) — the only renderer
│   ├── presentation-css.js    # buildStoryCSS(presentation)
│   └── escape.js              # script/style-safe serialization
│
├── persistence/
│   ├── autosave.js            # IndexedDB adapter (single record "current")
│   └── files.js               # open/save project, export story/HTML
│
├── i18n/
│   ├── index.svelte.js        # locale state, t(key, params), persistence
│   ├── en.js
│   └── es.js
│
├── lib/
│   ├── engine.js              # single import point for Aventura + MiniGif + raw sources
│   ├── aventura.esm.js        # vendored, untouched
│   └── MiniGif.js             # vendored, single copy, ES export
│
├── ui/                        # design-system primitives
│   ├── Button.svelte
│   ├── IconButton.svelte
│   ├── Field.svelte
│   ├── Modal.svelte
│   ├── Toast.svelte / toast.svelte.js
│   └── ...
│
├── features/
│   ├── canvas/                # Workspace, SceneNode
│   ├── inspector/             # Sidebar, scene/image/options/areas panels
│   ├── playtest/              # PreviewModal -> iframe document
│   ├── settings/              # Story, Presentation, Advanced tabs
│   ├── grammar/               # GrammarModal
│   └── drawing/               # DrawingStudio.svelte
│
└── assets/fonts/              # bundled OFL woff2 + license data, no remote import
```

This is a target, not a requirement to move every file in one commit. The hard
boundaries are `domain/`, `export/`, `drawing/model.js`, and the iframe. Existing
components can migrate incrementally.

## 6. Domain model

```js
/**
 * @typedef {Object} Project
 * @property {'aventura-interactiva'} format
 * @property {1} version
 * @property {{ title: string, author: string, createdAt: string, updatedAt: string }} meta
 * @property {{ lang: 'en'|'es', startSceneId: string }} story
 * @property {Record<string, Scene>} scenes
 * @property {Presentation} presentation
 * @property {{ presetId: string, colors: string[] }} palette // bg, ink, accent, support, highlight
 * @property {RuntimeOptions} runtime
 * @property {object|null} grammar
 * @property {object|null} igrama
 * @property {{ viewport: { x: number, y: number, zoom: number } }} view
 */

/**
 * @typedef {Object} Scene
 * @property {string} id                 // stable, slug, unique
 * @property {string} text
 * @property {string|null} image         // data URL (PNG/GIF/WebP)
 * @property {DrawingDoc|null} drawing   // optional editable source
 * @property {Option[]} options
 * @property {Area[]} areas
 * @property {{x:number,y:number}} display
 * @property {boolean} [deadEnd]
 * @property {boolean} [plop]
 * @property {string} [scene]            // simple "continue" target (engine field)
 * @property {string} [title]
 * @property {string} [igrama]
 * // any other engine field is preserved through import/compile
 */

/**
 * @typedef {Object} Option
 * @property {string} id                 // stable, e.g. "opt_k3f9"
 * @property {string} btn
 * @property {string|null} target        // scene id
 * @property {string} [text]             // intermediate scene text
 * @property {string} [image]
 */

/**
 * @typedef {Object} Area
 * @property {string} id
 * @property {string} name               // editor label only
 * @property {string} btn
 * @property {string} tooltip
 * @property {number} x @property {number} y @property {number} w @property {number} h
 * @property {string|null} target
 * @property {string} [text]
 */
```

Invariants:

- Scene IDs are unique and stable for the life of the project. Renaming a scene
  (if added) must update `story.startSceneId`, every `option.target`, every
  `area.target`, and every `scene.scene` reference in one command.
- `option.id` and `area.id` are stable and are the Svelte Flow handle IDs:
  `opt:<id>` and `area:<id>`. They are never array indexes.
- A target is either `null` or an existing scene ID. Dangling targets are invalid.
- `story.startSceneId` is always one of the scenes, or `null` only for an empty
  project.
- `display` and `drawing` are editor-only. They never reach the exported story.
- `display` is written to the project on drag stop, not on every mouse move.
- Flow edges are derived from `target`; they are not the source of truth.
- The engine's scene `scene` field (simple continue) is preserved even before the
  UI grows an editor for it.

### 6.1 Compilation

`compileProject(project)` returns:

```js
{
  scenes: {
    [sceneId]: {
      text, image, deadEnd, plop, title, scene, igrama,
      options: [{ btn, text, image, scene: target }],
      areas:   [{ x, y, w, h, btn, text, tooltip, scene: target }]
    }
  },
  startSceneId,
  lang,
  options,          // runtime + theme + grammar + igrama + defaultCSS
  presentation,
  meta
}
```

Rules:

- Unknown scene fields pass through unchanged.
- Editor fields (`id`, `display`, `drawing`, option/area stable IDs) are stripped.
- `null` targets are omitted, not serialized as `scene: null`.
- Compilation never mutates the project and never deep-clones image strings.
  Shallow-copy scenes, options, and areas; share data URLs by reference.
- The engine's `defaultCSS` is always `true`; presentation overrides are app-owned
  CSS layered on top. This removes a combinatorial branch from the app.

### 6.2 Import and migration

`parseProject(input)` accepts:

1. A native project (`format === 'aventura-interactiva'`, supported `version`).
2. A legacy Aventura story JSON: a plain object of `sceneId -> scene`.
3. A previously exported project with a newer known minor version (migrate).
4. Anything else: return a structured error, never partially import.

Legacy migration:

- Wrap scenes, keep every field.
- Assign stable option/area IDs.
- Convert `option.scene` / `area.scene` to `target`.
- Convert `display`; if missing, use a deterministic grid (not random).
- Infer `startSceneId` **once**, using the current top-left heuristic, and store it.
- Fill presentation/runtime/meta defaults. The imported legacy story has no theme,
  grammar, or igrama to recover; that is expected.
- Record `meta.createdAt/updatedAt` as ISO strings.

## 7. State, commands, and flow projection

`state.svelte.js` owns exactly one `Project` plus ephemeral UI state:

```js
export const app = $state({
  project,            // the document
  selectedSceneId,
  viewport,
  saveState,          // 'idle' | 'saving' | 'saved' | 'error'
  lastSavedAt
});
```

- Components read `app.project` and dispatch actions. They never write nested
  scene fields directly.
- Actions call pure domain functions, replace the project (or the affected scene),
  and schedule autosave.
- The flow is a projection:

```text
project.scenes ──toFlowNodes()──▶ nodes (position, id, data:{sceneId})
project targets ──toFlowEdges()─▶ edges (sourceHandle opt:<id>/area:<id>)
```

- `SceneNode.svelte` receives only `{ sceneId }` and derives the scene from the
  project. Editing text does not rebuild the flow.
- Dragging writes `display` on `onnodedragstop`.
- Connecting writes `target` on the option/area and regenerates edges.
- Deleting an edge clears the matching target.
- Deleting a scene clears or flags every reference to it; it must not leave silent
  dangling targets.
- Svelte Flow's selection is kept in `selectedSceneId`; the app's selected style
  remains independent of the library's internal selection.
- **Do not key/remount the Workspace on project replacement.** Keep one long-lived
  Svelte Flow instance. `adoptProject()` replaces the project, re-projects
  `canvas.nodes`/`canvas.edges`, and increments `projectEpoch` only to reset the
  viewport and schedule a refit. Remounting lets the old flow write its stale bound
  nodes back during teardown — this caused the “only the first scene after import”
  bug.

There is no event bus. If a future feature needs one (e.g., collaborative editing),
it must be introduced at the store boundary, not inside components.

## 8. Preview and export: one renderer

The root cause of A1 is two boot paths. The fix is structural, not cosmetic.

```js
// export/document.js
export function buildStoryDocument(snapshot) {
  // snapshot: { compiled, presentation, meta, engineSource, miniGifSource }
  // returns one complete HTML string
}
```

- Playtest: snapshot project → `buildStoryDocument()` → `Blob` → iframe `src`.
- Export: snapshot project → `buildStoryDocument()` → download the same string.
- The iframe is destroyed on close; the Blob URL is revoked.
- No engine import in `PreviewModal`; no `#storygeneraldiv` in the editor document.
- The modal provides a toolbar (reload, close) outside the iframe. Story chrome
  never inherits editor CSS.
- Presentation changes are applied by rebuilding on the next playtest. A live CSS
  patch can be added later without changing the export path, but the exported
  document remains the source of truth.

Document structure:

```html
<!doctype html>
<html lang="{story.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{escaped title}</title>
  <style>/* page reset + buildStoryCSS(presentation) */</style>
</head>
<body>
  <main id="story-root" class="story-page">
    <!-- optional title/author header -->
  </main>
  <script type="module">
    /* MiniGif (if needed) + Aventura engine source; MiniGif's ES export is
       stripped because this is concatenated into one module. */
    window.Aventura = Aventura;
  </script>
  <script type="module">
    const scenes = {/* script-safe JSON */};
    const options = {/* script-safe JSON */};
    const engine = new window.Aventura("{lang}", options);
    // setGrammar / setIgrama / setScenes / startAdventure
  </script>
</body>
</html>
```

Specific requirements:

- `options.adventureContainer = "story-root"`; the engine appends its container
  inside the page wrapper. The page wrapper owns width, padding, background, and
  vertical alignment.
- Escape `<` as `\u003c` in JSON embedded in scripts; escape `</style` in custom
  CSS; escape `<title>` content. Test with a scene text containing `</script>`.
- `buildStoryDocument` is deterministic: no timestamps, no random IDs, stable key
  order from the project.
- The document includes Aventura's default CSS plus app presentation CSS. App
  selectors use `#story-root` specificity so engine defaults cannot win by load
  order.
- MiniGif is included only when the story can generate GIFs (igrama GIF format).
  Drawings are already GIFs and do not need the encoder at play time.
- Export filename is derived from a slug of `meta.title`, not a hard-coded Spanish
  filename.

## 9. Presentation customization

`Presentation` is a first-class, versioned part of the project:

```js
{
  presetId: 'papel',
  colors: {
    background, text,
    accentBackground, accentText,
    buttonBackground, buttonText,
    buttonHoverBackground, buttonHoverText
  },
  typography: {
    font: 'mono'|'book'|'sans'|'grotesk'|'humanist'|'rounded'|'typewriter'|'palatino'|'school',
    size: 1.1, lineHeight: 1.5, align: 'left'|'center'
  },
  layout: { maxWidth: 600, padding: 32, verticalAlign: 'top'|'center' },
  buttons: { layout: 'inline'|'stack' },
  image: { frame: true },
  shape: { buttonBorder, containerBorder, borderRadius },
  customCSS: ''
}
```

- `presentationToEngineTheme()` maps colors/borders/radius to Aventura's `theme`.
- `buildStoryCSS(presentation)` adds what the engine does not express: page width,
  padding, alignment, font size/line height, button layout, image frame.
- Color schemes are pure data: six five-color palettes (`background`, `ink`,
  `accent`, `support`, `highlight`). Applying a scheme sets `project.palette` and
  maps those colors to the eight story-theme colors; typography, layout, buttons,
  image frame, and custom CSS are preserved. Editing a scheme color produces a
  custom scheme and applies it immediately.
- The story theme has no independent color pickers. This is the single source of
  truth shared with the drawing studio. Contrast text on accent/button surfaces is
  derived with WCAG luminance rather than authored separately.
- Advanced custom CSS is appended last, scoped to `#story-root` by convention, and
  validated for `</style>`.
- The editor and export share `buildStoryCSS`. There is no second stylesheet.
- Story fonts are nine embedded OFL families (`Inconsolata`, `EB Garamond`,
  `Inter`, `Space Grotesk`, `Source Sans 3`, `Nunito`, `Courier Prime`,
  `Crimson Pro`, `Patrick Hand`). Vite inlines the woff2 bytes; the selected
  family's `@font-face` data URLs are embedded in the story document, and its
  copyright + full OFL text are included as an HTML comment. No Google Fonts
  request at runtime, and preview/export share the same `FONT_STACKS` mapping.
- Font licenses are also surfaced in the editor through **licencias** (footer link)
  and stored in `src/assets/fonts/licenses.json` / `OFL.txt`.

## 10. Persistence and assets

- Autosave the current project to IndexedDB, debounced (~1s), using
  `$state.snapshot` and a plain JSON representation.
- Database: `aventura-interactiva`, object store `projects`, key `current`.
- On boot: restore `current`; if absent, load the demo story. A visible "New"
  action clears the current project and starts a fresh one.
- Save state is visible: saving / saved / error. Quota errors are surfaced, not
  swallowed.
- "Save project" downloads a `.aventura.json` native project; "Open" accepts native
  projects and legacy story JSON. "Export story JSON" (engine format) can remain an
  advanced action for interoperability.
- Images and drawings remain data URLs inside the project. This is what makes the
  HTML export self-contained; it also means autosave can be multi-megabyte.
  Debounce, avoid deep clones, and do not store duplicate copies.
- A drawing stores both its editable source (`DrawingDoc`) and its rendered GIF
  (`image`). Export includes only the GIF. Project files include both.
- No cloud, accounts, or collaboration in this release. IndexedDB is a local cache,
  not a backup; the project file is the durable artifact.

## 11. Drawing studio (architecture)

The studio is a constrained animated drawing tool, deliberately simpler than
WigglyPaint.

```text
DrawingDoc
├── width = 128, height = 128        # internal pixels
├── strokes[]                        # { tool: 'brush'|'texture'|'eraser',
│                                    #   paint: 1..4, size: 1..6, points, seed }
├── frames = 3
└── delay = 25                       # centiseconds, 4 fps
```

- Three composited buffers are rendered with seeded jitter (line boil). The boil
  moves a whole stroke by at most one internal pixel per frame, with rare
  point-level wobble; no manual timeline, onion skin, layers panel, or frame
  duplication.
- Two drawing tools only: a solid brush and a dithered/textured brush, plus an
  eraser. Six shared sizes (2–12 internal pixels). No fill, no marker/ink layer split, no under-painting.
- Five colors max: background plus four paint colors, all from the project color
  scheme. The studio has no palette picker; it shows only the four paint swatches.
  Editing the scheme in Settings changes both the story theme and future drawing
  renders. No per-drawing custom colors, eyedropper, or transparency in v1.
- Ten-step undo, labeled "deshacer" / "undo" — never "oops". "Erase all" clears the
  canvas immediately and is itself undoable; no confirmation dialog. No infinite
  history.
- Render at integer pixels with anti-aliasing off. Display at 4× nearest-neighbor.
  Export at 1024×1024 by upscaling the 128×128 frames with the exact 5-color
  palette via MiniGif. Target under ~200 KB per GIF. The line boil runs at
  4 fps (250ms per frame).
- `drawing/model.js` is pure and deterministic; the canvas display lives in the
  component; `drawing/encode.js` is the only MiniGif-dependent module.
- Saving a drawing writes `scene.drawing` and `scene.image` (GIF data URL).
  Reopening the studio replays the source; imported GIFs without source are
  read-only previews.
- The studio does not call the engine. It only produces an image for a scene.

## 12. Engine and MiniGif boundary

- `src/lib/engine.js` is the single import point:

```js
import Aventura from './aventura.esm.js';
import engineSource from './aventura.esm.js?raw';
import { MiniGif } from './MiniGif.js';
import miniGifSource from './MiniGif.js?raw';
```

- Components never import `?raw` files or the engine directly.
- The vendored engine is pinned. Record the upstream URL, commit/version, and date
  in `src/lib/VENDOR.md` (or a header comment). Updating it is a deliberate task
  with a regression run, not an incidental edit.
- MiniGif has one source under `src/lib/`. The builder embeds it only when the
  story can generate GIFs. The duplicate `public/MiniGif.js` and the `index.html`
  script tag were removed in S1. The ES export used by the drawing studio is in the
  same file; the builder strips that export line when embedding.
- The S3 gate fixed a real custom-palette LZW bug in MiniGif (clear/EOI codes were
  based on the unpadded palette length). Benchmarks and patches are recorded in
  `src/lib/VENDOR.md`.
- Engine patches are avoided. App-specific behavior lives in `export/` and
  `domain/presentation.js`. If the engine needs a new hook, upstream it or record a
  patch in `VENDOR.md`.

### 12.1 MiniGif review gate (before S3)

MiniGif already provides the primitives the studio needs: custom palettes, frame
delay, a 3-frame loop, and a synchronous `makeGif()` returning a GIF byte buffer.
It is also used by the engine for igrama GIFs, so it must not be rewritten blindly
before the studio.

Before building the drawing UI:

1. **Baseline.** Encode three 1024×1024 frames with five exact palette colors.
   Record encode time, output size, and peak memory in Chrome, Safari, and Firefox.
   Record the engine's igrama GIF output for a known fixture.
2. **Correctness audit.** Check frame-count/dimension validation, palette padding,
   color-resolution calculation, delay units (centiseconds), disposal, transparency,
   error handling, and `addFrame` DOM side effects. Decide which are real bugs versus
   out of scope.
3. **API boundary.** Keep `makeGif()` compatible with the engine. Put app-facing
   conveniences (RGBA or indexed frames, base64 conversion, localized errors) in
   `drawing/encode.js`, not in the vendored file.
4. **Measure before optimizing.** Likely wins: skip median-cut when a custom palette
   is supplied; map exact palette colors without a nearest-color search; avoid
   redundant RGBA copies; use typed-array-friendly LZW; reduce tiny-array
   concatenation. A Web Worker or an indexed-fast-path is optional, not assumed.
5. **Compatibility tests.** Parse the GIF header for dimensions, frame count, delay,
   and palette size. Keep a fixture for the engine's igrama path and compare
   behavior, not necessarily byte-for-byte if an optimization intentionally changes
   compression.
6. **Decision.** Prefer a thin app adapter plus targeted patches. Rewrite only if
   measurements show the current encoder cannot meet the studio's budget and the
   engine path can be protected by tests.
7. **Documentation.** Record the upstream URL/version, patches, and benchmark in
   `VENDOR.md` and `diary.md`.

The gate is complete: the encoder was measured, the custom-palette LZW bug was
fixed, auto-palette igrama output stayed byte-identical, and the decision was
recorded in `src/lib/VENDOR.md`. The studio was built on the patched encoder.

## 13. Internationalization boundary

- UI locale is an editor preference (`en`/`es`), persisted separately.
- Story language is a project field (`story.lang`), used for `<html lang>` and the
  Aventura constructor. Changing the UI language does not silently change an
  existing story's language.
- All editor strings go through `t(key, params)`; no concatenation in components;
  no `alert()`.
- Message catalogs are code modules with key parity tests. Missing keys fall back
  to English in development and log a warning; production never displays raw keys.
- Feature strings use namespaced keys (`drawing.*`, `presentation.*`, `project.*`).
  Palette and tool names are localized; their IDs stay stable in the document.
- Engine and MiniGif failures are caught at the adapter boundary and mapped to
  localized editor messages. Library console text is not user-facing UI.
- User content (scene text, grammar, titles) is never translated.

## 14. Validation, security, and failure handling

- `validateProject(project)` returns errors and warnings:
  - no scenes; no start; start missing
  - option/area target missing
  - empty button labels; empty scene text (warning)
  - unreachable scenes (warning)
  - external image URLs (warning: export will not embed them)
  - invalid grammar (delegated to the engine test, surfaced in UI)
- Playtest and export run validation first. Warnings can be acknowledged; errors
  block.
- The import path is all-or-nothing. Invalid files produce a localized, actionable
  error; they never leave a half-loaded project.
- `evalTags` is an explicit advanced feature: story text can inject HTML. It is
  trusted-author content, not a sandbox. The preview iframe is DOM/CSS isolation,
  not a security boundary. Document this in the UI.
- The exported file has no network dependencies. External image URLs are the one
  exception and are warned about.

## 15. Performance

- Avoid `JSON.parse(JSON.stringify(scene))` per scene; data URLs must be shared by
  reference. Compile with shallow copies.
- Autosave is debounced and serializes a snapshot; do not autosave on every
  keystroke.
- Build the playtest document on open, not on every state change. Rebuild on
  explicit reload.
- Cap uploaded GIF size and drawing export size; warn above a threshold.
- Node thumbnails may animate (GIFs), but cap their display size and avoid loading
  full-resolution images more than once. The story preloader already caches by URL.
- At 4 MB+ projects, export string construction is the dominant cost. Keep the
  builder linear and avoid repeated copies of the same data URL.

## 16. What is explicitly out of scope

- Native wrappers (Tauri/Electrobun), Lua/SDL3, or a local server.
- Cloud sync, accounts, multi-user collaboration.
- A general-purpose drawing app: layers, timeline, onion skin, fill, per-drawing
  color pickers, arbitrary canvas sizes, brush scripting.
- Replacing Svelte Flow, or building a custom graph canvas.
- Main-editor undo/redo (the drawing studio has ten-step undo; structural undo is a
  later feature).
- Scene search, multiple stories per project, and a project library.
- Analytics, telemetry, AI features.

## 17. Migration sequence

1. Add docs, tests, and the domain model alongside the existing code.
2. Parse legacy imports into the project model; fix data loss and stable IDs.
3. Make flow a projection; fix edge deletion and option removal.
4. Add the shared document builder and move playtest to an iframe; export through
   the same builder.
5. Add IndexedDB autosave and project files.
6. Add presentation model/presets and the settings UI.
7. Audit and, if measurements justify it, optimize MiniGif; add the drawing studio.
8. Remove dead code: `public/MiniGif.js` duplication, global engine preview,
   duplicate CSS, old `compileFlowToAventura` paths.

## 18. Decisions log

| Decision | Choice | Why |
|----------|--------|-----|
| Backend | None; browser-only | No requirement, keeps export and workshops simple. |
| Document | Canonical `Project`; flow derived | Fixes stale targets and enables versioning. |
| Preview | Same builder, iframe Blob | Guarantees parity by construction. |
| Start | Explicit scene ID | Layout must not change story behavior. |
| Links | Stable option/area IDs | Array indexes break on edit. |
| Persistence | IndexedDB autosave + project file | Workshop safety without a server. |
| Presentation | App-owned model + CSS over engine defaults | Extensible without forking the engine. |
| Drawing | Seeded 3-frame line boil; solid + textured brush + eraser; 5 colors (background + 4 paints); fixed 128→1024 | Simpler than WigglyPaint, still expressive and constrained. |
| MiniGif | Audit before S3; patch only with measurements; preserve igrama path | Shared encoder is a dependency of both the studio and the engine. |
| i18n | UI locale separate from story language | Export metadata must reflect the story. |
| Tests | Pure domain + builder strings; no visual tests | Reliable and cheap. |
