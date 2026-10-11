"use client";

import React from "react";
import GravityLogo from "@/components/logo/GravityLogo";
import CopyrightBar from "@/components/ui/CopyrightBar";
import ScrambleText from "@/components/ui/ScrambleText";
import Link from "next/link";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export default function Footer() {
  const lenis = useSmoothScroll();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer data-theme="light" className="relative bg-[#F4F4F0] text-neutral-900 px-6 sm:px-12 py-6 sm:py-8 select-none min-h-screen flex flex-col justify-between border-t border-neutral-300 overflow-visible">
      <div className="max-w-8xl mx-auto w-full flex-1 flex flex-col justify-between">

        {/* Top Header Row matching Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-6 border-b border-neutral-300">
          {/* Giant Title: GET IN TOUCH. */}
          <div className="lg:col-span-8">
            <h2 className="font-mg12-regular text-4xl sm:text-6xl lg:text-[6.5rem] xl:text-[7.2rem] leading-none text-neutral-900 tracking-tight">
              GET IN TOUCH.
            </h2>
          </div>

          {/* Right Column Intro Text */}
          <div className="lg:col-span-4 pt-2">
            <p className="text-sm sm:text-[15px] font-mg12-regular font-light text-neutral-600 leading-relaxed max-w-md">
              We build premium websites on Framer, Astro or Next.js, using motion design and interactive 3D to make complex products clear and easy to buy.
            </p>
          </div>
        </div>

        {/* Middle 4-Column Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 py-4 sm:py-6 text-sm sm:text-[15px] font-mg12-regular font-light">

          {/* Column 1: Vertical Social Links (LinkedIn & Instagram only, removed Twitter & GitHub) */}
          <div className="lg:col-span-3 flex flex-col border-t border-neutral-300">
            {[
              { name: "LinkedIn", href: "https://linkedin.com/in/isourabh99" },
              { name: "Instagram", href: "https://instagram.com/isaurabh_99" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group w-full py-2.5 sm:py-3 border-b border-neutral-300 flex items-center justify-between text-neutral-800 cursor-pointer"
              >
                <ScrambleText text={social.name} hoverColor="#ED3327" />
                <span className="text-sm transition-colors duration-200 group-hover:text-[#ED3327]">
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Column 2: Navigation & Latest Projects with ScrambleText hover */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-2">
              <span className="block text-[13px] sm:text-sm font-mg12-regular font-light tracking-[0.2em] text-neutral-600 uppercase select-none">
                NAVIGATION
              </span>
              <div className="space-y-1.5 flex flex-col items-start">
                {[
                  { name: "Studio", href: "/#studio" },
                  { name: "Our projects", href: "/#projects" },
                  { name: "Our services", href: "/#services" },
                  { name: "News", href: "/#news" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link key={item.name} href={item.href} className="block">
                    <ScrambleText text={item.name} hoverColor="#ED3327" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-[13px] sm:text-sm font-mg12-regular font-light tracking-[0.2em] text-neutral-600 uppercase select-none">
                LATEST PROJECTS
              </span>
              <div className="space-y-1.5 flex flex-col items-start">
                {[
                  "BotBlox Systems",
                  "Hylight",
                  "Artefact area",
                  "Une Autre Île Productions",
                ].map((proj) => (
                  <span key={proj} className="block cursor-pointer">
                    <ScrambleText text={proj} hoverColor="#ED3327" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Contact with ScrambleText hover */}
          <div className="lg:col-span-3 space-y-2">
            <span className="block text-[13px] sm:text-sm font-mg12-regular font-light tracking-[0.2em] text-neutral-600 uppercase select-none">
              CONTACT
            </span>
            <div className="space-y-2 text-neutral-800">
              <a href="mailto:isourabhsoni99@gmail.com" className="block">
                <ScrambleText text="isourabhsoni99@gmail.com" hoverColor="#ED3327" />
              </a>
              <a
                href="https://wa.me/919109270472"
                target="_blank"
                rel="noreferrer"
                className="block font-mono text-sm sm:text-[14px] text-neutral-600 hover:text-[#ED3327] transition-colors"
              >
                <ScrambleText text="Whatsapp • +91 9109270472" hoverColor="#ED3327" />
              </a>
            </div>
          </div>

          {/* Column 4: Legal with ScrambleText hover */}
          <div className="lg:col-span-3 space-y-2">
            <span className="block text-[13px] sm:text-sm font-mg12-regular font-light tracking-[0.2em] text-neutral-600 uppercase select-none">
              LEGAL
            </span>
            <div className="space-y-1.5 flex flex-col items-start">
              {["Legal notice", "Privacy policy"].map((legal) => (
                <span key={legal} className="block cursor-pointer">
                  <ScrambleText text={legal} hoverColor="#ED3327" />
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Footer Section: Logo + CopyrightBar */}
        <div className="pt-4 border-t border-neutral-300 space-y-4 mt-8 lg:mt-0">
          <div className="flex items-center justify-between">
            <GravityLogo showLink={true} isDark={true} textSize="text-xl sm:text-2xl" />

            {/* Circular Back To Top Button on right of Logo (above CopyrightBar) */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white hover:bg-[#ED3327] flex items-center justify-center transition-colors duration-300 cursor-pointer overflow-hidden shadow-sm select-none shrink-0"
              aria-label="Back to top"
            >
              <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center">
                {/* Primary arrow sliding up out of view on hover */}
                <span className="inline-flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:opacity-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </span>
                {/* Duplicate arrow sliding up into view from bottom on hover */}
                <span className="absolute inset-0 inline-flex items-center justify-center translate-y-full opacity-0 transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-hover:opacity-100">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </span>
              </div>
            </button>
          </div>

          <div className="pt-2">
            <CopyrightBar variant="footer" />
          </div>
        </div>

      </div>
    </footer>
  );
}
