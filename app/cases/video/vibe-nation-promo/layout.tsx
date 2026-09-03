import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Промо для Vibe Nation | Freelance UA",
  description: "AI-промо-ролик для бренду Vibe Nation — динамічний візуал для соцмереж",
  alternates: {
    canonical: "/cases/video/vibe-nation-promo",
  },
  openGraph: {
    title: "Промо для Vibe Nation | Freelance UA",
    description: "AI-промо-ролик для бренду Vibe Nation — динамічний візуал для соцмереж",
    images: ["https://freelance-ua.agency/media/cases/vibe-nation-promo/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
