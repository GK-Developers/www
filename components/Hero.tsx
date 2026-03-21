"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";
import HeroScene from "./HeroScene";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Three.js Background */}
      <HeroScene />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 w-full">
        {/* Left-aligned content, full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-8"
            style={{
              background: "rgba(26, 107, 74, 0.15)",
              border: "1px solid rgba(26, 107, 74, 0.3)",
              color: "#3dd68c",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#3dd68c" }}
            />
            Open Source · GPL-3.0
          </motion.div>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
            style={{ color: "#e8f5ee" }}
          >
            Your Linux System,{" "}
            <span style={{ color: "#3dd68c" }}>Always Healthy</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg sm:text-xl leading-relaxed max-w-lg"
            style={{ color: "#8ab89a" }}
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
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-colors duration-200"
              style={{
                background: "#1a6b4a",
                color: "#e8f5ee",
                boxShadow: "0 4px 20px rgba(26, 107, 74, 0.3)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#2a9e6e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#1a6b4a")
              }
            >
              <ArrowDown className="h-4 w-4" />
              Install Now
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-colors duration-200"
              style={{
                background: "transparent",
                border: "1px solid rgba(26, 107, 74, 0.3)",
                color: "#8ab89a",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(26, 107, 74, 0.5)";
                e.currentTarget.style.color = "#3dd68c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(26, 107, 74, 0.3)";
                e.currentTarget.style.color = "#8ab89a";
              }}
            >
              <Github className="h-4 w-4" />
              View Source
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
