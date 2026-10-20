"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

export const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export interface ScrambleTextProps {
  text: string;
  className?: string;
  hoverColor?: string;
  autoPlay?: boolean;
  interactive?: boolean;
  speed?: number;
  chars?: string;
  trigger?: boolean;
  as?: React.ElementType;
  onComplete?: () => void;
}

export interface ScrambleTextRef {
  startScramble: () => void;
  stopScramble: () => void;
}

const ScrambleText = forwardRef<ScrambleTextRef, ScrambleTextProps>(function ScrambleText(
  {
    text = "",
    className = "",
    hoverColor = "#ED3327",
    autoPlay = false,
    interactive = true,
    speed = 0.5,
    chars,
    trigger = false,
    as = "span",
    onComplete,
  },
  ref
) {
  const safeText = text || "";
  const [displayText, setDisplayText] = useState(autoPlay ? "" : safeText);
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  const prevTriggerRef = useRef(false);

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
    const charPool = chars || DEFAULT_CHARS;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const step = () => {
      setDisplayText(
        safeText
          .split("")
          .map((char, index) => {
            if (
              char === " " ||
              char === ":" ||
              char === "+" ||
              char === "@" ||
              char === "." ||
              char === "—" ||
              char === "," ||
              char === "'" ||
              char === "’" ||
              char === '"' ||
              char === "`" ||
              char === "-"
            ) {
              return char;
            }
            if (index < iteration) {
              return safeText[index];
            }
            return charPool[Math.floor(Math.random() * charPool.length)];
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
  }, [safeText, hoverColor, interactive, speed, chars]);

  const stopScramble = useCallback(() => {
    if (interactive) {
      setIsHovered(false);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      setDisplayText(safeText);
    }
  }, [interactive, safeText]);

  useImperativeHandle(
    ref,
    () => ({
      startScramble,
      stopScramble,
    }),
    [startScramble, stopScramble]
  );

  // Trigger scramble when trigger prop transitions to true
  useEffect(() => {
    if (trigger && !prevTriggerRef.current) {
      startScramble();
    }
    prevTriggerRef.current = !!trigger;
  }, [trigger, startScramble]);

  useEffect(() => {
    if (autoPlay) {
      startScramble();
    } else if (!trigger) {
      setDisplayText(safeText);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // Only trigger scramble when safeText changes or on mount (slide change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, safeText]);

  const displayClass =
    className.includes("block") || className.includes("inline") ? "" : "inline-block";

  const Component = (as || "span") as any;

  return (
    <Component
      onMouseEnter={interactive ? startScramble : undefined}
      onMouseLeave={interactive ? stopScramble : undefined}
      className={`transition-colors duration-200 select-none ${
        interactive ? "cursor-pointer" : ""
      } ${displayClass} ${className}`.trim()}
      style={{
        color: isHovered && interactive ? hoverColor : undefined,
      }}
    >
      {displayText}
    </Component>
  );
});

export default ScrambleText;
