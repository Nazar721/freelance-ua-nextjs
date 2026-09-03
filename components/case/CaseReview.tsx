"use client";

import { Quote } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";

interface CaseReviewProps {
  textKey: string;
  authorKey: string;
  accentColor?: string;
}

export default function CaseReview({ textKey, authorKey, accentColor = "primary" }: CaseReviewProps) {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn y={30} blur={8}>
          <div className="featured-case-card p-8 md:p-12 text-center" style={{ borderRadius: "20px" }}>
            <Quote size={32} className={`text-${accentColor} mx-auto mb-6 opacity-50`} />
            <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
              &ldquo;{t(textKey)}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <ReviewAvatar name={t(authorKey)} />
              <p className={`text-${accentColor} font-semibold`}>{t(authorKey)}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
