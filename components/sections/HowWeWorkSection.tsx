"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Settings, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const steps = [
  {
    icon: MessageSquare,
    title: "Обговорення",
    description: "Пишете нам у Telegram — обговорюємо деталі, терміни та вартість. Без зайвих формальностей.",
  },
  {
    icon: Settings,
    title: "Виконання",
    description: "Беремось до роботи відразу. Регулярно надсилаємо проміжні результати та тримаємо вас у курсі.",
  },
  {
    icon: CheckCircle2,
    title: "Здача та правки",
    description: "Здаємо готовий результат. Вносимо правки безкоштовно до вашого повного задоволення.",
  },
];

export default function HowWeWorkSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: "-100px 0px" });

  return (
    <section id="process" className="py-20 px-4 bg-[#111118]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Як ми працюємо
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Три простих кроки до вашого результату
          </p>
        </FadeIn>

        <div className="relative">
          {/* Animated connecting line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-15 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#6366F1] via-50% to-[#06B6D4] to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <FadeIn
                key={step.title}
                delay={0.2 + index * 0.2}
                y={40}
                blur={6}
                className="group relative text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-6">
                  {/* Pulsing glow behind icon */}
                  <motion.div
                    className="absolute inset-[-8px] rounded-full bg-[#6366F1]/20"
                    animate={isInView ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    } : {}}
                    transition={{
                      duration: 2.5,
                      delay: 0.5 + index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="premium-icon w-20 h-20 bg-[#1A1A24] border-2 border-[#6366F1] rounded-full flex items-center justify-center relative z-10 transition-all duration-500 group-hover:border-[#8B5CF6] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                    <step.icon size={28} className="text-[#6366F1] transition-colors duration-300 group-hover:text-[#8B5CF6]" />
                  </div>
                  <motion.span
                    className="absolute -top-2 -right-2 bg-[#6366F1] text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center z-20 shadow-[0_0_16px_rgba(99,102,241,0.5)]"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.6 + index * 0.2 }}
                  >
                    {index + 1}
                  </motion.span>
                </div>
                <h3 className="text-[#F8F8FF] font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-[#8B8B9E] text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
