import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels для Артема | Freelance UA",
  description: "Створили Reels для блогера Артема — динамічний монтаж для соцмереж",
  alternates: {
    canonical: "/cases/video/artem-reels",
  },
  openGraph: {
    title: "Reels для Артема | Freelance UA",
    description: "Створили Reels для блогера Артема — динамічний монтаж для соцмереж",
    images: ["https://freelance-ua.agency/media/cases/artem-reels/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
