"use client";

import React, { useState, useRef } from "react";
import { ProjectMediaItem } from "@/data/projectsData";

export interface ProjectMediaCardProps {
  media: ProjectMediaItem;
  projectId?: string;
  projectSlug?: string;
  className?: string;
  priority?: boolean;
}

export default function ProjectMediaCard(props: ProjectMediaCardProps) {
  const { media, className = "", priority = false } = props;
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-xs select-none aspect-16/10 transition-all duration-300 hover:border-neutral-600 ${className}`}
    >
      {/* 1. MEDIA DISPLAY: Video or Real High-Res Image */}
      {media.type === "video" && !videoError ? (
        <div className="relative w-full h-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={media.src}
            poster={media.poster}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />

          {/* Video Status Overlay Pill */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-xs border border-white/10 text-[9px] font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327] animate-pulse" />
            <span>VIDEO</span>
          </div>

          {/* Quick Play/Pause on hover */}
          <button
            type="button"
            onClick={togglePlay}
            className="absolute bottom-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-black/80 hover:bg-[#ED3327] text-white flex items-center justify-center text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
        </div>
      ) : (
        /* Real High-Resolution Photographic/3D Project Asset */
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-neutral-950">
          <img
            src={media.type === "video" ? (media.poster || media.src) : media.src}
            alt={media.alt}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />

          {/* Tag Pill */}
          {media.tag && (
            <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 bg-black/75 backdrop-blur-xs rounded-xs border border-white/10 text-[9px] font-mono text-neutral-300">
              {media.tag}
            </div>
          )}
        </div>
      )}

      {/* Subtle Caption Bar at bottom on hover */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between text-[9px] font-mono text-neutral-300 pointer-events-none">
        <span className="truncate pr-2">{media.caption}</span>
        <span className="text-[#ED3327] shrink-0 font-bold">↗</span>
      </div>
    </div>
  );
}
