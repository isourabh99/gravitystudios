"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ServiceDetail {
  number: string;
  title: string;
  category: string;
  tagline: string;
  deliverables: string[];
  technologies: string[];
  timeline: string;
}

export interface ServiceAccordionItemProps {
  service: ServiceDetail;
  /**
   * Controlled open state. If not provided, component manages its own state.
   */
  isOpen?: boolean;
  /**
   * Initial open state when uncontrolled.
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when clicking the header row.
   */
  onToggle?: () => void;
  className?: string;
}

export default function ServiceAccordionItem({
  service,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onToggle,
  className = "",
}: ServiceAccordionItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  // Support both controlled and uncontrolled usage
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    if (!isControlled) {
      setInternalIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={`py-6 sm:py-8 transition-colors duration-200 ${className}`}
    >
      {/* Clickable Header Row */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex flex-col md:flex-row md:items-center justify-between text-left gap-4 cursor-pointer group select-none focus:outline-hidden"
        aria-expanded={isOpen}
      >
        <div className="flex items-start md:items-center gap-6 sm:gap-10">
          <span className="font-mono text-sm sm:text-base font-bold text-[#ED3327]">
            {service.number}
          </span>
          <div>
            <h3 className="font-mg12-bold text-xl sm:text-2xl md:text-3xl text-neutral-900 group-hover:text-[#ED3327] transition-colors duration-200">
              {service.title}
            </h3>
            <span className="font-mono text-[11px] sm:text-xs text-neutral-600 uppercase tracking-wider block mt-1">
              {service.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 self-end md:self-auto">
          <span className="font-mono text-xs sm:text-sm text-neutral-600 hidden sm:inline-block">
            {service.timeline}
          </span>
          <span className="w-8 h-8 rounded-full border border-neutral-400 flex items-center justify-center text-sm font-mono text-neutral-800 group-hover:border-[#ED3327] group-hover:text-[#ED3327] group-hover:bg-white transition-all">
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-block leading-none"
            >
              +
            </motion.span>
          </span>
        </div>
      </button>

      {/* Expanded Content Area with smooth height animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-8 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <p className="font-mg12-regular text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
                  {service.tagline}
                </p>

                <div className="pt-2">
                  <span className="block font-mono text-[11px] text-neutral-600 uppercase tracking-widest mb-2">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white border border-neutral-300 font-mono text-[11px] sm:text-xs text-neutral-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-2 lg:pl-8 lg:border-l border-neutral-300">
                <span className="block font-mono text-[11px] text-neutral-600 uppercase tracking-widest mb-3">
                  Key Deliverables
                </span>
                <ul className="space-y-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-mg12-regular text-xs sm:text-sm text-neutral-800"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
