import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Моушн для Watch Hype | Freelance UA",
  description: "Моушн-промо для Watch Hype — динамічний монтаж для соцмереж",
  alternates: {
    canonical: "/cases/video/watch-hype-motion",
  },
  openGraph: {
    title: "Моушн для Watch Hype | Freelance UA",
    description: "Моушн-промо для Watch Hype — динамічний монтаж для соцмереж",
    images: ["https://freelance-ua.agency/media/cases/watch-hype-motion/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
