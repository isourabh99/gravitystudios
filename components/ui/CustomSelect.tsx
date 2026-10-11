"use client";

import React, { useState, useRef, useEffect } from "react";

export interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  className = "",
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

  return (
    <div className={`space-y-2 relative ${className}`} ref={dropdownRef}>
      <label className="block text-[11px] sm:text-xs font-mono tracking-wider text-neutral-800 uppercase select-none">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-neutral-300 px-4 py-3 flex items-center justify-between text-neutral-900 font-mg12-regular text-sm rounded-none focus:outline-none focus:border-black transition-colors select-none text-left"
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
          className="absolute left-0 right-0 top-full mt-1 bg-white border border-neutral-300 shadow-xl z-50 py-1 rounded-none max-h-60 overflow-auto"
        >
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 text-sm font-mg12-regular cursor-pointer transition-colors flex items-center justify-between ${
                opt === value
                  ? "bg-neutral-100 text-black font-medium"
                  : "text-neutral-700 hover:bg-neutral-50 hover:text-black"
              }`}
            >
              <span>{opt}</span>
              {opt === value && <span className="text-xs">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
