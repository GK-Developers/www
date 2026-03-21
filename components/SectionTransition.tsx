"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
}

export default function SectionTransition({
  children,
  id,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 20%"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{
        clipPath,
        opacity,
        overflow: "hidden",
        willChange: "clip-path",
        position: "relative",
      }}
    >
      {children}
    </motion.div>
  );
}
