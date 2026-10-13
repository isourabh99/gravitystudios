"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projectsData";
import ProjectMediaSlider from "@/components/projects/ProjectMediaSlider";
import CtaButton from "@/components/ui/CtaButton";

export interface ProjectListRowProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export default function ProjectListRow({ project, onSelect }: ProjectListRowProps) {
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
      className={`relative w-full border-b border-neutral-300 transition-colors duration-500 select-none overflow-hidden ${
        isHovered ? "bg-black text-white" : "bg-transparent text-neutral-900"
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        onClick={handleClick}
        className="block w-full py-8 sm:py-10 lg:py-12 px-4 sm:px-8 cursor-pointer"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Number, Title, Subtitle, and Discover Button */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? "translate-x-3 sm:translate-x-5" : "translate-x-0"
            }`}
          >
            <div>
              {/* Number indicator with red arrow on hover */}
              <div className="flex items-center gap-2 mb-2 select-none">
                <span
                  className={`font-mono font-bold text-sm text-[#ED3327] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHovered
                      ? "opacity-100 translate-x-0 w-auto"
                      : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  }`}
                >
                  →
                </span>
                <span
                  className={`font-mono text-xs sm:text-sm font-medium tracking-wider transition-colors duration-400 ${
                    isHovered ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {project.number}
                </span>
              </div>

              {/* Big Title: Smoothly transitions color */}
              <h2
                className={`font-mg12-regular text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] tracking-tight leading-tight transition-colors duration-500 ${
                  isHovered ? "text-white" : "text-neutral-900"
                }`}
              >
                {project.title}
              </h2>

              {/* Subtitle / Tagline */}
              <p
                className={`font-mg12-regular text-xs sm:text-sm font-light mt-2 leading-relaxed tracking-wide transition-colors duration-500 max-w-xl ${
                  isHovered ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {project.tagline}
              </p>
            </div>

            {/* Discover Button Container: Curtain reveal rising from bottom edge */}
            <div className="pt-6 sm:pt-8 overflow-hidden">
              <div
                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isHovered
                    ? "translate-y-0 opacity-100 delay-100 pointer-events-auto"
                    : "translate-y-[150%] opacity-0 delay-0 pointer-events-none"
                }`}
              >
                {/* White button by default, changes to red on button hover with CtaButton rolling text */}
                <CtaButton
                  variant="white"
                  shape="square"
                  className="px-8 py-3.5 shadow-xl text-xs sm:text-[13px]"
                >
                  Discover ↗
                </CtaButton>
              </div>
            </div>
          </div>

          {/* Right Column: Media Slider with Curtain reveal dropping from top edge */}
          <div className="lg:col-span-5 flex items-center justify-end overflow-hidden">
            <div
              className={`w-full max-w-md lg:max-w-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? "translate-y-0 opacity-100 delay-75 pointer-events-auto"
                  : "-translate-y-[150%] opacity-0 delay-0 pointer-events-none"
              }`}
            >
              <ProjectMediaSlider project={project} isHovered={isHovered} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
