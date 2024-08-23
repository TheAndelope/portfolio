"use client";


import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  format?: string;
}

export default function WordRotate({
  words,
  duration = 2250, // Shortened duration
  framerProps = {
    initial: { opacity: 0, y: -10 }, // Smaller y offset for smoother transition
    animate: { opacity: 1, y: 1 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.5, ease: "easeOut" }, // Duration for each transition
  },
  
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div>
      <div className="min-h-[0.3em] text-accent">
        {" "}
        {/* Maintain space for the rotating text */}
        <AnimatePresence mode="wait">
          <motion.h1 className="text-center font-sans font-bold text-6xl sm:text-6xl md:text-8xl lg:text-8xl"
            key={words[index]}
            {...framerProps}
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
}