"use client";

import { MessageSquare, Settings, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const steps = [
  {
    icon: MessageSquare,
    title: "Обговорення",
    description: "Пишете нам у Telegram — обговорюємо деталі, терміни та вартість. Без зайвих формальностей.",
  },
  {
    icon: Settings,
    title: "Виконання",
    description: "Беремось до роботи відразу. Регулярно надсилаємо проміжні результати та тримаємо вас у курсі.",
  },
  {
    icon: CheckCircle2,
    title: "Здача та правки",
    description: "Здаємо готовий результат. Вносимо правки безкоштовно до вашого повного задоволення.",
  },
];

export default function HowWeWorkSection() {
  return (
    <section id="process" className="py-20 px-4 bg-[#111118]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Як ми працюємо
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Три простих кроки до вашого результату
          </p>
        </FadeIn>

        <div className="relative">
          <div className="hidden md:block absolute top-15 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-linear-to-r from-transparent via-[#6366F1] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.15} className="relative text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-[#1A1A24] border-2 border-[#6366F1] rounded-full flex items-center justify-center relative z-10">
                    <step.icon size={28} className="text-[#6366F1]" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-[#6366F1] text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center z-20">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-[#F8F8FF] font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-[#8B8B9E] text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
