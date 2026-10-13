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
      className={`relative w-full h-[430px] sm:h-[450px] select-none transition-all duration-500 overflow-hidden border ${
        isHovered
          ? "bg-black text-white border-neutral-800 shadow-2xl"
          : "bg-white text-neutral-900 border-neutral-300"
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        onClick={handleClick}
        className="block w-full h-full p-5 sm:p-6 flex flex-col justify-between cursor-pointer"
      >
        {/* Top Section: Number/Category and Media Slider with curtain reveal from top */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[#ED3327] font-mono font-bold text-xs transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isHovered
                    ? "opacity-100 translate-x-0 w-auto"
                    : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                }`}
              >
                →
              </span>
              <span
                className={`font-mono text-xs font-medium tracking-wider transition-colors duration-400 ${
                  isHovered ? "text-white" : "text-neutral-400"
                }`}
              >
                {project.number}
              </span>
            </div>
            <span
              className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-400 ${
                isHovered ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {project.category}
            </span>
          </div>

          {/* Media Slider: Curtain reveal dropping from top edge */}
          <div className="overflow-hidden">
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? "translate-y-0 opacity-100 delay-75 pointer-events-auto"
                  : "-translate-y-[150%] opacity-0 delay-0 pointer-events-none"
              }`}
            >
              <ProjectMediaSlider project={project} isHovered={isHovered} />
            </div>
          </div>
        </div>

        {/* Middle Section: Title & Subtitle with subtle rightward nudge */}
        <div
          className={`space-y-1.5 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered ? "translate-x-2" : "translate-x-0"
          }`}
        >
          <h2
            className={`font-mg12-regular text-xl sm:text-2xl tracking-tight leading-snug line-clamp-1 transition-colors duration-400 ${
              isHovered ? "text-white" : "text-neutral-900"
            }`}
          >
            {project.title}
          </h2>
          <p
            className={`font-mg12-regular text-xs font-light line-clamp-2 transition-colors duration-400 ${
              isHovered ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {project.tagline}
          </p>
        </div>

        {/* Bottom Section: Discover Button with curtain reveal rising from bottom */}
        <div className="pt-3 border-t border-neutral-200/40 flex items-center justify-between overflow-hidden">
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered
                ? "translate-y-0 opacity-100 delay-100 pointer-events-auto"
                : "translate-y-[150%] opacity-0 delay-0 pointer-events-none"
            }`}
          >
            <CtaButton
              variant="white"
              shape="square"
              className="px-5 py-2.5 text-xs shadow-md"
            >
              Discover ↗
            </CtaButton>
          </div>

          <span
            className={`font-mono text-[11px] transition-colors duration-400 ${
              isHovered ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {project.year}
          </span>
        </div>
      </Link>
    </article>
  );
}
