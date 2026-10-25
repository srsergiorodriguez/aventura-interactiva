# Design System — Aventura Interactiva

Status: proposed target, 2026-10-25.
Applies to the **editor chrome**. Story presentation is a separate, user-controlled
world and is deliberately not themed by these tokens.

## 1. Principles

1. **Brutalist shell, colorful content.** The editor is paper, ink, one accent, hard
   edges, and offset shadows. Images and drawings keep their own color. Do not tint
   story thumbnails grayscale.
2. **Constraints are the feature.** One action per control, a small set of presets,
   no infinite option matrices. This applies to the drawing studio as much as to
   the scene inspector.
3. **One way to build a thing.** One button, one modal, one field, one toast. If a
   new visual pattern appears twice, it becomes a primitive.
4. **The canvas is the product.** Controls recede; the graph, scene text, and image
   previews are the focus.
5. **Keyboard and touch are first-class.** No hover-only actions, no 12px targets,
   no modal that traps you.
6. **No surprise chrome.** The story preview must look like the exported story, not
   like the editor.

## 2. Editor design tokens

Canonical tokens live in `src/app.css` under `:root`. Component styles use only
these tokens; no raw colors, shadows, or spacing values.

```css
:root {
  /* Color */
  --ink: #000000;
  --paper: #ffffff;
  --accent: #00bfff;
  --accent-ink: #000000;
  --danger: #c81e1e;
  --danger-bg: #fdecec;
  --success: #166534;
  --success-bg: #eaf5ee;
  --warning: #92400e;
  --warning-bg: #fff4e5;
  --muted: #525252;
  --line: #d4d4d4;
  --surface: #f5f5f5;
  --overlay: rgba(0, 0, 0, 0.86);

  /* Type */
  --font-ui: "Inconsolata", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --text-xs: 0.75rem;   /* 12px, metadata */
  --text-sm: 0.8125rem; /* 13px, labels, node body */
  --text-md: 0.875rem;  /* 14px, controls */
  --text-base: 1rem;    /* 16px, body */
  --text-lg: 1.25rem;   /* 20px, panel title */
  --text-xl: 1.5rem;    /* 24px, app title */

  /* Space: 4px base */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  /* Line and shape */
  --border: 2px solid var(--ink);
  --border-dashed: 1px dashed var(--ink);
  --radius: 0;
  --shadow-1: 4px 4px 0 var(--ink);
  --shadow-2: 8px 8px 0 var(--ink);

  /* Layers */
  --z-canvas: 0;
  --z-controls: 10;
  --z-sidebar: 20;
  --z-backdrop: 100;
  --z-modal: 110;
  --z-toast: 200;

  /* Motion */
  --ease: 100ms ease;
}
```

Migration note: the old `--bg-color`, `--text-color`, `--accent-color`,
`--danger-color`, `--danger-bg`, and `--border-main` names are temporary aliases
during the refactor. New code uses the canonical names above. Remove the aliases
when the last component is migrated.

### 2.1 Color usage

| Token | Use | Do not use for |
|-------|-----|----------------|
| `--ink` | text, borders, inverted surfaces, hard shadows | disabled text |
| `--paper` | page and input backgrounds | story backgrounds |
| `--accent` | primary action background, focus ring, selected edges | small text on white (contrast fails) |
| `--accent-ink` | text/icons on accent | body text |
| `--danger` | destructive text/icons and destructive hover | generic emphasis |
| `--danger-bg` | destructive button rest state | page background |
| `--muted` | secondary text, hints | primary labels |
| `--line` | inner dividers, disabled outlines | structural borders (use `--border`) |
| `--surface` | inset panels, modal canvas wells | cards |

Contrast rules: body text must be 4.5:1 or better. `--ink` on `--paper` is 21:1;
`--accent-ink` on `--accent` is 9.9:1; `--danger` on `--paper` is 5.7:1. Never put
white text on `--accent`.

### 2.2 Typography

