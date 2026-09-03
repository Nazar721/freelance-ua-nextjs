import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "сертифікат | Freelance UA",
  description: "Подарунковий сертифікат для бьюті-салону — елегантний дизайн у золотих тонах, гідний преміального бренду.",
  alternates: {
    canonical: "/cases/design/schonheit-gift-certificate",
  },
  openGraph: {
    title: "сертифікат | Freelance UA",
    description: "Подарунковий сертифікат для бьюті-салону — елегантний дизайн у золотих тонах, гідний преміального бренду.",
    images: ["https://freelance-ua.agency/media/cases/schonheit-gift-certificate/schonheit-gift-certificate-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
