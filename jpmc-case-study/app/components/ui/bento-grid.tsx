"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BentoImage {
  id: number;
  src: string;
  alt: string;
  colSpan: string;
  rowSpan: string;
  colStart?: string;
}

interface BentoGridProps {
  images: BentoImage[];
}

export function BentoGrid({ images }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense [grid-auto-flow:dense]">
      {images.map((img, index) => (
        <BentoImageItem key={img.id} image={img} index={index} />
      ))}
    </div>
  );
}

function BentoImageItem({ image, index }: { image: BentoImage; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  });

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${image.colSpan} ${image.rowSpan} ${image.colStart || ''} cursor-pointer min-h-[200px]`}
      style={{ borderRadius: '2px' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => {
        // Optional: Add modal functionality here if needed
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={`object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        unoptimized
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </motion.div>
  );
}

