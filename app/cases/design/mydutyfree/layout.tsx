import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyDutyFree | Freelance UA",
  description: "Промо-банер із фірмовим 3D-персонажем для сервісу MyDutyFree — покупки в Duty Free на кордоні з вигодою.",
  alternates: {
    canonical: "/cases/design/mydutyfree",
  },
  openGraph: {
    title: "MyDutyFree | Freelance UA",
    description: "Промо-банер із фірмовим 3D-персонажем для сервісу MyDutyFree — покупки в Duty Free на кордоні з вигодою.",
    images: ["https://freelance-ua.agency/media/cases/mydutyfree/mydutyfree-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
