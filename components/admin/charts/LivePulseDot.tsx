"use client";

import React from "react";

export default function LivePulseDot({
  count = 42,
  accentColor = "#10B981",
}: {
  count?: number;
  accentColor?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs select-none">
      <span className="relative flex h-2 w-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: accentColor }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: accentColor }}
        />
      </span>
      <span className="font-semibold tracking-wide text-[11px]">
        {count} LIVE ACTIVE
      </span>
    </div>
  );
}