- One UI family: Inconsolata, self-hosted as `mono.woff2`. There is no Google Fonts `@import`.
  Fallback is the system monospace stack.
- Story fonts are chosen in Presentation settings and are not part of the editor
  tokens. They are bundled OFL woff2 files embedded into the exported document.
- UI labels are written lowercase in the message catalog; do **not** apply
  `text-transform: lowercase` globally. It breaks acronyms (`EN`, `JSON`, `GIF`),
  names, and some locales.
- Headings use `--text-lg`/`--text-xl`, weight 700. Body and controls use 400.
- Line height: 1.2 for headings, 1.45 for body. No justified text.
- No letter-spacing except optional uppercase micro-labels, which should be rare.
- Do not use italics in editor chrome.

### 2.3 Spacing and layout

- Spacing follows the 4px scale. Use the token, not an arbitrary `1.1rem`.
- Sidebar width: 300px. Canvas takes the rest. Supported editor viewport: 1024×700
  and above. The exported story is responsive; the editor is desktop-first.
- Sidebar header and footer are inverted (`--ink` background, `--paper` text) and
  visually anchor the app. Keep that.
- Panel padding: 24px. Control group gap: 16px. Inline row gap: 8px.
- Modal sizes: `sm` 420px, `md` 640px, `lg` 900px, `xl` 1200px, `full` viewport
  minus 32px. Default `md`. Preview and drawing studio use `full`.
- Do not use `100vw` for layout widths; use `100%` to avoid scrollbar overflow.

## 3. Components

Build these primitives in `src/ui/`. Components in `features/` compose them; they
do not reimplement them.

### 3.1 Button

```text
variants: primary | secondary | danger | ghost
sizes:    sm (28px) | md (36px) | lg (44px)
props:    disabled, full, dashed, type, ariaLabel
```

- Primary: accent background, ink text, 2px ink border. Hover: paper background.
- Secondary: paper background, ink text, 2px ink border. Hover: ink background,
  paper text.
- Danger: danger-bg background, danger text/border. Hover: danger background, white
  text.
- Ghost: transparent background, no border until hover/focus.
- Disabled: 40% opacity, no hover, `cursor: not-allowed`.
- Focus: 3px accent outline, 2px offset, always visible.
- Text remains sentence/lowercase as authored; no CSS transform.
- Icon-only actions use `IconButton` with a required `aria-label` and a text glyph
  (`×`, `+`, `←`, `→`, `↻`), not an emoji.

### 3.2 Field

- A label is always associated with the control (`for`/`id`), including color inputs,
  selects, and hidden file inputs (label acts as the button).
- Structure: label, control, optional hint, optional error. Error text is
  `--danger` and announced via `aria-describedby`.
- Inputs/selects/textareas: paper background, 2px ink border, 0 radius, 36px
  minimum height, 8px horizontal padding. Focus border: accent plus outline.
- Selects use `appearance: none` with the app's own ink chevron; they are not
  native browser widgets. Color inputs use the same border, paper background,
  and accent focus border, with the swatch inset by 2px.
- Checkboxes and radios are native; the whole label is clickable.
- Color fields show the swatch and the hex value as text. The color input is not
  the only way to read or set the value.

### 3.3 Modal

All dialogs use `ui/Modal.svelte`: one backdrop/header/footer structure, focus trap,
Escape close, focus restoration, and body scroll lock. Components provide body and
footer snippets; no dialog re-implements the shell or close button.

One `Modal.svelte` for all dialogs. Props: `open`, `title`, `size`, `onclose`,
`footer` snippet, `children`.

- Backdrop `--overlay`, centered panel, 2px ink border, `--shadow-2`.
- Header: inverted, 16px padding, title, close `IconButton`.
- Body scrolls independently; footer is optional and inverted or paper, used
  consistently per modal.
- Escape closes; clicking the backdrop closes only non-destructive dialogs;
  destructive dialogs require an explicit button.
- Focus is trapped inside while open; focus returns to the trigger on close.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Body scroll is locked while open.
- No component may duplicate backdrop/header/footer CSS.

