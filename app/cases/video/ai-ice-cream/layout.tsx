import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-відео морозива | Freelance UA",
  description: "AI-генерований промо-ролик морозива для маркетингу — реалістична візуалізація продукту",
  alternates: {
    canonical: "/cases/video/ai-ice-cream",
  },
  openGraph: {
    title: "AI-відео морозива | Freelance UA",
    description: "AI-генерований промо-ролик морозива для маркетингу — реалістична візуалізація продукту",
    images: ["https://freelance-ua.agency/media/cases/ai-ice-cream/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
