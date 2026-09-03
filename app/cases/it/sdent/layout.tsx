import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S-Dent | Freelance UA",
  description: "Редизайн сайту стоматологічної клініки з 14 послугами, командою 8 лікарів, акцентом на довіру (11+ років, 127+ відгуків, 4.9⭐) та слайдером «до/після».",
  alternates: {
    canonical: "/cases/it/sdent",
  },
  openGraph: {
    title: "S-Dent | Freelance UA",
    description: "Редизайн сайту стоматологічної клініки з 14 послугами, командою 8 лікарів, акцентом на довіру (11+ років, 127+ відгуків, 4.9⭐) та слайдером «до/після».",
    images: ["https://freelance-ua.agency/media/cases/sdent-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
