"use client";

import React, { useState } from "react";
import { AnalyticsReferrer } from "@/lib/cms/types";

interface TrafficBarChartProps {
  data: AnalyticsReferrer[];
  accentColor?: string;
}

export default function TrafficBarChart({
  data,
  accentColor = "#ED3327",
}: TrafficBarChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div className="text-xs font-mono text-neutral-600">No referral data</div>;
  }

  const maxVal = Math.max(...data.map((d) => d.visitors), 1);

  return (
    <div className="w-full space-y-3 font-sans select-none">
      {data.map((item, idx) => {
        const pct = Math.round((item.visitors / maxVal) * 100);
        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={item.source}
            className="group relative cursor-pointer"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-neutral-500 w-4">
                  0{idx + 1}
                </span>
                <span className="font-medium text-neutral-200 group-hover:text-white transition-colors">
                  {item.source}
                </span>
                <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline">
                  {item.domain}
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-neutral-300 font-medium">
                  {item.visitors.toLocaleString()} <span className="text-neutral-500 text-[10px]">VISITS</span>
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    item.trend >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {item.trend >= 0 ? `+${item.trend}%` : `${item.trend}%`}
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800/80">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${pct}%`,
                  backgroundColor: isHovered ? accentColor : "#333333",
                  boxShadow: isHovered ? `0 0 12px ${accentColor}80` : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

