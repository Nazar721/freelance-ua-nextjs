import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stretching.ch | Freelance UA",
  description: "Instagram DM бот для фітнес-тренерки: автоматичні відповіді на ключові слова, лідогенерація та конверсія в клієнтів.",
  alternates: {
    canonical: "/cases/it/stretching-ch",
  },
  openGraph: {
    title: "Stretching.ch | Freelance UA",
    description: "Instagram DM бот для фітнес-тренерки: автоматичні відповіді на ключові слова, лідогенерація та конверсія в клієнтів.",
    images: ["https://freelance-ua.agency/media/cases/stretching-ch-mocap.png"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
