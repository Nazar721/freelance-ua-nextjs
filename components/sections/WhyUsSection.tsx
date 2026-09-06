"use client";

import { CheckCircle, Clock, Shield, Sparkles, Users, Zap, Award } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

const advantageIcons = [Clock, Shield, Zap, Users, Sparkles, CheckCircle, Award];
const advantageKeys = ["why.1", "why.2", "why.3", "why.4", "why.5", "why.6", "why.7"];

export default function WhyUsSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-8 sm:py-16 px-4 sm:px-4 bg-surface">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-6 sm:mb-12" y={20} blur={4}>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4 font-[family-name:var(--font-syne)]">
            {t("why.title")}
          </h2>
          <p className="text-muted-foreground text-[15px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("why.desc")}
          </p>
        </FadeIn>

        <div className="flex flex-col gap-2 sm:gap-2.5">
          {advantageKeys.map((key, i) => {
            const Icon = advantageIcons[i];
            return (
              <FadeIn
                key={key}
                delay={0.05 + i * 0.04}
                y={16}
                blur={2}
              >
                <div className={`table-row-card group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-xl border border-border/60 bg-surface-elevated/50 cursor-default transition-all duration-300 hover:bg-surface-elevated hover:border-border hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] ${i === 0 ? 'table-row-card--active' : ''}`}>
                  <span className="text-base sm:text-xl md:text-2xl font-bold text-accent/25 group-hover:text-accent/60 transition-colors duration-300 min-w-[2rem] sm:min-w-[2.5rem] text-center shrink-0 font-[family-name:var(--font-syne)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg bg-accent/8 group-hover:bg-accent/15 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon size={16} className="text-accent/70 group-hover:text-accent transition-colors duration-300 sm:w-5 sm:h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-[13px] sm:text-base mb-0.5">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-[11px] sm:text-sm leading-relaxed">
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
