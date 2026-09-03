import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Торгівля Тараненко | Freelance UA",
  description: "YouTube-відео про торгівлю — монтаж з динамічною подачею",
  alternates: {
    canonical: "/cases/video/taranenko-trade",
  },
  openGraph: {
    title: "Торгівля Тараненко | Freelance UA",
    description: "YouTube-відео про торгівлю — монтаж з динамічною подачею",
    images: ["https://freelance-ua.agency/media/cases/taranenko-trade/poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
