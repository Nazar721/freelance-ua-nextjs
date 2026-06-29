"use client";

import { Code2, Palette, Video } from "lucide-react";
import { services } from "@/data/services";
import { FadeIn } from "@/components/ui/FadeIn";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={32} className="text-[#6366F1]" />,
  Palette: <Palette size={32} className="text-[#6366F1]" />,
  Video: <Video size={32} className="text-[#6366F1]" />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Наші послуги
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Три напрямки — один надійний партнер
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <FadeIn
              key={service.category}
              delay={index * 0.1}
              className="premium-surface bg-[#111118] border border-[#2A2A38] rounded-2xl p-8"
            >
              <div className="premium-icon w-16 h-16 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-[#F8F8FF] font-bold text-xl mb-6">
                {service.category}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="group flex items-center gap-3 text-[#8B8B9E] text-sm transition-colors duration-300 hover:text-[#F8F8FF]">
                    <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full shrink-0 transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_14px_rgba(99,102,241,0.75)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
