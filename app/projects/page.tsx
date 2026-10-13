"use client";

import React from "react";
import Navbar from "@/components/navbar/Navbar";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import Footer from "@/components/footer/Footer";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-neutral-900 flex flex-col font-sans selection:bg-[#ED3327] selection:text-white">
      <Navbar />
      <ProjectsIndex />
      <Footer />
    </main>
  );
}
