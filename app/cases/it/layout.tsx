import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ІТ-розробка — Freelance UA",
  description: "Telegram-боти, веб-сайти, CRM-системи, інтернет-магазини та API-інтеграції. Портфоліо ІТ-проєктів агенції Freelance UA.",
  alternates: {
    canonical: "/cases/it",
  },
  openGraph: {
    title: "ІТ-розробка — Freelance UA",
    description: "Telegram-боти, веб-сайти, CRM-системи, інтернет-магазини та API-інтеграції.",
  },
};

export default function ITCasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
