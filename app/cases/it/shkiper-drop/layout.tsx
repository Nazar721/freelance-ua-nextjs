import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shkiper Drop | Freelance UA",
  description: "Лендінг-каталог для streetwear дроп-магазину з dark-дизайном, каталогом на 5 категорій, анімаціями та Telegram-конверсією.",
  alternates: {
    canonical: "/cases/it/shkiper-drop",
  },
  openGraph: {
    title: "Shkiper Drop | Freelance UA",
    description: "Лендінг-каталог для streetwear дроп-магазину з dark-дизайном, каталогом на 5 категорій, анімаціями та Telegram-конверсією.",
    images: ["https://freelance-ua.agency/media/cases/shkiper-drop-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
