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
  text,
  className = "",
  hoverColor = "#ED3327",
  autoPlay = false,
  interactive = true,
  speed = 0.5,
  onComplete,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(autoPlay ? "" : text);
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (hoverColor && interactive) setIsHovered(true);
    let iteration = 0;
    const maxIterations = text.length;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const step = () => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === ":" || char === "+" || char === "@" || char === "." || char === "—" || char === ",") {
              return char;
            }
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration < maxIterations) {
        iteration += speed;
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(text);
        if (onComplete) onComplete();
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [text, hoverColor, interactive, speed, onComplete]);

  const stopScramble = useCallback(() => {
    if (interactive) {
      setIsHovered(false);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      setDisplayText(text);
    }
  }, [interactive, text]);

  useEffect(() => {
    if (autoPlay) {
      startScramble();
    } else {
      setDisplayText(text);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [autoPlay, text, startScramble]);

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