### 3.4 Toast

- Replaces `alert()` for success, warning, and error.
- Bottom-left or bottom-center, above the canvas, `--z-toast`, max-width 420px,
  paper background, 2px ink border, `--shadow-1`.
- One action maximum ("undo" / "ver"). Auto-dismiss after 4s (errors 8s); pause on
  hover/focus. `aria-live="polite"` (errors `assertive`).
- Errors include the cause and the next step, not just "failed".

### 3.5 Confirm dialog

- Uses `Modal` size `sm`; title, one sentence, cancel + destructive action.
- Destructive action label repeats the verb ("eliminar escena"), not "OK".
- Used for deleting a scene, clearing a drawing, and replacing a project.

### 3.6 Other primitives

- `SegmentedControl` for mutually exclusive, small sets (language, tool size,
  alignment). `aria-pressed` or radio semantics.
- `FileButton`: a label styled as a button with a hidden file input; keyboard
  accessible; shows the selected filename.
- `PanelSection`: title + content + optional action; used in the inspector.
- `EmptyState`: one sentence and one action. No illustrations.
- `StatusPill`: saved/saving/error; text + color, not color alone.
- `CodeArea`: monospace, no resize, tab support for grammar JSON.

## 4. Editor composition rules

- Sidebar: header (brand, language, playtest, settings) / scrollable inspector /
  footer (project I/O, export). The header and footer stay fixed; only the inspector
  scrolls.
- Inspector sections: text, options, image, areas, advanced (igrama). Keep this
  order; drawing is part of the image section, not a separate page.
- Buttons that affect the whole project (playtest, export, new) are not mixed with
  per-scene controls.
- Scene node: 200px wide; header inverted; body text clamped to three lines; image
  thumbnail in color; output rows with label + handle. Start scene gets a small
  "inicio" badge in the header. Unlinked options show an empty handle, not a fake
  target.
- Canvas: dotted background, black wires, accent on hover/selected, controls and
  minimap in the same brutalist frame. Do not add floating toolbars over nodes.
- Selection: one selected scene at a time. Clicking the pane clears it.

## 5. Interaction and accessibility

- Focus is never hidden. Use `:focus-visible` with the accent outline.
- Minimum target: 32×32px; primary actions 44px. Small icon buttons need padding,
  not a tiny hit area.
- Hover is an enhancement, never the only way to discover an action.
- Disabled controls explain why (hint or tooltip), especially export when invalid.
- Keyboard: Tab order follows visual order; Escape closes modals; Enter submits
  single-field forms; Cmd/Ctrl+S saves the project.
- Color is not the only signal: selected/error/saved states include text or an icon.
- Respect `prefers-reduced-motion` for UI transitions; story animation is content
  and remains user-controlled.
- Every image has meaningful `alt` or is marked decorative. Generated GIF previews
  use a scene-based alt ("vista de la escena X").
- Canvas-only editing is not fully keyboard accessible in this release; the scene
  list/inspector is the keyboard path for editing content. Do not claim WCAG
  compliance.

## 6. Story presentation (separate system)

Story presentation is user data, not editor theme. It is generated by
`buildStoryCSS(presentation)` and embedded in the exported document. The editor's
CSS must never target `#story-root`, `.storygeneraldiv`, `.storydiv`, `.storyp`,
`.storybutton`, `.storyimage*`, or `--av-*`.

### 6.1 Color schemes

Each scheme is exactly five colors: background, ink, accent, support, highlight.
Applying one maps them to the eight engine colors (support becomes the button
background, hover uses ink/background, and accent/button text is contrast-derived)
and sets the button border to ink. Typography, layout, buttons, image frame, and
custom CSS are preserved.

