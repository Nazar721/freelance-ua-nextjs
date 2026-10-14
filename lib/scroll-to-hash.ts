// Anchor scrolling that survives a fixed header, Lenis and late layout.
//
// Why this exists: a deep link such as `/services/it#cases` is rendered on the
// server with the anchor near the top of the document, but the real offset
// only settles after web fonts, styles and hydration finish. The browser's
// native "jump to #hash" therefore lands in the wrong place, and on desktop
// Lenis owns the scroll position afterwards.
//
// The correction is a CONVERGENCE loop, not a "wait N seconds and hope" delay:
// every animation frame the offset is compared with the target and re-applied
// while they differ, so late layout shifts (fonts, images, hydration, Lenis
// boot) are corrected whenever they happen.
//
// Deciding when to STOP is the subtle part, and two obvious signals are wrong:
//
//   * a bare frame count — on a slow first paint the anchor can already look
//     "aligned" at offset 0 while its children have no layout yet, and ten
//     frames pass in ~160 ms, well before the catalogue grid appears;
//   * `document.fonts.ready` / `readyState === "complete"` — both flip true
//     around t=218 ms on `/services/it`, while the document is still 3788 px
//     tall and grows to 14421 px at t=430 ms. Any window keyed on them can
//     close before that growth.
//
// So the loop ends only while the layout is provably QUIET: the anchor is
// actually laid out (non-zero height — a Suspense/hydration placeholder has
// none) and neither the anchor's height nor the document's scrollHeight has
// changed for STABLE_FRAMES consecutive frames, with the fonts in. A
// ResizeObserver on the body and on the anchor, plus a viewport resize, all
// reset the counter, so a late change restarts the convergence rather than
// being missed. The first real user scroll cancels the loop; MAX_LIFETIME_MS
// is a safety net, never the trigger.

/** Gap kept between the fixed header and the anchor target. */
const HEADER_GAP = 16;
/** Fallback when no <header> is measurable (should not happen on site pages). */
const FALLBACK_OFFSET = 96;
/** Ignore scroll deltas below this — float noise from layout, not a real shift. */
const SCROLL_EPSILON = 2;
/** Tolerance when telling our own scroll event from a user one. Wider than
 *  SCROLL_EPSILON: the browser may clamp or round the applied offset. */
const SELF_SCROLL_TOLERANCE = 24;
/** A `scroll` event within this window after one of our own applications is
 *  treated as the echo of that application, not as the user taking over.
 *  Lenis keeps emitting a few settle events after an immediate jump. */
const SELF_SCROLL_GRACE_MS = 150;
/** Consecutive aligned frames required before the loop may end (~160 ms at
 *  60 fps). Only counts once the fonts are in. */
const STABLE_FRAMES = 10;
/** Safety net: max time the re-alignment loop stays attached. Fonts that
 *  never resolve and a page that never stops resizing both hit this cap. */
const MAX_LIFETIME_MS = 8000;

function headerOffset(): number {
  if (typeof document === "undefined") return FALLBACK_OFFSET;
  const header = document.querySelector<HTMLElement>("header");
  if (!header) return FALLBACK_OFFSET;
  const rect = header.getBoundingClientRect();
  // The header is position:fixed, so rect.top is its inset from the viewport
  // top and rect.height its own height — both belong in the offset.
  return Math.round(rect.height + Math.max(rect.top, 0) + HEADER_GAP);
}

function targetScrollTop(id: string): number | null {
  const el = document.getElementById(id);
  if (!el) return null;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
  return Math.max(0, Math.round(top));
}

