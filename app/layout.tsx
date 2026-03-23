import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

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
        {children}
        <a
          href={siteConfig.telegram.consultationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.47c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.948l-2.937-.918c-.638-.198-.65-.638.136-.943l11.47-4.42c.532-.194.998.13.633.582z"/>
          </svg>
          Написати в Telegram
        </a>
      </body>
    </html>
  );
}
