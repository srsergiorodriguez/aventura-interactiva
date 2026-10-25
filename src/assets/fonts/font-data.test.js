import { describe, expect, it } from 'vitest';
import { FONT_STACKS } from '../../domain/presentation.js';
import { FONT_FAMILIES, fontFaceCSS, fontLicenseNotice } from './font-data.js';

describe('embedded font data', () => {
  it('bundles a woff2 face for every font option', () => {
    expect(Object.keys(FONT_FAMILIES)).toHaveLength(9);
    expect(Object.keys(FONT_FAMILIES).sort()).toEqual(Object.keys(FONT_STACKS).sort());
    for (const entry of Object.values(FONT_FAMILIES)) {
      expect(entry.family.length).toBeGreaterThan(0);
      expect(entry.faces.length).toBeGreaterThan(0);
      for (const face of entry.faces) {
        expect(face.data).toMatch(/^data:font\/woff2;base64,/);
        expect(face.data.length).toBeGreaterThan(1000);
      }
    }
  });

  it('builds @font-face CSS and a license notice for the selected font', () => {
    const css = fontFaceCSS('typewriter');
    expect(css).toContain("font-family: 'Courier Prime'");
    expect(css).toContain('font-weight: 400');
    expect(css).toContain('font-weight: 700');
    expect(css).toContain('data:font/woff2;base64,');

    const notice = fontLicenseNotice('school');
    expect(notice).toContain('Patrick Hand');
    expect(notice).toContain('SIL Open Font License 1.1');
    expect(notice).toContain('Copyright (c) 2010-2012 Patrick Wagesreiter');
  });

  it('falls back to the mono face for an unknown id', () => {
    expect(fontFaceCSS('missing')).toContain("font-family: 'Inconsolata'");
    expect(fontLicenseNotice('missing')).toContain('Inconsolata');
  });
});
