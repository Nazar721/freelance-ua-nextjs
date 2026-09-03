import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-оживлення фото | Freelance UA",
  description: "Оживлення статичного фото для Instagram за допомогою AI",
  alternates: {
    canonical: "/cases/video/valeriia-trend-reels",
  },
  openGraph: {
    title: "AI-оживлення фото | Freelance UA",
    description: "Оживлення статичного фото для Instagram за допомогою AI",
    images: ["https://freelance-ua.agency/media/cases/valeriia-trend-reels/screenshot.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
