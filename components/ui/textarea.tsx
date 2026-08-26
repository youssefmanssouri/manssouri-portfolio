import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-medium text-[#242222] uppercase tracking-wider font-mono"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
          className={cn(
            "w-full rounded-xs bg-[#DED6CC]/30 border border-[#DED6CC] px-4 py-2.5 text-base sm:text-sm text-[#242222] placeholder-[#242222]/50 transition-all duration-200 focus:bg-[#F3EFEA] focus:border-[#A65F4B] focus:outline-none focus:ring-1 focus:ring-[#A65F4B] disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] resize-y",
            error && "border-[#A65F4B] focus:border-[#A65F4B] focus:ring-[#A65F4B]",
            className
          )}
          {...props}
        />
        {error && (
          <p id={textareaId ? `${textareaId}-error` : undefined} className="text-xs text-[#A65F4B] font-mono mt-1 font-semibold">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
