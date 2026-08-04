"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  useEffect(() => {
    if (activeFactor === null) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveFactor(null);
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeFactor]);

  return (
    <section id="pricing" className="py-20 px-4 pricing-aurora">
      <div className="pricing-orb pricing-orb--1" />
      <div className="pricing-orb pricing-orb--2" />
      <div className="pricing-orb pricing-orb--3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            {t("pricing.desc")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <FadeIn delay={0.15} y={40} blur={6}>
            <div className="bg-[#111118]/80 backdrop-blur-sm border border-[#2A2A38] rounded-2xl p-8 h-full">
              <h3 className="text-[#F8F8FF] font-bold text-xl mb-6">
                {t("pricing.factorsTitle")}
              </h3>
              <ul className="space-y-1">
                {pricingFactorKeys.map((key, i) => (
                  <FadeIn
                    key={key}
                    delay={0.3 + i * 0.08}
                    x={-20}
                    blur={0}
                  >
                    <li
                      className="pricing-factor group cursor-pointer"
                      onClick={() => setActiveFactor(i)}
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight size={16} className="factor-icon text-[#6366F1] shrink-0" />
                        <span className="text-[#8B8B9E] group-hover:text-[#F8F8FF] transition-colors duration-300">
                          {t(key)}
                        </span>
                      </div>
                      <div className="factor-bar ml-7" style={{ "--bar-width": `${factorWeights[i]}%` } as React.CSSProperties}>
                        <div className="factor-bar-fill" style={{ "--bar-width": `${factorWeights[i]}%` } as React.CSSProperties} />
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={50} rotateX={6} blur={6}>
            <div className="premium-surface bg-linear-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 border border-[#6366F1]/30 rounded-2xl p-8 text-center h-full">
              <div className="premium-icon mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6366F1]/10 text-4xl mb-4 float">
                💬
              </div>
              <h3 className="text-[#F8F8FF] font-bold text-2xl mb-4">
                {t("pricing.consultTitle")}
              </h3>
              <p className="text-[#8B8B9E] mb-8 leading-relaxed">
                {t("pricing.consultDesc")}
              </p>
              <a
                href={siteConfig.telegram.consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pulse magnetic-button inline-flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_44px_rgba(99,102,241,0.42)]"
              >
                {t("pricing.getEstimate")}
                <ArrowRight size={18} />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {activeFactor !== null && typeof window !== "undefined" && createPortal(
        <div className="pricing-modal-overlay" onClick={() => setActiveFactor(null)}>
          <div className="pricing-modal-panel" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveFactor(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={16} className="text-[#8B8B9E]" />
            </button>
            <h4 className="text-[#F8F8FF] font-bold text-xl mb-3">
              {t(pricingFactorKeys[activeFactor])}
            </h4>
            <p className="text-[#8B8B9E] text-sm leading-relaxed">
              {t(pricingFactorDescKeys[activeFactor])}
            </p>
            <div className="pricing-factor-popover-glow" />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
