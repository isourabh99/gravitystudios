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

export default function ProjectMediaCard({
  media,
  projectId: _projectId,
  projectSlug: _projectSlug,
  className = "",
}: ProjectMediaCardProps) {
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
      {/* 1. MEDIA DISPLAY: Video or Visual Placeholder */}
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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
        /* Rich SVG / Graphic Bespoke Visual Placeholder */
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <ProjectVisualIllustration mediaId={media.id} />

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

/**
 * Dedicated visual illustrations matching the Junca screenshots
 */
function ProjectVisualIllustration({ mediaId }: { mediaId: string }) {
  // 1. Hylight Image 1: 3D wireframe blimp with radar cone on grid (Screenshot 1 center)
  if (mediaId === "hylight-img-1") {
    return (
      <div className="w-full h-full bg-[#0d0e12] flex flex-col items-center justify-center relative overflow-hidden p-3">
        {/* Wireframe Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2e3a18_1px,transparent_1px),linear-gradient(to_bottom,#2a2e3a18_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* 3D Blimp & Projection Beam */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Wireframe Airship */}
          <div className="relative w-28 sm:w-36 h-8 border border-neutral-400 rounded-full flex items-center justify-between px-3 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <div className="w-2 h-2 rounded-full border border-[#ED3327]" />
            <div className="w-16 h-[1px] bg-neutral-600" />
            <div className="flex gap-0.5">
              <span className="w-1 h-3 border-r border-neutral-400" />
              <span className="w-1 h-3 border-l border-neutral-400" />
            </div>
          </div>
          {/* Radar Projection Beam down */}
          <div className="w-0 h-0 border-x-14 border-x-transparent border-t-28 border-t-white/20 mt-1" />
          {/* Substation Ground Target */}
          <div className="flex gap-4 -mt-1 opacity-70">
            <span className="w-3 h-5 border-t border-x border-neutral-500" />
            <span className="w-3 h-5 border-t border-x border-[#ED3327]" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Hylight Image 2: Hydrogen blimp soaring above alpine ridges (Screenshot 1 right)
  if (mediaId === "hylight-img-2") {
    return (
      <div className="w-full h-full bg-[#1a2d36] relative overflow-hidden flex flex-col justify-between p-3">
        {/* Sky gradient & mountain silhouettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#87b3ca] via-[#c9af92] to-[#2b271d] opacity-90" />
        
        {/* Distant mountain ridge */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-[#182618] clip-path-polygon" />
        
        {/* Floating Blimp graphic */}
        <div className="relative z-10 w-24 h-12 bg-gradient-to-r from-neutral-200 via-white to-neutral-300 rounded-full shadow-lg flex items-center justify-center p-1 border border-white/60 ml-2 mt-2">
          <span className="text-[7px] font-mono font-bold text-neutral-800 tracking-wider">HyLight</span>
        </div>

        <div className="relative z-10 text-right text-white">
          <span className="block font-mg12-bold text-xs tracking-tight">HyLight</span>
          <span className="block text-[8px] font-mono text-white/80">Zero-Emission Aerial Inspection</span>
        </div>
      </div>
    );
  }

  // 3. Artefact Image 1: Mossy rock / organic terrain (Screenshot 2 center)
  if (mediaId === "artefact-img-1") {
    return (
      <div className="w-full h-full bg-[#1c1815] relative overflow-hidden flex flex-col justify-end p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#3d4826_0%,transparent_60%),radial-gradient(circle_at_80%_70%,#4a2f1b_0%,#110f0e_80%)]" />
        
        {/* Texture detail */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:8px_8px]" />

        <div className="relative z-10 text-left">
          <span className="font-mg12-regular text-xs text-neutral-200 block">
            exploring unknown areas
          </span>
          <span className="font-mono text-[8px] text-neutral-400 block mt-0.5">
            GEOLOGICAL TERRAIN LAB
          </span>
        </div>
      </div>
    );
  }

  // 4. Artefact Image 2: Fast kinetic blur walking in nature (Screenshot 2 right)
  if (mediaId === "artefact-img-2") {
    return (
      <div className="w-full h-full bg-[#1b2219] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#23311f_0%,#465839_50%,#1e2b1b_100%)] blur-md scale-110" />
        <div className="relative z-10 text-center px-4">
          <span className="font-mg12-regular text-xs text-white/90 italic tracking-wider block">
            exploring unknown areas
          </span>
        </div>
      </div>
    );
  }

  // 5. Une Autre Île Image 1: Concentric typography ripple (Screenshot 2 bottom center)
  if (mediaId === "uneautreile-img-1") {
    return (
      <div className="w-full h-full bg-[#080808] flex items-center justify-center relative overflow-hidden p-3">
        {/* Concentric circles ripple */}
        <div className="absolute w-36 h-36 rounded-full border border-neutral-700/60 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-neutral-600/60 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border border-[#ED3327]/60 flex items-center justify-center shadow-[0_0_20px_rgba(237,51,39,0.2)]">
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
        </div>
        <span className="absolute bottom-2.5 left-3 text-[8px] font-mono text-neutral-400">
          get started with us
        </span>
      </div>
    );
  }

  // 6. Une Autre Île Image 2: Haute couture ruby red sculpture (Screenshot 2 bottom right)
  if (mediaId === "uneautreile-img-2") {
    return (
      <div className="w-full h-full bg-[#120505] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#200808] via-[#ED3327]/30 to-[#120505]" />
        <div className="relative z-10 w-16 h-28 bg-gradient-to-b from-[#ED3327] to-[#450a0a] rounded-t-full shadow-[0_0_30px_rgba(237,51,39,0.35)] flex flex-col items-center justify-between py-2 border border-white/20">
          <span className="w-1 h-4 bg-white/60 rounded-full" />
          <span className="font-mg12-bold text-[8px] text-white tracking-widest uppercase">FILM</span>
        </div>
      </div>
    );
  }

  // 7. Alt-a Image 1: Glowing white particle circular lens (Screenshot 3 center)
  if (mediaId === "alta-img-1") {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden p-3">
        {/* Glowing circular optical lens */}
        <div className="relative w-20 h-20 rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <div className="w-8 h-8 rounded-full bg-white blur-xs flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-black" />
          </div>
        </div>
        <span className="absolute bottom-3 left-3 text-[9px] font-mono text-neutral-300">
          calibrer le regard
        </span>
      </div>
    );
  }

  // 8. Alt-a Image 2: Minimalist typography card (Screenshot 3 right)
  if (mediaId === "alta-img-2") {
    return (
      <div className="w-full h-full bg-[#111111] border border-neutral-800 p-4 flex flex-col justify-between text-left">
        <span className="font-mono text-[9px] text-[#ED3327] tracking-widest uppercase">ALT-A LAB</span>
        <p className="font-mg12-regular text-xs text-white leading-relaxed">
          Une hypothèse à mettre en jeu? <br />
          <span className="text-neutral-400">Parlons-en.</span>
        </p>
        <span className="font-mono text-[8px] text-neutral-500">PARIS · FORESIGHT</span>
      </div>
    );
  }

  // 9. Kestrix Image 1: Isometric black 3D houses (Screenshot 3 center)
  if (mediaId === "kestrix-img-1") {
    return (
      <div className="w-full h-full bg-[#0a0a0c] flex flex-col justify-between p-3 relative overflow-hidden">
        <div className="grid grid-cols-3 gap-2 my-auto">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-full h-10 border border-neutral-700 bg-neutral-900/80 rounded-xs flex flex-col items-center justify-center relative">
              <span className="w-4 h-2 bg-[#ED3327] -mt-2 rounded-xs" />
              <span className="text-[7px] font-mono text-neutral-400 mt-1">H_{n}</span>
            </div>
          ))}
        </div>
        <span className="text-[8px] font-mono text-neutral-300">
          Asset intelligence for an energy-resilient future
        </span>
      </div>
    );
  }

  // 10. Kestrix Image 2: House heat map silhouette cards (Screenshot 3 right)
  if (mediaId === "kestrix-img-2") {
    return (
      <div className="w-full h-full bg-[#edeae6] p-2.5 flex items-center justify-center gap-1.5">
        <div className="w-1/2 h-full bg-[#d85838] rounded-xs p-2 flex flex-col justify-between text-white">
          <span className="text-[7px] font-mono">HEAT LOSS</span>
          <span className="font-mg12-bold text-xs">84%</span>
        </div>
        <div className="w-1/2 h-full bg-[#4054b2] rounded-xs p-2 flex flex-col justify-between text-white">
          <span className="text-[7px] font-mono">RETROFIT</span>
          <span className="font-mg12-bold text-xs">A-RATED</span>
        </div>
      </div>
    );
  }

  // 11. BotBlox Image 1: Dark logo grid & radar topography (Screenshot 3 bottom center)
  if (mediaId === "botblox-img-1") {
    return (
      <div className="w-full h-full bg-[#09090b] p-3 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-[8px] font-mono text-neutral-400 border-b border-neutral-800 pb-1">
          <span>ROBOTICS HARDWARE</span>
          <span className="text-[#ED3327]">1000BASE-T</span>
        </div>
        <div className="my-auto text-center">
          <span className="block font-mg12-regular text-xs text-white">
            Compact mmWave radar for autonomous platforms.
          </span>
        </div>
        <div className="flex items-center justify-between text-[7px] font-mono text-neutral-500">
          <span>ETHERNET · GIGABIT</span>
          <span>BOTBLOX</span>
        </div>
      </div>
    );
  }

  // 12. BotBlox Image 2: 3D CAD micro PCB components (Screenshot 3 bottom right)
  if (mediaId === "botblox-img-2") {
    return (
      <div className="w-full h-full bg-[#121216] p-3 flex items-center justify-around">
        {[1, 2].map((i) => (
          <div key={i} className="w-14 h-16 border border-neutral-700 bg-black rounded-xs p-1 flex flex-col justify-between shadow-md">
            <span className="w-2.5 h-1.5 bg-[#ED3327] rounded-xs" />
            <div className="space-y-0.5">
              <div className="w-full h-0.5 bg-neutral-600" />
              <div className="w-3/4 h-0.5 bg-neutral-600" />
            </div>
            <span className="text-[6px] font-mono text-neutral-400">MICRO-SWITCH</span>
          </div>
        ))}
      </div>
    );
  }

  // Default clean graphic fallback
  return (
    <div className="w-full h-full bg-neutral-900 border border-neutral-800 flex items-center justify-center p-4">
      <div className="w-10 h-10 border border-[#ED3327] rounded-full flex items-center justify-center">
        <span className="text-[10px] font-mono text-neutral-300">GRAVITY</span>
      </div>
    </div>
  );
}
