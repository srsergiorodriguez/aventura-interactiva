// @ts-check

/**
 * A domain error is a failure of document rules, not a UI concern. It carries a
 * stable code so the interface layer can localize it.
 */
export class DomainError extends Error {
  /**
   * @param {string} code
   * @param {Record<string, unknown>} [details]
   */
  constructor(code, details = {}) {
    super(code);
    this.name = 'DomainError';
    this.code = code;
    this.details = details;
  }
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
export function isPlainObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null)
  );
}

/**
 * Define an own enumerable property without invoking prototype setters. Scene
 * IDs come from user input and must never be able to touch Object.prototype.
 *
 * @template T
 * @param {Record<string, T>} target
 * @param {string} key
 * @param {T} value
 */
export function setOwn(target, key, value) {
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    configurable: true,
    writable: true,
  });
}

/**
 * @param {Record<string, unknown>} object
 * @param {string} key
 */
export function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
