"use client";

import React from "react";
import Image from "next/image";
import { motion, useTransform, MotionValue } from "framer-motion";
import { ConveyorServiceItem } from "@/data/servicesShowcaseData";

export interface AlternatingItemViewProps {
  item: ConveyorServiceItem;
  index: number;
  totalCount?: number;
  scrollYProgress: MotionValue<number>;
  xOffset: number;
  topYOffset: number;
  bottomYOffset: number;
  onItemClick?: (item: ConveyorServiceItem) => void;
  onHoverStart?: (item: ConveyorServiceItem) => void;
  onHoverEnd?: () => void;
}

export default function AlternatingItemView({
  item,
  index,
  totalCount = 10,
  scrollYProgress,
  xOffset,
  topYOffset,
  bottomYOffset,
  onItemClick,
  onHoverStart,
  onHoverEnd,
}: AlternatingItemViewProps) {

  // Center progress where this item hits the center (evenly distributed across 10 items)
  const step = 0.84 / Math.max(1, totalCount - 1);
  const center = Number((0.08 + index * step).toFixed(3));
  const span = 0.075;

  // Mathematically guaranteed strictly ascending offsets between 0 and 1
  const p2 = center;
  const p1 = Math.max(0.012, Number((center - span).toFixed(4)));
  const p0 = Math.max(0, Number((p1 - 0.02).toFixed(4)));
  const p3 = Math.min(0.988, Number((center + span).toFixed(4)));
  const p4 = Math.min(1.0, Number((p3 + 0.02).toFixed(4)));

  // Horizontal X Translation: Starts from RIGHT (+xOffset) ➔ CENTER (0) ➔ Exits LEFT (-xOffset)
  const x = useTransform(
    scrollYProgress,
    [p1, p2, p3],
    [xOffset, 0, -xOffset],
    { clamp: true }
  );

  // Arc plateau: Reach full top/bottom altitude while still to the right, flat across center
  const pArcIn = Number((p1 + (p2 - p1) * 0.22).toFixed(4));
  const pArcOut = Number((p2 + (p3 - p2) * 0.78).toFixed(4));

  const targetY = item.isTop ? -topYOffset : bottomYOffset;
  const y = useTransform(
    scrollYProgress,
    [p1, pArcIn, p2, pArcOut, p3],
    [0, targetY, targetY, targetY, 0],
    { clamp: true }
  );

  // Scale: small (0.34) at edges ➔ blooms to full size (1.0) at center ➔ shrinks back
  const scale = useTransform(
    scrollYProgress,
    [p0, p1, p2, p3, p4],
    [0.34, 0.48, 1.0, 0.48, 0.34],
    { clamp: true }
  );

  // Opacity: 0 before entry ➔ 0.55 preview at edge ➔ 1.0 at center ➔ 0.55 at exit ➔ 0
  const opacity = useTransform(
    scrollYProgress,
    [p0, p1, p2, p3, p4],
    [0, 0.55, 1.0, 0.55, 0],
    { clamp: true }
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onItemClick) {
        onItemClick(item);
      }
    }
  };

  const handleMouseEnter = () => {
    if (onHoverStart) {
      onHoverStart(item);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverEnd) {
      onHoverEnd();
    }
  };

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
      }}
      className="absolute flex items-center justify-center pointer-events-auto select-none z-20"
    >
      {/* 
        UNIFIED HORIZONTAL RECTANGLE CARD
        Clean, minimalist design showing exclusively:
        - Header with Number & Category
        - Panoramic visible Image
        - Service Title & Description
        (Deep details, benchmarks, and deliverables open in the ServiceDetailDrawer on click)
      */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open dossier for ${item.title}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
        className="group relative cursor-none outline-none transition-all duration-300 active:scale-[0.98] pointer-events-auto"
      >
        <div className="w-[350px] sm:w-[400px] md:w-[440px] h-[220px] sm:h-[235px] md:h-[245px] bg-[#0A0B0E] text-white p-3.5 sm:p-4 border border-neutral-800 rounded-md shadow-2xl relative select-none flex flex-col justify-between overflow-hidden group-hover:border-[#ED3327] group-hover:shadow-[0_12px_45px_rgba(237,51,39,0.22)] transition-all duration-300">
          
          {/* Top Row: Service Number & Category Tag */}
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800/80 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-[13px] font-bold text-[#ED3327] tracking-wider">
                {item.number}
              </span>
              <span className="text-[10px] text-neutral-600">/</span>
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-medium">
                {item.category}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327] animate-pulse" />
              <span className="font-mono text-[8px] sm:text-[8.5px] text-neutral-400 uppercase tracking-wider">
                DOSSIER
              </span>
            </div>
          </div>

          {/* Panoramic Visible 16:9 Image Banner */}
          <div className="relative w-full h-28 sm:h-31 md:h-33 rounded-xs overflow-hidden my-2 border border-neutral-800 group-hover:border-neutral-600 transition-colors shadow-md shrink-0">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 640px) 350px, (max-width: 768px) 400px, 440px"
              className="object-cover object-center filter brightness-[0.94] contrast-[1.08] transition-transform duration-500 ease-out group-hover:scale-106"
              unoptimized
            />
            {/* Soft bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            
            {/* Subtle Subtitle Pill over image */}
            <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono text-white/90 pointer-events-none">
              <span className="truncate max-w-[85%] font-medium uppercase tracking-wider bg-black/65 backdrop-blur-xs px-2 py-0.5 rounded-2xs border border-white/10">
                {item.subtitle}
              </span>
              <span className="text-white text-xs group-hover:text-[#ED3327] group-hover:translate-x-0.5 transition-all">
                ↗
              </span>
            </div>
          </div>

          {/* Service Title & 2-Line Description */}
          <div className="flex-1 flex flex-col justify-center overflow-hidden">
            <h2 className="font-mg12-bold text-sm sm:text-base md:text-[16.5px] font-bold text-white tracking-tight leading-snug group-hover:text-[#ED3327] transition-colors truncate mb-0.5">
              {item.title}
            </h2>
            <p className="font-mg12-regular text-[10.5px] sm:text-[11.5px] text-neutral-300 font-light leading-relaxed line-clamp-1">
              {item.description}
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
