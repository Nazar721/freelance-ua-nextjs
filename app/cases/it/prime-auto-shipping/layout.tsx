import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prime Auto Shipping | Freelance UA",
  description: "Конверсійний лендинг для американської компанії з транспортування авто з миттєвою виценкою, GPS-трекінгом та FMCSA-верифікацією.",
  alternates: {
    canonical: "/cases/it/prime-auto-shipping",
  },
  openGraph: {
    title: "Prime Auto Shipping | Freelance UA",
    description: "Конверсійний лендинг для американської компанії з транспортування авто з миттєвою виценкою, GPS-трекінгом та FMCSA-верифікацією.",
    images: ["https://freelance-ua.agency/media/cases/prime-autoshipping-mockup.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
