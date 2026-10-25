import { describe, expect, it } from 'vitest';
import {
  DEFAULT_PRESENTATION,
  FONT_STACKS,
  PRESENTATION_PRESETS,
  contrastText,
  paletteForPreset,
  presetIdForPalette,
  createPresentation,
  presentationToEngineTheme,
  presentationWithPalette,
  withPresentationPreset,
} from './presentation.js';

describe('presentation', () => {
  it('merges partial presentation input with defaults', () => {
    const presentation = createPresentation({
      colors: { background: '#101010' },
      typography: { font: 'book' },
      layout: { maxWidth: 480 },
    });
    expect(presentation.colors.background).toBe('#101010');
    expect(presentation.colors.text).toBe(DEFAULT_PRESENTATION.colors.text);
    expect(presentation.typography.font).toBe('book');
    expect(presentation.typography.size).toBe(1.1);
    expect(presentation.layout.maxWidth).toBe(480);
    expect(presentation.layout.padding).toBe(32);
    expect(presentation.presetId).toBe('papel');
    expect(presentation.customCSS).toBe('');
  });

  it('maps presentation to the engine theme contract', () => {
    const presentation = createPresentation({
      colors: {
        background: '#000000',
        text: '#ffffff',
        accentBackground: '#00bfff',
        accentText: '#000000',
        buttonBackground: '#111111',
        buttonText: '#eeeeee',
        buttonHoverBackground: '#eeeeee',
        buttonHoverText: '#111111',
      },
      typography: { font: 'book' },
      shape: { borderRadius: '4px' },
    });
    const theme = presentationToEngineTheme(presentation);
    expect(theme.background).toBe('#000000');
    expect(theme.text).toBe('#ffffff');
    expect(theme.fontFamily).toContain('EB Garamond');
    expect(theme.buttonBg).toBe('#111111');
    expect(theme.buttonText).toBe('#eeeeee');
    expect(theme.buttonHoverBg).toBe('#eeeeee');
    expect(theme.buttonHoverText).toBe('#111111');
    expect(theme.borderRadius).toBe('4px');
  });

  it('offers distinct system font stacks', () => {
    expect(Object.keys(FONT_STACKS)).toHaveLength(9);
    expect(new Set(Object.values(FONT_STACKS)).size).toBe(9);
    for (const stack of Object.values(FONT_STACKS)) {
      expect(stack).toMatch(/serif|sans-serif|monospace|cursive/);
    }
    expect(
      presentationToEngineTheme(
        createPresentation({ typography: { font: 'school' } }),
      ).fontFamily,
    ).toContain('Patrick Hand');
  });

  it('falls back to the mono stack for an unknown font id', () => {
    const presentation = createPresentation({
      typography: { font: 'unknown-font' },
    });
    expect(presentationToEngineTheme(presentation).fontFamily).toContain(
      'ui-monospace',
    );
  });
});

describe('presentation presets', () => {
  it('ships six complete, valid color schemes', () => {
    expect(Object.keys(PRESENTATION_PRESETS)).toHaveLength(6);
    for (const preset of Object.values(PRESENTATION_PRESETS)) {
      expect(preset.palette).toHaveLength(5);
      for (const color of preset.palette) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      }
      expect(preset.labelKey).toMatch(/^preset_/);
    }
  });

  it('maps scheme ids to palettes and back', () => {
    const colors = paletteForPreset('noche');
    expect(colors).toEqual(PRESENTATION_PRESETS.noche.palette);
    expect(presetIdForPalette(colors)).toBe('noche');
    expect(presetIdForPalette(['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'])).toBe(
      'custom',
    );
  });

  it('applies colors and a legible border while preserving typography and layout', () => {
    const current = createPresentation({
      typography: { font: 'book' },
      layout: { maxWidth: 480, padding: 16, verticalAlign: 'top' },
      buttons: { layout: 'stack' },
      image: { frame: false },
      customCSS: 'body { outline: 1px solid red; }',
    });
    const next = withPresentationPreset(current, 'noche');
    expect(next.presetId).toBe('noche');
    expect(next.colors.background).toBe('#121212');
    expect(next.typography.font).toBe('book');
    expect(next.shape.buttonBorder).toContain('#f2f2f2');
    expect(next.layout.maxWidth).toBe(480);
    expect(next.layout.verticalAlign).toBe('top');
    expect(next.buttons.layout).toBe('stack');
    expect(next.image.frame).toBe(false);
    expect(next.customCSS).toBe('body { outline: 1px solid red; }');
  });

  it('keeps a preset id when the preset still matches', () => {
    const presentation = withPresentationPreset(createPresentation(), 'menta');
    expect(presentation.presetId).toBe('menta');
  });

  it('falls back safely for an unknown preset', () => {
    const current = createPresentation({ layout: { maxWidth: 720 } });
    const next = withPresentationPreset(current, 'missing');
    expect(next.layout.maxWidth).toBe(720);
  });

  it('keeps text and accent text at accessible contrast', () => {
    const luminance = (hex) => {
      const channels = hex
        .replace('#', '')
        .match(/../g)
        .map((part) => parseInt(part, 16) / 255)
        .map((value) =>
          value <= 0.03928
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4,
        );
      return (
        0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
      );
    };
    const contrast = (a, b) => {
      const first = luminance(a);
      const second = luminance(b);
      return (
        (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
      );
    };

    for (const [id, preset] of Object.entries(PRESENTATION_PRESETS)) {
      const themed = presentationWithPalette(createPresentation(), preset.palette);
      expect(
        contrast(themed.colors.text, themed.colors.background),
        `${id} text`,
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrast(themed.colors.accentText, themed.colors.accentBackground),
        `${id} accent`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe('project palette mapping', () => {
  it('chooses readable text for accent and button surfaces', () => {
    expect(contrastText('#ffffff')).toBe('#000000');
    expect(contrastText('#000000')).toBe('#ffffff');
    expect(contrastText('#ffcc00')).toBe('#000000');
    expect(contrastText('#101010')).toBe('#ffffff');
  });

  it('maps five project colors to the story theme and becomes custom', () => {
    const presentation = presentationWithPalette(createPresentation(), [
      '#101418',
      '#f5f5f5',
      '#7bdff2',
      '#ff9f1c',
      '#ff5d8f',
    ]);
    expect(presentation.presetId).toBe('custom');
    expect(presentation.colors).toMatchObject({
      background: '#101418',
      text: '#f5f5f5',
      accentBackground: '#7bdff2',
      accentText: '#000000',
      buttonBackground: '#ff9f1c',
      buttonText: '#000000',
      buttonHoverBackground: '#f5f5f5',
      buttonHoverText: '#101418',
    });
    expect(presentation.shape.buttonBorder).toBe('2px solid #f5f5f5');
  });

  it('keeps the current presentation if the palette is incomplete', () => {
    const current = createPresentation({ layout: { maxWidth: 720 } });
    expect(presentationWithPalette(current, ['#fff'])).toEqual(current);
  });
});
