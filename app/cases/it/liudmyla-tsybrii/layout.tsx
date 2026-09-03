import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liudmyla Tsybrii | Freelance UA",
  description: "Преміальний сайт-портфоліо для бізнес-коуча з 4 послугами, портфоліо 3 кейсів та мультимовністю (UA/EN). Розроблено за 2 дні.",
  alternates: {
    canonical: "/cases/it/liudmyla-tsybrii",
  },
  openGraph: {
    title: "Liudmyla Tsybrii | Freelance UA",
    description: "Преміальний сайт-портфоліо для бізнес-коуча з 4 послугами, портфоліо 3 кейсів та мультимовністю (UA/EN). Розроблено за 2 дні.",
    images: ["https://freelance-ua.agency/media/cases/liudmyla-mocap-v2.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
