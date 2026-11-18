"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";

export interface ThemeToggleSwitchProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Reusable Studio Dark / Light Mode Toggle
 * Exactly matches the capsule + squircle design from the studio UI
 */
export default function ThemeToggleSwitch({
  isDark,
  onToggle,
  className = "",
  size = "md",
}: ThemeToggleSwitchProps) {
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const itemPadding = size === "sm" ? "p-1.5 rounded-lg" : "p-2 rounded-xl";

  return (
    <div
      role="group"
      aria-label="Color theme switcher"
      className={`inline-flex items-center p-1 rounded-2xl border transition-all duration-200 select-none ${
        isDark
          ? "bg-[#0c0c0e] border-[#222226] text-neutral-400 shadow-inner"
          : "bg-neutral-100 border-neutral-300 text-neutral-600 shadow-inner"
      } ${className}`}
    >
      {/* Dark / Moon Button */}
      <button
        type="button"
        onClick={() => {
          if (!isDark) onToggle();
        }}
        aria-label="Dark Mode"
        aria-pressed={isDark}
        title="Dark Mode"
        className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${itemPadding} ${
          isDark
            ? "bg-[#252529] text-white shadow-sm ring-1 ring-white/10"
            : "text-neutral-400 hover:text-neutral-800 bg-transparent"
        }`}
      >
        <Moon className={`${iconSize} stroke-[2.2]`} />
      </button>

      {/* Light / Sun Button */}
      <button
        type="button"
        onClick={() => {
          if (isDark) onToggle();
        }}
        aria-label="Light Mode"
        aria-pressed={!isDark}
        title="Light Mode"
        className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${itemPadding} ${
          !isDark
            ? "bg-white text-black shadow-sm ring-1 ring-black/10"
            : "text-neutral-500 hover:text-neutral-200 bg-transparent"
        }`}
      >
        <Sun className={`${iconSize} stroke-[2.2]`} />
      </button>
    </div>
  );
}

export interface StudioOptionItem<T extends string = string> {
  value: T;
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface StudioSegmentedToggleProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: StudioOptionItem<T>[];
  className?: string;
  isDark?: boolean;
  size?: "sm" | "md";
}

/**
 * Reusable Capsule Segmented Toggle for multi-choice switches (Text vs Image, time ranges, etc.)
 */
export function StudioSegmentedToggle<T extends string = string>({
  value,
  onChange,
  options,
  className = "",
  isDark = true,
  size = "md",
}: StudioSegmentedToggleProps<T>) {
  const itemPadding =
    size === "sm" ? "px-2.5 py-1 text-[11px] rounded-lg" : "px-3.5 py-1.5 text-xs rounded-xl";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <div
      className={`inline-flex items-center p-1 rounded-2xl border transition-all duration-200 select-none ${
        isDark
          ? "bg-[#0c0c0e] border-[#222226] text-neutral-400 shadow-inner"
          : "bg-neutral-100 border-neutral-300 text-neutral-600 shadow-inner"
      } ${className}`}
    >
      {options.map((opt) => {
        const isActive = value === opt.value;
        const Icon = opt.icon;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-1.5 font-mono font-medium transition-all duration-200 cursor-pointer ${itemPadding} ${
              isActive
                ? isDark
                  ? "bg-[#252529] text-white shadow-sm ring-1 ring-white/10 font-bold"
                  : "bg-white text-black shadow-sm ring-1 ring-black/10 font-bold"
                : isDark
                ? "text-neutral-400 hover:text-white"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            {Icon && <Icon className={iconSize} />}
            {opt.label && <span>{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export interface StudioBooleanSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  isDark?: boolean;
}

/**
 * Reusable Capsule Switch for on/off booleans (e.g. ScrambleText toggle)
 */
export function StudioBooleanSwitch({
  checked,
  onChange,
  label,
  description,
  isDark = true,
}: StudioBooleanSwitchProps) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer select-none ${
        isDark
          ? "bg-[#0c0c0e] border-[#222226] hover:border-neutral-700"
          : "bg-neutral-50 border-neutral-200 hover:border-neutral-300"
      }`}
    >
      {(label || description) && (
        <div className="mr-3">
          {label && (
            <span
              className={`text-xs font-mono block ${isDark ? "text-neutral-200" : "text-neutral-900 font-semibold"}`}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-[10px] font-mono text-neutral-500 block">
              {description}
            </span>
          )}
        </div>
      )}

      {/* Capsule toggle pill */}
      <div
        className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
          checked
            ? "bg-emerald-500"
            : isDark
            ? "bg-[#222226]"
            : "bg-neutral-300"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}
