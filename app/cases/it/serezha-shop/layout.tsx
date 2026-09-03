import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serezha Shop | Freelance UA",
  description: "Конверсійний лендінг-каталог для продажу оригінальних кросівок зі США з каталогом 5 моделей, соціальним доказом (4.9⭐, 100+ замовлень) та прямим Telegram",
  alternates: {
    canonical: "/cases/it/serezha-shop",
  },
  openGraph: {
    title: "Serezha Shop | Freelance UA",
    description: "Конверсійний лендінг-каталог для продажу оригінальних кросівок зі США з каталогом 5 моделей, соціальним доказом (4.9⭐, 100+ замовлень) та прямим Telegram",
    images: ["https://freelance-ua.agency/media/cases/serezha-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
