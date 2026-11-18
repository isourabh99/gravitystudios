"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, ExternalLink, Menu, X, Terminal } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";
import ThemeToggleSwitch from "@/components/ui/StudioToggle";

interface AdminHeaderProps {
  accentColor?: string;
  adminTheme?: "dark" | "light";
  onToggleTheme?: () => void;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function AdminHeader({
  accentColor = "#ED3327",
  adminTheme = "dark",
  onToggleTheme,
  onToggleMobileMenu,
  isMobileMenuOpen = false,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const [timeStr, setTimeStr] = useState<string>("");
  const [utcStr, setUtcStr] = useState<string>("");

  const isLight = adminTheme === "light";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setUtcStr(
        now.toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    if (pathname === "/admin") return "Overview & Analytics";
    if (pathname.startsWith("/admin/theme")) return "Theme & Logo Engine";
    if (pathname.startsWith("/admin/projects")) return "Project Case Studies CMS";
    if (pathname.startsWith("/admin/pages/home")) return "Page Editor: Home";
    if (pathname.startsWith("/admin/pages/projects")) return "Page Editor: Projects";
    if (pathname.startsWith("/admin/pages/services")) return "Page Editor: Services";
    if (pathname.startsWith("/admin/pages/contact")) return "Page Editor: Contact";
    if (pathname.startsWith("/admin/pages/studio")) return "Page Editor: Studio";
    if (pathname.startsWith("/admin/pages/news")) return "Page Editor: News";
    if (pathname.startsWith("/admin/pages")) return "Pages Content Manager";
    if (pathname.startsWith("/admin/seo")) return "SEO & GEO AI Center";
    if (pathname.startsWith("/admin/integrations")) return "Tracking & Pixels";
    if (pathname.startsWith("/admin/database")) return "MongoDB Atlas Database";
    return "Studio Control";
  };

  return (
    <header
      className={`h-16 border-b sticky top-0 z-30 px-6 sm:px-12 flex items-center justify-between select-none transition-colors duration-200 ${
        isLight
          ? "bg-[#FFFFFF]/90 border-neutral-200 text-neutral-900 backdrop-blur-md"
          : "bg-[#000000]/80 border-neutral-900 text-neutral-100 backdrop-blur-md"
      }`}
    >
      {/* Left: Mobile Menu Trigger + Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className={`md:hidden p-2 rounded-lg border ${
              isLight
                ? "bg-neutral-100 border-neutral-300 text-black"
                : "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-neutral-500 hidden sm:inline">GRAVITY_STUDIO /</span>
          <span className={`font-semibold tracking-wide uppercase ${isLight ? "text-black" : "text-white"}`}>
            <ScrambleText text={getPageTitle()} hoverColor={accentColor} interactive={true} />
          </span>
        </div>
      </div>

      {/* Right: Studio Clock, Theme Toggle & Live Site Link */}
      <div className="flex items-center gap-3 sm:gap-5 font-mono text-xs">
        {/* Studio Real-time Clock */}
        <div
          className={`hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg border ${
            isLight
              ? "bg-neutral-100 border-neutral-200 text-neutral-600"
              : "bg-neutral-950 border-neutral-900 text-neutral-400"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span className={isLight ? "text-neutral-900 font-bold" : "text-neutral-200 font-semibold"}>
              {timeStr || "--:--:--"}
            </span>
            <span className="text-[10px] text-neutral-500">LOCAL</span>
          </div>
          <div className={`h-3 w-px ${isLight ? "bg-neutral-300" : "bg-neutral-800"}`} />
          <div>
            <span className={isLight ? "text-neutral-700" : "text-neutral-300"}>{utcStr || "--:--"}</span>
            <span className="text-[10px] text-neutral-500 ml-1">UTC</span>
          </div>
        </div>

        {/* Reusable Dark / Light Studio Toggle */}
        {onToggleTheme && (
          <ThemeToggleSwitch
            isDark={!isLight}
            onToggle={onToggleTheme}
            size="sm"
          />
        )}

        {/* MongoDB Pulse */}
        <div
          className={`hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11px] ${
            isLight
              ? "bg-neutral-100 border-neutral-200 text-neutral-700"
              : "bg-neutral-900/80 border-neutral-800 text-neutral-300"
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>MONGODB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* View Live */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            isLight
              ? "bg-neutral-900 text-white hover:bg-black border-neutral-900"
              : "bg-neutral-900 text-neutral-300 hover:text-white border-neutral-800 hover:bg-neutral-800"
          }`}
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
}
