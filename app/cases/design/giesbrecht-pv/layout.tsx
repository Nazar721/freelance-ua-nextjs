import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giesbrecht PV | Freelance UA",
  description: "Рекламний банер сонячних електростанцій для німецькомовного ринку — переваги, технічні характеристики та заклик до дії.",
  alternates: {
    canonical: "/cases/design/giesbrecht-pv",
  },
  openGraph: {
    title: "Giesbrecht PV | Freelance UA",
    description: "Рекламний банер сонячних електростанцій для німецькомовного ринку — переваги, технічні характеристики та заклик до дії.",
    images: ["https://freelance-ua.agency/media/cases/giesbrecht-pv/giesbrecht-pv-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
