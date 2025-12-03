"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "link" | "image">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect if device is mobile/touch device
    const checkMobile = () => {
      return window.matchMedia("(pointer: coarse)").matches || 
             window.matchMedia("(max-width: 768px)").matches;
    };
    
    setIsMobile(checkMobile());

    // Don't initialize custom cursor on mobile devices
    if (checkMobile()) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.closest("a")) {
        setCursorState("link");
      } else if (target.tagName === "IMG" || target.closest("img")) {
        setCursorState("image");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => {
      setCursorState("default");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Don't render custom cursor on mobile devices
  if (isMobile) {
    return null;
  }

  // Quarter-circle shape from logo (scaled down for cursor)
  const QuarterCircleShape = ({ className = "" }: { className?: string }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 0.5C13.1421 0.5 16.5 3.85786 16.5 8C16.5 12.1421 13.1421 15.5 9 15.5V8H1.5C1.5 3.85786 4.85786 0.5 9 0.5Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-50 ${
        cursorState === "image" ? "" : "mix-blend-difference"
      }`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      {cursorState === "default" && (
        <motion.div
          className="text-white"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <QuarterCircleShape />
        </motion.div>
      )}
      {cursorState === "link" && (
        <motion.div
          className="relative text-white"
          initial={{ scale: 1, rotate: 0 }}
          animate={{
            scale: [1, 1.2, 1.15, 1.2],
            rotate: 180,
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 15,
              bounce: 0.6,
            },
            rotate: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
        >
          <div className="relative">
            <QuarterCircleShape />
            {/* Shimmer effect overlay */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-sm"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(169, 169, 169, 0.6) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                mixBlendMode: "overlay",
              }}
              animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
      {cursorState === "image" && (
        <motion.div
          className="w-2 h-2 rounded-full bg-black"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.div>
  );
}

