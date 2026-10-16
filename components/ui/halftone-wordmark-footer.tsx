"use client"

// Halftone Wordmark Footer — a site footer whose wordmark is set enormous and
// cropped by the bottom edge, printed as a field of halftone dots. Each dot is
// sized by how much of the letter covers its cell, so the type keeps its edges
// at any scale. Move across it and the dots part around the pointer on springs,
// warming in colour as they are pushed off their place; click and a shock ring
// runs through the word. Above it sit the brand line, the link columns and the
// rule with the copyright, all over a fine print grain.
//
// One file, React only. A 2D canvas for the dots and the grain, real anchors
// for the links. Every rule in the scoped <style> is .hwf- prefixed and nothing
// is fetched: the faces come from the host page (CSS custom properties) or the
// fallback stacks.
//
// Performance contract (kept deliberately strict):
//   * one rAF loop at most — every wake path funnels through `raf === 0`;
//   * the loop sleeps as soon as every dot's velocity is below the settle
//     threshold and no click ring is running. A stationary pointer holds its
//     dots displaced but does NOT keep the loop alive (that was the sample's
//     infinite-repaint bug);
//   * reduced motion and coarse pointers render one static frame and never
//     schedule an animation frame;
//   * the loop stops while the footer is out of view and while the tab is
//     hidden, resuming from those same signals;
//   * dot count and canvas pixel budget are capped, and layout passes are
//     coalesced into a single frame so a resize burst cannot stack loops.

import * as React from "react"
import Link from "next/link"

export interface HalftonePalette {
  /** The footer background. */
  background: string
  /** The dots at rest, and the text. */
  ink: string
  /** The colour a dot warms toward as it is pushed off its place. */
  warm: string
}

export type HalftonePreset = "night" | "paper" | "ember" | "cobalt"

export interface FooterLink {
  label: string
  /** Leave empty to render the label as plain text instead of a dead link. */
  href?: string
  /** Open in a new tab (implies rel="noopener noreferrer"). */
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface HalftoneWordmarkFooterProps {
  /** id for the page landmark — the shared footer owns #contacts. */
  id?: string
  /** The giant word printed in dots. Lowercase reads best. */
  wordmark?: string
  /** Screen-reader text for the wordmark. Defaults to `wordmark`. */
  wordmarkLabel?: string
  /** Brand block rendered above the columns. */
  brand?: React.ReactNode
  /** Link columns along the top. */
  columns?: FooterColumn[]
  /** Left-hand side of the rule row (copyright). */
  meta?: React.ReactNode
  /** Show the back-to-top button. It scrolls the window to 0. Defaults to true. */
  backToTop?: boolean
  /** Localized label of that button. */
  backToTopLabel?: string
  /** Starting colours. Defaults to "night". */
  preset?: HalftonePreset
  /** Colour overrides, merged over the preset. */
  palette?: { background?: string; ink?: string; warm?: string }
  /** Distance between dot centres, in CSS px. Defaults to 6. */
  dotGap?: number
  /** How far the pointer pushes, in CSS px. Defaults to 80. */
  radius?: number
  /** How much of the word's cap height hangs below the bottom edge, 0–0.6. Defaults to 0.2. */
  crop?: number
  /** Print grain over everything, 0–1. Defaults to 0.5. */
  grain?: number
  /** Pointer and click response. Defaults to true; still gated on a fine
   *  pointer and on prefers-reduced-motion at runtime. */
  interactive?: boolean
  /** Face for the wordmark. Heavy grotesks print best. May be a var(). */
  fontFamily?: string
  /** Weight of the wordmark. Defaults to 700. */
  fontWeight?: number
  /** Face for the small type. May be a var(). Omit to inherit the page face. */
  monoFamily?: string
  /** Extra root class names. */
  className?: string
}

const PRESETS: { [K in HalftonePreset]: HalftonePalette } = {
  night: { background: "#0c0c0b", ink: "#e9e4da", warm: "#e9762b" },
  paper: { background: "#efebe3", ink: "#17150f", warm: "#c2361c" },
  ember: { background: "#160a06", ink: "#f2c48c", warm: "#ff5a1f" },
  cobalt: { background: "#0d1b4d", ink: "#dfe7ff", warm: "#ffcd3c" },
}

/** Hard ceiling on the dot field, and on the canvas bitmap. */
const MAX_DOTS = 9000
const MAX_CANVAS_PIXELS = 3_000_000
/** Speed below which a dot counts as at rest. */
const SETTLE_SPEED = 0.08
/** Spring toward the dot's target: stiff enough to converge in well under a
 *  second, still under-damped so the return keeps a visible bounce. */
const SPRING_K = 0.2
const SPRING_DAMPING = 0.7

const SANS_STACK =
  '"Inter Tight", "Inter Variable", "Inter", "Helvetica Neue", Arial, system-ui, sans-serif'
const MONO_STACK = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace'

// #region halftone
// Pure helpers, lifted out and executed by tests/halftone-wordmark-footer.test.mjs.

/** Hex → [r, g, b] in 0–255, or null for anything that isn't #rgb / #rrggbb.
 *  `rgb(r, g, b)` is accepted too so a theme that exposes computed colours
 *  still works. */
export function hwfHex(hex: string) {
  const value = (hex || "").trim()
  const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(value)
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])]
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value)
  if (!m) return null
  const h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1]
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

