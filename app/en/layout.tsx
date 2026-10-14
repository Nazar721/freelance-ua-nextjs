import type { Metadata } from "next";
import "../globals.css";
import RootDocument from "@/components/RootDocument";
import { rootHtmlClass } from "@/lib/root-fonts";
import { rootMetadata, resolveTheme, rootStyle, viewport } from "@/lib/root-layout";

export { viewport };

// English root layout: owns every /en URL. Separate root layout means a
// navigation across the language boundary is a full document load, so
// <html lang>, the dictionary and the URL can never disagree.
export const metadata: Metadata = rootMetadata("en");

export default async function EnRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await resolveTheme();
  return (
    <html lang="en" data-theme={theme} className={rootHtmlClass} style={rootStyle}>
      <RootDocument locale="en" theme={theme}>
        {children}
      </RootDocument>
    </html>
  );
}
