"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, refreshAfterFonts } from "./scroll/gsapCore";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/LanguageContext";

export function PartnersCTA() {
  const { t } = useTranslation();
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scopeRef.current) return;
      const q = gsap.utils.selector(scopeRef);

      const orb = q(".cta-orb")[0];
      const heading = q(".cta-heading")[0];
      const desc = q(".cta-desc")[0];
      const button = q(".cta-button")[0];
      if (!heading || !button) return;

      const mm = gsap.matchMedia();

      /* Reduced motion: static, fully visible */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([orb, heading, desc, button], { opacity: 1, y: 0, scale: 1, clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: scopeRef.current, start: "top 70%" };

        /* Orb grows and brightens as it enters (no animated filter — cheap) */
        if (orb) {
          gsap.fromTo(
            orb,
            { scale: 0.8, opacity: 0.35 },
            { scale: 1.3, opacity: 0.75, duration: 1, ease: "power2.out", scrollTrigger: st },
          );
        }

        /* Heading + description */
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: st },
        );
        if (desc) {
          gsap.fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: "power2.out", scrollTrigger: st },
          );
        }

        /* Button lands with a bounce */
        gsap.fromTo(
          button,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.7)", scrollTrigger: st },
        );

        /* Permanent shadow pulse around the main CTA */
        gsap.fromTo(
          button,
          { boxShadow: "0 0 40px rgba(99,102,241,0.3)" },
          { boxShadow: "0 0 60px rgba(99,102,241,0.6)", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" },
        );
      });

      refreshAfterFonts();
      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  return (
    <section ref={scopeRef} className="relative overflow-hidden px-4 py-16 sm:py-28">
      <div className="relative mx-auto max-w-3xl text-center">
        {/* Background orb (blur on a static wrapper; GSAP only touches the inner transform) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        >
          <div
            className="cta-orb h-full w-full rounded-full will-change-transform"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(168,85,247,0.25) 45%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative rounded-3xl border border-primary/20 bg-card/90 p-6 backdrop-blur-sm sm:p-14">
          <h2 className="cta-heading mb-4 text-2xl font-bold text-foreground sm:text-3xl">
            {t("partners.cta.title")}
          </h2>
          <p className="cta-desc mx-auto mb-8 max-w-lg text-base text-muted-foreground">
            {t("partners.cta.desc")}
          </p>
          <Link
            href={siteConfig.telegram.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button magnetic-button group inline-flex w-full max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90 sm:w-auto sm:gap-3 sm:px-10 sm:py-5 sm:text-base"
          >
            {t("partners.cta.button")}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
