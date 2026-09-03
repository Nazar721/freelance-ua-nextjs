"use client";

import { Check } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

interface CaseResultsProps {
  titleKey?: string;
  results: string[];
}

export default function CaseResults({ titleKey = "itCases.results", results }: CaseResultsProps) {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn y={30} blur={8}>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t(titleKey)}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4">
          {results.map((r, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.08} y={20} blur={4}>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-elevated/50 border border-border">
                <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-green-500" />
                </div>
                <p className="text-foreground text-sm leading-relaxed">{t(r)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
