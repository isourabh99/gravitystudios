"use client";

import React from "react";
import { motion } from "framer-motion";

export type ViewMode = "list" | "grid";

export interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export default function ViewModeToggle({
  value,
  onChange,
  className = "",
}: ViewModeToggleProps) {
  return (
    <div
      role="group"
      aria-label="View Mode Switcher"
      className={`relative inline-flex items-center bg-[#E6E6E1]  rounded-none select-none ${className}`}
    >
      {/* 1. List View Button */}
      <button
        type="button"
        onClick={() => onChange("list")}
        className="relative w-8 h-8 flex items-center justify-center rounded-none cursor-pointer focus:outline-none transition-colors duration-200 group"
        aria-label="Switch to List View"
        aria-pressed={value === "list"}
        title="List View"
      >
        {value === "list" && (
          <motion.span
            layoutId="activeViewModeIndicator"
            className="absolute inset-0 bg-black rounded-none z-0"
            transition={{
              type: "spring",
              stiffness: 480,
              damping: 34,
            }}
          />
        )}
        <span
          className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
            value === "list"
              ? "text-white"
              : "text-neutral-500 group-hover:text-black"
          }`}
        >
          <svg
            className="w-4 h-4 fill-current pointer-events-none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="2" width="16" height="2" />
            <rect y="7" width="16" height="2" />
            <rect y="12" width="16" height="2" />
          </svg>
        </span>
      </button>

      {/* 2. Grid View Button */}
      <button
        type="button"
        onClick={() => onChange("grid")}
        className="relative w-8 h-8 flex items-center justify-center rounded-none cursor-pointer focus:outline-none transition-colors duration-200 group"
        aria-label="Switch to Grid View"
        aria-pressed={value === "grid"}
        title="Grid View"
      >
        {value === "grid" && (
          <motion.span
            layoutId="activeViewModeIndicator"
            className="absolute inset-0 bg-black rounded-none z-0"
            transition={{
              type: "spring",
              stiffness: 480,
              damping: 34,
            }}
          />
        )}
        <span
          className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
            value === "grid"
              ? "text-white"
              : "text-neutral-500 group-hover:text-black"
          }`}
        >
          <svg
            className="w-4 h-4 fill-current pointer-events-none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="1" width="6" height="6" />
            <rect x="9" y="1" width="6" height="6" />
            <rect x="1" y="9" width="6" height="6" />
            <rect x="9" y="9" width="6" height="6" />
          </svg>
        </span>
      </button>
    </div>
  );
}
