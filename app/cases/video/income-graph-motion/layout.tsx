import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Анімація графіку доходів | Freelance UA",
  description: "Моушн-анімація графіку доходів — динамічна візуалізація даних",
  alternates: {
    canonical: "/cases/video/income-graph-motion",
  },
  openGraph: {
    title: "Анімація графіку доходів | Freelance UA",
    description: "Моушн-анімація графіку доходів — динамічна візуалізація даних",
    images: ["https://freelance-ua.agency/media/cases/income-graph-motion/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
