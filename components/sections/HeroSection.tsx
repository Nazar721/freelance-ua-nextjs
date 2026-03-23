"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-[#1A1A24] border border-[#2A2A38] rounded-full px-4 py-2 mb-8 text-sm text-[#8B8B9E]">
            <Zap size={14} className="text-[#6366F1]" />
            Фрілансери, яким довіряють бізнеси
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-[#F8F8FF]">Ваш цифровий</span>
          <br />
          <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
            бізнес-партнер
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#8B8B9E] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          ІТ-розробка, графічний дизайн та відеомонтаж — все в одному місці.
          Якість без переплат, дедлайни без затримок.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={siteConfig.telegram.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] text-base"
          >
            Обговорити проєкт
            <ArrowRight size={18} />
          </a>
          <a
            href={siteConfig.telegram.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#2A2A38] hover:border-[#6366F1] text-[#F8F8FF] font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base"
          >
            Дивитись кейси
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center [@media(max-height:813px)]:mb-12"
        >
          {[
            { value: "50+", label: "Завершених проєктів" },
            { value: "100%", label: "Задоволених клієнтів" },
            { value: "3", label: "Напрямки роботи" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-[#6366F1]">
                {stat.value}
              </div>
              <div className="text-sm text-[#8B8B9E] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
