"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const solutions = [
  {
    title: "Component Library",
    description:
      "Built a comprehensive library of 100+ reusable components with consistent patterns and behaviors.",
  },
  {
    title: "Design Tokens",
    description:
      "Established a token system for colors, typography, spacing, and more, ensuring visual consistency.",
  },
  {
    title: "Documentation",
    description:
      "Created extensive documentation with usage guidelines, code examples, and best practices.",
  },
  {
    title: "Design Tools",
    description:
      "Developed Figma libraries and plugins to streamline the design workflow.",
  },
];

export default function Solution() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="solution"
      ref={ref}
      className="py-32 sm:py-40 lg:py-48 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-16">
            Solution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 border border-black/10 rounded-lg hover:border-black/20 transition-colors"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                  {solution.title}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


