"use client";

import React, { useEffect, useRef, useCallback } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // 1. Capture triggering element on mount and restore focus on unmount
  useEffect(() => {
    triggerElementRef.current = document.activeElement as HTMLElement | null;

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      triggerElementRef.current?.focus();
    };
  }, []);

  // 2. Lock body scroll while open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 3. Keyboard navigation & accessible Focus Trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (images.length > 1) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          onPrev();
          return;
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onNext();
          return;
        }
      }

      // Focus trap for Tab and Shift+Tab
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex="0"]'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [onClose, onPrev, onNext, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 4. Backdrop click to close (when clicking directly on backdrop area)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentImage = images[currentIndex] || images[0];
  const dialogLabel = `${projectName} — preview image ${currentIndex + 1} of ${images.length}`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-[#3A171C]/95 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity motion-reduce:transition-none"
    >
      {/* Visual Image Counter */}
      <div
        className="absolute top-4 left-4 font-mono text-xs text-[#DED6CC]/90 bg-[#2D1216]/80 px-3 py-1.5 rounded-xs border border-[#DED6CC]/20 select-none"
        aria-live="polite"
      >
        <span>
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Close Button */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs cursor-pointer z-10"
        aria-label="Close image preview (Escape)"
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Previous Button (if multiple images) */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs cursor-pointer z-10"
          aria-label="Previous image (Left arrow)"
        >
          <ChevronLeft className="w-8 h-8" aria-hidden="true" />
        </button>
      )}

      {/* Image Preview Container */}
      <div
        className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage}
          alt={`${projectName} enlarged preview ${currentIndex + 1} of ${images.length}`}
          width={1200}
          height={800}
          priority
          className="object-contain max-h-[85vh] w-auto rounded-xs border border-[#DED6CC]/20 shadow-2xl select-none"
        />
      </div>

      {/* Next Button (if multiple images) */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs cursor-pointer z-10"
          aria-label="Next image (Right arrow)"
        >
          <ChevronRight className="w-8 h-8" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
