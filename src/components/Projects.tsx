"use client";

import React, { useState } from "react";
import {
  Cpu,
  ExternalLink,
  Search,
  X,
  Sparkles,
  Zap,
  Activity,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { portfolioData, Project } from "@/data/portfolioData";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "VLSI & FPGA", "Embedded & AI"];

  const filteredProjects = portfolioData.projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "VLSI & FPGA" &&
        (project.category === "VLSI & FPGA" || project.category === "Hardware Security")) ||
      project.category === activeCategory;

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.tools.some((tl) => tl.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              <span>04. Hardware Implementations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="silicon-gradient-text">VLSI & Hardware Projects</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              FPGA synthesis, RTL microarchitecture, secure electronic voting logic, and energy-optimized edge computing.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by RTL, FPGA, FPGA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-800 focus:border-cyan-400 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-[#0c1322]/90 border border-slate-800/90 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 group relative overflow-hidden backdrop-blur-md"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Domain Tag & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-semibold uppercase">
                    {project.domainTag}
                  </span>
                  
                  {project.featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug mb-2">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Metrics Chip Row (if available) */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-1.5 py-2.5 px-3 bg-slate-900/90 rounded-xl border border-slate-800 mb-4 text-center">
                    {project.metrics.map((m, i) => (
                      <div key={i}>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {m.label}
                        </span>
                        <span className="text-xs font-bold text-cyan-300 font-mono">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer & Inspect Trigger */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group-hover:underline"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Inspect Spec</span>
                </button>

                <div className="flex items-center gap-2 text-slate-400">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Project details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Spec & Architecture Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c1322] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-[#080d18]">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  {selectedProject.domainTag}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 font-sans">
              
              {/* Detailed Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Hardware Microarchitecture & Synthesis
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {selectedProject.description}
                </p>
              </div>

              {/* Full Architecture Highlights if available */}
              {selectedProject.fullDetails?.architecture && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 font-bold">
                    Architecture & RTL Modules:
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {selectedProject.fullDetails.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <span className="text-cyan-400 font-mono">0{idx + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hardware Stack & EDA Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block font-bold mb-2">
                    Hardware & Silicon Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-200 rounded border border-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block font-bold mb-2">
                    Key Performance Metrics
                  </span>
                  <div className="space-y-1 text-xs font-mono text-slate-300">
                    {selectedProject.metrics?.map((m, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-slate-400">{m.label}:</span>
                        <span className="text-emerald-400 font-bold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-800 bg-[#080d18] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Synthesized with Xilinx Vivado / ModelSim
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl"
              >
                Close Spec
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
