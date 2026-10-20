"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { PROJECTS, Project } from "@/data/projectsData";
import ProjectDetailDrawer from "@/components/projects/ProjectDetailDrawer";
import CtaButton from "@/components/ui/CtaButton";
import ScrambleText from "@/components/ui/ScrambleText";
import ClientsMarquee from "./ClientsMarquee";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  objectPosition?: string;
  quote: string;
  projectSlug: string;
  linkedIn?: string;
}

const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: "client-1",
    name: "Rohan Mehta",
    role: "CEO & Co-founder, Sutra Enterprise",
    company: "Sutra CRM",
    image: "/images/clients/indian-client-1.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "Gravity translated our enterprise AI workflows into an effortless, ultra-responsive digital benchmark. Inbound enterprise inquiries jumped by 240% within the first month.",
    projectSlug: "sutra-crm",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "client-2",
    name: "Ananya Singhal",
    role: "Founder & Creative Director, Indus Luxe",
    company: "Indus Luxe",
    image: "/images/clients/indian-client-2.jpg?v=3",
    objectPosition: "center 15%",
    quote:
      "The craftsmanship and motion fidelity Gravity brought to Indus Luxe redefined how heritage luxury is experienced online. Fluid, immersive, and exquisitely detailed.",
    projectSlug: "indus-luxe",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "client-3",
    name: "Vikram Malhotra",
    role: "CTO & Co-founder, Sarva Cloud Systems",
    company: "Sarva CMS",
    image: "/images/clients/indian-client-3.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "The Gravity engineering team delivered blazing-fast headless WebGL interactions with zero compromise on accessibility. The most capable creative tech partner we've worked with.",
    projectSlug: "sarva-cms",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "client-4",
    name: "Devika Rao",
    role: "Co-founder & Head of Product, Kala 3D",
    company: "Kala Studio",
    image: "/images/clients/indian-client-4.jpg?v=3",
    objectPosition: "center 15%",
    quote:
      "Working with Gravity was simply delightful. They immediately grasped our technical nuances and turned our 3D spatial product into a breathtaking benchmark.",
    projectSlug: "kala-studio",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "client-5",
    name: "Aditya Verma",
    role: "Managing Partner, Kosh Wealth & Capital",
    company: "Kosh Wealth",
    image: "/images/clients/indian-client-5.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "In fintech, trust and speed are everything. Gravity built a high-frequency algorithmic terminal interface that gave our institutional investors immense confidence.",
    projectSlug: "kosh-wealth",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "client-6",
    name: "Kabir Sen",
    role: "VP of Operations, Pravaah Freight",
    company: "Pravaah Logistics",
    image: "/images/clients/indian-client-6.jpg?v=3",
    objectPosition: "center 15%",
    quote:
      "Gravity transformed our real-time telemetry tracking into an intuitive, visually stunning mission control interface. Real-time fleet visibility reached 99.8%.",
    projectSlug: "pravaah-logistics",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "client-7",
    name: "Dr. Meera Nambiar",
    role: "Chief Medical Officer, Veda Clinical",
    company: "Veda Health",
    image: "/images/clients/indian-client-7.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "Patient intelligence requires utmost empathy and clinical clarity. Gravity delivered a healthcare experience that makes complex diagnostics feel accessible and human.",
    projectSlug: "veda-health",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "client-8",
    name: "Arjun Nair",
    role: "Head of AI & Robotics, Drishti Labs",
    company: "Drishti AI",
    image: "/images/clients/indian-client-8.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "Gravity pushes the absolute boundary of real-time 3D, WebGL, and generative interfaces. Our spatial computer vision platform now leads the global industry standard.",
    projectSlug: "drishti-ai",
    linkedIn: "https://linkedin.com",
  },
];

// Paired for desktop: 2 cards per slide (4 slides total)
const CLIENT_PAIRS: [ClientTestimonial, ClientTestimonial][] = [
  [CLIENT_TESTIMONIALS[0], CLIENT_TESTIMONIALS[1]],
  [CLIENT_TESTIMONIALS[2], CLIENT_TESTIMONIALS[3]],
  [CLIENT_TESTIMONIALS[4], CLIENT_TESTIMONIALS[5]],
  [CLIENT_TESTIMONIALS[6], CLIENT_TESTIMONIALS[7]],
];

