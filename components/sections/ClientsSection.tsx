"use client";

import React from "react";
import ClientsMarquee from "./ClientsMarquee";

export default function ClientsSection() {
  return (
    <section data-theme="light" className="relative w-full min-h-[500px] lg:h-screen lg:min-h-[600px] bg-[#F4F4F0] text-neutral-900 flex flex-col justify-between pt-20 sm:pt-28 pb-0 select-none overflow-hidden rounded-none my-0 border-t border-neutral-300">
      {/* Top Header & Right Client Description */}
      <div className="max-w-8xl mx-auto w-full px-6 sm:px-14 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between w-full pt-4">
          <div className="hidden md:block" />

          {/* Right Column: OUR CLIENTS Text Snippet */}
          <div className="max-w-md ml-auto text-left space-y-3">
            <span className="block text-xs sm:text-[13px] font-mg12-regular font-light tracking-[0.2em] text-neutral-600 uppercase select-none">
              OUR CLIENTS
            </span>
            <p className="text-xs sm:text-[13px] font-mg12-regular font-light text-neutral-700 leading-relaxed">
              Y Combinator startups, industrial companies, US hardware manufacturers: they build technologies that reshape their industry. We build the websites that make them visible.
            </p>
          </div>
        </div>
      </div>

      {/* Edge-to-Edge Full-Width Black Marquee Strip Sitting Flush at Bottom */}
      <div className="w-full mt-auto">
        <ClientsMarquee />
      </div>
    </section>
  );
}
