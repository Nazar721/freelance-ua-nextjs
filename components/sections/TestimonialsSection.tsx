"use client";

import { useRef, useState, useCallback } from "react";
import { Quote, ArrowRight, Play, Pause } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

function TestimonialCard({ testimonial, t }: { testimonial: typeof testimonials[number]; t: (key: string) => string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  if (testimonial.video) {
    return (
      <div className="shimmer flex-none w-75 md:w-87.5 min-h-64 bg-[#111118] border border-[#2A2A38] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#6366F1]/40 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)]">
        <button
          onClick={toggleVideo}
          className="relative w-full h-full min-h-64 bg-[#0A0A0F] cursor-pointer group/video"
        >
          <video
            ref={videoRef}
            src={testimonial.video}
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover/video:scale-110 transition-transform duration-300">
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white ml-0.5" />
              )}
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const duplicated = [...testimonials, ...testimonials];

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
          <div
            className="overflow-hidden mb-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={trackRef}
              className="testimonials-marquee-track flex gap-6 w-max"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {duplicated.map((testimonial, i) => (
                <TestimonialCard
                  key={`${testimonial.id}-${i}`}
                  testimonial={testimonial}
                  t={t}
                />
              ))}
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
    </section>
  );
}
