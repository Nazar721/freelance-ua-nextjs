import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Південь Солар | Freelance UA",
  description: "Конверсійний лендинг для компанії з монтажу СЕС з каталогом комплектів, галереєю робіт та адмін-панеллю. Щоденні заявки з таргетованої реклами.",
    alternates: {
    canonical: "/cases/it/pivden-solar",
  },
  openGraph: {
    title: "Південь Солар | Freelance UA",
    description: "Конверсійний лендинг для компанії з монтажу СЕС з каталогом комплектів, галереєю робіт та адмін-панеллю. Щоденні заявки з таргетованої реклами.",
    images: ["https://freelance-ua.agency/media/cases/pivdensolar-mocap-v2.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
