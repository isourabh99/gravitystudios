import React from "react";
import Navbar from "@/components/navbar/Navbar";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import Footer from "@/components/footer/Footer";
import { getProjects } from "@/lib/cms/store";

export const metadata = {
  title: "Projects | Gravity Studios — Benchmark of Digital Innovation",
  description:
    "Explore enterprise CRM platforms, luxury flagships, logistics telemetries, and WebGL case studies crafted by Gravity Studios.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#F4F4F0] text-neutral-900 flex flex-col font-sans selection:bg-[#ED3327] selection:text-white">
      <Navbar />
      <ProjectsIndex initialProjects={projects} />
      <Footer />
    </main>
  );
}
