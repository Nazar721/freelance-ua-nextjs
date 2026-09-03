import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Epiland | Freelance UA",
  description: "Telegram-бот і Mini App для парку розваг: бронювання дитячих днів народження у 4 кроки, прогрес-бар, FAQ, графік і структуровані заявки для менеджерів.",
  alternates: {
    canonical: "/cases/it/epiland",
  },
  openGraph: {
    title: "Epiland | Freelance UA",
    description: "Telegram-бот і Mini App для парку розваг: бронювання дитячих днів народження у 4 кроки, прогрес-бар, FAQ, графік і структуровані заявки для менеджерів.",
    images: ["https://freelance-ua.agency/media/cases/epiland-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
