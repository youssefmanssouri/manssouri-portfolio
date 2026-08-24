import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[#242222] uppercase tracking-wider font-mono"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-xs bg-[#DED6CC]/30 border border-[#DED6CC] px-4 py-2.5 text-base sm:text-sm text-[#242222] placeholder-[#242222]/50 transition-all duration-200 focus:bg-[#F3EFEA] focus:border-[#A65F4B] focus:outline-none focus:ring-1 focus:ring-[#A65F4B] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[#A65F4B] focus:border-[#A65F4B] focus:ring-[#A65F4B]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#A65F4B] font-mono mt-1 font-semibold">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
