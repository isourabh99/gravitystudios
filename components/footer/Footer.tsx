"use client";

import React from "react";
import GravityLogo from "@/components/logo/GravityLogo";
import CopyrightBar from "@/components/ui/CopyrightBar";
import ScrambleText from "@/components/ui/ScrambleText";
import Link from "next/link";

export default function Footer() {
  return (
    <footer data-theme="light" className="relative bg-[#F9F9F7] text-neutral-900 px-6 sm:px-12 py-6 sm:py-8 select-none h-screen max-h-screen flex flex-col justify-between border-t border-neutral-300 overflow-hidden">
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

        {/* Bottom Footer Section: Logo + CopyrightBar (Reveals when end of website is reached) */}
        <div className="pt-4 border-t border-neutral-300 space-y-3">
          <div className="flex items-center justify-between">
            <GravityLogo showLink={true} isDark={true} textSize="text-xl sm:text-2xl" />
          </div>

          {/* CopyrightBar: Hidden until website bottom is reached */}
          <div className="pt-1">
            <CopyrightBar variant="footer" />
          </div>
        </div>

      </div>

      {/* Sentinel for detecting website bottom */}
      <div id="footer-end-sentinel" className="w-full h-[1px] pointer-events-none -mt-[1px]" />
    </footer>
  );
}
