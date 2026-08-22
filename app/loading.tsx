import React from "react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#F3EFEA] flex items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-xs text-[#242222]/70 uppercase tracking-widest animate-pulse">
        <div className="w-2 h-2 rounded-full bg-[#3A171C]" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