function applyScrollTop(top: number, smooth = false) {
  const lenis = (
    window as unknown as {
      __lenis?: { scrollTo: (value: number, options?: { immediate?: boolean; duration?: number }) => void };
    }
  ).__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    if (smooth) lenis.scrollTo(top, { duration: 0.9 });
    else lenis.scrollTo(top, { immediate: true });
    return;
  }

  if (smooth) {
    window.scrollTo({ top, left: 0, behavior: "smooth" });
    return;
  }

  /* `behavior: "auto"` does NOT mean "instant" — it means "defer to the CSS
     scroll-behavior", and this document sets `html { scroll-behavior: smooth }`.
     An "auto" jump therefore ANIMATES, and a per-frame retry restarts that
     animation from wherever it currently is: progress becomes quadratic and
     the target is never reached. That is exactly what happened on mobile,
     where Lenis is disabled and this branch runs (`scrollYbefore` crawled
     46 → 76 → 118 → 175 → 243 → 359 → 495 and the loop hit its cap at 0).
     `behavior: "instant"` bypasses the CSS; the inline override is a fallback
     for any engine that ignores the keyword. */
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  try {
    window.scrollTo({ top, left: 0, behavior: "instant" });
  } finally {
    root.style.scrollBehavior = previous;
  }
}

/**
 * Scroll so `id` sits just below the fixed header.
 * Returns false when the element does not exist (yet).
 *
 * `smooth` is for in-page navigation the user just triggered (a nav click);
 * deep links and reloads stay instant so a settling layout cannot drag the
 * viewport around mid-animation.
 */
export function scrollToId(id: string, { smooth = false }: { smooth?: boolean } = {}): boolean {
  const top = targetScrollTop(id);
  if (top === null) return false;
  applyScrollTop(top, smooth);
  return true;
}

/**
 * Scroll to `id` and keep it aligned while the document is still settling
 * (styles, fonts, images, hydration, Lenis boot). Returns a cancel function.
 *
 * Termination is deliberately strict — the loop ends only while the LAYOUT IS
 * QUIET, meaning all of:
 *   - the offset has held for `STABLE_FRAMES` consecutive frames;
 *   - the anchor is actually laid out (its height is non-zero). A Suspense or
 *     hydration placeholder occupies the DOM with height 0, and its offset
 *     rounds to the top of the document — treating that as a settled target is
 *     what left `/services/it#cases` parked at scrollY 0;
 *   - neither the anchor's height nor `document.documentElement.scrollHeight`
 *     has changed during those frames, and the fonts are in. Keying the window
 *     on `document.fonts.ready`/`readyState` instead does not work: both are
 *     already true at t=218 ms on that page while the document is still 3788 px
 *     tall and grows to 14421 px at t=430 ms;
 *   - or `MAX_LIFETIME_MS` elapses, as a safety net.
 * Any ResizeObserver/body-target/viewport change resets the stability counter,
 * so a late height change restarts the convergence instead of being missed.
 *
 * The user can always interrupt: wheel, touch, keypress or an explicit scroll
 * (scrollbar drag, programmatic scroll from elsewhere) cancels the loop, and
 * every listener is removed by `stop()`, which the caller also invokes on
 * route change.
 *
 * `immediateStart: false` is for a scroll the USER just triggered (an in-page
 * `#hash` click). That animation is owned by the browser or by Lenis, so this
 * loop must not touch the scroll position while it flies — otherwise the first
 * tick would see `scrollY` short of the target and snap it, killing the
 * animation outright. In that mode the loop only intervenes when the TARGET
 * itself moves, i.e. when the layout shifts and the anchor's real offset
 * changes underneath the running animation.
 */
