"use client";

import React, { useState } from "react";
import {
  Cpu,
  Globe,
  CheckCircle2,
  Workflow,
  Sparkles,
  Zap,
} from "lucide-react";
import { portfolioData, PDStage } from "@/data/portfolioData";

export default function About() {
  const [selectedStage, setSelectedStage] = useState<PDStage>(
    portfolioData.physicalDesignFlow[0]
  );

  return (
    <section id="about" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>01. Engineering Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="silicon-gradient-text">Bhavya Sri</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Specializing in ASIC backend implementation, floorplanning, CTS, routing, and physical verification signoff.
          </p>
        </div>

        {/* Main Grid: Bio + Language Cards & Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Bio & Key Focus */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1322]/90 border border-slate-800/90 shadow-xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
              
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Physical Design Trainee & ASIC Backend Specialist
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{portfolioData.personal.aboutSummary}</p>
                <p>
                  My technical focus centers on navigating complex timing signoffs, clock tree optimization, and standard cell layout density. I combine automated TCL scripting with deep physical intuition to resolve routing congestion, IR-drop anomalies, and nanometer design rule checks (DRC).
                </p>
              </div>

              {/* Quick Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800 text-xs font-mono">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                  <span className="text-cyan-400 font-bold block mb-1">Floorplan & PDN</span>
                  <span className="text-slate-400">Core aspect ratio, macro halos & power mesh synthesis</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                  <span className="text-amber-400 font-bold block mb-1">Placement & CTS</span>
                  <span className="text-slate-400">CCOpt skew minimization, latency balancing & buffer sizing</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                  <span className="text-emerald-400 font-bold block mb-1">Signoff STA & DRC</span>
                  <span className="text-slate-400">Setup/Hold closure, MCMM corners & 100% clean DRC/LVS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Languages & Communication Profile */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0c1322]/90 border border-slate-800/90 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-white font-bold text-base mb-4">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>Spoken Languages</span>
              </div>
              
              <div className="space-y-3">
                {portfolioData.personal.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800"
                  >
                    <span className="font-semibold text-slate-200 text-sm">
                      {lang.name}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-cyan-400 font-mono font-semibold">Location:</span> India (Open to global relocation & on-site/hybrid opportunities).
              </div>
            </div>

            {/* Quick stats mini card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-slate-900/80 border border-cyan-500/20 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-300 font-bold mb-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>ASIC Methodology</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Trained on advanced submicron toolsets, standard cell libraries, and foundry physical ruledecks.
              </p>
            </div>
          </div>

        </div>

        {/* Interactive RTL-to-GDSII Physical Design Flow Explorer */}
        <div className="mt-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1322] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  <Workflow className="w-4 h-4" />
                  <span>Interactive EDA Pipeline</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  RTL-to-GDSII Physical Design Flow
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Explore the 8 essential stages of semiconductor physical implementation mastered by Bhavya.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
                Stage <span className="text-cyan-400 font-bold">{selectedStage.step}</span> of 8: <span className="text-white font-bold">{selectedStage.shortCode}</span>
              </div>
            </div>

            {/* Stage Selector Pipeline Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
              {portfolioData.physicalDesignFlow.map((stage) => {
                const isSelected = selectedStage.step === stage.step;
                return (
                  <button
                    key={stage.step}
                    onClick={() => setSelectedStage(stage)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[82px] ${
                      isSelected
                        ? "bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white"
                        : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono font-bold text-cyan-400">
                        0{stage.step}
                      </span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                    </div>
                    <span className="text-xs font-bold font-mono tracking-tight mt-1 line-clamp-1">
                      {stage.shortCode}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate">
                      {stage.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Stage Detail Inspector */}
            <div className="p-6 rounded-2xl bg-[#080d18] border border-cyan-500/20 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-300">
                    0{selectedStage.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{selectedStage.name}</h4>
                    <span className="text-xs font-mono text-amber-400">
                      Standard EDA Tools: {selectedStage.toolExample}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedStage.description}
                </p>

                {/* Key Signoff Checks */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
                    Signoff Checks & Criteria:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedStage.keyChecks.map((chk, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {chk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inputs & Outputs Columns */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Inputs */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-2">
                      Stage Inputs (.lib / .lef / .sdc)
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                      {selectedStage.inputs.map((inp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400">→</span>
                          <span>{inp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2">
                      Stage Outputs (DEF / SPEF / GDSII)
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                      {selectedStage.outputs.map((out, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400">✓</span>
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
