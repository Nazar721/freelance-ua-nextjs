"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/LanguageContext";
import { counterpartPath, type Locale } from "@/lib/i18n-routes";

const LiquidPill = () => (
  <motion.span
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
    className="absolute inset-0 rounded-full overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
      boxShadow:
        "0 0 20px rgba(99,102,241,0.4), inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -2px 6px rgba(49,32,120,0.55)",
    }}
  >
    <span
      className="absolute inset-x-1 top-0.5 h-1/2 rounded-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.38), rgba(255,255,255,0.06) 60%, transparent)",
        filter: "blur(1px)",
      }}
    />
    <span
      className="lang-pill-ring absolute inset-0.5 rounded-full border border-white/20"
      style={{
        maskImage:
          "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.15) 55%, transparent)",
        WebkitMaskImage:
          "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.15) 55%, transparent)",
      }}
    />
  </motion.span>
);

/**
 * Language switcher: a link to the counterpart URL of the current page
 * (query string and #fragment preserved). When the counterpart does not
 * exist yet, the other language is shown as a disabled segment — never a
 * silent redirect to the home page.
 */
export default function LanguageToggle() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const isEn = locale === "en";

  // The counterpart of the CURRENT language is the other segment. When it is
  // not available yet, that segment is disabled — the active (current)
  // language segment is never disabled.
  const otherHref = counterpartPath(pathname, isEn ? "uk" : "en");

  const segmentClass = (active: boolean, disabled: boolean) =>
    `relative min-w-[44px] sm:min-w-[52px] px-2 py-1 sm:py-1.5 text-center text-[11px] sm:text-xs rounded-full transition-colors duration-300 ${
      disabled
        ? "text-muted-foreground/40 cursor-not-allowed"
        : active
          ? "font-bold text-primary-foreground cursor-pointer"
          : "text-muted-foreground hover:text-foreground cursor-pointer"
    }`;

  const navigate = (href: string, next: Locale) => (e: React.MouseEvent) => {
    e.preventDefault();
    // Auxiliary preference only — the URL below is what actually opens.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    const { search, hash } = window.location;
    window.location.assign(`${href}${search}${hash}`);
  };

  // The segment for the CURRENT language is always an active (non-disabled)
  // span. The other language links to its counterpart URL; when the
  // counterpart does not exist yet it renders as a disabled segment —
  // never a silent redirect to the home page.
  const currentSegment = (label: "UA" | "EN") => (
    <span aria-pressed="true" className={segmentClass(true, false)}>
      <LiquidPill />
      <span className="relative z-10">{label}</span>
    </span>
  );

  const otherSegment = (label: "UA" | "EN", next: Locale) =>
    otherHref ? (
      <Link
        href={otherHref}
        onClick={navigate(otherHref, next)}
        aria-pressed="false"
        className={segmentClass(false, false)}
      >
        <span className="relative z-10">{label}</span>
      </Link>
    ) : (
      <span
        aria-disabled="true"
        aria-pressed="false"
        title={label === "EN" ? "English version is being prepared" : "Українська версія готується"}
        className={segmentClass(false, true)}
      >
        <span className="relative z-10">{label}</span>
      </span>
    );

  return (
    <div
      className="relative flex-shrink-0 flex items-center gap-0.5 rounded-full px-1 py-1 border border-border bg-card/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.35)]"
      style={{ WebkitTapHighlightColor: "transparent" }}
      role="group"
      aria-label={isEn ? "Переключити на українську" : "Switch to English"}
    >
      {isEn ? otherSegment("UA", "uk") : currentSegment("UA")}
      {isEn ? currentSegment("EN") : otherSegment("EN", "en")}
    </div>
  );
}
