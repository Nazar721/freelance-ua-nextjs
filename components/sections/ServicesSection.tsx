"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Video } from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={32} className="text-[#6366F1]" />,
  Palette: <Palette size={32} className="text-[#6366F1]" />,
  Video: <Video size={32} className="text-[#6366F1]" />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Наші послуги
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Три напрямки — один надійний партнер
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#111118] border border-[#2A2A38] hover:border-[#6366F1] rounded-2xl p-8 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-[#F8F8FF] font-bold text-xl mb-6">
                {service.category}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#8B8B9E] text-sm">
                    <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
