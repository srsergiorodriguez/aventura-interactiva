// Bundled OFL fonts. Vite inlines the woff2 bytes, so exported stories carry the
// exact same font file in a data URL and work offline on any OS.
import monoData from './mono.woff2?inline';
import bookData from './book.woff2?inline';
import sansData from './sans.woff2?inline';
import groteskData from './grotesk.woff2?inline';
import humanistData from './humanist.woff2?inline';
import roundedData from './rounded.woff2?inline';
import typewriterRegular from './typewriter-400.woff2?inline';
import typewriterBold from './typewriter-700.woff2?inline';
import palatinoData from './palatino.woff2?inline';
import schoolRegular from './school-400.woff2?inline';
import licenses from './licenses.json';

export const FONT_FAMILIES = Object.freeze({
  mono: {
    family: 'Inconsolata',
    faces: [{ weight: '400 700', data: monoData }],
  },
  book: {
    family: 'EB Garamond',
    faces: [{ weight: '400 700', data: bookData }],
  },
  sans: {
    family: 'Inter',
    faces: [{ weight: '400 700', data: sansData }],
  },
  grotesk: {
    family: 'Space Grotesk',
    faces: [{ weight: '400 700', data: groteskData }],
  },
  humanist: {
    family: 'Source Sans 3',
    faces: [{ weight: '400 700', data: humanistData }],
  },
  rounded: {
    family: 'Nunito',
    faces: [{ weight: '400 700', data: roundedData }],
  },
  typewriter: {
    family: 'Courier Prime',
    faces: [
      { weight: '400', data: typewriterRegular },
      { weight: '700', data: typewriterBold },
    ],
  },
  palatino: {
    family: 'Crimson Pro',
    faces: [{ weight: '400 700', data: palatinoData }],
  },
  school: {
    family: 'Patrick Hand',
    faces: [{ weight: '400', data: schoolRegular }],
  },
});

/**
 * @param {string} fontId
 * @returns {string}
 */
export function fontFaceCSS(fontId) {
  const entry = FONT_FAMILIES[fontId] || FONT_FAMILIES.mono;
  return entry.faces
    .map(
      (face) => `@font-face {
  font-family: '${entry.family}';
  src: url('${face.data}') format('woff2');
  font-weight: ${face.weight};
  font-style: normal;
  font-display: swap;
}`,
    )
    .join('\n');
}

/**
 * @param {string} fontId
 * @returns {string}
 */
export function fontLicenseNotice(fontId) {
  const font = licenses.fonts.find((entry) => entry.id === fontId) || licenses.fonts[0];
  return [
    `Embedded font: ${font.name}`,
    font.copyright,
    font.licenseName,
    font.licenseUrl,
    '',
    licenses.ofl,
  ].join('\n');
}
