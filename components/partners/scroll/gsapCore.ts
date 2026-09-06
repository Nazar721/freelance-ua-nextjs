"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

/** Refresh triggers once fonts (and any pending images) have settled. */
export function refreshAfterFonts() {
  if (typeof document === "undefined") return;
  const run = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) {
    document.fonts.ready.then(run).catch(run);
  } else {
    requestAnimationFrame(run);
  }
}

/**
 * Run a ScrollTrigger-driven entrance setup only once the page is actually
 * scrolled to the very top, and return a cleanup for the tweens it creates.
 *
 * Why: Next's App Router mounts the new route's components while the previous
 * (deeply scrolled) page is still on screen. At that wrong offset, every
 * `start: "top 80%"` entrance fires instantly and plays out — so once the
 * scroll finally jumps back to the top the whole page looks pre-played/static.
 *
 * This helper waits until the scroll has been reset to 0, then builds the
 * tweens against that fresh top position so their reveal plays only when the
 * user scrolls down into each section. Animations are wrapped in their own
 * GSAP context so unmounting still kills everything it created.
 */
export function whenScrollAtTop(scope: Element | null, cb: () => void): () => void {
  if (!scope || typeof window === "undefined") {
    cb();
    return () => {};
  }
  const ctx = gsap.context(() => {}, scope);
  let cleaned = false;
  const run = () => {
    if (cleaned) return;
    ctx.add(cb);
  };
  const cleanup = () => {
    cleaned = true;
    ctx.revert();
  };

  if (window.scrollY <= 0) {
    run();
    return cleanup;
  }

  let tries = 0;
  const check = () => {
    if (cleaned) return;
    tries += 1;
    if (window.scrollY <= 0 || tries > 150) {
      run();
      return;
    }
    requestAnimationFrame(check);
  };
  requestAnimationFrame(check);

  return cleanup;
}
