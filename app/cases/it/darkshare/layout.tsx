import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DARKSHARE | Freelance UA",
  description: "SaaS-платформа для кібербезпеки з 17 OSINT-модулями, AI-скорингом, PDF-звітами, VPN, Telegram-ботом та REST API.",
  alternates: {
    canonical: "/cases/it/darkshare",
  },
  openGraph: {
    title: "DARKSHARE | Freelance UA",
    description: "SaaS-платформа для кібербезпеки з 17 OSINT-модулями, AI-скорингом, PDF-звітами, VPN, Telegram-ботом та REST API.",
    images: ["https://freelance-ua.agency/media/cases/darkshare-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
