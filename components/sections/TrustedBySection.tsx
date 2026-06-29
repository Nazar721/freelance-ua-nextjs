"use client";

import Image from "next/image";
import { brands } from "@/data/brands";
import { FadeIn } from "@/components/ui/FadeIn";

export default function TrustedBySection() {
  const featuredBrands = brands.slice(0, 8);
  const doubled = [...featuredBrands, ...featuredBrands];

  return (
    <section className="trusted-shell px-4 py-16">
      <div className="relative z-10 mx-auto max-w-3xl">
        <FadeIn className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-[#F8F8FF] sm:text-3xl md:text-4xl">
            <span className="text-[#6366F1]">Нам довіряють</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.12} className="trusted-partners mt-7">
          <div className="trusted-partners__track animate-trusted-reference">
            {doubled.map((brand, index) => (
              <Image
                key={`${brand.name}-${index}`}
                src={brand.logo}
                alt={brand.name}
                width={180}
                height={70}
                className="trusted-partners__logo"
                style={{ width: "auto", height: "34px" }}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
