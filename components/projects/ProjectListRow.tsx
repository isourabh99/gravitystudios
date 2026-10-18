"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projectsData";
import ProjectMediaSlider from "@/components/projects/ProjectMediaSlider";
import CtaButton from "@/components/ui/CtaButton";

export interface ProjectListRowProps {
  project: Project;
  isActive?: boolean;
  onActivate?: () => void;
  onSelect?: (project: Project) => void;
}

export default function ProjectListRow({
  project,
  isActive = false,
  onActivate,
  onSelect,
}: ProjectListRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Active if hovered on desktop or active on mobile
  const isRowActive = isHovered || isActive;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isActive && onActivate) {
      onActivate();
    } else if (onSelect) {
      onSelect(project);
    }
  };

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onSelect) {
      onSelect(project);
    }
  };

  // Primary image thumbnail for mobile list row
  const primaryImage = project.images[0]?.src || project.video.poster || "/projects/sutra-web.jpg";

  return (
    <article
      onMouseEnter={() => {
        setIsHovered(true);
        if (onActivate) onActivate();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full border-b border-neutral-300 transition-colors duration-400 select-none overflow-hidden ${
        isRowActive ? "bg-black text-white" : "bg-transparent text-neutral-900"
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        onClick={handleClick}
        className="block w-full py-4 sm:py-5 lg:py-6 px-3 sm:px-6 lg:px-8 cursor-pointer"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          {/* Left Column: Number, Title, Subtitle, and Discover Button */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRowActive ? "lg:translate-x-3" : "translate-x-0"
            }`}
          >
            <div>
              {/* Number indicator with red arrow on active/hover + Category & Year for mobile */}
              <div className="flex items-center justify-between sm:justify-start gap-3 mb-1.5 select-none">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono font-bold text-xs sm:text-sm text-[#ED3327] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isRowActive
                        ? "opacity-100 translate-x-0 w-auto"
                        : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                    }`}
                  >
                    →
                  </span>
                  <span
                    className={`font-mono text-xs sm:text-sm font-medium tracking-wider transition-colors duration-300 ${
                      isRowActive ? "text-white" : "text-neutral-500"
                    }`}
                  >
                    {project.number}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors duration-300 ${
                      isRowActive ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {project.category}
                  </span>
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] transition-colors duration-300 ${
                      isRowActive ? "text-neutral-500" : "text-neutral-400"
                    }`}
                  >
                    · {project.year}
                  </span>
                </div>
              </div>

              {/* Title Row with Mobile Thumbnail when not active */}
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1 flex-1 min-w-0">
                  <h2
                    className={`font-mg12-regular text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] tracking-tight leading-snug transition-colors duration-400 ${
                      isRowActive ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {project.title}
                  </h2>

                  {/* Subtitle / Tagline */}
                  <p
                    className={`font-mg12-regular text-xs sm:text-sm font-light leading-relaxed tracking-wide transition-colors duration-400 max-w-xl line-clamp-2 ${
                      isRowActive ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {project.tagline}
                  </p>
                </div>

                {/* Mobile Preview Thumbnail: Visible on mobile when NOT active */}
                {!isActive && (
                  <div className="lg:hidden shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xs overflow-hidden border border-neutral-300 bg-neutral-900 shadow-sm">
                    <img
                      src={primaryImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Arrow hint for mobile list */}
                {isActive && (
                  <span className="lg:hidden font-mono text-base text-[#ED3327] shrink-0">
                    ↗
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Expanded Slide: Visible when row is ACTIVE on mobile */}
            {isActive && (
              <div className="lg:hidden mt-4 pt-3 border-t border-neutral-800 space-y-3">
                <div className="w-full overflow-hidden bg-neutral-900 border border-neutral-800">
                  <ProjectMediaSlider project={project} isHovered={true} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleDiscoverClick}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#ED3327] hover:text-white transition-colors cursor-pointer"
                  >
                    Discover ↗
                  </button>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase">
                    Tap for detail drawer
                  </span>
                </div>
              </div>
            )}

            {/* Desktop Discover Button Container: Revealed on hover */}
            <div className="hidden lg:block pt-3 overflow-hidden">
              <div
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRowActive
                    ? "translate-y-0 opacity-100 delay-75 pointer-events-auto"
                    : "translate-y-8 opacity-0 delay-0 pointer-events-none"
                }`}
              >
                <CtaButton
                  variant="white"
                  shape="square"
                  className="px-6 py-2.5 shadow-xl text-xs"
                >
                  Discover ↗
                </CtaButton>
              </div>
            </div>
          </div>

          {/* Right Column: Media Slider with Curtain reveal dropping on hover for Desktop */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-end overflow-hidden">
            <div
              className={`w-full max-w-sm lg:max-w-md transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isRowActive
                  ? "translate-y-0 opacity-100 delay-50 pointer-events-auto"
                  : "-translate-y-[120%] opacity-0 delay-0 pointer-events-none"
              }`}
            >
              <ProjectMediaSlider project={project} isHovered={isRowActive} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
