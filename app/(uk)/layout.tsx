import type { Metadata } from "next";
import "../globals.css";
import RootDocument from "@/components/RootDocument";
import { rootHtmlClass } from "@/lib/root-fonts";
import { rootMetadata, resolveTheme, rootStyle, viewport } from "@/lib/root-layout";

export { viewport };

// Ukrainian root layout: owns every URL without the /en prefix. The language
// comes from the tree itself — no cookie, header or proxy is involved.
export const metadata: Metadata = rootMetadata("uk");

export default async function UkRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await resolveTheme();
  return (
    <html lang="uk" data-theme={theme} className={rootHtmlClass} style={rootStyle}>
      <RootDocument locale="uk" theme={theme}>
        {children}
      </RootDocument>
    </html>
  );
}
