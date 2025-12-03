"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const learnings = [
  {
    title: "Start with Research",
    description:
      "Understanding existing patterns and pain points across teams was crucial for building a system that truly served everyone's needs.",
  },
  {
    title: "Iterative Approach",
    description:
      "Launching with a core set of components and gradually expanding allowed teams to adopt the system without disruption.",
  },
  {
    title: "Documentation is Key",
    description:
      "Comprehensive documentation and examples significantly increased adoption rates and reduced support requests.",
  },
  {
    title: "Community Building",
    description:
      "Creating a space for designers and developers to contribute and share feedback fostered ownership and improved the system.",
  },
];

export default function Learnings() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="learnings"
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
            Learnings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {learnings.map((learning, index) => (
              <motion.div
                key={learning.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-black">
                  {learning.title}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed">
                  {learning.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

