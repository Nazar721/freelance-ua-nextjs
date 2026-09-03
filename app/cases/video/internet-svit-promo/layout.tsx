import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Промо для Інтернет Світ | Freelance UA",
  description: "Моушн-промо для Інтернет Світ — яскравий та динамічний візуал",
  alternates: {
    canonical: "/cases/video/internet-svit-promo",
  },
  openGraph: {
    title: "Промо для Інтернет Світ | Freelance UA",
    description: "Моушн-промо для Інтернет Світ — яскравий та динамічний візуал",
    images: ["https://freelance-ua.agency/media/cases/internet-svit-promo/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
