export interface Project {
  id: string;
  title: string;
  category: "VLSI & FPGA" | "Embedded & AI" | "Hardware Security";
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
  category: "VLSI & Semiconductor" | "EDA & FPGA" | "Software & AI" | "Core Engineering";
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
    name: "Bhavya Sri",
    title: "VLSI Physical Design (PD) & RTL Engineer",
    roleTag: "Physical Design Trainee @ ChipXpert | VLSI & RTL Enthusiast",
    subheadline:
      "Specializing in RTL design, logic synthesis, floorplanning, CTS, routing, and physical verification using industry-standard EDA tooling.",
    aboutSummary:
      "Dedicated B.Tech student in Electronics, Electrical & VLSI Technology with a strong passion for semiconductor microarchitecture and chip implementation. Proficient in RTL design, logic synthesis, floorplanning, standard cell placement, clock tree synthesis (CTS), global & detailed routing, static timing analysis (STA), and physical verification (DRC/LVS). Experienced with industry EDA toolsuites including Cadence Innovus/Genus, ModelSim, Xilinx Vivado, Linux environments, and Python automation. Demonstrated practical capability through hands-on VLSI research projects, tapeout flow simulations, and national hackathon victories.",
    email: "bhavya9133sri@gmail.com",
    phone: "+91 9133641193",
    location: "India",
    linkedin: "https://linkedin.com/in/bhavya-sri-7b5646291",
    github: "https://github.com",
    languages: [
      { name: "Telugu", proficiency: "Native" },
      { name: "English", proficiency: "Fluent / Professional" },
      { name: "Hindi", proficiency: "Fluent" },
      { name: "German", proficiency: "Intermediate" },
    ],
    statusBadge: "Available for VLSI Physical Design & RTL Engineer Opportunities",
  },

  metrics: [
    {
      id: "projects",
      value: 9,
      suffix: "+",
      label: "VLSI & Hardware Projects",
      sublabel: "Designed, Synthesized & Simulated",
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
      label: "EDA Tool Suites Mastered",
      sublabel: "Cadence, Vivado, ModelSim, Linux",
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
      title: "HDL & Digital Verification",
      description: "Hardware description, register-transfer level microarchitecture, and functional verification testbenches.",
      iconName: "Code2",
      color: "cyan",
      skills: [
        { name: "Verilog HDL", level: "Mastery", note: "RTL design, FSMs, Datapaths" },
        { name: "SystemVerilog", level: "Proficient", note: "OOP Verification, Assertions" },
        { name: "VHDL", level: "Proficient", note: "Structural & Behavioral" },
        { name: "UVM Fundamentals", level: "Familiar", note: "Universal Verification Methodology" },
        { name: "Testbench Development", level: "Mastery", note: "Self-checking testbenches, corner cases" },
        { name: "Functional Verification", level: "Proficient", note: "Code & Functional coverage" },
        { name: "RTL Design", level: "Mastery", note: "Pipelining, hazard handling, synchronous design" },
        { name: "Digital Logic Design", level: "Mastery", note: "Combinational & Sequential optimization" },
        { name: "Switching Theory (STLD)", level: "Mastery", note: "K-maps, State Minimization, Hazards" },
      ],
    },
    {
      title: "EDA & Hardware Tools",
      description: "Industry-standard electronic design automation and FPGA synthesis suites.",
      iconName: "Binary",
      color: "amber",
      skills: [
        { name: "Cadence Innovus", level: "Proficient", note: "Place & Route, Floorplanning, CTS" },
        { name: "Cadence Genus", level: "Proficient", note: "Logic Synthesis, Area/Delay Tradeoffs" },
        { name: "Cadence Virtuoso", level: "Familiar", note: "Custom IC schematic & layout" },
        { name: "ModelSim / QuestaSim", level: "Mastery", note: "Simulation, waveform debugging" },
        { name: "Xilinx Vivado", level: "Mastery", note: "FPGA synthesis, bitstream, timing constraints" },
        { name: "FPGA Prototyping", level: "Proficient", note: "Artix-7 / Basys-3 hardware validation" },
        { name: "TCL Scripting for EDA", level: "Proficient", note: "Automating synthesis & P&R runs" },
      ],
    },
    {
      title: "Software & OS",
      description: "Computational scripting, low-level programming, and enterprise Linux systems.",
      iconName: "Terminal",
      color: "emerald",
      skills: [
        { name: "Python", level: "Proficient", note: "Scripting, test vector generation, data analysis" },
        { name: "C Programming", level: "Proficient", note: "Embedded systems, firmware, algorithms" },
        { name: "Linux Systems", level: "Mastery", note: "IBM LinuxONE, Bash shell, process automation" },
        { name: "Git / Version Control", level: "Proficient", note: "Collaboration & RTL version tracking" },
        { name: "Make / Shell Scripts", level: "Proficient", note: "EDA flow build systems" },
      ],
    },
    {
      title: "Physical Design & Core Competencies",
      description: "End-to-end silicon implementation, timing closure, and collaborative delivery.",
      iconName: "Layers",
      color: "purple",
      skills: [
        { name: "RTL-to-GDSII Flow", level: "Proficient", note: "End-to-end ASIC flow understanding" },
        { name: "Floorplanning & Power Grid", level: "Proficient", note: "Die sizing, macro placement, IR-drop" },
        { name: "Clock Tree Synthesis (CTS)", level: "Proficient", note: "Skew minimization, latency optimization" },
        { name: "Static Timing Analysis (STA)", level: "Proficient", note: "Setup/Hold checks, clock jitter, OCV" },
        { name: "Routing & DRC/LVS", level: "Proficient", note: "Global & detailed routing, geometric checks" },
        { name: "Cross-functional Collaboration", level: "Mastery", note: "Agile, multidisciplinary engineering" },
        { name: "Problem-Solving & Debugging", level: "Mastery", note: "Timing violation closure & silicon bugs" },
      ],
    },
  ] as SkillCategory[],

  physicalDesignFlow: [
    {
      step: 1,
      name: "RTL Design & Simulation",
      shortCode: "RTL",
      description: "Writing synchronous, synthesizable Verilog/SystemVerilog and validating functional correctness with testbenches.",
      toolExample: "ModelSim / Vivado",
      inputs: ["Microarchitecture Spec", "Verification Plan"],
      outputs: ["Synthesizable RTL (.v / .sv)", "Simulation Logs"],
      keyChecks: ["Functional Coverage", "Code Coverage", "Linting"],
    },
    {
      step: 2,
      name: "Logic Synthesis",
      shortCode: "SYNTH",
      description: "Translating RTL gates into technology-mapped standard cells while optimizing for power, performance, and area (PPA).",
      toolExample: "Cadence Genus / Synopsys DC",
      inputs: ["RTL Code", "SDC Timing Constraints", "Target Standard Cell Library (.lib)"],
      outputs: ["Gate-Level Netlist", "Area & Power Reports"],
      keyChecks: ["Unmapped Logic", "Setup Slack", "Library Compliance"],
    },
    {
      step: 3,
      name: "Floorplanning & Power Grid",
      shortCode: "FP",
      description: "Determining chip core/die dimensions, I/O pin assignments, macro placement, and constructing low-resistance VDD/VSS power meshes.",
      toolExample: "Cadence Innovus",
      inputs: ["Synthesized Netlist", "LEF Physical Rules", "Design Constraints"],
      outputs: ["Floorplan DEF", "Power Grid Mesh", "I/O Placement"],
      keyChecks: ["Core Utilization", "Macro Halos", "IR-Drop Prevention"],
    },
    {
      step: 4,
      name: "Standard Cell Placement",
      shortCode: "PLACE",
      description: "Optimally placing hundreds of thousands of standard logic gates to minimize wirelength and avoid routing congestion.",
      toolExample: "Cadence Innovus",
      inputs: ["Floorplan DEF", "Netlist", "Timing Models"],
      outputs: ["Placed DEF", "Congestion Maps"],
      keyChecks: ["Cell Density", "Congestion Hotspots", "High-Fanout Net Synthesis"],
    },
    {
      step: 5,
      name: "Clock Tree Synthesis (CTS)",
      shortCode: "CTS",
      description: "Building balanced clock distribution trees (H-tree/mesh) to supply every flip-flop with minimal clock skew and low insertion delay.",
      toolExample: "Cadence Innovus (CCOpt)",
      inputs: ["Placed Design", "Clock Specs", "Clock Inverters/Buffers"],
      outputs: ["Clock Tree DEF", "Skew & Insertion Delay Reports"],
      keyChecks: ["Global Skew < 50ps", "Clock Latency", "Hold Time Margin"],
    },
    {
      step: 6,
      name: "Routing (Global & Detail)",
      shortCode: "ROUTE",
      description: "Connecting all signal pins across metal layers (M1 to Top Metal) adhering to strict design rules (spacing, width, vias).",
      toolExample: "Cadence Innovus NanoRoute",
      inputs: ["CTS Design", "Tech LEF", "Interconnect RC Specs"],
      outputs: ["Routed DEF", "Spef Extraction Files"],
      keyChecks: ["Shorts & Opens", "Crosstalk Noise", "Antenna Violations"],
    },
    {
      step: 7,
      name: "STA & Timing Closure",
      shortCode: "STA",
      description: "Comprehensive static timing analysis over multi-corner multi-mode (MCMM) PVT conditions to guarantee zero setup and hold violations.",
      toolExample: "Cadence Tempus / PrimeTime",
      inputs: ["Extracted SPEF", "Routed Netlist", "MCMM SDC"],
      outputs: ["Timing Reports", "ECO Fix Scripts"],
      keyChecks: ["Worst Negative Slack (WNS)", "Total Negative Slack (TNS)", "Min/Max Violations"],
    },
    {
      step: 8,
      name: "Physical Verification & GDSII",
      shortCode: "GDSII",
      description: "Final DRC, LVS (layout vs schematic), ERC, and DFM checks before generating the final GDSII/OASIS tapeout stream for foundry fabrication.",
      toolExample: "Cadence Pegasus / Mentor Calibre",
      inputs: ["Routed Layout", "Foundry Rule Decks", "Source Schematic"],
      outputs: ["GDSII Stream File", "Clean DRC/LVS Reports"],
      keyChecks: ["DRC Clean 100%", "LVS Match Clean", "Antenna Rules Met"],
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
        "Specialized training in deep submicron physical design flows, high-performance ASIC implementation, floorplanning strategies, clock distribution, and timing signoff closure.",
      keyResponsibilities: [
        "Hands-on execution of RTL-to-GDSII implementation flow on advanced technology nodes.",
        "Performing floorplanning, power distribution network (PDN) design, and standard cell placement optimization.",
        "Clock Tree Synthesis (CTS) balancing, skew tuning, and latency reduction on synchronous multi-clock domains.",
        "Static Timing Analysis (STA), identifying critical paths, and engineering change order (ECO) timing fixes for setup/hold closure.",
        "Analyzing physical verification design rule check (DRC) and layout versus schematic (LVS) reports.",
      ],
      technologies: ["Cadence Innovus", "Cadence Genus", "TCL Scripting", "STA", "CTS", "Physical Verification"],
    },
    {
      id: "nielit",
      role: "VLSI & RTL Engineering Intern",
      company: "NIELIT & SoC Teamup Semiconductors Pvt Ltd",
      location: "Ministry of Electronics and Information Technology (MeitY)",
      period: "Jun 2026 – Jul 2026",
      isCurrent: false,
      type: "Internship",
      badgeColor: "amber",
      description:
        "Selected for the prestigious eChipHub Internship Programme under the Ministry of Electronics and Information Technology (MeitY), focusing on cutting-edge RTL-to-GDSII flows and SoC design methodology.",
      keyResponsibilities: [
        "Synthesized digital IP blocks and evaluated PPA metrics (Power, Performance, Area) across technology libraries.",
        "Explored RISC-V open-source workflows and RTL functional verification methodologies.",
        "Worked on semiconductor physical design concepts, parasitic RC extraction, and layout verification rules.",
        "Collaborated with senior silicon engineers on standard ASIC design methodologies and tool pipelines.",
      ],
      technologies: ["RTL to GDSII", "Verilog HDL", "Linux", "RISC-V", "Logic Synthesis", "SoC Development"],
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
        "Served as the primary liaison between Google and the student technical community, driving awareness for Google developer technologies, cloud solutions, and student tech programs.",
      keyResponsibilities: [
        "Spearheaded technical workshops, hackathons, and developer engagement sessions across campus.",
        "Organized community sessions on Google Cloud, AI/ML tools, and open-source contribution roadmaps.",
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
        "Coordinated cross-functional teams spanning marketing, sponsorship, technical infrastructure, and speaker curation.",
      ],
      technologies: ["Project Leadership", "Operations", "Event Management", "Stakeholder Relations"],
    },
  ] as Experience[],

  projects: [
    {
      id: "read2hear",
      title: "READ2HEAR: Real-time Braille Radar with FPGA",
      category: "VLSI & FPGA",
      domainTag: "FPGA & Assistive Hardware",
      summary: "An FPGA-powered assistive technology system integrating radar distance sensing with real-time Braille translation and acoustic telemetry.",
      description:
        "Engineered an FPGA-based real-time obstacle detection and tactile translation unit. The system captures ultrasonic/radar time-of-flight pulses, processes distance vectors through a custom Verilog arithmetic logic unit, and drives an electro-mechanical Braille tactile actuator array alongside synthesized audio prompts.",
      fullDetails: {
        overview: "Designed to aid visually impaired individuals navigate indoor and outdoor spaces safely through real-time tactile feedback and audio telemetry.",
        architecture: [
          "RTL Pulse-Width Timing Engine to measure microsecond ultrasonic echo returns with zero CPU overhead.",
          "Coordinate transformation and distance thresholding FSM implemented in Verilog HDL.",
          "Tactile Braille refresh driver generating sequential solenoid actuation matrices.",
          "Dual-clock domain architecture synchronizing high-speed 50MHz FPGA core clock with low-speed actuator drivers.",
        ],
        technicalHighlights: [
          "Sub-15ms end-to-end latency from echo acquisition to tactile Braille pin actuation.",
          "Synchronous FIFO buffering preventing frame drop during rapid obstacle transitions.",
          "Synthesized on Xilinx Artix-7 FPGA with minimal slice utilization (<12%).",
        ],
        hardwareStack: ["Xilinx Artix-7 FPGA", "Verilog HDL", "Ultrasonic Transceivers", "Braille Actuator Solenoids", "Audio DAC Module"],
        edaTools: ["Xilinx Vivado", "ModelSim", "Timing Analyzer"],
        outcomes: [
          "Demonstrated 99.4% detection accuracy within a 0.1m - 4.0m range.",
          "Presented at university hardware symposium and received high honors for accessibility innovation.",
        ],
      },
      tags: ["FPGA", "Verilog", "Digital Design", "Vivado", "Assistive Tech", "FSM Design"],
      tools: ["Xilinx Vivado", "ModelSim", "Verilog HDL", "Artix-7 FPGA"],
      metrics: [
        { label: "Latency", value: "<15 ms" },
        { label: "Range Accuracy", value: "99.4%" },
        { label: "FPGA LUT Usage", value: "<12%" },
      ],
      featured: true,
      githubUrl: "https://github.com/bhavya-sri/read2hear-fpga",
      liveUrl: "https://github.com/bhavya-sri/read2hear-fpga",
    },
    {
      id: "secure-voting-machine",
      title: "Design & Implementation of Secure FPGA-based Voting Machine",
      category: "VLSI & FPGA",
      domainTag: "Hardware Security & RTL",
      summary: "Cryptographically resilient electronic voting system prototype synthesized on FPGA targeting verifiable, tamper-proof state logic.",
      description:
        "Designed and synthesized a hardware-isolated Electronic Voting Machine (EVM) on FPGA. Employs hardware state machines with tamper-detection flags, pseudo-random voter token validation, encrypted tally memory registers, and physical key-lock interlocks to guarantee absolute electoral integrity against physical and side-channel attacks.",
      fullDetails: {
        overview: "Modern democratic processes require transparent yet unhackable hardware foundations. This project builds a complete hardware EVM with non-volatile vote logs and glitch-resilient voting logic.",
        architecture: [
          "Finite State Machine (FSM) enforcing atomic vote transactions (Idle -> Authorize -> Vote -> Encrypt -> Commit -> Lockout).",
          "Tamper-detection circuitry that immediately wipes active RAM keys upon unauthorized enclosure break or clock glitching.",
          "Dual-redundancy register tally banks to detect bit-flips and single-event upsets.",
          "Seven-segment and LCD hardware controller for voter verification slip and status monitoring.",
        ],
        technicalHighlights: [
          "Zero operating system dependency: pure RTL execution eliminates firmware vulnerabilities.",
          "Full timing constraint validation in Vivado with positive worst-case slack under 100MHz clock.",
          "Glitch-free voting pulse filter to eliminate switch debounce and illegal double-tallying.",
        ],
        hardwareStack: ["Basys-3 / Nexys FPGA", "Verilog HDL", "Hardware Debounce Filters", "LCD Display Module", "Secure Key Matrix"],
        edaTools: ["Xilinx Vivado", "ModelSim Testbench", "Logic Analyzer"],
        outcomes: [
          "Simulated 100,000+ vote iterations with zero dropped tallies or race conditions.",
          "Implemented hardware tamper-wipe in under 3 clock cycles.",
        ],
      },
      tags: ["FPGA", "Vivado", "Hardware Security", "RTL Design", "FSM", "Verilog"],
      tools: ["Xilinx Vivado", "ModelSim", "Verilog HDL", "Xilinx FPGA"],
      metrics: [
        { label: "Vote Transaction", value: "Atomic / 0 Race" },
        { label: "Tamper Wipe", value: "< 3 Cycles" },
        { label: "Frequency", value: "100 MHz" },
      ],
      featured: true,
      githubUrl: "https://github.com/bhavya-sri/secure-fpga-voting",
      liveUrl: "https://github.com/bhavya-sri/secure-fpga-voting",
    },
    {
      id: "echolume",
      title: "ECHOLUME: Ultrasonic Radar with Visual Display",
      category: "Embedded & AI",
      domainTag: "Embedded Systems & Signal Processing",
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
      githubUrl: "https://github.com/bhavya-sri/echolume-radar",
      liveUrl: "https://github.com/bhavya-sri/echolume-radar",
    },
    {
      id: "solar-chill-nano",
      title: "SOLAR CHILL NANO: AI-Optimized Battery-Free Cold Storage",
      category: "Embedded & AI",
      domainTag: "AI / Embedded & Clean Energy",
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
      githubUrl: "https://github.com/bhavya-sri/solar-chill-nano",
      liveUrl: "https://github.com/bhavya-sri/solar-chill-nano",
    },
    {
      id: "anti-theft-system",
      title: "Anti-Vehicle Theft Detecting System",
      category: "Embedded & AI",
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
      githubUrl: "https://github.com/bhavya-sri/anti-vehicle-theft",
      liveUrl: "https://github.com/bhavya-sri/anti-vehicle-theft",
    },
  ] as Project[],

  certifications: [
    {
      id: "chipstart",
      name: "Chip Start 2.0 Semiconductor Program",
      issuer: "Advanced Semiconductor Academy of Malaysia (ASEM)",
      category: "VLSI & Semiconductor",
      skills: ["IC Design", "Semiconductor Manufacturing", "VLSI Fundamentals", "Silicon Packaging"],
      featured: true,
    },
    {
      id: "samsung",
      name: "Samsung Fellowship — Cohort 7",
      issuer: "Samsung",
      category: "VLSI & Semiconductor",
      skills: ["Semiconductor Architecture", "Hardware Innovation", "Electronics Design"],
      featured: true,
    },
    {
      id: "infosys-pragathi",
      name: "Pragathi: Path to Future — Cohort 7",
      issuer: "Infosys Springboard",
      category: "Software & AI",
      skills: ["Enterprise Tech", "Software Systems", "Agile Engineering"],
      featured: true,
    },
    {
      id: "riscv-vsd",
      name: "RISC-V Workflow & Microarchitecture",
      issuer: "VLSI System Design (VSD)",
      category: "VLSI & Semiconductor",
      skills: ["RISC-V ISA", "SoC Flow", "Spike Simulator", "RTL Verification"],
      featured: true,
    },
    {
      id: "fpga-tcl",
      name: "FPGA & TCL Scripting for Automation",
      issuer: "Sense Academia",
      category: "EDA & FPGA",
      skills: ["TCL Scripting", "Vivado Automation", "FPGA Synthesis", "Constraints SDC"],
      featured: true,
    },
    {
      id: "nielit-rtl-gds",
      name: "RTL to GDS II & VLSI for Beginners",
      issuer: "NIELIT (MeitY)",
      category: "VLSI & Semiconductor",
      skills: ["RTL to GDSII Flow", "Floorplanning", "Placement", "CTS", "Routing", "DRC/LVS"],
      featured: true,
    },
    {
      id: "vit-semis",
      name: "National Semiconductor Technology Symposium",
      issuer: "VIT AP University",
      category: "VLSI & Semiconductor",
      skills: ["Semiconductor Trends", "FinFET / GAA", "Heterogeneous Integration"],
      featured: false,
    },
    {
      id: "maven-silicon-verilog",
      name: "Verilog HDL for ASIC & FPGA Design",
      issuer: "Maven Silicon",
      category: "VLSI & Semiconductor",
      skills: ["Verilog HDL", "FSM Design", "Testbench Verification", "RTL Coding Guidelines"],
      featured: true,
    },
    {
      id: "udemy-vlsi",
      name: "VLSI Design & Digital Electronics",
      issuer: "Udemy",
      category: "VLSI & Semiconductor",
      skills: ["CMOS Inverter", "Propagation Delay", "Setup & Hold Times", "Logic Gates"],
      featured: false,
    },
    {
      id: "simplilearn-vlsi",
      name: "VLSI Design Course",
      issuer: "Simplilearn SkillUp",
      category: "VLSI & Semiconductor",
      skills: ["Digital VLSI", "Silicon Fabrication", "Logic Synthesis"],
      featured: false,
    },
    {
      id: "nxtwave-genai",
      name: "Generative AI Masterclass",
      issuer: "NXTWave",
      category: "Software & AI",
      skills: ["Prompt Engineering", "LLM Applications", "AI Automation"],
      featured: false,
    },
    {
      id: "python-datascience",
      name: "Python for Data Science (101)",
      issuer: "Cognitive Class (IBM) & CodeTantra",
      category: "Software & AI",
      skills: ["Python 3", "Data Structures", "Pandas", "Scientific Computing"],
      featured: false,
    },
    {
      id: "ibm-linuxone",
      name: "Enterprise Linux Systems",
      issuer: "IBM LinuxONE",
      category: "Software & AI",
      skills: ["Linux Shell", "Bash Scripting", "System Administration", "Process Control"],
      featured: true,
    },
    {
      id: "nptel-digital-embedded",
      name: "Digital Electronics, Soft Skills & Embedded Systems",
      issuer: "NPTEL (IITs / IISc)",
      category: "Core Engineering",
      skills: ["Digital Logic", "Microcontrollers", "Combinational Circuits", "Professional Communication"],
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
        "Digital Electronics & Logic Design",
        "Switching Theory & Logic Design (STLD)",
        "RTL Design & Functional Verification",
        "VLSI Design Fundamentals & CMOS Circuits",
        "Microprocessors & Embedded Systems",
        "Electronic Devices & Circuits (EDC)",
        "Computer Organization & Architecture (COA)",
        "Python Programming & Scripting",
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
