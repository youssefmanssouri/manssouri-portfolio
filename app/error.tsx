"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized client error message in development console without leaking secrets
    console.error("[Application Error Boundary Caught]", error?.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F3EFEA] text-[#242222] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 shadow-2xl">
        <div className="w-16 h-16 rounded-xs bg-[#A65F4B]/20 border border-[#A65F4B] flex items-center justify-center mx-auto text-[#A65F4B]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#F3EFEA] tracking-tight">Something went wrong</h1>
          <p className="text-[#DED6CC]/80 text-sm leading-relaxed">
            An unexpected error occurred while loading this page. You can try reloading the section or return to the homepage.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs bg-[#A65F4B] text-[#F3EFEA] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs bg-transparent border border-[#DED6CC]/40 text-[#F3EFEA] text-xs font-medium uppercase tracking-wider hover:bg-[#F3EFEA]/10 transition-all active:scale-95"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
