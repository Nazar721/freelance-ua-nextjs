import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels для автосервісу Twin-A-Auto | Freelance UA",
  description:
    "Динамічний польськомовний Reels про послуги автосервісу Twin-A-Auto в Мисловіці — монтаж, адаптація під Instagram 9:16",
  alternates: {
    canonical: "/cases/video/twin-a-auto",
  },
  openGraph: {
    title: "Reels для автосервісу Twin-A-Auto | Freelance UA",
    description:
      "Динамічний польськомовний Reels про послуги автосервісу Twin-A-Auto в Мисловіці — монтаж, адаптація під Instagram 9:16",
    images: ["https://freelance-ua.agency/media/cases/twin-a-auto/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
