import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Нікіта Шеремет | Freelance UA",
  description: "Створили серію Reels для Instagram — 4 відео з аналітикою крипто-ринку та порадами для інвесторів",
  alternates: {
    canonical: "/cases/video/nikita-sheremet-crypto",
  },
  openGraph: {
    title: "Нікіта Шеремет | Freelance UA",
    description: "Створили серію Reels для Instagram — 4 відео з аналітикою крипто-ринку та порадами для інвесторів",
    images: ["https://freelance-ua.agency/media/cases/nikita-sheremet-crypto/screenshot.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
