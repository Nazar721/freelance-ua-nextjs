"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { brands } from "@/data/brands";

export default function TrustedBySection() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-16 px-4 bg-[#111118] border-y border-[#2A2A38] overflow-hidden">
      <div className="max-w-7xl mx-auto mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-[#8B8B9E] text-lg font-semibold uppercase tracking-widest"
        >
          Нам довіряють
        </motion.h2>
      </div>

      <div className="relative">
        <div className="flex animate-marquee gap-12 w-max">
          {doubled.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-none flex items-center justify-center w-32 h-16"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={60}
                className="object-contain grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
