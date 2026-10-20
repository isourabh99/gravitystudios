"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projectsData";
import ProjectMediaSlider from "@/components/projects/ProjectMediaSlider";
import CtaButton from "@/components/ui/CtaButton";

export interface ProjectGridCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export default function ProjectGridCard({ project, onSelect }: ProjectGridCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full h-auto min-h-[440px] select-none transition-all duration-300 overflow-hidden bg-black text-white border border-neutral-800 shadow-xl"
    >
      <Link
        href={`/projects/${project.slug}`}
        onClick={handleClick}
        className="block w-full h-full p-4 sm:p-5 flex flex-col justify-between cursor-pointer"
      >
        {/* Top Header: Number and Category */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-medium tracking-wider text-neutral-400">
              {project.number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
              {project.category}
            </span>
          </div>

          {/* Media Slider: VISIBLE BY DEFAULT */}
          <div className="w-full overflow-hidden bg-neutral-900 border border-neutral-800 mb-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]">
            <ProjectMediaSlider project={project} isHovered={isHovered} />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <h2 className="font-mg12-regular text-lg sm:text-xl font-medium tracking-tight leading-snug line-clamp-1 text-white">
              {project.title}
            </h2>
            <p className="font-mg12-regular text-xs font-light line-clamp-2 text-neutral-400">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Bottom Section: Discover Button & Year */}
        {/* On mobile: Discover Button is always visible! On desktop: reveals smoothly on hover */}
        <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between">
          <div className="flex items-center">
            {/* Desktop: Curtain reveal on hover */}
            <div
              className={`hidden sm:block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? "translate-y-0 opacity-100 pointer-events-auto"
                  : "translate-y-2 opacity-0 pointer-events-none"
              }`}
            >
              <CtaButton
                variant="white"
                shape="square"
                className="!px-4 !py-2 !text-xs !font-mono !tracking-wider shadow-md"
              >
                Discover ↗
              </CtaButton>
            </div>

            {/* Mobile: Always visible button so mobile users have clear action */}
            <div className="sm:hidden block">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black font-mono text-[11px] font-medium tracking-wider">
                Discover ↗
              </span>
            </div>
          </div>

          <span className="font-mono text-[11px] text-neutral-400">
            {project.year}
          </span>
        </div>
      </Link>
    </article>
  );
}
