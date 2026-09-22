"use client";

import React, { useEffect, useState, useRef } from "react";
import { Cpu, Award, Wrench, Trophy, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Highlights() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "Award":
        return <Award className="w-6 h-6 text-amber-400" />;
      case "Wrench":
        return <Wrench className="w-6 h-6 text-emerald-400" />;
      case "Trophy":
        return <Trophy className="w-6 h-6 text-amber-300" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section ref={containerRef} className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {portfolioData.metrics.map((metric) => (
            <div
              key={metric.id}
              className="relative p-6 rounded-2xl bg-[#0c1322]/80 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-950/30 transition-all duration-300">
                  {getIcon(metric.icon)}
                </div>
                
                <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                  PROVEN
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {inView ? metric.value : 0}
                  </span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {metric.suffix}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-200 mt-1">
                  {metric.label}
                </h3>
                
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {metric.sublabel}
                </p>
              </div>

              {/* Silicon PCB corner traces */}
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-slate-700 pointer-events-none group-hover:border-cyan-500/60 transition-colors" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
