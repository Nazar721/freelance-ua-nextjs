import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MNM Detailing | Freelance UA",
  description: "Редизайн сайту детейлінг-студії з 10+ послугами, галереєю з фільтрами, акцентом на довіру та слайдером «до/після».",
  alternates: {
    canonical: "/cases/it/mnm-detailing",
  },
  openGraph: {
    title: "MNM Detailing | Freelance UA",
    description: "Редизайн сайту детейлінг-студії з 10+ послугами, галереєю з фільтрами, акцентом на довіру та слайдером «до/після».",
    images: ["https://freelance-ua.agency/media/cases/mnm-detailing-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
