"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Play, Pause, X, ChevronLeft, ChevronRight, Quote, Video, MessageSquare, Maximize2 } from "lucide-react";
import gsap from "gsap";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { withPosterFrame } from "@/lib/video";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";
import type { Testimonial } from "@/types";

/* ─── Emoji reactions (decorative, derived from id) ─── */

const REACTION_EMOJIS = ["🔥", "❤️", "👍", "✨", "🙌", "😍", "💯", "🎯"];

function getReactions(id: number) {
  const count = 2 + (id % 3);
  const start = id % REACTION_EMOJIS.length;
  return Array.from({ length: count }, (_, k) => ({
    emoji: REACTION_EMOJIS[(start + k * 2) % REACTION_EMOJIS.length],
    count: 1 + ((id * 3 + k * 7) % 9),
  }));
}

function Reactions({ id }: { id: number }) {
  const reactions = useMemo(() => getReactions(id), [id]);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {reactions.map((r) => (
        <span
          key={r.emoji}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs leading-none"
        >
          <span className="text-sm leading-none">{r.emoji}</span>
          <span className="text-muted-foreground font-medium">{r.count}</span>
        </span>
      ))}
    </div>
  );
}

/* ─── Type badge (video / audio / telegram) ─── */

function TypeBadge({ item }: { item: Testimonial }) {
  const { t } = useTranslation();

  let icon: React.ReactNode;
  let label: string;
  let tone: string;
  if (item.video) {
    icon = <Video size={11} />;
    label = t("testimonials.videoReview");
    tone = "border-accent/30 bg-accent/10 text-accent";
  } else if (item.audio) {
    icon = <Play size={11} />;
    label = t("testimonials.audioReview");
    tone = "border-accent/30 bg-accent/10 text-accent";
  } else {
    icon = <MessageSquare size={11} />;
    label = t("testimonials.tgReview");
    tone = "border-accent/30 bg-accent/10 text-accent";
  }

  return (
    <span
      className={`ml-auto inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-1 text-[10px] font-medium leading-none ${tone}`}
    >
      {icon}
      {label}
    </span>
  );
}

/* ─── Video poster: lazy first-frame preview (no autoplay, metadata only) ─── */

