"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/LanguageContext";

export default function CaseBackLink({ href }: { href: string }) {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
      >
        <ArrowLeft size={16} />
        {t("itCases.backToList")}
      </Link>
    </div>
  );
}
