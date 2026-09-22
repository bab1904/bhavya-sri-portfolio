"use client";

import React, { useState } from "react";
import {
  Award,
  CheckCircle,
  Search,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "VLSI & Semiconductor",
    "EDA & FPGA",
    "Software & AI",
    "Core Engineering",
  ];

  const filteredCerts = portfolioData.certifications.filter((cert) => {
    const matchesCategory =
      selectedCategory === "All" || cert.category === selectedCategory;
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="certifications" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/70 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>05. Industry Accreditations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certifications & <span className="amber-gradient-text">Fellowships</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              16+ verified industry programs from global semiconductor academies, Samsung, NIELIT MeitY, IBM, and top institutes.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-800 focus:border-amber-400 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                  : "bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-[#0c1322]/90 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(245,158,11,0.12)] hover:-translate-y-1 flex flex-col justify-between group backdrop-blur-md relative overflow-hidden"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 font-semibold uppercase">
                    {cert.category}
                  </span>

                  {cert.featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" /> Verified
                    </span>
                  )}
                </div>

                {/* Certification Title */}
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight leading-snug">
                  {cert.name}
                </h3>

                {/* Issuer */}
                <p className="text-xs font-mono text-cyan-300/90 mt-1 mb-4 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{cert.issuer}</span>
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified footer status */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3 h-3" /> Credential Active
                </span>
                <span className="text-slate-400 text-[10px]">Silicon Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
