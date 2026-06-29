"use client";

import { CheckCircle, Clock, Shield, Sparkles, Users, Zap, Award } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const advantages = [
  {
    icon: Clock,
    title: "Дедлайни без затримок",
    description: "Виконуємо проєкти вчасно. Завжди повідомляємо про статус роботи.",
  },
  {
    icon: Shield,
    title: "Гарантія якості",
    description: "Надаємо правки після здачі. Ваш результат — наша відповідальність.",
  },
  {
    icon: Zap,
    title: "Швидкий старт",
    description: "Беремось за роботу відразу після узгодження. Без зайвих формальностей.",
  },
  {
    icon: Users,
    title: "Індивідуальний підхід",
    description: "Кожен проєкт — унікальний. Розробляємо рішення під ваші потреби.",
  },
  {
    icon: Sparkles,
    title: "Преміум якість",
    description: "Використовуємо найкращі інструменти та слідкуємо за трендами.",
  },
  {
    icon: CheckCircle,
    title: "Прозора комунікація",
    description: "Завжди на зв'язку. Регулярно звітуємо про прогрес роботи.",
  },
  {
    icon: Award,
    title: "Досвідчена команда",
    description: "Фахівці з реальним досвідом та портфоліо успішних проєктів.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="about" className="py-20 px-4 bg-[#111118]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Чому обирають нас
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Ми не просто виконавці — ми партнери, яким важливий ваш результат
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {advantages.map((item, i) => (
            <FadeIn
              key={item.title}
              delay={i * 0.06}
              className="premium-surface bg-[#1A1A24] border border-[#2A2A38] rounded-2xl p-6 cursor-default"
            >
              <div className="premium-icon w-12 h-12 bg-[#6366F1]/10 rounded-xl flex items-center justify-center mb-4">
                <item.icon size={24} className="text-[#6366F1]" />
              </div>
              <h3 className="text-[#F8F8FF] font-semibold text-base mb-2">
                {item.title}
              </h3>
              <p className="text-[#8B8B9E] text-sm leading-relaxed">
                {item.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
