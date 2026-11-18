"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminThemeContextType {
  adminTheme: "dark" | "light";
  isLight: boolean;
  toggleTheme: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  accentColor: string;
}

const AdminThemeContext = createContext<AdminThemeContextType>({
  adminTheme: "dark",
  isLight: false,
  toggleTheme: () => {},
  isSidebarCollapsed: false,
  toggleSidebar: () => {},
  accentColor: "#ED3327",
});

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}

export function AdminThemeProvider({
  children,
  initialTheme = "dark",
  accentColor = "#ED3327",
}: {
  children: React.ReactNode;
  initialTheme?: "dark" | "light";
  accentColor?: string;
}) {
  const [adminTheme, setAdminTheme] = useState<"dark" | "light">(initialTheme);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("gravity_admin_theme") as "dark" | "light";
      if (savedTheme === "dark" || savedTheme === "light") {
        setAdminTheme(savedTheme);
      }
      const savedCollapsed = localStorage.getItem("gravity_admin_sidebar_collapsed");
      if (savedCollapsed === "true") {
        setIsSidebarCollapsed(true);
      }
    } catch (_) {}
  }, []);

  const toggleTheme = () => {
    const next = adminTheme === "dark" ? "light" : "dark";
    setAdminTheme(next);
    try {
      localStorage.setItem("gravity_admin_theme", next);
    } catch (_) {}
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("gravity_admin_sidebar_collapsed", String(next));
      } catch (_) {}
      return next;
    });
  };

  return (
    <AdminThemeContext.Provider
      value={{
        adminTheme,
        isLight: adminTheme === "light",
        toggleTheme,
        isSidebarCollapsed,
        toggleSidebar,
        accentColor,
      }}
    >
      {children}
    </AdminThemeContext.Provider>
  );
}

