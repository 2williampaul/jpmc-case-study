"use client";

import CustomCursor from "./components/ui/CustomCursor";
import BackgroundMotion from "./components/ui/BackgroundMotion";
import Navigation from "./components/ui/Navigation";
import Hero from "./components/sections/Hero";
import Overview from "./components/sections/Overview";
import Impact from "./components/sections/Impact";
import Solution from "./components/sections/Solution";
import Problem from "./components/sections/Problem";
import Learnings from "./components/sections/Learnings";

export default function Home() {
  return (
    <main className="relative bg-white text-black overflow-x-hidden">
      <CustomCursor />
      <BackgroundMotion />
      <Navigation />
      <Hero />
      <Overview />
      <Impact />
      <Solution />
      <Problem />
      <Learnings />
      </main>
  );
}
