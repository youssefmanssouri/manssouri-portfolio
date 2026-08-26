"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectLightboxProps {
  images: string[];
  currentIndex: number;
  projectName: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectLightbox({
  images,
  currentIndex,
  projectName,
  onClose,
  onPrev,
  onNext,
}: ProjectLightboxProps) {
  // Keyboard navigation support for Escape, Left, Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-[#3A171C]/95 backdrop-blur-sm flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A65F4B]"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-2 sm:left-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A65F4B]"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center">
        <Image
          src={images[currentIndex]}
          alt={`${projectName} enlarged preview ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="object-contain max-h-[85vh] w-auto rounded-xs border border-[#DED6CC]/20"
        />
      </div>

      <button
        onClick={onNext}
        className="absolute right-2 sm:right-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A65F4B]"
        aria-label="Next Image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
