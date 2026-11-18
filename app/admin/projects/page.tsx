import React from "react";
import { getProjects, getThemeSettings } from "@/lib/cms/store";
import ProjectManagerClient from "@/components/admin/ProjectManagerClient";

export default async function AdminProjectsPage() {
  const [projects, theme] = await Promise.all([
    getProjects(),
    getThemeSettings(),
  ]);

  return (
    <ProjectManagerClient
      initialProjects={projects}
      accentColor={theme.accentColor}
    />
  );
}

