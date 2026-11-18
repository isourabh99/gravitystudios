import React from "react";
import { getThemeSettings, getBrandingSettings } from "@/lib/cms/store";
import ThemeBrandingClient from "@/components/admin/ThemeBrandingClient";

export default async function AdminThemePage() {
  const [theme, branding] = await Promise.all([
    getThemeSettings(),
    getBrandingSettings(),
  ]);

  return <ThemeBrandingClient initialTheme={theme} initialBranding={branding} />;
}