| Scheme | Background | Ink | Accent | Support | Highlight |
|--------|------------|-----|--------|---------|-----------|
| Papel | `#ffffff` | `#000000` | `#00bfff` | `#ffd23f` | `#ff5252` |
| Fósforo | `#07130b` | `#b8f5a6` | `#2f6b3a` | `#eaffdf` | `#6ee7b7` |
| Cianotipo | `#0a2a43` | `#e6f6ff` | `#59c2ff` | `#ffd166` | `#ff6b6b` |
| Pulpa | `#f3e7d3` | `#2a1a12` | `#b8431f` | `#e8b07a` | `#7a8f5a` |
| Noche | `#121212` | `#f2f2f2` | `#ffcc00` | `#ff6b9d` | `#5bc0eb` |
| Menta | `#eafff4` | `#073b2a` | `#ff6b6b` | `#6ee7b7` | `#ffd166` |

- The six cards in **ajustes → presentación** are these schemes. The same five
  colors are used by the drawing studio; there is no second drawing palette list.
- Editing any color in **paleta del proyecto** creates a custom scheme and applies
  it immediately to the preview theme and the drawing controls.
- All text/background and accent/button text pairs are validated at 4.5:1 by the
  data tests.
- Typography and layout remain separate controls; a scheme never silently changes
  the font.

### 6.2 Typography and layout controls

- Font: nine bundled OFL families — Inconsolata, EB Garamond, Inter, Space
  Grotesk, Source Sans 3, Nunito, Courier Prime, Crimson Pro, and Patrick Hand.
  The selected family is embedded as woff2 data URLs in the story document; no
  runtime font download. Preview and export share the same mapping. Copy and full
  OFL text are available under **licencias**. The selector has a live sample card
  beside it, rendered in the selected embedded family.
- Text size: 0.95 / 1.1 / 1.25 em. Line height: 1.35 / 1.5 / 1.65.
- Text alignment: left or center.
- Page width: 480 / 600 / 720 px. Page padding: 16 / 32 / 48 px.
- Vertical alignment: top or center. Scrolling stories are always top.
- Buttons: inline or stacked; full-width when stacked.
- Image frame: on/off. Radius inherits the global story radius.
- Shape: button border, container border, and radius. Presets provide defaults; these
  are advanced controls, not a CSS free-for-all.
- Custom CSS: advanced, last, scoped by convention to `#story-root`; reject
  `</style>`; no remote `@import`.

### 6.3 Story page structure

```text
body
└── main#story-root.story-page       width/padding/background/vertical alignment
    ├── header.story-header          optional title/author
    └── #storygeneraldiv             created by Aventura
        └── .storydiv
            ├── .storyimage-container
            ├── .storyp
            └── .storybutton-container
```

App CSS uses `#story-root` specificity to override engine defaults without
`!important` where possible. The same CSS is used in the iframe preview and the
exported file.

## 7. Drawing studio UI

The studio is a full-size modal, not a page. Keep it to one screen.

```text
┌────────────────────────────────────────────────────────────┐
│ dibujo                                        [×]          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│            ┌──────────────────────────┐   fondo ▣          │
│            │                          │   ● ● ● ●          │
│            │      canvas 4×           │                    │
│            │      512 × 512           │   herramienta      │
│            │                          │   pincel /         │
│            └──────────────────────────┘   pincel tramado / │
│                                           borrador         │
│                                           tamaño [—●——] 2  │
│                                                            │
│                                           [deshacer]       │
│                                           [borrar todo]    │
├────────────────────────────────────────────────────────────┤
│ cancelar                                      guardar       │
└────────────────────────────────────────────────────────────┘
```

- Canvas: fixed 128×128 internal pixels, displayed at 4× (512×512) with
  `image-rendering: pixelated`. On narrow screens, scale down to fit; never change
  the internal resolution.
- Background: the palette's background color. No checkerboard, no transparency in
  v1.
- Palette: the project color scheme from **ajustes → presentación**. The studio has
  no palette picker; it shows the four paint swatches from that scheme. The
  background is the canvas color; it changes when the project scheme changes. No
  per-drawing color picker, no eyedropper.
- Icons: each tool has a clear inline SVG icon (solid brush, dotted brush, eraser)
  plus its text label; icons are `aria-hidden` because the label is the name.
