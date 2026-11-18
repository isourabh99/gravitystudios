"use client";

import React, { useState, useId } from "react";
import { AnalyticsDataPoint } from "@/lib/cms/types";

interface AnalyticsAreaChartProps {
  data: AnalyticsDataPoint[];
  accentColor?: string;
  metric?: "visitors" | "pageviews" | "both";
  height?: number;
  isDark?: boolean;
}

export default function AnalyticsAreaChart({
  data,
  accentColor = "#ED3327",
  metric = "both",
  height = 280,
  isDark = true,
}: AnalyticsAreaChartProps) {
  const gradientId = useId();
  const secondaryGradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center text-xs font-mono text-neutral-500 border border-neutral-800/80 rounded-xl"
        style={{ height }}
      >
        NO TELEMETRY DATA RECORDED
      </div>
    );
  }

  // Padding & bounds
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;
  const viewWidth = 800;
  const viewHeight = height;

  const chartW = viewWidth - paddingLeft - paddingRight;
  const chartH = viewHeight - paddingTop - paddingBottom;

  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.visitors, metric === "visitors" ? 0 : d.pageviews)),
    10
  );
  // Round up to nice number
  const yMax = Math.ceil((maxVal * 1.15) / 10) * 10;

  // Coordinate mapping
  const getX = (idx: number) => paddingLeft + (idx / (data.length - 1 || 1)) * chartW;
  const getY = (val: number) => paddingTop + chartH - (val / yMax) * chartH;

  // Build SVG path strings with smooth Catmull-Rom or cubic Bezier
  const buildSmoothPath = (values: number[]) => {
    if (values.length === 0) return "";
    const pts = values.map((val, idx) => ({ x: getX(idx), y: getY(val) }));

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      // Cubic control points
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const visitorsLine = buildSmoothPath(data.map((d) => d.visitors));
  const pageviewsLine = buildSmoothPath(data.map((d) => d.pageviews));

  const visitorsArea = `${visitorsLine} L ${getX(data.length - 1)} ${paddingTop + chartH} L ${getX(0)} ${paddingTop + chartH} Z`;
  const pageviewsArea = `${pageviewsLine} L ${getX(data.length - 1)} ${paddingTop + chartH} L ${getX(0)} ${paddingTop + chartH} Z`;

  // Grid tick values (4 steps)
  const yTicks = [0, 0.33, 0.66, 1].map((ratio) => Math.round(yMax * ratio));

  // Determine hover point
  const activePt = hoverIndex !== null && hoverIndex >= 0 && hoverIndex < data.length ? data[hoverIndex] : null;

  const gridStroke = isDark ? "#1A1A1A" : "#E5E7EB";
  const tickFill = isDark ? "#555555" : "#6B7280";
  const crosshairStroke = isDark ? "#444444" : "#9CA3AF";
  const pageviewStroke = isDark ? "#999999" : "#64748B";
  const pageviewGradientStop = isDark ? "#F4F4F0" : "#64748B";
  const dotFill = isDark ? "#000000" : "#FFFFFF";
  const tooltipBg = isDark
    ? "bg-[#0B0B0C]/95 border-white/15 text-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
    : "bg-white/95 border-neutral-200 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.12)]";
  const tooltipHeaderBorder = isDark ? "border-white/10 text-neutral-400" : "border-neutral-100 text-neutral-500";
  const tooltipTextPrimary = isDark ? "text-white" : "text-neutral-900";
  const tooltipTextSecondary = isDark ? "text-neutral-300" : "text-neutral-700";
  const tooltipTextMuted = isDark ? "text-neutral-400" : "text-neutral-500";

  return (
    <div className="relative w-full select-none">
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          {/* Primary Accent Gradient (Visitors) */}
          <linearGradient id={`grad-visitors-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.05" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
          </linearGradient>

          {/* Secondary Cyan/White Gradient (Pageviews) */}
          <linearGradient id={`grad-pageviews-${secondaryGradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={pageviewGradientStop} stopOpacity={isDark ? "0.18" : "0.15"} />
            <stop offset="60%" stopColor={pageviewGradientStop} stopOpacity={isDark ? "0.03" : "0.03"} />
            <stop offset="100%" stopColor={pageviewGradientStop} stopOpacity="0.0" />
          </linearGradient>

          <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {yTicks.map((tickVal, i) => {
          const y = getY(tickVal);
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={viewWidth - paddingRight}
                y2={y}
                stroke={gridStroke}
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 10}
                y={y + 3}
                fill={tickFill}
                fontSize="10"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="end"
              >
                {tickVal >= 1000 ? `${(tickVal / 1000).toFixed(1)}k` : tickVal}
              </text>
            </g>
          );
        })}

        {/* Areas */}
        {(metric === "both" || metric === "pageviews") && (
          <path d={pageviewsArea} fill={`url(#grad-pageviews-${secondaryGradientId})`} />
        )}

        {(metric === "both" || metric === "visitors") && (
          <path d={visitorsArea} fill={`url(#grad-visitors-${gradientId})`} />
        )}

        {/* Lines */}
        {(metric === "both" || metric === "pageviews") && (
          <path
            d={pageviewsLine}
            fill="none"
            stroke={pageviewStroke}
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />
        )}

        {(metric === "both" || metric === "visitors") && (
          <path
            d={visitorsLine}
            fill="none"
            stroke={accentColor}
            strokeWidth="2.5"
            filter={`url(#glow-${gradientId})`}
          />
        )}

        {/* X-axis labels (render up to 7 nicely spaced labels) */}
        {data.map((d, idx) => {
          const step = Math.ceil(data.length / 7);
          const isKeyPoint = idx % step === 0 || idx === data.length - 1;
          if (!isKeyPoint) return null;

          return (
            <text
              key={idx}
              x={getX(idx)}
              y={viewHeight - 10}
              fill={tickFill}
              fontSize="10"
              fontFamily="var(--font-mono, monospace)"
              textAnchor="middle"
            >
              {d.label}
            </text>
          );
        })}

        {/* Interactive Hover Columns (invisible hit targets) */}
        {data.map((d, idx) => {
          const colW = chartW / data.length;
          const x = getX(idx) - colW / 2;
          return (
            <rect
              key={`hit-${idx}`}
              x={x}
              y={paddingTop}
              width={colW}
              height={chartH}
              fill="transparent"
              className="cursor-crosshair pointer-events-auto"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          );
        })}

        {/* Active crosshair and points */}
        {hoverIndex !== null && activePt && (
          <g className="pointer-events-none">
            {/* Vertical crosshair line */}
            <line
              x1={getX(hoverIndex)}
              y1={paddingTop}
              x2={getX(hoverIndex)}
              y2={paddingTop + chartH}
              stroke={crosshairStroke}
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Pageviews point */}
            {(metric === "both" || metric === "pageviews") && (
              <circle
                cx={getX(hoverIndex)}
                cy={getY(activePt.pageviews)}
                r="4"
                fill={dotFill}
                stroke={pageviewStroke}
                strokeWidth="2"
              />
            )}

            {/* Visitors point */}
            {(metric === "both" || metric === "visitors") && (
              <g>
                <circle
                  cx={getX(hoverIndex)}
                  cy={getY(activePt.visitors)}
                  r="6"
                  fill={accentColor}
                  opacity="0.3"
                />
                <circle
                  cx={getX(hoverIndex)}
                  cy={getY(activePt.visitors)}
                  r="4"
                  fill={dotFill}
                  stroke={accentColor}
                  strokeWidth="2.5"
                />
              </g>
            )}
          </g>
        )}
      </svg>

      {/* Floating Glassmorphic Tooltip */}
      {hoverIndex !== null && activePt && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-75 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{
            left: `${((getX(hoverIndex) / viewWidth) * 100).toFixed(2)}%`,
            top: `${Math.max(10, (getY(activePt.visitors) / viewHeight) * 100 - 8)}%`,
          }}
        >
          <div className={`${tooltipBg} backdrop-blur-md px-3.5 py-2.5 rounded-lg text-xs font-mono space-y-1 min-w-[150px]`}>
            <div className={`flex items-center justify-between pb-1 border-b ${tooltipHeaderBorder} text-[11px]`}>
              <span>{activePt.label}</span>
              <span className="text-[10px] text-neutral-400">LIVE</span>
            </div>
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <span className={`flex items-center gap-1.5 ${tooltipTextSecondary}`}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Visitors:
              </span>
              <span className={`font-semibold ${tooltipTextPrimary}`}>{activePt.visitors.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className={`flex items-center gap-1.5 ${tooltipTextMuted}`}>
                <span className="w-2 h-2 rounded-full bg-neutral-400" />
                Page Views:
              </span>
              <span className={`font-semibold ${tooltipTextSecondary}`}>{activePt.pageviews.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-[10px] text-neutral-400 pt-0.5">
              <span>Bounce Rate:</span>
              <span className="text-emerald-500 font-medium">{activePt.bounceRate}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

