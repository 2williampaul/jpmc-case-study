"use client";

import CustomCursor from "./components/ui/CustomCursor";
import BackgroundMotion from "./components/ui/BackgroundMotion";
import Navigation from "./components/ui/Navigation";
import HeroScrollAnimation from "./components/ui/hero-scroll-animation";
import Overview from "./components/sections/Overview";
import Impact from "./components/sections/Impact";
import Solution from "./components/sections/Solution";

export default function Home() {
  return (
    <main className="relative bg-white text-black overflow-x-hidden">
      <CustomCursor />
      <BackgroundMotion />
      <Navigation />
      <HeroScrollAnimation />
      <Overview />
      <Impact />
      <Solution />
      </main>
  );
}
