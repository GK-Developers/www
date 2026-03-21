"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
}

export default function SectionTransition({ children, id }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 100%", "start 10%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.35], [16, 0]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <div ref={containerRef} id={id}>
      <motion.div
        style={{
          y,
          opacity,
          scale,
          filter: blurFilter,
          willChange: "transform, opacity, filter",
          transformOrigin: "center bottom",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
