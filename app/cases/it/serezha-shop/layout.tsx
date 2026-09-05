import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serezha Shop | Freelance UA",
  description: "Конверсійний лендінг-каталог для продажу кросівок зі США з каталогом моделей, відгуками та прямим зв'язком через Telegram.",
    alternates: {
    canonical: "/cases/it/serezha-shop",
  },
  openGraph: {
    title: "Serezha Shop | Freelance UA",
    description: "Конверсійний лендінг-каталог для продажу кросівок зі США з каталогом моделей, відгуками та прямим зв'язком через Telegram.",
    images: ["https://freelance-ua.agency/media/cases/serezha-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
