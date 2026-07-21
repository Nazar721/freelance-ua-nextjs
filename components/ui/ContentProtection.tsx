"use client";

import { useEffect } from "react";

export default function ContentProtection() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();

    const isProtected = (target: HTMLElement | null) =>
      target?.closest("img, video, picture, figure, [data-no-download]");

    const onContextMenu = (e: MouseEvent) => {
      if (isProtected(e.target as HTMLElement)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onDragStart = (e: DragEvent) => {
      if (isProtected(e.target as HTMLElement)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["s", "S", "u", "U", "j", "J", "i", "I"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    // ── Mobile touch protection ──
    // Block long-press context menu on protected elements
    const onTouchStart = (e: TouchEvent) => {
      if (isProtected(e.target as HTMLElement)) {
        e.preventDefault();
      }
    };

    // Block touch-move based drag on protected elements
    const onTouchMove = (e: TouchEvent) => {
      if (isProtected(e.target as HTMLElement)) {
        e.preventDefault();
      }
    };

    // Prevent iOS long-press image preview / save dialog
    const onGestureStart = (e: Event) => {
      if (isProtected(e.target as HTMLElement)) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("dragstart", onDragStart, true);
    document.addEventListener("keydown", onKeyDown);

    // Mobile-specific listeners
    document.addEventListener("touchstart", onTouchStart, { capture: true, passive: false });
    document.addEventListener("touchmove", onTouchMove, { capture: true, passive: false });
    document.addEventListener("gesturestart", onGestureStart, { capture: true, passive: false });

    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("touchmove", onTouchMove, true);
      document.removeEventListener("gesturestart", onGestureStart, true);
    };
  }, []);

  return null;
}
