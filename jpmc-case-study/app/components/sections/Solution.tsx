"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { BentoGrid } from "../ui/bento-grid";
import { generateAsymmetricLayout, ImageLayout } from "@/lib/generateAsymmetricLayout";

export default function Solution() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [images, setImages] = useState<ImageLayout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/snaps");
        const data = await response.json();
        
        if (data.images && Array.isArray(data.images)) {
          // Generate asymmetric layout from the fetched images
          const layouts = generateAsymmetricLayout(data.images);
          setImages(layouts);
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  return (
    <section
      id="snaps"
      ref={ref}
      className="py-16 sm:py-24 md:py-32 lg:py-48 relative z-10 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-16">
            Snaps
          </h2>
          <p className="text-lg sm:text-xl text-black/70 mb-12 max-w-3xl">
            Below are photos from my travels around Europe, Asia and the USA, which give an insight into some of the things I've seen, tasted and enjoyed.
          </p>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded min-h-[200px]" />
              ))}
            </div>
          ) : (
            <BentoGrid images={images} />
          )}
        </motion.div>
      </div>
    </section>
  );
}


