"use client";

import Image from "next/image";

interface DeviceMockupProps {
  laptopScreen: string;
  phoneScreen: string;
  laptopAlt?: string;
  phoneAlt?: string;
  className?: string;
}

export default function DeviceMockup({
  laptopScreen,
  phoneScreen,
  laptopAlt = "",
  phoneAlt = "",
  className = "",
}: DeviceMockupProps) {
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: "1/1" }}>
      {/* Device frame as base */}
      <Image
        src="/media/cases/device-frame.webp"
        alt=""
        fill
        className="object-contain pointer-events-none"
        draggable={false}
        priority
      />

      {/* Laptop screen */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: "14.2%",
          top: "19%",
          width: "56.1%",
          height: "43.5%",
          borderRadius: "6px",
          zIndex: 1,
        }}
      >
        <Image
          src={laptopScreen}
          alt={laptopAlt}
          fill
          className="object-cover"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          priority
        />
      </div>

      {/* Phone screen — z-index higher so it overlaps laptop */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: "68.4%",
          top: "21.5%",
          width: "16.6%",
          height: "47.8%",
          borderRadius: "20px",
          zIndex: 2,
        }}
      >
        <Image
          src={phoneScreen}
          alt={phoneAlt}
          fill
          className="object-cover"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          priority
        />
      </div>
    </div>
  );
}
