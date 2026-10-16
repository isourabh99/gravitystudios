"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CapabilityItem } from "@/components/services/ShutterCapabilityCard";
import CtaButton from "@/components/ui/CtaButton";
import ScrambleText from "@/components/ui/ScrambleText";

export interface CapabilityDetailModalProps {
  item: CapabilityItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CapabilityDetailModal({
  item,
  isOpen,
  onClose,
}: CapabilityDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#0D0E11] text-white border border-neutral-700 shadow-2xl rounded-md overflow-hidden max-h-[90vh] flex flex-col z-10"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-neutral-800 bg-[#090A0D]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#ED3327] tracking-widest uppercase">
                  {item.label || `CAPABILITY / ${item.number}`}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span className="font-mono text-xs text-neutral-400 uppercase">
                  {item.category}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full border border-neutral-700 hover:border-[#ED3327] hover:text-[#ED3327] flex items-center justify-center text-xs font-mono transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              {/* Title & Tagline */}
              <div className="space-y-3">
                <h3 className="font-mg12-bold text-3xl sm:text-4xl text-white tracking-tight">
                  <ScrambleText text={item.title} autoPlay={true} />
                </h3>
                <p className="font-mg12-regular text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                  {item.tagline}
                </p>
              </div>

              {/* Grid: Deliverables & Tech Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-neutral-800">
                {/* Deliverables */}
                <div className="space-y-3">
                  <span className="block font-mono text-[11px] text-[#ED3327] uppercase tracking-widest">
                    KEY DELIVERABLES
                  </span>
                  <ul className="space-y-2.5">
                    {item.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-300 font-mg12-regular">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327] mt-1.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech & Timeline */}
                <div className="space-y-6">
                  <div>
                    <span className="block font-mono text-[11px] text-neutral-400 uppercase tracking-widest mb-2.5">
                      PRODUCTION STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-xs bg-neutral-900 text-neutral-200 border border-neutral-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block font-mono text-[11px] text-neutral-400 uppercase tracking-widest mb-1.5">
                      TYPICAL SPRINT TIMELINE
                    </span>
                    <span className="font-mono text-sm text-white font-bold">
                      {item.timeline}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="p-6 border-t border-neutral-800 bg-[#090A0D] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-neutral-500 text-center sm:text-left">
                Production-grade architecture with 99+ PageSpeed guarantee.
              </span>
              <CtaButton href="/contact" variant="brand" onClick={onClose}>
                Inquire About This Service ↗
              </CtaButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
