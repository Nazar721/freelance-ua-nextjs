"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let query: MediaQueryList | undefined;
const notify = () => { for (const listener of listeners) listener(); };
function subscribe(listener: () => void) {
  query ??= window.matchMedia("(max-width: 768px)");
  if (listeners.size === 0) query.addEventListener("change", notify);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) query?.removeEventListener("change", notify);
  };
}
const snapshot = () => window.matchMedia("(max-width: 768px)").matches;
const serverSnapshot = () => false;
export function useIsMobile() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
