import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M+D Dental | Freelance UA",
  description: "Сайт для двох стоматологічних клінік у Сумах: 23 послуги, команда лікарів з фото, онлайн-запис, довіра зі страховими компаніями та FAQ.",
    alternates: {
    canonical: "/cases/it/md-dental",
  },
  openGraph: {
    title: "M+D Dental | Freelance UA",
    description: "Сайт для двох стоматологічних клінік у Сумах: 23 послуги, команда лікарів з фото, онлайн-запис, довіра зі страховими компаніями та FAQ.",
    images: ["https://freelance-ua.agency/media/cases/mddental-mocap.webp?v=2"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
