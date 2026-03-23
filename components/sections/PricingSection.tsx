"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const pricingFactors = [
  "Складність та обсяг завдання",
  "Терміни виконання",
  "Кількість правок та ітерацій",
  "Унікальність і рівень кастомізації",
  "Технічні вимоги до проєкту",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Ціноутворення
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Кожен проєкт унікальний — ціна завжди індивідуальна
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#111118] border border-[#2A2A38] rounded-2xl p-8"
          >
            <h3 className="text-[#F8F8FF] font-bold text-xl mb-6">
              Що впливає на вартість
            </h3>
            <ul className="space-y-4">
              {pricingFactors.map((factor) => (
                <li key={factor} className="flex items-center gap-3 text-[#8B8B9E]">
                  <ChevronRight size={16} className="text-[#6366F1] flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 border border-[#6366F1]/30 rounded-2xl p-8 text-center"
          >
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-[#F8F8FF] font-bold text-2xl mb-4">
              Безкоштовна консультація
            </h3>
            <p className="text-[#8B8B9E] mb-8 leading-relaxed">
              Опишіть ваше завдання — ми оцінимо проєкт та запропонуємо
              оптимальне рішення за чесною ціною.
            </p>
            <a
              href={siteConfig.telegram.consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
            >
              Отримати оцінку
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
