"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/data/projectsData";
import ProjectDetailDrawer from "@/components/projects/ProjectDetailDrawer";
import CtaButton from "@/components/ui/CtaButton";
import ClientsMarquee from "./ClientsMarquee";

interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  objectPosition?: string;
  quote: string;
  projectSlug: string;
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
      "“Gravity translated our enterprise AI workflows into an effortless, ultra-responsive digital benchmark. Inbound enterprise inquiries jumped by 240% within the first month.”",
    projectSlug: "sutra-crm",
  },
  {
    id: "client-2",
    name: "Ananya Singhal",
    role: "Founder & Creative Director, Indus Luxe",
    company: "Indus Luxe",
    image: "/images/clients/indian-client-2.jpg?v=3",
    objectPosition: "center 15%",
    quote:
      "“The craftsmanship and motion fidelity Gravity brought to Indus Luxe redefined how heritage luxury is experienced online. Fluid, immersive, and exquisitely detailed.”",
    projectSlug: "indus-luxe",
  },
  {
    id: "client-3",
    name: "Vikram Malhotra",
    role: "CTO & Co-founder, Sarva Cloud Systems",
    company: "Sarva CMS",
    image: "/images/clients/indian-client-3.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "“The Gravity engineering team delivered blazing-fast headless WebGL interactions with zero compromise on accessibility. The most capable creative tech partner we've worked with.”",
    projectSlug: "sarva-cms",
  },
  {
    id: "client-4",
    name: "Devika Rao",
    role: "Co-founder & Head of Product, Kala 3D",
    company: "Kala Studio",
    image: "/images/clients/indian-client-4.jpg?v=3",
    objectPosition: "center 15%",
    quote:
      "“Working with Gravity was simply delightful. They immediately grasped our technical nuances and turned our 3D spatial product into a breathtaking benchmark.”",
    projectSlug: "kala-studio",
  },
  {
    id: "client-5",
    name: "Aditya Verma",
    role: "Managing Partner, Kosh Wealth & Capital",
    company: "Kosh Wealth",
    image: "/images/clients/indian-client-5.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "“In fintech, trust and speed are everything. Gravity built a high-frequency algorithmic terminal interface that gave our institutional investors immense confidence.”",
    projectSlug: "kosh-wealth",
  },
  {
    id: "client-6",
    name: "Kabir Sen",
    role: "VP of Operations, Pravaah Freight",
    company: "Pravaah Logistics",
    image: "/images/clients/indian-client-6.jpg?v=3",
    objectPosition: "center 15%",
    quote:
      "“Gravity transformed our real-time telemetry tracking into an intuitive, visually stunning mission control interface. Real-time fleet visibility reached 99.8%.”",
    projectSlug: "pravaah-logistics",
  },
  {
    id: "client-7",
    name: "Dr. Meera Nambiar",
    role: "Chief Medical Officer, Veda Clinical",
    company: "Veda Health",
    image: "/images/clients/indian-client-7.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "“Patient intelligence requires utmost empathy and clinical clarity. Gravity delivered a healthcare experience that makes complex diagnostics feel accessible and human.”",
    projectSlug: "veda-health",
  },
  {
    id: "client-8",
    name: "Arjun Nair",
    role: "Head of AI & Robotics, Drishti Labs",
    company: "Drishti AI",
    image: "/images/clients/indian-client-8.jpg?v=3",
    objectPosition: "center 20%",
    quote:
      "“Gravity pushes the absolute boundary of real-time 3D, WebGL, and generative interfaces. Our spatial computer vision platform now leads the global industry standard.”",
    projectSlug: "drishti-ai",
  },
];

