import { Github, Bug, Scale } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";

const footerLinks = [
  { label: "GitHub", href: GITHUB_URL, icon: Github },
  { label: "Issues", href: `${GITHUB_URL}/issues`, icon: Bug },
  { label: "License", href: `${GITHUB_URL}/blob/main/LICENSE`, icon: Scale },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          {/* Left — Branding */}
          <div>
            <span className="font-display text-lg font-semibold text-ink-900 tracking-tight">
              GK Healter
            </span>
            <p className="mt-2 text-sm text-ink-400 max-w-xs leading-relaxed">
              Professional system maintenance and security auditing for Linux.
            </p>
          </div>

          {/* Right — Links */}
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-ink-900 transition-colors duration-200"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-200">
          <p className="text-sm text-ink-300">
            Built by{" "}
            <span className="text-ink-500 font-medium">
              Egehan KAHRAMAN
            </span>{" "}
            &{" "}
            <span className="text-ink-500 font-medium">
              Mustafa GÖKPINAR
            </span>{" "}
            — GK Developers
          </p>
          <p className="mt-2 text-xs text-ink-300">
            © 2025 GK Developers. Licensed under GPL-3.0.
          </p>
        </div>
      </div>
    </footer>
  );
}
