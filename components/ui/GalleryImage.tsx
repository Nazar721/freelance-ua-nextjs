"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";

interface GalleryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onOpen?: () => void;
}

export default function GalleryImage({
  src,
  alt,
  width = 1200,
  height = 800,
  className = "",
  onOpen,
}: GalleryImageProps) {
  return (
    <div className={`relative group/gallery ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-contain"
        draggable={false}
      />
      {onOpen && (
        <>
          {/* Mobile: always visible */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="md:hidden absolute bottom-3 right-3 z-10 w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 active:bg-black/70 transition-colors"
            aria-label="View full screen"
          >
            <Maximize2 size={18} className="text-white" />
          </button>
          {/* Desktop: visible on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="hidden md:flex absolute bottom-3 right-3 z-10 w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm items-center justify-center border border-white/20 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="View full screen"
          >
            <Maximize2 size={18} className="text-white" />
          </button>
        </>
      )}
    </div>
  );
}
