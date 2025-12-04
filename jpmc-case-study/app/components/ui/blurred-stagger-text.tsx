"use client" 

import * as React from "react"
import { motion } from "framer-motion";

interface BlurredStaggerProps {
  text: string;
  emoji?: React.ReactNode;
}

export const BlurredStagger = ({
  text = "we love hextaui.com ❤️",
  emoji,
}: BlurredStaggerProps) => {
  const headingText = text;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  const emojiAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <>
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[120%] text-center break-words inline"
      >
        {headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        {emoji && (
          <motion.span
            variants={emojiAnimation}
            transition={{ duration: 0.3, delay: headingText.length * 0.015 }}
            className="inline-block ml-1 align-middle"
          >
            {emoji}
          </motion.span>
        )}
      </motion.h1>
    </>
  );
};

