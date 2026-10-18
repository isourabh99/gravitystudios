"use client";

import React from "react";

interface ClientItem {
  id: string;
  name: string;
  render: () => React.ReactNode;
}

const CLIENTS: ClientItem[] = [
  {
    id: "sutra",
    name: "Sutra CRM",
    render: () => (
      <span className="font-mg12-bold text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-[#ED3327] transition-colors cursor-pointer select-none">
        Sutra CRM
      </span>
    ),
  },
  {
    id: "indus",
    name: "INDUS LUXE",
    render: () => (
      <span className="font-mg12-bold text-base sm:text-lg font-bold tracking-widest text-white uppercase hover:text-[#ED3327] transition-colors cursor-pointer select-none">
        INDUS LUXE
      </span>
    ),
  },
  {
    id: "sarva",
    name: "Sarva CMS",
    render: () => (
      <div className="flex items-center gap-1.5 group/logo hover:text-[#ED3327] transition-colors cursor-pointer select-none">
        <span className="w-4 h-4 rounded bg-white flex items-center justify-center text-black text-[10px] font-bold transition-all group-hover/logo:bg-[#ED3327] group-hover/logo:text-white">
          ◇
        </span>
        <span className="font-mg12-bold text-xl sm:text-2xl font-bold tracking-tight text-white group-hover/logo:text-[#ED3327] transition-colors">
          Sarva CMS
        </span>
      </div>
    ),
  },
  {
    id: "kala",
    name: "Kala Studio",
    render: () => (
      <span className="font-mg12-bold text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-[#ED3327] transition-colors cursor-pointer select-none">
        Kala Studio
      </span>
    ),
  },
  {
    id: "kosh",
    name: "Kosh Wealth",
    render: () => (
      <span className="font-mg12-regular text-xl sm:text-2xl text-white tracking-tight hover:text-[#ED3327] transition-colors cursor-pointer select-none">
        Kosh Wealth
      </span>
    ),
  },
  {
    id: "pravaah",
    name: "Pravaah Logistics",
    render: () => (
      <div className="flex items-center gap-1.5 group/logo hover:text-[#ED3327] transition-colors cursor-pointer select-none">
        <span className="font-mono font-bold text-base text-white group-hover/logo:text-[#ED3327] transition-colors">
          ❖
        </span>
        <span className="font-mg12-bold text-base sm:text-lg font-bold text-white tracking-tight group-hover/logo:text-[#ED3327] transition-colors">
          Pravaah Logistics
        </span>
      </div>
    ),
  },
  {
    id: "veda",
    name: "Veda Health",
    render: () => (
      <span className="font-mg12-bold text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-[#ED3327] transition-colors cursor-pointer select-none">
        Veda Health
      </span>
    ),
  },
  {
    id: "drishti",
    name: "Drishti AI",
    render: () => (
      <span className="font-mg12-bold text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-[#ED3327] transition-colors cursor-pointer select-none">
        Drishti AI
      </span>
    ),
  },
];

export interface ClientsMarqueeProps {
  className?: string;
  speedSeconds?: number;
}

export default function ClientsMarquee({
  className = "",
  speedSeconds = 25,
}: ClientsMarqueeProps) {
  // Repeating array twice per track block ensures plenty of elements across all viewport widths
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <div
      className={`relative w-full bg-black text-white py-3 sm:py-4 overflow-hidden rounded-none border-y border-neutral-800 select-none pause-on-hover ${className}`}
      aria-label="Our Clients"
    >
      {/* Left & Right Soft Edge Fades for sleek cinematic look */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

      {/* Marquee Track */}
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {/* Set 1 */}
        <div className="flex shrink-0 items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
          {items.map((client, idx) => (
            <div
              key={`track1-${client.id}-${idx}`}
              className="shrink-0 flex items-center justify-center"
            >
              {client.render()}
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicates Set 1 for seamless infinite looping) */}
        <div
          className="flex shrink-0 items-center gap-12 sm:gap-20 pr-12 sm:pr-20"
          aria-hidden="true"
        >
          {items.map((client, idx) => (
            <div
              key={`track2-${client.id}-${idx}`}
              className="shrink-0 flex items-center justify-center"
            >
              {client.render()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