/** Dot radius for a cell coverage in [0, 1]: area-true, so tone stays even. */
export function hwfRadius(coverage: number, gap: number) {
  const c = coverage < 0 ? 0 : coverage > 1 ? 1 : coverage
  return Math.sqrt(c) * gap * 0.56
}

/** How far, as a fraction of the push radius, a dot rests from home while the
 *  pointer sits on it. Chosen to match the sample's converged look. */
const PUSH_RATIO = 0.6

/**
 * Where a dot should come to REST: home, unless the pointer at (px, py) is
 * within `r` of home — then home pushed radially away by a distance that
 * tapers to zero at the edge of the radius.
 *
 * The sample derived this offset from a per-frame IMPULSE, which never reaches
 * a fixed point: a dot is shoved past the radius, the force cuts out, the
 * spring pulls it home, and it re-enters the radius again — a limit cycle that
 * keeps the canvas repainting forever under a stationary cursor. A target
 * position has an exact fixed point, so the field sleeps the moment it
 * converges.
 */
export function hwfTarget(
  hx: number, hy: number, px: number, py: number, r: number,
) {
  if (r <= 0) return [hx, hy]
  const dx = hx - px
  const dy = hy - py
  const d = Math.sqrt(dx * dx + dy * dy)
  if (d >= r || d < 0.001) return [hx, hy]
  const push = (1 - d / r) * r * PUSH_RATIO
  return [hx + (dx / d) * push, hy + (dy / d) * push]
}

/**
 * One step of a dot's spring toward its target — its home, or that home pushed
 * away by the pointer. Returns [x, y, vx, vy].
 *
 * Stiffness and damping are tuned as a pair: stiffer than the sample so the
 * field converges in well under a second, still under-damped enough to give
 * the return a visible bounce.
 */
export function hwfStep(
  x: number, y: number, vx: number, vy: number,
  hx: number, hy: number, px: number, py: number, r: number,
) {
  const t = hwfTarget(hx, hy, px, py, r)
  vx = (vx + (t[0] - x) * SPRING_K) * SPRING_DAMPING
  vy = (vy + (t[1] - y) * SPRING_K) * SPRING_DAMPING
  return [x + vx, y + vy, vx, vy]
}

/** How warm a dot is drawn: 0 at home, 1 once it is `span` px or more away. */
export function hwfWarmth(x: number, y: number, hx: number, hy: number, span: number) {
  const d = Math.hypot(x - hx, y - hy)
  return span > 0 ? Math.min(1, d / span) : 0
}

/** Font size that sets `measured` (width at 100px) to fill `width` exactly. */
export function hwfFitSize(measured: number, width: number) {
  return measured > 0 ? (width / measured) * 100 : 0
}