interface ClientCardProps {
  client: ClientTestimonial;
  onOpenCaseStudy: (slug: string) => void;
  isMobile?: boolean;
}

function ClientCard({ client, onOpenCaseStudy, isMobile }: ClientCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenCaseStudy(client.projectSlug)}
      className={`group relative flex flex-col cursor-pointer select-none w-full max-w-[320px] xl:max-w-[350px] transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isMobile
          ? "h-auto"
          : isHovered
          ? "h-[430px] xl:h-[435px]"
          : "h-[330px] xl:h-[335px]"
      }`}
    >
      {/* 1. Square Image Container with Dither Halftone CRT Overlay */}
      <div
        className={`relative w-full bg-[#0d0d0f] overflow-hidden shrink-0 ${
          isMobile
            ? "aspect-square max-h-[300px]"
            : "h-[250px] xl:h-[255px]"
        }`}
      >
        {/* High-contrast Monochrome Portrait */}
        <Image
          src={client.image}
          alt={client.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectPosition: client.objectPosition || "center 20%" }}
          className="object-cover grayscale contrast-[1.28] brightness-[0.88] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />

        {/* Micro-dot CRT halftone dither texture overlays */}
        <div
          className="pointer-events-none absolute inset-0 z-10 mix-blend-screen opacity-55"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)`,
            backgroundSize: "3px 3px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 mix-blend-multiply opacity-65"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.85) 1px, transparent 1px)`,
            backgroundSize: "3px 3px",
            backgroundPosition: "1.5px 1.5px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1.5px, rgba(0,0,0,0.45) 1.5px, rgba(0,0,0,0.45) 3px)`,
          }}
        />

        {/* Two parallel horizontal lines in top-right corner (matches screenshot) */}
        <div className="absolute top-3.5 right-3.5 z-20 flex flex-col gap-1 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="w-5 h-[1.5px] bg-white" />
          <span className="w-5 h-[1.5px] bg-white" />
        </div>
      </div>

      {/* 2. Under-Image Accent Bar: Red on hover/mobile, dark gray by default */}
      <div
        className={`h-[3px] w-full transition-colors duration-300 shrink-0 ${
          isHovered || isMobile ? "bg-[#ED3327]" : "bg-[#222224]"
        }`}
      />

      {/* 3. Details Area */}
      <div className="pt-3 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-mg12-regular text-xl xl:text-2xl font-normal tracking-tight text-white transition-colors group-hover:text-white leading-tight">
            {client.name}
          </h3>
          <p className="text-xs font-sans font-light text-neutral-400 mt-0.5">
            {client.role}
          </p>

          {/* LinkedIn Link */}
          <div className="mt-1">
            <a
              href={client.linkedIn || "https://linkedin.com"}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-sans text-neutral-300 hover:text-[#ED3327] transition-colors"
            >
              <span>LinkedIn</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>

        {/* Description / Quote & Case Study button (reveals downward on hover, aligned to bottom) */}
        <div
          className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobile
              ? "mt-2.5 opacity-100 max-h-none"
              : isHovered
              ? "mt-2.5 opacity-100 max-h-48"
              : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
          }`}
        >
          <p className="text-xs font-sans text-neutral-300 leading-relaxed line-clamp-3">
            {client.quote}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCaseStudy(client.projectSlug);
            }}
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-200 hover:text-white transition-colors cursor-pointer group/btn"
          >
            <span className="border-b border-neutral-700 group-hover/btn:border-[#ED3327] pb-0.5">
              Read the case study
            </span>
            <span className="w-4 h-4 rounded-full bg-[#ED3327] text-white flex items-center justify-center text-[9px] group-hover/btn:scale-110 transition-transform">
              ↗
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClientsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lenis = useSmoothScroll();

  // Desktop Pinned Scroll Container (400vh)
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"],
  });

  const [desktopSlide, setDesktopSlide] = useState(0);

  useEffect(() => {
    const unsubscribe = desktopProgress.on("change", (latest) => {
      const idx = Math.min(3, Math.max(0, Math.floor(latest * 4)));
      setDesktopSlide(idx);
    });
    return () => unsubscribe();
  }, [desktopProgress]);

  // Mobile Pinned Scroll Container (800vh for 8 individual slides)
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  const [mobileSlide, setMobileSlide] = useState(0);

  useEffect(() => {
    const unsubscribe = mobileProgress.on("change", (latest) => {
      const idx = Math.min(7, Math.max(0, Math.floor(latest * 8)));
      setMobileSlide(idx);
    });
    return () => unsubscribe();
  }, [mobileProgress]);

  // Section entry scramble trigger: fires once when reaching clients section after hero
  const sectionRef = useRef<HTMLElement>(null);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const scrambleFiredRef = useRef(false);

  useEffect(() => {
    if (scrambleFiredRef.current) return;

    const checkScramble = () => {
      if (scrambleFiredRef.current) return;
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Trigger as soon as clients section starts entering the viewport
        if (rect.top <= window.innerHeight * 0.85) {
          scrambleFiredRef.current = true;
          setScrambleTrigger(true);
        }
      }
    };

    window.addEventListener("scroll", checkScramble, { passive: true });
    if (lenis) {
      lenis.on("scroll", checkScramble);
    }
    checkScramble();

    return () => {
      window.removeEventListener("scroll", checkScramble);
      if (lenis) {
        lenis.off("scroll", checkScramble);
      }
    };
  }, [lenis]);

  const handleOpenCaseStudy = (projectSlug: string) => {
    const matched = PROJECTS.find((p) => p.slug === projectSlug) || PROJECTS[0];
    setSelectedProject(matched);
  };

  const handleDesktopDotClick = (idx: number) => {
    if (!desktopContainerRef.current) return;
    const rect = desktopContainerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const targetScroll = containerTop + (idx / 4) * (rect.height - window.innerHeight);
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      id="clients"
      ref={sectionRef}
      data-theme="dark"
      className="relative w-full bg-black text-neutral-100 select-none font-sans"
    >
      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP VIEW (lg:):
          400vh outer container -> sticky top-0 h-screen pinned deck!
          The screen is 100% fixed at top-0 while scrolling through slides.
          Left philosophy card height is h-[450px], exactly matching
          the hovered card's height so their tops and bottoms align!
         ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:block relative w-full h-[400vh]"
      >
        <div className="sticky top-0 h-screen w-full bg-black flex flex-col justify-between overflow-hidden px-6 sm:px-12">
          {/* Main 100vh Content Area - perfectly aligned with Navbar logo (max-w-8xl mx-auto) */}
          <div className="max-w-8xl mx-auto w-full pt-20 pb-4 flex-1 flex flex-col justify-between">
            {/* Header with Title & Slide Indicator */}
            <div className="flex items-end justify-between gap-4 mb-6 shrink-0">
              <div>
                <h2 className="font-mg12-regular text-2xl lg:text-3xl xl:text-[2.2rem] tracking-tight text-white leading-tight">
                  <ScrambleText
                    text="Our clients speak for themselves."
                    trigger={scrambleTrigger}
                    interactive={false}
                    speed={1.2}
                  />
                </h2>
              </div>

              {/* Progress Indicator Dots */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  PAIR 0{desktopSlide + 1} / 04
                </span>
                <div className="flex items-center gap-1.5">
                  {CLIENT_PAIRS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleDesktopDotClick(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                        desktopSlide === idx ? "w-6 bg-[#ED3327]" : "w-2 bg-neutral-700 hover:bg-neutral-500"
                      }`}
                      aria-label={`Jump to pair ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3-Part Division Grid (1/3 Left Philosophy Card, 1/3 Client 1, 1/3 Client 2)
                TOP-ALIGNED (items-start) & exact matching height (h-[430px] xl:h-[435px])! */}
            <div className="grid grid-cols-3 gap-6 xl:gap-8 items-start flex-1 my-auto">
              {/* PART 1: Left Philosophy / Mission Card (Height aligned with hovered card: h-[430px] xl:h-[435px]) */}
              <div className="bg-[#0a0a0c] text-white rounded-none p-6 xl:p-7 flex flex-col justify-between relative overflow-hidden h-[430px] xl:h-[435px] shadow-2xl">
                {/* Dithered Nebula Cloud Graphic */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 w-80 h-72 opacity-50 mix-blend-screen z-0">
                  <svg viewBox="0 0 400 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="clients-cloud-dither-desktop">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                        <feColorMatrix
                          type="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -5"
                          result="dither"
                        />
                        <feComposite in="SourceGraphic" in2="dither" operator="in" />
                      </filter>
                      <radialGradient id="clients-cloud-grad-desktop" cx="65%" cy="65%" r="55%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="40%" stopColor="#aaaaaa" stopOpacity="0.4" />
                        <stop offset="80%" stopColor="#444444" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="240" cy="200" r="150" fill="url(#clients-cloud-grad-desktop)" filter="url(#clients-cloud-dither-desktop)" />
                  </svg>
                </div>

                {/* Philosophy Text with Scramble Animation */}
                <div className="space-y-4 relative z-10 max-w-lg pt-1">
                  <p className="text-[13px] xl:text-[13.5px] font-sans text-neutral-300 leading-relaxed">
                    <ScrambleText
                      text="Gravity works with tech and deeptech companies: founders who build hard things and need a website that makes them obvious."
                      trigger={scrambleTrigger}
                      interactive={false}
                      speed={1.8}
                    />
                  </p>
                  <p className="text-[13px] xl:text-[13.5px] font-sans text-neutral-300 leading-relaxed">
                    <ScrambleText
                      text="We keep part of our year for agencies and creative studios, the projects where we push craft, motion and real-time 3D further."
                      trigger={scrambleTrigger}
                      interactive={false}
                      speed={1.8}
                    />
                  </p>
                  <p className="text-[13px] xl:text-[13.5px] font-sans text-neutral-300 leading-relaxed">
                    <ScrambleText
                      text="We believe in clarity, character and conversion."
                      trigger={scrambleTrigger}
                      interactive={false}
                      speed={1.8}
                    />
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="relative z-10 pt-4 mt-auto">
                  <div className="flex items-center gap-2.5 w-full">
                    <CtaButton
                      href="/contact"
                      variant="outline"
                      shape="square"
                      className="w-full !px-3 !py-2.5 !text-[11px] !font-mono !tracking-wider border !border-neutral-700 !bg-neutral-900/90 !text-white hover:!border-[#ED3327]"
                    >
                      <span>Start a project</span>
                      <span className="text-[#ED3327] font-bold">↗</span>
                    </CtaButton>

                    <CtaButton
                      href="/services"
                      variant="white"
                      shape="square"
                      className="w-full !px-3 !py-2.5 !text-[11px] !font-mono !tracking-wider"
                    >
                      About the studio
                    </CtaButton>
                  </div>
                </div>
              </div>

              {/* PARTS 2 & 3: The 2 Client Cards (Top-aligned & Hover-Aligned to h-[430px] xl:h-[435px]) */}
              <div className="col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={desktopSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 gap-6 xl:gap-8 items-start"
                  >
                    <ClientCard
                      client={CLIENT_PAIRS[desktopSlide][0]}
                      onOpenCaseStudy={handleOpenCaseStudy}
                    />
                    <ClientCard
                      client={CLIENT_PAIRS[desktopSlide][1]}
                      onOpenCaseStudy={handleOpenCaseStudy}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Edge-to-Edge Full-Width Black Marquee Strip Flush at Bottom */}
          <div className="w-full shrink-0 -mx-6 sm:-mx-12">
            <ClientsMarquee />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE VIEW (< lg):
          1. FIRST: Fixed Mobile Slide Deck (800vh pinned container, 1 large card per slide, screen locked).
          2. AFTER SLIDES: Mobile Philosophy Section ("About the studio" & "Start a project").
         ═══════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col w-full">
        {/* Step 1: Fixed Mobile Slide Deck (Comes FIRST on mobile!) */}
        <div
          ref={mobileContainerRef}
          className="relative w-full h-[800vh]"
        >
          <div className="sticky top-0 h-[100dvh] w-full bg-black text-white flex flex-col justify-between overflow-hidden px-6 sm:px-12 pt-20 pb-4">
            <div className="max-w-8xl mx-auto w-full flex-1 flex flex-col justify-between">
              {/* Mobile Header with Slide Indicator */}
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <div>
                  <h2 className="font-mg12-regular text-xl tracking-tight text-white leading-tight">
                    <ScrambleText
                      text="Our clients speak for themselves."
                      trigger={scrambleTrigger}
                      interactive={false}
                      speed={1.2}
                    />
                  </h2>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5 block">
                    SLIDE 0{mobileSlide + 1} / 08
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {CLIENT_TESTIMONIALS.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 transition-all duration-300 rounded-none ${
                        mobileSlide === idx ? "w-4 bg-[#ED3327]" : "w-1 bg-neutral-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Middle: Exactly 1 Large Card per Slide on Mobile (Expanded by default!) */}
              <div className="flex-1 flex flex-col justify-center my-auto py-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileSlide}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[340px] sm:max-w-[360px] mx-auto"
                  >
                    <ClientCard
                      client={CLIENT_TESTIMONIALS[mobileSlide]}
                      onOpenCaseStudy={handleOpenCaseStudy}
                      isMobile={true}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-center font-mono text-[9px] text-neutral-500 uppercase tracking-widest pb-1">
                SCROLL DOWN TO REVEAL NEXT CLIENTS
              </p>
            </div>

            {/* Edge-to-Edge Marquee at Bottom of Fixed Screen */}
            <div className="w-full shrink-0 -mx-6 sm:-mx-12">
              <ClientsMarquee />
            </div>
          </div>
        </div>

        {/* Step 2: Mobile Philosophy Section (Comes AFTER the slides!) */}
        <div className="w-full px-6 sm:px-12 pt-16 pb-12 bg-[#08080a] border-t border-neutral-800">
          <div className="max-w-8xl mx-auto w-full">
            <div className="bg-[#0a0a0c] text-white rounded-none p-6 flex flex-col justify-between relative overflow-hidden shadow-xl border border-neutral-800/60">
              {/* Dithered Nebula Cloud Graphic */}
              <div className="pointer-events-none absolute -bottom-10 -right-10 w-72 h-64 opacity-40 mix-blend-screen z-0">
                <svg viewBox="0 0 400 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="clients-cloud-dither-mobile">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                      <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -5"
                        result="dither"
                      />
                      <feComposite in="SourceGraphic" in2="dither" operator="in" />
                    </filter>
                    <radialGradient id="clients-cloud-grad-mobile" cx="65%" cy="65%" r="55%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#aaaaaa" stopOpacity="0.4" />
                      <stop offset="80%" stopColor="#444444" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="240" cy="200" r="150" fill="url(#clients-cloud-grad-mobile)" filter="url(#clients-cloud-dither-mobile)" />
                </svg>
              </div>

              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest pb-3 block">
                ABOUT GRAVITY STUDIOS
              </span>

              <div className="space-y-3.5 text-xs font-sans text-neutral-300 leading-relaxed relative z-10">
                <p>
                  <ScrambleText
                    text="Gravity works with tech and deeptech companies: founders who build hard things and need a website that makes them obvious."
                    trigger={scrambleTrigger}
                    interactive={false}
                    speed={1.8}
                  />
                </p>
                <p>
                  <ScrambleText
                    text="We keep part of our year for agencies and creative studios, the projects where we push craft, motion and real-time 3D further."
                    trigger={scrambleTrigger}
                    interactive={false}
                    speed={1.8}
                  />
                </p>
                <p>
                  <ScrambleText
                    text="We believe in clarity, character and conversion."
                    trigger={scrambleTrigger}
                    interactive={false}
                    speed={1.8}
                  />
                </p>
              </div>

            <div className="pt-6 flex flex-col gap-2.5 w-full relative z-10">
              <CtaButton
                href="/contact"
                variant="outline"
                shape="square"
                className="w-full !py-3 !text-xs !font-mono !tracking-wider border !border-neutral-700 !bg-neutral-900/90 !text-white hover:!border-[#ED3327]"
              >
                <span>Start a project</span>
                <span className="text-[#ED3327] font-bold">↗</span>
              </CtaButton>
              <CtaButton
                href="/services"
                variant="white"
                shape="square"
                className="w-full !py-3 !text-xs !font-mono !tracking-wider"
              >
                About the studio
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Reusable Project Detail Drawer (Opens when clicking any client card case study) */}
      <ProjectDetailDrawer
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
