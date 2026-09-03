import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asandra Soul | Freelance UA",
  description: "Telegram Mini App + Backend для автоматизації продажу курсів та практик з персоналізованим досвідом для кожного користувача.",
  alternates: {
    canonical: "/cases/it/asandra-soul",
  },
  openGraph: {
    title: "Asandra Soul | Freelance UA",
    description: "Telegram Mini App + Backend для автоматизації продажу курсів та практик з персоналізованим досвідом для кожного користувача.",
    images: ["https://freelance-ua.agency/media/cases/asandraapp-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
