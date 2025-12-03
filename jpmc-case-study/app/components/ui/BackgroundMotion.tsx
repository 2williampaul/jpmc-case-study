"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function BackgroundMotion() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-orange-500/10 blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
              }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Subtle geometric shapes - hidden on mobile */}
      <motion.div
        className="hidden md:block absolute top-1/2 left-1/2 w-64 h-64 border border-black/5 rounded-lg"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, 90, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="hidden lg:block absolute top-3/4 left-1/3 w-32 h-32 border border-black/5 rounded-full"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, -180, 0],
                scale: [1, 0.9, 1],
              }
        }
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

