import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-відео Втіха | Freelance UA",
  description: "Промо-ролик для проєкту Втіха — AI-згенероване відео з монтажем",
  alternates: {
    canonical: "/cases/video/vtikha-promo",
  },
  openGraph: {
    title: "AI-відео Втіха | Freelance UA",
    description: "Промо-ролик для проєкту Втіха — AI-згенероване відео з монтажем",
    images: ["https://freelance-ua.agency/media/cases/vtikha-promo/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
