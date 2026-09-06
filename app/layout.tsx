import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import type { Theme } from "@/lib/ThemeContext";
import { Providers } from "./providers";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ContentProtection from "@/components/ui/ContentProtection";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freelance-ua.agency"),
  title: siteConfig.name,
  description: "Ми — команда фрілансерів, яка допомагає бізнесу зростати. ІТ-розробка, дизайн, відеомонтаж та моушн-дизайн.",
  openGraph: {
    title: siteConfig.name,
    description: "Ми — команда фрілансерів, яка допомагає бізнесу зростати.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freelance UA — Digital Agency",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale = cookieLocale === "en" ? "en" : "uk";
  const cookieTheme = cookieStore.get("SITE_THEME")?.value;
  const theme: Theme = cookieTheme === "light" ? "light" : "dark";

  return (
    <html lang={locale} data-theme={theme} className={`${spaceGrotesk.variable} ${unbounded.variable}`} style={{ scrollPaddingTop: "120px" }}>
      <body>
        <ContentProtection />
        <LoadingScreen />
        <Providers initialLocale={locale} initialTheme={theme}>{children}</Providers>
      </body>
    </html>
  );
}
