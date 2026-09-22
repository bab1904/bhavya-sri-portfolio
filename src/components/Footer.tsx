"use client";

import React from "react";
import { ArrowUp, Cpu, Mail, Phone } from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#060a12] text-slate-400 text-xs font-mono pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
                <span className="font-mono font-bold text-cyan-400 text-xs">&lt;BS/&gt;</span>
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                {portfolioData.personal.name}
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              VLSI Physical Design Engineer specializing in ASIC backend implementation, floorplanning, CTS, routing, and signoff verification.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
                title="Phone"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-slate-200 font-bold tracking-wider uppercase text-[11px] block">
              Navigation Architecture
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#about" className="hover:text-cyan-400 transition-colors">
                {"// 01. About Profile"}
              </a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">
                {"// 02. Skills Matrix"}
              </a>
              <a href="#experience" className="hover:text-cyan-400 transition-colors">
                {"// 03. Experience"}
              </a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">
                {"// 04. Projects"}
              </a>
              <a href="#certifications" className="hover:text-cyan-400 transition-colors">
                {"// 05. Certifications"}
              </a>
              <a href="#education" className="hover:text-cyan-400 transition-colors">
                {"// 06. Education"}
              </a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">
                {"// 07. Contact"}
              </a>
            </div>
          </div>

          {/* Status & Silicon Precision */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-slate-200 font-bold tracking-wider uppercase text-[11px] block mb-2">
                Silicon Status
              </span>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Hire</span>
                </div>
                <p className="text-slate-400 text-[10px]">
                  Physical Design & RTL Engineer roles
                </p>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all self-start text-xs"
            >
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Bhavya Sri. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineered with Silicon Precision & Next.js</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
