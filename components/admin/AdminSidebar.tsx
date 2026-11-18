"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  FolderGit2,
  Newspaper,
  FileText,
  Sparkles,
  Radio,
  Database,
  ArrowUpRight,
  LogOut,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import GravityLogo from "@/components/logo/GravityLogo";
import ScrambleText from "@/components/ui/ScrambleText";
import { logoutAction } from "@/app/admin/actions";

interface AdminSidebarProps {
  accentColor?: string;
  adminTheme?: "dark" | "light";
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function AdminSidebar({
  accentColor = "#ED3327",
  adminTheme = "dark",
  isCollapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(
    pathname.startsWith("/admin/pages")
  );

  const isLight = adminTheme === "light";

  const corePages = [
    { name: "Home Page", slug: "home", href: "/admin/pages/home" },
    { name: "Projects Page", slug: "projects", href: "/admin/pages/projects" },
    { name: "Services Page", slug: "services", href: "/admin/pages/services" },
    { name: "Contact Page", slug: "contact", href: "/admin/pages/contact" },
    { name: "Studio Page", slug: "studio", href: "/admin/pages/studio" },
    { name: "News Page", slug: "news", href: "/admin/pages/news" },
  ];

  const mainNavItems = [
    {
      name: "Analytics & Traffic",
      href: "/admin",
      icon: LayoutDashboard,
      badge: "LIVE",
    },
    {
      name: "Theme & Branding",
      href: "/admin/theme",
      icon: Palette,
      badge: "LOGO",
    },
    {
      name: "Projects CMS",
      href: "/admin/projects",
      icon: FolderGit2,
      badge: "D&D",
    },
    {
      name: "Blogs & News CMS",
      href: "/admin/blogs",
      icon: Newspaper,
      badge: "CMS",
    },
  ];

  const secondaryNavItems = [
    {
      name: "SEO & GEO Center",
      href: "/admin/seo",
      icon: Sparkles,
      badge: "AI READY",
    },
    {
      name: "Tracking & Pixels",
      href: "/admin/integrations",
      icon: Radio,
      badge: null,
    },
    {
      name: "MongoDB Atlas",
      href: "/admin/database",
      icon: Database,
      badge: "CLOUD",
    },
  ];

  return (
    <aside
      className={`border-r flex flex-col justify-between h-screen sticky top-0 select-none z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64 sm:w-72"
      } ${
        isLight
          ? "bg-[#FFFFFF] border-neutral-200 text-neutral-900 shadow-sm"
          : "bg-[#060608] border-[#1C1C20] text-neutral-100"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Header: Logo + Collapse Button */}
        <div
          className={`p-4 sm:p-5 border-b transition-colors duration-200 ${
            isLight
              ? "border-neutral-200 bg-neutral-50/70"
              : "border-[#1C1C20] bg-[#040405]"
          }`}
        >
          <div className="flex items-center justify-between">
            {!isCollapsed ? (
              <div className="overflow-hidden">
                <GravityLogo showLink={false} isDark={isLight} textSize="text-xl" />
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <span
                  className="font-mg12-bold text-xl font-bold tracking-tight cursor-default"
                  style={{ color: accentColor }}
                >
                  G.
                </span>
              </div>
            )}

            {/* Desktop Sidebar Collapse Toggle */}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                className={`hidden md:flex p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isLight
                    ? "bg-white border-neutral-300 text-neutral-600 hover:text-black hover:bg-neutral-100"
                    : "bg-[#0C0C0E] border-[#222226] text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-3.5 h-3.5" />
                ) : (
                  <PanelLeftClose className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          {/* Database Status indicator (MongoDB only!) */}
          {!isCollapsed ? (
            <div
              className={`mt-4 px-3 py-1.5 rounded-xl border flex items-center justify-between text-[11px] font-mono transition-colors ${
                isLight
                  ? "bg-neutral-100/80 border-neutral-200 text-neutral-600"
                  : "bg-[#0A0A0C] border-[#1C1C20] text-neutral-400"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>DB ENGINE:</span>
              </div>
              <span className={`font-semibold tracking-wide ${isLight ? "text-neutral-900" : "text-white"}`}>
                MONGODB ATLAS
              </span>
            </div>
          ) : (
            <div
              className="mt-3 flex justify-center"
              title="MongoDB Atlas Connected"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-4 ring-emerald-500/10" />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] no-scrollbar">
          {!isCollapsed && (
            <div
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] ${
                isLight ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              STUDIO CONTROL
            </div>
          )}

          {/* 1. Main Direct Links */}
          {mainNavItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center ${
                  isCollapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-2.5"
                } rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? isLight
                      ? "bg-neutral-100 text-black border border-neutral-300 font-bold shadow-xs"
                      : "bg-[#141418] text-white border border-[#26262B] font-bold shadow-xs"
                    : isLight
                    ? "text-neutral-600 hover:text-black hover:bg-neutral-100/70"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
                  <Icon
                    className="w-4 h-4 shrink-0 transition-colors"
                    style={isActive ? { color: accentColor } : {}}
                  />
                  {!isCollapsed && (
                    <span className="truncate">
                      <ScrambleText text={item.name} hoverColor={accentColor} interactive={true} />
                    </span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded tracking-wider ${
                      isActive
                        ? isLight
                          ? "bg-black text-white"
                          : "bg-white/10 text-white"
                        : isLight
                        ? "bg-neutral-200 text-neutral-600"
                        : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* 2. PAGES DROPDOWN (Expandable in full view, direct link in collapsed) */}
          <div className="pt-1">
            {!isCollapsed ? (
              <>
                <button
                  type="button"
                  onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    pathname.startsWith("/admin/pages")
                      ? isLight
                        ? "bg-neutral-100 text-black border border-neutral-300 font-bold shadow-xs"
                        : "bg-[#141418] text-white border border-[#26262B] font-bold shadow-xs"
                      : isLight
                      ? "text-neutral-600 hover:text-black hover:bg-neutral-100/70"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText
                      className="w-4 h-4 shrink-0"
                      style={pathname.startsWith("/admin/pages") ? { color: accentColor } : {}}
                    />
                    <span>
                      <ScrambleText text="Pages CMS" hoverColor={accentColor} interactive={true} />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      6 PAGES
                    </span>
                    {pagesDropdownOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </div>
                </button>

                {/* Dropdown Items */}
                {pagesDropdownOpen && (
                  <div className="pl-6 pr-1 pt-1 pb-2 space-y-1">
                    {corePages.map((page) => {
                      const isPageActive = pathname === page.href;
                      return (
                        <Link
                          key={page.slug}
                          href={page.href}
                          className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                            isPageActive
                              ? isLight
                                ? "bg-neutral-200 text-black font-bold"
                                : "bg-neutral-800 text-white font-bold"
                              : isLight
                              ? "text-neutral-500 hover:text-black hover:bg-neutral-100"
                              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: isPageActive ? accentColor : "#666666" }}
                            />
                            {page.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            /{page.slug === "home" ? "" : page.slug}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/admin/pages/home"
                title="Pages CMS"
                className={`flex items-center justify-center px-2 py-3 rounded-xl text-xs font-medium transition-all ${
                  pathname.startsWith("/admin/pages")
                    ? isLight
                      ? "bg-neutral-100 text-black border border-neutral-300 font-bold"
                      : "bg-[#141418] text-white border border-[#26262B] font-bold"
                    : isLight
                    ? "text-neutral-600 hover:text-black hover:bg-neutral-100/70"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                }`}
              >
                <FileText
                  className="w-4 h-4"
                  style={pathname.startsWith("/admin/pages") ? { color: accentColor } : {}}
                />
              </Link>
            )}
          </div>

          {/* 3. Secondary Navigation */}
          {secondaryNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center ${
                  isCollapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-2.5"
                } rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? isLight
                      ? "bg-neutral-100 text-black border border-neutral-300 font-bold shadow-xs"
                      : "bg-[#141418] text-white border border-[#26262B] font-bold shadow-xs"
                    : isLight
                    ? "text-neutral-600 hover:text-black hover:bg-neutral-100/70"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
                  <Icon
                    className="w-4 h-4 shrink-0 transition-colors"
                    style={isActive ? { color: accentColor } : {}}
                  />
                  {!isCollapsed && (
                    <span className="truncate">
                      <ScrambleText text={item.name} hoverColor={accentColor} interactive={true} />
                    </span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded tracking-wider ${
                      isActive
                        ? isLight
                          ? "bg-black text-white"
                          : "bg-white/10 text-white"
                        : isLight
                        ? "bg-neutral-200 text-neutral-600"
                        : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div
        className={`p-3 sm:p-4 border-t space-y-2 transition-colors ${
          isLight ? "bg-neutral-50/80 border-neutral-200" : "bg-[#040405] border-[#1C1C20]"
        }`}
      >
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="View Live Portfolio"
          className={`flex items-center ${
            isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2"
          } rounded-xl text-xs font-mono transition-colors ${
            isLight
              ? "text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 shadow-xs"
              : "text-neutral-400 hover:text-white bg-[#0A0A0C] hover:bg-[#121215] border border-[#1C1C20]"
          }`}
        >
          {!isCollapsed && <span>VIEW LIVE SITE</span>}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            title="Exit Studio Admin"
            className={`flex items-center ${
              isCollapsed ? "justify-center p-2.5" : "justify-center gap-2 px-3 py-2"
            } w-full rounded-xl text-xs font-mono text-neutral-500 hover:text-rose-500 hover:bg-rose-500/10 border border-transparent transition-colors cursor-pointer`}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!isCollapsed && <span>EXIT ADMIN</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
