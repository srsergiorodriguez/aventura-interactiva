# Aventura Interactiva

A workshop-first editor for small branching stories. Build scenes on a node canvas,
write options and image areas, play the story in place, and export one
self-contained HTML file.

## Run

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The production base path is
`/aventura-interactiva/`.

```bash
npm run verify   # svelte-check + tests + production build
```

## What it includes

- One native `.aventura.json` project document, with autosave to IndexedDB.
- Scene canvas with stable option/area wiring and an explicit start scene.
- Preview and HTML export produced by the same document builder.
- Story presentation controls: six five-color schemes, custom scheme colors,
  nine embedded OFL fonts, typography, layout, buttons, image frame, shape, and
  custom CSS.
- A constrained drawing studio: 128×128 grid, three-frame line boil at 4 fps,
  two brushes, eraser, six sizes, ten-step undo, and 1024×1024 GIF output.
- EN/ES editor interface. Story language is a separate project setting.
- Self-hosted fonts and in-app font/software license notices. No runtime Google
  Fonts requests.

## Documentation

- [Architecture](architecture.md)
- [Design system](design-system.md)
- [Testing and manual QA](testing.md)
- [Sprint plan](plan.md)
- [Development diary](diary.md)
- [Vendored MiniGif notes and benchmarks](src/lib/VENDOR.md)
- [Font/software licenses](src/assets/fonts/licenses.json)

## Verification status

Chrome is exercised end-to-end on the 27-scene `Por la ventana` workshop story:
import, autosave/reload, both UI locales, preview/export byte parity, drawing, and
mobile layout. Safari/Firefox are deferred by the project owner. The editor and
modals collapse for narrow screens.

## Project format

A project file contains `format`, `version`, `meta`, `story`, `scenes`,
`presentation`, `palette`, `runtime`, `grammar`, `igrama`, and `view`. Editable
drawing sources live beside their rendered GIFs in the project file; HTML exports
contain only the GIF.

Released as **v2.1.2** from `main`. `agent-dev` remains the integration branch for
future work.
