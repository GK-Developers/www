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
    offset: ["start 100%", "start 5%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.3], [24, 0]);
  const brightness = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blurFilter = useTransform(
    [blur, brightness] as any,
    ([b, br]: number[]) => `blur(${b}px) brightness(${br})`
  );

  return (
    <div ref={containerRef} id={id} style={{ position: "relative", zIndex: 1 }}>
      <motion.div
        style={{
          y,
          opacity,
          scale,
          filter: blurFilter,
          willChange: "transform, opacity, filter",
          transformOrigin: "center 80%",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
