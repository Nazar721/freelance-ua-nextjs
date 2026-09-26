import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сергій Ярмоленко | Freelance UA",
  description: "Створили серію Reels для Instagram — 3 відео для блогера у ніші товарного бізнесу з аудиторією 91,7 тис.",
  alternates: {
    canonical: "/cases/video/serhii-yarmolenko-reels",
  },
  openGraph: {
    title: "Сергій Ярмоленко | Freelance UA",
    description: "Створили серію Reels для Instagram — 3 відео для блогера у ніші товарного бізнесу з аудиторією 91,7 тис.",
    images: ["https://freelance-ua.agency/media/cases/serhii-yarmolenko-reels/profile.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
