import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "стікери для Telegram | Freelance UA",
  description:
    "Пак стікерів для Telegram: 52 авторські емоції, єдина стилістика персонажа, прозорий фон і публікація в один клік.",
  alternates: {
    canonical: "/cases/design/snizhana-telegram-stickers",
  },
  openGraph: {
    title: "стікери для Telegram | Freelance UA",
    description:
      "Пак стікерів для Telegram: 52 авторські емоції, єдина стилістика персонажа, прозорий фон і публікація в один клік.",
    images: [
      "https://freelance-ua.agency/media/cases/snizhana-telegram-stickers/sticker-01.png",
    ],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
