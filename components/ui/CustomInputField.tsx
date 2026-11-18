"use client";

import React from "react";

export interface CustomInputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
  isDark?: boolean;
}

export default function CustomInputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  optional = false,
  placeholder = "",
  multiline = false,
  rows = 6,
  className = "",
  isDark = false,
}: CustomInputFieldProps) {
  const labelColor = isDark ? "text-neutral-300" : "text-neutral-800";
  const optionalColor = isDark ? "text-neutral-500" : "text-neutral-400";
  const fieldBase = isDark
    ? "bg-[#0D0D10] border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-500"
    : "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-black";

  return (
    <div className={`space-y-2 w-full ${className}`}>
      <div className="flex items-center justify-between select-none">
        <label
          htmlFor={name}
          className={`text-[11px] sm:text-xs font-mono tracking-wider uppercase ${labelColor}`}
        >
          {label}
        </label>
        {optional && (
          <span className={`text-[11px] sm:text-xs font-mono tracking-wider uppercase ${optionalColor}`}>
            OPTIONAL
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full border p-4 font-mg12-regular text-sm rounded-none outline-none transition-colors resize-y min-h-[140px] ${fieldBase}`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full border px-4 py-3 font-mg12-regular text-sm rounded-none outline-none transition-colors ${fieldBase}`}
        />
      )}
    </div>
  );
}
