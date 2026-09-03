import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Фотообробка | Freelance UA",
  description: "Приклади кольорокорекції та ретуші різних типів кадрів — від авто до портретної зйомки. Демонстрація підходу до обробки світла, кольору й деталей.",
  alternates: {
    canonical: "/cases/design/photo-retouch",
  },
  openGraph: {
    title: "Фотообробка | Freelance UA",
    description: "Приклади кольорокорекції та ретуші різних типів кадрів — від авто до портретної зйомки. Демонстрація підходу до обробки світла, кольору й деталей.",
    images: ["https://freelance-ua.agency/media/cases/photo-retouch/photo-retouch-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
