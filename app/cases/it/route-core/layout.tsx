import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RouteCore | Freelance UA",
  description: "Рекрутинговий лендинг для найму BAS & ZennoPoster інженерів з чіткою позицією, перевагами, вимогами, умовами та 4-етапним процесом відбору. Мультимовність",
  alternates: {
    canonical: "/cases/it/route-core",
  },
  openGraph: {
    title: "RouteCore | Freelance UA",
    description: "Рекрутинговий лендинг для найму BAS & ZennoPoster інженерів з чіткою позицією, перевагами, вимогами, умовами та 4-етапним процесом відбору. Мультимовність",
    images: ["https://freelance-ua.agency/media/cases/routecore-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
