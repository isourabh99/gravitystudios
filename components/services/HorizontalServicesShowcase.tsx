"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import CtaButton from "@/components/ui/CtaButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import AlternatingItemView from "./AlternatingItemView";
import ServiceDetailDrawer from "./ServiceDetailDrawer";
import {
  SERVICES_SHOWCASE_ITEMS,
  ConveyorServiceItem,
  ServiceDetailData,
} from "@/data/servicesShowcaseData";

export interface HorizontalServicesShowcaseProps {
  items?: ConveyorServiceItem[];
}

export default function HorizontalServicesShowcase({
  items = SERVICES_SHOWCASE_ITEMS,
}: HorizontalServicesShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useSmoothScroll();
  const [xOffset, setXOffset] = useState(520);
  const [topYOffset, setTopYOffset] = useState(195);
  const [bottomYOffset, setBottomYOffset] = useState(225);

  // Detail Drawer state when any conveyor item is clicked
  const [selectedService, setSelectedService] = useState<ServiceDetailData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Floating custom cursor state & positioning matching CurvedPerspectiveSlider
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const [isHoveringService, setIsHoveringService] = useState(false);

  // Smooth lerp cursor tracking loop
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let rafId: number;
    const renderLoop = () => {
      if (cursorRef.current) {
        // Silky smooth trailing lerp
        currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.35;
        currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.35;
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Measure responsive X and Y travel distances for horizontal rectangle cards
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 640) {
        setXOffset(Math.min(320, w * 0.44));
        setTopYOffset(Math.min(180, Math.max(155, h * 0.23)));
        setBottomYOffset(Math.min(215, Math.max(190, h * 0.265)));
      } else if (w < 1024) {
        setXOffset(Math.min(440, w * 0.42));
        setTopYOffset(Math.min(195, Math.max(170, h * 0.24)));
        setBottomYOffset(Math.min(225, Math.max(200, h * 0.27)));
      } else {
        setXOffset(Math.min(520, w * 0.40));
        setTopYOffset(Math.min(205, Math.max(180, h * 0.245)));
        setBottomYOffset(Math.min(235, Math.max(205, h * 0.275)));
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Track vertical scroll progress inside the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleItemClick = (item: ConveyorServiceItem) => {
    if (item.serviceDetails) {
      setSelectedService(item.serviceDetails);
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetEl =
      document.getElementById("industries") ||
      document.getElementById("all-services");
    if (targetEl) {
      if (lenis) {
        lenis.scrollTo(targetEl, { duration: 1.2 });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-[600vh] bg-[#F4F4F0] text-neutral-900 select-none"
        aria-label="Our Services Showcase"
      >
        {/* Sticky Viewport pinned for the duration of the animation */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
          
          {/* Soft edge fades for sleek editorial transitions (hidden on mobile) */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 hidden sm:block w-20 md:w-28 bg-gradient-to-r from-[#F4F4F0] via-[#F4F4F0]/80 to-transparent z-30" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 hidden sm:block w-20 md:w-28 bg-gradient-to-l from-[#F4F4F0] via-[#F4F4F0]/80 to-transparent z-30" />

          {/* 1. CENTER FIXED ANCHOR: "Our services." + CtaButton (z-10 so cards hover freely at z-20) */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-mg12-regular text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] tracking-tight text-neutral-900 leading-none select-none mb-3.5 sm:mb-4.5"
            >
              Our services.
            </motion.h1>

            <div className="pointer-events-auto">
              <CtaButton
                href="#industries"
                variant="brand"
                onClick={handleDiscoverClick}
                className="shadow-md"
              >
                Discover all Services ↗
              </CtaButton>
            </div>
          </div>

          {/* 2. ALTERNATING CONVEYOR SYSTEM: Rectangle Cards in Front at z-20 */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden">
            {items.map((item, index) => (
              <AlternatingItemView
                key={item.id}
                item={item}
                index={index}
                totalCount={items.length}
                scrollYProgress={scrollYProgress}
                xOffset={xOffset}
                topYOffset={topYOffset}
                bottomYOffset={bottomYOffset}
                onItemClick={handleItemClick}
                onHoverStart={() => setIsHoveringService(true)}
                onHoverEnd={() => setIsHoveringService(false)}
              />
            ))}
          </div>

          {/* Scroll Progress Indicator Pill in bottom left */}
          <div className="absolute bottom-5 left-6 sm:left-12 z-30 flex items-center gap-3 bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-neutral-700 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327] animate-ping" />
            <span className="text-[10px] font-mono text-neutral-200 tracking-wider uppercase">
              Scroll to explore 10 disciplines • Click any card for dossier drawer
            </span>
            <span className="text-[11px] text-neutral-400">➔</span>
          </div>
        </div>
      </section>

      {/* 
        Custom Inverted Floating Cursor - STRICTLY on Service Cards Hover
        Matches CurvedPerspectiveSlider custom cursor style: [ READ SERVICE ] [ ↗ ]
      */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[100] transition-opacity duration-200 ease-out select-none ${
          isHoveringService && !isDrawerOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          mixBlendMode: "difference",
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
          pointerEvents: "none",
        }}
      >
        <div className="flex items-center gap-2.5 -translate-x-3.5 -translate-y-1/2 pointer-events-none">
          {/* Dot inside Circle cursor */}
          <div className="relative w-7 h-7 rounded-full border border-white flex items-center justify-center shrink-0 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-white block pointer-events-none" />
          </div>

          {/* Floating Screenshot-style badge: [ READ SERVICE ] [ ↗ ] */}
          <div className="flex items-center gap-1 shrink-0 pointer-events-none">
            <span className="bg-white text-black font-mono text-[10px] sm:text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-[2px] uppercase whitespace-nowrap shadow-sm pointer-events-none">
              READ SERVICE
            </span>
            <span className="bg-white text-black font-mono text-xs font-bold w-5.5 h-5.5 sm:w-6 sm:h-6 flex items-center justify-center rounded-[2px] whitespace-nowrap shadow-sm pointer-events-none">
              ↗
            </span>
          </div>
        </div>
      </div>

      {/* Slide-over Detail Drawer matching IndustryDetailDrawer and ProjectDetailDrawer */}
      <ServiceDetailDrawer
        service={selectedService}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
