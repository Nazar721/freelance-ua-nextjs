"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    { label: "IT", icon: "code" },
    { label: "Design", icon: "design" },
    { label: "Video", icon: "video" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 900);

    const timer = setTimeout(() => setShow(false), 2800);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [services.length]);

  const CodeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );

  const DesignIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );

  const VideoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );

  const icons = {
    code: CodeIcon,
    design: DesignIcon,
    video: VideoIcon,
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0F]"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[120px]" />
          </div>

          {/* Services icons row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6 md:gap-8 mb-8"
          >
            {services.map((service, i) => {
              const Icon = icons[service.icon as keyof typeof icons];
              const isActive = i === activeIndex;

              return (
                <motion.div
                  key={service.label}
                  className="flex flex-col items-center gap-2"
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#6366F1]/20 text-[#6366F1] shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        : "bg-[#1A1A24] text-[#8B8B9E]"
                    }`}
                  >
                    <Icon />
                  </div>
                  <span
                    className={`text-[10px] md:text-xs font-medium transition-all duration-300 ${
                      isActive ? "text-[#6366F1]" : "text-[#8B8B9E]/50"
                    }`}
                  >
                    {service.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-lg md:text-xl font-bold text-[#F8F8FF] tracking-tight">
              Freelance <span className="text-[#6366F1]">UA</span>
            </h1>
          </motion.div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-1.5 mt-6"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-[#6366F1]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
