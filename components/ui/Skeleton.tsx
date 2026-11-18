"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  isDark?: boolean;
}

/**
 * High-end Studio Shimmer Skeleton
 * Modern fluid linear gradient shimmer matching WebGL studio aesthetics
 */
export function Skeleton({ className = "", isDark = true }: SkeletonProps) {
  return (
    <div
      className={`rounded-lg overflow-hidden animate-shimmer transition-colors ${
        isDark
          ? "bg-gradient-to-r from-[#121215] via-[#1F1F24] to-[#121215] border border-neutral-800/60"
          : "bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 border border-neutral-300/70"
      } ${className}`}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className = "",
  isDark = true,
}: {
  lines?: number;
  className?: string;
  isDark?: boolean;
}) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          isDark={isDark}
          className={`h-3 ${i === lines - 1 ? "w-3/5" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({
  isDark = true,
  className = "",
}: {
  isDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`p-6 rounded-2xl border space-y-4 ${
        isDark ? "bg-[#09090C] border-[#1C1C20]" : "bg-white border-neutral-200"
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <Skeleton isDark={isDark} className="h-4 w-32" />
        <Skeleton isDark={isDark} className="h-4 w-12 rounded-full" />
      </div>
      <Skeleton isDark={isDark} className="h-28 w-full rounded-xl" />
      <SkeletonText lines={2} isDark={isDark} />
    </div>
  );
}
