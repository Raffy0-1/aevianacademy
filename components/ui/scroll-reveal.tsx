"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: ScrollRevealProps) {
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: 24 };
      case "down":
        return { y: -24 };
      case "left":
        return { x: 24 };
      case "right":
        return { x: -24 };
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getOffset() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier matching the premium design spec
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealStagger({
  children,
  staggerDelay = 0.08,
  className = "h-full flex flex-col",
}: {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <>
      {React.Children.map(children, (child, idx) => (
        <ScrollReveal key={idx} delay={idx * staggerDelay} className={className}>
          {child}
        </ScrollReveal>
      ))}
    </>
  );
}
