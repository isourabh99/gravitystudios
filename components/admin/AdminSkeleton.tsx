"use client";

import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";

function useResolvedDark(isDarkProp?: boolean): boolean {
  try {
    const theme = useAdminTheme();
    return isDarkProp !== undefined ? isDarkProp : !theme.isLight;
  } catch {
    return isDarkProp !== undefined ? isDarkProp : true;
  }
}

export function SkeletonMetricCards({ isDark: isDarkProp }: { isDark?: boolean }) {
  const isDark = useResolvedDark(isDarkProp);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`p-5 rounded-2xl border space-y-3.5 transition-colors ${
            isDark ? "bg-[#09090C] border-[#1C1C20]" : "bg-white border-neutral-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <Skeleton isDark={isDark} className="h-3 w-28" />
            <Skeleton isDark={isDark} className="h-4 w-4 rounded-full" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <Skeleton isDark={isDark} className="h-8 w-24" />
            <Skeleton isDark={isDark} className="h-4 w-12 rounded-full" />
          </div>
          <Skeleton isDark={isDark} className="h-2 w-36" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart({ isDark: isDarkProp }: { isDark?: boolean }) {
  const isDark = useResolvedDark(isDarkProp);
  return (
    <div
      className={`p-6 rounded-2xl border space-y-6 transition-colors ${
        isDark ? "bg-[#09090C] border-[#1C1C20]" : "bg-white border-neutral-200 shadow-sm"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton isDark={isDark} className="h-5 w-44" />
          <Skeleton isDark={isDark} className="h-3 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton isDark={isDark} className="h-8 w-24 rounded-xl" />
          <Skeleton isDark={isDark} className="h-8 w-24 rounded-xl" />
        </div>
      </div>
      <Skeleton isDark={isDark} className="h-64 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonProjectsTable({ isDark: isDarkProp }: { isDark?: boolean }) {
  const isDark = useResolvedDark(isDarkProp);
  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-colors ${
        isDark ? "bg-[#09090C] border-[#1C1C20]" : "bg-white border-neutral-200 shadow-sm"
      }`}
    >
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isDark ? "border-[#1C1C20] bg-neutral-950/60" : "border-neutral-200 bg-neutral-50/80"
        }`}
      >
        <Skeleton isDark={isDark} className="h-4 w-32" />
        <Skeleton isDark={isDark} className="h-4 w-20 rounded-full" />
      </div>
      <div className={`divide-y ${isDark ? "divide-[#1C1C20]" : "divide-neutral-200"}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton isDark={isDark} className="h-6 w-5" />
              <Skeleton isDark={isDark} className="h-12 w-16 rounded-xl" />
              <div className="space-y-2">
                <Skeleton isDark={isDark} className="h-4 w-40" />
                <Skeleton isDark={isDark} className="h-3 w-28" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton isDark={isDark} className="h-8 w-20 rounded-xl" />
              <Skeleton isDark={isDark} className="h-8 w-8 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FullAdminSkeleton({ isDark: isDarkProp }: { isDark?: boolean }) {
  const isDark = useResolvedDark(isDarkProp);
  const borderSep = isDark ? "border-neutral-800/40" : "border-neutral-200";

  return (
    <div className="space-y-8 select-none animate-fadeIn">
      <div className={`flex items-center justify-between pb-6 border-b ${borderSep}`}>
        <div className="space-y-2">
          <Skeleton isDark={isDark} className="h-7 w-64" />
          <Skeleton isDark={isDark} className="h-3 w-96" />
        </div>
        <Skeleton isDark={isDark} className="h-9 w-32 rounded-xl" />
      </div>
      <SkeletonMetricCards isDark={isDark} />
      <SkeletonChart isDark={isDark} />
      <SkeletonProjectsTable isDark={isDark} />
    </div>
  );
}

export default FullAdminSkeleton;
