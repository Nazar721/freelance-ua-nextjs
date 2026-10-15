"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Settings, CheckCircle2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useTranslation } from "@/lib/LanguageContext";

const stepIcons = [MessageSquare, Settings, CheckCircle2];
const stepKeys = ["process.1", "process.2", "process.3"];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SMOOTH_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function HowWeWorkSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(max-width: 767px)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [focusedStep, setFocusedStep] = useState<number | null>(null);

  const showAll = shouldReduceMotion;

  return (
    <section id="process" className="py-20 px-4 bg-surface">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <motion.div
          className="text-center mb-16"
          initial={showAll ? false : { opacity: 0, y: 16 }}
          animate={showAll || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: showAll ? 0 : 0.5, ease: EASE }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("process.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("process.desc")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop horizontal line — original visual, now two sequential segments */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[40px] left-[calc(16.67%+44px)] right-[calc(16.67%+44px)] h-px overflow-hidden"
          >
            <div className="absolute inset-0 bg-border/30" />
            {showAll ? (
              <>
                <div className="absolute left-0 top-0 h-full w-[calc(50%-44px)] bg-accent process-line opacity-60" />
                <div className="absolute right-0 top-0 h-full w-[calc(50%-44px)] bg-accent process-line opacity-60" />
              </>
            ) : isMobile ? null : (
              <>
                <motion.div
                  className="absolute left-0 top-0 h-full bg-accent process-line origin-left"
                  style={{ width: "calc(50% - 44px)" }}
                  initial={{ scaleX: 0 }}
                  animate={isInView || focusedStep === 1 ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
                />
                <motion.div
                  className="absolute right-0 top-0 h-full bg-accent process-line origin-left"
                  style={{ width: "calc(50% - 44px)" }}
                  initial={{ scaleX: 0 }}
                  animate={isInView || focusedStep === 2 ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.4, delay: 0.95, ease: EASE }}
                />
              </>
            )}
          </div>

          {/* Mobile vertical line */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-1/2 top-[40px] bottom-[40px] w-px -translate-x-1/2"
          >
            <div className="absolute inset-0 bg-border/30" />
            {showAll ? (
              <>
                <div className="absolute left-0 top-[44px] bottom-[50%] mb-[10px] w-full bg-accent" />
                <div className="absolute left-0 top-[50%] mt-[10px] bottom-[44px] w-full bg-accent" />
              </>
            ) : (
              <>
                <motion.div
                  className="absolute left-0 w-full bg-accent origin-top"
                  style={{ top: "44px", height: "calc(33.33% - 24px)" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
                />
                <motion.div
                  className="absolute left-0 w-full bg-accent origin-top"
                  style={{ bottom: "44px", height: "calc(33.33% - 24px)" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: 0.95, ease: EASE }}
                />
              </>
            )}
          </div>

          <div className="process-steps grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {stepKeys.slice(0, 3).map((key, index) => {
              const Icon = stepIcons[index];
              if (showAll) {
                return (
                  <div key={key} className="process-step text-center relative">
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="step-glow" />
                      <div className="step-pulse" />
                      <div className="absolute inset-[-8px] rounded-full border border-accent/30" />
                      <div className="absolute inset-[-16px] rounded-full border border-accent/10" />
                      <div className="w-20 h-20 rounded-full bg-surface-elevated border-2 border-accent flex items-center justify-center relative z-10">
                        <Icon size={28} className="text-accent" aria-hidden="true" />
                      </div>
                      <span
                        aria-hidden="true"
                        className="absolute -top-1 -right-1 bg-accent text-primary-foreground text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center z-20 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      >
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-foreground font-bold text-xl mb-3">{t(key + ".title")}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                      {t(key + ".desc")}
                    </p>
                  </div>
                );
              }

              if (isMobile) {
                return (
                  <motion.div
                    key={key}
                    className="process-step text-center relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.6, ease: EASE }}
                    onFocus={() => setFocusedStep(index)}
                    onBlur={() => setFocusedStep(null)}
                  >
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="step-glow" />
                      <div className="step-pulse" />
                      <div className="absolute inset-[-8px] rounded-full border border-accent/30" />
                      <div className="absolute inset-[-16px] rounded-full border border-accent/10" />
                      <div className="w-20 h-20 rounded-full bg-surface-elevated border-2 border-accent flex items-center justify-center relative z-10">
                        <Icon size={28} className="text-accent" aria-hidden="true" />
                      </div>
                      <span
                        aria-hidden="true"
                        className="absolute -top-1 -right-1 bg-accent text-primary-foreground text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center z-20 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      >
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-foreground font-bold text-xl mb-3">{t(key + ".title")}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                      {t(key + ".desc")}
                    </p>
                  </motion.div>
                );
              }

              const delay = index === 0 ? 0 : index === 1 ? 0.6 : 1.2;
              const visible = isInView || focusedStep === index;
              return (
                <motion.div
                  key={key}
                  className="process-step text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay, ease: EASE }}
                  onFocus={() => setFocusedStep(index)}
                  onBlur={() => setFocusedStep(null)}
                >
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="step-glow" />
                    <div className="step-pulse" />
                    <div className="absolute inset-[-8px] rounded-full border border-accent/30" />
                    <div className="absolute inset-[-16px] rounded-full border border-accent/10" />
                    <div className="w-20 h-20 rounded-full bg-surface-elevated border-2 border-accent flex items-center justify-center relative z-10">
                      <Icon size={28} className="text-accent" aria-hidden="true" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="absolute -top-1 -right-1 bg-accent text-primary-foreground text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center z-20 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                    >
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-3">{t(key + ".title")}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
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
