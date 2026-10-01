"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Minimize2,
  Maximize2,
  Trash2,
  Cpu,
  User,
  ChevronRight,
  Zap,
} from "lucide-react";
import { certificatesList } from "@/data/certificates";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  chips?: { label: string; action: string }[];
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: "welcome-1",
      sender: "bot",
      text: `👋 Hello! I'm **SiliconBot**, Tummalapenta Bhavya Sri's AI Portfolio Assistant. 

I can answer questions about Bhavya's **VLSI Physical Design flow**, EDA toolsuites (Cadence Innovus/Genus, Vivado), **hardware projects**, industry traineeships, or contact details.

What would you like to know?`,
      timestamp: "Just now",
      chips: [
        { label: "🛠️ EDA Tools & Flows", action: "What EDA tools do you use?" },
        { label: "🚀 VLSI Projects", action: "Tell me about your VLSI projects." },
        { label: "💼 ChipXpert & NIELIT", action: "What is your experience at ChipXpert & NIELIT?" },
        { label: "📬 Contact Bhavya", action: "How can I contact Bhavya?" },
      ],
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Intelligent Response Generator
  const generateResponse = (query: string): { text: string; chips?: { label: string; action: string }[] } => {
    const q = query.toLowerCase();

    // 1. EDA Tools & Toolsuites
    if (
      q.includes("eda") ||
      q.includes("tool") ||
      q.includes("cadence") ||
      q.includes("innovus") ||
      q.includes("genus") ||
      q.includes("vivado") ||
      q.includes("modelsim") ||
      q.includes("tcl")
    ) {
      return {
        text: `🔧 **Bhavya's EDA & Backend Toolsuite Mastery:**

* **Cadence Innovus**: Place & Route (P&R), Floorplanning, Power Grid synthesis, CCOpt Clock Tree Synthesis, Timing Optimization & Signoff.
* **Cadence Genus**: Synthesis translation, SDC constraints mapping, and PPA optimization.
* **Xilinx Vivado**: FPGA implementation, timing closure, bitstream generation, and Vivado TCL automation scripts.
* **ModelSim / QuestaSim**: RTL simulation, gate-level verification, SDF timing back-annotation.
* **TCL & Python Scripting**: Custom automated EDA execution pipelines and timing report parsing.
* **Linux (IBM LinuxONE, Bash)**: Enterprise compute server environments and batch script workflows.`,
        chips: [
          { label: "📐 Physical Design Flow", action: "Tell me about the Physical Design flow." },
          { label: "📜 Certifications", action: "What certifications do you have in EDA tools?" },
        ],
      };
    }

    // 2. Physical Design Flow & STA
    if (
      q.includes("physical design") ||
      q.includes("pd") ||
      q.includes("sta") ||
      q.includes("floorplan") ||
      q.includes("cts") ||
      q.includes("routing") ||
      q.includes("drc") ||
      q.includes("lvs") ||
      q.includes("timing")
    ) {
      return {
        text: `⚡ **Physical Design (RTL-to-GDSII) Workflow:**

1. **Logic Synthesis (Genus/DC)**: Technology library mapping, zero unmapped logic signoff.
2. **Floorplanning & PDN**: Core aspect ratio, 70-75% utilization targets, SRAM macro halos, low-impedance VDD/VSS power grid mesh.
3. **Standard Cell Placement**: Congestion minimization and high-fanout net buffering.
4. **Clock Tree Synthesis (CTS - CCOpt)**: Skew target < 30ps, balanced latency, hold slack fixing.
5. **Global & Detailed Routing (NanoRoute)**: DRC-clean routing, crosstalk mitigation, antenna rule closure.
6. **STA Signoff (Tempus/Innovus)**: Multi-Corner Multi-Mode (MCMM) timing closure with positive setup/hold margins.
7. **Physical Verification**: 100% clean DRC, LVS, and ERC signoff before tapeout.`,
        chips: [
          { label: "🏆 View Projects", action: "Tell me about your VLSI projects." },
          { label: "📄 View Full CV", action: "Show me Bhavya's resume summary." },
        ],
      };
    }

    // 3. Projects
    if (
      q.includes("project") ||
      q.includes("read2hear") ||
      q.includes("voting") ||
      q.includes("echolume") ||
      q.includes("solar") ||
      q.includes("hackathon") ||
      q.includes("fpga")
    ) {
      return {
        text: `🚀 **Flagship Hardware & VLSI Projects:**

1. **READ2HEAR — Real-time Braille Radar with FPGA**
   * Verilog RTL synthesized on Xilinx Artix-7 FPGA. Converts ultrasonic radar distance returns into real-time tactile 6-dot Braille output for visual accessibility.

2. **SOLAR CHILL NANO — AI-Optimized Battery-Free Cold Storage**
   * 🏆 **National Winner @ MSME Hackathon 5.0**. Modulates DC thermoelectric cooling against real-time solar irradiance with phase-change thermal storage (72+ hours holding).

3. **Secure FPGA-based Voting Machine**
   * Cryptographically resilient electronic voting machine prototype with tamper-proof finite state machine logic and authenticated tallying.

4. **ECHOLUME — Ultrasonic Radar with Visual Display**
   * 180° sweep obstacle mapping radar with 60 FPS visual polar coordinate plotting.

5. **Anti-Vehicle Theft Detecting System**
   * Embedded IoT security system with 3-axis accelerometer tilt anomaly detection, GPS geolocation broadcasting, and remote SMS ignition lockouts.`,
        chips: [
          { label: "🎖️ National Awards", action: "What awards and honors has Bhavya won?" },
          { label: "🛠️ EDA Tools", action: "What EDA tools do you use?" },
        ],
      };
    }

    // 4. Experience & Internships
    if (
      q.includes("experience") ||
      q.includes("chipxpert") ||
      q.includes("nielit") ||
      q.includes("google") ||
      q.includes("ecell") ||
      q.includes("internship") ||
      q.includes("work") ||
      q.includes("role")
    ) {
      return {
        text: `💼 **Professional Traineeships & Experience:**

* 🏢 **ChipXpert — Physical Design Trainee** *(Jun 2026 – Present)*
  * Mastering physical implementation, floorplanning, placement, clock tree synthesis (CTS), routing, and STA timing closure on nanometer designs.

* 🏛️ **NIELIT & SoC Teamup Semiconductors — eChipHub Intern** *(Jun – Jul 2026)*
  * Ministry of Electronics and IT (MeitY) sponsored chip design program focusing on democratizing semiconductor SoC architecture and RTL-to-GDSII workflows.

* 🌐 **Google — Google Student Ambassador** *(Jun – Dec 2025)*
  * Led technical enablement, AI workshops, and developer community evangelism.

* 🚀 **E-Cell — Deputy Head** *(Apr – Oct 2026)*
  * Managed flagship tech entrepreneurship bootcamps and hardware startup showcases in partnership with IIT Bombay.`,
        chips: [
          { label: "📜 Certifications List", action: "What certifications have you earned?" },
          { label: "🎓 Education", action: "Where did Bhavya study?" },
        ],
      };
    }

    // 5. Certifications & Fellowships
    if (
      q.includes("certif") ||
      q.includes("fellowship") ||
      q.includes("samsung") ||
      q.includes("asem") ||
      q.includes("iswdp") ||
      q.includes("nptel") ||
      q.includes("ibm")
    ) {
      return {
        text: `📜 **Key Industry Certifications & Fellowships (${certificatesList.length}+ Total):**

* 🌟 **Samsung Fellowship (Grade II)** — India Semiconductor Workforce Development Program (ISWDP) & IISc Bangalore.
* 🌟 **Samsung ISWDP Level 1 & Level 2 Training** — Device Simulation & TCAD Scripting (90% score, 85th percentile).
* 🌟 **CHIP START 2.0** — Advanced Semiconductor Academy of Malaysia (ASEM) & Sidec IC Design Park.
* 🌟 **RTL-to-GDSII Master Certification (90 Hours)** — NIELIT MeitY.
* 🌟 **FPGA Flow & TCL Scripting** — Sense Academia.
* 🌟 **Enterprise Linux Systems** — IBM LinuxONE (Credly Verified).
* 🌟 **Digital Electronic Circuits (Elite)** — NPTEL / IIT Kharagpur (75% score).
* 🌟 **Soft Skill Development (Elite)** — NPTEL / IIT Kharagpur (83% score).`,
        chips: [
          { label: "🖼️ View Certificate Showcase", action: "Tell me about your VLSI projects." },
          { label: "📬 Contact Info", action: "How can I contact Bhavya?" },
        ],
      };
    }

    // 6. Awards & Honors
    if (
      q.includes("award") ||
      q.includes("honor") ||
      q.includes("hackathon") ||
      q.includes("prize") ||
      q.includes("msme") ||
      q.includes("imcest")
    ) {
      return {
        text: `🏆 **Major Awards & Recognitions:**

1. 🥇 **National Winner — MSME Hackathon 5.0** (Ministry of MSME, Govt. of India)
   * First prize for developing SOLAR CHILL NANO: AI-optimized, battery-free cold preservation architecture.

2. 🥇 **Winner — IMCEST International Conference & Competition**
   * Groundbreaking prototype demonstration in FPGA-driven assistive accessibility systems (READ2HEAR).

3. 🥇 **1st Prize — SARITAM-2K25 National Technical Quiz**
   * Rank 1 among hundreds of engineering participants across circuit theory and hardware systems.

4. 🏅 **Consolation Award — QISFEST 2025 National Theme-Expo [Reuse]**
   * Electronic hardware sustainability and circular engineering prototype.`,
        chips: [
          { label: "🚀 View Projects", action: "Tell me about your VLSI projects." },
          { label: "📬 Get in Touch", action: "How can I contact Bhavya?" },
        ],
      };
    }

    // 7. Education & Languages
    if (
      q.includes("education") ||
      q.includes("college") ||
      q.includes("degree") ||
      q.includes("university") ||
      q.includes("language") ||
      q.includes("telugu") ||
      q.includes("english")
    ) {
      return {
        text: `🎓 **Academic Background & Languages:**

* **B.Tech in Electronics, Electrical & VLSI Technology** *(2023 – 2027)*
  * QIS College of Engineering & Technology (Pursuing with Distinction).
  * Key Coursework: VLSI Physical Design, CMOS Circuits, STLD, Microprocessors, STA & Scripting.

* **Intermediate (Class XII - MPC)** *(Completed 2023)*
  * Kendriya Vidyalaya (75%).

🗣️ **Spoken Languages:**
* Telugu (Fluent)
* English (Fluent)
* Hindi (Intermediate)
* German (Beginner)`,
        chips: [
          { label: "💼 View Traineeships", action: "What is your experience at ChipXpert & NIELIT?" },
          { label: "📬 Contact Bhavya", action: "How can I contact Bhavya?" },
        ],
      };
    }

    // 8. Contact
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("hire") ||
      q.includes("linkedin") ||
      q.includes("reach") ||
      q.includes("phone")
    ) {
      return {
        text: `📬 **Contact & Connect with Tummalapenta Bhavya Sri:**

* 📧 **Email**: [bhavya9133sri@gmail.com](mailto:bhavya9133sri@gmail.com)
* 💼 **LinkedIn**: [linkedin.com/in/bhavya-sri-7b5646291](https://linkedin.com/in/bhavya-sri-7b5646291)
* 🐙 **GitHub**: [github.com/bab1904/bhavya-sri-portfolio](https://github.com/bab1904/bhavya-sri-portfolio)
* 📍 **Location**: India (Open to on-site, hybrid, and global relocation opportunities).

Feel free to send a message through the contact form at the bottom of this page!`,
        chips: [
          { label: "📄 View Resume", action: "Show me Bhavya's resume summary." },
          { label: "🛠️ EDA Tools", action: "What EDA tools do you use?" },
        ],
      };
    }

    // Default fallback response
    return {
      text: `Thanks for asking! I'm trained on all of Tummalapenta Bhavya Sri's professional background. 

You can ask me about:
* **Physical Design**: Logic Synthesis, Floorplanning, CTS, Routing, STA timing closure.
* **EDA Toolsuites**: Cadence Innovus, Genus, Vivado, ModelSim, TCL scripting.
* **Hardware Projects**: READ2HEAR Braille Radar, SOLAR CHILL NANO (MSME Winner), FPGA Voting Machine.
* **Certifications**: Samsung ISWDP Fellowship, NIELIT MeitY 90-hr RTL-to-GDS, IBM LinuxONE.
* **Contact & Hire**: Direct email and LinkedIn links.`,
      chips: [
        { label: "🛠️ EDA Tools", action: "What EDA tools do you use?" },
        { label: "🚀 VLSI Projects", action: "Tell me about your VLSI projects." },
        { label: "💼 Traineeships", action: "What is your experience at ChipXpert & NIELIT?" },
        { label: "📬 Contact Info", action: "How can I contact Bhavya?" },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Realistic typing delay (400 - 800ms)
    setTimeout(() => {
      const { text, chips } = generateResponse(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text,
        timestamp: "Just now",
        chips,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* Floating Bottom-Right Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-500 via-cyan-400 to-emerald-400 text-slate-950 font-bold shadow-[0_10px_30px_rgba(6,182,212,0.5)] border border-cyan-300 flex items-center gap-3 group cursor-pointer"
              aria-label="Open AI Portfolio Assistant"
            >
              <div className="relative">
                <Bot className="w-6 h-6 text-slate-950 animate-bounce" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                </span>
              </div>
              <span className="font-mono text-xs hidden sm:inline tracking-tight font-extrabold pr-1">
                Ask AI Assistant
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={`fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col bg-[#0c1322] border border-cyan-500/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-2xl transition-all duration-300 ${
              isExpanded
                ? "w-[92vw] sm:w-[620px] h-[85vh] max-h-[750px]"
                : "w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh]"
            }`}
          >
            {/* Header */}
            <div className="px-5 py-3.5 bg-[#080d18] border-b border-slate-800/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-mono">SiliconBot</h3>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                      AI 2.0
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Bhavya&apos;s Portfolio Context
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-1.5 text-slate-400 hover:text-amber-300 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Reset conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors hidden sm:block"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips Header */}
            <div className="px-4 py-2 bg-[#090e1b] border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest shrink-0 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Prompts:
              </span>
              {[
                "What EDA tools do you use?",
                "Tell me about your VLSI projects.",
                "What is your experience at ChipXpert & NIELIT?",
                "How can I contact Bhavya?",
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-[11px] font-mono text-slate-300 hover:text-cyan-200 transition-all whitespace-nowrap shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                        : "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-cyan-600 to-cyan-700 text-white rounded-tr-xs font-medium"
                        : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-xs"
                    }`}
                  >
                    <div>{msg.text}</div>

                    {/* Interactive Sub-Chips */}
                    {msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800">
                        {msg.chips.map((chip, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => handleSendMessage(chip.action)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono hover:text-white transition-colors"
                          >
                            <span>{chip.label}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing animation bubble */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <Bot className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#080d18] border-t border-slate-800/90">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask about EDA tools, projects, STA, experience..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 text-xs sm:text-sm font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-colors shadow-inner"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="absolute right-1.5 p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-30 disabled:hover:bg-cyan-500 transition-all cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1.5 px-1">
                <span>Tummalapenta Bhavya Sri • Physical Design Trainee</span>
                <span className="text-cyan-400">Press Enter ↵</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
