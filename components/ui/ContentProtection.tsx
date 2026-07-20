"use client";

import { useEffect } from "react";

export default function ContentProtection() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();

    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("img, video, picture, figure, [data-no-download]")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("img, video, picture, figure, [data-no-download]")) {
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

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("dragstart", onDragStart, true);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
