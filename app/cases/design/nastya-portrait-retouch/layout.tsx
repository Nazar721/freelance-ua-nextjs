import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ретуш портретів | Freelance UA",
  description: "Обробка портретних кадрів — кольорокорекція, ретуш шкіри та світла, робота з фоном для фінальної подачі кадрів.",
  alternates: {
    canonical: "/cases/design/nastya-portrait-retouch",
  },
  openGraph: {
    title: "Ретуш портретів | Freelance UA",
    description: "Обробка портретних кадрів — кольорокорекція, ретуш шкіри та світла, робота з фоном для фінальної подачі кадрів.",
    images: ["https://freelance-ua.agency/media/cases/nastya-portrait-retouch/final-1.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
