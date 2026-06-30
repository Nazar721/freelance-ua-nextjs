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
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-ambient absolute inset-0 opacity-80" />
        <div className="luxury-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#0A0A0F] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-[#1A1A24]/80 border border-[#2A2A38] rounded-full px-4 py-2 mb-8 text-sm text-[#8B8B9E] shadow-[0_0_40px_rgba(99,102,241,0.12)] backdrop-blur-md">
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
          <span className="gradient-text-motion bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
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
            className="magnetic-button inline-flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_48px_rgba(99,102,241,0.46)] text-base"
          >
            Обговорити проєкт
            <ArrowRight size={18} />
          </a>
          <a
            href={siteConfig.telegram.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button inline-flex items-center justify-center gap-2 bg-[#111118]/50 border border-[#2A2A38] hover:border-[#6366F1] text-[#F8F8FF] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(99,102,241,0.16)] text-base backdrop-blur-md"
          >
            Дивитись кейси
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 grid grid-cols-3 gap-2 text-center sm:mt-16 sm:flex sm:flex-wrap sm:justify-center sm:gap-8 [@media(max-height:813px)]:mb-12"
        >
          {[
            { value: "90+", label: "Завершених проєктів" },
            { value: "100%", label: "Задоволених клієнтів" },
            { value: "3", label: "Напрямки роботи" },
          ].map((stat) => (
            <div key={stat.label} className="premium-surface rounded-xl border border-[#2A2A38]/70 bg-[#111118]/40 px-2.5 py-3 backdrop-blur-md sm:rounded-2xl sm:px-5 sm:py-4">
              <div className="text-2xl font-bold text-[#6366F1] sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] leading-tight text-[#8B8B9E] sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
