"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { portfolioData, Experience as ExperienceType } from "@/data/portfolioData";

export default function Experience() {
  const [activeExp, setActiveExp] = useState<ExperienceType>(
    portfolioData.experiences[0]
  );

  return (
    <section id="experience" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" />
            <span>03. Professional Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry <span className="silicon-gradient-text">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Physical design traineeships, government semiconductor programs (MeitY), and tech leadership roles.
          </p>
        </div>

        {/* Interactive Experience Layout: Left selector / Right active detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Timeline Cards / Tab List */}
          <div className="lg:col-span-5 space-y-3">
            {portfolioData.experiences.map((exp) => {
              const isSelected = activeExp.id === exp.id;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveExp(exp)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative text-left ${
                    isSelected
                      ? "bg-[#0c1322] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      : "bg-[#0c1322]/60 border-slate-800 hover:border-slate-700 hover:bg-[#0c1322]/90"
                  }`}
                >
                  {/* Left accent bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-400 rounded-r" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        exp.isCurrent
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 animate-pulse"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {exp.isCurrent ? "Active Role" : exp.type}
                    </span>

                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400/80" />
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300">
                    {exp.role}
                  </h3>

                  <p className="text-xs font-medium text-cyan-300/90 mt-0.5 font-mono">
                    {exp.company}
                  </p>

                  <div className="flex items-center justify-between mt-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-[11px] truncate max-w-[200px]">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      {exp.location}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-cyan-400 translate-x-1" : "text-slate-600"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detail Card for Selected Role */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1322] border border-cyan-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden">
              
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-bl-full pointer-events-none" />

              {/* Role Header */}
              <div className="border-b border-slate-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider font-semibold">
                    {activeExp.type.toUpperCase()} SPECIFICATION
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    {activeExp.period}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activeExp.role}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyan-300 mt-2">
                  <span className="font-semibold text-sm text-cyan-300">
                    {activeExp.company}
                  </span>
                  {activeExp.location && (
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {activeExp.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Role Description */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Overview & Objectives
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {activeExp.description}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Key Technical Responsibilities & Execution
                  </h4>
                  <div className="space-y-2.5">
                    {activeExp.keyResponsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies / Tooling Strip */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2.5">
                    EDA Toolchain & Methodologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
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
