"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import HalftoneWordmarkFooter, {
  type FooterColumn,
} from "@/components/ui/halftone-wordmark-footer";

/* The halftone palette follows the site theme. Both themes share the brand
   purple (#6366F1) as the reaction colour; only the paper and ink change. */
const FOOTER_PALETTES = {
  dark: { background: "#111118", ink: "#F8F8FF", warm: "#6366F1" },
  light: { background: "#FFFFFF", ink: "#18181B", warm: "#6366F1" },
} as const;

/* The project face — the same CSS variables the root layout loads through
   next/font, resolved by the canvas against the live document. */
const PROJECT_FACE = "var(--font-space-grotesk), sans-serif";

/**
 * The shared footer of every page (it owns the #contacts landmark the header
 * nav scrolls to). Content is localized; the dotted wordmark below it is a
 * single canvas element, never a nested <footer>.
 */
export default function Footer() {
  const { t, locale } = useTranslation();
  const { theme } = useTheme();

  // Language prefix for internal links: "" for Ukrainian, "/en" for English.
  const lp = locale === "en" ? "/en" : "";
  const year = new Date().getFullYear();

  const columns: FooterColumn[] = [
    {
      title: t("footer.services"),
      links: [
        { label: t("services.it.category"), href: `${lp}/services/it` },
        { label: t("services.design.category"), href: `${lp}/services/design` },
        { label: t("services.video.category"), href: `${lp}/services/video` },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("nav.about"), href: `${lp}/#about` },
        { label: t("nav.process"), href: `${lp}/#process` },
        { label: t("nav.cases"), href: `${lp}/cases` },
        { label: t("header.partner"), href: `${lp}/partners` },
      ],
    },
    {
      title: t("footer.contact"),
      links: [
        { label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
        {
          label: siteConfig.telegram.username,
          href: siteConfig.telegram.consultationUrl,
          external: true,
        },
        { label: "Instagram", href: siteConfig.instagram, external: true },
      ],
    },
  ];

  return (
    <HalftoneWordmarkFooter
      id="contacts"
      wordmark="freelance ua"
      wordmarkLabel="Freelance UA"
      palette={FOOTER_PALETTES[theme]}
      fontFamily={PROJECT_FACE}
      monoFamily={PROJECT_FACE}
      fontWeight={700}
      columns={columns}
      backToTopLabel={t("footer.top")}
      meta={
        <>
          © {year} {siteConfig.name}. {t("footer.rights")}
        </>
      }
      brand={
        <>
          <div className="hwf-brand-row">
            <Image
              src="/media/logo.jpg"
              alt=""
              width={44}
              height={44}
              className="hwf-logo"
            />
            <div>
              <strong>Freelance UA</strong>
              <span className="hwf-tag">{t("hero.badge")}</span>
            </div>
          </div>
          <p>{t("footer.desc")}</p>
        </>
      }
    />
  );
}
