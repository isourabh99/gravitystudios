"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { AdminThemeProvider, useAdminTheme } from "./AdminThemeContext";

interface AdminShellClientProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  accentColor?: string;
  initialAdminTheme?: "dark" | "light";
  brandName?: string;
}

function AdminShellInner({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { adminTheme, isLight, toggleTheme, isSidebarCollapsed, toggleSidebar, accentColor } =
    useAdminTheme();

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="min-h-screen w-full bg-[#000000]">{children}</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-6 bg-[#000000]">
        <div className="max-w-md w-full p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-neutral-400 font-mono">
            Access to Gravity Studios Admin & CMS requires master verification credentials.
          </p>
          <a
            href="/admin/login"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-colors"
          >
            ENTER PASSCODE
          </a>
        </div>
      </main>
    );
  }

  return (
    <div
      className={`flex min-h-screen transition-colors duration-200 relative ${
        isLight ? "bg-[#F7F7F5] text-neutral-900" : "bg-[#000000] text-[#F4F4F0]"
      }`}
    >
      {/* Subtle Studio Ambient Gradient in Dark Mode */}
      {!isLight && (
        <div
          className="fixed inset-0 pointer-events-none opacity-25 z-0"
          style={{
            backgroundImage: `radial-gradient(circle 800px at 15% 15%, ${accentColor}18, transparent 70%), radial-gradient(circle 600px at 85% 85%, #3B82F610, transparent 70%)`,
          }}
        />
      )}

      {/* Desktop Sidebar (Collapsible) */}
      <div className="hidden md:block shrink-0 relative z-40">
        <AdminSidebar
          accentColor={accentColor}
          adminTheme={adminTheme}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 h-full">
            <AdminSidebar
              accentColor={accentColor}
              adminTheme={adminTheme}
              isCollapsed={false}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <AdminHeader
          accentColor={accentColor}
          adminTheme={adminTheme}
          onToggleTheme={toggleTheme}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          isMobileMenuOpen={mobileMenuOpen}
        />
        <main className="flex-1 px-6 sm:px-12 py-8 overflow-y-auto">
          <div className="max-w-8xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function AdminShellClient({
  children,
  isAuthenticated,
  accentColor = "#ED3327",
  initialAdminTheme = "dark",
}: AdminShellClientProps) {
  return (
    <AdminThemeProvider initialTheme={initialAdminTheme} accentColor={accentColor}>
      <AdminShellInner isAuthenticated={isAuthenticated}>
        {children}
      </AdminShellInner>
    </AdminThemeProvider>
  );
}
