"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";

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
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Ціноутворення
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Кожен проєкт унікальний — ціна завжди індивідуальна
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <FadeIn delay={0.1} className="premium-surface bg-[#111118] border border-[#2A2A38] rounded-2xl p-8">
            <h3 className="text-[#F8F8FF] font-bold text-xl mb-6">
              Що впливає на вартість
            </h3>
            <ul className="space-y-4">
              {pricingFactors.map((factor) => (
                <li key={factor} className="group flex items-center gap-3 text-[#8B8B9E] transition-colors duration-300 hover:text-[#F8F8FF]">
                  <ChevronRight size={16} className="text-[#6366F1] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  {factor}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2} className="premium-surface bg-linear-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 border border-[#6366F1]/30 rounded-2xl p-8 text-center">
            <div className="premium-icon mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6366F1]/10 text-4xl mb-4">💬</div>
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
              className="magnetic-button inline-flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_44px_rgba(99,102,241,0.42)]"
            >
              Отримати оцінку
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
