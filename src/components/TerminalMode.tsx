"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
  Activity,
  Award,
  Send,
  ArrowRight,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { certificatesList } from "@/data/certificates";

interface TerminalModeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
  isError?: boolean;
}

const QUICK_COMMANDS = [
  "help",
  "ls",
  "cat summary.txt",
  "check_sta",
  "view_skills",
  "projects",
  "certs",
  "contact",
  "clear",
  "exit",
];

export default function TerminalMode({
  isOpen,
  onClose,
  onOpenResume,
}: TerminalModeProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && history.length === 0) {
      const welcomeItem: CommandHistoryItem = {
        id: "welcome",
        command: "welcome",
        timestamp: new Date().toLocaleTimeString(),
        output: (
          <div className="space-y-3 font-mono text-xs text-slate-300">
            <div className="text-cyan-400 font-bold leading-tight">
              {`
   ██████╗ ██╗  ██╗ █████╗ ██╗   ██╗██╗   ██╗ █████╗     ███████╗██████╗ ██╗
   ██╔══██╗██║  ██║██╔══██╗██║   ██║╚██╗ ██╔╝██╔══██╗    ██╔════╝██╔══██╗██║
   ██████╔╝███████║███████║██║   ██║ ╚████╔╝ ███████║    ███████╗██████╔╝██║
   ██╔══██╗██╔══██║██╔══██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║    ╚════██║██╔══██╗██║
   ██████╔╝██║  ██║██║  ██║ ╚████╔╝    ██║   ██║  ██║    ███████║██║  ██║██║
   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝
              `}
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-cyan-200">
              <span className="font-bold text-cyan-300">
                Silicon EDA Interactive Workstation v4.2.0-LTS
              </span>{" "}
              (x86_64-eda-linux)
              <br />
              Logged in as:{" "}
              <span className="text-emerald-400 font-bold">bhavya_sri</span>{" "}
              (Physical Design Trainee @ ChipXpert)
              <br />
              Type <span className="text-amber-400 font-bold">&apos;help&apos;</span> to
              display available commands or click the shortcut chips below.
            </div>
          </div>
        ),
      };
      setHistory([welcomeItem]);
    }
  }, [isOpen, history.length]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to raw history list
    setCommandHistoryList((prev) => [...prev, cmd]);
    setHistoryIdx(null);

    const lower = cmd.toLowerCase();
    const parts = lower.split(" ");
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(" ");

    let outputNode: React.ReactNode = null;
    let isErr = false;

    switch (mainCmd) {
      case "help":
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-amber-400 font-bold">
              Available Silicon Shell Commands:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-slate-300">
              <div>
                <span className="text-cyan-400 font-bold">ls</span> /{" "}
                <span className="text-cyan-400 font-bold">dir</span>
                <span className="text-slate-500"> - List virtual files & modules</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">cat &lt;file&gt;</span>
                <span className="text-slate-500"> - Read file (e.g. summary.txt)</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">check_sta</span> /{" "}
                <span className="text-cyan-400 font-bold">sta</span>
                <span className="text-slate-500"> - Run Cadence Tempus STA check</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">view_skills</span> /{" "}
                <span className="text-cyan-400 font-bold">skills</span>
                <span className="text-slate-500"> - Matrix of EDA, PD & HDL skills</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">projects</span>
                <span className="text-slate-500"> - List all VLSI & FPGA projects</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">certs</span>
                <span className="text-slate-500"> - List 16+ verified certifications</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">experience</span>
                <span className="text-slate-500"> - Traineeships & leadership history</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">contact</span>
                <span className="text-slate-500"> - View email, LinkedIn & socials</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">resume</span>
                <span className="text-slate-500"> - Open full curriculum vitae</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">whoami</span> /{" "}
                <span className="text-cyan-400 font-bold">uname -a</span>
                <span className="text-slate-500"> - System & engineer identity</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">clear</span>
                <span className="text-slate-500"> - Reset terminal window</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">exit</span> /{" "}
                <span className="text-cyan-400 font-bold">gui</span>
                <span className="text-slate-500"> - Return to standard GUI mode</span>
              </div>
            </div>
          </div>
        );
        break;

      case "ls":
      case "dir":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="text-slate-500">-rwxr-xr-x</span>
                <span>summary.txt</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <span className="text-slate-500">-rw-r--r--</span>
                <span>skills.v</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <span className="text-slate-500">-rw-r--r--</span>
                <span>sta_report.rpt</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-400">
                <span className="text-slate-500">drwxr-xr-x</span>
                <span>projects/</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-400">
                <span className="text-slate-500">drwxr-xr-x</span>
                <span>certificates/</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="text-slate-500">-rw-r--r--</span>
                <span>experience.log</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <span className="text-slate-500">-rw-r--r--</span>
                <span>contact.json</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <span className="text-slate-500">-rw-r--r--</span>
                <span>resume.pdf</span>
              </div>
            </div>
          </div>
        );
        break;

      case "cat":
        if (!arg) {
          isErr = true;
          outputNode = (
            <p className="text-red-400 font-mono text-xs">
              Usage: cat &lt;filename&gt; (e.g., cat summary.txt, cat skills.v, cat contact.json)
            </p>
          );
        } else if (arg === "summary.txt" || arg === "bio.txt" || arg === "about.txt") {
          outputNode = (
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs font-mono space-y-2 text-slate-300">
              <p className="text-cyan-300 font-bold">
                === Tummalapenta Bhavya Sri — Executive Summary ===
              </p>
              <p className="leading-relaxed">
                {portfolioData.personal.aboutSummary}
              </p>
              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400">
                <div>Role: <span className="text-white">Physical Design Trainee</span></div>
                <div>Company: <span className="text-cyan-400">ChipXpert</span></div>
                <div>Location: <span className="text-white">Bengaluru, India</span></div>
                <div>Status: <span className="text-emerald-400">Available</span></div>
              </div>
            </div>
          );
        } else if (arg === "skills.v") {
          outputNode = (
            <div className="p-3 bg-[#070b14] border border-cyan-500/30 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto">
              <pre className="text-slate-300">
                <span className="text-slate-500">{`// Verilog Module: Tummalapenta Bhavya Sri Skill Architecture`}</span>{"\n"}
                <span className="text-purple-400">module</span> <span className="text-cyan-300">bhavya_sri_skills</span> #({" \n"}
                {"  "}parameter <span className="text-amber-300">EDA_TOOLS</span> = <span className="text-emerald-400">&quot;Cadence Innovus, Genus, Tempus, Xilinx Vivado, ModelSim&quot;</span>,{"\n"}
                {"  "}parameter <span className="text-amber-300">PD_FLOW</span> = <span className="text-emerald-400">&quot;Floorplanning, Placement, CTS (CCOpt), NanoRoute, STA Signoff, DRC/LVS&quot;</span>,{"\n"}
                {"  "}parameter <span className="text-amber-300">HDL_LANGUAGES</span> = <span className="text-emerald-400">&quot;Verilog HDL, SystemVerilog, VHDL, SDC&quot;</span>,{"\n"}
                {"  "}parameter <span className="text-amber-300">AUTOMATION</span> = <span className="text-emerald-400">&quot;TCL EDA Scripting, Python, Linux Shell (Bash)&quot;</span>{"\n"}
                ) ({"\n"}
                {"  "}input wire <span className="text-cyan-400">clk_50mhz</span>,{"\n"}
                {"  "}input wire <span className="text-cyan-400">rst_n</span>,{"\n"}
                {"  "}output wire [<span className="text-amber-300">31:0</span>] <span className="text-emerald-400">timing_slack_ps</span>,{"\n"}
                {"  "}output wire <span className="text-emerald-400">signoff_clean</span>{"\n"}
                );{"\n"}
                {"  "}assign <span className="text-emerald-400">timing_slack_ps</span> = <span className="text-amber-300">32&apos;d420</span>; <span className="text-slate-500">{`// +0.420ns Setup WNS`}</span>{"\n"}
                {"  "}assign <span className="text-emerald-400">signoff_clean</span> = <span className="text-amber-300">1&apos;b1</span>;{"\n"}
                <span className="text-purple-400">endmodule</span>
              </pre>
            </div>
          );
        } else if (arg === "contact.json") {
          outputNode = (
            <div className="p-3 bg-[#070b14] border border-cyan-500/30 rounded-lg text-xs font-mono text-slate-300">
              <pre className="text-cyan-300">
{`{
  "name": "Tummalapenta Bhavya Sri",
  "email": "bhavya9133sri@gmail.com",
  "role": "VLSI Physical Design (PD) Engineer",
  "linkedin": "https://linkedin.com/in/bhavya-sri-7b5646291",
  "github": "https://github.com/bab1904/bhavya-sri-portfolio",
  "languages": ["Telugu (Fluent)", "English (Fluent)", "Hindi (Intermediate)", "German (Beginner)"]
}`}
              </pre>
            </div>
          );
        } else if (arg === "sta_report.rpt") {
          outputNode = (
            <div className="p-3 bg-[#070b14] border border-emerald-500/40 rounded-lg text-xs font-mono text-emerald-300 space-y-1">
              <p className="text-white font-bold">
                Cadence Tempus Timing Signoff Report
              </p>
              <p>Corner: ss_0.72v_125c (Worst Setup)</p>
              <p>Worst Negative Slack (WNS): +0.420 ns [MET]</p>
              <p>Total Negative Slack (TNS): 0.00 ps [MET]</p>
              <p>Worst Hold Slack (WHS): +0.085 ns [MET]</p>
              <p>Clock Skew: 28.4 ps [PASS &lt; 30ps]</p>
              <p>Design Rule Violations (DRC): 0 Clean</p>
            </div>
          );
        } else if (arg === "resume.pdf" || arg === "resume.txt") {
          onOpenResume?.();
          outputNode = (
            <p className="text-cyan-300 font-mono text-xs">
              Opening full curriculum vitae modal viewer...
            </p>
          );
        } else {
          isErr = true;
          outputNode = (
            <p className="text-red-400 font-mono text-xs">
              cat: {arg}: No such file or directory. Try &apos;ls&apos; to view available files.
            </p>
          );
        }
        break;

      case "check_sta":
      case "sta":
        outputNode = (
          <div className="space-y-2 p-3.5 bg-[#060a12] border border-cyan-500/40 rounded-xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Running Cadence Tempus / PrimeTime STA Signoff Engine...</span>
              </div>
              <span className="text-emerald-400 font-bold px-2 py-0.5 bg-emerald-950/60 rounded border border-emerald-500/40">
                100% CLEAN
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-300">
              <div className="space-y-1">
                <div className="text-slate-400">Target Clock Domain:</div>
                <div className="text-white font-bold">clk_core @ 100MHz (10.00ns period)</div>
                <div className="text-slate-400 pt-1">Setup Timing Slack (WNS):</div>
                <div className="text-emerald-400 font-bold">+0.420 ns (Margin: +4.2%)</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-400">Hold Timing Slack (WHS):</div>
                <div className="text-emerald-400 font-bold">+0.085 ns (Clean)</div>
                <div className="text-slate-400 pt-1">Total Negative Slack (TNS):</div>
                <div className="text-emerald-400 font-bold">0.00 ps (Zero Violations)</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span className="text-slate-400 block">Clock Skew</span>
                <span className="text-cyan-300 font-bold">28.4 ps</span>
              </div>
              <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span className="text-slate-400 block">Insertion Delay</span>
                <span className="text-amber-300 font-bold">420 ps</span>
              </div>
              <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                <span className="text-slate-400 block">DRC Violations</span>
                <span className="text-emerald-400 font-bold">0 Clean</span>
              </div>
            </div>
          </div>
        );
        break;

      case "view_skills":
      case "skills":
        outputNode = (
          <div className="space-y-3 font-mono text-xs">
            <p className="text-cyan-400 font-bold">
              === Mastered Engineering & Physical Design Matrix ===
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {portfolioData.skillCategories.map((cat, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#080d18] border border-slate-800 rounded-xl space-y-1.5"
                >
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cat.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((sk, j) => (
                      <span
                        key={j}
                        className="px-1.5 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-700 text-[10px]"
                      >
                        {sk.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
      case "view_projects":
        outputNode = (
          <div className="space-y-3 font-mono text-xs">
            <p className="text-cyan-400 font-bold">
              === VLSI, FPGA & Embedded Projects (5 Synthesized Implementations) ===
            </p>
            <div className="space-y-2">
              {portfolioData.projects.map((proj, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">
                      0{i + 1}. {proj.title}
                    </span>
                    <span className="text-cyan-400 text-[10px] px-2 py-0.5 bg-cyan-950/60 rounded border border-cyan-500/30">
                      {proj.domainTag}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">{proj.summary}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-amber-300 pt-1">
                    {proj.metrics?.map((m, idx) => (
                      <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded">
                        {m.label}: <strong className="text-emerald-400">{m.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "certs":
      case "view_certs":
        outputNode = (
          <div className="space-y-2 font-mono text-xs">
            <p className="text-cyan-400 font-bold">
              === Verified Industry Certifications (16+ Credentials) ===
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certificatesList.slice(0, 10).map((c) => (
                <div
                  key={c.id}
                  className="p-2 bg-slate-900/80 border border-slate-800 rounded-lg flex items-start gap-2"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-[11px]">{c.title}</div>
                    <div className="text-slate-400 text-[10px]">{c.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-[10px] pt-1">
              ...plus 6 additional certifications. Switch to GUI view or check Certifications section for full interactive gallery.
            </p>
          </div>
        );
        break;

      case "experience":
      case "exp":
        outputNode = (
          <div className="space-y-2 font-mono text-xs">
            <p className="text-cyan-400 font-bold">
              === Professional Experience & Traineeships ===
            </p>
            {portfolioData.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg space-y-1"
              >
                <div className="flex justify-between items-center text-white font-bold">
                  <span>{exp.role} @ {exp.company}</span>
                  <span className="text-cyan-400 text-[10px]">{exp.period}</span>
                </div>
                <p className="text-slate-400 text-[11px]">{exp.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="p-3 bg-slate-900/90 border border-cyan-500/40 rounded-xl space-y-2 font-mono text-xs">
            <p className="text-cyan-300 font-bold">
              === Direct Contact & Connectivity ===
            </p>
            <div className="space-y-1 text-slate-300">
              <p>Email: <a href="mailto:bhavya9133sri@gmail.com" className="text-cyan-400 underline">bhavya9133sri@gmail.com</a></p>
              <p>LinkedIn: <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{portfolioData.personal.linkedin}</a></p>
              <p>GitHub: <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{portfolioData.personal.github}</a></p>
            </div>
          </div>
        );
        break;

      case "resume":
      case "cv":
        onOpenResume?.();
        outputNode = (
          <p className="text-cyan-300 font-mono text-xs">
            Opening full Curriculum Vitae modal...
          </p>
        );
        break;

      case "whoami":
        outputNode = (
          <p className="text-emerald-400 font-mono text-xs">
            bhavya_sri - Physical Design Trainee @ ChipXpert | RTL &amp; FPGA Engineer (India)
          </p>
        );
        break;

      case "uname":
        outputNode = (
          <p className="text-slate-300 font-mono text-xs">
            Linux silicon-eda-node 5.15.0-89-generic #99-Ubuntu SMP x86_64 GNU/Linux (EDA Workstation)
          </p>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
      case "gui":
      case "quit":
        onClose();
        return;

      default:
        isErr = true;
        outputNode = (
          <p className="text-red-400 font-mono text-xs">
            bash: {cmd}: command not found. Type &apos;help&apos; to view available commands.
          </p>
        );
        break;
    }

    const newItem: CommandHistoryItem = {
      id: Math.random().toString(36).substring(7),
      command: cmd,
      output: outputNode,
      timestamp: new Date().toLocaleTimeString(),
      isError: isErr,
    };

    setHistory((prev) => [...prev, newItem]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistoryList.length === 0) return;
      const nextIdx =
        historyIdx === null
          ? commandHistoryList.length - 1
          : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(commandHistoryList[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < commandHistoryList.length) {
        setHistoryIdx(nextIdx);
        setInputVal(commandHistoryList[nextIdx]);
      } else {
        setHistoryIdx(null);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      const match = QUICK_COMMANDS.find((cmd) => cmd.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full ${
          isMaximized ? "h-full max-w-full" : "max-w-4xl h-[85vh]"
        } bg-[#070b14] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col overflow-hidden transition-all duration-300 font-mono`}
      >
        {/* CRT Scanline and Silicon Glow Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#06b6d4_0.5px,transparent_0.5px)] [background-size:12px_12px] opacity-10" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a101f] border-b border-cyan-500/30 select-none z-10">
          <div className="flex items-center gap-3">
            {/* Mac/Linux traffic light buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group"
                title="Close terminal"
              >
                <X className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors flex items-center justify-center group"
                title="Toggle maximize"
              >
                {isMaximized ? (
                  <Minimize2 className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
                ) : (
                  <Maximize2 className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
                )}
              </button>
              <button
                onClick={() => setHistory([])}
                className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors flex items-center justify-center group"
                title="Clear terminal buffer"
              >
                <RotateCcw className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span>bhavya@silicon-eda-node:~ (bash interactive mode)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <span>Back to GUI</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#080d18] border-b border-slate-800/80 overflow-x-auto text-[11px] text-slate-400 select-none z-10 shrink-0">
          <span className="text-slate-500 text-[10px] uppercase font-bold shrink-0">
            Quick Cmds:
          </span>
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 bg-slate-900/90 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 rounded border border-slate-800 hover:border-cyan-500/40 transition-colors shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono z-10">
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5 animate-in fade-in duration-150">
              {item.command !== "welcome" && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">
                    bhavya@silicon-node:~$
                  </span>
                  <span className="text-cyan-300 font-bold">{item.command}</span>
                  <span className="text-slate-600 text-[10px] ml-auto">
                    {item.timestamp}
                  </span>
                </div>
              )}
              <div className="pl-0">{item.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Prompt Input Bar */}
        <div className="p-3 bg-[#0a101f] border-t border-cyan-500/30 flex items-center gap-2 z-10">
          <span className="text-emerald-400 font-bold text-xs shrink-0">
            bhavya@silicon-node:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'check_sta', 'view_skills', 'ls', 'cat summary.txt')..."
            className="flex-1 bg-transparent text-cyan-300 placeholder-slate-600 text-xs font-mono focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg transition-colors"
            title="Execute command"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
