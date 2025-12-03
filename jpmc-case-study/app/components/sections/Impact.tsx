"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const metrics = [
  { value: "65%", label: "Reduction in design time", description: "Faster component implementation" },
  { value: "40%", label: "Increase in consistency", description: "Across all product teams" },
  { value: "3x", label: "Faster development", description: "With reusable components" },
  { value: "85%", label: "Team adoption rate", description: "Within first 6 months" },
];

export default function Impact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="impact"
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
            Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-2"
              >
                <motion.div
                  className="text-5xl sm:text-6xl md:text-7xl font-bold"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {metric.value}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {metric.label}
                </h3>
                <p className="text-white/70 text-sm sm:text-base">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


