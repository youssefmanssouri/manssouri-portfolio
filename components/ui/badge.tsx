import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "neutral" | "emerald" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-xs"
  };

  const variantStyles = {
    blue: "bg-blue-950/60 text-blue-400 border border-blue-800/40",
    neutral: "bg-slate-800/70 text-slate-300 border border-slate-700/50",
    emerald: "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40",
    outline: "bg-transparent text-slate-400 border border-slate-800"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-medium rounded-full tracking-wide transition-colors",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
