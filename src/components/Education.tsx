"use client";

import React from "react";
import {
  GraduationCap,
  Trophy,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>06. Academic Pedigree & Honors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & <span className="silicon-gradient-text">National Honors</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Rigorous VLSI undergraduate curriculum paired with national-level hackathon championships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education Degrees */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Academic Degrees & Institutions
            </h3>

            <div className="space-y-6">
              {portfolioData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-[#0c1322]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-xl backdrop-blur-md relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                      {edu.period}
                    </span>
                    {edu.grade && (
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {edu.degree} — <span className="text-cyan-300">{edu.field}</span>
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 flex items-center gap-1.5 font-mono">
                    <span>{edu.institution}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{edu.location}</span>
                  </p>

                  {/* Coursework Chips */}
                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                      Key Coursework & Domains:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  {edu.highlights && (
                    <div className="mt-4 space-y-1 text-xs text-slate-400">
                      {edu.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Honors, Hackathons & Awards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-base font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Hackathon Championships & Honors
            </h3>

            <div className="space-y-4">
              {portfolioData.honors.map((honor) => (
                <div
                  key={honor.id}
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/20 via-[#0c1322] to-slate-900 border border-amber-500/30 hover:border-amber-400/60 shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-bold">
                      National Winner
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {honor.title}
                  </h4>

                  <p className="text-xs font-mono text-cyan-300 mt-1 mb-2">
                    {honor.issuer}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {honor.description}
                  </p>
                </div>
              ))}

              {/* Leadership Impact Card */}
              <div className="p-6 rounded-2xl bg-[#0c1322]/90 border border-slate-800 text-xs text-slate-300 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Campus & Global Leadership</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Active leader driving hardware hackathons as Deputy Head of E-Cell and representing Google student programs as Google Student Ambassador.
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>Leadership Impact</span>
                  <span className="text-emerald-400">1000+ Students Mentored</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
