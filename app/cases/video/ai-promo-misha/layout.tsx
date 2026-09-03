import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI промо-відео | Freelance UA",
  description: "AI-згенероване промо-відео — динамічний контент для соціальних мереж",
  alternates: {
    canonical: "/cases/video/ai-promo-misha",
  },
  openGraph: {
    title: "AI промо-відео | Freelance UA",
    description: "AI-згенероване промо-відео — динамічний контент для соціальних мереж",
    images: ["https://freelance-ua.agency/media/cases/ai-city-promo/hero.mp4"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
