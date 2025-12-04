"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Main content */}
      <motion.div
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center z-10 relative"
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
          className="text-xl sm:text-2xl md:text-3xl text-black/70 mb-4 font-semibold"
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

      {/* Colorpalette asset - slides in from right */}
      {/* Figma: x=1827.99, y=218.32, w=833.52, h=824.16 (in 1920x1200 canvas) */}
      {mounted && (
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{
            right: '0%',
            top: '18.2%',
            width: 'min(43.4vw, 833.52px)',
            height: 'min(68.7vh, 824.16px)',
            maxWidth: '833.52px',
            maxHeight: '824.16px',
          }}
          initial={{ x: "100%", opacity: 0, scale: 0.8 }}
          animate={inView ? { x: 0, opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 1.2, 
            delay: 0.8,
            ease: [0.25, 0.1, 0.25, 1] // ease-in
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/colorpalette.png"
              alt="Color Palette"
              fill
              className="object-contain"
              priority
              unoptimized
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Spacing asset - slides in from left */}
      {/* Figma: x=0, y=65.24, w=775.33, h=974.69 (in 1920x1200 canvas) */}
      {mounted && (
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{
            left: '0',
            top: '5.4%',
            width: 'min(40.4vw, 775.33px)',
            height: 'min(81.2vh, 974.69px)',
            maxWidth: '775.33px',
            maxHeight: '974.69px',
          }}
          initial={{ x: "-100%", opacity: 0, scale: 0.8 }}
          animate={inView ? { x: 0, opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 1.2, 
            delay: 1.0,
            ease: [0.25, 0.1, 0.25, 1] // ease-in
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/spacing.png"
              alt="Spacing"
              fill
              className="object-contain"
              priority
              unoptimized
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Buttons asset - slides up from bottom */}
      {/* Figma: x=720, y=1014.79, w=1411.49, h=821.09 (in 1920x1200 canvas) */}
      {mounted && (
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{
            left: '37.5%',
            bottom: '0%',
            width: 'min(73.5vw, 1411.49px)',
            height: 'min(68.4vh, 821.09px)',
            maxWidth: '1411.49px',
            maxHeight: '821.09px',
          }}
          initial={{ y: "100%", opacity: 0, scale: 0.8 }}
          animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 1.2, 
            delay: 1.2,
            ease: [0.25, 0.1, 0.25, 1] // ease-in
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/buttons.png"
              alt="Buttons"
              fill
              className="object-contain"
              priority
              unoptimized
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </motion.div>
      )}

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

