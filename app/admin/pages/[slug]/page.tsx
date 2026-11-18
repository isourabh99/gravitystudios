import React from "react";
import { getPagesConfig, getThemeSettings } from "@/lib/cms/store";
import SinglePageEditorClient from "@/components/admin/SinglePageEditorClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminSinglePageEditor({ params }: PageProps) {
  const { slug } = await params;
  const [pages, theme] = await Promise.all([
    getPagesConfig(),
    getThemeSettings(),
  ]);

  return (
    <SinglePageEditorClient
      slug={slug}
      initialPages={pages}
      accentColor={theme.accentColor}
    />
  );
}

