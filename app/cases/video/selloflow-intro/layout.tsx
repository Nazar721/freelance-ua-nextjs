import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вступне відео Selloflow | Freelance UA",
  description: "Моушн-інтро для стартапу Selloflow — динамічний візуал для презентації платформи",
  alternates: {
    canonical: "/cases/video/selloflow-intro",
  },
  openGraph: {
    title: "Вступне відео Selloflow | Freelance UA",
    description: "Моушн-інтро для стартапу Selloflow — динамічний візуал для презентації платформи",
    images: ["https://freelance-ua.agency/media/cases/selloflow-intro/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
