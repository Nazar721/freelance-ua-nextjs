"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let query: MediaQueryList | undefined;
const notify = () => { for (const listener of listeners) listener(); };
function subscribe(listener: () => void) {
  query ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  if (listeners.size === 0) query.addEventListener("change", notify);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) query?.removeEventListener("change", notify);
  };
}
const snapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverSnapshot = () => false;
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
