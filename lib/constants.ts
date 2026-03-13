export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface SecurityPrinciple {
  title: string;
  description: string;
}

export interface InstallTab {
  label: string;
  commands: string[];
}

export interface TechStackItem {
  label: string;
  value: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Security", href: "#security" },
  { label: "Install", href: "#install" },
];

export const GITHUB_URL = "https://github.com/GK-Developers/GK-Healter";

export const FEATURES: Feature[] = [
  {
    icon: "Trash2",
    title: "System Cleaner",
    description:
      "Deep-clean APT cache, old logs, browser caches, and coredumps. Reclaim disk space safely with whitelist-based deletion.",
  },
  {
    icon: "Activity",
    title: "Real-Time Health Score",
    description:
      "Monitor CPU, RAM, and disk usage with a composite 0\u2013100 health score. Know your system\u2019s condition at a glance.",
  },
  {
    icon: "ShieldCheck",
    title: "Security Auditor",
    description:
      "Detect SUID binaries, world-writable files, and SSH misconfigurations. Harden your system with actionable insights.",
  },
  {
    icon: "Brain",
    title: "AI Engine",
    description:
      "Hybrid intelligence: always-offline local analysis with optional cloud AI integration via Gemini, OpenAI, or Claude.",
  },
  {
    icon: "HardDrive",
    title: "Disk Analyzer",
    description:
      "Discover large files and visualize space breakdown. Understand exactly where your storage is going.",
  },
  {
    icon: "CalendarClock",
    title: "Auto Maintenance",
    description:
      "Scheduled cleanup based on idle time, disk thresholds, and power state. Set it and forget it.",
  },
];

export const SECURITY_PRINCIPLES: SecurityPrinciple[] = [
  {
    title: "Whitelist-Based Deletion",
    description:
      "Only pre-defined safe directories can be cleaned. Nothing outside the whitelist is ever touched.",
  },
  {
    title: "Polkit Integration",
    description:
      "System-level operations require explicit user authentication via pkexec before execution.",
  },
  {
    title: "No rm -rf, Ever",
    description:
      "Recursive force deletion is never used under any condition. Every file removal is deliberate.",
  },
  {
    title: "Root Path Protection",
    description:
      "Critical directories like /, /home, and /etc are hardcoded as untouchable. No exceptions.",
  },
  {
    title: "Full Audit Trail",
    description:
      "Every deletion is logged with timestamp and result. Complete transparency on all operations.",
  },
  {
    title: "SUID Whitelist",
    description:
      "Known safe SUID files are filtered via KNOWN_SUID_PATHS. Only unexpected ones are flagged.",
  },
  {
    title: "SSH Hardening",
    description:
      "PermitRootLogin, PasswordAuthentication, and more are verified against security best practices.",
  },
];

export const INSTALL_TABS: InstallTab[] = [
  {
    label: "Pardus / Debian",
    commands: [
      "cd gk-healter",
      "make deb",
      "sudo dpkg -i gk-healter_0.1.6_all.deb",
      "sudo apt-get install -f",
    ],
  },
  {
    label: "Flatpak",
    commands: [
      "flatpak install flathub io.github.gkdevelopers.GKHealter",
      "flatpak run io.github.gkdevelopers.GKHealter",
    ],
  },
  {
    label: "Arch Linux",
    commands: ["cd packaging/arch", "makepkg -si"],
  },
  {
    label: "Source Build",
    commands: [
      "git clone https://github.com/GK-Developers/GK-Healter.git",
      "cd GK-Healter/gk-healter",
      "meson setup _build && meson compile -C _build",
      "sudo meson install -C _build",
    ],
  },
];

export const TECH_STACK: TechStackItem[] = [
  { label: "Language", value: "Python 3.9+" },
  { label: "GUI", value: "GTK 3 (PyGObject)" },
  { label: "Build", value: "Meson / GNU Make" },
  { label: "Testing", value: "pytest \u2014 246+ tests, 75%+ coverage" },
  { label: "Packaging", value: "Flatpak, Debian (.deb), Arch, RPM" },
  { label: "Auth", value: "Polkit (pkexec)" },
];
