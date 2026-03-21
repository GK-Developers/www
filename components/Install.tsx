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
      style={{ background: "transparent" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            Get Started in Minutes
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#8ab89a" }}
          >
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
                className="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 cursor-pointer"
                style={{
                  background:
                    activeTab === i
                      ? "rgba(26, 107, 74, 0.25)"
                      : "rgba(13, 26, 20, 0.60)",
                  border:
                    activeTab === i
                      ? "1px solid #3dd68c"
                      : "1px solid rgba(26, 107, 74, 0.20)",
                  borderBottom: "none",
                  color: activeTab === i ? "#3dd68c" : "#8ab89a",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div
            className="relative overflow-hidden"
            style={{
              background: "rgba(5, 12, 8, 0.90)",
              borderRadius: "0 12px 12px 12px",
              border: "1px solid rgba(26, 107, 74, 0.20)",
            }}
          >
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
              style={{
                background: "rgba(26, 107, 74, 0.15)",
                color: copied ? "#3dd68c" : "#8ab89a",
              }}
              aria-label="Copy install commands"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>

            <pre className="p-6 pr-16 overflow-x-auto">
              <code className="text-sm font-mono leading-7">
                {INSTALL_TABS[activeTab].commands.map((cmd, i) => (
                  <span key={i} className="block">
                    <span
                      className="select-none"
                      style={{ color: "#3dd68c" }}
                    >
                      ${" "}
                    </span>
                    <span style={{ color: "#3dd68c" }}>{cmd}</span>
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
