"use client";

import { usePathname } from "next/navigation";
import KineticGrid from "@/components/ui/kinetic-grid";

/** Details own a grid with their lightbox pause state; the catalogue owns one here. */
export default function CasesBackdrop() {
  const pathname = usePathname() ?? "";
  const catalogue = pathname === "/cases" || pathname === "/en/cases";
  return catalogue ? <KineticGrid /> : null;
}
