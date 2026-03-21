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
      style={{ background: "#f8fdfb" }}
    >
      {/* Subtle radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(26,107,74,0.04), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            Everything your system needs
          </h2>
          <p className="mt-4 text-lg text-ink-400 leading-relaxed">
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
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-surface-200 bg-surface-0 p-7 hover:border-forest-200 hover:shadow-lg hover:shadow-forest-600/5 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-forest-50 text-forest-600 mb-5 group-hover:bg-forest-100 transition-colors duration-300">
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.8} />}
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-ink-400 leading-relaxed">
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
