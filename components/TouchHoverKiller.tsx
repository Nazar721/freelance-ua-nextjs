"use client";
import { useDisableHoverOnTouch } from "@/hooks/useDisableHoverOnTouch";

export function TouchHoverKiller() {
  useDisableHoverOnTouch();
  return null;
}
