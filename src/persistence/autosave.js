// @ts-check

export const AUTOSAVE_DB_NAME = 'aventura-interactiva';
export const AUTOSAVE_STORE_NAME = 'projects';
export const AUTOSAVE_KEY = 'current';
export const AUTOSAVE_DB_VERSION = 1;

export class PersistenceError extends Error {
  /**
   * @param {string} code
   * @param {{ cause?: string }} [details]
   */
  constructor(code, details = {}) {
    super(code);
    this.name = 'PersistenceError';
    this.code = code;
    this.details = details;
  }
}

/**
 * @param {IDBRequest} request
 * @returns {Promise<any>}
 */
function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * @param {IDBTransaction} transaction
 * @param {string} code
 * @returns {Promise<void>}
 */
function transactionDone(transaction, code) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(
        new PersistenceError(code, {
          cause: transaction.error?.message,
        }),
      );
    transaction.onabort = () =>
      reject(
        new PersistenceError(code, {
          cause: transaction.error?.message,
        }),
      );
  });
}

/**
 * @param {IDBFactory|undefined} factory
 * @returns {IDBFactory}
 */
function requireFactory(factory) {
  if (!factory || typeof factory.open !== 'function') {
    throw new PersistenceError('UNAVAILABLE');
  }
  return factory;
}

/**
 * @param {IDBFactory} factory
 * @returns {Promise<IDBDatabase>}
 */
function openDatabase(factory) {
  return new Promise((resolve, reject) => {
    let request;
    try {
      request = factory.open(AUTOSAVE_DB_NAME, AUTOSAVE_DB_VERSION);
    } catch (error) {
      reject(
        new PersistenceError('DB_OPEN_FAILED', {
          cause: error instanceof Error ? error.message : String(error),
        }),
      );
      return;
    }

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(AUTOSAVE_STORE_NAME)) {
        db.createObjectStore(AUTOSAVE_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(
        new PersistenceError('DB_OPEN_FAILED', {
          cause: request.error?.message,
        }),
      );
    request.onblocked = () => reject(new PersistenceError('DB_BLOCKED'));
  });
}

/**
 * Persist the current project. The caller must pass a plain snapshot (for
 * example `$state.snapshot(project)`); Svelte proxies are not structured-cloneable.
 *
 * @param {unknown} project
 * @param {{ indexedDB?: IDBFactory }} [options]
 * @returns {Promise<void>}
 */
export async function saveProject(project, options = {}) {
  const factory = requireFactory(
    options.indexedDB ?? (typeof indexedDB === 'undefined' ? undefined : indexedDB),
  );
  const db = await openDatabase(factory);
  try {
    const transaction = db.transaction(AUTOSAVE_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(AUTOSAVE_STORE_NAME);
    const done = transactionDone(transaction, 'SAVE_FAILED');

    try {
      store.put(project, AUTOSAVE_KEY);
    } catch (error) {
      done.catch(() => {});
      throw new PersistenceError('SAVE_FAILED', {
        cause: error instanceof Error ? error.message : String(error),
      });
    }

    await done;
  } finally {
    db.close();
  }
}

/**
 * Load the last autosaved project, or null if there is none.
 *
 * @param {{ indexedDB?: IDBFactory }} [options]
 * @returns {Promise<unknown|null>}
 */
export async function loadProject(options = {}) {
  const factory = requireFactory(
    options.indexedDB ?? (typeof indexedDB === 'undefined' ? undefined : indexedDB),
  );
  const db = await openDatabase(factory);
  try {
    const transaction = db.transaction(AUTOSAVE_STORE_NAME, 'readonly');
    const store = transaction.objectStore(AUTOSAVE_STORE_NAME);
    const done = transactionDone(transaction, 'LOAD_FAILED');
    let value;
    try {
      value = await requestResult(store.get(AUTOSAVE_KEY));
    } catch (error) {
      done.catch(() => {});
      throw new PersistenceError('LOAD_FAILED', {
        cause: error instanceof Error ? error.message : String(error),
      });
    }
    await done;
    return value ?? null;
  } finally {
    db.close();
  }
}

/**
 * @param {{ indexedDB?: IDBFactory }} [options]
 * @returns {Promise<void>}
 */
export async function clearProject(options = {}) {
  const factory = requireFactory(
    options.indexedDB ?? (typeof indexedDB === 'undefined' ? undefined : indexedDB),
  );
  const db = await openDatabase(factory);
  try {
    const transaction = db.transaction(AUTOSAVE_STORE_NAME, 'readwrite');
    const done = transactionDone(transaction, 'CLEAR_FAILED');
    transaction.objectStore(AUTOSAVE_STORE_NAME).delete(AUTOSAVE_KEY);
    await done;
  } finally {
    db.close();
  }
}

/**
 * @param {IDBFactory|undefined} [factory]
 * @returns {boolean}
 */
export function isAutosaveAvailable(
  factory = typeof indexedDB === 'undefined' ? undefined : indexedDB,
) {
  return Boolean(factory && typeof factory.open === 'function');
}
