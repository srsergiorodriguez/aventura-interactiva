// @ts-check

export const toastState = $state({
  /** @type {Array<{ id: number, message: string, tone: 'info'|'error' }>} */
  items: [],
});

let nextId = 0;
/** @type {Map<number, ReturnType<typeof setTimeout>>} */
const timers = new Map();

/**
 * @param {string} message
 * @param {'info'|'error'} [tone]
 */
export function notify(message, tone = 'info') {
  const id = ++nextId;
  toastState.items = [...toastState.items, { id, message, tone }];
  const timeout = setTimeout(
    () => dismiss(id),
    tone === 'error' ? 8000 : 4000,
  );
  timers.set(id, timeout);
}

/**
 * @param {number} id
 */
export function dismiss(id) {
  const timeout = timers.get(id);
  if (timeout) clearTimeout(timeout);
  timers.delete(id);
  toastState.items = toastState.items.filter((item) => item.id !== id);
}
