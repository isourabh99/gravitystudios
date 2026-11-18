"use client";

import React from "react";

interface DeviceBreakdown {
  desktop: number;
  mobile: number;
  tablet: number;
}

interface DeviceDonutChartProps {
  data: DeviceBreakdown;
  accentColor?: string;
  size?: number;
}

export default function DeviceDonutChart({
  data,
  accentColor = "#ED3327",
  size = 140,
}: DeviceDonutChartProps) {
  const total = data.desktop + data.mobile + data.tablet || 100;
  const radius = size / 2 - 16;
  const circumference = 2 * Math.PI * radius;

  const desktopLength = (data.desktop / total) * circumference;
  const mobileLength = (data.mobile / total) * circumference;
  const tabletLength = (data.tablet / total) * circumference;

  const desktopOffset = 0;
  const mobileOffset = -desktopLength;
  const tabletOffset = -(desktopLength + mobileLength);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#171717"
            strokeWidth="12"
          />

          {/* Desktop Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accentColor}
            strokeWidth="12"
            strokeDasharray={`${desktopLength} ${circumference}`}
            strokeDashoffset={desktopOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />

          {/* Mobile Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="12"
            strokeDasharray={`${mobileLength} ${circumference}`}
            strokeDashoffset={mobileOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />

          {/* Tablet Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#525252"
            strokeWidth="12"
            strokeDasharray={`${tabletLength} ${circumference}`}
            strokeDashoffset={tabletOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-xl font-bold text-white tracking-tight">
            {data.desktop}%
          </span>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            DESKTOP
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="flex-1 space-y-2.5 w-full text-xs font-mono">
        <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accentColor }} />
            <span className="text-neutral-300">Desktop</span>
          </div>
          <span className="font-semibold text-white">{data.desktop}%</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-neutral-200" />
            <span className="text-neutral-300">Mobile</span>
          </div>
          <span className="font-semibold text-white">{data.mobile}%</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-neutral-600" />
            <span className="text-neutral-300">Tablet</span>
          </div>
          <span className="font-semibold text-white">{data.tablet}%</span>
        </div>
      </div>
    </div>
  );
}

