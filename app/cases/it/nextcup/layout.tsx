import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextCup | Freelance UA",
  description: "Оновлення застарілого інтернет-магазину на Хорошоп з новим дизайном, структурованим каталогом, фото-банерами та оптимізованим checkout. Результат: сайт готовий",
  alternates: {
    canonical: "/cases/it/nextcup",
  },
  openGraph: {
    title: "NextCup | Freelance UA",
    description: "Оновлення застарілого інтернет-магазину на Хорошоп з новим дизайном, структурованим каталогом, фото-банерами та оптимізованим checkout. Результат: сайт готовий",
    images: ["https://freelance-ua.agency/media/cases/nextcup-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
