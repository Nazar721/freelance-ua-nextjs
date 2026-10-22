"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { useTheme } from "@/lib/ThemeContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Rgba = { r: number; g: number; b: number; a: number };

/** Demo-blue replaced by purple so the case grid matches the site accent. */
const DEFAULT_ACCENT: Rgba = { r: 139, g: 92, b: 246, a: 0.6 };
const CELL = 46;
/** Radius of the pointer influence field. */
const POINTER_RADIUS = 190;
/** How far the points closest to the pointer are pushed away. */
const MAX_DISPLACEMENT = 20;
/** Spring constant pulling every point towards its target position. */
const SPRING_STIFFNESS = 0.12;
/** Velocity damping per frame — higher values settle faster. */
const DAMPING = 0.78;
/** Below this distance/velocity a point is considered at rest. */
const SETTLE_EPSILON = 0.02;

/** Parses `rgb()` / `rgba()` strings (the case glow colours) into channels. */
function parseRgba(value?: string): Rgba | null {
  if (!value) return null;
  const match = value.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i,
  );
  if (!match) return null;
  return {
    r: Math.round(Number(match[1])),
    g: Math.round(Number(match[2])),
    b: Math.round(Number(match[3])),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function withAlpha(color: Rgba, alpha: number) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

type Point = {
  x: number;
  y: number;
  /** Current displacement from the resting position. */
  dx: number;
  dy: number;
  /** Current velocity, used by the spring integrator. */
  vx: number;
  vy: number;
};

/**
 * Tracks "(hover: hover) and (pointer: fine)" through an external store so the
 * value can be read during render without a state update inside an effect.
 */
const finePointerListeners = new Set<() => void>();
let finePointerQuery: MediaQueryList | undefined;
function subscribeFinePointer(listener: () => void) {
  finePointerQuery ??= window.matchMedia("(hover: hover) and (pointer: fine)");
  if (finePointerListeners.size === 0) {
    finePointerQuery.addEventListener("change", notifyFinePointer);
  }
  finePointerListeners.add(listener);
  return () => {
    finePointerListeners.delete(listener);
    if (finePointerListeners.size === 0) {
      finePointerQuery?.removeEventListener("change", notifyFinePointer);
    }
  };
}
function notifyFinePointer() {
  for (const listener of finePointerListeners) listener();
}
const finePointerSnapshot = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const finePointerServerSnapshot = () => false;

/**
 * Decorative canvas backdrop for individual case pages.
 *
 * The grid reacts to pointer movement and settles back into place when the
 * pointer leaves, so the animation is event-driven: the RAF loop only runs
 * while something is in motion. It pauses for hidden tabs and while the
 * image modal is open, and it degrades to a static CSS grid on touch
 * devices, with reduced motion or when the canvas cannot be initialised.
 */
export default function KineticGrid({
  accent,
  accentStrong,
  paused = false,
  subtle = false,
}: {
  /** Case accent colour (`rgb()`/`rgba()`), taken from the record glow. */
  accent?: string;
  /** Stronger variant of the accent, used for the grid lines. */
  accentStrong?: string;
  /** Pause the animation (e.g. while the image modal is open). */
  paused?: boolean;
  /**
   * Draw the grid much fainter so it stays a texture behind the shared
   * wave backdrop instead of competing with the content.
   */
  subtle?: boolean;
}) {
  const { theme } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    finePointerSnapshot,
    finePointerServerSnapshot,
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startRef = useRef<(() => void) | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const [canvasFailed, setCanvasFailed] = useState(false);

  const useStatic = reduceMotion || !finePointer || canvasFailed;

  /**
   * Canvas ref callback. It checks the 2D context as soon as the node is
   * attached, so a browser without a 2D context can switch to the static CSS
   * grid without a state update inside an effect.
   */
  const attachCanvas = useCallback((node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
    if (node && !node.getContext("2d")) {
      setCanvasFailed(true);
    }
  }, []);

  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (useStatic) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const color = parseRgba(accent) ?? DEFAULT_ACCENT;
    const lineColor = parseRgba(accentStrong) ?? color;
    const dark = theme === "dark";
    let width = 0;
    let height = 0;
    let dpr = 1;
    let points: Point[] = [];
    let pointer: { x: number; y: number; active: boolean } | null = null;
    let raf = 0;
    let running = false;
    let disposed = false;

    const gridRows = () => Math.ceil(height / CELL) + 1;
    const gridCols = () => Math.ceil(width / CELL) + 1;

    const buildPoints = () => {
      const next: Point[] = [];
      for (let row = 0; row < gridRows(); row += 1) {
        for (let col = 0; col < gridCols(); col += 1) {
          next.push({ x: col * CELL, y: row * CELL, dx: 0, dy: 0, vx: 0, vy: 0 });
        }
      }
      points = next;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPoints();
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const baseAlpha = (dark ? 0.16 : 0.12) * (subtle ? 0.45 : 1);
      const lineAlpha = (dark ? 0.22 : 0.16) * (subtle ? 0.45 : 1);
      const cols = gridCols();

      ctx.lineWidth = 1;
      ctx.strokeStyle = withAlpha(lineColor, lineAlpha);
      ctx.beginPath();
      for (let row = 0; row < gridRows(); row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const point = points[row * cols + col];
          const x = Math.round(point.x + point.dx) + 0.5;
          const y = Math.round(point.y + point.dy) + 0.5;
          if (col < cols - 1) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + CELL, y);
          }
          if (row < gridRows() - 1) {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + CELL);
          }
        }
      }
      ctx.stroke();

      ctx.fillStyle = withAlpha(color, baseAlpha);
      for (const point of points) {
        /* Points close to an active pointer are drawn slightly larger. */
        let radius = 1.1;
        if (pointer?.active) {
          const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
          if (distance < POINTER_RADIUS) radius = 1.9;
        }
        ctx.beginPath();
        ctx.arc(point.x + point.dx, point.y + point.dy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /**
     * Integrates one animation frame.
     *
     * Every point is a damped spring towards a *target* position. With the
     * pointer nearby the target is pushed away from it, otherwise the target
     * is the resting position. Because the target is bounded and the spring
     * converges, the grid settles exactly and the loop can go idle.
     */
    const step = () => {
      if (pausedRef.current) {
        raf = 0;
        running = false;
        return;
      }
      let moving = false;
      for (const point of points) {
        /* Where this point wants to be right now. */
        let targetX = 0;
        let targetY = 0;
        if (pointer?.active) {
          const px = pointer.x - point.x;
          const py = pointer.y - point.y;
          const distance = Math.hypot(px, py);
          if (distance < POINTER_RADIUS && distance > 0.001) {
            const falloff = 1 - distance / POINTER_RADIUS;
            const push = falloff * falloff * MAX_DISPLACEMENT;
            targetX = (px / distance) * push;
            targetY = (py / distance) * push;
          }
        }

        const ax = (targetX - point.dx) * SPRING_STIFFNESS;
        const ay = (targetY - point.dy) * SPRING_STIFFNESS;

        point.vx = (point.vx + ax) * DAMPING;
        point.vy = (point.vy + ay) * DAMPING;
        point.dx += point.vx;
        point.dy += point.vy;

        const errorX = targetX - point.dx;
        const errorY = targetY - point.dy;
        if (
          Math.abs(errorX) > SETTLE_EPSILON ||
          Math.abs(errorY) > SETTLE_EPSILON ||
          Math.abs(point.vx) > SETTLE_EPSILON ||
          Math.abs(point.vy) > SETTLE_EPSILON
        ) {
          moving = true;
        } else {
          point.dx = targetX;
          point.dy = targetY;
          point.vx = 0;
          point.vy = 0;
        }
      }
      draw();
      if (!moving) {
        running = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || disposed || pausedRef.current) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    startRef.current = start;
    stopRef.current = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      running = false;
    };

    /**
     * Releases the pointer and wakes the loop up so the displaced points can
     * spring back to their resting position.
     */
    const releasePointer = () => {
      if (!pointer || !pointer.active) return;
      pointer.active = false;
      start();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
      start();
    };

    /**
     * The pointer left the window: the grid springs back to its resting shape.
     * The loop may already be idle at this point, so it has to be restarted.
     */
    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget !== null) return;
      releasePointer();
    };

    /** The window lost focus (alt-tab, click outside): release the pointer. */
    const onWindowBlur = () => {
      releasePointer();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        running = false;
      } else {
        start();
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [accent, accentStrong, theme, useStatic, subtle]);

  /* Pause/resume the loop: the last drawn frame stays on the canvas while
     the modal is open, and the grid resumes once it closes. The first run is
     skipped — the grid is already painted and settled at that point. */
  const wasPausedRef = useRef(paused);
  useEffect(() => {
    const wasPaused = wasPausedRef.current;
    wasPausedRef.current = paused;
    if (wasPaused === paused) return;
    if (paused) {
      stopRef.current?.();
      return;
    }
    startRef.current?.();
  }, [paused]);

  const accentColor = parseRgba(accent);

  return (
    <div
      aria-hidden
      className="kinetic-grid"
      data-paused={paused ? "true" : undefined}
      data-static={useStatic ? "true" : undefined}
      data-subtle={subtle ? "true" : undefined}
    >
      <canvas ref={attachCanvas} className="kinetic-grid__canvas" />
      {useStatic && (
        <div
          className="kinetic-grid__fallback"
          style={
            accentColor
              ? ({
                  "--kinetic-line": withAlpha(accentColor, 0.16),
                  "--kinetic-dot": withAlpha(accentColor, 0.18),
                } as CSSProperties)
              : undefined
          }
        />
      )}
    </div>
  );
}
