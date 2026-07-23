"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Quote, ArrowRight, Play, X, ChevronLeft, ChevronRight, MoveHorizontal, Volume2, Pause } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { useTranslation } from "@/lib/LanguageContext";

function useIsMobile(breakpoint = 768) {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth <= breakpoint);
  useEffect(() => {
    const check = () => setM(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return m;
}

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      video.pause();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
      >
        <X size={20} className="text-white" />
      </button>
      <video
        ref={videoRef}
        src={src}
        controls
        autoPlay
        playsInline
        draggable={false}
        className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

function AudioTestimonialCard({ testimonial, t }: { testimonial: typeof testimonials[number]; t: (key: string) => string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => { setIsPlaying(false); setProgress(0); };

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

  const formatTime = (s: number) => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="shimmer flex-none w-64 md:w-87.5 min-h-56 md:min-h-64 bg-[#111118] border border-[#2A2A38] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#6366F1]/40 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)] flex flex-col">
      <audio ref={audioRef} src={testimonial.audio} preload="metadata" />

      {/* Audio visual area */}
      <div className="relative flex-1 min-h-40 md:min-h-48 bg-[#0A0A0F] flex flex-col items-center justify-center px-6 gap-4">
        {/* Waveform bars */}
        <div className="flex items-end gap-[3px] h-12 w-full max-w-[180px]">
          {Array.from({ length: 28 }).map((_, i) => {
            const barProgress = i / 28;
            const isActive = isPlaying && barProgress <= progress;
            const baseH = Math.sin(i * 0.45) * 0.3 + 0.5;
            const h = isPlaying
              ? baseH + Math.sin(Date.now() * 0.003 + i * 0.6) * 0.15
              : baseH;
            return (
              <div
                key={i}
                className="flex-1 rounded-full transition-colors duration-200"
                style={{
                  height: `${Math.max(12, h * 48)}px`,
                  backgroundColor: isActive ? "#6366F1" : "#2A2A38",
                }}
              />
            );
          })}
        </div>

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center hover:bg-[#6366F1]/25 transition-all duration-300 cursor-pointer group/audio"
          style={{ touchAction: "manipulation" }}
        >
          {isPlaying ? (
            <Pause size={18} className="text-[#6366F1]" />
          ) : (
            <Play size={18} className="text-[#6366F1] ml-0.5" />
          )}
        </button>

        {/* Time display */}
        <div className="text-[11px] text-[#8B8B9E] font-mono">
          {formatTime(isPlaying ? audioRef.current?.currentTime ?? 0 : 0)} / {formatTime(duration)}
        </div>
      </div>

      {/* Author + service footer */}
      {(testimonial.author || testimonial.serviceKey) && (
        <div className="px-4 py-3 flex items-center justify-between gap-2 bg-[#111118]">
          {testimonial.author && (
            <span className="text-[#6366F1] text-xs font-semibold truncate">
              {testimonial.author}
            </span>
          )}
          {testimonial.serviceKey && (
            <span className="text-[10px] text-[#8B8B9E] bg-[#1A1A24] px-2 py-0.5 rounded-full border border-[#2A2A38] whitespace-nowrap shrink-0">
              {testimonial.serviceKey}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function TestimonialCard({ testimonial, t, onVideoOpen }: { testimonial: typeof testimonials[number]; t: (key: string) => string; onVideoOpen?: (src: string) => void }) {
  if (testimonial.audio) {
    return <AudioTestimonialCard testimonial={testimonial} t={t} />;
  }

  if (testimonial.video) {
    return (
      <div className="shimmer flex-none w-64 md:w-87.5 min-h-56 md:min-h-64 bg-[#111118] border border-[#2A2A38] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#6366F1]/40 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)] flex flex-col">
        <button
          onClick={() => onVideoOpen?.(testimonial.video!)}
          className="relative w-full flex-1 min-h-48 md:min-h-56 bg-[#0A0A0F] cursor-pointer group/video"
          style={{ touchAction: "manipulation" }}
        >
          <LazyVideo
            src={testimonial.video}
            loop
            playsInline
            muted
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover/video:scale-110 transition-transform duration-300">
              <Play size={20} className="text-white ml-0.5" />
            </div>
          </div>
        </button>
        {(testimonial.author || testimonial.serviceKey) && (
          <div className="px-4 py-3 flex items-center justify-between gap-2 bg-[#111118]">
            {testimonial.author && (
              <span className="text-[#6366F1] text-xs font-semibold truncate">
                {testimonial.author}
              </span>
            )}
            {testimonial.serviceKey && (
              <span className="text-[10px] text-[#8B8B9E] bg-[#1A1A24] px-2 py-0.5 rounded-full border border-[#2A2A38] whitespace-nowrap shrink-0">
                {testimonial.serviceKey}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="shimmer flex-none w-64 md:w-87.5 min-h-56 md:min-h-64 bg-[#111118] border border-[#2A2A38] rounded-2xl p-5 md:p-6 flex flex-col transition-all duration-500 hover:border-[#6366F1]/40 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)]">
      <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center mb-4">
        <Quote size={18} className="text-[#6366F1]" />
      </div>
      <p className="text-[#F8F8FF]/90 text-sm leading-relaxed mb-4 flex-1">
        {t(testimonial.textKey)}
      </p>
      <div className="flex items-center justify-between gap-2 mt-auto">
        {testimonial.author && (
          <p className="text-[#6366F1] text-sm font-semibold truncate">
            — {testimonial.author}
          </p>
        )}
        {testimonial.serviceKey && (
          <span className="text-[10px] text-[#8B8B9E] bg-[#1A1A24] px-2 py-0.5 rounded-full border border-[#2A2A38] whitespace-nowrap shrink-0">
            {testimonial.serviceKey}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [videoModalSrc, setVideoModalSrc] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // Refs for animation state
  const xRef = useRef(0);
  const autoRef = useRef(true);
  const pointerDownRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const singleWRef = useRef(0);

  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  // Measure single-set width
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const children = Array.from(track.children) as HTMLElement[];
      const n = testimonials.length;
      if (children.length < n + 1) return;
      singleWRef.current = children[n].offsetLeft - children[0].offsetLeft;
    };
    let attempts = 0;
    const tryMeasure = () => {
      measure();
      if (singleWRef.current === 0 && attempts < 10) {
        attempts++;
        requestAnimationFrame(tryMeasure);
      }
    };
    requestAnimationFrame(tryMeasure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── Auto-scroll loop ──
  useEffect(() => {
    let raf: number;
    let last = 0;
    // Mobile: 30px/s (gentle), Desktop: 50px/s
    const speed = isMobile ? 0.03 : 0.05;

    const tick = (now: number) => {
      if (autoRef.current && !draggingRef.current && last) {
        const dt = Math.min(now - last, 50);
        xRef.current -= speed * dt;

        if (singleWRef.current > 0 && xRef.current <= -singleWRef.current) {
          xRef.current += singleWRef.current;
        }
      }
      last = now;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${xRef.current}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  // ── Pause / Resume ──
  const pause = useCallback(() => {
    autoRef.current = false;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (isMobile) return; // On mobile, never auto-resume after user interaction
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      autoRef.current = true;
    }, 3000);
  }, [isMobile]);

  // ── Drag (touch + mouse) ──
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const DRAG_THRESHOLD = 6;

    const onDown = (e: PointerEvent) => {
      pointerDownRef.current = true;
      draggingRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartPosRef.current = xRef.current;
    };

    const onMove = (e: PointerEvent) => {
      if (!pointerDownRef.current) return;
      if (draggingRef.current) {
        xRef.current = dragStartPosRef.current + (e.clientX - dragStartXRef.current);
        return;
      }
      if (Math.abs(e.clientX - dragStartXRef.current) > DRAG_THRESHOLD) {
        draggingRef.current = true;
        pause();
        setShowHint(false);
        setUserInteracted(true);
        xRef.current = dragStartPosRef.current + (e.clientX - dragStartXRef.current);
      }
    };

    const onUp = () => {
      pointerDownRef.current = false;
      if (!draggingRef.current) return;
      draggingRef.current = false;

      if (singleWRef.current > 0) {
        while (xRef.current < -singleWRef.current) xRef.current += singleWRef.current;
        while (xRef.current > 0) xRef.current -= singleWRef.current;
      }

      scheduleResume();
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 3) return;

      e.preventDefault();
      xRef.current -= e.deltaX;
      pause();
      setShowHint(false);
      setUserInteracted(true);
      scheduleResume();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [pause, scheduleResume]);

  // Hide hint after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); };
  }, []);

  const scrollTo = (dir: "left" | "right") => {
    pause();
    setShowHint(false);
    setUserInteracted(true);
    const cardW = trackRef.current?.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? 300;
    xRef.current += dir === "left" ? cardW + 24 : -(cardW + 24);
    scheduleResume();
  };

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            {t("testimonials.desc")}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={20} blur={4}>
          <div className="relative mb-10">
            {/* Arrows — always visible on mobile, hover-only on desktop */}
            <button
              onClick={() => scrollTo("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-[#1A1A28] border border-[#2A2A38] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg md:opacity-0 md:group-hover/carousel:opacity-100 md:hover:bg-[#252538] md:hover:border-[#6366F1]/40"
            >
              <ChevronLeft size={18} className="text-[#F8F8FF]" />
            </button>
            <button
              onClick={() => scrollTo("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-[#1A1A28] border border-[#2A2A38] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg md:opacity-0 md:group-hover/carousel:opacity-100 md:hover:bg-[#252538] md:hover:border-[#6366F1]/40"
            >
              <ChevronRight size={18} className="text-[#F8F8FF]" />
            </button>

            {/* Hint — always visible on mobile for first 5s, desktop hover only */}
            {showHint && (
              <div className={`absolute right-8 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 pointer-events-none ${isMobile ? "" : "hidden md:flex"}`}>
                <span className="text-[#8B8B9E] text-xs">{isMobile ? "Свайпайте" : "Гортайте"}</span>
                <MoveHorizontal size={18} className="text-[#6366F1] scroll-hint-bounce" />
              </div>
            )}

            {/* Gradient fades */}
            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-[#07070D] to-transparent z-[1] pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#07070D] to-transparent z-[1] pointer-events-none" />

            {/* Viewport */}
            <div
              ref={viewportRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ touchAction: "pan-y" }}
            >
              <div
                ref={trackRef}
                className="flex gap-6 w-max"
                style={{ willChange: "transform" }}
              >
                {duplicated.map((testimonial, i) => (
                  <TestimonialCard
                    key={`${testimonial.id}-${i}`}
                    testimonial={testimonial}
                    t={t}
                    onVideoOpen={setVideoModalSrc}
                  />
                ))}
              </div>
            </div>

            {/* Mobile: show dot indicators for position awareness */}
            {isMobile && (
              <div className="flex justify-center gap-1.5 mt-4">
                {testimonials.slice(0, Math.min(testimonials.length, 5)).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6366F1]/40" />
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        <div className="text-center">
          <a
            href={siteConfig.telegram.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button inline-flex items-center gap-2 text-[#6366F1] hover:text-[#8B5CF6] font-semibold transition-all duration-300 hover:-translate-y-0.5 group"
          >
            {t("testimonials.allReviews")}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {videoModalSrc && (
        <VideoModal src={videoModalSrc} onClose={() => setVideoModalSrc(null)} />
      )}
    </section>
  );
}
