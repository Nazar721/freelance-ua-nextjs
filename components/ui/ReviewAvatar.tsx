"use client";

import ReactNiceAvatar from "react-nice-avatar";
import Image from "next/image";
import { getAvatarConfig } from "@/lib/getAvatarConfig";

type ReviewAvatarProps = {
  name: string;
  size?: number;
  className?: string;
  imageSrc?: string;
};

export default function ReviewAvatar({ name, size = 40, className = "", imageSrc }: ReviewAvatarProps) {
  const config = getAvatarConfig(name);

  return (
    <div
      className={`shrink-0 rounded-full overflow-hidden border-2 border-white/10 ${className}`}
      style={{ width: size, height: size }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      ) : (
        <ReactNiceAvatar {...config} shape="circle" style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
}
