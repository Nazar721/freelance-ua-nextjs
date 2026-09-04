"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Play, Pause, X, ChevronRight, Quote, Video, MessageSquare, Maximize2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";
import type { Testimonial } from "@/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

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
      className={`ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium leading-none ${tone}`}
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

  return (
    <div ref={holderRef} className="absolute inset-0">
      {/* fallback backdrop — also the permanent state when the video can't load */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
      </div>
      {inView && !failed && (
        <video
          src={`${src}#t=0.2`}
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          draggable={false}
          onError={() => setFailed(true)}
          onLoadedData={() => setReady(true)}
          onLoadedMetadata={() => setReady(true)}
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
  const [bars] = useState(() => Array.from({ length: 26 }, () => Math.random() * 0.4 + 0.3));
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
          <div className="relative flex-1 min-h-0 cursor-pointer overflow-hidden rounded-2xl border border-border">
            <VideoPoster src={item.video} />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/25">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
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

      {/* Text — only for screenshot/telegram reviews in card mode, always in modal */}
      {text && !(isVideoOrAudio && !isModal) && (
        <div
          className={
            isModal ? "relative" : "relative min-h-0 flex-1 overflow-y-auto pr-1 text-pretty"
          }
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-accent opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:border-accent/60 group-hover:bg-accent/15 group-hover:scale-110 group-focus-visible:opacity-100 shadow-lg"
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
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors cursor-pointer hover:bg-white/20 md:right-6 md:top-6"
      >
        <X size={20} className="text-white" />
      </button>

      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90svh] w-[min(94vw,860px)] overflow-y-auto rounded-3xl border border-border bg-surface p-5 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-8"
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
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
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

  useGSAP(
    () => {
      if (reducedMotion) return;
      const stage = stageRef.current;
      if (!stage) return;
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (cards.length < 2) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (ctx) => {
          const isMobile = !!ctx.conditions?.isMobile;
          const n = cards.length;

          /* slot geometry — must stay in sync with card width classes:
             mobile: card 80vw / slot 86vw, desktop: card min(480px,40vw) / slot +28px */
          const getSlotW = () =>
            isMobile ? window.innerWidth * 0.86 : Math.min(640, window.innerWidth * 0.48 + 28);

          gsap.set(cards, { xPercent: -50, yPercent: -50 });

          const driver = { p: 0 };

          const render = () => {
            const slotW = getSlotW();
            const loopW = n * slotW;
            const wrapX = gsap.utils.wrap(-loopW / 2, loopW / 2);
            const offset = driver.p * loopW;
            const fadeEnd = Math.max(isMobile ? 0.8 : 1.3, window.innerWidth / 2 / slotW - 0.05);
            const fadeStart = isMobile ? 0.55 : 0.65;

            let bestIdx = 0;
            let bestDist = Infinity;

            cards.forEach((card, i) => {
              const x = wrapX(i * slotW - offset);
              const d = Math.abs(x) / slotW;
              if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
              }
              const fade = Math.max(
                0,
                Math.min(1, (d - fadeStart) / (fadeEnd - fadeStart))
              );
              gsap.set(card, {
                x,
                scale: 1 - Math.min(d, 1.2) * 0.07,
                opacity: 1 - fade * fade,
                zIndex: 40 - Math.round(d * 10),
              });
            });

            setActiveIdx((prev) => (prev === bestIdx ? prev : bestIdx));
          };

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: () => `+=${Math.round(window.innerHeight * 6)}`,
                pin: true,
                scrub: 2,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (progressRef.current) {
                    gsap.set(progressRef.current, { scaleX: self.progress });
                  }
                },
              },
            })
            .to(driver, { p: 1, duration: 1, ease: "power1.inOut", onUpdate: render });

          render();

          if (glowRef.current) {
            gsap.fromTo(
              glowRef.current,
              { yPercent: 10 },
              {
                yPercent: -10,
                ease: "none",
                scrollTrigger: {
                  trigger: stage,
                  start: "top top",
                  end: () => `+=${Math.round(window.innerHeight * 6)}`,
                  scrub: true,
                },
              }
            );
          }
        }
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

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
        /* ── Infinite scroll-driven carousel ── */
        <div ref={stageRef} className="relative -mx-4 h-[100svh] overflow-hidden">
          {/* Ambient parallax glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute -top-[15%] bottom-auto left-0 right-0 z-0 mx-auto h-[130%] w-[min(90vw,900px)]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)",
            }}
          />

          {/* Cards */}
          <div className="relative z-10 h-full">
            {items.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 w-[80vw] opacity-0 md:w-[min(560px,46vw)]"
                  style={{
                    willChange: "transform, opacity",
                    height: "min(520px, 70svh)",
                    transition: "filter 0.4s ease-out",
                  }}
              >
                <ReviewCard item={item} onOpen={openCard} fixedHeight />
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4">
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="relative h-[3px] w-36 overflow-hidden rounded-full bg-border sm:w-52">
              <div
                ref={progressRef}
                className="absolute inset-0 rounded-full bg-accent"
                style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
              />
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
          className="group inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-6 py-3 font-semibold text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/20"
        >
          {t("testimonials.allReviews")}
          <ChevronRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
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
