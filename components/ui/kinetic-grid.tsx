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
/** Maximum attraction of points towards the pointer. */
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
    const strength = subtle ? 0.45 : 1;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let points: Point[] = [];
    let pointer: { x: number; y: number; active: boolean } | null = null;
    let ripples: { x: number; y: number; born: number }[] = [];
    let elapsed = 0;
    let previous = 0;
    let raf = 0;
    let disposed = false;
    let modalOpen = false;
    const rippleDuration = 1.8;
    const rippleSpeed = 350;
    const blocked = () => disposed || pausedRef.current || modalOpen || document.hidden;
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      previous = 0;
      canvas.dataset.running = "false";
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (pointer?.active) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, POINTER_RADIUS);
        glow.addColorStop(0, withAlpha(color, (dark ? 0.11 : 0.07) * strength));
        glow.addColorStop(1, withAlpha(color, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(pointer.x - POINTER_RADIUS, pointer.y - POINTER_RADIUS, POINTER_RADIUS * 2, POINTER_RADIUS * 2);
      }
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = withAlpha(lineColor, (dark ? 0.2 : 0.14) * strength);
      ctx.beginPath();
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const point = points[row * cols + col];
          // Share real displaced endpoints so every cell remains connected.
          for (const neighbor of [
            col + 1 < cols ? points[row * cols + col + 1] : null,
            row + 1 < rows ? points[(row + 1) * cols + col] : null,
          ]) {
            if (!neighbor) continue;
            ctx.moveTo(point.x + point.dx, point.y + point.dy);
            ctx.lineTo(neighbor.x + neighbor.dx, neighbor.y + neighbor.dy);
          }
        }
      }
      ctx.stroke();
      for (const point of points) {
        const influence = pointer?.active ? Math.max(0, 1 - Math.hypot(point.x - pointer.x, point.y - pointer.y) / POINTER_RADIUS) : 0;
        ctx.fillStyle = withAlpha(color, ((dark ? 0.24 : 0.19) + influence * 0.5) * strength);
        ctx.beginPath();
        ctx.arc(point.x + point.dx, point.y + point.dy, 1.05 + influence * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const ripple of ripples) {
        const age = elapsed - ripple.born;
        const opacity = Math.pow(1 - age / rippleDuration, 2) * strength;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, Math.max(1, age * rippleSpeed), 0, Math.PI * 2);
        ctx.strokeStyle = withAlpha(color, opacity * (dark ? 0.65 : 0.45));
        ctx.lineWidth = 1.6;
        ctx.shadowColor = withAlpha(color, opacity * 0.5);
        ctx.shadowBlur = 9;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      canvas.dataset.ripples = String(ripples.length);
    };

    const step = (now: number) => {
      raf = 0;
      if (blocked()) { stop(); return; }
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
      previous = now;
      elapsed += dt;
      ripples = ripples.filter((ripple) => elapsed - ripple.born < rippleDuration);
      let moving = ripples.length > 0;
      const frameScale = dt * 60;
      for (const point of points) {
        let targetX = 0;
        let targetY = 0;
        if (pointer?.active) {
          const px = pointer.x - point.x;
          const py = pointer.y - point.y;
          const distance = Math.hypot(px, py);
          if (distance > 0.001 && distance < POINTER_RADIUS) {
            const pull = Math.pow(1 - distance / POINTER_RADIUS, 2) * MAX_DISPLACEMENT;
            targetX = px / distance * pull;
            targetY = py / distance * pull;
          }
        }
        for (const ripple of ripples) {
          const x = point.x - ripple.x;
          const y = point.y - ripple.y;
          const distance = Math.hypot(x, y);
          const age = elapsed - ripple.born;
          const offset = distance - age * rippleSpeed;
          if (distance > 0.001 && Math.abs(offset) < 90) {
            const wave = Math.sin(offset / 90 * Math.PI) * Math.pow(1 - Math.abs(offset) / 90, 2) * 25 * (1 - age / rippleDuration);
            targetX += x / distance * wave;
            targetY += y / distance * wave;
          }
        }
        point.vx = (point.vx + (targetX - point.dx) * SPRING_STIFFNESS * frameScale) * Math.pow(DAMPING, frameScale);
        point.vy = (point.vy + (targetY - point.dy) * SPRING_STIFFNESS * frameScale) * Math.pow(DAMPING, frameScale);
        point.dx += point.vx * frameScale;
        point.dy += point.vy * frameScale;
        if (Math.max(Math.abs(targetX - point.dx), Math.abs(targetY - point.dy), Math.abs(point.vx), Math.abs(point.vy)) > SETTLE_EPSILON) {
          moving = true;
        } else {
          point.dx = targetX;
          point.dy = targetY;
          point.vx = point.vy = 0;
        }
      }
      draw();
      if (moving) raf = requestAnimationFrame(step);
      else stop();
    };
    const start = () => {
      if (raf || blocked()) return;
      previous = 0;
      canvas.dataset.running = "true";
      raf = requestAnimationFrame(step);
    };
    startRef.current = start;
    stopRef.current = stop;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      points = Array.from({ length: rows * cols }, (_, i) => ({ x: i % cols * CELL, y: Math.floor(i / cols) * CELL, dx: 0, dy: 0, vx: 0, vy: 0 }));
      draw();
      if (pointer?.active || ripples.length) start();
    };
    const releasePointer = () => {
      if (pointer) pointer.active = false;
      start();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || blocked()) return;
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
      start();
    };
    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) releasePointer();
    };
    const onClick = (event: MouseEvent) => {
      if (blocked() || event.button !== 0 || event.detail === 0) return;
      const target = event.target;
      if (!(target instanceof Element) || target.closest("a,button,input,select,textarea,label,img,video,iframe,canvas,[role='button'],[role='dialog'],[contenteditable],.yarl__container,p,h1,h2,h3,h4,h5,h6,li,figcaption")) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      ripples = [...ripples.slice(-3), { x, y, born: elapsed }];
      start();
    };
    const syncPause = () => {
      modalOpen = !!document.querySelector(".yarl__container, [role='dialog'], dialog[open]");
      canvas.dataset.modalPaused = String(modalOpen);
      if (blocked()) { stop(); if (pointer) pointer.active = false; }
      else start();
    };
    const dialogSelector = ".yarl__container, [role='dialog'], dialog";
    const observer = new MutationObserver((records) => {
      if (records.some((record) => record.type === "attributes" || [...record.addedNodes, ...record.removedNodes].some((node) => node instanceof Element && (node.matches(dialogSelector) || node.querySelector(dialogSelector))))) syncPause();
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["role", "open"] });
    resize();
    syncPause();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("blur", releasePointer);
    document.addEventListener("visibilitychange", syncPause);
    return () => {
      disposed = true;
      stop();
      startRef.current = stopRef.current = null;
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("click", onClick);
      window.removeEventListener("blur", releasePointer);
      document.removeEventListener("visibilitychange", syncPause);
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
