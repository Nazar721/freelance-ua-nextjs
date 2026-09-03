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
