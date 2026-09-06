import { useEffect } from "react";

export function useDisableHoverOnTouch() {
  useEffect(() => {
    const isTouchDevice = (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );

    if (!isTouchDevice) return;

    const style = document.createElement("style");
    style.id = "touch-hover-killer";
    style.innerHTML = `
      *:hover,
      *:focus {
        transform: none !important;
        scale: none !important;
        translate: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById("touch-hover-killer");
      if (el) el.remove();
    };
  }, []);
}
