"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Settings, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/LanguageContext";

const stepIcons = [MessageSquare, Settings, CheckCircle2];
const stepKeys = ["process.1", "process.2", "process.3", "process.4"];

// Smooth easing curve — no overshoot
const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function HowWeWorkSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section id="process" className="py-20 px-4 bg-[#111118]">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: smoothEase }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            {t("process.title")}
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            {t("process.desc")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#6366F1] to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {stepKeys.slice(0, 3).map((key, index) => {
              const Icon = stepIcons[index];
              const d = 0.15 + index * 0.12;

              return (
                <motion.div
                  key={key}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: d, ease: smoothEase }}
                >
                  {/* Icon container */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Static ring 1 — no animation, just fades in */}
                    <motion.div
                      className="absolute inset-[-8px] rounded-full border border-[#6366F1]/30"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: d + 0.1 }}
                    />

                    {/* Static ring 2 */}
                    <motion.div
                      className="absolute inset-[-16px] rounded-full border border-[#6366F1]/10"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: d + 0.15 }}
                    />

                    {/* Main circle — smooth scale */}
                    <motion.div
                      className="w-20 h-20 rounded-full bg-[#1A1A24] border-2 border-[#6366F1] flex items-center justify-center relative z-10"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: d,
                        ease: smoothEase,
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.3, delay: d + 0.1 }}
                      >
                        <Icon size={28} className="text-[#6366F1]" />
                      </motion.div>
                    </motion.div>

                    {/* Number badge — simple fade + slight move */}
                    <motion.span
                      className="absolute -top-1 -right-1 bg-[#6366F1] text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center z-20 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: d + 0.2,
                        ease: smoothEase,
                      }}
                    >
                      {index + 1}
                    </motion.span>
                  </div>

                  {/* Text */}
                  <h3 className="text-[#F8F8FF] font-bold text-xl mb-3">{t(key + ".title")}</h3>
                  <p className="text-[#8B8B9E] text-sm leading-relaxed max-w-xs mx-auto">
                    {t(key + ".desc")}
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
