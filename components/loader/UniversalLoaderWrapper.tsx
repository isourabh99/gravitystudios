"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import UniversalLoader from "@/components/loader/UniversalLoader";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export const UniversalLoaderContext = createContext<{ isLoading: boolean }>({ isLoading: false });

export function useUniversalLoader() {
  return useContext(UniversalLoaderContext);
}

/**
 * UniversalLoaderWrapper:
 * - CMS (/admin/*): Loader is NEVER shown. Dedicated skeletons are used instead.
 * - Main Website: Studio loader runs ONLY on page route changes/transitions.
 */
export default function UniversalLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenis = useSmoothScroll();
  const isAdmin = pathname.startsWith("/admin");

  const [loading, setLoading] = useState(false);
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    // 1. Strict CMS Rule: NEVER show website loader in admin
    if (isAdmin) {
      setLoading(false);
      prevPathname.current = pathname;
      return;
    }

    // 2. Initial visit on website: Skeletons & direct view, no full-screen blocker
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      setLoading(false);
      return;
    }

    // 3. Page changes on main website: Trigger transition loader
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      setLoading(true);
    }
  }, [pathname, lenis, isAdmin]);

  // Manage body scroll locking only during active page transition loader
  useEffect(() => {
    if (isAdmin) {
      document.body.style.overflow = "";
      return;
    }

    if (loading) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) {
        lenis.start();
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [loading, lenis, isAdmin]);

  return (
    <UniversalLoaderContext.Provider value={{ isLoading: loading }}>
      {!isAdmin && loading && (
        <UniversalLoader
          key={pathname}
          pathname={pathname}
          onComplete={() => setLoading(false)}
        />
      )}
      <div className="w-full">
        {children}
      </div>
    </UniversalLoaderContext.Provider>
  );
}
