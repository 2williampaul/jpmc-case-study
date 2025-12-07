'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LOGOS = [
  { src: '/brands/talabat.png', alt: 'Talabat' },
  { src: '/brands/JPM.png', alt: 'JP Morgan' },
  { src: "/brands/Mcdonald's.png", alt: 'McDonalds' },
  { src: '/brands/HSBC.png', alt: 'HSBC' },
  { src: '/brands/BlackRock.png', alt: 'BlackRock' },
  { src: '/brands/Tesco.png', alt: 'Tesco' },
  { src: '/brands/Sainsburys-logo.png', alt: 'Sainsburys' },
  { src: '/brands/Huge+inc.png', alt: 'Huge Inc' },
  { src: '/brands/Digitas.png', alt: 'Digitas' },
  { src: '/brands/UsTwo.png', alt: 'UsTwo' },
  { src: '/brands/emirates.png', alt: 'Emirates' },
  { src: '/brands/Morgan+Stanley.png', alt: 'Morgan Stanley' },
  { src: '/brands/Ticketmaster.png', alt: 'Ticketmaster' },
  { src: '/brands/the+economist.png', alt: 'The Economist' },
  { src: '/brands/skynews-arabia.png', alt: 'Sky News Arabia' },
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
    
    // Start animation after 2 second delay from page load
    const timeoutId = setTimeout(() => {
      animate();
    }, 2000);
    
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
    >
      {/* Left fade gradient - matches hero background */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#f0f0f0] via-[#f0f0f0]/80 to-transparent z-10 pointer-events-none" />
      
      {/* Right fade gradient - matches hero background */}
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#f0f0f0] via-[#f0f0f0]/80 to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling logos container */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-8 md:gap-12 h-full"
        style={{ willChange: 'transform' }}
      >
        {/* Render logos 3 times for seamless infinite scroll */}
        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
          <motion.div
            key={`${logo.alt}-${index}`}
            className="flex-shrink-0 h-10 md:h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.6, delay: (index % LOGOS.length) * 0.05 }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={40}
              className="object-contain h-full w-auto max-w-[100px] md:max-w-[120px] opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
              unoptimized
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

