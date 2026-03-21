"use client";

import { Github, Bug, Scale } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";

const footerLinks = [
  { label: "GitHub", href: GITHUB_URL, icon: Github },
  { label: "Issues", href: `${GITHUB_URL}/issues`, icon: Bug },
  { label: "License", href: `${GITHUB_URL}/blob/main/LICENSE`, icon: Scale },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(5, 12, 8, 0.95)",
        borderTop: "1px solid rgba(26, 107, 74, 0.15)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          <div>
            <span
              className="font-display text-lg font-semibold tracking-tight"
              style={{ color: "#e8f5ee" }}
            >
              GK Healter
            </span>
            <p
              className="mt-2 text-sm max-w-xs leading-relaxed"
              style={{ color: "#8ab89a" }}
            >
              Professional system maintenance and security auditing for Linux.
            </p>
          </div>
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: "#8ab89a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3dd68c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8ab89a")}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(26, 107, 74, 0.15)" }}>
          <p className="text-sm" style={{ color: "#8ab89a" }}>
            Built by{" "}
            <span className="font-medium" style={{ color: "#e8f5ee" }}>Egehan KAHRAMAN</span>{" "}
            &{" "}
            <span className="font-medium" style={{ color: "#e8f5ee" }}>Mustafa GÖKPINAR</span>{" "}
            — GK Developers
          </p>
          <p className="mt-2 text-xs" style={{ color: "#4a6b57" }}>
            © 2025 GK Developers. Licensed under GPL-3.0.
          </p>
        </div>
      </div>
    </footer>
  );
}
