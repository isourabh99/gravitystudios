"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export interface ScrambleTextProps {
  text: string;
  className?: string;
  hoverColor?: string;
  autoPlay?: boolean;
  interactive?: boolean;
  speed?: number;
  onComplete?: () => void;
}

export default function ScrambleText({
  text = "",
  className = "",
  hoverColor = "#ED3327",
  autoPlay = false,
  interactive = true,
  speed = 0.5,
  onComplete,
}: ScrambleTextProps) {
  const safeText = text || "";
  const [displayText, setDisplayText] = useState(autoPlay ? "" : safeText);
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startScramble = useCallback(() => {
    if (!safeText) {
      setDisplayText("");
      return;
    }
    if (hoverColor && interactive) setIsHovered(true);
    let iteration = 0;
    const maxIterations = safeText.length;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const step = () => {
      setDisplayText(
        safeText
          .split("")
          .map((char, index) => {
            if (char === " " || char === ":" || char === "+" || char === "@" || char === "." || char === "—" || char === ",") {
              return char;
            }
            if (index < iteration) {
              return safeText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration < maxIterations) {
        iteration += speed;
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(safeText);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [safeText, hoverColor, interactive, speed]);

  const stopScramble = useCallback(() => {
    if (interactive) {
      setIsHovered(false);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      setDisplayText(safeText);
    }
  }, [interactive, safeText]);

  useEffect(() => {
    if (autoPlay) {
      startScramble();
    } else {
      setDisplayText(safeText);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // Only trigger scramble when safeText changes or on mount (slide change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, safeText]);

  return (
    <span
      onMouseEnter={interactive ? startScramble : undefined}
      onMouseLeave={interactive ? stopScramble : undefined}
      className={`inline-block transition-colors duration-200 select-none ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
      style={{
        color: isHovered && interactive ? hoverColor : undefined,
      }}
    >
      {displayText}
    </span>
  );
}
