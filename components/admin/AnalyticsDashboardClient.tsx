"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Eye,
  Clock,
  TrendingDown,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  FolderGit2,
  Palette,
  Radio,
  Globe,
  Compass,
} from "lucide-react";
import AnalyticsAreaChart from "@/components/admin/charts/AnalyticsAreaChart";
import TrafficBarChart from "@/components/admin/charts/TrafficBarChart";
import DeviceDonutChart from "@/components/admin/charts/DeviceDonutChart";
import LivePulseDot from "@/components/admin/charts/LivePulseDot";
import { getMockAnalytics } from "@/lib/cms/analyticsData";
import { ThemeSettings } from "@/lib/cms/types";
import ScrambleText from "@/components/ui/ScrambleText";
import { StudioSegmentedToggle } from "@/components/ui/StudioToggle";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";

interface AnalyticsDashboardClientProps {
  theme: ThemeSettings;
}

export default function AnalyticsDashboardClient({
  theme,
}: AnalyticsDashboardClientProps) {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d">("7d");
  const [chartMetric, setChartMetric] = useState<"both" | "visitors" | "pageviews">("both");
  const { isLight } = useAdminTheme();

  const analytics = getMockAnalytics(timeRange);
  const accentColor = theme.accentColor || "#ED3327";

  const cardCls = isLight
    ? "bg-white border-neutral-200 text-neutral-900 shadow-sm hover:border-neutral-300"
    : "bg-[#09090C] border-[#1C1C20] text-white hover:border-neutral-700";

  const subCardCls = isLight
    ? "bg-neutral-50/90 border-neutral-200 hover:border-neutral-300"
    : "bg-neutral-950/70 border-neutral-900 hover:border-neutral-800";

  const borderSep = isLight ? "border-neutral-200" : "border-neutral-900";
  const textHeading = isLight ? "text-neutral-900" : "text-white";
  const textSub = isLight ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-8 select-none">
      {/* 1. Header Bar with Time Range Switcher & Live Pulse */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${borderSep}`}>
        <div>
          <div className="flex items-center gap-3">
            <h1 className={`text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight ${textHeading}`}>
              <ScrambleText text="Operational Traffic & Analytics" hoverColor={accentColor} />
            </h1>
            <LivePulseDot count={analytics.activeUsersNow} accentColor="#10B981" />
          </div>
          <p className={`text-xs font-mono mt-1 ${textSub}`}>
            Real-time telemetry and audience behavior for Gravity Studios portfolio
          </p>
        </div>

        {/* Shopify-Style Time Range Filter via Studio Capsule Toggle */}
        <StudioSegmentedToggle<"24h" | "7d" | "30d" | "90d">
          value={timeRange}
          onChange={(val) => setTimeRange(val)}
          options={[
            { value: "24h", label: "24 Hours" },
            { value: "7d", label: "Last 7 Days" },
            { value: "30d", label: "30 Days" },
            { value: "90d", label: "90 Days" },
          ]}
          isDark={!isLight}
          size="sm"
        />
      </div>

      {/* 2. Key Metric Cards (Shopify Grid Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Unique Visitors */}
        <div className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden group ${cardCls}`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className={`uppercase tracking-wider ${textSub}`}>Total Unique Visitors</span>
            <Users className={`w-4 h-4 ${isLight ? "text-neutral-400 group-hover:text-black" : "text-neutral-500 group-hover:text-white"} transition-colors`} />
          </div>
          <div className="flex items-baseline justify-between">
            <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${textHeading}`}>
              {analytics.totalVisitors.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-500 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{analytics.visitorsTrend}%</span>
            </div>
          </div>
          <div className={`text-[11px] font-mono flex items-center justify-between ${textSub}`}>
            <span>vs previous {timeRange}</span>
            <span className={isLight ? "text-neutral-700" : "text-neutral-300"}>Live Count</span>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Card 2: Total Page Views */}
        <div className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden group ${cardCls}`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className={`uppercase tracking-wider ${textSub}`}>Total Page Views</span>
            <Eye className={`w-4 h-4 ${isLight ? "text-neutral-400 group-hover:text-black" : "text-neutral-500 group-hover:text-white"} transition-colors`} />
          </div>
          <div className="flex items-baseline justify-between">
            <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${textHeading}`}>
              {analytics.totalPageviews.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-500 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{analytics.pageviewsTrend}%</span>
            </div>
          </div>
          <div className={`text-[11px] font-mono flex items-center justify-between ${textSub}`}>
            <span>Ratio: {(analytics.totalPageviews / (analytics.totalVisitors || 1)).toFixed(1)}/visit</span>
            <span className={isLight ? "text-neutral-700" : "text-neutral-300"}>60 FPS</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-400" />
        </div>

        {/* Card 3: Avg Session Duration */}
        <div className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden group ${cardCls}`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className={`uppercase tracking-wider ${textSub}`}>Avg Session Duration</span>
            <Clock className={`w-4 h-4 ${isLight ? "text-neutral-400 group-hover:text-black" : "text-neutral-500 group-hover:text-white"} transition-colors`} />
          </div>
          <div className="flex items-baseline justify-between">
            <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${textHeading}`}>
              {analytics.avgSessionDuration}
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-500 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{analytics.sessionDurationTrend}%</span>
            </div>
          </div>
          <div className={`text-[11px] font-mono flex items-center justify-between ${textSub}`}>
            <span>High WebGL immersion</span>
            <span className={isLight ? "text-neutral-700" : "text-neutral-300"}>WebGL Engaged</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500" />
        </div>

        {/* Card 4: Bounce Rate */}
        <div className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden group ${cardCls}`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className={`uppercase tracking-wider ${textSub}`}>Bounce Rate</span>
            <Compass className={`w-4 h-4 ${isLight ? "text-neutral-400 group-hover:text-black" : "text-neutral-500 group-hover:text-white"} transition-colors`} />
          </div>
          <div className="flex items-baseline justify-between">
            <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${textHeading}`}>
              {analytics.bounceRate}%
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-500 font-semibold">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{analytics.bounceRateTrend}%</span>
            </div>
          </div>
          <div className={`text-[11px] font-mono flex items-center justify-between ${textSub}`}>
            <span>Industry avg: ~48%</span>
            <span className="text-emerald-500 font-semibold">OPTIMAL</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500" />
        </div>
      </div>

      {/* 3. Interactive Traffic Visualization Area Chart */}
      <div className={`p-6 rounded-2xl border space-y-6 ${cardCls}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className={`text-base font-bold font-mg12-bold ${textHeading}`}>
              Traffic Volume Over Time
            </h2>
            <p className={`text-xs font-mono ${textSub}`}>
              Telemetry curve mapped across {timeRange} interval
            </p>
          </div>

          {/* Metric Toggle via Studio Capsule Toggle */}
          <StudioSegmentedToggle<"both" | "visitors" | "pageviews">
            value={chartMetric}
            onChange={(val) => setChartMetric(val)}
            options={[
              { value: "both", label: "All Signals" },
              { value: "visitors", label: "Visitors Only" },
              { value: "pageviews", label: "Pageviews Only" },
            ]}
            isDark={!isLight}
            size="sm"
          />
        </div>

        {/* The Custom Interactive SVG Area Chart */}
        <div className="w-full">
          <AnalyticsAreaChart
            data={analytics.timeline}
            accentColor={accentColor}
            metric={chartMetric}
            height={280}
            isDark={!isLight}
          />
        </div>
      </div>

      {/* 4. Traffic Breakdown: Top Performing Projects vs Referral Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Portfolio Projects */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div className={`flex items-center justify-between pb-3 border-b ${borderSep}`}>
            <div>
              <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                Top Performing Projects
              </h3>
              <p className={`text-xs font-mono ${textSub}`}>
                Most engaged case studies by page views & inquiries
              </p>
            </div>
            <Link
              href="/admin/projects"
              className={`text-xs font-mono ${textSub} hover:${textHeading} flex items-center gap-1 transition-colors`}
            >
              <span>MANAGE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {analytics.topProjects.map((proj, idx) => (
              <div
                key={proj.slug}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-4 group ${subCardCls}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`font-mono text-xs ${textSub} w-5 shrink-0`}>
                    0{idx + 1}
                  </span>
                  <div className="truncate">
                    <h4 className={`text-xs font-semibold ${isLight ? "text-neutral-800 group-hover:text-black" : "text-neutral-200 group-hover:text-white"} transition-colors truncate`}>
                      {proj.title}
                    </h4>
                    <p className={`text-[11px] font-mono ${textSub} truncate`}>
                      {proj.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                  <div className="text-right">
                    <div className={`font-medium ${textHeading}`}>
                      {proj.views.toLocaleString()} <span className={`text-[10px] ${textSub}`}>VIEWS</span>
                    </div>
                    <div className={`text-[10px] ${textSub}`}>
                      avg {proj.avgDuration}
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] border border-emerald-500/20 font-bold">
                      {proj.inquiryClicks} Clicks
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Channels & Inbound Sources */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div className={`flex items-center justify-between pb-3 border-b ${borderSep}`}>
            <div>
              <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                Referral Channels & Audience Origin
              </h3>
              <p className={`text-xs font-mono ${textSub}`}>
                Inbound source traffic breakdown with growth indicators
              </p>
            </div>
            <span className={`text-[11px] font-mono ${textSub} uppercase`}>
              TOP 6 CHANNELS
            </span>
          </div>

          <TrafficBarChart data={analytics.referrers} accentColor={accentColor} />
        </div>
      </div>

      {/* 5. Device, Browser & Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown (Donut Chart) */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div>
            <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
              Device Classification
            </h3>
            <p className={`text-xs font-mono ${textSub}`}>
              Desktop vs Mobile WebGL viewport telemetry
            </p>
          </div>
          <div className="py-2">
            <DeviceDonutChart
              data={analytics.deviceBreakdown}
              accentColor={accentColor}
              size={130}
            />
          </div>
        </div>

        {/* Browser Stats */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div>
            <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
              Browser Engine
            </h3>
            <p className={`text-xs font-mono ${textSub}`}>
              Shader compatibility & client engine distribution
            </p>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {[
              { name: "Google Chrome", pct: analytics.browserBreakdown.chrome, color: accentColor },
              { name: "Apple Safari", pct: analytics.browserBreakdown.safari, color: isLight ? "#111111" : "#FFFFFF" },
              { name: "Microsoft Edge", pct: analytics.browserBreakdown.edge, color: "#3B82F6" },
              { name: "Mozilla Firefox", pct: analytics.browserBreakdown.firefox, color: "#F97316" },
              { name: "Other Browsers", pct: analytics.browserBreakdown.other, color: "#6B7280" },
            ].map((b) => (
              <div key={b.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={isLight ? "text-neutral-700" : "text-neutral-300"}>{b.name}</span>
                  <span className={`font-semibold ${textHeading}`}>{b.pct}%</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? "bg-neutral-200" : "bg-neutral-900"}`}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${b.pct}%`, backgroundColor: b.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                Geographic Presence
              </h3>
              <p className={`text-xs font-mono ${textSub}`}>
                Top audience territories & studio inquiry regions
              </p>
            </div>
            <Globe className={`w-4 h-4 ${textSub}`} />
          </div>

          <div className="space-y-2 font-mono text-xs">
            {analytics.geographicBreakdown.map((geo) => (
              <div
                key={geo.code}
                className={`flex items-center justify-between p-2 rounded-xl border ${subCardCls}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 text-[10px] font-bold ${textSub}`}>
                    {geo.code}
                  </span>
                  <span className={isLight ? "text-neutral-800" : "text-neutral-200"}>{geo.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={textSub}>{geo.visitors.toLocaleString()}</span>
                  <span className={`font-semibold w-8 text-right ${textHeading}`}>
                    {geo.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Quick Operational Shortcuts */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${cardCls}`}>
        <div>
          <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
            Studio CMS Quick Controls
          </h3>
          <p className={`text-xs font-mono mt-0.5 ${textSub}`}>
            Instantly adjust branding, publish new 3D case studies, or optimize generative AI indexing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <Link
            href="/admin/projects"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-colors ${
              isLight
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300 shadow-xs"
                : "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800"
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span>Manage Projects</span>
          </Link>

          <Link
            href="/admin/theme"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-colors ${
              isLight
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300 shadow-xs"
                : "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-blue-500" />
            <span>Theme & Logo Engine</span>
          </Link>

          <Link
            href="/admin/seo"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-colors ${
              isLight
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300 shadow-xs"
                : "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>GEO & AI Schema</span>
          </Link>

          <Link
            href="/admin/integrations"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-colors ${
              isLight
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300 shadow-xs"
                : "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800"
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tracking Hub</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
