"use client";

import Image from "next/image";

interface LaptopMockupProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function LaptopMockup({ src, alt, className = "" }: LaptopMockupProps) {
  return (
    <div className={`relative ${className}`} style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.7))" }}>
      {/* Lid / screen */}
      <div className="relative" style={{ aspectRatio: "16/10.5" }}>
        {/* Outer shell */}
        <div
          className="absolute inset-0 rounded-t-2xl"
          style={{
            background: "linear-gradient(180deg, #1e1e2e 0%, #16162a 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "none",
          }}
        >
          {/* Inner bezel */}
          <div className="absolute inset-[4%] rounded-lg bg-[#050510] overflow-hidden">
            {src && (
              <Image
                src={src}
                alt={alt || ""}
                fill
                className="object-cover object-top"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                priority
              />
            )}
            {/* Subtle screen glare */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(165deg, rgba(255,255,255,0.07) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.02) 100%)",
              }}
            />
          </div>
          {/* Camera */}
          <div className="absolute top-[1.4%] left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0d0d1a] border border-[#1e1e2e]" />
          </div>
        </div>
      </div>

      {/* Base / keyboard deck */}
      <div className="relative" style={{ marginTop: "-1px" }}>
        {/* Hinge */}
        <div
          className="mx-[3%] h-[6px] rounded-b-sm"
          style={{
            background: "linear-gradient(180deg, #2a2a40 0%, #1a1a30 100%)",
            boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.5)",
          }}
        />
        {/* Keyboard area */}
        <div
          style={{
            height: "clamp(16px, 4%, 32px)",
            background: "linear-gradient(180deg, #1e1e32 0%, #16162a 60%, #121224 100%)",
            borderRadius: "0 0 14px 14px",
            border: "1px solid rgba(255,255,255,0.05)",
            borderTop: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Trackpad notch */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-md"
            style={{
              width: "20%",
              height: "45%",
              background: "#1a1a30",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