- Tools: `brush` (solid), `texture` (fixed ordered-dither/stipple pattern), and
  `eraser`. No fill. No marker/ink layer split, no under-painting, no layers UI.
- Sizes: one range slider with six positions (2 / 4 / 6 / 8 / 10 / 12 internal
  pixels), shared by both brushes and the eraser; the numeric 1–6 value is shown
  beside it. No pressure, no opacity, no anti-aliasing, no gradients.
- Animation: three frames, 250ms per frame (4 fps), looping live while drawing.
  No pause button in v1; drawing is the interaction.
- Ten-step undo, labeled "deshacer" / "undo" — never "oops". It restores up to the
  last ten actions, including an erase-all. Disabled when there is nothing to undo.
- "Borrar todo" / "erase all" clears immediately and is itself undoable; no
  confirmation dialog. This keeps the flow fast and makes the action reversible.
- Footer: cancel discards; save encodes a 1024×1024 GIF, stores the source, closes.
  If a drawing source exists, the studio reopens with it; otherwise the studio
  starts a new project-palette drawing and saving replaces the scene image.
- The studio reads the five colors from the active scheme; it does not define or
  choose palettes. Paint 1 = ink, paint 2 = accent, paint 3 = support, paint 4 =
  highlight.

- The textured brush is a single fixed pattern, not a texture picker. It trades
  solid coverage for a print-like grain and is expected to look rougher under line
  boil. The boil is deliberately restrained: whole-stroke offsets first, only rare
  point-level wobble.
- Not in v1: layers, timeline, onion skin, frame duplication, fill, marker/ink
  layers, per-drawing custom colors, resizable canvas, import, video, PNG/SVG
  export, or brushes beyond the two plus the eraser.

## 8. Content and internationalization rules

- Every visible string, placeholder, tooltip, `aria-label`, and error goes through
  `t(key, params)`. No literal UI text in components, including `×` labels.
- No string concatenation. Use `{name}`, `{count}`, `{target}` placeholders.
- Message catalogs are per-locale modules with identical keys. The test suite
  enforces parity and placeholder parity.
- Action labels are written lowercase in both languages when that is natural in the
  locale; do not force casing with CSS.
- Spanish and English are peers. Do not leave English in the Spanish catalog or
  vice versa. Proper nouns (Aventura, WigglyPaint) are not translated.
- UI locale and story language are separate. The story language is a project
  setting and controls export `<html lang>`; it is not changed by the editor
  language toggle.
- Error messages say what happened and what to do next, with the technical detail
  in a secondary line when useful.

## 9. Forbidden patterns

The following are review blockers:

- Inline `style="..."` for colors, spacing, typography, borders, or layout.
  Exception: dynamic geometry that cannot be a class (area rectangles, node
  positions owned by Svelte Flow), and CSS custom properties for data-driven values.
- Raw hex colors or `rgba()` outside `app.css` tokens or the presentation preset
  data.
- A new modal, backdrop, header, or footer implemented without `Modal`.
- A new button style implemented without `Button`/`IconButton`.
- `alert()`, `confirm()`, or `prompt()`.
- Duplicating Svelte Flow CSS overrides in both `app.css` and a component.
- `text-transform` for visual casing.
- `!important` except for third-party Svelte Flow overrides, kept in one place.
- English literals in components, or keys missing from either locale.
- Grayscale filters on story images.
- Editor CSS targeting story classes.
- Adding a control without a label, focus state, and mobile/touch target.
- A new setting without a default, a migration path, and an export representation.

## 10. UI definition of done

A UI change is done when:

1. It uses primitives, tokens, and `t()` exclusively.
2. It works with keyboard only (open, operate, close) and with touch.
3. Focus is visible and returns to the trigger after a modal.
4. Empty, loading, error, and disabled states exist where relevant.
5. It looks correct at 1024×700 and 1440×900.
6. Both locales fit without clipping (Spanish strings are often longer).
7. It does not leak editor styles into the story iframe.
8. The story preview and export still match.
