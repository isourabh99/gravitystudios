import React from "react";
import { getDatabaseConfig, getCMSStore, getThemeSettings } from "@/lib/cms/store";
import DatabaseConfigClient from "@/components/admin/DatabaseConfigClient";

export default async function AdminDatabasePage() {
  const [dbConfig, fullStore, theme] = await Promise.all([
    getDatabaseConfig(),
    getCMSStore(),
    getThemeSettings(),
  ]);

  return (
    <DatabaseConfigClient
      initialConfig={dbConfig}
      fullStoreData={fullStore}
      accentColor={theme.accentColor}
    />
  );
}

