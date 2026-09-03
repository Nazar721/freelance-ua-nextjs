import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Анімація презентації | Freelance UA",
  description: "Анімація для презентації — моушн-ефекти для професійної подачі",
  alternates: {
    canonical: "/cases/video/presentation-animation",
  },
  openGraph: {
    title: "Анімація презентації | Freelance UA",
    description: "Анімація для презентації — моушн-ефекти для професійної подачі",
    images: ["https://freelance-ua.agency/media/cases/presentation-animation/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
