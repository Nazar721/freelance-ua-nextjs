import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selloflow | Freelance UA",
  description: "Спільний проєкт — SaaS-платформа для створення магазинів за 2 хвилини: каталог, оформлення замовлень, Нова пошта, Telegram-бот, 10+ тем та 200+ магазинів.",
  alternates: {
    canonical: "/cases/it/selloflow",
  },
  openGraph: {
    title: "Selloflow | Freelance UA",
    description: "Спільний проєкт — SaaS-платформа для створення магазинів за 2 хвилини: каталог, оформлення замовлень, Нова пошта, Telegram-бот, 10+ тем та 200+ магазинів.",
    images: ["https://freelance-ua.agency/media/cases/selloflow-mocap.webp?v=2"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
