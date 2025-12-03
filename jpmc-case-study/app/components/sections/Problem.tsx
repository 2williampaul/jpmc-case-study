"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const challenges = [
  {
    title: "Inconsistent Patterns",
    description:
      "Each product team was building components from scratch, leading to inconsistent user experiences across the platform.",
  },
  {
    title: "Duplicated Effort",
    description:
      "Designers and developers were recreating similar components multiple times, wasting valuable time and resources.",
  },
  {
    title: "Maintenance Burden",
    description:
      "Without a centralized system, updates and improvements required changes across dozens of codebases.",
  },
  {
    title: "Onboarding Challenges",
    description:
      "New team members struggled to understand design patterns and had to learn multiple component libraries.",
  },
];

export default function Problem() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="problem"
      ref={ref}
      className="py-32 sm:py-40 lg:py-48 relative z-10 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16">
            Problem
          </h2>
          <div className="max-w-4xl space-y-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-l-4 border-white pl-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  {challenge.title}
                </h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  {challenge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

