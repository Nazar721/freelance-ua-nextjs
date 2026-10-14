import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { translations, type Locale } from "@/lib/i18n";
import { Providers } from "@/app/providers";
import ContentProtection from "@/components/ui/ContentProtection";
import { absUrl } from "@/lib/i18n-routes";

// Shared <body> content for every root layout. Each locale has its own root
// layout (app/(uk)/layout.tsx, app/en/layout.tsx) so the URL, the dictionary
// and <html lang> always come from the same tree — navigating across the
// language boundary triggers a full document load in Next.js, which keeps
// the three in sync for direct opens, internal navigation and back/forward.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absUrl("/")}/#organization`,
      name: siteConfig.name,
      url: absUrl("/"),
      logo: `${absUrl("/")}/media/logo.jpg`,
      sameAs: [
        siteConfig.telegram.channelUrl,
        siteConfig.instagram,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${absUrl("/")}/#website`,
      url: absUrl("/"),
      name: siteConfig.name,
      publisher: { "@id": `${absUrl("/")}/#organization` },
    },
  ],
};

export default function RootDocument({
  locale,
  theme,
  children,
}: {
  locale: Locale;
  theme: string;
  children: ReactNode;
}) {
  return (
    <body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContentProtection />
      <Providers initialLocale={locale} initialTheme={theme as "light" | "dark"} messages={translations[locale]}>
        {children}
      </Providers>
    </body>
  );
}