/** Resolve a CSS font-family spec (possibly built on var()) to something a
 *  canvas context accepts. Returns null when the spec cannot be resolved. */
export function hwfResolveFamily(spec: string, weight: number, host: HTMLElement) {
  const probe = document.createElement("span")
  probe.setAttribute("aria-hidden", "true")
  probe.style.cssText =
    "position:absolute;left:-99999px;top:0;visibility:hidden;white-space:nowrap;pointer-events:none;"
  probe.style.fontFamily = spec
  probe.style.fontWeight = String(weight)
  host.appendChild(probe)
  let family = ""
  try {
    family = window.getComputedStyle(probe).fontFamily
  } catch {
    family = ""
  }
  probe.remove()
  // An unresolved var() shows up verbatim — canvas would reject the whole
  // font string, so fall back to a generic family instead of failing silently.
  if (!family || family.indexOf("var(") !== -1) return null
  return family
}
// #endregion

const HWF_CSS = `
.hwf-root {
  position: relative; width: 100%; overflow: hidden; isolation: isolate;
  background: var(--hwf-bg); color: var(--hwf-ink); -webkit-font-smoothing: antialiased;
  font-family: var(--hwf-mono, inherit);
}
.hwf-top {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
  gap: clamp(22px, 3vw, 44px);
  padding: clamp(30px, 4vw, 56px) clamp(18px, 3.5vw, 48px) 0;
}
.hwf-brand { min-width: 0; max-width: 46ch; }
.hwf-brand-row { display: flex; align-items: center; gap: 12px; }
.hwf-logo { width: 44px; height: 44px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
.hwf-brand strong { display: block; font-size: clamp(18px, 2vw, 22px); font-weight: 700; line-height: 1.2; }
.hwf-tag {
  display: block; margin-top: 3px; color: var(--hwf-accent);
  font-size: 11.5px; letter-spacing: .18em; text-transform: uppercase; font-weight: 600;
}
.hwf-brand p { margin: 14px 0 0; font-size: 14.5px; line-height: 1.65; opacity: .62; }
.hwf-col { min-width: 0; }
.hwf-col h3 {
  margin: 0 0 14px; font-size: 11px; font-weight: 600; opacity: .4;
  letter-spacing: .18em; text-transform: uppercase;
}
.hwf-col ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 11px; }
.hwf-col a, .hwf-up {
  color: inherit; text-decoration: none; background: none; border: 0; padding: 0;
  font: inherit; font-size: 14.5px; letter-spacing: inherit; text-transform: none;
  cursor: pointer; opacity: .82; display: inline-flex; align-items: center;
  background-image: linear-gradient(currentColor, currentColor); background-size: 0% 1px;
  background-repeat: no-repeat; background-position: 0 100%;
  transition: opacity .25s ease, background-size .35s cubic-bezier(.2,.7,.1,1);
}
.hwf-col li { min-width: 0; }
.hwf-col a:hover, .hwf-up:hover { opacity: 1; background-size: 100% 1px; }
.hwf-col a:focus-visible, .hwf-up:focus-visible {
  outline: 2px solid var(--hwf-accent); outline-offset: 4px; border-radius: 3px; opacity: 1;
}
.hwf-plain { opacity: .82; font-size: 14.5px; }
.hwf-rule {
  position: relative; z-index: 1; display: flex; justify-content: space-between;
  align-items: center; gap: 12px 24px; flex-wrap: wrap;
  margin: clamp(24px, 3vw, 40px) clamp(18px, 3.5vw, 48px) 0; padding-top: 16px;
  border-top: 1px solid color-mix(in srgb, var(--hwf-ink) 14%, transparent);
}
.hwf-copy { font-size: 13px; opacity: .5; }
.hwf-up { font-size: 13.5px; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; }
.hwf-mark { position: relative; margin-top: clamp(16px, 2.4vw, 32px); height: clamp(64px, 11vw, 150px); }
.hwf-mark canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; max-width: none; }
.hwf-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width: 720px) {
  .hwf-top { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); row-gap: 26px; }
  .hwf-brand { grid-column: 1 / -1; max-width: none; }
  .hwf-col:last-child { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) {
  .hwf-col a, .hwf-up { transition: none; }
}
`

