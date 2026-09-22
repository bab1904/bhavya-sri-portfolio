export interface Project {
  id: string;
  title: string;
  category: "VLSI & Physical Design" | "Embedded & Edge Systems" | "Hardware Security";
  domainTag: string;
  summary: string;
  description: string;
  fullDetails?: {
    overview: string;
    architecture: string[];
    technicalHighlights: string[];
    hardwareStack: string[];
    edaTools: string[];
    outcomes: string[];
  };
  tags: string[];
  tools: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  isCurrent?: boolean;
  type: "Internship" | "Traineeship" | "Leadership" | "Ambassadorship";
  description: string;
  keyResponsibilities: string[];
  technologies: string[];
  badgeColor?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: "Physical Design & VLSI" | "EDA Toolsuites" | "Software & Linux" | "Core Engineering";
  issueDate?: string;
  credentialUrl?: string;
  skills: string[];
  featured?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
  location: string;
  coursework: string[];
  highlights?: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  color: "cyan" | "amber" | "emerald" | "purple";
  skills: {
    name: string;
    level: "Mastery" | "Proficient" | "Familiar" | "Advanced";
    note?: string;
  }[];
}

export interface PDStage {
  step: number;
  name: string;
  shortCode: string;
  description: string;
  toolExample: string;
  inputs: string[];
  outputs: string[];
  keyChecks: string[];
}

