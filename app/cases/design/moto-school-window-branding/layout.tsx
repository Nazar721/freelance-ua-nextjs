import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мотошкола — оформлення вітрин | Freelance UA",
  description:
    "Панорамний дизайн під друк для брендування вікон мотошколи — від макета до реалізації на локації.",
  alternates: {
    canonical: "/cases/design/moto-school-window-branding",
  },
  openGraph: {
    title: "Мотошкола — оформлення вітрин | Freelance UA",
    description:
      "Панорамний дизайн під друк для брендування вікон мотошколи — від макета до реалізації на локації.",
    images: [
      "https://freelance-ua.agency/media/cases/moto-school-window-branding/moto-school-artwork.webp",
    ],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
