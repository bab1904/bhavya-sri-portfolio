"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Activity,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  CheckCircle2,
  FileCode2,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { portfolioData, PDStage } from "@/data/portfolioData";

export default function PhysicalDesignFlow() {
  const stages = portfolioData.physicalDesignFlow;
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "commands" | "io" | "checks">("overview");

  const currentStage: PDStage = stages[activeStepIndex];

  // Auto-play flow progression
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % stages.length);
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, stages.length]);

  // Command snippets tailored for each stage
  const getToolCommands = (stage: PDStage) => {
    switch (stage.step) {
      case 1:
        return `# Cadence Genus Logic Synthesis Flow
read_hdl -verilog [glob src/*.v]
elaborate $DESIGN_TOP
read_sdc constraints/top_timing.sdc
set_db / .syn_generic_effort high
syn_generic
syn_map
syn_opt -spatial
report_timing -lint > reports/syn_timing_lint.rpt
write_hdl > outputs/top_synthesized_netlist.v
write_sdc > outputs/top_mapped.sdc`;

      case 2:
        return `# Cadence Innovus Floorplan & Power Distribution Network (PDN)
read_mmmc scripts/view_definition.tcl
read_physical -lef {tech.lef stdcells.lef macros.lef}
read_netlist outputs/top_synthesized_netlist.v -top top_chip
init_design

# Create core die boundary with 72% target utilization
create_floorplan -site CoreSite -core_margins_by die -core_margins 12.0
add_macro_halos -all_macros -halo_deltas {4.0 4.0 4.0 4.0}
place_macros -effort high

# Construct VDD / VSS Power Mesh & Guard Rings
add_rings -nets {VDD VSS} -type core_rings -width 4.5 -spacing 2.0 -layer {top M7 bottom M7 left M6 right M6}
add_stripes -nets {VDD VSS} -layer M6 -width 2.0 -spacing 2.0 -set_to_set_distance 20.0
check_power_mesh -out_file reports/pdn_mesh_integrity.rpt`;

      case 3:
        return `# Cadence Innovus Standard Cell Placement & Congestion Optimization
set_db place_opt_effort high
set_db place_opt_congestion_effort high
set_db place_opt_run_cts false

# High-effort timing-driven global & detailed placement
place_opt_design -congestion

# Check placement density and routing congestion hot-spots
report_congestion -hotspot -out_file reports/placement_congestion.rpt
report_density_map -out_file reports/core_density.rpt
check_placement -verbose`;

      case 4:
        return `# Cadence Innovus Clock Tree Synthesis (CCOpt Engine)
create_clock_tree_spec -out_file specs/ccopt_spec.tcl
source specs/ccopt_spec.tcl

# Configure clock routing rules & skew minimization targets
set_db ccopt_target_skew 0.030 ;# 30ps skew ceiling
set_db ccopt_target_max_trans 0.150 ;# 150ps transition max
set_db ccopt_clock_trees clk_core

# Execute concurrent Clock and Data Optimization
ccopt_design -cts

# Generate Clock Tree Skew & Latency Reports
report_ccopt_clock_trees -file reports/cts_skew_report.rpt
report_ccopt_skew_groups -file reports/cts_skew_groups.rpt`;

      case 5:
        return `# Post-CTS Timing & Hold Violation Fixing
set_db opt_hold_effort high
set_db opt_setup_effort high

# Run timing optimization on real propagated clock network
opt_design -post_cts -hold
opt_design -post_cts -setup

# Signoff Hold margin verification
time_design -post_cts -hold -report_prefix reports/time_post_cts_hold
time_design -post_cts -setup -report_prefix reports/time_post_cts_setup`;

      case 6:
        return `# Cadence Innovus NanoRoute (Global & Detailed Signal Routing)
set_db route_design_antenna_effort high
set_db route_design_detail_use_multi_cut_vias true
set_db route_design_with_si_driven true

# Execute global and detailed routing with crosstalk avoidance
route_design -global_detail -via_opt

# Parasitic RC extraction & Antenna violation checks
extract_rc -effort_level medium
check_antenna -out_file reports/antenna_violations.rpt
check_drc -out_file reports/route_drc.rpt`;

      case 7:
        return `# Cadence Tempus / Synopsys PrimeTime Signoff Static Timing Analysis
read_spef outputs/top_chip.spef
read_sdc constraints/signoff_mcmm.sdc

# Run multi-corner multi-mode (MCMM) timing analysis
report_timing -early -max_paths 50 > reports/signoff_hold_timing.rpt
report_timing -late -max_paths 50 > reports/signoff_setup_timing.rpt

# Worst Negative Slack (WNS) & Total Negative Slack (TNS)
report_analysis_summary > reports/sta_signoff_summary.rpt
# Result: WNS = 0.00ps | TNS = 0.00ps [MET]`;

      case 8:
        return `# Physical Verification (Pegasus / Mentor Calibre) & GDSII Tapeout
# Layout Versus Schematic (LVS)
verify_connectivity -type all -error 1000 -out_file reports/lvs_connectivity.rpt

# Design Rule Checking (DRC)
verify_drc -limit 10000 -out_file reports/drc_physical_verification.rpt

# Dummy Metal Fill Insertion & Stream Out
add_metal_fill -layer {M1 M2 M3 M4 M5 M6 M7} -timing_aware true
stream_out -output_file outputs/top_chip_signoff.gds -map_file tech.map
puts ">>> GDSII Tapeout Generated Successfully! 100% DRC/LVS Clean."`;

      default:
        return stage.description;
    }
  };

  return (
    <section id="pd-flow" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>02. ASIC Implementation Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive <span className="silicon-gradient-text">RTL-to-GDSII Physical Design Flow</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Step-by-step physical implementation workflow from technology-mapped netlist to signoff GDSII tapeout, powered by Cadence Innovus, Genus, and Tempus toolchains.
            </p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isPlaying
                  ? "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40"
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Pause Flow" : "Auto-Play Pipeline"}</span>
            </button>

            <button
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : stages.length - 1))}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors"
              title="Previous Stage"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveStepIndex((prev) => (prev + 1) % stages.length)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors"
              title="Next Stage"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progression Ribbon / Nodes */}
        <div className="mb-10 overflow-x-auto pb-4 pt-1">
          <div className="flex items-center min-w-[850px] justify-between relative px-2">
            {/* Background connection line */}
            <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[2px] bg-slate-800 -z-0" />
            
            {/* Active progress bar */}
            <div
              className="absolute top-1/2 left-6 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 -z-0 transition-all duration-500"
              style={{
                width: `${(activeStepIndex / (stages.length - 1)) * 96}%`,
              }}
            />

            {stages.map((stage, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;

              return (
                <button
                  key={stage.step}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className="group relative z-10 flex flex-col items-center focus:outline-none"
                >
                  {/* Step Bubble */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500 text-slate-950 scale-110 shadow-[0_0_20px_rgba(6,182,212,0.6)] ring-4 ring-cyan-500/20"
                        : isPast
                        ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50"
                        : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    0{stage.step}
                  </div>

                  {/* Stage Short Code Label */}
                  <span
                    className={`text-[11px] font-mono mt-2 font-bold tracking-tight transition-colors ${
                      isActive
                        ? "text-cyan-300"
                        : isPast
                        ? "text-slate-300"
                        : "text-slate-500 group-hover:text-slate-400"
                    }`}
                  >
                    {stage.shortCode}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Interactive Card */}
        <div className="rounded-3xl bg-[#0c1322]/90 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden glow-border">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono font-extrabold text-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                0{currentStage.step}
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                  Stage {currentStage.step} of {stages.length} • {currentStage.shortCode}
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  {currentStage.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                {currentStage.toolExample}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 pt-6 border-b border-slate-800/80 pb-3 overflow-x-auto text-xs font-mono">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "overview"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Overview &amp; Purpose</span>
            </button>

            <button
              onClick={() => setActiveTab("commands")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "commands"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>EDA Tool TCL Commands</span>
            </button>

            <button
              onClick={() => setActiveTab("io")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "io"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Inputs &amp; Outputs (LEF/DEF/SPEF)</span>
            </button>

            <button
              onClick={() => setActiveTab("checks")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "checks"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Signoff Quality Checks</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="py-6 min-h-[220px]">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
                  {currentStage.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block font-bold mb-1">
                      Primary Objective
                    </span>
                    <p className="text-xs text-slate-300">
                      Transform design abstractions into physically manufacturable silicon structures with zero DRC violations.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-bold mb-1">
                      PPA Impact
                    </span>
                    <p className="text-xs text-slate-300">
                      Optimizes Power dissipation, Clock skew frequency, and standard cell core area footprint.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block font-bold mb-1">
                      Execution Toolchain
                    </span>
                    <p className="text-xs text-slate-300">
                      {currentStage.toolExample} running on high-performance Linux EDA compute nodes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "commands" && (
              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Automated Script Pipeline: <strong className="text-cyan-300">{currentStage.shortCode.toLowerCase()}_flow.tcl</strong></span>
                  <span className="text-[11px] text-emerald-400">TCL Automation Ready</span>
                </div>
                <div className="bg-[#070b14] p-4 sm:p-5 rounded-2xl border border-cyan-500/20 text-xs sm:text-sm overflow-x-auto">
                  <pre className="text-slate-300 leading-relaxed">
                    {getToolCommands(currentStage)}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "io" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                    <span>Required Input Artifacts</span>
                  </div>
                  <div className="space-y-2">
                    {currentStage.inputs.map((inp, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span>{inp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Generated Output Artifacts</span>
                  </div>
                  <div className="space-y-2">
                    {currentStage.outputs.map((out, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "checks" && (
              <div className="space-y-3">
                <p className="text-xs font-mono text-amber-300">
                  Critical Quality Signoff Checks &amp; Acceptance Gates:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {currentStage.keyChecks.map((check, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#080d18] border border-cyan-500/30 flex items-start gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">
                          Gate 0{i + 1}
                        </span>
                        <span className="text-slate-200 font-bold text-xs sm:text-sm">
                          {check}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card Footer with Quick Navigation */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 hidden sm:block">
              Click any node above or use stepper to navigate stages
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : stages.length - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                Previous Stage
              </button>
              <button
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % stages.length)}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              >
                Next Stage: {stages[(activeStepIndex + 1) % stages.length].shortCode}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