export function alignAnchorWhileSettling(
  id: string,
  { immediateStart = true }: { immediateStart?: boolean } = {},
): () => void {
  if (typeof window === "undefined") return () => {};

  let stopped = false;
  let stableFrames = 0;
  /** Anchor offset as of the last observation. In `immediateStart: false`
   *  this is what the running animation is heading for; a change here means
   *  the layout shifted and the animation is now aimed at the wrong place. */
  let expectedTop: number | null = null;
  /** Position we last asked the browser to go to, and when — used to tell our
   *  own scroll events apart from the user's. */
  let lastAppliedTop: number | null = null;
  let lastAppliedAt = 0;
  let fontsReady = !document.fonts;
  /** Layout fingerprint of the previous frame; a change means still settling. */
  let lastAnchorHeight = -1;
  let lastDocHeight = -1;
  const startedAt = performance.now();
  let observer: ResizeObserver | null = null;
  let targetObserver: ResizeObserver | null = null;

  const onLayoutChange = () => {
    // A body/target/viewport resize invalidates any "already stable" verdict.
    stableFrames = 0;
  };

  function stop() {
    if (stopped) return;
    stopped = true;
    observer?.disconnect();
    targetObserver?.disconnect();
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onLayoutChange);
  }

  /** Distinguishes our corrections from a real user scroll (scrollbar drag,
   *  keyboard paging, a scroll started elsewhere on the page). A `scroll`
   *  event that is the echo of one of our own applications — either still
   *  within the grace window, or already at the position we asked for — is
   *  ignored, so an animated Lenis settle cannot cancel its own loop. */
  function onScroll() {
    if (stopped) return;
    if (lastAppliedTop === null) return;
    if (performance.now() - lastAppliedAt <= SELF_SCROLL_GRACE_MS) return;
    if (Math.abs(window.scrollY - lastAppliedTop) <= SELF_SCROLL_TOLERANCE) return;
    stop();
  }

  /** True when the anchor has real layout AND neither it nor the document has
   *  changed size since the previous frame. This — not a load event — is what
   *  makes "stable" mean the layout has actually stopped moving. */
  function layoutIsQuiet(): boolean {
    const el = document.getElementById(id);
    if (!el) return false;
    const anchorHeight = el.offsetHeight;
    const docHeight = document.documentElement.scrollHeight;
    // A zero-height anchor is a placeholder, not a settled target.
    if (anchorHeight === 0) {
      lastAnchorHeight = anchorHeight;
      lastDocHeight = docHeight;
      return false;
    }
    const unchanged = anchorHeight === lastAnchorHeight && docHeight === lastDocHeight;
    lastAnchorHeight = anchorHeight;
    lastDocHeight = docHeight;
    return unchanged;
  }

  const reapply = (): boolean => {
    const top = targetScrollTop(id);
    // The anchor is not mounted yet (a Suspense boundary still streaming):
    // keep waiting, do not count this as "stable".
    if (top === null) return false;

    if (immediateStart) {
      if (Math.abs(window.scrollY - top) <= SCROLL_EPSILON) return true;
      lastAppliedTop = top;
      lastAppliedAt = performance.now();
      applyScrollTop(top);
      return false;
    }

    // Deferred mode: never move the scroll ourselves. Track the target and
    // only re-apply when it has actually moved under the running animation.
    if (expectedTop === null) {
      expectedTop = top;
      return Math.abs(window.scrollY - top) <= SCROLL_EPSILON;
    }
    if (Math.abs(top - expectedTop) <= SCROLL_EPSILON) {
      return Math.abs(window.scrollY - top) <= SCROLL_EPSILON;
    }
    expectedTop = top;
    lastAppliedTop = top;
    lastAppliedAt = performance.now();
    applyScrollTop(top);
    return false;
  };

  const tick = () => {
    if (stopped) return;
    if (performance.now() - startedAt > MAX_LIFETIME_MS) {
      stop();
      return;
    }
    if (reapply()) {
      stableFrames += 1;
      // Aligned AND the layout is provably not moving. Both conditions are
      // required: alignment alone is trivially true while the anchor is still
      // a zero-height placeholder near the top of a short document.
      if (fontsReady && layoutIsQuiet() && stableFrames >= STABLE_FRAMES) {
        stop();
        return;
      }
    } else {
      stableFrames = 0;
    }
    requestAnimationFrame(tick);
  };

  // The user took over: never fight their scroll.
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onLayoutChange, { passive: true });

  observer = new ResizeObserver(onLayoutChange);
  observer.observe(document.body);
  // Observe the anchor element itself as well — but only if it is mounted
  // yet. A Suspense boundary that streams in later would otherwise be missed.
  targetObserver = new ResizeObserver(onLayoutChange);
  const targetEl = document.getElementById(id);
  if (targetEl) targetObserver.observe(targetEl);

  if (document.fonts) {
    document.fonts.ready
      .then(() => {
        fontsReady = true;
        stableFrames = 0;
      })
      .catch(() => {
        fontsReady = true;
      });
  }

  if (immediateStart) scrollToId(id);
  requestAnimationFrame(tick);

  return stop;
}

/** Read the current `#hash` without the "#". Empty string when there is none. */
export function currentHashId(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.length > 1 ? window.location.hash.slice(1) : "";
}
