"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SECURITY_PRINCIPLES } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Security() {
  return (
    <section
      id="security"
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: "#f0faf5" }}
    >
      {/* Static blurred circle — top-right atmosphere */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(26,107,74,0.06)",
          filter: "blur(80px)",
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
            Security First, Always
          </h2>
          <p className="mt-4 text-lg text-ink-400 leading-relaxed">
            Seven layers of protection ensure GK Healter never puts your system
            at risk.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          {SECURITY_PRINCIPLES.map((principle) => (
            <motion.div
              key={principle.title}
              variants={itemVariants}
              className="flex gap-4 rounded-xl border border-surface-200 bg-surface-0 p-6 hover:border-forest-200 transition-colors duration-300"
            >
              <CheckCircle
                className="h-5 w-5 text-forest-600 mt-0.5 shrink-0"
                strokeWidth={1.8}
              />
              <div>
                <h3 className="font-display text-base font-semibold text-ink-900">
                  {principle.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
