"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import UniversalLoader from "@/components/loader/UniversalLoader";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export const UniversalLoaderContext = createContext<{ isLoading: boolean }>({ isLoading: true });

export function useUniversalLoader() {
  return useContext(UniversalLoaderContext);
}

export default function UniversalLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const lenis = useSmoothScroll();
  const isFirstMount = useRef(true);

  // Trigger loader on mount and route changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setLoading(true);
      return;
    }

    // Client-side route changes
    setLoading(true);
  }, [pathname]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
  }, [loading, lenis]);

  return (
    <UniversalLoaderContext.Provider value={{ isLoading: loading }}>
      {loading && (
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
