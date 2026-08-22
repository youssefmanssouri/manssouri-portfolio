import React from "react";

export default function LoadingCaseStudy() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#F3EFEA] text-[#242222] animate-pulse">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link Skeleton */}
        <div className="w-32 h-4 bg-[#DED6CC] rounded-xs" />

        {/* Header Skeleton */}
        <div className="space-y-4 pb-8 border-b border-[#DED6CC]">
          <div className="w-24 h-4 bg-[#A65F4B]/30 rounded-xs" />
          <div className="w-2/3 h-10 bg-[#3A171C]/20 rounded-xs" />
          <div className="w-full max-w-2xl h-6 bg-[#3A171C]/10 rounded-xs" />
        </div>

        {/* Hero Visual Preview Skeleton */}
        <div className="relative aspect-[16/9] rounded-xs bg-[#3A171C]/20 border border-[#DED6CC]" />

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          <div className="lg:col-span-8 space-y-6">
            <div className="w-48 h-6 bg-[#3A171C]/20 rounded-xs" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-[#3A171C]/10 rounded-xs" />
              <div className="w-5/6 h-4 bg-[#3A171C]/10 rounded-xs" />
              <div className="w-4/6 h-4 bg-[#3A171C]/10 rounded-xs" />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-48 rounded-xs bg-[#3A171C] border border-[#DED6CC]/20" />
          </div>
        </div>
      </div>
    </main>
  );
}
