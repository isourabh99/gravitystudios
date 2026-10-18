"use client";

import React, { useState, useRef } from "react";
import { PROJECTS, Project } from "@/data/projectsData";
import ProjectsHeroBanner from "@/components/projects/ProjectsHeroBanner";
import ViewModeToggle from "@/components/projects/ViewModeToggle";
import ProjectListRow from "@/components/projects/ProjectListRow";
import ProjectGridCard from "@/components/projects/ProjectGridCard";
import ProjectDetailDrawer from "@/components/projects/ProjectDetailDrawer";
import CtaButton from "@/components/ui/CtaButton";

export default function ProjectsIndex() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectNumber, setActiveProjectNumber] = useState<string>("01");
  const indexSectionRef = useRef<HTMLDivElement>(null);

  const scrollToExplore = () => {
    if (indexSectionRef.current) {
      indexSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* 1. 100VH DARK HERO BANNER (Vector dots, live clock, scramble headline, 3D wave video slides) */}
      <ProjectsHeroBanner
        onSelectProject={setSelectedProject}
        onExploreClick={scrollToExplore}
      />

      {/* 2. PROJECTS INDEX SECTION */}
      <section
        ref={indexSectionRef}
        id="projects-index"
        className="relative w-full bg-[#F4F4F0] text-neutral-900 px-6 sm:px-12 pt-16 sm:pt-20 pb-24 sm:pb-32 select-none font-sans"
      >
        <div className="max-w-8xl mx-auto w-full">
          {/* CONTROL BAR & VIEW SWITCHER (List vs Grid) */}
          <div className="py-6 sm:py-8 flex items-center justify-between border-b border-neutral-300">
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.2em] text-neutral-500 uppercase">
              INDEX · 08 PROJECTS
            </span>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider select-none">
                VIEW
              </span>

              {/* Reusable Sharp Animated ViewModeToggle */}
              <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>

        {/* 3. PROJECTS DISPLAY: LIST OR GRID */}
        {viewMode === "list" ? (
          /* ================= LIST VIEW (Matches Junca Screenshots) ================= */
          <div className="divide-y divide-neutral-300 border-b border-neutral-300">
            {PROJECTS.map((project) => (
              <ProjectListRow
                key={project.number}
                project={project}
                isActive={activeProjectNumber === project.number}
                onActivate={() => setActiveProjectNumber(project.number)}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          /* ================= GRID VIEW ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 py-10 border-b border-neutral-300">
            {PROJECTS.map((project) => (
              <ProjectGridCard
                key={project.number}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        )}

        {/* 4. BOTTOM CALL TO ACTION WITH CTABUTTON */}
        <div className="pt-20 sm:pt-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#ED3327] uppercase">
              NEXT STEPS
            </span>
            <h2 className="font-mg12-regular text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight leading-tight">
              Ready to elevate your digital presence?
            </h2>
            <p className="font-mg12-regular text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              We take on a limited number of projects per quarter to guarantee
              uncompromising craft and partner-level attention.
            </p>
          </div>

          <div className="shrink-0">
            <CtaButton href="/contact" variant="brand">
              Discuss a Project ↗
            </CtaButton>
          </div>
        </div>

        {/* 5. SIDE DRAWER PROJECT DETAIL (Opens from right side on project click) */}
        <ProjectDetailDrawer
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  </div>
);
}

