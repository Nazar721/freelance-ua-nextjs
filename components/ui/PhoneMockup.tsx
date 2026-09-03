"use client";

import Image from "next/image";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function PhoneMockup({ src, alt, className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`} style={{ filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.7))" }}>
      {/* Phone body */}
      <div
        className="relative rounded-[2.4rem] overflow-hidden"
        style={{
          aspectRatio: "9/19.8",
          background: "linear-gradient(180deg, #2a2a40 0%, #1a1a30 100%)",
          border: "1.5px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute top-[2.8%] left-1/2 -translate-x-1/2 z-20 rounded-full"
          style={{
            width: "26%",
            height: "2.8%",
            background: "#050510",
            boxShadow: "0 0 6px rgba(0,0,0,0.6)",
          }}
        />

        {/* Screen */}
        <div className="absolute inset-[2.2%] rounded-[2rem] bg-[#050510] overflow-hidden">
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
          {/* Screen glare */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.02) 100%)",
            }}
          />
        </div>

        {/* Right side button */}
        <div
          className="absolute right-[-0.5px] rounded-r"
          style={{ top: "22%", width: "2px", height: "6%", background: "rgba(255,255,255,0.08)" }}
        />
        {/* Left volume buttons */}
        <div
          className="absolute left-[-0.5px] rounded-l"
          style={{ top: "18%", width: "2px", height: "4%", background: "rgba(255,255,255,0.06)" }}
        />
        <div
          className="absolute left-[-0.5px] rounded-l"
          style={{ top: "24%", width: "2px", height: "4%", background: "rgba(255,255,255,0.06)" }}
        />
      </div>
    </div>
  );
}
