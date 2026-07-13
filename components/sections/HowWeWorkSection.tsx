"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MessageSquare, Settings, CheckCircle2 } from "lucide-react";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });
  const reduced = useReducedMotion();

  return (
    <section id="process" className="py-20 px-4 bg-[#111118]">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Як ми працюємо
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Три простих кроки до вашого результату
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#6366F1] to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const d = 0.2 + index * 0.18;

              return (
                <motion.div
                  key={step.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Icon container */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Expanding ring 1 */}
                    <motion.div
                      className="absolute inset-[-8px] rounded-full border border-[#6366F1]/40"
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: d + 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    {/* Expanding ring 2 */}
                    <motion.div
                      className="absolute inset-[-16px] rounded-full border border-[#6366F1]/15"
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        duration: 0.7,
                        delay: d + 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    {/* Glow burst */}
                    <motion.div
                      className="absolute inset-[-20px] rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
                      }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={isInView ? { scale: [0.5, 1.3], opacity: [0.8, 0] } : {}}
                      transition={{ duration: 0.8, delay: d + 0.1, ease: "easeOut" }}
                    />

                    {/* Main circle */}
                    <motion.div
                      className="w-20 h-20 rounded-full bg-[#1A1A24] border-2 border-[#6366F1] flex items-center justify-center relative z-10"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                        delay: d,
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: 90 }}
                        animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                          delay: d + 0.15,
                        }}
                      >
                        <step.icon size={28} className="text-[#6366F1]" />
                      </motion.div>
                    </motion.div>

                    {/* Number badge — drops in from top */}
                    <motion.span
                      className="absolute -top-1 -right-1 bg-[#6366F1] text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center z-20 shadow-[0_0_16px_rgba(99,102,241,0.5)]"
                      initial={{ scale: 0, y: -12 }}
                      animate={isInView ? { scale: 1, y: 0 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 12,
                        delay: d + 0.3,
                      }}
                    >
                      {index + 1}
                    </motion.span>
                  </div>

                  {/* Text */}
                  <h3 className="text-[#F8F8FF] font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-[#8B8B9E] text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
