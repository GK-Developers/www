"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";

function HealthVisualization() {
  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden="true">
        {/* Outer ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="var(--color-forest-100)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="var(--color-forest-400)"
          strokeWidth="2"
          strokeDasharray="8 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />

        {/* Middle ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="var(--color-forest-200)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="var(--color-forest-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="50 200"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.75 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
        />

        {/* Inner ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="80"
          fill="none"
          stroke="var(--color-forest-100)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
        />

        {/* Center pulse */}
        <motion.circle
          cx="200"
          cy="200"
          r="40"
          fill="var(--color-forest-50)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="24"
          fill="var(--color-forest-600)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="28"
          fill="none"
          stroke="var(--color-forest-400)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.8, 1.8], opacity: [0.6, 0, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
            delay: 2,
          }}
        />

        {/* Dot indicators on rings */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const r = 160;
          const x = 200 + r * Math.cos((angle * Math.PI) / 180);
          const y = 200 + r * Math.sin((angle * Math.PI) / 180);
          return (
            <motion.circle
              key={`outer-${i}`}
              cx={x}
              cy={y}
              r="3"
              fill="var(--color-forest-400)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
            />
          );
        })}

        {[30, 150, 270].map((angle, i) => {
          const r = 120;
          const x = 200 + r * Math.cos((angle * Math.PI) / 180);
          const y = 200 + r * Math.sin((angle * Math.PI) / 180);
          return (
            <motion.circle
              key={`inner-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="var(--color-forest-600)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 + i * 0.15 }}
            />
          );
        })}

        {/* Health score text */}
        <motion.text
          x="200"
          y="195"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="700"
          fontFamily="var(--font-display)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          98
        </motion.text>
        <motion.text
          x="200"
          y="212"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="500"
          opacity={0.8}
          fontFamily="var(--font-body)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          HEALTH
        </motion.text>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-forest-50 blur-3xl opacity-60" />
        <div className="absolute top-1/2 -left-60 w-[400px] h-[400px] rounded-full bg-forest-100 blur-3xl opacity-40" />
        <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-surface-100 blur-3xl opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50 px-4 py-1.5 text-xs font-medium text-forest-700 mb-8"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
              Open Source · GPL-3.0
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 leading-[1.08]">
              Your Linux System,{" "}
              <span className="text-forest-600">Always Healthy</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-ink-400 leading-relaxed max-w-lg"
            >
              Professional maintenance, health monitoring, and security auditing
              for Pardus and Debian-based Linux distributions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#install"
                className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-7 py-3 text-sm font-semibold text-white hover:bg-forest-700 transition-colors duration-200 shadow-lg shadow-forest-600/20"
              >
                <ArrowDown className="h-4 w-4" />
                Install Now
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-surface-300 bg-surface-0 px-7 py-3 text-sm font-semibold text-ink-700 hover:bg-surface-50 hover:border-surface-300 transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:block"
          >
            <HealthVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
