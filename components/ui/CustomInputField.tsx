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
}: CustomInputFieldProps) {
  return (
    <div className={`space-y-2 w-full ${className}`}>
      <div className="flex items-center justify-between select-none">
        <label
          htmlFor={name}
          className="text-[11px] sm:text-xs font-mono tracking-wider text-neutral-800 uppercase"
        >
          {label}
        </label>
        {optional && (
          <span className="text-[11px] sm:text-xs font-mono tracking-wider text-neutral-400 uppercase">
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
          className="w-full bg-white border border-neutral-300 p-4 text-neutral-900 font-mg12-regular text-sm rounded-none outline-none focus:border-black transition-colors resize-y min-h-[140px]"
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
          className="w-full bg-white border border-neutral-300 px-4 py-3 text-neutral-900 font-mg12-regular text-sm rounded-none outline-none focus:border-black transition-colors"
        />
      )}
    </div>
  );
}
