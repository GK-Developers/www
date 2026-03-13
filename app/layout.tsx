import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "GK Healter — Linux System Health & Security Tool",
  description:
    "Professional maintenance, health monitoring, and security auditing for Pardus and Debian-based Linux distributions. Open source, GPL-3.0.",
  keywords: [
    "Linux",
    "system maintenance",
    "health monitoring",
    "security audit",
    "Pardus",
    "Debian",
    "open source",
  ],
  authors: [
    { name: "Egehan KAHRAMAN" },
    { name: "Mustafa GÖKPINAR" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="antialiased font-body">{children}</body>
    </html>
  );
}
