import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels для SMM | Freelance UA",
  description: "Монтаж Reels для SMM-спеціалістки — динамічні відео для Instagram",
  alternates: {
    canonical: "/cases/video/yulia-smm-reels",
  },
  openGraph: {
    title: "Reels для SMM | Freelance UA",
    description: "Монтаж Reels для SMM-спеціалістки — динамічні відео для Instagram",
    images: ["https://freelance-ua.agency/media/cases/yulia-smm-reels/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
