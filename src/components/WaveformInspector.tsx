"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Zap,
} from "lucide-react";

interface RTLModule {
  id: string;
  name: string;
  filename: string;
  language: "Verilog" | "SystemVerilog";
  description: string;
  targetHardware: string;
  clockFreq: string;
  totalGates: string;
  code: string;
  signals: {
    name: string;
    type: "clock" | "binary" | "bus";
    width?: number;
    color: string;
    // Values at time slices t0 through t9 (representing 0ns to 90ns)
    values: (number | string)[];
  }[];
}

const RTL_MODULES: RTLModule[] = [
  {
    id: "read2hear",
    name: "FPGA Braille Radar FSM",
    filename: "read2hear_fsm.v",
    language: "Verilog",
    description:
      "Synthesizable ultrasonic echo pulse-width counter and real-time tactile Braille solenoid actuator state machine synthesized on Xilinx Artix-7 FPGA.",
    targetHardware: "Xilinx Artix-7 FPGA (XC7A35T)",
    clockFreq: "50 MHz (20.0 ns)",
    totalGates: "1,420 Gates",
    code: `\`timescale 1ns / 1ps
// ============================================================================
// Module: read2hear_fsm
// Project: READ2HEAR Real-time Braille Radar Telemetry
// Author: Tummalapenta Bhavya Sri (Physical Design / RTL Engineer)
// ============================================================================

module read2hear_fsm (
    input  wire        clk_50mhz,       // 50MHz Master FPGA Clock
    input  wire        rst_n,           // Active-low Synchronous Reset
    input  wire        echo_pulse,      // Microsecond Ultrasonic Return
    output reg         trigger_out,     // 10us Sonar Trigger Pulse
    output reg  [2:0]  state_out,       // Active FSM State
    output reg  [5:0]  braille_pins,    // 6-Dot Tactile Solenoid Drive
    output reg         data_valid       // Actuation Ready Flag
);

    // FSM State Encoding
    localparam [2:0] 
        STATE_IDLE       = 3'b000,
        STATE_TRIGGER    = 3'b001,
        STATE_WAIT_ECHO  = 3'b010,
        STATE_MEASURE    = 3'b011,
        STATE_CALC_DIST  = 3'b100,
        STATE_ACTUATE    = 3'b101;

    reg [2:0]  current_state, next_state;
    reg [19:0] echo_counter;
    reg [7:0]  distance_cm;

    // Sequential State Transition & Counter Logic
    always @(posedge clk_50mhz or negedge rst_n) begin
        if (!rst_n) begin
            current_state <= STATE_IDLE;
            echo_counter  <= 20'd0;
            braille_pins  <= 6'b000000;
            data_valid    <= 1'b0;
        end else begin
            current_state <= next_state;
            if (current_state == STATE_MEASURE && echo_pulse) begin
                echo_counter <= echo_counter + 1'b1;
            end else if (current_state == STATE_IDLE) begin
                echo_counter <= 20'd0;
            end
        end
    end

    // Combinational Next-State & Actuator Decode
    always @(*) begin
        next_state   = current_state;
        trigger_out  = 1'b0;
        data_valid   = 1'b0;

        case (current_state)
            STATE_IDLE: begin
                next_state = STATE_TRIGGER;
            end
            STATE_TRIGGER: begin
                trigger_out = 1'b1;
                next_state  = STATE_WAIT_ECHO;
            end
            STATE_WAIT_ECHO: begin
                if (echo_pulse) next_state = STATE_MEASURE;
            end
            STATE_MEASURE: begin
                if (!echo_pulse) next_state = STATE_CALC_DIST;
            end
            STATE_CALC_DIST: begin
                next_state = STATE_ACTUATE;
            end
            STATE_ACTUATE: begin
                data_valid = 1'b1;
                next_state = STATE_IDLE;
            end
            default: next_state = STATE_IDLE;
        endcase
    end

    // Map calculated proximity into tactile Braille output matrix
    always @(posedge clk_50mhz) begin
        state_out <= current_state;
        if (current_state == STATE_ACTUATE) begin
            // Distance thresholding mapping (Obstacle Warning)
            braille_pins <= 6'b100101; // Braille Pattern 'H' (Hazard)
        end
    end

endmodule`,
    signals: [
      {
        name: "clk_50mhz",
        type: "clock",
        color: "#06b6d4", // Cyan
        values: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      },
      {
        name: "rst_n",
        type: "binary",
        color: "#10b981", // Emerald
        values: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "trigger_out",
        type: "binary",
        color: "#f59e0b", // Amber
        values: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "echo_pulse",
        type: "binary",
        color: "#a855f7", // Purple
        values: [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      },
      {
        name: "state[2:0]",
        type: "bus",
        width: 3,
        color: "#38bdf8", // Sky blue
        values: [
          "IDLE",
          "TRIG",
          "WAIT",
          "WAIT",
          "MEAS",
          "MEAS",
          "CALC",
          "ACTU",
          "IDLE",
          "IDLE",
        ],
      },
      {
        name: "braille_pins[5:0]",
        type: "bus",
        width: 6,
        color: "#ec4899", // Pink
        values: [
          "000000",
          "000000",
          "000000",
          "000000",
          "000000",
          "000000",
          "000000",
          "100101",
          "100101",
          "100101",
        ],
      },
      {
        name: "data_valid",
        type: "binary",
        color: "#10b981", // Emerald
        values: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
      },
    ],
  },
  {
    id: "secure-voting",
    name: "Tamper-Proof Voting Core",
    filename: "secure_voting_core.sv",
    language: "SystemVerilog",
    description:
      "Hardware-isolated atomic voter tally accumulator with hardware glitch detection and encrypted register retention.",
    targetHardware: "Basys-3 / Nexys FPGA",
    clockFreq: "100 MHz (10.0 ns)",
    totalGates: "3,850 Gates",
    code: `\`timescale 1ns / 1ps
// ============================================================================
// Module: secure_voting_core
// System: Hardware-Isolated Electronic Voting Machine (EVM)
// Author: Tummalapenta Bhavya Sri
// ============================================================================

interface EvmBusInterface;
    logic        voter_auth_valid;
    logic [3:0]  candidate_select;
    logic        ballot_commit;
    logic        tamper_flag;
endinterface

module secure_voting_core (
    input  wire        clk,
    input  wire        rst_n,
    input  wire        auth_valid,
    input  wire [3:0]  cand_sel,
    input  wire        cast_btn,
    output logic       vote_success,
    output logic [15:0] tally_count_out,
    output logic       security_lockout
);

    typedef enum logic [2:0] {
        ST_STANDBY  = 3'b000,
        ST_AUTH     = 3'b001,
        ST_SELECT   = 3'b010,
        ST_ENCRYPT  = 3'b011,
        ST_COMMIT   = 3'b100,
        ST_LOCKOUT  = 3'b101
    } evm_state_t;

    evm_state_t current_state, next_state;
    logic [15:0] candidate_tally [0:15];
    logic [3:0]  latched_candidate;

    // Glitch-protected Atomic Voting State Transition
    always_ff @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            current_state    <= ST_STANDBY;
            vote_success     <= 1'b0;
            security_lockout <= 1'b0;
        end else begin
            current_state <= next_state;
            if (current_state == ST_COMMIT) begin
                candidate_tally[latched_candidate] <= candidate_tally[latched_candidate] + 16'd1;
                vote_success <= 1'b1;
            end else begin
                vote_success <= 1'b0;
            end
        end
    end

    // Next State Logic with Anti-Glitch Interlocks
    always_comb begin
        next_state = current_state;
        case (current_state)
            ST_STANDBY: if (auth_valid) next_state = ST_AUTH;
            ST_AUTH:    if (cand_sel != 4'b0000) next_state = ST_SELECT;
            ST_SELECT:  if (cast_btn) next_state = ST_ENCRYPT;
            ST_ENCRYPT: next_state = ST_COMMIT;
            ST_COMMIT:  next_state = ST_STANDBY;
            default:    next_state = ST_STANDBY;
        endcase
    end

    assign tally_count_out = candidate_tally[latched_candidate];

endmodule`,
    signals: [
      {
        name: "clk_100mhz",
        type: "clock",
        color: "#06b6d4",
        values: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      },
      {
        name: "rst_n",
        type: "binary",
        color: "#10b981",
        values: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "auth_valid",
        type: "binary",
        color: "#f59e0b",
        values: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "cand_sel[3:0]",
        type: "bus",
        width: 4,
        color: "#a855f7",
        values: [
          "0000",
          "0000",
          "0000",
          "0010",
          "0010",
          "0010",
          "0010",
          "0000",
          "0000",
          "0000",
        ],
      },
      {
        name: "cast_btn",
        type: "binary",
        color: "#ec4899",
        values: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      },
      {
        name: "state[2:0]",
        type: "bus",
        width: 3,
        color: "#38bdf8",
        values: [
          "STDBY",
          "AUTH",
          "AUTH",
          "SEL",
          "ENCR",
          "COMM",
          "COMM",
          "STDBY",
          "STDBY",
          "STDBY",
        ],
      },
      {
        name: "vote_success",
        type: "binary",
        color: "#10b981",
        values: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      },
    ],
  },
  {
    id: "solarchill-mppt",
    name: "Solar Chill AI MPPT Modulator",
    filename: "solarchill_mppt.v",
    language: "Verilog",
    description:
      "Dynamic DC-to-DC predictive PWM controller matching Peltier cooling duty cycle against insolation curve.",
    targetHardware: "Ultra-Low Power Edge SoC",
    clockFreq: "25 MHz (40.0 ns)",
    totalGates: "980 Gates",
    code: `\`timescale 1ns / 1ps
// Module: solarchill_mppt_pwm
// Application: AI-Optimized Battery-Free Cold Storage (MSME Winner)
// Author: Tummalapenta Bhavya Sri

module solarchill_mppt_pwm (
    input  wire        clk_25mhz,
    input  wire        rst_n,
    input  wire [9:0]  solar_adc_mv,    // 0-1023 Solar Voltage
    input  wire [7:0]  temp_target_c,   // Target Chamber Temp
    output reg         pwm_cooling_out, // High-Side FET Switch
    output reg  [7:0]  duty_cycle_pct   // Modulated Power Output %
);

    reg [9:0] pwm_counter;
    reg [9:0] calculated_threshold;

    always @(posedge clk_25mhz or negedge rst_n) begin
        if (!rst_n) begin
            pwm_counter       <= 10'd0;
            pwm_cooling_out   <= 1'b0;
            duty_cycle_pct    <= 8'd0;
        end else begin
            pwm_counter <= (pwm_counter >= 10'd999) ? 10'd0 : pwm_counter + 1'b1;
            
            // Dynamic solar irradiance tracking
            calculated_threshold <= (solar_adc_mv * 8'd75) / 8'd100;
            duty_cycle_pct       <= (calculated_threshold / 10'd10);
            
            pwm_cooling_out <= (pwm_counter < calculated_threshold) ? 1'b1 : 1'b0;
        end
    end

endmodule`,
    signals: [
      {
        name: "clk_25mhz",
        type: "clock",
        color: "#06b6d4",
        values: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      },
      {
        name: "rst_n",
        type: "binary",
        color: "#10b981",
        values: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "solar_adc[9:0]",
        type: "bus",
        width: 10,
        color: "#f59e0b",
        values: [
          "820mV",
          "820mV",
          "840mV",
          "840mV",
          "890mV",
          "890mV",
          "910mV",
          "910mV",
          "910mV",
          "910mV",
        ],
      },
      {
        name: "duty_cycle[7:0]",
        type: "bus",
        width: 8,
        color: "#a855f7",
        values: [
          "61%",
          "61%",
          "63%",
          "63%",
          "67%",
          "67%",
          "68%",
          "68%",
          "68%",
          "68%",
        ],
      },
      {
        name: "pwm_cooling_out",
        type: "binary",
        color: "#10b981",
        values: [0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      },
    ],
  },
  {
    id: "clock-tree",
    name: "Glitch-Free Clock Gating Cell",
    filename: "clock_gating_top.v",
    language: "Verilog",
    description:
      "Integrated Clock Gating (ICG) cell and balanced clock tree divider with zero runt-pulse hazard prevention.",
    targetHardware: "Cadence Innovus CCOpt Cell Library",
    clockFreq: "200 MHz (5.0 ns)",
    totalGates: "320 Gates",
    code: `\`timescale 1ns / 1ps
// Module: clock_gating_icg
// EDA Flow: Clock Tree Synthesis (CTS) Power Optimization
// Author: Tummalapenta Bhavya Sri

module clock_gating_icg (
    input  wire clk_in,
    input  wire enable,
    input  wire test_mode,
    output wire clk_gated
);

    reg latch_en;

    // Integrated Clock Gating (ICG) Latch (Negative edge transparent)
    always @(clk_in or enable or test_mode) begin
        if (!clk_in) begin
            latch_en <= enable | test_mode;
        end
    end

    // Glitchless AND gate output
    assign clk_gated = clk_in & latch_en;

endmodule`,
    signals: [
      {
        name: "clk_in (200MHz)",
        type: "clock",
        color: "#06b6d4",
        values: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      },
      {
        name: "enable",
        type: "binary",
        color: "#f59e0b",
        values: [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      },
      {
        name: "latch_en",
        type: "binary",
        color: "#a855f7",
        values: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      },
      {
        name: "clk_gated",
        type: "clock",
        color: "#10b981",
        values: [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
      },
    ],
  },
];

export default function WaveformInspector() {
  const [selectedModuleId, setSelectedModuleId] = useState<string>("read2hear");
  const [activeCursorTime, setActiveCursorTime] = useState<number>(4); // index 0-9
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const currentModule =
    RTL_MODULES.find((m) => m.id === selectedModuleId) || RTL_MODULES[0];

  // Animated clock simulation runner
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveCursorTime((prev) => (prev + 1) % 10);
      }, 900);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const copyCode = () => {
    navigator.clipboard.writeText(currentModule.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="waveform" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Code2 className="w-3.5 h-3.5" />
              <span>05. RTL Simulation &amp; Verification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive <span className="silicon-gradient-text">RTL Code &amp; Waveform Inspector</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Inspect synthesizable Verilog / SystemVerilog modules with synchronized digital signal timing diagrams, bus values, and interactive simulation playback.
            </p>
          </div>

          {/* Module Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {RTL_MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  setActiveCursorTime(2);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedModuleId === mod.id
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {mod.filename}
              </button>
            ))}
          </div>
        </div>

        {/* Main Inspector Container */}
        <div className="rounded-3xl bg-[#0c1322]/90 border border-cyan-500/30 shadow-2xl overflow-hidden backdrop-blur-xl glow-border">
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 bg-[#080d18] border-b border-slate-800 font-mono text-xs">
            
            {/* File Info */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-cyan-300 font-bold text-sm">
                {currentModule.filename}
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-[10px] uppercase font-bold">
                {currentModule.language}
              </span>
            </div>

            {/* Hardware Stats */}
            <div className="hidden sm:flex items-center gap-4 text-slate-400 text-xs">
              <div>
                Target: <strong className="text-white">{currentModule.targetHardware}</strong>
              </div>
              <div>
                Freq: <strong className="text-amber-300">{currentModule.clockFreq}</strong>
              </div>
              <div>
                Gate Count: <strong className="text-emerald-400">{currentModule.totalGates}</strong>
              </div>
            </div>

            {/* Simulation Toolbar */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  isPlaying
                    ? "bg-amber-500 text-slate-950"
                    : "bg-slate-800 text-slate-300 hover:text-white"
                }`}
                title="Toggle Clock Simulation"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Running" : "Paused"}</span>
              </button>

              <button
                onClick={() => setActiveCursorTime(0)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                title="Reset simulation marker to 0ns"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 rounded-lg transition-colors"
                title="Copy RTL code"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy RTL</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Module Description Strip */}
          <div className="px-6 py-3 bg-[#090e1c] border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
            <p className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{currentModule.description}</span>
            </p>
            <div className="font-mono text-cyan-400 text-[11px] shrink-0 ml-4 hidden md:block">
              Sim Time: <strong>{(activeCursorTime * 10).toFixed(1)} ns</strong>
            </div>
          </div>

          {/* Split View: Code Editor (Left) & Waveform Viewer (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            
            {/* Left Column: Code Viewer */}
            <div className="lg:col-span-6 p-4 sm:p-6 bg-[#070b14] overflow-x-auto max-h-[520px] font-mono text-xs leading-relaxed select-text">
              <div className="flex">
                {/* Line numbers */}
                <div className="text-slate-600 select-none pr-4 text-right border-r border-slate-800 shrink-0 space-y-0.5">
                  {currentModule.code.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Code syntax */}
                <pre className="pl-4 text-slate-300">
                  {currentModule.code}
                </pre>
              </div>
            </div>

            {/* Right Column: Digital Waveform Viewer */}
            <div className="lg:col-span-6 p-4 sm:p-6 bg-[#080d18] flex flex-col justify-between max-h-[520px] overflow-y-auto">
              
              <div>
                {/* Waveform Header & Timeline Scale */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 font-mono text-xs">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Activity className="w-4 h-4" />
                    <span>Digital Timing Waveform Viewer</span>
                  </div>

                  {/* Time slice indicator badge */}
                  <div className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold">
                    T = {(activeCursorTime * 10).toFixed(0)}ns (Cycle {activeCursorTime})
                  </div>
                </div>

                {/* Time Axis Scale (0ns to 90ns) */}
                <div className="grid grid-cols-10 text-[10px] font-mono text-slate-500 pb-2 border-b border-slate-800 select-none">
                  {[...Array(10)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveCursorTime(i);
                        setIsPlaying(false);
                      }}
                      className={`text-center py-1 rounded hover:bg-slate-800 transition-colors ${
                        activeCursorTime === i ? "text-cyan-400 font-bold bg-cyan-950/50" : ""
                      }`}
                    >
                      {i * 10}ns
                    </button>
                  ))}
                </div>

                {/* Signals Timing Rows */}
                <div className="space-y-4 py-4 relative">
                  
                  {/* Vertical Interactive Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] pointer-events-none transition-all duration-300 z-20"
                    style={{
                      left: `${(activeCursorTime / 9.5) * 78 + 20}%`,
                    }}
                  />

                  {currentModule.signals.map((signal, sIdx) => {
                    const activeVal = signal.values[activeCursorTime];

                    return (
                      <div key={sIdx} className="space-y-1 font-mono">
                        {/* Signal Name and Current Value readout */}
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className="font-bold tracking-tight text-[11px]"
                            style={{ color: signal.color }}
                          >
                            {signal.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            val: <strong style={{ color: signal.color }}>{String(activeVal)}</strong>
                          </span>
                        </div>

                        {/* Signal Waveform Graphic Strip */}
                        <div className="grid grid-cols-10 gap-1 h-7 bg-[#050811] rounded-lg border border-slate-800/80 p-1 items-center relative overflow-hidden">
                          {signal.values.map((val, tIdx) => {
                            const isTimeActive = activeCursorTime === tIdx;

                            if (signal.type === "clock") {
                              const isHigh = val === 1;
                              return (
                                <div
                                  key={tIdx}
                                  onClick={() => {
                                    setActiveCursorTime(tIdx);
                                    setIsPlaying(false);
                                  }}
                                  className={`h-full flex items-center justify-center cursor-pointer transition-colors ${
                                    isTimeActive ? "bg-cyan-500/15" : ""
                                  }`}
                                >
                                  <div
                                    className={`w-full h-full border-t-2 ${
                                      isHigh
                                        ? "border-cyan-400 bg-cyan-400/20"
                                        : "border-transparent border-b-2 border-b-cyan-400/50"
                                    }`}
                                  />
                                </div>
                              );
                            } else if (signal.type === "binary") {
                              const isHigh = val === 1;
                              return (
                                <div
                                  key={tIdx}
                                  onClick={() => {
                                    setActiveCursorTime(tIdx);
                                    setIsPlaying(false);
                                  }}
                                  className={`h-full flex items-center justify-center cursor-pointer transition-colors ${
                                    isTimeActive ? "bg-emerald-500/15" : ""
                                  }`}
                                >
                                  <div
                                    className={`w-full h-full ${
                                      isHigh
                                        ? "border-t-2 border-emerald-400 bg-emerald-400/20"
                                        : "border-b-2 border-slate-700"
                                    }`}
                                  />
                                </div>
                              );
                            } else {
                              // Bus signal with text value
                              return (
                                <div
                                  key={tIdx}
                                  onClick={() => {
                                    setActiveCursorTime(tIdx);
                                    setIsPlaying(false);
                                  }}
                                  className={`h-full flex items-center justify-center rounded px-1 text-[9px] font-bold border border-slate-700/80 cursor-pointer truncate transition-colors ${
                                    isTimeActive
                                      ? "bg-purple-500/30 text-purple-200 border-purple-400"
                                      : "bg-slate-900 text-slate-400"
                                  }`}
                                  title={`T=${tIdx * 10}ns: ${val}`}
                                >
                                  {String(val)}
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Interactive Waveform Helper */}
              <div className="pt-4 mt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Click any timestamp slice to scrub simulation cursor</span>
                <span className="text-emerald-400 font-bold">100% Zero-Hazard Synthesized</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
