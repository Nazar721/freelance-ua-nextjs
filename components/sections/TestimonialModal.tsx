"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import gsap from "gsap";
import { useTranslation } from "@/lib/LanguageContext";

export default function TestimonialModal({
  children,
  name,
  originRect,
  reduced,
  onClose,
}: {
  children: ReactNode;
  name: string;
  originRect: DOMRect | null;
  reduced: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    const el = contentRef.current;
    const wrap = wrapRef.current;
    if (reduced || !el || !wrap) {
      onClose();
      return;
    }

    gsap.to(wrap, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
    if (originRect) {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: originRect.left + originRect.width / 2 - (r.left + r.width / 2),
        y: originRect.top + originRect.height / 2 - (r.top + r.height / 2),
        scaleX: Math.max(originRect.width / r.width, 0.05),
        scaleY: Math.max(originRect.height / r.height, 0.05),
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: onClose,
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        y: 24,
        scale: 0.94,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    }
  };

  useLayoutEffect(() => {
    const el = contentRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap || reduced) return;

    gsap.fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    if (originRect) {
      const r = el.getBoundingClientRect();
      gsap.fromTo(
        el,
        {
          x: originRect.left + originRect.width / 2 - (r.left + r.width / 2),
          y: originRect.top + originRect.height / 2 - (r.top + r.height / 2),
          scaleX: Math.max(originRect.width / r.width, 0.05),
          scaleY: Math.max(originRect.height / r.height, 0.05),
        },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.55, ease: "power3.out" }
      );
    } else {
      gsap.from(el, { opacity: 0, y: 30, scale: 0.94, duration: 0.45, ease: "power3.out" });
    }

    return () => {
      gsap.killTweensOf([el, wrap]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      ref={wrapRef}
      role="dialog"
      aria-modal="true"
      aria-label={name}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
      onClick={close}
    >
      <button
        onClick={close}
        aria-label={t("testimonials.close")}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors cursor-pointer hover:bg-white/20 md:right-6 md:top-6"
      >
        <X size={20} className="text-white" />
      </button>

      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90svh] w-[min(94vw,860px)] overflow-y-auto rounded-3xl border border-border bg-surface p-5 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-8"
        data-lenis-prevent
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

