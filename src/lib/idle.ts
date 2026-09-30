// Run `callback` once the page has finished loading and the main thread is idle,
// so deferred work never competes with the critical path. Returns a cancel function.
export function afterLoadIdle(callback: () => void, timeout = 3000): () => void {
  let idleId: number | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(callback, { timeout });
    } else {
      timer = setTimeout(callback, 200);
    }
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timer !== undefined) clearTimeout(timer);
  };
}
