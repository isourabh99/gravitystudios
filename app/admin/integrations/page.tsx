import React from "react";
import { getTrackingSettings, getThemeSettings } from "@/lib/cms/store";
import IntegrationsClient from "@/components/admin/IntegrationsClient";

export default async function AdminIntegrationsPage() {
  const [tracking, theme] = await Promise.all([
    getTrackingSettings(),
    getThemeSettings(),
  ]);

  return (
    <IntegrationsClient
      initialTracking={tracking}
      accentColor={theme.accentColor}
    />
  );
}

