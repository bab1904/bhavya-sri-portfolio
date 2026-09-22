"use client";

import React, { useState } from "react";
import {
  Code2,
  Binary,
  Terminal,
  Layers,
  Search,
  CheckCircle,
  Cpu,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case "Binary":
        return <Binary className="w-5 h-5 text-amber-400" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-purple-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredCategories = portfolioData.skillCategories
    .filter((cat) => {
      if (selectedCategory !== "all" && cat.title !== selectedCategory) {
        return false;
      }
      return true;
    })
    .map((cat) => {
      if (!searchQuery.trim()) return cat;
      const filteredSkills = cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.note && s.note.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return { ...cat, skills: filteredSkills };
    })
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/70 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <Binary className="w-3.5 h-3.5" />
              <span>02. Technical Toolkit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills & <span className="silicon-gradient-text">EDA Matrix</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Industry-grade toolsets, hardware description languages, and microarchitectural methodologies.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill, EDA tool, HDL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-800 focus:border-cyan-400 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCategory === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Disciplines
          </button>
          {portfolioData.skillCategories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(cat.title)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat.title
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="p-6 sm:p-7 rounded-2xl bg-[#0c1322]/90 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills list inside category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200 text-xs group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </span>
                        
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                            skill.level === "Mastery"
                              ? "bg-cyan-950 text-cyan-300 border border-cyan-800/50"
                              : skill.level === "Proficient"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800/50"
                              : "bg-amber-950 text-amber-300 border border-amber-800/50"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {skill.note && (
                        <p className="text-[11px] text-slate-400 font-mono mt-1 line-clamp-1">
                          {skill.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer info */}
              <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Total: {category.skills.length} competencies</span>
                <span className="text-cyan-400/80 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Industry Calibrated
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
