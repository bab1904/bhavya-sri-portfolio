"use client";

import React from "react";

export default function SiliconBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark Silicon Base Gradient */}
      <div className="absolute inset-0 bg-[#090d16] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />

      {/* Circuit Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient Silicon Glow Orbs */}
      <div className="absolute top-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute top-[45%] right-[10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px]" />
      <div className="absolute bottom-[10%] left-[25%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[130px]" />

      {/* Subtle Circuit Wave SVG Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] stroke-cyan-400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 V 40 H 60 V 80 H 120 V 160"
              fill="none"
              strokeWidth="1.5"
            />
            <path
              d="M 140 0 V 30 H 100 V 70 H 40 V 160"
              fill="none"
              strokeWidth="1.5"
            />
            <circle cx="60" cy="40" r="3" fill="#06b6d4" />
            <circle cx="120" cy="80" r="3" fill="#06b6d4" />
            <circle cx="100" cy="30" r="3" fill="#f59e0b" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
  );
}
