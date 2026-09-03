import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels для Cuprus Life | Freelance UA",
  description: "3 Instagram Reels для бренду Cuprus Life — динамічний монтаж",
  alternates: {
    canonical: "/cases/video/cuprus-life",
  },
  openGraph: {
    title: "Reels для Cuprus Life | Freelance UA",
    description: "3 Instagram Reels для бренду Cuprus Life — динамічний монтаж",
    images: ["https://freelance-ua.agency/media/cases/cuprus-life/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
