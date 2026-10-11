"use client";

import React from "react";

export interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export default function CloseButton({
  onClick,
  className = "",
  ariaLabel = "Close Menu",
}: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-none shadow-none flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none ${className}`}
      aria-label={ariaLabel}
    >
      {/* Expanding gray circle from center */}
      <span
        className="absolute w-3 h-3 rounded-full bg-neutral-200 scale-0 group-hover:scale-[6.5] transition-transform duration-500 ease-out origin-center pointer-events-none"
        aria-hidden="true"
      />

      {/* Spinning cross icon */}
      <svg
        className="relative z-10 w-6 h-6 text-neutral-900 transition-all duration-300 ease-out group-hover:rotate-90"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
