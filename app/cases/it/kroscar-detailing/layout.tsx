import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KROSCAR Detailing | Freelance UA",
  description: "Лендінг для детейлінг-студії KROSCAR (Львів) з записом онлайн, галереєю робіт, слайдером «до/після» та системою відгуків Google.",
  alternates: {
    canonical: "/cases/it/kroscar-detailing",
  },
  openGraph: {
    title: "KROSCAR Detailing | Freelance UA",
    description: "Лендінг для детейлінг-студії KROSCAR (Львів) з записом онлайн, галереєю робіт, слайдером «до/після» та системою відгуків Google.",
    images: ["https://freelance-ua.agency/media/cases/kroscar-detailing-mocap.png"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
