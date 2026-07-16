import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "cyrillic"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin", "cyrillic"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
