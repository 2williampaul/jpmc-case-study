"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          JPMC Design System
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-black/70 mb-4 font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Product Designer & Design Systems Lead
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-black/60 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A comprehensive design system that unified product experiences across
          JPMorgan Chase, improving consistency, efficiency, and user satisfaction.
        </motion.p>
      </motion.div>

      {/* Parallax background element */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ y: 0 }}
        animate={{
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/5 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
}

