import React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, placeholder, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium text-[#242222] uppercase tracking-wider font-mono"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error && selectId ? `${selectId}-error` : undefined}
            className={cn(
              "w-full appearance-none rounded-xs bg-[#DED6CC]/30 border border-[#DED6CC] px-4 py-2.5 text-base sm:text-sm text-[#242222] placeholder-[#242222]/50 transition-all duration-200 focus:bg-[#F3EFEA] focus:border-[#A65F4B] focus:outline-none focus:ring-1 focus:ring-[#A65F4B] disabled:cursor-not-allowed disabled:opacity-50 pr-10",
              error && "border-[#A65F4B] focus:border-[#A65F4B] focus:ring-[#A65F4B]",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-[#F3EFEA] text-[#242222]/50">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#F3EFEA] text-[#242222]">
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#242222]">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l0.707 0.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && (
          <p id={selectId ? `${selectId}-error` : undefined} className="text-xs text-[#A65F4B] font-mono mt-1 font-semibold">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
