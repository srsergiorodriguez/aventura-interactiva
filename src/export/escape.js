// @ts-check

/**
 * Serialize a value for embedding inside a `<script>` element. `<` is escaped so a
 * scene string containing `</script>` cannot terminate the script. Line/paragraph
 * separators are escaped for older JavaScript parsers.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function jsonForScript(value) {
  return (JSON.stringify(value) ?? 'null')
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/**
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Prevent custom CSS from closing the containing `<style>` element. The backslash
 * makes the sequence harmless to the HTML parser.
 *
 * @param {string} css
 * @returns {string}
 */
export function escapeStyle(css) {
  return String(css).replace(/<\/style/gi, '<\\/style');
}

/**
 * @param {string} title
 * @returns {string}
 */
export function storyFilename(title) {
  const slug = String(title || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return `${slug || 'aventura'}.html`;
}
