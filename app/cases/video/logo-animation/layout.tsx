import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Анімація логотипу | Freelance UA",
  description: "Анімація логотипу — моушн-дизайн для створення динамічного візуалу бренду",
  alternates: {
    canonical: "/cases/video/logo-animation",
  },
  openGraph: {
    title: "Анімація логотипу | Freelance UA",
    description: "Анімація логотипу — моушн-дизайн для створення динамічного візуалу бренду",
    images: ["https://freelance-ua.agency/media/cases/logo-animation/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
