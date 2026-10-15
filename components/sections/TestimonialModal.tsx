"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import gsap from "gsap";
import { useTranslation } from "@/lib/LanguageContext";

export default function TestimonialModal({
  children,
  name,
  originRect,
  reduced,
  opener,
  onClose,
}: {
  children: ReactNode;
  name: string;
  originRect: DOMRect | null;
  reduced: boolean;
  opener?: HTMLElement | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !wrapRef.current) return;
      const focusable = Array.from(
        wrapRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), audio[controls], video[controls]',
        ),
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      // Fully control Tab order inside the dialog — prevents the browser from
      // moving focus to the inert background (which is especially visible in
      // WebKit where video[controls] shadow focus behaves differently).
      e.preventDefault();
      const active = document.activeElement as HTMLElement | null;
      const idx = active ? focusable.indexOf(active) : -1;
      let nextIdx: number;
      if (e.shiftKey) {
        nextIdx = idx <= 0 ? focusable.length - 1 : idx - 1;
      } else {
        nextIdx = idx === -1 || idx >= focusable.length - 1 ? 0 : idx + 1;
      }
      focusable[nextIdx]?.focus();
    },
    // close is stable via closingRef, onClose is stable from parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
    const dialog = wrapRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    const isolated: Array<{ element: HTMLElement; inert: boolean; ariaHidden: string | null }> = [];
    let current: HTMLElement | null = dialog;
    while (current?.parentElement) {
      const parentEl: HTMLElement = current.parentElement as HTMLElement;
      for (const sibling of Array.from(parentEl.children)) {
        if (sibling === current || !(sibling instanceof HTMLElement)) continue;
        isolated.push({
          element: sibling,
          inert: (sibling as HTMLElement & { inert: boolean }).inert,
          ariaHidden: sibling.getAttribute("aria-hidden"),
        });
        (sibling as HTMLElement & { inert: boolean }).inert = true;
        sibling.setAttribute("aria-hidden", "true");
      }
      if (parentEl === document.body) break;
      current = parentEl;
    }

    // Prefer the explicit opener (the card's button) over document.activeElement,
    // which is <body> for mouse clicks on the card.
    const fallbackFocus =
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body &&
      document.activeElement !== document.documentElement
        ? document.activeElement
        : null;
    const restoreTarget = opener && opener.isConnected ? opener : fallbackFocus;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    // Move focus inside the dialog — the close button is the first focusable.
    // Use rAF so the portal is fully attached before focusing.
    const raf = requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      for (const { element, inert, ariaHidden } of isolated) {
        (element as HTMLElement & { inert: boolean }).inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      }
      // Restore focus to the opener after inert is cleared.
      if (restoreTarget && restoreTarget.isConnected) {
        // Defer one frame so the browser has removed inert.
        requestAnimationFrame(() => restoreTarget.focus());
      }
    };
  }, [handleKeyDown, opener]);

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
        ref={closeButtonRef}
        onClick={close}
        aria-label={t("testimonials.close")}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors cursor-pointer hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-6 md:top-6"
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

