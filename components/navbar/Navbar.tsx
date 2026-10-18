"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import GravityLogo from "@/components/logo/GravityLogo";
import ScrambleText from "@/components/ui/ScrambleText";
import CloseButton from "@/components/ui/CloseButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [isDarkBg, setIsDarkBg] = useState(() => (pathname?.startsWith("/contact") || pathname?.startsWith("/services") ? false : true));
  const { scrollY } = useScroll();
  const lenis = useSmoothScroll();

  // Sync active menu item with current route/hash whenever route or menu opens
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (pathname?.startsWith("/projects") || hash === "#projects") setActiveItem("Projects");
    else if (pathname === "/services" || hash === "#services") setActiveItem("Services");
    else if (hash === "#industries") setActiveItem("Industries");
    else if (hash === "#studio") setActiveItem("Studio");
    else if (hash === "#news") setActiveItem("News");
    else if (pathname === "/contact") setActiveItem("Contact");
    else setActiveItem("Home");
  }, [pathname, menuOpen]);

  // Dynamically detect whether the section under the fixed Navbar is dark or light
  useEffect(() => {
    let rafId: number | null = null;

    const checkBgTheme = () => {
      if (typeof window === "undefined") return;

      // On /projects page: Top 100vh hero banner is dark, below that is light
      if (pathname?.startsWith("/projects")) {
        const threshold = window.innerHeight - 80;
        const currentScroll = window.scrollY || (lenis ? lenis.scroll : 0);
        setIsDarkBg(currentScroll < threshold);
        return;
      }

      // Contact and Services pages start with light theme
      if (pathname?.startsWith("/contact") || pathname?.startsWith("/services")) {
        setIsDarkBg(false);
        return;
      }

      const x = window.innerWidth / 2;
      const y = 45; // top bar area

      const elements = document.elementsFromPoint(x, y);
      let foundDark = true;

      for (const el of elements) {
        // Ignore header, loader overlay and canvas elements
        if (
          el.closest("header") ||
          el.tagName === "HEADER" ||
          el.closest(".z-\\[9999\\]") ||
          el.closest(".z-\\[9998\\]") ||
          el.getAttribute("data-loader")
        ) {
          continue;
        }

        // Check explicit data-theme attribute
        const theme =
          el.getAttribute("data-theme") ||
          el.closest("[data-theme]")?.getAttribute("data-theme");
        if (theme) {
          foundDark = theme === "dark";
          break;
        }

        // Fallback: check computed background color brightness
        const section = el.closest("section, footer, main, div");
        if (section) {
          const bg = window.getComputedStyle(section).backgroundColor;
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const brightness =
              (Number(rgb[0]) * 299 + Number(rgb[1]) * 587 + Number(rgb[2]) * 114) / 1000;
            // brightness < 128 is dark, otherwise light
            foundDark = brightness < 128;
            break;
          }
        }
      }

      setIsDarkBg(foundDark);
    };

    const scheduleCheck = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        checkBgTheme();
        rafId = null;
      });
    };

    // Immediate check on mount / route change
    scheduleCheck();
    const t1 = setTimeout(scheduleCheck, 150);
    const t2 = setTimeout(scheduleCheck, 600);
    const t3 = setTimeout(scheduleCheck, 1500);

    if (lenis) {
      lenis.on("scroll", scheduleCheck);
    }

    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (lenis) {
        lenis.off("scroll", scheduleCheck);
      }
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, [lenis, pathname]);

  // Center navigation links translate UP and fade OUT smoothly on scroll down
  const linksY = useTransform(scrollY, [0, 150], [0, -40]);
  const linksOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <>
      {/* Fixed Main Header matching Screenshot 1 */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 select-none pointer-events-none transition-colors duration-300">
        <nav className="max-w-8xl mx-auto flex items-start justify-between">
          {/* Top Left Logo (Adapts to black on light backgrounds, white on dark backgrounds) */}
          <div className="flex items-center pointer-events-auto">
            <GravityLogo showLink={true} isDark={!isDarkBg} textSize="text-xl sm:text-2xl" />
          </div>

          {/* Center 2-Column Links Layout (Slides up & fades out on scroll, color adapts to background) */}
          <motion.div
            style={{ y: linksY, opacity: linksOpacity }}
            className={`hidden md:flex items-start gap-14 lg:gap-16 text-sm sm:text-[15px] font-mg12-regular font-light transition-colors duration-300 pointer-events-auto ${isDarkBg ? "text-neutral-300" : "text-neutral-700"
              }`}
          >
            {/* Column 1 */}
            <div className="flex flex-col space-y-2">
              {[
                { name: "Projects", href: "/projects" },
                { name: "Studio", href: "/#studio" },
                { name: "Services", href: "/services" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-block transition-colors duration-200 ${isDarkBg
                      ? "text-neutral-300 hover:text-white"
                      : "text-neutral-700 hover:text-black"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col space-y-2">
              {[
                { name: "News", href: "/#news" },
                { name: "Industries", href: "/#industries" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-block transition-colors duration-200 ${isDarkBg
                      ? "text-neutral-300 hover:text-white"
                      : "text-neutral-700 hover:text-black"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Top Right Hamburger Icon Button (Adapts to black on light bg, white on dark bg) */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={`group p-2 flex flex-col items-end justify-center gap-1.5 cursor-pointer focus:outline-none transition-colors duration-300 pointer-events-auto ${isDarkBg ? "text-white" : "text-black"
              }`}
            aria-label="Open Navigation Menu"
          >
            <span
              className={`w-6 h-[1.5px] transition-all duration-300 ${isDarkBg ? "bg-white" : "bg-black"
                }`}
            />
            <span
              className={`w-6 h-[1.5px] transition-all duration-300 group-hover:scale-x-50 origin-center ${isDarkBg ? "bg-white" : "bg-black"
                }`}
            />
          </button>
        </nav>
      </header>

      {/* Navigation Popup Menu Originating from Top-Right Menu Icon */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Popup Menu */}
            <motion.aside
              initial={{ opacity: 0, scale: 0.15, transformOrigin: "top right", borderRadius: "32px" }}
              animate={{ opacity: 1, scale: 1, transformOrigin: "top right", borderRadius: "24px" }}
              exit={{ opacity: 0, scale: 0.15, transformOrigin: "top right", borderRadius: "32px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 z-[100] w-[calc(100vw-1.5rem)] sm:w-[540px] md:w-[600px] lg:w-[620px] max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2.5rem)] md:max-h-[calc(100vh-3rem)] h-fit bg-[#EFEFEF] text-neutral-900 p-6 sm:p-8 md:p-9 flex flex-col justify-between overflow-hidden select-none shadow-2xl border border-neutral-300"
            >
              {/* Popup Top Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4">
                <span className="text-xs sm:text-[13px] font-mg12-regular font-light tracking-[0.2em] text-neutral-500 uppercase select-none">
                  NAVIGATION
                </span>

                {/* Reusable Close Button */}
                <CloseButton onClick={() => setMenuOpen(false)} ariaLabel="Close Menu" />
              </div>

              {/* Main Nav Links Stack */}
              <div className="py-2 sm:py-3 space-y-1 sm:space-y-1.5 md:space-y-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "Projects", href: "/projects" },
                  { name: "Services", href: "/services" },
                  { name: "Industries", href: "/#industries" },
                  { name: "Studio", href: "/#studio" },
                  { name: "News", href: "/#news" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => {
                  const isActive = activeItem === item.name;
                  return (
                    <div key={item.name} className="relative">
                      <Link
                        href={item.href}
                        onClick={() => {
                          setActiveItem(item.name);
                          setMenuOpen(false);
                        }}
                        className={`group relative inline-flex items-center text-3xl sm:text-4xl md:text-[42px] leading-[1.18] font-mg12-regular font-light tracking-tight transition-colors duration-200 ${isActive ? "text-neutral-500" : "text-neutral-900"
                          }`}
                      >
                        <span className="relative inline-block transition-transform duration-300 ease-out group-hover:translate-x-3">
                          {item.name}
                          {/* Thin linear underline starting from LEFT */}
                          <span
                            className={`absolute -bottom-0.5 left-0 w-full h-[1.5px] ${isActive ? "bg-neutral-500" : "bg-neutral-900"
                              } origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-linear pointer-events-none`}
                          />
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Popup Footer Grid & Copyright Bar */}
              <div className="space-y-4 pt-4 border-t border-neutral-300/80">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="block text-[13px] sm:text-sm font-mg12-regular font-light text-neutral-500 tracking-wider uppercase select-none">
                      Most Recent Projects
                    </span>
                    <div className="space-y-1.5 text-neutral-900 font-mg12-regular text-sm sm:text-[15px] flex flex-col items-start">
                      {[
                        "Sutra CRM [Enterprise CRM]",
                        "Indus Luxe [E-Commerce]",
                        "Sarva CMS [Headless CMS]",
                        "Kala Studio [Portfolio]",
                      ].map((proj) => (
                        <span key={proj} className="block cursor-pointer">
                          <ScrambleText text={proj} hoverColor="#ED3327" />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-[13px] sm:text-sm font-mg12-regular font-light text-neutral-500 tracking-wider uppercase select-none">
                      Socials
                    </span>
                    <div className="space-y-1.5 text-neutral-900 font-mg12-regular text-sm sm:text-[15px] flex flex-col items-start">
                      <a
                        href="https://linkedin.com/in/isourabh99"
                        target="_blank"
                        rel="noreferrer"
                        className="block cursor-pointer"
                      >
                        <ScrambleText text="LinkedIn" hoverColor="#ED3327" />
                      </a>
                      <a
                        href="https://instagram.com/isaurabh_99"
                        target="_blank"
                        rel="noreferrer"
                        className="block cursor-pointer"
                      >
                        <ScrambleText text="Instagram" hoverColor="#ED3327" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}