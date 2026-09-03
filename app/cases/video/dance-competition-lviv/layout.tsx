import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels для танцювального конкурсу | Freelance UA",
  description: "Reels для танцювального конкурсу у Львові — динамічний монтаж з атмосферними кадрами",
  alternates: {
    canonical: "/cases/video/dance-competition-lviv",
  },
  openGraph: {
    title: "Reels для танцювального конкурсу | Freelance UA",
    description: "Reels для танцювального конкурсу у Львові — динамічний монтаж з атмосферними кадрами",
    images: ["https://freelance-ua.agency/media/cases/dance-competition-lviv/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
