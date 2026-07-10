"use client";

import { useRef, useCallback, type MouseEvent } from "react";
import { Code2, Palette, Video } from "lucide-react";
import { services } from "@/data/services";
import { FadeIn } from "@/components/ui/FadeIn";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={32} className="text-[#6366F1]" />,
  Palette: <Palette size={32} className="text-[#6366F1]" />,
  Video: <Video size={32} className="text-[#6366F1]" />,
};

function ServiceCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mouse-x", `${x * 100}%`);
    el.style.setProperty("--mouse-y", `${y * 100}%`);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      style={{
        transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease, border-color 400ms ease",
      }}
    >
      {children}
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
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
              delay={0.15 + index * 0.12}
              y={50}
              rotateX={8}
              blur={6}
            >
              <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 h-full group">
                <div className="premium-icon w-16 h-16 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#6366F1]/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-[#F8F8FF] font-bold text-xl mb-6">
                  {service.category}
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, j) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-3 text-[#8B8B9E] text-sm transition-all duration-300 hover:text-[#F8F8FF] hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_14px_rgba(99,102,241,0.75)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ServiceCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
