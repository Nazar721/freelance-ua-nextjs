import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Промо-ролик | Freelance UA",
  description: "Моушн-дизайн та монтаж промо-ролика — динамічний візуал для бренду",
  alternates: {
    canonical: "/cases/video/motion-promo",
  },
  openGraph: {
    title: "Промо-ролик | Freelance UA",
    description: "Моушн-дизайн та монтаж промо-ролика — динамічний візуал для бренду",
    images: ["https://freelance-ua.agency/media/cases/motion-promo/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
