'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover } from './animated-slideshow';
import { BlurredStagger } from './blurred-stagger-text';
import { WarpedGridBackground } from './warped-grid-background';
import { LogoCarousel } from './logo-carousel';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      style={{ scale, rotate, backgroundColor: '#ffffff' }}
      className='sticky font-semibold top-0 h-screen flex flex-col items-center justify-center text-black'
    >
      <WarpedGridBackground />

      <div className='flex flex-col items-center justify-center space-y-8 px-8 relative z-10'>
        {/* Circular photo */}
        <div className='relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[448px] lg:h-[448px] rounded-full overflow-hidden'>
          <Image
            src="/Billy-Paul-Designer.webp"
            alt="Billy Paul"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
        
        {/* Headline with blurred stagger effect */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BlurredStagger 
            text="Billy Paul is a Design System Designer|with a blend of strategy, craft and vibes" 
            emoji={
              <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/26a1/512.webp" type="image/webp" />
                <img 
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/26a1/512.gif" 
                  alt="⚡" 
                  width="32" 
                  height="32"
                  className="inline-block align-middle"
                />
              </picture>
            }
          />
        </div>
        
        {/* Logo carousel */}
        <div className="w-full max-w-6xl mx-auto px-8 mt-4" style={{ backgroundColor: '#ffffff' }}>
          <LogoCarousel />
        </div>
      </div>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  const SLIDES = [
    {
      id: "slide-1",
      title: "J.P. Morgan Chase",
      href: "/jpmc",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop",
    },
    {
      id: "slide-2",
      title: "McDonlads",
      href: "/mcdonalds",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&auto=format&fit=crop",
    },
    {
      id: "slide-3",
      title: "HSBC",
      href: "/hsbc",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop",
    },
    {
      id: "slide-4",
      title: "BlackRock",
      href: "/blackrock",
      imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop",
    },
    {
      id: "slide-5",
      title: "Ticketmaster",
      href: "/ticketmaster",
      imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop",
    },
    {
      id: "slide-6",
      title: "Tesco",
      href: "/tesco",
      imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop",
    },
    {
      id: "slide-7",
      title: "More",
      href: "/more",
      imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t to-[#1a1919] from-[#06060e] text-white '
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <article className='container mx-auto relative z-10 px-6 h-full flex flex-col justify-center'>
        <div className='flex items-center justify-evenly gap-6 md:gap-12 scale-100 xl:scale-[0.85] 2xl:scale-100 origin-center transition-transform duration-300'>
          <div className='flex flex-col space-y-2 md:space-y-4 flex-shrink-0'>
            {SLIDES.map((slide, index) => (
              <Link key={slide.id} href={slide.href}>
                <TextStaggerHover
                  index={index}
                  className="cursor-pointer text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter whitespace-nowrap"
                  text={slide.title}
                />
              </Link>
            ))}
          </div>
          <HoverSliderImageWrap className="w-full max-w-2xl h-[400px] sm:h-[500px] md:h-[600px] flex-shrink-0">
            {SLIDES.map((slide, index) => (
              <HoverSliderImage
                key={slide.id}
                index={index}
                imageUrl={slide.imageUrl}
                logoText={slide.title}
                className="size-full"
              />
            ))}
          </HoverSliderImageWrap>
        </div>
      </article>
    </motion.section>
  );
};

const HeroScrollAnimation = forwardRef<HTMLElement, {}>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Forward ref to the main element
  useImperativeHandle(ref, () => container.current as HTMLElement);

  return (
    <>
      <main ref={container} className='relative h-[200vh] bg-black' id="work">
        <Section1 scrollYProgress={scrollYProgress} />
        <HoverSlider>
          <Section2 scrollYProgress={scrollYProgress} />
        </HoverSlider>
        <footer className='group bg-[#06060e] '>
          <div className='bg-black text-white h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
        </footer>
      </main>
    </>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;

