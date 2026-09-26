import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Відео урок Сергія Ярмоленка | Freelance UA",
  description:
    "Змонтували відео урок на 18 хвилин для блогера у ніші товарного бізнесу — динамічний монтаж, графіка та звукове оформлення",
  alternates: {
    canonical: "/cases/video/serhii-yarmolenko-video-lesson",
  },
  openGraph: {
    title: "Відео урок Сергія Ярмоленка | Freelance UA",
    description:
      "Змонтували відео урок на 18 хвилин для блогера у ніші товарного бізнесу — динамічний монтаж, графіка та звукове оформлення",
    images: [
      "https://freelance-ua.agency/media/cases/serhii-yarmolenko-video-lesson/screen-1.jpg",
    ],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
