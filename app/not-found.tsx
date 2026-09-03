"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <FadeIn y={30} blur={6}>
        <p className="text-7xl font-bold text-muted-foreground/30 mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Сторінку не знайдено
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Вибачте, такої сторінки не існує. Можливо, посилання застаріло або ви помилились у шляху.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          На головну
        </Link>
      </FadeIn>
    </section>
  );
}
