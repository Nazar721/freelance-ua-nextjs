import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import type { Theme } from "@/lib/ThemeContext";
import { siteConfig } from "@/config/site";
import { translations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Default metadata of a root layout: brand title, localized description,
 * metadataBase. Deliberately WITHOUT openGraph and twitter — every real page
 * owns its complete OG/Twitter set (see lib/seo.ts), so nothing can
 * accidentally inherit the home page's cards.
 */
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL("https://freelance-ua.agency"),
    title: siteConfig.name,
    description: translations[locale]["meta.home.description"],
  };
}

/** Theme cookie — the only cookie that still affects rendering. */
export async function resolveTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  return cookieStore.get("SITE_THEME")?.value === "light" ? "light" : "dark";
}

export const rootStyle = { scrollPaddingTop: "120px" };
