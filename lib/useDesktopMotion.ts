"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let query: MediaQueryList | undefined;
const notify = () => { for (const listener of listeners) listener(); };
function subscribe(listener: () => void) {
  query ??= window.matchMedia("(min-width: 769px) and (prefers-reduced-motion: no-preference)");
  if (listeners.size === 0) query.addEventListener("change", notify);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) query?.removeEventListener("change", notify);
  };
}
const snapshot = () => window.matchMedia("(min-width: 769px) and (prefers-reduced-motion: no-preference)").matches;
const serverSnapshot = () => false;
export function useDesktopMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
