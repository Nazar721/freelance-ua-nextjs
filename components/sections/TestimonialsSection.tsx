"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";

export default function TestimonialsSection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 1600, stopOnInteraction: false })]
  );

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Відгуки клієнтів
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Що кажуть ті, хто вже з нами працював
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={20} blur={4}>
          <div className="overflow-hidden mb-10" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="shimmer flex-none w-75 md:w-87.5 min-h-64 bg-[#111118] border border-[#2A2A38] rounded-2xl p-6 flex flex-col transition-all duration-500 hover:border-[#6366F1]/40 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center mb-4">
                    <Quote size={18} className="text-[#6366F1]" />
                  </div>
                  <p className="text-[#F8F8FF]/90 text-sm leading-relaxed mb-4 flex-1">
                    {testimonial.text}
                  </p>
                  {testimonial.author && (
                    <p className="text-[#6366F1] text-sm font-semibold">
                      — {testimonial.author}
                    </p>
                  )}
                </div>
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
            Переглянути всі відгуки
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
