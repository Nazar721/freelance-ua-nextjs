"use client";

import { useRef, useState, type ElementType, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion, useInView } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  /** Short per-group stagger — build it with `staggerDelay(index)`. */
  delay?: number;
  /** Vertical offset; clamped to 16px so the reveal stays subtle. */
  y?: number;
  /** @deprecated Unused — kept so old call sites keep compiling. */
  x?: number;
  /** @deprecated Unused — kept so old call sites keep compiling. */
  scale?: number;
  /** @deprecated Unused — kept so old call sites keep compiling. */
  rotateX?: number;
  /** @deprecated Unused — reveals never animate `filter`. */
  blur?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Element the wrapper renders as. Pass "li" directly inside a <ul>/<ol> so
   *  the animated node IS the list item — a <div> between <ul> and <li> is
   *  invalid HTML and breaks list semantics for assistive tech. */
  as?: "div" | "li";
  [key: string]: unknown;
};

/**
 * Short stagger inside a visible row/group. The delay cycles with the item's
 * position in the group, so the Nth card of a long catalogue never inherits
 * a multi-second wait from its global index.
 */
export function staggerDelay(index: number, step = 0.04, perGroup = 4): number {
  return (index % perGroup) * step;
}

/** Longest wait before a reveal starts, even when a caller passes more. */
const MAX_DELAY = 0.2;
/** Largest vertical travel — 8–16px, per the motion guidelines. */
const MAX_Y = 16;
const DURATION = 0.5;
const EASE = [0.22, 1, 0.36, 1] as const;

export function FadeIn({
  children,
  delay = 0,
  y = 12,
  className,
  style,
  as = "div",
  ...rest
}: FadeInProps) {
  // Legacy props never reach the DOM; reveals animate opacity + translateY only
  // (no filter, no 3D, no scale — those fought CSS transitions and janked
  // low-end devices).
  delete rest.blur;
  delete rest.x;
  delete rest.scale;
  delete rest.rotateX;
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  // `once: true` — scrolling back never replays a finished reveal. The old
  // negative root margins required the element to already sit deep inside the
  // viewport before firing, which left in-screen cards invisible; now the
  // reveal starts as soon as the element shows at the viewport edge.
  const isInView = useInView(ref, { once: true, amount: "some" });
  // Keyboard focus must never land on a still-invisible node: the moment the
  // wrapper (or anything inside it) is focused, reveal it instantly.
  const [focusShown, setFocusShown] = useState(false);
  const [instant, setInstant] = useState(false);
  const MotionTag: ElementType = as === "li" ? motion.li : motion.div;

  if (shouldReduceMotion) {
    const StaticTag: ElementType = as;
    // The remaining props (data-*, aria-*) must survive here too — they were
    // silently dropped, so a caller could not mark its static node at all.
    // `data-reveal` marks the node in BOTH branches: under reduced motion the
    // checker asserts that every revealed node is fully visible and unblurred.
    return (
      <StaticTag className={className} style={style} data-reveal="static" {...rest}>
        {children}
      </StaticTag>
    );
  }

  const offset = Math.min(Math.max(y, 0), MAX_Y);
  const shown = isInView || focusShown;

  return (
    <MotionTag
      ref={ref}
      className={className}
      data-reveal="motion"
      style={style}
      initial={{ opacity: 0, y: offset }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }}
      onFocus={() => {
        setFocusShown(true);
        setInstant(true);
      }}
      transition={{
        duration: instant ? 0 : DURATION,
        delay: instant ? 0 : Math.min(Math.max(delay, 0), MAX_DELAY),
        ease: EASE,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
