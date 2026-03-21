"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SECURITY_PRINCIPLES } from "@/lib/constants";
import AuroraBackground from "./AuroraBackground";

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
      style={{ background: "transparent", position: "relative", overflow: "hidden" }}
    >
      <AuroraBackground intensity={0.8} />
      {/* Large aurora blob — top-right atmosphere */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: 0,
          right: 0,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26, 107, 74, 0.10) 0%, transparent 70%)",
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
          <h2
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "#e8f5ee" }}
          >
            Security First, Always
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#8ab89a" }}
          >
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
              className="flex gap-4 rounded-xl p-6 transition-all duration-300"
              style={{
                background: "rgba(13, 26, 20, 0.60)",
                border: "1px solid rgba(26, 107, 74, 0.20)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
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
              <CheckCircle
                className="h-5 w-5 mt-0.5 shrink-0"
                strokeWidth={1.8}
                style={{ color: "#3dd68c" }}
              />
              <div>
                <h3
                  className="font-display text-base font-semibold"
                  style={{ color: "#e8f5ee" }}
                >
                  {principle.title}
                </h3>
                <p
                  className="mt-1.5 text-sm leading-relaxed"
                  style={{ color: "#8ab89a" }}
                >
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
