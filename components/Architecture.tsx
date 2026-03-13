"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";

function ModuleDiagram() {
  return (
    <svg
      viewBox="0 0 800 420"
      className="w-full h-auto"
      aria-label="Architecture diagram showing GK Healter module relationships"
    >
      {/* Connection lines — drawn first so boxes sit on top */}
      {/* ui.py → health_engine.py */}
      <line x1="200" y1="140" x2="200" y2="210" stroke="var(--color-forest-300)" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* ui.py → cleaner.py */}
      <line x1="350" y1="100" x2="430" y2="100" stroke="var(--color-forest-300)" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* ui.py → security_scanner.py */}
      <line x1="350" y1="100" x2="530" y2="210" stroke="var(--color-forest-300)" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* ui.py → ai_engine.py */}
      <line x1="270" y1="130" x2="400" y2="210" stroke="var(--color-forest-300)" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* cleaner.py → down */}
      <line x1="530" y1="130" x2="530" y2="210" stroke="var(--color-forest-300)" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Supporting layer connections */}
      <line x1="200" y1="280" x2="200" y2="330" stroke="var(--color-surface-300)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="400" y1="280" x2="400" y2="330" stroke="var(--color-surface-300)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="600" y1="280" x2="600" y2="330" stroke="var(--color-surface-300)" strokeWidth="1" strokeDasharray="3 3" />

      {/* === Core Modules === */}
      {/* ui.py */}
      <rect x="150" y="60" width="200" height="80" rx="12" fill="var(--color-forest-50)" stroke="var(--color-forest-300)" strokeWidth="1.5" />
      <text x="250" y="95" textAnchor="middle" fill="var(--color-forest-700)" fontSize="14" fontWeight="600" fontFamily="var(--font-display)">ui.py</text>
      <text x="250" y="118" textAnchor="middle" fill="var(--color-forest-500)" fontSize="11" fontFamily="var(--font-body)">User Interface</text>

      {/* health_engine.py */}
      <rect x="100" y="210" width="200" height="70" rx="10" fill="var(--color-forest-50)" stroke="var(--color-forest-300)" strokeWidth="1.5" />
      <text x="200" y="242" textAnchor="middle" fill="var(--color-forest-700)" fontSize="13" fontWeight="600" fontFamily="var(--font-display)">health_engine.py</text>
      <text x="200" y="262" textAnchor="middle" fill="var(--color-forest-500)" fontSize="10" fontFamily="var(--font-body)">Health Monitor</text>

      {/* cleaner.py */}
      <rect x="430" y="60" width="200" height="80" rx="10" fill="var(--color-forest-50)" stroke="var(--color-forest-300)" strokeWidth="1.5" />
      <text x="530" y="95" textAnchor="middle" fill="var(--color-forest-700)" fontSize="13" fontWeight="600" fontFamily="var(--font-display)">cleaner.py</text>
      <text x="530" y="118" textAnchor="middle" fill="var(--color-forest-500)" fontSize="10" fontFamily="var(--font-body)">System Cleaner</text>

      {/* security_scanner.py */}
      <rect x="430" y="210" width="200" height="70" rx="10" fill="var(--color-forest-50)" stroke="var(--color-forest-300)" strokeWidth="1.5" />
      <text x="530" y="242" textAnchor="middle" fill="var(--color-forest-700)" fontSize="13" fontWeight="600" fontFamily="var(--font-display)">security_scanner.py</text>
      <text x="530" y="262" textAnchor="middle" fill="var(--color-forest-500)" fontSize="10" fontFamily="var(--font-body)">Security Audit</text>

      {/* ai_engine.py */}
      <rect x="300" y="210" width="200" height="70" rx="10" fill="var(--color-forest-50)" stroke="var(--color-forest-300)" strokeWidth="1.5" />
      <text x="400" y="242" textAnchor="middle" fill="var(--color-forest-700)" fontSize="13" fontWeight="600" fontFamily="var(--font-display)">ai_engine.py</text>
      <text x="400" y="262" textAnchor="middle" fill="var(--color-forest-500)" fontSize="10" fontFamily="var(--font-body)">AI Engine</text>

      {/* === Supporting Modules (gray) === */}
      {/* pardus_analyzer.py */}
      <rect x="80" y="330" width="240" height="60" rx="8" fill="var(--color-surface-100)" stroke="var(--color-surface-300)" strokeWidth="1" />
      <text x="200" y="358" textAnchor="middle" fill="var(--color-ink-400)" fontSize="12" fontWeight="500" fontFamily="var(--font-display)">pardus_analyzer.py</text>
      <text x="200" y="376" textAnchor="middle" fill="var(--color-ink-300)" fontSize="10" fontFamily="var(--font-body)">Pardus Analysis</text>

      {/* report_exporter.py */}
      <rect x="340" y="330" width="200" height="60" rx="8" fill="var(--color-surface-100)" stroke="var(--color-surface-300)" strokeWidth="1" />
      <text x="440" y="358" textAnchor="middle" fill="var(--color-ink-400)" fontSize="12" fontWeight="500" fontFamily="var(--font-display)">report_exporter.py</text>
      <text x="440" y="376" textAnchor="middle" fill="var(--color-ink-300)" fontSize="10" fontFamily="var(--font-body)">Report Export</text>

      {/* auto_maintenance_manager.py */}
      <rect x="560" y="330" width="200" height="60" rx="8" fill="var(--color-surface-100)" stroke="var(--color-surface-300)" strokeWidth="1" />
      <text x="660" y="358" textAnchor="middle" fill="var(--color-ink-400)" fontSize="12" fontWeight="500" fontFamily="var(--font-display)">auto_maintenance.py</text>
      <text x="660" y="376" textAnchor="middle" fill="var(--color-ink-300)" fontSize="10" fontFamily="var(--font-body)">Scheduler</text>

      {/* Layer labels */}
      <text x="30" y="100" fill="var(--color-forest-600)" fontSize="10" fontWeight="600" fontFamily="var(--font-display)" textAnchor="start" transform="rotate(-90, 30, 100)">CORE</text>
      <text x="30" y="360" fill="var(--color-ink-300)" fontSize="10" fontWeight="600" fontFamily="var(--font-display)" textAnchor="start" transform="rotate(-90, 30, 360)">SUPPORT</text>
    </svg>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            Built for Reliability
          </h2>
          <p className="mt-4 text-lg text-ink-400 leading-relaxed">
            A modular architecture where each engine handles one responsibility.
            Clean boundaries, predictable behavior.
          </p>
        </motion.div>

        {/* Module Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 rounded-2xl border border-surface-200 bg-surface-50 p-6 sm:p-10 overflow-x-auto"
        >
          <ModuleDiagram />
        </motion.div>

        {/* Tech Stack Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="font-display text-xl font-semibold text-ink-900 mb-6">
            Tech Stack
          </h3>
          <div className="overflow-hidden rounded-xl border border-surface-200">
            <table className="w-full text-sm">
              <tbody>
                {TECH_STACK.map((item, i) => (
                  <tr
                    key={item.label}
                    className={
                      i % 2 === 0 ? "bg-surface-0" : "bg-surface-50"
                    }
                  >
                    <td className="px-6 py-4 font-medium text-ink-700 w-40 font-display">
                      {item.label}
                    </td>
                    <td className="px-6 py-4 text-ink-400">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
