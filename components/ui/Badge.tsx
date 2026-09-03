"use client";

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-semibold transition-all duration-300 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-surface-elevated/60 text-muted-foreground border border-border backdrop-blur-sm",
        solid:
          "bg-accent text-primary-foreground border border-accent/30",
        outline:
          "bg-transparent text-foreground border border-foreground/20",
        ghost:
          "bg-foreground/5 text-foreground border border-transparent",
        gradient:
          "bg-gradient-to-r from-accent to-accent text-primary-foreground border border-accent/30",
        neon:
          "bg-accent/10 text-accent border border-accent/50 shadow-[0_0_12px_rgba(99,102,241,0.3)]",
        glass:
          "bg-white/5 text-foreground/80 border border-white/10 backdrop-blur-md",
        success:
          "bg-[#22C55E]/10 text-[#4ADE80] border border-[#22C55E]/30",
        warning:
          "bg-[#F59E0B]/10 text-[#FBBF24] border border-[#F59E0B]/30",
        danger:
          "bg-[#EF4444]/10 text-[#F87171] border border-[#EF4444]/30",
        purple:
          "bg-[#8B5CF6]/10 text-[#A78BFA] border border-[#8B5CF6]/30",
        cyan:
          "bg-[#06B6D4]/10 text-[#22D3EE] border border-[#06B6D4]/30",
        pink:
          "bg-[#EC4899]/10 text-[#F472B6] border border-[#EC4899]/30",
      },
      size: {
        xs: "text-[10px] px-2 py-0.5",
        sm: "text-xs px-2.5 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        glow: "badge-glow",
        float: "badge-float",
        shimmer: "badge-shimmer",
      },
      shape: {
        default: "rounded-full",
        rounded: "rounded-lg",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      animation: "none",
      shape: "default",
    },
  }
);

export interface BadgeProps
  extends Omit<HTMLMotionProps<"span">, "size">,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
  icon?: ReactNode;
  iconRight?: ReactNode;
  glow?: boolean;
}

export default function Badge({
  children,
  variant,
  size,
  animation,
  shape,
  icon,
  iconRight,
  glow = false,
  className,
  ...props
}: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        badgeVariants({ variant, size, animation, shape }),
        glow && "shadow-[0_0_20px_rgba(99,102,241,0.4)]",
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

// Preset badge configs for common use cases
export const presetBadges = {
  top: {
    variant: "gradient" as const,
    animation: "glow" as const,
    size: "sm" as const,
  },
  new: {
    variant: "neon" as const,
    animation: "pulse" as const,
    size: "sm" as const,
  },
  popular: {
    variant: "purple" as const,
    animation: "float" as const,
    size: "sm" as const,
  },
  ready: {
    variant: "success" as const,
    size: "sm" as const,
  },
  inProgress: {
    variant: "warning" as const,
    animation: "pulse" as const,
    size: "sm" as const,
  },
  tech: {
    variant: "glass" as const,
    size: "xs" as const,
  },
} as const;
