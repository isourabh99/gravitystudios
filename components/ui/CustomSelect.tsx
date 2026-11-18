"use client";

import React, { useState, useRef, useEffect } from "react";

export interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
  isDark?: boolean;
}

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  className = "",
  isDark = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labelColor = isDark ? "text-neutral-300" : "text-neutral-800";
  const buttonBase = isDark
    ? "bg-[#0D0D10] border-neutral-800 text-neutral-100 focus:border-neutral-500"
    : "bg-white border-neutral-300 text-neutral-900 focus:border-black";
  const menuBase = isDark
    ? "bg-[#121216] border-neutral-800 text-neutral-200"
    : "bg-white border-neutral-300 text-neutral-900";

  return (
    <div className={`space-y-2 relative ${className}`} ref={dropdownRef}>
      <label className={`block text-[11px] sm:text-xs font-mono tracking-wider uppercase select-none ${labelColor}`}>
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border px-4 py-3 flex items-center justify-between font-mg12-regular text-sm rounded-none focus:outline-none transition-colors select-none text-left ${buttonBase}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{value}</span>
        {/* Custom Double Arrow Indicator */}
        <span className="text-neutral-500 text-xs select-none">⇅</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={`absolute left-0 right-0 top-full mt-1 border shadow-xl z-50 py-1 rounded-none max-h-60 overflow-auto ${menuBase}`}
        >
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 text-sm font-mg12-regular cursor-pointer transition-colors flex items-center justify-between ${
                  isSelected
                    ? isDark
                      ? "bg-neutral-800 text-white font-medium"
                      : "bg-neutral-100 text-black font-medium"
                    : isDark
                    ? "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-black"
                }`}
              >
                <span>{opt}</span>
                {isSelected && <span className="text-xs">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
