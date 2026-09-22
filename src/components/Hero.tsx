"use client";

import React, { useState } from "react";
import {
  Cpu,
  Terminal,
  Activity,
  ArrowRight,
  Mail,
  Phone,
  Copy,
  Check,
  Zap,
  Layers,
  Sparkles,
  FileCode2,
} from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolioData";

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState<"floorplan" | "timing" | "verilog">("floorplan");

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Intro & Information */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide">{portfolioData.personal.statusBadge}</span>
            </div>

            {/* Name and Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I&apos;m{" "}
                <span className="silicon-gradient-text">
                  {portfolioData.personal.name}
                </span>
              </h1>
              
              <div className="flex items-center gap-2 text-amber-400 font-mono text-sm sm:text-base font-semibold">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{portfolioData.personal.roleTag}</span>
              </div>
            </div>

            {/* Subheadline description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              {portfolioData.personal.subheadline}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.65)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all hover:text-cyan-300 shadow-md"
              >
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>View Full CV</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Contact Badges */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Direct Connectivity
              </p>
              
              <div className="flex flex-wrap gap-2.5">
                {/* Email Chip */}
                <button
                  onClick={() => copyToClipboard(portfolioData.personal.email, "email")}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all group"
                  title="Click to copy email"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{portfolioData.personal.email}</span>
                  {copiedEmail ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  )}
                </button>

                {/* Phone Chip */}
                <button
                  onClick={() => copyToClipboard(portfolioData.personal.phone, "phone")}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all group"
                  title="Click to copy phone number"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{portfolioData.personal.phone}</span>
                  {copiedPhone ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  )}
                </button>

                {/* LinkedIn Badge */}
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5]/15 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 text-xs font-mono text-[#38bdf8] transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Silicon EDA & Die Simulation Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0c1322] border border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden glow-border">
              
              {/* Scanline light effect */}
              <div className="scanline-effect" />

              {/* Console Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#080d18] border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-slate-400 text-[11px] ml-1">cadence_innovus_flow.tcl</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-cyan-400 text-[11px]">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>STA: WNS 0.00ps</span>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex border-b border-slate-800/80 bg-[#090e1b] px-3 pt-2 gap-1 text-xs font-mono">
                <button
                  onClick={() => setActiveTab("floorplan")}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === "floorplan"
                      ? "bg-[#0d1629] text-cyan-300 border-t border-x border-cyan-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Die Floorplan</span>
                </button>
                <button
                  onClick={() => setActiveTab("timing")}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === "timing"
                      ? "bg-[#0d1629] text-cyan-300 border-t border-x border-cyan-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>Timing & CTS</span>
                </button>
                <button
                  onClick={() => setActiveTab("verilog")}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === "verilog"
                      ? "bg-[#0d1629] text-cyan-300 border-t border-x border-cyan-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>RTL Code</span>
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 min-h-[300px] flex flex-col justify-between">
                
                {activeTab === "floorplan" && (
                  <div className="space-y-4">
                    {/* Visual Floorplan Grid Simulation */}
                    <div className="relative aspect-[4/3] w-full rounded-xl bg-[#070b14] border border-cyan-500/20 p-3 flex flex-col justify-between overflow-hidden">
                      {/* VDD/VSS Power Ring Border */}
                      <div className="absolute inset-1.5 border border-dashed border-cyan-500/40 rounded pointer-events-none" />
                      
                      {/* Top I/O Pads */}
                      <div className="flex justify-around">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-5 h-2 bg-cyan-400/60 rounded-xs text-[7px] text-center text-slate-950 font-bold">PAD</div>
                        ))}
                      </div>

                      {/* Core Area with Macros and Standard Cell Rows */}
                      <div className="grid grid-cols-12 gap-2 my-2 h-full items-center">
                        {/* SRAM Macro 0 */}
                        <div className="col-span-4 h-24 bg-cyan-950/80 border border-cyan-400/50 rounded p-1.5 flex flex-col justify-between">
                          <span className="text-[9px] text-cyan-300 font-bold">SRAM_16KB</span>
                          <span className="text-[8px] text-slate-400">Macro A</span>
                          <div className="w-full bg-cyan-500/20 h-1 rounded" />
                        </div>

                        {/* Standard Cell Core Logic */}
                        <div className="col-span-4 h-24 bg-slate-900/90 border border-slate-700/60 rounded p-1.5 flex flex-col justify-between relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:6px_6px] opacity-30" />
                          <span className="text-[9px] text-amber-300 font-bold relative z-10">RTL Core</span>
                          <span className="text-[8px] text-slate-400 relative z-10">StdCells: 85k</span>
                          <span className="text-[8px] text-emerald-400 relative z-10 font-bold">Util: 72.4%</span>
                        </div>

                        {/* SRAM Macro 1 */}
                        <div className="col-span-4 h-24 bg-cyan-950/80 border border-cyan-400/50 rounded p-1.5 flex flex-col justify-between">
                          <span className="text-[9px] text-cyan-300 font-bold">SRAM_16KB</span>
                          <span className="text-[8px] text-slate-400">Macro B</span>
                          <div className="w-full bg-cyan-500/20 h-1 rounded" />
                        </div>
                      </div>

                      {/* Bottom I/O Pads */}
                      <div className="flex justify-around">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-5 h-2 bg-cyan-400/60 rounded-xs text-[7px] text-center text-slate-950 font-bold">PAD</div>
                        ))}
                      </div>
                    </div>

                    {/* Floorplan Stats Strip */}
                    <div className="grid grid-cols-3 gap-2 text-[11px] bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Die Area</span>
                        <span className="text-white font-bold">1.2 × 1.2 mm²</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Core Util</span>
                        <span className="text-cyan-300 font-bold">72.4%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">DRC Violations</span>
                        <span className="text-emerald-400 font-bold">0 Clean</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "timing" && (
                  <div className="space-y-3">
                    <div className="bg-[#070b14] p-3 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-slate-400 text-[11px]">
                        <span>Clock Domain: <strong className="text-white">clk_core (100MHz)</strong></span>
                        <span className="text-emerald-400 font-bold">MET</span>
                      </div>

                      {/* Timing slack bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-400">Worst Setup Slack (WNS)</span>
                          <span className="text-emerald-400 font-bold">+0.420 ns</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full w-[85%] rounded-full" />
                        </div>
                      </div>

                      {/* Hold slack bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-400">Worst Hold Slack (WHS)</span>
                          <span className="text-emerald-400 font-bold">+0.085 ns</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-400 h-full w-[78%] rounded-full" />
                        </div>
                      </div>

                      {/* CTS Skew metrics */}
                      <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <span className="text-slate-400">Max Clock Skew:</span>
                          <span className="text-amber-300 font-bold ml-1">28.4 ps</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Max Insertion Delay:</span>
                          <span className="text-cyan-300 font-bold ml-1">420 ps</span>
                        </div>
                      </div>
                    </div>

                    {/* Waveform graphic */}
                    <div className="bg-[#070b14] p-3 rounded-lg border border-cyan-500/20">
                      <span className="text-[10px] text-cyan-400 block mb-1.5">{"// Clock Waveform & Data Path"}</span>
                      <div className="space-y-2 text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 w-12 shrink-0">clk:</span>
                          <div className="text-cyan-400 tracking-wider">_П_П_П_П_П_П_П_П_</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 w-12 shrink-0">data_in:</span>
                          <div className="text-amber-400 tracking-wider">===X===X=======X===</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 w-12 shrink-0">q_out:</span>
                          <div className="text-emerald-400 tracking-wider">_____===X===X======</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "verilog" && (
                  <div className="bg-[#070b14] p-3 rounded-lg border border-slate-800 text-[11px] leading-relaxed overflow-x-auto">
                    <pre className="text-slate-300">
                      <span className="text-cyan-400">module</span> <span className="text-amber-300">rtl_pipeline_stage</span> #(
                      {"\n"}  <span className="text-cyan-400">parameter</span> DATA_WIDTH = 32
                      {"\n"})(
                      {"\n"}  <span className="text-cyan-400">input</span>  <span className="text-cyan-400">wire</span> clk, rst_n,
                      {"\n"}  <span className="text-cyan-400">input</span>  <span className="text-cyan-400">wire</span> [DATA_WIDTH-1:0] din,
                      {"\n"}  <span className="text-cyan-400">output</span> <span className="text-cyan-400">reg</span>  [DATA_WIDTH-1:0] dout
                      {"\n"});
                      {"\n"}
                      {"\n"}  <span className="text-slate-400">{"// Synchronous register with active-low reset"}</span>
                      {"\n"}  <span className="text-cyan-400">always</span> @(<span className="text-cyan-400">posedge</span> clk <span className="text-cyan-400">or negedge</span> rst_n) <span className="text-cyan-400">begin</span>
                      {"\n"}    <span className="text-cyan-400">if</span> (!rst_n) dout &lt;= &apos;{0};
                      {"\n"}    <span className="text-cyan-400">else</span>       dout &lt;= din;
                      {"\n"}  <span className="text-cyan-400">end</span>
                      {"\n"}<span className="text-cyan-400">endmodule</span>
                    </pre>
                  </div>
                )}

                {/* Bottom interactive status bar */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Physical Flow: P&R Signoff Validated</span>
                  </div>
                  <span className="text-slate-400 font-mono">EDA Engine Active</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