export const portfolioData = {
  personal: {
    name: "Thummalapenta Bhavya Sri",
    title: "VLSI Physical Design (PD) Engineer",
    roleTag: "Physical Design Trainee @ ChipXpert | VLSI Physical Design Specialist",
    subheadline:
      "Specializing in Physical Design, Floorplanning, Power Distribution Networks (PDN), Standard Cell Placement, Clock Tree Synthesis (CTS), Routing, Static Timing Analysis (STA), and Physical Verification (DRC/LVS) using industry-standard EDA tooling.",
    aboutSummary:
      "Dedicated B.Tech student in Electronics, Electrical & VLSI Technology specializing in semiconductor Physical Design and VLSI implementation. Highly proficient across the complete Physical Design flow: logic synthesis, die floorplanning, power grid design, standard cell placement, clock tree synthesis (CTS), global & detailed routing, static timing analysis (STA), and physical verification (DRC/LVS/ERC). Experienced with industry EDA toolsuites including Cadence Innovus, Cadence Genus, ModelSim, Xilinx Vivado, Linux environments, and TCL automation scripting. Proven track record through hands-on physical design traineeships, MeitY semiconductor programs, and national hackathon championships.",
    email: "bhavya9133sri@gmail.com",
    location: "India",
    linkedin: "https://linkedin.com/in/bhavya-sri-7b5646291",
    github: "https://github.com/bab1904/bhavya-sri-portfolio",
    languages: [
      { name: "Telugu", proficiency: "Native" },
      { name: "English", proficiency: "Fluent / Professional" },
      { name: "Hindi", proficiency: "Fluent" },
      { name: "German", proficiency: "Intermediate" },
    ],
    statusBadge: "Available for VLSI Physical Design (PD) Engineer Roles",
  },

  metrics: [
    {
      id: "projects",
      value: 9,
      suffix: "+",
      label: "VLSI & Hardware Projects",
      sublabel: "Synthesized, Simulated & Implemented",
      icon: "Cpu",
    },
    {
      id: "certifications",
      value: 16,
      suffix: "+",
      label: "Industry Certifications",
      sublabel: "Global Semis, NIELIT & Academies",
      icon: "Award",
    },
    {
      id: "tools",
      value: 4,
      suffix: "+",
      label: "Industry EDA Suites Mastered",
      sublabel: "Cadence Innovus, Genus, Vivado, ModelSim",
      icon: "Wrench",
    },
    {
      id: "hackathons",
      value: 2,
      suffix: "x",
      label: "National Hackathon Winner",
      sublabel: "MSME Hackathon 5.0 & IMCEST",
      icon: "Trophy",
    },
  ],

  skillCategories: [
    {
      title: "ASIC Physical Design & Signoff",
      description: "Core physical implementation, standard cell placement, clock distribution, routing, and timing signoff closure.",
      iconName: "Layers",
      color: "cyan",
      skills: [
        { name: "Floorplanning & PDN", level: "Mastery", note: "Die sizing, core aspect ratio, macro placement & power rings/stripes" },
        { name: "Clock Tree Synthesis (CTS)", level: "Mastery", note: "CCOpt, skew minimization, latency balancing, clock gating" },
        { name: "Standard Cell Placement", level: "Mastery", note: "Global/Detail placement, density optimization, congestion mitigation" },
        { name: "Global & Detailed Routing", level: "Proficient", note: "NanoRoute, DRC clean routing, crosstalk avoidance, antenna rules" },
        { name: "Static Timing Analysis (STA)", level: "Mastery", note: "Setup/Hold closure, MCMM corners, OCV/AOCV, WNS/TNS optimization" },
        { name: "Physical Verification", level: "Proficient", note: "DRC, LVS, ERC, Antenna violation fixes & signoff" },
        { name: "ECO Timing Closure", level: "Proficient", note: "Functional & timing Engineering Change Orders (ECO)" },
        { name: "Power Analysis & IR-Drop", level: "Proficient", note: "Dynamic & static IR-drop mitigation, power rail integrity" },
      ],
    },
    {
      title: "EDA & Backend Toolsuites",
      description: "Industry-standard electronic design automation suites and backend simulation tooling.",
      iconName: "Binary",
      color: "amber",
      skills: [
        { name: "Cadence Innovus", level: "Mastery", note: "Place & Route, Floorplanning, CTS, Optimization & Signoff" },
        { name: "Cadence Genus", level: "Proficient", note: "Logic Synthesis, SDC Constraints, Area/Power Optimization" },
        { name: "Cadence Tempus / Virtuoso", level: "Familiar", note: "Timing signoff & custom IC layout overview" },
        { name: "TCL Scripting for EDA", level: "Mastery", note: "Automating Innovus P&R scripts, flow constraints & report parsing" },
        { name: "ModelSim / QuestaSim", level: "Mastery", note: "Gate-level netlist simulation, SDF timing back-annotation" },
        { name: "Xilinx Vivado", level: "Mastery", note: "FPGA Place & Route, timing constraints, bitstream generation" },
        { name: "Synopsys Design Constraints (SDC)", level: "Mastery", note: "Clock definitions, input/output delays, false/multicycle paths" },
      ],
    },
    {
      title: "HDL & Digital Logic Foundations",
      description: "Underlying digital logic, synthesizable netlists, and functional verification essentials.",
      iconName: "Code2",
      color: "purple",
      skills: [
        { name: "Verilog HDL", level: "Mastery", note: "Synthesizable structures, FSMs, synchronous logic" },
        { name: "SystemVerilog", level: "Proficient", note: "Design constructs, assertions, testbenches" },
        { name: "Gate-Level Netlists", level: "Mastery", note: "Synthesis translation, unmapped logic debugging" },
        { name: "Digital Logic & STLD", level: "Mastery", note: "Boolean minimization, combinational & sequential timing" },
        { name: "VHDL", level: "Proficient", note: "Structural & behavioral models" },
        { name: "Functional Verification", level: "Proficient", note: "Testbench design, waveform analysis, corner-case testing" },
      ],
    },
    {
      title: "Scripting, Linux & Engineering Systems",
      description: "EDA automation scripting, enterprise Linux administration, and collaborative engineering workflows.",
      iconName: "Terminal",
      color: "emerald",
      skills: [
        { name: "Linux (IBM LinuxONE, Bash)", level: "Mastery", note: "Enterprise shell scripting, process scheduling, environment configuration" },
        { name: "Python for EDA", level: "Proficient", note: "Log parsing, timing report extraction, automated regression tests" },
        { name: "C Programming", level: "Proficient", note: "Embedded systems, algorithmic structures" },
        { name: "Git Version Control", level: "Proficient", note: "Repository tracking, configuration management" },
        { name: "Make / Flow Automation", level: "Proficient", note: "Custom automated execution pipelines for EDA runs" },
      ],
    },
  ] as SkillCategory[],

  physicalDesignFlow: [
    {
      step: 1,
      name: "Logic Synthesis & Constraints",
      shortCode: "SYNTH",
      description: "Translating digital designs into technology-mapped standard cells using target .lib timing libraries and SDC constraints, optimizing for Power, Performance, and Area (PPA).",
      toolExample: "Cadence Genus / Synopsys DC",
      inputs: ["Synthesizable Code", "SDC Timing Constraints", "Standard Cell Timing Library (.lib)"],
      outputs: ["Gate-Level Netlist (.v)", "SDC Signoff Constraints", "Area & Power Reports"],
      keyChecks: ["Zero Unmapped Logic", "Setup Slack Margin", "Library Cell Compliance"],
    },
    {
      step: 2,
      name: "Floorplanning & Power Grid",
      shortCode: "FP / PDN",
      description: "Establishing chip core aspect ratio, die sizing, I/O pad ring assignments, macro placement with guard rings/halos, and constructing low-impedance VDD/VSS power meshes.",
      toolExample: "Cadence Innovus",
      inputs: ["Gate-Level Netlist", "Tech & Macro LEF Files", "Design Constraints"],
      outputs: ["Floorplan DEF", "Power Grid Mesh (VDD/VSS)", "Macro Placement DEF"],
      keyChecks: ["Core Utilization Target (70-75%)", "Macro Channel Clearances", "IR-Drop Prevention"],
    },
    {
      step: 3,
      name: "Standard Cell Placement",
      shortCode: "PLACE",
      description: "Optimally placing hundreds of thousands of standard logic cells across core rows to minimize total net wirelength, mitigate routing congestion, and balance density.",
      toolExample: "Cadence Innovus",
      inputs: ["Floorplan DEF", "Synthesized Netlist", "Timing Models"],
      outputs: ["Placed DEF", "Global Routing Congestion Maps", "Pre-CTS Timing Slack"],
      keyChecks: ["Cell Density Uniformity", "Congestion Hotspots Avoided", "High-Fanout Net Buffering"],
    },
    {
      step: 4,
      name: "Clock Tree Synthesis (CTS)",
      shortCode: "CTS",
      description: "Synthesizing balanced clock distribution networks (H-tree/mesh) using CCOpt to ensure minimal clock skew, controlled insertion delay, and transition slew across all flip-flops.",
      toolExample: "Cadence Innovus (CCOpt)",
      inputs: ["Placed Design", "Clock Tree Specifications", "Clock Inverter/Buffer Library"],
      outputs: ["Clock Tree DEF", "Skew & Latency Reports", "Clock Tree Netlist"],
      keyChecks: ["Global Clock Skew < 30ps", "Controlled Insertion Delay", "Hold Slack Margin Secured"],
    },
    {
      step: 5,
      name: "Post-CTS Timing Optimization",
      shortCode: "POST-CTS",
      description: "Refining setup and hold timing on real clock paths, performing hold time fixing via buffer insertion, and preparing the netlist for global routing.",
      toolExample: "Cadence Innovus",
      inputs: ["CTS DEF", "Updated Timing Models", "SDC Constraints"],
      outputs: ["Post-CTS Optimized DEF", "Hold Violation Clearance Reports"],
      keyChecks: ["Hold Violations Met", "Setup Slack Maintained", "Buffer Sizing Verified"],
    },
    {
      step: 6,
      name: "Global & Detailed Routing",
      shortCode: "ROUTE",
      description: "Interconnecting all signal and clock pins across metal layers (M1 to Top Metal) strictly adhering to foundry geometric design rules, spacing, and via constraints.",
      toolExample: "Cadence Innovus NanoRoute",
      inputs: ["Post-CTS Design", "Foundry Tech LEF", "Interconnect RC Extraction Rules"],
      outputs: ["Routed DEF", "Spef Parasitic Files", "Congestion & Pin Access Reports"],
      keyChecks: ["Zero Opens & Shorts", "Crosstalk Noise Mitigated", "Antenna Violations Resolved"],
    },
    {
      step: 7,
      name: "Signoff STA & Timing Closure",
      shortCode: "STA",
      description: "Multi-corner multi-mode (MCMM) static timing analysis across PVT corners, signal integrity (SI) crosstalk analysis, and automated ECO timing fixes.",
      toolExample: "Cadence Tempus / PrimeTime",
      inputs: ["Extracted SPEF", "Routed Netlist", "Signoff MCMM SDC"],
      outputs: ["Signoff Timing Reports", "ECO Timing Fix Scripts"],
      keyChecks: ["Worst Negative Slack (WNS) = 0.00ps", "Total Negative Slack (TNS) = 0.00ps", "Setup/Hold Clean"],
    },
    {
      step: 8,
      name: "Physical Verification & GDSII Tapeout",
      shortCode: "GDSII",
      description: "Final Design Rule Checking (DRC), Layout Versus Schematic (LVS), Electrical Rule Checking (ERC), and dummy metal fill insertion prior to foundry tapeout.",
      toolExample: "Cadence Pegasus / Mentor Calibre",
      inputs: ["Routed GDSII/OASIS", "Foundry Rule Decks", "Source Netlist"],
      outputs: ["Signoff GDSII Stream File", "100% Clean DRC/LVS Verification Logs"],
      keyChecks: ["DRC Clean (0 Errors)", "LVS 100% Match", "Foundry Tapeout Ready"],
    },
  ] as PDStage[],

  experiences: [
    {
      id: "chipxpert",
      role: "Physical Design Trainee",
      company: "ChipXpert",
      location: "Bengaluru, India (Hybrid)",
      period: "Jun 2026 – Present",
      isCurrent: true,
      type: "Traineeship",
      badgeColor: "cyan",
      description:
        "Intensive specialization in deep-submicron Physical Design flows, high-performance physical implementation, floorplanning strategies, clock tree synthesis, and timing signoff closure.",
      keyResponsibilities: [
        "Hands-on execution of full ASIC Physical Design flow (RTL-to-GDSII) on advanced technology nodes.",
        "Crafting die floorplans, power distribution networks (PDN meshes/rings), and macro placement optimizations.",
        "Standard cell placement optimization to eliminate congestion hotspots and reduce total wirelength.",
        "Clock Tree Synthesis (CTS) with CCOpt, skew minimization, latency balancing, and hold time fixing.",
        "Static Timing Analysis (STA), identifying critical timing paths, and executing ECO fixes for setup/hold closure.",
        "Analyzing physical verification reports for Design Rule Checks (DRC) and Layout Versus Schematic (LVS).",
      ],
      technologies: ["Cadence Innovus", "Cadence Genus", "TCL EDA Automation", "STA Signoff", "CTS Optimization", "DRC/LVS Verification"],
    },
    {
      id: "nielit",
      role: "VLSI Physical Design Intern",
      company: "NIELIT & SoC Teamup Semiconductors Pvt Ltd",
      location: "Ministry of Electronics and Information Technology (MeitY)",
      period: "Jun 2026 – Jul 2026",
      isCurrent: false,
      type: "Internship",
      badgeColor: "amber",
      description:
        "Selected for the prestigious eChipHub Internship Programme under the Ministry of Electronics and Information Technology (MeitY), focusing on Physical Design workflows, standard cell library characterization, and ASIC implementation.",
      keyResponsibilities: [
        "Executed physical design implementation steps: floorplanning, placement, and clock tree routing.",
        "Evaluated PPA metrics (Power, Performance, Area) across multiple standard cell technology libraries.",
        "Worked on semiconductor parasitic RC extraction, delay calculation, and layout verification rules.",
        "Collaborated with senior silicon backend engineers on standard ASIC design methodologies and tool pipelines.",
      ],
      technologies: ["RTL to GDSII Flow", "Physical Design", "Linux Workstations", "Logic Synthesis", "SoC Development"],
    },
    {
      id: "google-ambassador",
      role: "Google Student Ambassador",
      company: "Google",
      location: "Campus Chapter",
      period: "Jun 2025 – Dec 2025",
      isCurrent: false,
      type: "Ambassadorship",
      badgeColor: "emerald",
      description:
        "Served as the primary liaison between Google and the student technical community, driving awareness for developer technologies, computational systems, and student tech programs.",
      keyResponsibilities: [
        "Spearheaded technical workshops, hackathons, and developer engagement sessions across campus.",
        "Organized community sessions on computing technologies, AI tools, and technical problem solving.",
        "Mentored peers in technical skill development, collaborative project building, and career preparedness.",
      ],
      technologies: ["Developer Relations", "Tech Leadership", "Cloud Programs", "Community Building"],
    },
    {
      id: "ecell",
      role: "Deputy Head",
      company: "Entrepreneurship Cell (E-Cell)",
      location: "Campus Leadership",
      period: "Apr 2026 – Oct 2026",
      isCurrent: false,
      type: "Leadership",
      badgeColor: "purple",
      description:
        "Led operational strategy, student innovation initiatives, and high-impact startup incubator events to foster hardware engineering and tech entrepreneurship.",
      keyResponsibilities: [
        "Managed flagship technical entrepreneurship events, hackathons, and venture pitch competitions.",
        "Connected student innovators with industry mentors, startup incubators, and hardware prototyping grants.",
        "Coordinated cross-functional teams spanning operations, technical infrastructure, and speaker curation.",
      ],
      technologies: ["Project Leadership", "Operations", "Event Management", "Stakeholder Relations"],
    },
  ] as Experience[],

  projects: [
    {
      id: "read2hear",
      title: "READ2HEAR: Real-time Braille Radar with FPGA",
      category: "VLSI & Physical Design",
      domainTag: "FPGA & Hardware Implementation",
      summary: "An FPGA-powered assistive hardware system integrating radar distance telemetry with real-time Braille translation and acoustic output.",
      description:
        "Engineered an FPGA-based real-time obstacle detection and tactile translation hardware unit. Implemented pulse-width timing logic to measure ultrasonic echo returns, mapped distance vectors onto sequential solenoid actuators, and closed timing constraints on Xilinx Artix-7 FPGA with zero timing violations.",
      fullDetails: {
        overview: "Designed to aid visually impaired individuals navigate indoor and outdoor spaces safely through real-time tactile feedback and audio telemetry.",
        architecture: [
          "Hardware Pulse-Width Timing Engine to measure microsecond ultrasonic echo returns with zero CPU overhead.",
          "Coordinate transformation and distance thresholding FSM synthesized on FPGA fabric.",
          "Tactile Braille refresh driver generating sequential solenoid actuation matrices.",
          "Dual-clock domain architecture synchronizing high-speed 50MHz FPGA core clock with low-speed actuator drivers.",
        ],
        technicalHighlights: [
          "Sub-15ms end-to-end latency from echo acquisition to tactile Braille pin actuation.",
          "Zero setup/hold timing violations on 50MHz core clock.",
          "Synthesized on Xilinx Artix-7 FPGA with minimal slice utilization (<12%).",
        ],
        hardwareStack: ["Xilinx Artix-7 FPGA", "Verilog HDL", "Ultrasonic Transceivers", "Braille Actuator Solenoids", "Audio DAC Module"],
        edaTools: ["Xilinx Vivado", "ModelSim", "Timing Analyzer"],
        outcomes: [
          "Demonstrated 99.4% detection accuracy within a 0.1m - 4.0m range.",
          "Presented at university hardware symposium and received high honors for accessibility innovation.",
        ],
      },
      tags: ["Physical Design", "FPGA", "Timing Closure", "Vivado", "Hardware", "FSM"],
      tools: ["Xilinx Vivado", "ModelSim", "Verilog HDL", "Artix-7 FPGA"],
      metrics: [
        { label: "Timing Slack", value: "+1.85 ns" },
        { label: "Range Accuracy", value: "99.4%" },
        { label: "LUT Utilization", value: "<12%" },
      ],
      featured: true,
      githubUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
      liveUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
    },
    {
      id: "secure-voting-machine",
      title: "Design & Implementation of Secure FPGA-based Voting Machine",
      category: "VLSI & Physical Design",
      domainTag: "Hardware Security & Synthesis",
      summary: "Cryptographically resilient electronic voting system prototype synthesized on FPGA targeting verifiable, tamper-proof state logic.",
      description:
        "Designed and synthesized a hardware-isolated Electronic Voting Machine (EVM) on FPGA. Employs hardware state machines with tamper-detection flags, pseudo-random voter token validation, encrypted tally memory registers, and physical key-lock interlocks to guarantee absolute electoral integrity against physical and clock glitching attacks.",
      fullDetails: {
        overview: "Modern democratic processes require transparent yet unhackable hardware foundations. This project builds a complete hardware EVM with non-volatile vote logs and glitch-resilient voting logic.",
        architecture: [
          "Finite State Machine (FSM) enforcing atomic vote transactions (Idle -> Authorize -> Vote -> Encrypt -> Commit -> Lockout).",
          "Tamper-detection circuitry that immediately wipes active RAM keys upon unauthorized enclosure break or clock glitching.",
          "Dual-redundancy register tally banks to detect bit-flips and single-event upsets.",
          "Seven-segment and LCD hardware controller for voter verification slip and status monitoring.",
        ],
        technicalHighlights: [
          "Zero operating system dependency: pure hardware execution eliminates firmware vulnerabilities.",
          "Full timing constraint validation in Vivado with positive worst-case slack under 100MHz clock.",
          "Glitch-free voting pulse filter to eliminate switch debounce and illegal double-tallying.",
        ],
        hardwareStack: ["Basys-3 / Nexys FPGA", "Hardware Debounce Filters", "LCD Display Module", "Secure Key Matrix"],
        edaTools: ["Xilinx Vivado", "ModelSim Testbench", "Logic Analyzer"],
        outcomes: [
          "Simulated 100,000+ vote iterations with zero dropped tallies or race conditions.",
          "Implemented hardware tamper-wipe in under 3 clock cycles.",
        ],
      },
      tags: ["FPGA", "Vivado", "Hardware Security", "Timing Analysis", "FSM Synthesis"],
      tools: ["Xilinx Vivado", "ModelSim", "Verilog HDL", "Xilinx FPGA"],
      metrics: [
        { label: "Vote Transaction", value: "Atomic / 0 Race" },
        { label: "Tamper Wipe", value: "< 3 Cycles" },
        { label: "Clock Frequency", value: "100 MHz" },
      ],
      featured: true,
      githubUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
      liveUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
    },
    {
      id: "echolume",
      title: "ECHOLUME: Ultrasonic Radar with Visual Display",
      category: "Embedded & Edge Systems",
      domainTag: "Embedded Hardware & Telemetry",
      summary: "An ultrasonic mapping radar visualizing target proximity and angular coordinate plots in real-time on high-resolution displays.",
      description:
        "Developed a continuous-sweep radar system pairing micro-servo angular positioning with ultrasonic distance telemetry. Processed spatial polar coordinates and mapped obstacle point clouds onto visual graphical displays in real-time, accompanied by warning thresholds and sector threat classification.",
      fullDetails: {
        overview: "Designed for autonomous mobile robots and perimeter surveillance requiring 180-degree sweep obstacle mapping with low thermal and power budgets.",
        architecture: [
          "Microcontroller PWM driver steering 0-180 degree servo sweeps at configurable angular velocities.",
          "Precise microsecond echo pulse measurement and spatial polar-to-Cartesian coordinate mapping engine.",
          "Visual sweep rendering showing sweep beam sweep line, obstacle blips, and range rings.",
        ],
        technicalHighlights: [
          "Real-time coordinate plotting with smooth 60fps refresh rate.",
          "Multi-zone alarm logic with color-coded safety, warning, and hazard sectors.",
          "Calibrated temperature compensation curve for accurate speed-of-sound calculations.",
        ],
        hardwareStack: ["Embedded Microcontroller", "HC-SR04 Ultrasonic Sensor", "TowerPro Micro Servo", "OLED/Processing Display UI"],
        edaTools: ["Embedded C / Arduino IDE", "Processing IDE", "Oscilloscope"],
        outcomes: [
          "Achieved 1-degree angular resolution and 1cm spatial distance precision.",
          "Successfully deployed as obstacle-avoidance front-end for mobile robot chassis.",
        ],
      },
      tags: ["Embedded Systems", "Signal Processing", "Hardware", "C++", "Sensors", "Radar UI"],
      tools: ["Embedded C", "Processing", "Microcontroller", "Sensors"],
      metrics: [
        { label: "Angular Sweep", value: "180°" },
        { label: "Distance Resolution", value: "1 cm" },
        { label: "Refresh Rate", value: "60 FPS" },
      ],
      featured: true,
      githubUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
      liveUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
    },
    {
      id: "solar-chill-nano",
      title: "SOLAR CHILL NANO: AI-Optimized Battery-Free Cold Storage",
      category: "Embedded & Edge Systems",
      domainTag: "Edge Systems & Clean Energy",
      summary: "Low-power, smart thermal regulation system leveraging predictive energy profiling for battery-free cold preservation for rural MSMEs.",
      description:
        "Pioneered a sustainable, battery-free solar refrigeration system engineered for rural agricultural micro-enterprises. Uses AI edge forecasting to modulate Peltier/compressor thermal cooling cycles dynamically against real-time solar irradiance curves and phase-change thermal storage buffers.",
      fullDetails: {
        overview: "Recognized as a Winner in the prestigious MSME Hackathon 5.0 for solving rural post-harvest crop spoilage without expensive chemical battery replacements.",
        architecture: [
          "Direct DC-to-DC MPPT solar tracking converting variable sunlight directly into modulated cooling power.",
          "Predictive AI thermal regression model running on low-power edge microcontroller calculating cooling requirements.",
          "Thermal energy storage using phase-change materials (PCM) to preserve sub-4°C conditions overnight without battery packs.",
        ],
        technicalHighlights: [
          "Eliminated lead-acid/lithium battery replacement cycles, reducing operational cost by 65%.",
          "Maintained perishable crop storage life by up to 300% during prolonged grid outages.",
          "Edge telemetry logging temperature, humidity, and insolation data.",
        ],
        hardwareStack: ["Solar PV Array", "Direct DC MPPT Controller", "Thermoelectric / Variable DC Cooling Unit", "PCM Ice-Pack Thermal Reservoir", "Edge AI Controller"],
        edaTools: ["Python AI Modeling", "Embedded C", "Thermal Simulation Tools"],
        outcomes: [
          "Won MSME Hackathon 5.0 National Award & incubation recognition.",
          "Validated 72-hour continuous sub-5°C holding duration under simulated cloudy conditions.",
        ],
      },
      tags: ["AI / Embedded", "Green Energy", "Edge Computing", "MSME Award", "Python", "Sensors"],
      tools: ["Python", "Embedded C", "IoT Telemetry", "Thermal Modeling"],
      metrics: [
        { label: "Award", value: "MSME Winner" },
        { label: "Battery Cost", value: "0% (Battery-Free)" },
        { label: "Holding Time", value: "72+ Hours" },
      ],
      featured: true,
      githubUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
      liveUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
    },
    {
      id: "anti-theft-system",
      title: "Anti-Vehicle Theft Detecting System",
      category: "Embedded & Edge Systems",
      domainTag: "Embedded Security & IoT",
      summary: "Automated intrusion detection mechanism triggering remote alarms and powertrain lockouts upon unauthorized tampering.",
      description:
        "Architected an embedded vehicular anti-theft security node combining 3-axis accelerometer tilt/shock sensing, biometric ignition validation, GPS geolocation broadcasting, and remote SMS/GSM powertrain ignition lockout relays.",
      fullDetails: {
        overview: "Protects two-wheelers and commercial vehicles from hot-wiring, towing, and unauthorized intrusion in remote parking environments.",
        architecture: [
          "Vibration and tilt anomaly detection engine monitoring sudden motion when vehicle is in armed state.",
          "Automatic cellular alert dispatch transmitting precise GPS coordinates to the owner's mobile device.",
          "Fail-safe ignition cut-off relay disabling fuel pump / starter motor upon verified theft alarm.",
        ],
        technicalHighlights: [
          "Ultra-low sleep current (<2mA) preserving vehicle battery health for months.",
          "Instantaneous SMS and cloud alert dispatch within 4 seconds of intrusion detection.",
        ],
        hardwareStack: ["Microcontroller", "SIM800L GSM/GPRS", "NEO-6M GPS Module", "MPU6050 Accelerometer", "Relay Control Circuitry"],
        edaTools: ["Embedded C", "Eagle PCB Layout", "Serial Monitor"],
        outcomes: [
          "Field-tested on active test vehicles with 100% lockout reliability under simulated tampering.",
          "Recognized for practical engineering utility in campus project showcase.",
        ],
      },
      tags: ["Embedded Security", "Sensor Integration", "Microcontrollers", "IoT", "GPS/GSM"],
      tools: ["Embedded C", "GSM/GPS Modules", "MPU6050", "PCB Design"],
      metrics: [
        { label: "Alert Time", value: "< 4 sec" },
        { label: "Sleep Current", value: "< 2 mA" },
        { label: "Lockout Reliability", value: "100%" },
      ],
      featured: false,
      githubUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
      liveUrl: "https://github.com/bab1904/bhavya-sri-portfolio",
    },
  ] as Project[],

  certifications: [
    {
      id: "chipstart",
      name: "Chip Start 2.0 Semiconductor Program",
      issuer: "Advanced Semiconductor Academy of Malaysia (ASEM)",
      category: "Physical Design & VLSI",
      skills: ["IC Design", "Semiconductor Manufacturing", "Physical Design", "Silicon Packaging"],
      featured: true,
    },
    {
      id: "samsung",
      name: "Samsung Fellowship — Cohort 7",
      issuer: "Samsung",
      category: "Physical Design & VLSI",
      skills: ["Semiconductor Architecture", "Hardware Innovation", "Physical Implementation"],
      featured: true,
    },
    {
      id: "fpga-tcl",
      name: "FPGA & TCL Scripting for Automation",
      issuer: "Sense Academia",
      category: "EDA Toolsuites",
      skills: ["TCL Scripting", "Vivado Automation", "P&R Constraints", "Timing Closure"],
      featured: true,
    },
    {
      id: "nielit-rtl-gds",
      name: "RTL to GDS II & VLSI for Beginners",
      issuer: "NIELIT (MeitY)",
      category: "Physical Design & VLSI",
      skills: ["Floorplanning", "Placement", "CTS", "Routing", "DRC/LVS Verification", "STA"],
      featured: true,
    },
    {
      id: "riscv-vsd",
      name: "RISC-V Microarchitecture & Implementation",
      issuer: "VLSI System Design (VSD)",
      category: "Physical Design & VLSI",
      skills: ["RISC-V Core", "Physical Flow", "Synthesis", "Timing Constraints"],
      featured: true,
    },
    {
      id: "vit-semis",
      name: "National Semiconductor Technology Symposium",
      issuer: "VIT AP University",
      category: "Physical Design & VLSI",
      skills: ["Semiconductor Trends", "FinFET / GAA", "Heterogeneous Integration"],
      featured: false,
    },
    {
      id: "maven-silicon-verilog",
      name: "Verilog HDL for ASIC & FPGA Design",
      issuer: "Maven Silicon",
      category: "Physical Design & VLSI",
      skills: ["Synthesizable Verilog", "FSM Design", "Testbench Verification", "Gate Netlists"],
      featured: true,
    },
    {
      id: "udemy-vlsi",
      name: "VLSI Design & Digital CMOS",
      issuer: "Udemy",
      category: "Physical Design & VLSI",
      skills: ["CMOS Inverter", "Propagation Delay", "Setup & Hold Times", "Standard Cells"],
      featured: false,
    },
    {
      id: "simplilearn-vlsi",
      name: "VLSI Physical Flow Course",
      issuer: "Simplilearn SkillUp",
      category: "Physical Design & VLSI",
      skills: ["Digital VLSI", "Silicon Fabrication", "Logic Synthesis", "Place & Route"],
      featured: false,
    },
    {
      id: "ibm-linuxone",
      name: "Enterprise Linux Systems",
      issuer: "IBM LinuxONE",
      category: "Software & Linux",
      skills: ["Linux Shell", "Bash Scripting", "System Administration", "EDA Flow Automation"],
      featured: true,
    },
    {
      id: "infosys-pragathi",
      name: "Pragathi: Path to Future — Cohort 7",
      issuer: "Infosys Springboard",
      category: "Software & Linux",
      skills: ["Enterprise Tech", "Software Systems", "Agile Engineering"],
      featured: true,
    },
    {
      id: "python-datascience",
      name: "Python for Data Science (101)",
      issuer: "Cognitive Class (IBM) & CodeTantra",
      category: "Software & Linux",
      skills: ["Python 3", "Data Structures", "Scripting Automation", "Report Extraction"],
      featured: false,
    },
    {
      id: "nxtwave-genai",
      name: "Generative AI Masterclass",
      issuer: "NXTWave",
      category: "Software & Linux",
      skills: ["Prompt Engineering", "AI Automation", "Workflow Productivity"],
      featured: false,
    },
    {
      id: "nptel-digital-embedded",
      name: "Digital Electronics & Embedded Systems",
      issuer: "NPTEL (IITs / IISc)",
      category: "Core Engineering",
      skills: ["Digital Logic", "Microcontrollers", "Combinational Circuits", "Sequential Analysis"],
      featured: false,
    },
    {
      id: "nit-rourkela-drone",
      name: "VTOL Drone Technology & Avionics",
      issuer: "NIT Rourkela",
      category: "Core Engineering",
      skills: ["Autonomous Avionics", "Sensor Telemetry", "Hardware Integration"],
      featured: false,
    },
  ] as Certification[],

  education: [
    {
      institution: "QIS College of Engineering & Technology",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Electronics, Electrical & VLSI Technology",
      period: "2023 – 2027 (Expected)",
      grade: "Pursuing with Distinction",
      location: "Ongole, Andhra Pradesh, India",
      coursework: [
        "VLSI Physical Design & CMOS Circuits",
        "Switching Theory & Logic Design (STLD)",
        "Digital Electronics & Logic Optimization",
        "Microprocessors & Embedded Systems",
        "Electronic Devices & Circuits (EDC)",
        "Computer Organization & Architecture (COA)",
        "Python & Scripting for EDA",
        "Linear ICs & Applications",
        "Network Analysis & Synthesis",
      ],
      highlights: [
        "Active member of Department VLSI Design & Hardware Prototyping Research Club.",
        "Winner of National Level MSME Hackathon 5.0 and IMCEST International Conference competition.",
        "Deputy Head of Entrepreneurship Cell, fostering student innovation in hardware technology.",
      ],
    },
    {
      institution: "Kendriya Vidyalaya",
      degree: "Intermediate / Higher Secondary (Class XII)",
      field: "Science Stream (MPC - Mathematics, Physics, Chemistry)",
      period: "Completed 2023",
      grade: "75%",
      location: "India",
      coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science / English"],
      highlights: [
        "Strong foundation in electromagnetic theory, solid-state physics, and advanced calculus.",
        "Active participant in Science Olympiads and inter-school technical exhibitions.",
      ],
    },
  ] as Education[],

  honors: [
    {
      id: "msme",
      title: "Winner — MSME Hackathon 5.0",
      issuer: "Ministry of Micro, Small & Medium Enterprises (Govt. of India)",
      description:
        "Awarded national first prize for developing SOLAR CHILL NANO: an AI-optimized, battery-free cold storage architecture for rural agricultural preservation.",
      icon: "Trophy",
      year: "2024",
    },
    {
      id: "imcest",
      title: "Winner — IMCEST International Conference & Competition",
      issuer: "IMCEST International Committee",
      description:
        "Recognized for groundbreaking research and prototype demonstration in FPGA-driven assistive hardware telemetry and digital accessibility systems.",
      icon: "Medal",
      year: "2024",
    },
  ],
};
