"use client";

import Link from "next/link";
import { ArrowRight, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

const steps = [
  {
    num: "01",
    titleKey: "partnership.steps.step1.title",
    descKey: "partnership.steps.step1.desc",
    bg: "bg-gradient-to-br from-amber-500/25 to-orange-500/5",
    border: "border-amber-500/35",
    glow: "0 12px 40px rgba(245, 158, 11, 0.15)",
    numColor: "text-amber-400",
  },
  {
    num: "02",
    titleKey: "partnership.steps.step2.title",
    descKey: "partnership.steps.step2.desc",
    bg: "bg-gradient-to-br from-blue-500/25 to-cyan-500/5",
    border: "border-blue-500/35",
    glow: "0 12px 40px rgba(59, 130, 246, 0.15)",
    numColor: "text-blue-400",
  },
  {
    num: "03",
    titleKey: "partnership.steps.step3.title",
    descKey: "partnership.steps.step3.desc",
    bg: "bg-gradient-to-br from-green-500/25 to-emerald-500/5",
    border: "border-green-500/35",
    glow: "0 12px 40px rgba(34, 197, 94, 0.15)",
    numColor: "text-green-400",
  },
];

export default function PartnershipSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-28 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <div className="relative z-10">
            <FadeIn y={30} blur={6}>
              <div className="inline-flex items-center gap-2.5 mb-6">
                <span className="text-[#6366F1] text-sm font-semibold">%</span>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B8B9E]">
                  {t("header.partner")}
                </span>
              </div>
            </FadeIn>

            <FadeIn y={30} blur={6} delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#F8F8FF] leading-[1.1] mb-6">
                {t("partnership.title")}
              </h2>
            </FadeIn>

            <FadeIn y={30} blur={6} delay={0.2}>
              <p className="text-[#8B8B9E] text-lg sm:text-xl leading-relaxed mb-10 max-w-md">
                {t("partnership.desc")}
              </p>
            </FadeIn>

            <FadeIn y={30} blur={6} delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={siteConfig.telegram.consultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-button inline-flex items-center justify-center gap-2.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_48px_rgba(99,102,241,0.46)] text-sm"
                >
                  {t("partnership.cta")}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/partners"
                  className="magnetic-button inline-flex items-center justify-center gap-2 bg-transparent border border-border hover:border-accent/50 text-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 text-sm"
                >
                  Детальніше
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right — Isometric Stack */}
          <div className="relative flex items-center justify-center min-h-[380px]">
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] bg-[#6366F1]/6 rounded-full blur-[80px]" />
            </div>

            <div className="relative w-full max-w-[340px]">
              {steps.map((step, i) => (
                <FadeIn key={i} y={30} blur={5} delay={0.15 + i * 0.15}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative ${step.bg} border ${step.border} backdrop-blur-md rounded-2xl p-5 mb-4 last:mb-0`}
                    style={{
                      boxShadow: step.glow,
                      transform: `perspective(600px) rotateY(-3deg) translateX(${i * 8}px)`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`text-3xl font-black ${step.numColor} font-mono leading-none`}>
                        {step.num}
                      </span>
                      <div>
                        <h3 className="text-[#F8F8FF] font-bold text-lg mb-1">
                          {t(step.titleKey)}
                        </h3>
                        <p className="text-[#8B8B9E] text-sm leading-relaxed">
                          {t(step.descKey)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
