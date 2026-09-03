"use client";

import { useTranslation } from "@/lib/LanguageContext";

interface CaseDeveloperProps {
  labelKey?: string;
  nameKey: string;
}

export default function CaseDeveloper({ labelKey = "itCases.projectTeam", nameKey }: CaseDeveloperProps) {
  const { t } = useTranslation();

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-muted-foreground/60 mb-1">
          {t(labelKey)}
        </p>
        <p className="text-sm text-muted-foreground">
          {t(nameKey)}
        </p>
      </div>
    </section>
  );
}
