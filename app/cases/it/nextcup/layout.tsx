import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextCup | Freelance UA",
  description: "Оновлення інтернет-магазину на Хорошоп з новим дизайном, каталогом, банерами та швидким checkout. Результат: зростання конверсії.",
    alternates: {
    canonical: "/cases/it/nextcup",
  },
  openGraph: {
    title: "NextCup | Freelance UA",
    description: "Оновлення інтернет-магазину на Хорошоп з новим дизайном, каталогом, банерами та швидким checkout. Результат: зростання конверсії.",
    images: ["https://freelance-ua.agency/media/cases/nextcup-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
