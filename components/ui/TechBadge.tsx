"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const techBadgeVariants = cva(
  "inline-flex items-center gap-2 font-semibold transition-all duration-300",
  {
    variants: {
      variant: {
        landing:
          "bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 text-[#A78BFA] border border-[#6366F1]/30",
        ecommerce:
          "bg-gradient-to-r from-[#22C55E]/20 to-[#10B981]/20 text-[#4ADE80] border border-[#22C55E]/30",
        saas:
          "bg-gradient-to-r from-[#06B6D4]/20 to-[#0891B2]/20 text-[#22D3EE] border border-[#06B6D4]/30",
        telegram:
          "bg-gradient-to-r from-[#3B82F6]/20 to-[#2563EB]/20 text-[#60A5FA] border border-[#3B82F6]/30",
        crm:
          "bg-gradient-to-r from-[#F59E0B]/20 to-[#D97706]/20 text-[#FBBF24] border border-[#F59E0B]/30",
        admin:
          "bg-gradient-to-r from-[#EF4444]/20 to-[#DC2626]/20 text-[#F87171] border border-[#EF4444]/30",
        api:
          "bg-gradient-to-r from-[#8B5CF6]/20 to-[#7C3AED]/20 text-[#A78BFA] border border-[#8B5CF6]/30",
        bot:
          "bg-gradient-to-r from-[#EC4899]/20 to-[#DB2777]/20 text-[#F472B6] border border-[#EC4899]/30",
        dashboard:
          "bg-gradient-to-r from-[#14B8A6]/20 to-[#0D9488]/20 text-[#2DD4BF] border border-[#14B8A6]/30",
        mobile:
          "bg-gradient-to-r from-[#F97316]/20 to-[#EA580C]/20 text-[#FB923C] border border-[#F97316]/30",
        default:
          "bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 text-[#A78BFA] border border-[#6366F1]/30",
      },
      size: {
        sm: "text-xs px-2.5 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        glow: "tech-badge-glow",
        float: "tech-badge-float",
        shimmer: "tech-badge-shimmer",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "none",
    },
  }
);

export interface TechBadgeProps
  extends Omit<
      React.HTMLAttributes<HTMLSpanElement>,
      "size" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
    >,
    VariantProps<typeof techBadgeVariants> {
  children: ReactNode;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export default function TechBadge({
  children,
  variant,
  size,
  animation,
  icon,
  iconRight,
  className,
  ...props
}: TechBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        techBadgeVariants({ variant, size, animation }),
        "rounded-full",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </motion.span>
  );
}
