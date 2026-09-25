"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type ImageModalProps = {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title: string;
};

export function ImageModal({ images, currentIndex, isOpen, onClose, onPrev, onNext, title }: ImageModalProps) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (images.length > 1 && e.key === "ArrowLeft") onPrev();
      if (images.length > 1 && e.key === "ArrowRight") onNext();

      if (e.key === "Tab" && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex='-1'])",
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first) {
          e.preventDefault();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [images.length, onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const isolatedElements: Array<{
      element: HTMLElement;
      inert: boolean;
      ariaHidden: string | null;
    }> = [];
    let current: HTMLElement = modalRef.current;

    while (current.parentElement) {
      const parent = current.parentElement;
      for (const sibling of Array.from(parent.children)) {
        if (sibling === current || !(sibling instanceof HTMLElement)) continue;
        isolatedElements.push({
          element: sibling,
          inert: sibling.inert,
          ariaHidden: sibling.getAttribute("aria-hidden"),
        });
        sibling.inert = true;
        sibling.setAttribute("aria-hidden", "true");
      }
      if (parent === document.body) break;
      current = parent;
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      for (const { element, inert, ariaHidden } of isolatedElements) {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      }
      previousFocus?.focus();
    };
  }, [isOpen, handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close"
        >
          <X size={24} className="text-white" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </>
        )}

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={images[currentIndex]}
              alt={`${title} - ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              draggable={false}
            />
          </div>
          <div className="mt-4 text-center text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
