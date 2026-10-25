import { describe, expect, it } from 'vitest';
import projectFixture from '../../tests/fixtures/project-mini.json';
import { DomainError } from '../domain/errors.js';
import { parseProject } from '../domain/project.js';
import { buildStoryDocument } from './document.js';

const FIXED_NOW = () => '2026-01-01T00:00:00.000Z';
const ENGINE = 'const Aventura = class {};\nexport { Aventura as default };';
const MINIGIF = 'class MiniGif {}\nexport { MiniGif };';

describe('buildStoryDocument', () => {
  it('builds the page and boots the compiled story', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const html = buildStoryDocument(project, { engineSource: ENGINE });

    expect(html).toContain('<html lang="es">');
    expect(html).toContain('<title>Mini</title>');
    expect(html).toContain('id="story-root"');
    expect(html).toContain('data-scroll="false"');
    expect(html).toContain('data-buttons="inline"');
    expect(html).toContain('adventureContainer":"story-root"');
    expect(html).toContain('max-width: 480px');
    expect(html).toContain('window.Aventura = Aventura;');
    expect(html).toContain('startAdventure("a")');
    expect(html).toContain('const scenes =');
    expect(html).toContain('id="story-loading"');
    expect(html).not.toContain('<script type="module">');
    expect(html).not.toContain('export { Aventura as default }');
  });

  it('is deterministic for the same project and sources', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const first = buildStoryDocument(project, { engineSource: ENGINE });
    const second = buildStoryDocument(project, { engineSource: ENGINE });
    expect(second).toBe(first);
  });

  it('embeds the selected font and its license, with no remote font request', () => {
    const base = parseProject(projectFixture, { now: FIXED_NOW });
    const mono = buildStoryDocument(
      {
        ...base,
        presentation: {
          ...base.presentation,
          typography: { ...base.presentation.typography, font: 'mono' },
        },
      },
      { engineSource: ENGINE },
    );
    expect(mono).toContain("font-family: 'Inconsolata'");
    expect(mono).toContain('data:font/woff2;base64,');
    expect(mono).toContain('SIL Open Font License 1.1');
    expect(mono).not.toContain('fonts.googleapis.com');

    const typewriter = buildStoryDocument(
      {
        ...base,
        presentation: {
          ...base.presentation,
          typography: { ...base.presentation.typography, font: 'typewriter' },
        },
      },
      { engineSource: ENGINE },
    );
    expect(typewriter).toContain("font-family: 'Courier Prime'");
    expect(typewriter).toContain('Copyright 2015 The Courier Prime Project Authors');
    expect(typewriter).not.toContain("font-family: 'Inconsolata'");
  });

  it('escapes hostile scene text and title', () => {
    const project = parseProject(
      {
        a: {
          text: '</script><script>alert(1)</script>',
          display: { x: 0, y: 0 },
        },
      },
      { now: FIXED_NOW },
    );
    const hostileTitle = { ...project, meta: { ...project.meta, title: '</title><b>' } };
    const html = buildStoryDocument(hostileTitle, { engineSource: ENGINE });

    expect(html).not.toContain('</script><script>alert(1)');
    expect(html).toContain('\\u003c/script');
    expect(html).toContain('&lt;/title&gt;&lt;b&gt;');
  });

  it('escapes custom CSS that tries to close the style element', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const hostile = {
      ...project,
      presentation: {
        ...project.presentation,
        customCSS: 'body{}</style><script>alert(1)</script>',
      },
    };
    const html = buildStoryDocument(hostile, { engineSource: ENGINE });
    expect(html).not.toContain('</style><script>alert(1)');
    expect(html).toContain('<\\/style>');
  });

  it('uses scroll and button layout attributes', () => {
    const base = parseProject(projectFixture, { now: FIXED_NOW });
    const project = {
      ...base,
      runtime: { ...base.runtime, adventureScroll: true },
      presentation: {
        ...base.presentation,
        buttons: { layout: 'stack' },
      },
    };
    const html = buildStoryDocument(project, { engineSource: ENGINE });
    expect(html).toContain('data-scroll="true"');
    expect(html).toContain('data-buttons="stack"');
  });

  it('includes MiniGif only when the story can generate GIFs', () => {
    const base = parseProject(projectFixture, { now: FIXED_NOW });
    const without = buildStoryDocument(base, { engineSource: ENGINE });
    expect(without).not.toContain('window.MiniGif');

    const withIgrama = {
      ...base,
      igrama: { metadata: { width: 10, height: 10 } },
      runtime: { ...base.runtime, igramaFormat: 'gif' },
    };
    const withGif = buildStoryDocument(withIgrama, {
      engineSource: ENGINE,
      miniGifSource: MINIGIF,
    });
    expect(withGif).toContain('class MiniGif');
    expect(withGif).toContain('window.MiniGif = MiniGif;');
    expect(withGif).not.toContain('export { MiniGif }');
  });

  it('uses story metadata and language in the document head', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const localized = {
      ...project,
      story: { ...project.story, lang: 'en' },
      meta: { ...project.meta, title: 'A <Story>', author: 'A & B' },
    };
    const html = buildStoryDocument(localized, { engineSource: ENGINE });
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('<title>A &lt;Story&gt;</title>');
    expect(html).toContain('<meta name="author" content="A &amp; B">');
  });

  it('refuses to build without a start scene', () => {
    const project = parseProject(projectFixture, { now: FIXED_NOW });
    const noStart = {
      ...project,
      story: { ...project.story, startSceneId: null },
    };
    try {
      buildStoryDocument(noStart, { engineSource: ENGINE });
    } catch (error) {
      expect(error).toBeInstanceOf(DomainError);
      expect(/** @type {DomainError} */ (error).code).toBe('MISSING_START');
      return;
    }
    throw new Error('Expected a DomainError');
  });
});
