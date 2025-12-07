'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LOGOS = [
  { src: '/brands/Morgan+Stanley.png', alt: 'Morgan Stanley' },
  { src: '/brands/JPM.png', alt: 'JP Morgan' },
  { src: "/brands/Mcdonald's.png", alt: 'McDonalds' },
  { src: '/brands/HSBC.png', alt: 'HSBC' },
  { src: '/brands/BlackRock.png', alt: 'BlackRock' },
  { src: '/brands/Tesco.png', alt: 'Tesco' },
  { src: '/brands/talabat.png', alt: 'Talabat' },
  { src: '/brands/Huge+inc.png', alt: 'Huge Inc' },
  { src: '/brands/emirates.png', alt: 'Emirates' },
  { src: '/brands/Ticketmaster.png', alt: 'Ticketmaster' },
  { src: '/brands/Digitas.png', alt: 'Digitas' },
  { src: '/brands/skynews-arabia.png', alt: 'Sky News Arabia' },
  { src: '/brands/UsTwo.png', alt: 'UsTwo' },
  { src: '/brands/the+economist.png', alt: 'The Economist' },
  { src: '/brands/Sainsburys-logo.png', alt: 'Sainsburys' },
];

export function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.3; // Slow panning speed (pixels per frame)
    let animationId: number | undefined;
    
    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Calculate width of one set of logos (15 logos)
      // Each logo is approximately 100px + 48px gap (on md screens) = ~148px per logo
      // On smaller screens: 100px + 32px gap = ~132px per logo
      const isMobile = window.innerWidth < 768;
      const logoWidth = isMobile ? 132 : 148;
      const singleSetWidth = LOGOS.length * logoWidth;
      
      // Reset position when scrolled past one set of logos for seamless loop
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = scrollPosition - singleSetWidth;
      }
      
      scroll.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation after 6 second delay from page load
    const timeoutId = setTimeout(() => {
      animate();
    }, 6000);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-12 overflow-hidden mt-6"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Scrolling logos container */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-[25.6px] md:gap-[38.4px] h-full"
        style={{ willChange: 'transform' }}
      >
        {/* Render logos 3 times for seamless infinite scroll */}
        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
          <motion.div
            key={`${logo.alt}-${index}`}
            className="flex-shrink-0 h-10 md:h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: (index % LOGOS.length) * 0.05 }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={40}
              className="object-contain h-full w-auto max-w-[100px] md:max-w-[120px] opacity-100"
              unoptimized
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

