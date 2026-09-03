import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-відео моди | Freelance UA",
  description: "AI-генероване відео весняної моди — динамічний контент для соціальних мереж",
  alternates: {
    canonical: "/cases/video/ai-spring-fashion",
  },
  openGraph: {
    title: "AI-відео моди | Freelance UA",
    description: "AI-генероване відео весняної моди — динамічний контент для соціальних мереж",
    images: ["https://freelance-ua.agency/media/cases/ai-spring-fashion/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
