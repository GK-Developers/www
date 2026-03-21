"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { INSTALL_TABS } from "@/lib/constants";

export default function Install() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = INSTALL_TABS[activeTab].commands.join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activeTab]);

  return (
    <section
      id="install"
      className="py-28 lg:py-36"
      style={{
        background: "#fafafa",
        borderLeft: "4px solid rgba(26,107,74,0.2)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            Get Started in Minutes
          </h2>
          <p className="mt-4 text-lg text-ink-400 leading-relaxed">
            Choose your distribution and follow the steps below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-2xl"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-1">
            {INSTALL_TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => {
                  setActiveTab(i);
                  setCopied(false);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 cursor-pointer ${
                  activeTab === i
                    ? "bg-[#1e293b] text-white"
                    : "bg-surface-100 text-ink-400 hover:text-ink-700 hover:bg-surface-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative rounded-b-xl rounded-tr-xl bg-[#1e293b] overflow-hidden">
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Copy install commands"
            >
              {copied ? (
                <Check className="h-4 w-4 text-forest-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>

            <pre className="p-6 pr-16 overflow-x-auto">
              <code className="text-sm font-mono leading-7">
                {INSTALL_TABS[activeTab].commands.map((cmd, i) => (
                  <span key={i} className="block">
                    <span className="text-forest-400 select-none">$ </span>
                    <span className="text-gray-200">{cmd}</span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
