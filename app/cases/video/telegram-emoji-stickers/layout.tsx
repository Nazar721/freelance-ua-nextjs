import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji стікери для Telegram | Freelance UA",
  description: "Анімація emoji стікерів для Telegram — моушн-дизайн та монтаж",
  alternates: {
    canonical: "/cases/video/telegram-emoji-stickers",
  },
  openGraph: {
    title: "Emoji стікери для Telegram | Freelance UA",
    description: "Анімація emoji стікерів для Telegram — моушн-дизайн та монтаж",
    images: ["https://freelance-ua.agency/media/cases/telegram-emoji-stickers/screenshot.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