function VideoPoster({ src }: { src: string }) {
  const holderRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Safety net: never leave the poster hidden if Safari skips the media events.
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(id);
  }, [inView]);

  return (
    <div ref={holderRef} className="absolute inset-0">
      {/* fallback backdrop — also the permanent state when the video can't load */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
      </div>
      {inView && !failed && (
        <video
          src={withPosterFrame(src, 0.2)}
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          draggable={false}
          onError={() => setFailed(true)}
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
          <Video size={22} className="text-accent/60" />
          <span className="text-xs text-muted-foreground">{t("testimonials.videoUnavailable")}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Audio player (voice reviews) ─── */

function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);
  // Deterministic pseudo-random bars — Math.random() here would differ between
  // SSR and client and break hydration.
  const [bars] = useState(() => {
    let seed = 0;
    for (let i = 0; i < src.length; i++) seed = (seed * 31 + src.charCodeAt(i)) >>> 0;
    return Array.from({ length: 26 }, (_, i) => {
      const x = Math.sin(seed * 9973 + i * 7.13) * 10000;
      return (x - Math.floor(x)) * 0.4 + 0.3;
    });
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => setFailed(true);
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setTick(performance.now() * 0.004), 150);
    return () => clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
        <MessageSquare size={18} className="text-accent/60" />
        <span className="text-xs text-muted-foreground">{t("testimonials.audioUnavailable")}</span>
      </div>
    );
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play().catch(() => {});
  };

  const formatTime = (s: number) => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex h-11 w-full max-w-[200px] items-end gap-[3px]">
        {bars.map((baseH, i) => {
          const barProgress = i / 26;
          const isPast = barProgress <= progress;
          const barH = isPlaying
            ? baseH + Math.sin(tick + i * 0.5) * 0.15
            : baseH;
          const h = Math.max(0.15, Math.min(1, barH));
          return (
            <div
              key={i}
              className="flex-1 rounded-full"
              style={{
                height: `${Math.max(4, h * 44)}px`,
                backgroundColor: isPast ? "var(--accent)" : "var(--border)",
                transition: "height 0.15s ease-out, background-color 0.2s ease",
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/15 transition-all duration-300 hover:bg-accent/25 cursor-pointer"
          style={{ touchAction: "manipulation" }}
        >
          {isPlaying ? (
            <Pause size={16} className="text-accent" />
          ) : (
            <Play size={16} className="text-accent ml-0.5" />
          )}
        </button>
        <span className="font-mono text-[11px] text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

/* ─── Modal video (mounted only when modal opens) ─── */

function ModalVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  if (failed) {
    return (
      <div className="flex max-h-[62svh] min-h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface-elevated p-6 text-center">
        <Video size={24} className="text-accent/60" />
        <span className="text-sm text-muted-foreground">{t("testimonials.videoUnavailable")}</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      muted
      playsInline
      autoPlay
      draggable={false}
      onError={() => setFailed(true)}
      className="w-full max-h-[62svh] rounded-2xl border border-border bg-black object-contain"
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}

/* ─── Card content (shared between deck card and modal) ─── */

function CardContent({
  item,
  name,
  variant,
}: {
  item: Testimonial;
  name: string;
  variant: "card" | "modal";
}) {
  const { t } = useTranslation();
  const isModal = variant === "modal";
  const text = item.textKey ? t(item.textKey) : "";
  const isVideoOrAudio = !!(item.video || item.audio);

  return (
    <div className={isModal ? "flex flex-col gap-4" : "flex h-full min-h-0 flex-col gap-3"}>
      {/* Author */}
      <div className="flex shrink-0 items-center gap-3 h-11">
        <div className="rounded-full bg-gradient-to-br from-accent to-accent p-[2px] shrink-0">
          <ReviewAvatar name={name} size={isModal ? 52 : 44} />
        </div>
        <div className="min-w-0 flex-1 flex items-center">
          <div className={`truncate text-foreground font-semibold leading-none ${isModal ? "text-base" : "text-sm sm:text-base"}`}>
            {name}
          </div>
        </div>
        <TypeBadge item={item} />
      </div>

      {/* Media */}
      {item.video &&
        (isModal ? (
          <ModalVideo src={item.video} />
        ) : (
          <div className="relative h-[260px] min-h-0 cursor-pointer overflow-hidden rounded-2xl border border-border md:h-auto md:flex-1">
            <VideoPoster src={item.video} />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/25">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-lg backdrop-blur-sm">
                <Play size={20} className="text-white ml-0.5" />
              </div>
            </div>
          </div>
        ))}

      {item.audio &&
        (isModal ? (
          <div onClick={(e) => e.stopPropagation()}>
            <audio controls autoPlay src={item.audio} className="w-full" />
          </div>
        ) : (
          <div className="flex-1 min-h-0 rounded-2xl border border-border bg-background">
            <AudioPlayer src={item.audio} />
          </div>
        ))}

      {item.screenshot && (
        <div
          className={`flex justify-center overflow-hidden rounded-2xl border border-border bg-background ${
            isModal ? "" : "h-[210px] shrink-0 md:h-[270px]"
          }`}
        >
          <Image
            src={item.screenshot}
            alt={`Відгук від ${name}`}
            width={600}
            height={1200}
            sizes="(max-width: 768px) 80vw, 480px"
            className={
              isModal
                ? "h-auto w-auto max-h-[64svh] object-contain"
                : "h-full w-full object-contain p-2"
            }
            loading={isModal ? "eager" : "lazy"}
            draggable={false}
          />
        </div>
      )}

      {/* Text — only for screenshot/telegram reviews, never for video/audio */}
      {text && !isVideoOrAudio && (
        <div
          className={
            isModal ? "relative" : "relative min-h-0 flex-1 overflow-y-auto pr-1 text-pretty"
          }
          data-lenis-prevent
        >
          <Quote
            size={16}
            className="mb-1.5 text-accent"
            fill="currentColor"
            fillOpacity={0.25}
          />
          <p className="text-[15px] leading-relaxed text-foreground">{text}</p>
        </div>
      )}

      {/* Reactions — only for screenshot/telegram reviews in card mode, always in modal */}
      {!(isVideoOrAudio && !isModal) && (
        <div
          className={`flex items-end justify-between gap-3 ${isModal ? "" : "mt-auto shrink-0"}`}
        >
          <Reactions id={item.id} />
          {!isModal && (
            <span
              aria-hidden="true"
              title={t("testimonials.expand")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-accent opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:border-accent/60 group-hover:bg-accent/15 group-focus-visible:opacity-100 shadow-lg"
            >
              <Maximize2 size={16} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Review card ─── */

function useReviewName(item: Testimonial) {
  const { t } = useTranslation();
  return item.author?.trim() || t("testimonials.anonymous");
}

function ReviewCard({
  item,
  onOpen,
  fixedHeight,
}: {
  item: Testimonial;
  onOpen: (item: Testimonial, el: HTMLElement | null) => void;
  fixedHeight?: boolean;
}) {
  const { t } = useTranslation();
  const name = useReviewName(item);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${name} — ${t("testimonials.tapToOpen")}`}
      onClick={(e) => onOpen(item, e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item, e.currentTarget);
        }
      }}
      style={{ touchAction: "manipulation" }}
      className={`group cursor-pointer select-none rounded-3xl border border-border bg-surface/95 transition-colors duration-500 hover:border-accent/50 hover:shadow-[0_8px_50px_rgba(99,102,241,0.18)] ${
        fixedHeight ? "flex h-full flex-col" : ""
      }`}
    >
      <div className={`p-5 ${fixedHeight ? "flex h-full min-h-0 flex-col" : ""}`}>
        <CardContent item={item} name={name} variant="card" />
      </div>
    </article>
  );
}

/* ─── Fullscreen modal ─── */

function TestimonialModal({
  item,
  originRect,
  reduced,
  onClose,
}: {
  item: Testimonial;
  originRect: DOMRect | null;
  reduced: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const name = useReviewName(item);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    const el = contentRef.current;
    const wrap = wrapRef.current;
    if (reduced || !el || !wrap) {
      onClose();
      return;
    }

    gsap.to(wrap, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
    if (originRect) {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: originRect.left + originRect.width / 2 - (r.left + r.width / 2),
        y: originRect.top + originRect.height / 2 - (r.top + r.height / 2),
        scaleX: Math.max(originRect.width / r.width, 0.05),
        scaleY: Math.max(originRect.height / r.height, 0.05),
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: onClose,
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        y: 24,
        scale: 0.94,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    }
  };

  useLayoutEffect(() => {
    const el = contentRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap || reduced) return;

    gsap.fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    if (originRect) {
      const r = el.getBoundingClientRect();
      gsap.fromTo(
        el,
        {
          x: originRect.left + originRect.width / 2 - (r.left + r.width / 2),
          y: originRect.top + originRect.height / 2 - (r.top + r.height / 2),
          scaleX: Math.max(originRect.width / r.width, 0.05),
          scaleY: Math.max(originRect.height / r.height, 0.05),
        },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.55, ease: "power3.out" }
      );
    } else {
      gsap.from(el, { opacity: 0, y: 30, scale: 0.94, duration: 0.45, ease: "power3.out" });
    }

    return () => {
      gsap.killTweensOf([el, wrap]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
      onClick={close}
    >
      <button
        onClick={close}
        aria-label={t("testimonials.close")}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors cursor-pointer hover:bg-white/20 md:right-6 md:top-6"
      >
        <X size={20} className="text-white" />
      </button>

      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90svh] w-[min(94vw,860px)] overflow-y-auto rounded-3xl border border-border bg-surface p-5 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-8"
        data-lenis-prevent
      >
        <CardContent item={item} name={name} variant="modal" />
      </div>
    </div>,
    document.body
  );
}

/* ─── Main Section ─── */

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  /* Example-style slider state: `target` is where the row wants to be (px),
     `current` eases toward it every frame in rAF. The wheel, the drag and the
     arrows all write into `target`, so every input stays in sync. */
  const target = useRef(0);
  const current = useRef(0);
  const dragged = useRef(false); // true once a drag passed the click threshold
  const navRef = useRef<{ goBy: (delta: number) => void } | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [openItem, setOpenItem] = useState<Testimonial | null>(null);

  const reducedMotion = useSyncExternalStore(
    (subscribe) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", subscribe);
      return () => mq.removeEventListener("change", subscribe);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const items = useMemo(() => testimonials, []);
  const total = items.length;

  /* ── Example-style reviews slider (rAF inertia, sticky scroll-scrub + drag) ──
     Movement math is 1:1 with the SmoothScrollSlider example: cards are
     absolutely positioned every frame, `current` eases toward `target`, and
     the scale/dim depends on the signed distance from the viewport centre —
     cards on one side grow and push outward, cards on the other shrink and
     dim. The row is FINITE (no wrap): the first review starts centred and the
     last one ends centred.

     Scroll choreography: the stage is CSS-sticky inside a tall wrapper. While
     the wrapper scrolls through its extra height, page scroll drives the row
     (scroll-scrub) — ALL reviews play through one by one. Only after the last
     review is centred does the stage unstick and the page continue to the
     next sections. The wheel is never consumed — Lenis scrolls the page
     normally the whole time; there is no scroll trap. Drag and the arrows
     still write `target` directly for precise control. ── */
  useEffect(() => {
    if (reducedMotion) return;
    const stage = stageRef.current;
    if (!stage) return;

    const GAP = 32; // horizontal gap between cards (px)
    const MAX_SCALE = 2.5; // grow cap on the "future" side (as in the example)
    const MIN_SCALE = 0.1; // shrink floor on the "passed" side
    const DIM = 0.85; // how dark the shrunk cards get
    const SMOOTHNESS = 6; // 0..10 → ease 0.072; higher = lazier catch-up
    const SENSITIVITY = 5; // 0..10 → drag ×1.5 (as in the example)
    const ease = 0.15 - (SMOOTHNESS / 10) * 0.13;
    const dragMultiplier = 0.6 + (SENSITIVITY / 10) * 1.8;
    /* Page-scroll px consumed per review transition during the sticky phase.
       180 ≈ a third of a wheel-flick per review — all 23 play through in
       ~4000px of scroll, then the page continues. Lower = slower scrub. */
    const SCROLL_PX_PER_CARD = 180;
    /* Direction flip: with `flip` the strip glides RIGHT, the next reviews
       enter from the LEFT and grow on that side — the mirror of the example's
       default. Flip this one value to restore the example's direction. */
    const flip = true;

    let width = 0;
    let cardWidth = 0;
    let step = 0;
    let count = 0;
    let maxPos = 0; // px at which the LAST card sits centred
    let scrubFactor = 1; // slider px per page-scroll px (set in measure)
    let raf = 0;
    let last = 0;
    let inView = true;

    const cards = () => cardRefs.current.filter(Boolean) as HTMLElement[];
    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const measure = () => {
      width = stage.getBoundingClientRect().width;
      const first = cardRefs.current.find(Boolean) as HTMLElement | undefined;
      cardWidth = first ? first.offsetWidth : 0;
      step = cardWidth + GAP;
      count = cards().length;
      maxPos = Math.max(0, (count - 1) * step);
      target.current = clamp(target.current, 0, maxPos);
      current.current = clamp(current.current, 0, maxPos);
      /* Sticky wrapper: stage height + enough scroll for every transition,
         so scrubbing the wrapper plays the whole row before the page moves on. */
      const stageH = stage.offsetHeight;
      const extra = Math.max(0, count - 1) * SCROLL_PX_PER_CARD;
      if (wrapRef.current) wrapRef.current.style.height = `${stageH + extra}px`;
      scrubFactor = step > 0 && SCROLL_PX_PER_CARD > 0 ? step / SCROLL_PX_PER_CARD : 1;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!inView) return;
      const delta = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
      last = now;
      if (!count || step <= 0 || width <= 0) return;

      target.current = clamp(target.current, 0, maxPos);

      /* Ease current → target exactly like the example. */
      const k = 1 - Math.pow(1 - ease, delta * 60);
      current.current += (target.current - current.current) * k;
      if (Math.abs(target.current - current.current) < 0.05) {
        current.current = target.current;
      }

      const pad = (width - cardWidth) / 2;
      const half = width / 2;
      const list = cards();

      let bestIdx = 0;
      let bestDist = Infinity;

      for (let i = 0; i < list.length; i += 1) {
        const node = list[i];
        /* Finite row: no wrap — position 0 centres the first card, maxPos the
           last one, so the strip has a real beginning and a real end. */
        const x = i * step - current.current + pad;
        const distance = x + cardWidth / 2 - half;

        /* The example's asymmetric scale: grow + push on the distance>0 side,
           shrink + dim on the distance<0 side. */
        let scale: number;
        let push: number;
        if (distance > 0) {
          scale = Math.min(MAX_SCALE, 1 + distance / width);
          push = (scale - 1) * cardWidth * 0.75;
        } else {
          scale = Math.max(MIN_SCALE, 1 + distance / width);
          push = 0;
        }

        const left = flip ? width - cardWidth - (x + push) : x + push;
        node.style.transform = `translate3d(${left}px, -50%, 0) scale(${scale})`;

        if (scale < 1) {
          const t = (1 - scale) / Math.max(0.001, 1 - MIN_SCALE);
          node.style.filter = `brightness(${1 - t * DIM})`;
        } else {
          node.style.filter = "none";
        }
        /* Keep the centred card on top so it stays readable and clickable. */
        node.style.zIndex = String(Math.max(0, 500 - Math.round(Math.abs(distance) / 4)));

        const d = Math.abs(distance);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }

      setActiveIdx((prev) => (prev === bestIdx ? prev : bestIdx));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${maxPos > 0 ? current.current / maxPos : 0})`;
      }
    };

    /* Scroll-scrub + settle: while the stage is stuck, page scroll drives the
       row with delta writes (no absolute mapping, so switching between scroll
       and drag never jumps). Entering/leaving the wrapper only moves the
       page — the reviews don't double-advance. After the scroll goes quiet,
       glide the last bit onto the nearest card so the hero ends up centred. */
    let pointer: number | null = null;
    let prevScrollY = window.scrollY;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleSettle = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        if (step > 0) {
          target.current = clamp(Math.round(target.current / step) * step, 0, maxPos);
        }
      }, 200);
    };
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - prevScrollY;
      prevScrollY = y;
      /* While a card drag is in progress the drag owns `target`. */
      if (!d || pointer !== null) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
      /* Sticky phase only: the wrapper has reached the top of the viewport
         and still has extra height left below the stage. */
      const rect = wrap.getBoundingClientRect();
      const stageH = stage.offsetHeight;
      const stuck = rect.top <= 1 && rect.bottom >= stageH - 1;
      if (!stuck) return;
      target.current = clamp(target.current + d * scrubFactor, 0, maxPos);
      scheduleSettle();
    };

    /* Pointer drag: incremental deltas accumulate into `target` (the example's
       own pattern — safe here because `target` is a plain ref, not an absolute
       scroll position). Dragging right advances the rightward-gliding strip. */
    let startX = 0;
    let lastX = 0;

    const onDown = (event: PointerEvent) => {
      if (pointer !== null) return;
      pointer = event.pointerId;
      startX = event.clientX;
      lastX = event.clientX;
      dragged.current = false;
      stage.style.cursor = "grabbing";
      /* Freeze the page while a card drag is in progress. */
      stage.setAttribute("data-lenis-prevent", "");
    };
    const onMove = (event: PointerEvent) => {
      if (pointer !== event.pointerId) return;
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      if (Math.abs(event.clientX - startX) > 6) dragged.current = true;
      target.current = clamp(target.current + dx * dragMultiplier, 0, maxPos);
    };
    const onUp = (event: PointerEvent) => {
      if (pointer !== event.pointerId) return;
      pointer = null;
      stage.style.cursor = "grab";
      stage.removeAttribute("data-lenis-prevent");
      /* Settle on the nearest review so the counter stays truthful and the
         active card ends up perfectly centred. */
      if (step > 0) {
        target.current = clamp(Math.round(target.current / step) * step, 0, maxPos);
      }
    };

    /* Arrows glide the row by one review. The base index is re-derived from
       `target` on every call (not from React state), so rapid successive
       clicks chain forward/backward instead of stomping each other. */
    navRef.current = {
      goBy: (delta: number) => {
        if (count < 2 || step <= 0) return;
        const base = Math.round(target.current / step);
        target.current = clamp(base + delta, 0, count - 1) * step;
      },
    };

    const ro = new ResizeObserver(() => {
      measure();
    });
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) last = 0;
      },
      { threshold: 0 }
    );

    measure();
    raf = requestAnimationFrame(tick);
    ro.observe(stage);
    io.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    /* Card widths settle after webfonts load — re-measure so `step` is final. */
    const onFonts = () => {
      measure();
    };
    document.fonts?.ready.then(onFonts).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      if (settleTimer) clearTimeout(settleTimer);
      ro.disconnect();
      io.disconnect();
      navRef.current = null;
      window.removeEventListener("scroll", onScroll);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      stage.style.cursor = "";
    };
  }, [reducedMotion]);

  /* Arrow navigation: asks the slider effect to glide one review over. */
  const goBy = (delta: number) => {
    navRef.current?.goBy(delta);
  };

  const openCard = (item: Testimonial, el: HTMLElement | null) => {
    setOriginRect(el?.getBoundingClientRect() ?? null);
    setOpenItem(item);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative px-4 pb-16 pt-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <FadeIn className="mb-6 text-center" y={30} blur={8}>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {t("testimonials.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("testimonials.desc")}</p>
        </FadeIn>
      </div>

      {reducedMotion ? (
        /* ── Static fallback (prefers-reduced-motion) ── */
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {items.map((item) => (
            <ReviewCard key={item.id} item={item} onOpen={openCard} />
          ))}
        </div>
      ) : (
        /* ── Example-style carousel (rAF inertia, sticky scroll-scrub + drag) ──
            The wrapper is as tall as the stage plus one scroll-step per review;
            the stage sticks while that extra height is consumed, so the page
            plays ALL reviews before moving on. Height is set by the effect. */
        <div ref={wrapRef} className="relative -mx-4">
          <div
            ref={stageRef}
            className="sticky top-0 h-[100svh] cursor-grab overflow-hidden"
            style={{ touchAction: "pan-y" }}
          >
          {/* Ambient glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute -top-[15%] bottom-auto left-0 right-0 z-0 mx-auto h-[130%] w-[min(90vw,900px)]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)",
            }}
          />

          {/* Cards — positioned every frame by the slider effect */}
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="testimonial-card-slot absolute left-0 top-1/2 w-[80vw] md:w-[min(560px,46vw)]"
              style={{
                willChange: "transform, filter",
                height: "min(500px, 62svh)",
                transform: "translate3d(0, -50%, 0)",
              }}
            >
              <ReviewCard
                item={item}
                onOpen={(it, el) => {
                  if (dragged.current) return;
                  openCard(it, el);
                }}
                fixedHeight
              />
            </div>
          ))}

          {/* Progress + prev/next — the arrows glide the slider to the adjacent
              review, so they stay in lockstep with wheel and drag. */}
          <div className="pointer-events-none absolute bottom-5 left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => goBy(-1)}
              disabled={activeIdx <= 0}
              aria-label={t("testimonials.prev")}
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated/80 text-foreground backdrop-blur transition-all duration-200 hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="whitespace-nowrap font-mono text-[11px] tabular-nums text-muted-foreground">
              {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="relative h-[3px] w-28 overflow-hidden rounded-full bg-border sm:w-52">
              <div
                ref={progressRef}
                className="absolute inset-0 rounded-full bg-accent"
                style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
              />
            </div>

            <button
              type="button"
              onClick={() => goBy(1)}
              disabled={activeIdx >= total - 1}
              aria-label={t("testimonials.next")}
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated/80 text-foreground backdrop-blur transition-all duration-200 hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <FadeIn delay={0.2} y={15} blur={3} className="mx-auto mt-10 max-w-7xl text-center">
        <a
          href={siteConfig.telegram.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-6 py-3 font-semibold text-accent transition-all duration-300 hover:border-accent/40 hover:bg-accent/20"
        >
          {t("testimonials.allReviews")}
          <ChevronRight
            size={16}
            className="transition-transform duration-300"
          />
        </a>
      </FadeIn>

      {openItem && (
        <TestimonialModal
          item={openItem}
          originRect={originRect}
          reduced={reducedMotion}
          onClose={() => setOpenItem(null)}
        />
      )}
    </section>
  );
}
