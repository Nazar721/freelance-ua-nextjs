import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Промо SHEGLAM | Freelance UA",
  description: "Промо-ролик для косметичного бренду SHEGLAM — монтаж з motion-графікою та колабораціями",
  alternates: {
    canonical: "/cases/video/sheglam-promo",
  },
  openGraph: {
    title: "Промо SHEGLAM | Freelance UA",
    description: "Промо-ролик для косметичного бренду SHEGLAM — монтаж з motion-графікою та колабораціями",
    images: ["https://freelance-ua.agency/media/cases/sheglam-promo/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
