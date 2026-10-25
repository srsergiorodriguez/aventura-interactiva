import { describe, expect, it } from 'vitest';
import { buildStoryCSS } from './presentation-css.js';

describe('buildStoryCSS', () => {
  it('uses the presentation layout and typography values', () => {
    const css = buildStoryCSS({
      layout: { maxWidth: 480, padding: 16, verticalAlign: 'top' },
      typography: { size: 1.25, lineHeight: 1.65, align: 'center' },
      buttons: { layout: 'stack' },
      image: { frame: false },
      customCSS: 'body { outline: 1px solid red; }',
    });
    expect(css).toContain('max-width: 480px');
    expect(css).toContain('padding: 16px');
    expect(css).toContain('justify-content: flex-start');
    expect(css).toContain('font-size: 1.25em');
    expect(css).toContain('line-height: 1.65');
    expect(css).toContain('text-align: center');
    expect(css).toContain('flex-direction: column');
    expect(css).toContain('border: none');
    expect(css).toContain('body { outline: 1px solid red; }');
  });

  it('escapes a style-closing sequence in custom CSS', () => {
    const css = buildStoryCSS({ customCSS: 'body{}</style><script>alert(1)</script>' });
    expect(css).not.toContain('</style>');
    expect(css).toContain('<\\/style>');
  });

  it('falls back for invalid colors and clamps numeric values', () => {
    const css = buildStoryCSS({
      colors: { background: 'red; }', text: 'not-a-color' },
      layout: { maxWidth: 99999, padding: -10 },
      typography: { size: 99, lineHeight: 0 },
    });
    expect(css).toContain('background: #ffffff');
    expect(css).toContain('color: #000000');
    expect(css).toContain('max-width: 1200px');
    expect(css).toContain('padding: 0px');
    expect(css).toContain('font-size: 2em');
    expect(css).toContain('line-height: 1');
  });
});
