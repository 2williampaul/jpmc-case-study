"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Overview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="overview"
      ref={ref}
      className="py-32 sm:py-40 lg:py-48 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-8">
            Overview
          </h2>
          <div className="max-w-4xl space-y-6 text-lg sm:text-xl text-black/70 leading-relaxed">
            <p>
              The JPMC Design System project was initiated to address the
              fragmentation of design patterns and components across multiple
              product teams. With over 50+ products and hundreds of designers
              and developers, there was a critical need for a unified design
              language.
            </p>
            <p>
              This case study documents the complete journey from research and
              discovery through design, development, and implementation of a
              comprehensive design system that serves as the foundation for all
              JPMorgan Chase digital products.
            </p>
            <p>
              The scope included creating a component library, design tokens,
              documentation, and establishing processes for maintenance and
              evolution of the system.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

