"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { AlertTriangle, Lightbulb } from "lucide-react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

interface CaseChallengeSolutionProps {
  challengeTitle?: string;
  challengeText: string;
  solutionTitle?: string;
  solutionText: string;
  challengeIcon?: React.ReactNode;
  solutionIcon?: React.ReactNode;
  challengeAccent?: string;
  solutionAccent?: string;
}

export default function CaseChallengeSolution({
  challengeTitle,
  challengeText,
  solutionTitle,
  solutionText,
  challengeIcon,
  solutionIcon,
  challengeAccent = "red",
  solutionAccent = "green",
}: CaseChallengeSolutionProps) {
  const accentMap: Record<string, { border: string; shadow: string; hoverBorder: string; iconColor: string }> = {
    red: {
      border: "border-red-500/25",
      shadow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.1)]",
      hoverBorder: "hover:border-red-500/50",
      iconColor: "text-red-500",
    },
    green: {
      border: "border-green-500/25",
      shadow: "hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]",
      hoverBorder: "hover:border-green-500/50",
      iconColor: "text-green-500",
    },
    purple: {
      border: "border-purple-500/25",
      shadow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]",
      hoverBorder: "hover:border-purple-500/50",
      iconColor: "text-purple-500",
    },
  };

  const ca = accentMap[challengeAccent] || accentMap.red;
  const sa = accentMap[solutionAccent] || accentMap.green;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`bg-surface-elevated/40 border ${ca.border} rounded-2xl p-8 transition-all duration-300 ${ca.shadow} ${ca.hoverBorder}`}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-4">
              {challengeIcon || <AlertTriangle size={20} className={`${ca.iconColor} shrink-0`} />}
              {challengeTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {challengeText}
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`bg-surface-elevated/40 border ${sa.border} rounded-2xl p-8 transition-all duration-300 ${sa.shadow} ${sa.hoverBorder}`}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-4">
              {solutionIcon || <Lightbulb size={20} className={`${sa.iconColor} shrink-0`} />}
              {solutionTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {solutionText}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
