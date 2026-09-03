import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Біблія продавця | Freelance UA",
  description: "Моушн-промо для курсу «Біблія продавця» — динамічний візуал для освітнього проєкту",
  alternates: {
    canonical: "/cases/video/sales-bible-promo",
  },
  openGraph: {
    title: "Біблія продавця | Freelance UA",
    description: "Моушн-промо для курсу «Біблія продавця» — динамічний візуал для освітнього проєкту",
    images: ["https://freelance-ua.agency/media/cases/sales-bible-promo/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