export default function ClientsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMobileCardId, setActiveMobileCardId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0); // 0 = first 4 clients, 1 = next 4 clients
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("03:44:56 AM");

  // Real-time IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Automatic slide glide every 5.5s (pauses on hover or user interaction)
  useEffect(() => {
    if (isPaused) return;
    const autoSlideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5500);
    return () => clearInterval(autoSlideTimer);
  }, [isPaused]);

  const handleOpenCaseStudy = (projectSlug: string) => {
    const matched = PROJECTS.find((p) => p.slug === projectSlug) || PROJECTS[0];
    setSelectedProject(matched);
  };

  const handleCardClick = (client: ClientTestimonial) => {
    // On mobile touch: if card is not already active, reveal the quote first
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (activeMobileCardId !== client.id) {
        setActiveMobileCardId(client.id);
        return;
      }
    }
    handleOpenCaseStudy(client.projectSlug);
  };

  // Slice clients for 4 cards per slide
  const visibleClients =
    currentSlide === 0
      ? CLIENT_TESTIMONIALS.slice(0, 4)
      : CLIENT_TESTIMONIALS.slice(4, 8);

  return (
    <section
      id="clients"
      data-theme="light"
      className="relative w-full bg-[#F4F4F0] text-neutral-900 pt-16 sm:pt-24 lg:pt-28 pb-0 select-none font-sans overflow-hidden border-t border-neutral-300"
    >
      <div className="max-w-8xl mx-auto w-full px-6 sm:px-12 lg:px-14">
        {/* Section Header with Desktop Slider Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="font-mg12-regular text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.08] text-neutral-900">
              Our clients speak for themselves.
            </h2>
            <p className="font-mono text-xs sm:text-[13px] tracking-[0.22em] text-neutral-500 uppercase mt-2.5">
              GRAVITY STUDIOS™ · 08 CLIENT STORIES
            </p>
          </div>

          {/* Desktop Slide Navigation Indicator & Arrows (hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0 self-end">
            {/* Slide Dots Indicator */}
            <div className="flex items-center gap-1.5 mr-1">
              <button
                type="button"
                onClick={() => setCurrentSlide(0)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === 0 ? "w-6 bg-[#ED3327]" : "w-1.5 bg-neutral-400"
                }`}
                aria-label="Go to slide 1"
              />
              <button
                type="button"
                onClick={() => setCurrentSlide(1)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === 1 ? "w-6 bg-[#ED3327]" : "w-1.5 bg-neutral-400"
                }`}
                aria-label="Go to slide 2"
              />
            </div>

            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              SLIDE {currentSlide === 0 ? "01" : "02"} / 02
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setCurrentSlide(0);
                  setIsPaused(true);
                }}
                className={`w-8 h-8 rounded-xs border text-xs font-mono flex items-center justify-center transition-all cursor-pointer ${
                  currentSlide === 0
                    ? "bg-black text-white border-black shadow-xs"
                    : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
                }`}
                aria-label="Previous 4 clients"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentSlide(1);
                  setIsPaused(true);
                }}
                className={`w-8 h-8 rounded-xs border text-xs font-mono flex items-center justify-center transition-all cursor-pointer ${
                  currentSlide === 1
                    ? "bg-black text-white border-black shadow-xs"
                    : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
                }`}
                aria-label="Next 4 clients"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Left Philosophy / Mission Card & Right 4-Card Square Slide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-16 sm:mb-24">
          {/* ════════════════ LEFT COLUMN: Dark Philosophy Card ════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 bg-[#0a0a0c] text-white rounded-md p-7 sm:p-9 lg:p-10 flex flex-col justify-between relative overflow-hidden min-h-[520px] lg:min-h-[580px] border border-neutral-800 shadow-xl">
            {/* Dithered Nebula Cloud Graphic in bottom-right corner */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-96 h-80 opacity-60 mix-blend-screen z-0">
              <svg viewBox="0 0 400 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="clients-cloud-dither">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                    <feColorMatrix
                      type="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -5"
                      result="dither"
                    />
                    <feComposite in="SourceGraphic" in2="dither" operator="in" />
                  </filter>
                  <radialGradient id="clients-cloud-grad" cx="65%" cy="65%" r="55%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#aaaaaa" stopOpacity="0.4" />
                    <stop offset="80%" stopColor="#444444" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="240" cy="200" r="150" fill="url(#clients-cloud-grad)" filter="url(#clients-cloud-dither)" />
              </svg>
            </div>

            {/* Philosophy Text Paragraphs */}
            <div className="space-y-6 relative z-10 max-w-lg pt-2">
              <p className="text-sm sm:text-[15px] lg:text-[16px] font-sans text-neutral-300 leading-relaxed">
                Gravity works with <strong className="text-white font-bold">tech</strong> and{" "}
                <strong className="text-white font-bold">deeptech</strong> companies: founders who build hard things and
                need a website that makes them obvious.
              </p>
              <p className="text-sm sm:text-[15px] lg:text-[16px] font-sans text-neutral-300 leading-relaxed">
                We keep part of our year for <strong className="text-white font-bold">agencies</strong> and creative
                studios, the projects where we push <strong className="text-white font-bold">craft</strong>, motion and
                real-time 3D further.
              </p>
              <p className="text-sm sm:text-[15px] lg:text-[16px] font-sans text-neutral-300 leading-relaxed">
                We think most tech websites look the same: templates, stock 3D, copy nobody reads. We believe in{" "}
                <strong className="text-white font-bold">clarity</strong>,{" "}
                <strong className="text-white font-bold">character</strong> and{" "}
                <strong className="text-white font-bold">conversion</strong>.
              </p>
            </div>

            {/* Bottom Actions with CtaButton & Live Time Bar */}
            <div className="relative z-10 pt-8 mt-auto space-y-6">
              {/* Dual CtaButtons matching the screenshot */}
              <div className="flex flex-wrap items-center gap-3">
                <CtaButton
                  href="/contact"
                  variant="outline"
                  shape="square"
                  className="!px-5 !py-3 !text-xs !font-mono !tracking-wider border !border-neutral-700 !bg-neutral-900/90 !text-white hover:!border-[#ED3327]"
                >
                  <span>Start a project</span>
                  <span className="text-[#ED3327] font-bold">↗</span>
                </CtaButton>

                <CtaButton
                  href="/services"
                  variant="white"
                  shape="square"
                  className="!px-5 !py-3 !text-xs !font-mono !tracking-wider"
                >
                  About the studio
                </CtaButton>
              </div>

              {/* Bottom Copyright & Live Clock */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-5 border-t border-neutral-800/80">
                <span>©2026</span>
                <span className="text-neutral-400">(UTC+5:30)</span>
                <span className="text-neutral-300 font-bold">{currentTime}</span>
              </div>
            </div>
          </div>

          {/* ════════════════ RIGHT COLUMN: 4 Client Square Cards with Slide Animation ════════════════ */}
          <div
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
          >
            <div className="relative overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: currentSlide === 0 ? -24 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: currentSlide === 0 ? 24 : -24 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full"
                >
                  {visibleClients.map((client) => {
                    const isMobileActive = activeMobileCardId === client.id;

                    return (
                      <div
                        key={client.id}
                        onClick={() => handleCardClick(client)}
                        className="group relative w-full aspect-square rounded-md overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer select-none transition-all duration-300 hover:border-neutral-500 shadow-md"
                      >
                        {/* Default State: Clean Text-Free Founder Portrait with proper framing */}
                        <Image
                          src={client.image}
                          alt={client.name}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          style={{ objectPosition: client.objectPosition || "center 20%" }}
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />

                        {/* Top subtle vignette for crisp contrast */}
                        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/85 via-black/35 to-transparent pointer-events-none" />

                        {/* Top-Left: Founder Name & Company (HTML/React overlay) */}
                        <div className="absolute top-4 left-4 z-10 pointer-events-none pr-3">
                          <h4 className="font-bold text-sm sm:text-[15px] text-white tracking-tight leading-tight drop-shadow-sm">
                            {client.name}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5 drop-shadow-sm">
                            {client.role}
                          </p>
                        </div>

                        {/* 
                          Hover State: Sleek Dark Black Quote Overlay
                          (Visible on desktop hover, or on mobile when tapped)
                        */}
                        <div
                          className={`absolute inset-0 bg-black/95 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 z-20 ${
                            isMobileActive
                              ? "opacity-100 pointer-events-auto"
                              : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                          }`}
                        >
                          {/* Founder Name & Role header on hover */}
                          <div>
                            <h4 className="font-bold text-sm sm:text-[15px] text-white tracking-tight leading-tight">
                              {client.name}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                              {client.role}
                            </p>
                          </div>

                          {/* Testimonial Quote */}
                          <p className="text-xs sm:text-[12.5px] leading-relaxed text-neutral-200 font-normal my-auto pt-2 pb-2">
                            {client.quote}
                          </p>

                          {/* Bottom Row: "READ THE CASE STUDY" + Red Arrow Button */}
                          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-neutral-300 group-hover:text-white uppercase transition-colors">
                              READ THE CASE STUDY
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCaseStudy(client.projectSlug);
                              }}
                              aria-label={`Open case study for ${client.name}`}
                              className="w-8 h-8 rounded-full bg-[#ED3327] hover:bg-[#ff3b2f] flex items-center justify-center text-white text-xs font-bold shadow-md transition-transform duration-200 group-hover:scale-110 active:scale-95 cursor-pointer"
                            >
                              ↗
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ════════════════ MOBILE SLIDE CONTROLS BAR (Directly below cards on mobile) ════════════════ */}
            <div className="sm:hidden flex items-center justify-between pt-4 pb-1 px-1 border-t border-neutral-300/80 mt-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                  SLIDE {currentSlide === 0 ? "01" : "02"} / 02
                </span>
                {/* Visual Dot Indicators */}
                <div className="flex items-center gap-1">
                  <span
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      currentSlide === 0 ? "w-4 bg-[#ED3327]" : "w-1.5 bg-neutral-400"
                    }`}
                  />
                  <span
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      currentSlide === 1 ? "w-4 bg-[#ED3327]" : "w-1.5 bg-neutral-400"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentSlide(0);
                    setIsPaused(true);
                  }}
                  className={`px-3 py-1.5 rounded-xs border text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                    currentSlide === 0
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-300 active:bg-neutral-100"
                  }`}
                  aria-label="Previous 4 clients"
                >
                  <span>←</span>
                  <span className="text-[10px] font-bold">PREV</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentSlide(1);
                    setIsPaused(true);
                  }}
                  className={`px-3 py-1.5 rounded-xs border text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                    currentSlide === 1
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-300 active:bg-neutral-100"
                  }`}
                  aria-label="Next 4 clients"
                >
                  <span className="text-[10px] font-bold">NEXT</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edge-to-Edge Full-Width Black Marquee Strip Sitting Flush at Bottom */}
      <div className="w-full mt-auto">
        <ClientsMarquee />
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
