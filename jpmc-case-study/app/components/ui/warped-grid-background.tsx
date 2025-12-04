'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, motion, useTransform } from 'framer-motion';

interface WarpedGridBackgroundProps {
  className?: string;
}

export function WarpedGridBackground({ className = '' }: WarpedGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth spring animations for mouse tracking
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform normalized values to warp offsets (subtle effect)
  const warpX = useTransform(smoothX, [0, 1], [-10, 10]);
  const warpY = useTransform(smoothY, [0, 1], [-10, 10]);
  
  // Subtle rotation for 3D warp effect (very subtle to not distract)
  const rotateX = useTransform(smoothY, [0, 1], [1, -1]);
  const rotateY = useTransform(smoothX, [0, 1], [-1, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize mouse position to 0-1 range
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const handleMouseLeave = () => {
      // Smoothly return to center when mouse leaves
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        style={{
          x: warpX,
          y: warpY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
}

