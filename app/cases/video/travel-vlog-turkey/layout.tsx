import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Vlog — Туреччина | Freelance UA",
  description: "YouTube travel vlog з сімейного відпочинку в Туреччині — аерозйомка, водні гірки, атмосфера курорту",
  alternates: {
    canonical: "/cases/video/travel-vlog-turkey",
  },
  openGraph: {
    title: "Travel Vlog — Туреччина | Freelance UA",
    description: "YouTube travel vlog з сімейного відпочинку в Туреччині — аерозйомка, водні гірки, атмосфера курорту",
    images: ["https://freelance-ua.agency/media/cases/travel-vlog-turkey/screen-1.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
