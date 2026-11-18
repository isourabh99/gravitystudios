"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/Skeleton";

export interface ShutterImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  slatCount?: number;
  interactive3D?: boolean;
  chamfered?: boolean;
  badge?: React.ReactNode;
  overlayText?: string;
  aspectRatio?: string; // e.g. "aspect-[16/9]" or "aspect-[4/3]"
  priority?: boolean;
}

/**
 * High-End Studio Shutter Image Component
 * Features signature staggered Venetian blind / louver slats wipe animation
 * with optional real-time 3D cursor perspective tilt physics
 */
export default function ShutterImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  slatCount = 5,
  interactive3D = false,
  chamfered = false,
  badge,
  overlayText,
  aspectRatio = "aspect-[16/10]",
}: ShutterImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Cursor Physics (Perspective Tilt on Hover)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive3D || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (-10 to +10 degrees)
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (interactive3D) {
      setTilt({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        perspective: interactive3D ? "1000px" : undefined,
      }}
      className={`group relative overflow-hidden select-none ${aspectRatio} ${containerClassName}`}
    >
      {/* 3D Transform Motion Canvas */}
      <motion.div
        animate={{
          rotateX: interactive3D ? tilt.x : 0,
          rotateY: interactive3D ? tilt.y : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
        }}
        style={{
          transformStyle: "preserve-3d",
          clipPath: chamfered
            ? "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)"
            : undefined,
        }}
        className={`w-full h-full relative overflow-hidden bg-neutral-950 rounded-none`}
      >
        {/* Skeleton while image loads */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10">
            <Skeleton isDark={true} className="w-full h-full" />
          </div>
        )}

        {/* Primary Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
        />

        {/* =====================================================================
            STAGGERED MECHANICAL SHUTTER SLATS (SIGNATURE STUDIO AESTHETIC)
           ===================================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col z-20">
          {Array.from({ length: slatCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scaleY: isHovered ? 1 : 0,
                opacity: isHovered ? 0.35 : 0,
              }}
              transition={{
                duration: 0.35,
                delay: isHovered ? i * 0.04 : (slatCount - 1 - i) * 0.025,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                originY: 0,
                height: `${100 / slatCount}%`,
              }}
              className="w-full bg-black relative border-b border-white/10"
            >
              {/* Metallic reflection highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
            </motion.div>
          ))}
        </div>

        {/* Optional Chromatic Glitch / Overlay Text */}
        {overlayText && (
          <div className="absolute inset-0 z-25 flex items-center justify-center p-6 text-center pointer-events-none">
            <h3 className="font-mg12-bold text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {overlayText}
            </h3>
          </div>
        )}

        {/* Ambient Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none z-15" />
      </motion.div>

      {/* Pinned Corner Badge (e.g. [ VIEW SERVICES ↗ ]) */}
      {badge && (
        <div className="absolute top-0 left-0 z-30 pointer-events-auto">
          {badge}
        </div>
      )}
    </div>
  );
}

