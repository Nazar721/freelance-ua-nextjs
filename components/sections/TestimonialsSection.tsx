"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Quote, ArrowRight, Play, X, ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

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
        className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function TestimonialCard({ testimonial, t, onVideoOpen }: { testimonial: typeof testimonials[number]; t: (key: string) => string; onVideoOpen?: (src: string) => void }) {
  if (testimonial.video) {
    return (
      <div className="shimmer flex-none w-75 md:w-87.5 min-h-64 bg-[#111118] border border-[#2A2A38] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#6366F1]/40 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)]">
        <button
          onClick={() => onVideoOpen?.(testimonial.video!)}
          className="relative w-full h-full min-h-64 bg-[#0A0A0F] cursor-pointer group/video"
        >
          <video
            src={testimonial.video}
            loop
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover/video:scale-110 transition-transform duration-300">
              <Play size={20} className="text-white ml-0.5" />
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="shimmer flex-none w-75 md:w-87.5 min-h-64 bg-[#111118] border border-[#2A2A38] rounded-2xl p-6 flex flex-col transition-all duration-500 hover:border-[#6366F1]/40 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)]">
      <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center mb-4">
        <Quote size={18} className="text-[#6366F1]" />
      </div>
      <p className="text-[#F8F8FF]/90 text-sm leading-relaxed mb-4 flex-1">
        {t(testimonial.textKey)}
      </p>
      {testimonial.author && (
        <p className="text-[#6366F1] text-sm font-semibold">
          — {testimonial.author}
        </p>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [videoModalSrc, setVideoModalSrc] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(true);

  // Refs for animation state
  const xRef = useRef(0);           // current translateX (px)
  const autoRef = useRef(true);     // auto-scrolling?
  const pointerDownRef = useRef(false); // is pointer currently down?
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const singleWRef = useRef(0);     // width of one set of cards

  const duplicated = [...testimonials, ...testimonials, ...testimonials]; // 3 copies

  // Measure single-set width: distance from first card of set 1 to first card of set 2
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const children = Array.from(track.children) as HTMLElement[];
      const n = testimonials.length;
      if (children.length < n + 1) return;
      // Distance from copy1[0] to copy2[0] = one full set width including the gap between copies
      singleWRef.current = children[n].offsetLeft - children[0].offsetLeft;
    };
    // Retry measurement until layout is ready
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
    const SPEED = 0.5; // px per ms = 500px/s... too fast. Let's do 0.05 = 50px/s

    const tick = (now: number) => {
      if (autoRef.current && !draggingRef.current && last) {
        const dt = Math.min(now - last, 50);
        xRef.current -= 0.05 * dt; // move left ~50px/s

        // Seamless loop: when translated past one full set, jump back
        if (singleWRef.current > 0 && xRef.current <= -singleWRef.current) {
          xRef.current += singleWRef.current;
        }
      }
      last = now;

      // Apply transform
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${xRef.current}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Pause / Resume ──
  const pause = useCallback(() => {
    autoRef.current = false;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      autoRef.current = true;
    }, 3000);
  }, []);

  // ── Drag (touch + mouse) ──
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const DRAG_THRESHOLD = 8;

    const onDown = (e: PointerEvent) => {
      pointerDownRef.current = true;
      draggingRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartPosRef.current = xRef.current;
    };

    const onMove = (e: PointerEvent) => {
      if (!pointerDownRef.current) return; // ignore hover movement
      if (draggingRef.current) {
        xRef.current = dragStartPosRef.current + (e.clientX - dragStartXRef.current);
        return;
      }
      if (Math.abs(e.clientX - dragStartXRef.current) > DRAG_THRESHOLD) {
        draggingRef.current = true;
        pause();
        setShowHint(false);
        xRef.current = dragStartPosRef.current + (e.clientX - dragStartXRef.current);
      }
    };

    const onUp = () => {
      pointerDownRef.current = false;
      if (!draggingRef.current) return;
      draggingRef.current = false;

      // Seamless loop snap — keep xRef between -singleW and 0
      if (singleWRef.current > 0) {
        while (xRef.current < -singleWRef.current) xRef.current += singleWRef.current;
        while (xRef.current > 0) xRef.current -= singleWRef.current;
      }

      scheduleResume();
    };

    const onWheel = (e: WheelEvent) => {
      // ONLY respond to deliberate horizontal scroll (trackpad horizontal swipe)
      // Must be clearly more horizontal than vertical to avoid intercepting page scroll
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 3) return;

      e.preventDefault();
      xRef.current -= e.deltaX;
      pause();
      setShowHint(false);
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
          <div className="relative mb-10 group/carousel">
            {/* Arrows */}
            <button
              onClick={() => scrollTo("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-[#1A1A28] border border-[#2A2A38] flex items-center justify-center hover:bg-[#252538] hover:border-[#6366F1]/40 transition-all duration-300 cursor-pointer shadow-lg opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronLeft size={18} className="text-[#F8F8FF]" />
            </button>
            <button
              onClick={() => scrollTo("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-[#1A1A28] border border-[#2A2A38] flex items-center justify-center hover:bg-[#252538] hover:border-[#6366F1]/40 transition-all duration-300 cursor-pointer shadow-lg opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronRight size={18} className="text-[#F8F8FF]" />
            </button>

            {/* Hint */}
            {showHint && (
              <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 pointer-events-none">
                <span className="text-[#8B8B9E] text-xs hidden md:inline">Гортайте</span>
                <MoveHorizontal size={18} className="text-[#6366F1] scroll-hint-bounce" />
              </div>
            )}

            {/* Gradient fades */}
            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-[#07070D] to-transparent z-[1] pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#07070D] to-transparent z-[1] pointer-events-none" />

            {/* Viewport — overflow hidden, track moves via transform */}
            <div
              ref={viewportRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
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
