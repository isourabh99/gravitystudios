"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, ProjectMediaItem } from "@/data/projectsData";
import ProjectMediaCard from "@/components/projects/ProjectMediaCard";

export interface ProjectMediaSliderProps {
  project: Project;
  isHovered: boolean;
  className?: string;
}

export default function ProjectMediaSlider({
  project,
  isHovered,
  className = "",
}: ProjectMediaSliderProps) {
  const mediaList = useMemo<ProjectMediaItem[]>(
    () => [project.video, ...project.images],
    [project.video, project.images]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 2 seconds (2000ms) when hovered
  useEffect(() => {
    if (!isHovered) {
      setActiveIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaList.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, mediaList.length]);

  const currentMedia = mediaList[activeIndex];

  return (
    <div
      className={`relative w-full aspect-16/10 overflow-hidden bg-neutral-900 border border-neutral-800 rounded-none shadow-2xl select-none ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMedia.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <ProjectMediaCard
            media={currentMedia}
            projectId={project.number}
            projectSlug={project.slug}
            className="w-full h-full border-none rounded-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Top Right: Progress Indicators (Auto 2s Slide Pagination) */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-1 bg-black/80 backdrop-blur-md rounded-none border border-white/10">
        <span className="font-mono text-[9px] text-neutral-300 mr-1 select-none">
          {String(activeIndex + 1).padStart(2, "0")}/{String(mediaList.length).padStart(2, "0")}
        </span>
        {mediaList.map((m, idx) => (
          <span
            key={m.id}
            className={`h-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              idx === activeIndex
                ? "w-4 bg-[#ED3327]"
                : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
