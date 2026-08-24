import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  icon,
  iconPosition = "right",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium uppercase tracking-wider transition-all duration-200 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#A65F4B] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-xs px-5 py-2.5 gap-2",
    lg: "text-sm px-6 py-3 gap-2.5"
  };

  const variantStyles = {
    primary:
      "bg-[#3A171C] text-[#F3EFEA] hover:bg-[#2D1216] border border-[#3A171C]",
    secondary:
      "bg-[#A65F4B] text-[#F3EFEA] hover:opacity-90 border border-[#A65F4B]",
    outline:
      "bg-transparent text-[#3A171C] border border-[#3A171C] hover:bg-[#3A171C]/5",
    ghost:
      "bg-transparent text-[#242222] hover:text-[#A65F4B] hover:bg-[#3A171C]/5"
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
