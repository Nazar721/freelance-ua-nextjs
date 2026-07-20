import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ContentProtection from "@/components/ui/ContentProtection";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
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
    images: ["/media/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <body>
        <ContentProtection />
        <LoadingScreen />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
