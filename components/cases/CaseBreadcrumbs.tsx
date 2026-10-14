"use client";

import Link from "next/link";
import type { CaseBreadcrumbItem } from "@/lib/case-breadcrumbs";

/** Visible «Головна → напрям → кейс» chain. Localized labels and targets come
 *  from lib/case-breadcrumbs.ts, the same list the JSON-LD is built from. */
export default function CaseBreadcrumbs({
  items,
  label,
}: {
  items: CaseBreadcrumbItem[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-muted-foreground/50">
                →
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="whitespace-nowrap transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground truncate max-w-[60vw] md:max-w-md">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
