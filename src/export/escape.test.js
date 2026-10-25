import { describe, expect, it } from 'vitest';
import {
  escapeHtml,
  escapeStyle,
  jsonForScript,
  storyFilename,
} from './escape.js';

describe('export escaping', () => {
  it('escapes script-closing text in JSON', () => {
    const json = jsonForScript({ text: '</script><script>alert(1)</script>' });
    expect(json).toContain('\\u003c/script');
    expect(json).not.toContain('</script>');
  });

  it('escapes HTML for titles', () => {
    expect(escapeHtml('</title><b>"x" & y')).toBe(
      '&lt;/title&gt;&lt;b&gt;&quot;x&quot; &amp; y',
    );
  });

  it('prevents custom CSS from closing a style element', () => {
    expect(escapeStyle('body{}</style><script>')).toContain('<\\/style>');
    expect(escapeStyle('body{}</style><script>')).not.toContain('</style>');
  });

  it('derives a safe filename from the title', () => {
    expect(storyFilename('Por la ventana')).toBe('por-la-ventana.html');
    expect(storyFilename('áccento!')).toBe('accento.html');
    expect(storyFilename('')).toBe('aventura.html');
  });
});
