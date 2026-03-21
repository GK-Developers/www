"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { TECH_STACK } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface GraphNode {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  layer: 1 | 2 | 3 | 4;
  accent?: boolean; // filled accent style
  engine?: boolean; // core engine accent border
}

interface Edge {
  from: string;
  to: string;
  dashed?: boolean;
  label?: string;
}

const NODES: GraphNode[] = [
  // Layer 1 — User Action
  { id: "user", label: "User Action", sub: "Clean / Scan / Health Check / AI Analysis", x: 400, y: 50, w: 200, h: 56, layer: 1, accent: true },
  // Layer 2 — UI & Auth
  { id: "ui", label: "ui.py", sub: "Interface Controller", x: 280, y: 170, w: 180, h: 52, layer: 2 },
  { id: "polkit", label: "Polkit Auth", sub: "pkexec", x: 520, y: 170, w: 160, h: 52, layer: 2 },
  // Layer 3 — Engines
  { id: "cleaner", label: "cleaner.py", sub: "Whitelist scan → safe delete", x: 120, y: 310, w: 175, h: 56, layer: 3, engine: true },
  { id: "health", label: "health_engine.py", sub: "CPU / RAM / Disk → Score 0–100", x: 310, y: 310, w: 175, h: 56, layer: 3, engine: true },
  { id: "security", label: "security_scanner.py", sub: "SUID · permissions · SSH", x: 500, y: 310, w: 175, h: 56, layer: 3, engine: true },
  { id: "ai", label: "ai_engine.py", sub: "Local analysis → optional cloud", x: 690, y: 310, w: 175, h: 56, layer: 3, engine: true },
  // Layer 4 — Supporting
  { id: "pardus", label: "pardus_analyzer.py", sub: "Repo & service health", x: 160, y: 450, w: 180, h: 48, layer: 4 },
  { id: "log", label: "log_analyzer.py", sub: "Journal error classification", x: 400, y: 450, w: 180, h: 48, layer: 4 },
  { id: "report", label: "report_exporter.py", sub: "TXT / HTML / JSON output", x: 640, y: 450, w: 180, h: 48, layer: 4 },
];

