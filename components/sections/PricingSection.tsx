"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

const pricingFactorKeys = [
  "pricing.factor.1",
  "pricing.factor.2",
  "pricing.factor.3",
  "pricing.factor.4",
  "pricing.factor.5",
];

const pricingFactorDescKeys = [
  "pricing.factor.1.desc",
  "pricing.factor.2.desc",
  "pricing.factor.3.desc",
  "pricing.factor.4.desc",
  "pricing.factor.5.desc",
];

const factorWeights = [85, 70, 55, 65, 45];

export default function PricingSection() {
  const { t } = useTranslation();
  const [activeFactor, setActiveFactor] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    setActiveFactor(null);
  }, []);

  useEffect(() => {
    if (activeFactor === null) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeFactor, closeModal]);

  return (
    <section id="pricing" className="py-12 sm:py-20 px-3 sm:px-4 pricing-aurora">
      <div className="pricing-orb pricing-orb--1" />
      <div className="pricing-orb pricing-orb--2" />
      <div className="pricing-orb pricing-orb--3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn className="text-center mb-8 sm:mb-16" y={20} blur={4}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            {t("pricing.desc")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          <FadeIn delay={0.15} y={24} blur={4}>
            <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl p-5 sm:p-8 h-full">
              <h3 className="text-foreground font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                {t("pricing.factorsTitle")}
              </h3>
              <ul className="space-y-0.5 sm:space-y-1">
                {pricingFactorKeys.map((key, i) => (
                  <FadeIn
                    key={key}
                    delay={0.3 + i * 0.06}
                    x={-12}
                    blur={0}
                  >
                    <li
                      className="pricing-factor group cursor-pointer py-2 sm:py-2.5"
                      onClick={() => setActiveFactor(i)}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <ChevronRight size={14} className="factor-icon text-accent shrink-0 sm:w-4 sm:h-4" />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-sm sm:text-base">
                          {t(key)}
                        </span>
                      </div>
                      <div className="factor-bar ml-6 sm:ml-7" style={{ "--bar-width": `${factorWeights[i]}%` } as React.CSSProperties}>
                        <div className="factor-bar-fill" style={{ "--bar-width": `${factorWeights[i]}%`, "--bar-scale": factorWeights[i] / 100 } as React.CSSProperties} />
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={30} blur={4}>
            <div className="premium-surface bg-linear-to-br from-accent/20 to-accent/10 border border-accent/30 rounded-2xl p-6 sm:p-8 text-center h-full">
              <div className="premium-icon mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-accent/10 text-3xl sm:text-4xl mb-4 float">
                💬
              </div>
              <h3 className="text-foreground font-bold text-xl sm:text-2xl mb-3 sm:mb-4">
                {t("pricing.consultTitle")}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                {t("pricing.consultDesc")}
              </p>
              <a
                href={siteConfig.telegram.consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pulse magnetic-button inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-primary-foreground font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_44px_rgba(99,102,241,0.42)] text-sm sm:text-base"
              >
                {t("pricing.getEstimate")}
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {activeFactor !== null && (
            <>
              <motion.div
                key="pricing-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
                onClick={closeModal}
              />
              <motion.div
                key="pricing-modal"
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vw] max-w-md"
              >
                <div className="pricing-modal-panel relative bg-surface-elevated border border-border rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.5)]" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X size={16} className="text-muted-foreground" />
                  </button>
                  <h4 className="text-foreground font-bold text-lg sm:text-xl mb-3 pr-8">
                    {t(pricingFactorKeys[activeFactor])}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(pricingFactorDescKeys[activeFactor])}
                  </p>
                  <div className="pricing-factor-popover-glow" />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
