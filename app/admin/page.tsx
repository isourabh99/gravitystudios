import React from "react";
import { getThemeSettings } from "@/lib/cms/store";
import AnalyticsDashboardClient from "@/components/admin/AnalyticsDashboardClient";

export default async function AdminOverviewPage() {
  const theme = await getThemeSettings();

  return <AnalyticsDashboardClient theme={theme} />;
}

