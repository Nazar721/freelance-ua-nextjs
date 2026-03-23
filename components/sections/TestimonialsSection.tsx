"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site";

export default function TestimonialsSection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 1600, stopOnInteraction: false })]
  );

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Відгуки клієнтів
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Що кажуть ті, хто вже з нами працював
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden mb-10"
          ref={emblaRef}
        >
          <div className="flex gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-none w-[300px] md:w-[350px] bg-[#111118] border border-[#2A2A38] rounded-2xl p-6"
              >
                <Quote size={20} className="text-[#6366F1] mb-4" />
                <p className="text-[#F8F8FF] text-sm leading-relaxed mb-4">
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
        </motion.div>

        <div className="text-center">
          <a
            href={siteConfig.telegram.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#8B5CF6] font-semibold transition-colors"
          >
            Переглянути всі відгуки
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
