import React from "react";

export default function GlobalLoading() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="h-[2px] w-full bg-[#DED6CC]/40 overflow-hidden">
        <div className="h-full bg-[#A65F4B] w-1/3 animate-pulse motion-reduce:animate-none" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
