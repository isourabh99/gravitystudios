import React from "react";
import { getSEOSettings, getGEOSettings, getThemeSettings } from "@/lib/cms/store";
import SeoGeoClient from "@/components/admin/SeoGeoClient";

export default async function AdminSeoPage() {
  const [seo, geo, theme] = await Promise.all([
    getSEOSettings(),
    getGEOSettings(),
    getThemeSettings(),
  ]);

  return (
    <SeoGeoClient
      initialSEO={seo}
      initialGEO={geo}
      accentColor={theme.accentColor}
    />
  );
}

