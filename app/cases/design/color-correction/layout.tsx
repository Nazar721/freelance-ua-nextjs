import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кольорокорекція відео | Freelance UA",
  description: "Кольорокорекція відео — робота зі світлом, кольором та настроєм кадру",
  alternates: {
    canonical: "/cases/design/color-correction",
  },
  openGraph: {
    title: "Кольорокорекція відео | Freelance UA",
    description: "Кольорокорекція відео — робота зі світлом, кольором та настроєм кадру",
    images: ["https://freelance-ua.agency/media/cases/color-correction/poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
