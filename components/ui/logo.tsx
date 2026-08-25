"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps {
  variant?: "lockup" | "monogram" | "wordmark" | "responsive";
  theme?: "dark" | "light" | "auto";
  className?: string;
}

export function YMLogo({
  variant = "lockup",
  theme = "auto",
  className = "",
}: LogoProps) {
  // Theme color fill definitions:
  // "auto": uses currentColor or defaults to primary burgundy #3A171C
  // "dark": #3A171C (for light backgrounds)
  // "light": #F3EFEA (for dark backgrounds like burgundy footer)
  const fillColor = theme === "light" ? "#F3EFEA" : theme === "dark" ? "#3A171C" : "currentColor";

  if (variant === "monogram") {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 shrink-0", className)}
        aria-hidden="true"
      >
        <g fill={fillColor}>
          <path d="M 44 60 L 44 98 H 36 V 104 H 64 V 98 H 56 L 56 60 Z" />
          <path d="M 16 20 V 26 H 24 L 46 62 L 54 58 L 30 26 H 36 V 20 H 16 Z" />
          <path d="M 74 20 H 88 V 26 H 80 L 52 60 L 46 56 L 70 26 H 64 V 20 Z" opacity="0.9" />
          <path d="M 40 38 L 58 76 L 66 76 L 82 32 H 74 V 26 H 92 V 32 H 86 L 70 82 L 56 82 L 36 40 Z" />
          <path d="M 82 38 L 94 88 H 102 V 94 H 78 V 88 H 86 L 76 44 Z" />
          <path d="M 48 30 L 58 54 L 64 50 L 54 26 H 44 V 30 Z" />
        </g>
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("inline-flex flex-col justify-center leading-none font-serif tracking-[0.16em] uppercase select-none", className)}>
        <span className="text-[13px] sm:text-[15px] font-bold block" style={{ color: fillColor }}>
          YOUSSEF
        </span>
        <span className="text-[13px] sm:text-[15px] font-bold block" style={{ color: fillColor }}>
          MANSSOURI
        </span>
      </div>
    );
  }

  // Primary Lockup / Responsive
  return (
    <div className={cn("inline-flex items-center gap-3 select-none group", className)}>
      {/* YM Monogram */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        <g fill={fillColor}>
          <path d="M 44 60 L 44 98 H 36 V 104 H 64 V 98 H 56 L 56 60 Z" />
          <path d="M 16 20 V 26 H 24 L 46 62 L 54 58 L 30 26 H 36 V 20 H 16 Z" />
          <path d="M 74 20 H 88 V 26 H 80 L 52 60 L 46 56 L 70 26 H 64 V 20 Z" opacity="0.9" />
          <path d="M 40 38 L 58 76 L 66 76 L 82 32 H 74 V 26 H 92 V 32 H 86 L 70 82 L 56 82 L 36 40 Z" />
          <path d="M 82 38 L 94 88 H 102 V 94 H 78 V 88 H 86 L 76 44 Z" />
          <path d="M 48 30 L 58 54 L 64 50 L 54 26 H 44 V 30 Z" />
        </g>
      </svg>

      {/* Stacked Wordmark (Visible on tablet/desktop, optional on mobile depending on context) */}
      <div className={cn("flex flex-col justify-center leading-none font-serif tracking-[0.16em] uppercase text-[#3A171C]", variant === "responsive" ? "hidden sm:flex" : "flex")}>
        <span className="text-[12px] sm:text-[13.5px] font-bold block" style={{ color: fillColor }}>
          YOUSSEF
        </span>
        <span className="text-[12px] sm:text-[13.5px] font-bold block" style={{ color: fillColor }}>
          MANSSOURI
        </span>
      </div>
    </div>
  );
}
