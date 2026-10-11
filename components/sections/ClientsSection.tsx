"use client";

import React from "react";

export default function ClientsSection() {
  return (
    <section data-theme="light" className="relative w-full h-screen min-h-[650px] bg-[#F4F4F0] text-neutral-900 flex flex-col justify-between px-6 sm:px-14 pt-28 pb-10 select-none overflow-hidden rounded-[40px] sm:rounded-[60px] shadow-2xl my-4 border border-neutral-300">
      {/* Top Header & Right Client Description matching Screenshot 1 & 3 */}
      <div className="max-w-8xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <div className="flex items-start justify-between w-full pt-4">
          <div className="hidden md:block" />

          {/* Right Column: OUR CLIENTS Text Snippet (Menu-styled text size & font light) */}
          <div className="max-w-md ml-auto text-left space-y-3">
            <span className="block text-xs sm:text-[13px] font-mg12-regular font-light tracking-[0.2em] text-neutral-600 uppercase select-none">
              OUR CLIENTS
            </span>
            <p className="text-xs sm:text-[13px] font-mg12-regular font-light text-neutral-700 leading-relaxed">
              Y Combinator startups, industrial companies, US hardware manufacturers: they build technologies that reshape their industry. We build the websites that make them visible.
            </p>
          </div>
        </div>

        {/* Bottom Client Logos Row with menu-styled subtle hover interactions */}
        <div className="py-12 border-t border-neutral-300/80 my-auto">
          <div className="flex flex-wrap items-center justify-between gap-8 sm:gap-12 opacity-90">
            {/* Logo 1: HyLight */}
            <span className="group relative inline-block cursor-pointer">
              <span className="font-mg12-bold text-2xl sm:text-3xl font-bold tracking-tight text-black inline-block transition-transform duration-200 group-hover:translate-x-1">
                HyLight
              </span>
            </span>

            {/* Logo 2: SKIPPER NDT */}
            <span className="group relative inline-block cursor-pointer">
              <span className="font-mg12-bold text-xl sm:text-2xl font-bold tracking-widest text-black uppercase inline-block transition-transform duration-200 group-hover:translate-x-1">
                SKIPPER NDT
              </span>
            </span>

            {/* Logo 3: blink */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="w-5 h-5 rounded bg-black flex items-center justify-center text-white text-xs font-bold">
                ◇
              </span>
              <span className="font-mg12-bold text-2xl font-bold tracking-tight text-black inline-block transition-transform duration-200 group-hover:translate-x-1">
                blink
              </span>
            </div>

            {/* Logo 4: alt a */}
            <span className="group relative inline-block cursor-pointer">
              <span className="font-mg12-bold text-2xl font-bold text-black tracking-tight inline-block transition-transform duration-200 group-hover:translate-x-1">
                alt a
              </span>
            </span>

            {/* Logo 5: artefact */}
            <span className="group relative inline-block cursor-pointer">
              <span className="font-mg12-regular text-2xl text-black tracking-tight inline-block transition-transform duration-200 group-hover:translate-x-1">
                artefact
              </span>
            </span>

            {/* Logo 6: BotBlox Systems */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="font-mono font-bold text-lg text-black">❖</span>
              <span className="font-mg12-bold text-xl font-bold text-black tracking-tight inline-block transition-transform duration-200 group-hover:translate-x-1">
                BotBlox Systems
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
