"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "link" | "image">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentStateRef = useRef<"default" | "link" | "image">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

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

    const handleMouseMove = (e: MouseEvent) => {
      // Clear any pending exit timeout when mouse moves
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
      
      const target = e.target as HTMLElement;
      const isOverLink = target.tagName === "A" || target.closest("a");
      const isOverImage = target.tagName === "IMG" || target.closest("img");
      
      if (isOverLink) {
        setCursorState("link");
        currentStateRef.current = "link";
      } else if (isOverImage) {
        setCursorState("image");
        currentStateRef.current = "image";
      } else {
        // Only delay if we're transitioning from link/image to default
        if (currentStateRef.current === "link" || currentStateRef.current === "image") {
          // Start the delay timer
          exitTimeoutRef.current = setTimeout(() => {
            setCursorState("default");
            currentStateRef.current = "default";
            exitTimeoutRef.current = null;
          }, 2000);
        } else {
          // If already default, set immediately
          setCursorState("default");
          currentStateRef.current = "default";
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleMouseMove);
      // Clear timeout on cleanup
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, [cursorX, cursorY]);

  // Don't render custom cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      {cursorState === "default" && (
        <motion.div
          className="w-3 h-3 rounded-full bg-white"
          style={{ width: "12px", height: "12px" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      {cursorState === "link" && (
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      )}
      {cursorState === "image" && (
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.div>
  );
}

