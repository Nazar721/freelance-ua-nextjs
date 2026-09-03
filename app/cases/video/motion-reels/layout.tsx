import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Моушн Reels | Freelance UA",
  description: "Моушн-дизайн для Instagram Reels — динамічні відео з анімаціями",
  alternates: {
    canonical: "/cases/video/motion-reels",
  },
  openGraph: {
    title: "Моушн Reels | Freelance UA",
    description: "Моушн-дизайн для Instagram Reels — динамічні відео з анімаціями",
    images: ["https://freelance-ua.agency/media/cases/motion-reels/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
