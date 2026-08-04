"use client";

import { CheckCircle, Clock, Shield, Sparkles, Users, Zap, Award } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

const advantageIcons = [Clock, Shield, Zap, Users, Sparkles, CheckCircle, Award];
const advantageKeys = ["why.1", "why.2", "why.3", "why.4", "why.5", "why.6", "why.7"];

export default function WhyUsSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-12 sm:py-20 px-3 sm:px-4 bg-[#111118]">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-10 sm:mb-16" y={30} blur={8}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-3 sm:mb-4 font-[family-name:var(--font-syne)]">
            {t("why.title")}
          </h2>
          <p className="text-[#8B8B9E] text-sm sm:text-lg max-w-2xl mx-auto">
            {t("why.desc")}
          </p>
        </FadeIn>

        <div className="flex flex-col gap-2 sm:gap-2.5">
          {advantageKeys.map((key, i) => {
            const Icon = advantageIcons[i];
            return (
              <FadeIn
                key={key}
                delay={0.08 + i * 0.06}
                y={24}
                blur={4}
              >
                <div className={`table-row-card group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-xl border border-[#2A2A38]/60 bg-[#1A1A24]/50 cursor-default transition-all duration-300 hover:bg-[#1A1A24] hover:border-[#2A2A38] hover:translate-x-1 hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] ${i === 0 ? 'table-row-card--active' : ''}`}>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#6366F1]/25 group-hover:text-[#6366F1]/60 transition-colors duration-300 min-w-[2rem] sm:min-w-[2.5rem] text-center shrink-0 font-[family-name:var(--font-syne)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg bg-[#6366F1]/8 group-hover:bg-[#6366F1]/15 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon size={18} className="text-[#6366F1]/70 group-hover:text-[#6366F1] transition-colors duration-300 sm:w-5 sm:h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#F8F8FF] text-sm md:text-base mb-0.5 sm:mb-1">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-[#8B8B9E] text-xs md:text-sm leading-relaxed">
                      {t(`${key}.desc`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