export default function HalftoneWordmarkFooter({
  id,
  wordmark = "freelance ua",
  wordmarkLabel,
  brand,
  columns = [],
  meta,
  backToTop = true,
  backToTopLabel = "Back to top",
  preset = "night",
  palette,
  dotGap = 6,
  radius = 80,
  crop = 0.2,
  grain = 0.5,
  interactive = true,
  fontFamily = SANS_STACK,
  fontWeight = 700,
  monoFamily = MONO_STACK,
  className = "",
}: HalftoneWordmarkFooterProps) {
  const colors = { ...(PRESETS[preset] || PRESETS.night), ...(palette || {}) }
  const rootRef = React.useRef<HTMLElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const markRef = React.useRef<HTMLDivElement | null>(null)
  const opts = React.useRef({
    colors, dotGap, radius, crop, grain, interactive, fontFamily, fontWeight, wordmark,
  })
  opts.current = {
    colors, dotGap, radius, crop, grain, interactive, fontFamily, fontWeight, wordmark,
  }
  /* Everything that changes the bitmap or its palette re-runs the effect:
     a theme switch swaps the colours, a face change swaps the mask. */
  const key = [
    wordmark, dotGap, crop, grain, fontFamily, fontWeight, radius,
    interactive ? 1 : 0,
    colors.background, colors.ink, colors.warm,
  ].join("|")

  React.useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const mark = markRef.current
    if (!root || !canvas || !mark) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    let reduced = reducedQuery.matches

    let w = 0
    let h = 0
    let dpr = 1
    let px = -1e5
    let py = -1e5
    let raf = 0
    let layoutRaf = 0
    let visible = true
    let awake = false
    let ring = { x: 0, y: 0, t: -1 }
    // Flat arrays: x, y, vx, vy, hx, hy, r per dot.
    let dots = new Float32Array(0)
    let count = 0
    let grainTile: HTMLCanvasElement | null = null
    let ink = hwfHex(opts.current.colors.ink) || [233, 228, 218]
    let warm = hwfHex(opts.current.colors.warm) || [233, 118, 43]

    /** Motion is allowed only for an explicit, visible, fine-pointer footer. */
    const canAnimate = () =>
      opts.current.interactive !== false && finePointerQuery.matches && !reduced

    const buildDots = (gap: number, img: Uint8ClampedArray, maskW: number, maskH: number) => {
      const tmp: number[] = []
      const cols = Math.ceil(maskW / gap)
      const rows = Math.ceil(maskH / gap)
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          // Coverage: average alpha over a 3×3 sample of the cell.
          let sum = 0
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(maskW - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3))
              const y = Math.min(maskH - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3))
              sum += img[(y * maskW + x) * 4 + 3]
            }
          }
          const cov = sum / (9 * 255)
          if (cov < 0.06) continue
          const hx = gx * gap + gap / 2
          const hy = gy * gap + gap / 2
          tmp.push(hx, hy, 0, 0, hx, hy, hwfRadius(cov, gap))
        }
      }
      dots = new Float32Array(tmp)
      count = tmp.length / 7
    }

    const layout = () => {
      const o = opts.current
      const rootWidth = Math.max(1, Math.round(root.getBoundingClientRect().width))
      const word = o.wordmark?.trim() || " "

      // The wordmark band is sized from the word itself: enough room for the
      // visible part of the cap height, nothing more. That keeps a phone footer
      // short and never leaves a giant empty block under the links.
      const family = hwfResolveFamily(o.fontFamily, o.fontWeight, root) || "sans-serif"
      const measureCtx = document.createElement("canvas").getContext("2d")
      if (!measureCtx) return
      measureCtx.font = `${o.fontWeight} 100px ${family}`
      const fit = hwfFitSize(measureCtx.measureText(word).width, rootWidth * 1.02)
      measureCtx.font = `${o.fontWeight} ${fit}px ${family}`
      const box = measureCtx.measureText(word)
      const cap = box.actualBoundingBoxAscent || fit * 0.72
      const cropValue = Math.max(0, Math.min(0.6, o.crop))
      const desired = Math.round(
        Math.max(56, Math.min(640, cap * (1 - cropValue) + Math.max(12, fit * 0.08))),
      )
      // Only touch the style when it really changes: writing the same height
      // back would keep the ResizeObserver firing forever.
      if (Math.abs(mark.clientHeight - desired) > 0.5) {
        mark.style.height = `${desired}px`
      }

      const rect = mark.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (w * h * dpr * dpr > MAX_CANVAS_PIXELS) {
        dpr = Math.max(1, Math.sqrt(MAX_CANVAS_PIXELS / (w * h)))
      }
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

      // Set the word once, at a size that fills the width, on a 1x mask.
      const mask = document.createElement("canvas")
      mask.width = w
      mask.height = h
      const m = mask.getContext("2d", { willReadFrequently: true })
      if (!m) return
      m.font = `${o.fontWeight} ${fit}px ${family}`
      m.fillStyle = "#000"
      m.textBaseline = "alphabetic"
      m.fillText(word, (w - box.width) / 2, h + cap * cropValue)
      const img = m.getImageData(0, 0, w, h).data

      // Dot budget: coarsen the grid instead of shipping a million dots.
      let gap = Math.max(3, o.dotGap)
      for (let attempt = 0; attempt < 4; attempt++) {
        buildDots(gap, img, w, h)
        if (count <= MAX_DOTS) break
        gap = gap * Math.sqrt(count / MAX_DOTS) * 1.05
      }

      ink = hwfHex(opts.current.colors.ink) || ink
      warm = hwfHex(opts.current.colors.warm) || warm

      // A fixed tile of print grain, drawn once and laid over every frame.
      grainTile = document.createElement("canvas")
      grainTile.width = 256
      grainTile.height = 256
      const g = grainTile.getContext("2d")
      if (g) {
        const id = g.createImageData(256, 256)
        for (let i = 0; i < id.data.length; i += 4) {
          const v = Math.random() * 255
          id.data[i] = id.data[i + 1] = id.data[i + 2] = v
          id.data[i + 3] = Math.random() < 0.5 ? 0 : 255
        }
        g.putImageData(id, 0, 0)
      }
    }

    const draw = (now: number) => {
      const o = opts.current
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.fillStyle = o.colors.background
      ctx!.fillRect(0, 0, w, h)

      const animated = canAnimate()
      const r = animated ? Math.max(0, o.radius) : 0
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t
      const ringR = ringAge * 0.9
      let moving = false

      for (let i = 0; i < count; i++) {
        const j = i * 7
        let x = dots[j]
        let y = dots[j + 1]
        let vx = dots[j + 2]
        let vy = dots[j + 3]
        const hx = dots[j + 4]
        const hy = dots[j + 5]
        if (animated) {
          if (ringAge < 900) {
            const dx = hx - ring.x
            const dy = hy - ring.y
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 26)
            if (band > 0) {
              const f = band * 3.2 * (1 - ringAge / 900)
              vx += (dx / d) * f
              vy += (dy / d) * f
            }
          }
          const s = hwfStep(x, y, vx, vy, hx, hy, px, py, r)
          x = s[0]
          y = s[1]
          vx = s[2]
          vy = s[3]
          /* Sleep on VELOCITY only. The target the spring aims at is a true
             fixed point, so a converged field is genuinely still — a dot held
             away by a stationary pointer counts as at rest, which is what
             keeps the canvas from repainting forever. Settled dots also snap
             exactly onto the target, so no sub-pixel drift can accumulate. */
          if (Math.abs(vx) + Math.abs(vy) > SETTLE_SPEED) {
            moving = true
          } else {
            const t = hwfTarget(hx, hy, px, py, r)
            x = t[0]
            y = t[1]
            vx = 0
            vy = 0
          }
          dots[j] = x
          dots[j + 1] = y
          dots[j + 2] = vx
          dots[j + 3] = vy
        }
        const k = hwfWarmth(x, y, hx, hy, 28)
        ctx!.fillStyle =
          k > 0.02
            ? "rgb(" +
              Math.round(ink[0] + (warm[0] - ink[0]) * k) + "," +
              Math.round(ink[1] + (warm[1] - ink[1]) * k) + "," +
              Math.round(ink[2] + (warm[2] - ink[2]) * k) + ")"
            : o.colors.ink
        ctx!.beginPath()
        ctx!.arc(x, y, dots[j + 6], 0, 6.2832)
        ctx!.fill()
      }

      if (grainTile && o.grain > 0) {
        ctx!.globalAlpha = Math.min(1, o.grain) * 0.09
        ctx!.globalCompositeOperation = "overlay"
        const pattern = ctx!.createPattern(grainTile, "repeat")
        if (pattern) {
          ctx!.fillStyle = pattern
          ctx!.fillRect(0, 0, w, h)
        }
        ctx!.globalAlpha = 1
        ctx!.globalCompositeOperation = "source-over"
      }

      if (ringAge >= 900) ring.t = -1
      // Sleep once every dot is at rest and no click ring is running.
      awake = moving || ring.t >= 0
    }

    const loop = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      draw(now)
      if (awake && visible) raf = requestAnimationFrame(loop)
    }

    /** The single entry point for "something changed": at most one frame is
     *  ever queued, so resize bursts cannot stack loops. */
    const wake = () => {
      if (raf || !visible || document.hidden) return
      awake = true
      raf = requestAnimationFrame(loop)
    }

    const requestLayout = () => {
      if (layoutRaf) return
      layoutRaf = requestAnimationFrame(() => {
        layoutRaf = 0
        layout()
        draw(performance.now())
        wake()
      })
    }

    const toLocal = (clientX: number, clientY: number) => {
      const b = canvas.getBoundingClientRect()
      return [clientX - b.left, clientY - b.top]
    }
    /* The pointer is tracked in viewport coordinates so a scroll that moves the
       band out from under a still cursor re-aims the field instead of leaving
       dots parted at a point the cursor no longer occupies. */
    let lastClientX = Number.NaN
    let lastClientY = Number.NaN
    const onMove = (e: PointerEvent) => {
      if (!canAnimate()) return
      lastClientX = e.clientX
      lastClientY = e.clientY
      const p = toLocal(e.clientX, e.clientY)
      px = p[0]
      py = p[1]
      wake()
    }
    const onLeave = () => {
      lastClientX = Number.NaN
      lastClientY = Number.NaN
      px = -1e5
      py = -1e5
      wake()
    }
    const onScroll = () => {
      if (Number.isNaN(lastClientX)) return
      const p = toLocal(lastClientX, lastClientY)
      // A scroll that doesn't move the band relative to the cursor (or moves it
      // by less than a pixel) is not a reason to repaint.
      if (Math.abs(p[0] - px) < 0.5 && Math.abs(p[1] - py) < 0.5) return
      px = p[0]
      py = p[1]
      wake()
    }
    const onDown = (e: PointerEvent) => {
      if (!canAnimate()) return
      if ((e.target as HTMLElement | null)?.closest?.("a,button")) return
      lastClientX = e.clientX
      lastClientY = e.clientY
      const p = toLocal(e.clientX, e.clientY)
      ring = { x: p[0], y: p[1], t: performance.now() }
      wake()
    }

    /** Snap every dot back to rest — used when animation is switched off. */
    const restDots = () => {
      for (let i = 0; i < count; i++) {
        const j = i * 7
        dots[j] = dots[j + 4]
        dots[j + 1] = dots[j + 5]
        dots[j + 2] = 0
        dots[j + 3] = 0
      }
    }

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      } else {
        wake()
      }
    }
    const onMotionPref = () => {
      reduced = reducedQuery.matches
      if (reduced) {
        px = -1e5
        py = -1e5
        ring.t = -1
        restDots()
        if (raf) cancelAnimationFrame(raf)
        raf = 0
        draw(performance.now())
      } else {
        wake()
      }
    }
    const onPointerCapable = () => {
      if (!canAnimate()) {
        px = -1e5
        py = -1e5
        ring.t = -1
        restDots()
        if (raf) cancelAnimationFrame(raf)
        raf = 0
        draw(performance.now())
      } else {
        wake()
      }
    }

    layout()
    draw(performance.now())

    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerleave", onLeave)
    root.addEventListener("pointerdown", onDown)
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    reducedQuery.addEventListener?.("change", onMotionPref)
    finePointerQuery.addEventListener?.("change", onPointerCapable)

    // A resize burst, a band height change or a window zoom: one relayout.
    const ro = new ResizeObserver(requestLayout)
    ro.observe(root)

    // Out of view → stop; back in view → resume.
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0] ? entries[0].isIntersecting : true
        if (visible) wake()
        else if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { rootMargin: "80px" },
    )
    io.observe(root)

    // A web font that lands late (or a user font swap) re-sets the word in its
    // real face; the mask depends on the metrics, so the grid must be rebuilt.
    let alive = true
    const onFonts = () => {
      if (!alive) return
      requestLayout()
    }
    if (document.fonts) {
      document.fonts.ready.then(() => alive && requestLayout()).catch(() => {})
      document.fonts.addEventListener?.("loadingdone", onFonts)
    }

    return () => {
      alive = false
      if (raf) cancelAnimationFrame(raf)
      if (layoutRaf) cancelAnimationFrame(layoutRaf)
      raf = 0
      layoutRaf = 0
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      reducedQuery.removeEventListener?.("change", onMotionPref)
      finePointerQuery.removeEventListener?.("change", onPointerCapable)
      document.fonts?.removeEventListener?.("loadingdone", onFonts)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
      root.removeEventListener("pointerdown", onDown)
      window.removeEventListener("scroll", onScroll)
    }
  }, [key])

  const toTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (value: number, options?: { duration?: number; immediate?: boolean }) => void }
      }
    ).__lenis
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { duration: 0.9 })
      return
    }
    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = "auto"
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    } finally {
      root.style.scrollBehavior = previous
    }
  }

  const renderLink = (link: FooterLink, index: number) => {
    if (!link.href) {
      return (
        <li key={`${link.label}-${index}`}>
          <span className="hwf-plain">{link.label}</span>
        </li>
      )
    }
    const internal = link.href.startsWith("/") && !link.href.startsWith("//")
    const external = link.external || /^https?:\/\//i.test(link.href)
    const className = "hwf-link"
    return (
      <li key={`${link.label}-${index}`}>
        {internal ? (
          <Link href={link.href} className={className}>
            {link.label}
          </Link>
        ) : (
          <a
            href={link.href}
            className={className}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        )}
      </li>
    )
  }

  return (
    <footer
      id={id}
      ref={rootRef}
      className={"hwf-root " + className}
      style={
        {
          "--hwf-bg": colors.background,
          "--hwf-ink": colors.ink,
          "--hwf-accent": colors.warm,
          "--hwf-mono": monoFamily,
        } as React.CSSProperties
      }
    >
      <style>{HWF_CSS}</style>
      <div className="hwf-top">
        {brand ? <div className="hwf-brand">{brand}</div> : null}
        {columns.map((col) => (
          <nav className="hwf-col" key={col.title} aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>{col.links.map(renderLink)}</ul>
          </nav>
        ))}
      </div>
      {meta || backToTop ? (
        <div className="hwf-rule">
          <span className="hwf-copy">{meta}</span>
          {backToTop ? (
            <button type="button" className="hwf-up" onClick={toTop}>
              {backToTopLabel} <span aria-hidden="true">↑</span>
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="hwf-mark" ref={markRef}>
        <canvas ref={canvasRef} aria-hidden="true" />
        <span className="hwf-sr">{wordmarkLabel || wordmark}</span>
      </div>
    </footer>
  )
}