const EDGES: Edge[] = [
  // Layer 1 → 2
  { from: "user", to: "ui" },
  { from: "ui", to: "polkit", dashed: true, label: "if root needed" },
  // Layer 2 → 3 (ui branches to all engines)
  { from: "ui", to: "cleaner" },
  { from: "ui", to: "health" },
  { from: "ui", to: "security" },
  { from: "ui", to: "ai" },
  // Layer 3 → 4
  { from: "cleaner", to: "pardus" },
  { from: "health", to: "pardus" },
  { from: "security", to: "log" },
  { from: "health", to: "log" },
  { from: "cleaner", to: "report" },
  { from: "health", to: "report" },
  { from: "security", to: "report" },
  { from: "ai", to: "report" },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function getEdgePath(e: Edge): { x1: number; y1: number; x2: number; y2: number } {
  const f = getNode(e.from);
  const t = getNode(e.to);
  return {
    x1: f.x,
    y1: f.y + f.h / 2,
    x2: t.x,
    y2: t.y - t.h / 2,
  };
}

function connectedEdges(nodeId: string) {
  return EDGES.filter((e) => e.from === nodeId || e.to === nodeId);
}

function edgeKey(e: Edge) {
  return `${e.from}-${e.to}`;
}

/* ------------------------------------------------------------------ */
/*  ANIMATED EDGE                                                      */
/* ------------------------------------------------------------------ */

function AnimatedEdge({
  edge,
  highlighted,
  baseDelay,
}: {
  edge: Edge;
  highlighted: boolean;
  baseDelay: number;
}) {
  const { x1, y1, x2, y2 } = getEdgePath(edge);

  // Curved path
  const midY = (y1 + y2) / 2;
  const d = `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={highlighted ? "var(--color-forest-500)" : "var(--color-surface-300)"}
        strokeWidth={highlighted ? 2 : 1.5}
        strokeDasharray={edge.dashed ? "6 4" : "none"}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: baseDelay, ease: "easeOut" }}
        style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
      />

      {/* Edge label */}
      {edge.label && (
        <motion.text
          x={(x1 + x2) / 2 + 8}
          y={midY - 4}
          textAnchor="middle"
          fill="var(--color-ink-300)"
          fontSize="9"
          fontFamily="var(--font-body)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: baseDelay + 0.4, duration: 0.5 }}
        >
          {edge.label}
        </motion.text>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  PULSE DOT                                                          */
/* ------------------------------------------------------------------ */

function PulseDot({ edge, delay }: { edge: Edge; delay: number }) {
  const { x1, y1, x2, y2 } = getEdgePath(edge);
  const midY = (y1 + y2) / 2;
  const d = `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;

  return (
    <motion.circle
      r="3"
      fill="var(--color-forest-500)"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
    >
      <animateMotion
        dur="2s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={d}
      />
    </motion.circle>
  );
}

/* ------------------------------------------------------------------ */
/*  GRAPH NODE                                                         */
/* ------------------------------------------------------------------ */

function GraphNodeBox({
  node,
  isHovered,
  onHover,
  onLeave,
  baseDelay,
}: {
  node: GraphNode;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  baseDelay: number;
}) {
  const halfW = node.w / 2;
  const halfH = node.h / 2;

  return (
    <motion.g
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: baseDelay, ease: "easeOut" }}
    >
      {/* Shadow */}
      <rect
        x={node.x - halfW + 2}
        y={node.y - halfH + 2}
        width={node.w}
        height={node.h}
        rx={12}
        fill="rgba(0,0,0,0.04)"
      />

      {/* Background */}
      <motion.rect
        x={node.x - halfW}
        y={node.y - halfH}
        width={node.w}
        height={node.h}
        rx={12}
        fill={node.accent ? "var(--color-forest-600)" : "var(--color-surface-0)"}
        stroke={
          node.accent
            ? "var(--color-forest-700)"
            : node.engine
            ? "var(--color-forest-300)"
            : "var(--color-surface-300)"
        }
        strokeWidth={node.accent ? 0 : 1.5}
        animate={{
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      />

      {/* Engine left-accent bar */}
      {node.engine && (
        <rect
          x={node.x - halfW}
          y={node.y - halfH + 6}
          width={3.5}
          height={node.h - 12}
          rx={2}
          fill="var(--color-forest-500)"
        />
      )}

      {/* Title */}
      <text
        x={node.x}
        y={node.sub ? node.y - 4 : node.y + 4}
        textAnchor="middle"
        fill={node.accent ? "white" : "var(--color-ink-900)"}
        fontSize={node.accent ? 13 : 12}
        fontWeight="600"
        fontFamily="var(--font-display)"
      >
        {node.label}
      </text>

      {/* Subtitle */}
      {node.sub && (
        <text
          x={node.x}
          y={node.y + 12}
          textAnchor="middle"
          fill={node.accent ? "rgba(255,255,255,0.8)" : "var(--color-ink-400)"}
          fontSize="9.5"
          fontFamily="var(--font-body)"
        >
          {node.sub}
        </text>
      )}

      {/* Hover tooltip (shows on hover, larger description) */}
      {isHovered && !node.accent && (
        <motion.g
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <rect
            x={node.x - 80}
            y={node.y + halfH + 6}
            width={160}
            height={24}
            rx={6}
            fill="var(--color-ink-900)"
          />
          <text
            x={node.x}
            y={node.y + halfH + 22}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontFamily="var(--font-body)"
          >
            {node.sub}
          </text>
        </motion.g>
      )}
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const highlightedEdges = hoveredNode
    ? new Set(connectedEdges(hoveredNode).map(edgeKey))
    : new Set<string>();

  // Stagger delays by layer
  const layerDelay = useCallback((layer: number) => {
    return 0.15 + (layer - 1) * 0.35;
  }, []);

  // Edge delay starts after layer 2 nodes are in
  const edgeBaseDelay = 0.6;

  // Pulse edges (subset for visual clarity)
  const pulseEdges = [EDGES[0], EDGES[2], EDGES[4], EDGES[10]];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="py-28 lg:py-36"
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(26,107,74,0.08)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            How It Works at Runtime
          </h2>
          <p className="mt-4 text-lg text-ink-400 leading-relaxed">
            A top-to-bottom flow from user action through authentication, core
            engines, and supporting services. Every module has one job.
          </p>
        </motion.div>

        {/* Interactive Node Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 rounded-2xl border border-surface-200 bg-surface-50 p-4 sm:p-8 overflow-x-auto"
        >
          <svg
            viewBox="0 0 860 520"
            className="w-full h-auto"
            style={{ minWidth: 640 }}
            aria-label="Interactive architecture node graph"
          >
            {/* Layer labels */}
            <text x="24" y="54" fill="var(--color-forest-600)" fontSize="9" fontWeight="700" fontFamily="var(--font-display)" letterSpacing="0.08em">USER</text>
            <text x="24" y="174" fill="var(--color-ink-300)" fontSize="9" fontWeight="700" fontFamily="var(--font-display)" letterSpacing="0.08em">UI</text>
            <text x="24" y="314" fill="var(--color-forest-600)" fontSize="9" fontWeight="700" fontFamily="var(--font-display)" letterSpacing="0.08em">CORE</text>
            <text x="24" y="454" fill="var(--color-ink-300)" fontSize="9" fontWeight="700" fontFamily="var(--font-display)" letterSpacing="0.08em">SUPPORT</text>

            {/* Edges (render behind nodes) */}
            {EDGES.map((edge, i) => (
              <AnimatedEdge
                key={edgeKey(edge)}
                edge={edge}
                highlighted={highlightedEdges.has(edgeKey(edge))}
                baseDelay={edgeBaseDelay + i * 0.06}
              />
            ))}

            {/* Pulse dots */}
            {isInView &&
              pulseEdges.map((edge, i) => (
                <PulseDot key={`pulse-${i}`} edge={edge} delay={3 + i * 1} />
              ))}

            {/* Nodes */}
            {NODES.map((node) => (
              <GraphNodeBox
                key={node.id}
                node={node}
                isHovered={hoveredNode === node.id}
                onHover={() => setHoveredNode(node.id)}
                onLeave={() => setHoveredNode(null)}
                baseDelay={layerDelay(node.layer)}
              />
            ))}
          </svg>
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
