"use client";

import { motion } from "framer-motion";
import {
  Trash2,
  Activity,
  ShieldCheck,
  Brain,
  HardDrive,
  CalendarClock,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Trash2,
  Activity,
  ShieldCheck,
  Brain,
  HardDrive,
  CalendarClock,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28 lg:py-36"
      style={{ background: "transparent" }}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "#e8f5ee" }}
          >
            Everything your system needs
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#8ab89a" }}
          >
            Six integrated modules working together to keep your Linux system
            clean, fast, and secure.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className="group rounded-xl p-7 transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(13, 26, 20, 0.60)",
                  border: "1px solid rgba(26, 107, 74, 0.20)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(26, 107, 74, 0.50)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(26, 107, 74, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(26, 107, 74, 0.20)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5"
                  style={{ color: "#3dd68c" }}
                >
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.8} />}
                </div>
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ color: "#e8f5ee" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#8ab89a" }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
