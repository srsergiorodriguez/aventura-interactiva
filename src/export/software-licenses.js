import licenses from '../assets/fonts/licenses.json';

/**
 * License notice for the runtime code embedded in an exported story.
 * Svelte/Svelte Flow are build dependencies, not part of the exported page.
 *
 * @param {{ includeMiniGif?: boolean }} [options]
 * @returns {string}
 */
export function softwareLicenseNotice(options = {}) {
  const wanted = new Set(['Aventura']);
  if (options.includeMiniGif) wanted.add('MiniGif');
  const entries = licenses.software.filter((entry) => wanted.has(entry.name));
  return [
    ...entries.map((entry) =>
      [entry.name, entry.copyright, entry.licenseName, entry.source].join('\n'),
    ),
    licenses.mit,
  ].join('\n\n');
}
