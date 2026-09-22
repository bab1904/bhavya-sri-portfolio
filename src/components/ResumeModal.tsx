"use client";

import React, { useRef } from "react";
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, CheckCircle, Cpu, Award } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const textContent = `
===================================================================
BHAVYA SRI — VLSI PHYSICAL DESIGN & RTL ENGINEER
===================================================================
Email: ${portfolioData.personal.email}
Phone: ${portfolioData.personal.phone}
LinkedIn: ${portfolioData.personal.linkedin}
Location: ${portfolioData.personal.location}

SUMMARY
-------------------------------------------------------------------
${portfolioData.personal.aboutSummary}

EDUCATION
-------------------------------------------------------------------
${portfolioData.education
  .map(
    (e) => `* ${e.degree} in ${e.field}
  ${e.institution} (${e.period}) — ${e.grade}
  Relevant Coursework: ${e.coursework.join(", ")}`
  )
  .join("\n\n")}

EXPERIENCE
-------------------------------------------------------------------
${portfolioData.experiences
  .map(
    (exp) => `* ${exp.role} | ${exp.company} (${exp.period})
  ${exp.description}
  Key Responsibilities:
  ${exp.keyResponsibilities.map((r) => `  - ${r}`).join("\n")}
  Technologies: ${exp.technologies.join(", ")}`
  )
  .join("\n\n")}

KEY PROJECTS
-------------------------------------------------------------------
${portfolioData.projects
  .map(
    (p) => `* ${p.title}
  Category: ${p.category} | Tools: ${p.tools.join(", ")}
  Summary: ${p.summary}
  Description: ${p.description}`
  )
  .join("\n\n")}

TECHNICAL SKILLS
-------------------------------------------------------------------
${portfolioData.skillCategories
  .map(
    (cat) => `* ${cat.title}:
  ${cat.skills.map((s) => `${s.name} (${s.level})`).join(", ")}`
  )
  .join("\n")}

CERTIFICATIONS
-------------------------------------------------------------------
${portfolioData.certifications.map((c) => `* ${c.name} — ${c.issuer}`).join("\n")}

HONORS & AWARDS
-------------------------------------------------------------------
${portfolioData.honors.map((h) => `* ${h.title} (${h.year}) — ${h.issuer}\n  ${h.description}`).join("\n")}
===================================================================
    `;

    const blob = new Blob([textContent.trim()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Bhavya_Sri_VLSI_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0d1424] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d16]/90 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm sm:text-base font-semibold text-slate-200">
              Curriculum Vitae Preview — <span className="text-cyan-400">Bhavya Sri</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg transition-colors"
              title="Download text format"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Text</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div
          ref={resumeRef}
          className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-6 text-slate-300 text-sm font-sans bg-[#0b101c]"
        >
          {/* Header Block */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Bhavya Sri
                </h1>
                <p className="text-cyan-400 font-mono text-sm sm:text-base mt-1 font-medium">
                  Physical Design Trainee @ ChipXpert | VLSI & RTL Engineer
                </p>
              </div>
              <div className="flex flex-col gap-1 text-xs sm:text-sm text-slate-400 font-mono">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> {portfolioData.personal.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" /> {portfolioData.personal.phone}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> India
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap gap-4 text-xs font-mono">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline inline-flex items-center gap-1"
              >
                LinkedIn Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Professional Summary
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {portfolioData.personal.aboutSummary}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Technical Skills Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {portfolioData.skillCategories.map((cat, idx) => (
                <div key={idx} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-200 block mb-1.5">{cat.title}:</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[11px] font-mono border border-slate-700/50"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Experience & Traineeships
            </h3>
            <div className="space-y-4">
              {portfolioData.experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-cyan-500/40 pl-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <span className="font-bold text-white text-sm">{exp.role} — <span className="text-cyan-300">{exp.company}</span></span>
                    <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{exp.description}</p>
                  <ul className="list-disc list-inside text-xs text-slate-400 mt-1.5 space-y-0.5">
                    {exp.keyResponsibilities.slice(0, 3).map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {exp.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Education
            </h3>
            <div className="space-y-3 text-xs">
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white text-sm block">{edu.degree} — {edu.field}</span>
                      <span className="text-slate-400">{edu.institution} | {edu.location}</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-semibold">{edu.grade}</span>
                  </div>
                  <div className="mt-2 text-slate-400">
                    <span className="font-medium text-slate-300">Relevant Coursework: </span>
                    {edu.coursework.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-2">
                <Award className="w-3.5 h-3.5" /> Honors & Awards
              </h3>
              <div className="space-y-2 text-xs">
                {portfolioData.honors.map((h) => (
                  <div key={h.id} className="p-2.5 bg-amber-950/20 border border-amber-500/20 rounded-lg">
                    <span className="font-bold text-amber-300 block">{h.title}</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5" /> Key Certifications (16+)
              </h3>
              <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs space-y-1">
                {portfolioData.certifications.slice(0, 5).map((c) => (
                  <div key={c.id} className="text-slate-300 flex items-center justify-between text-[11px]">
                    <span className="truncate pr-2 font-medium">• {c.name}</span>
                    <span className="text-slate-400 font-mono text-[10px] shrink-0">{c.issuer}</span>
                  </div>
                ))}
                <span className="text-[10px] text-cyan-400 font-mono block pt-1">
                  + 11 more industry & academy accreditations
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#090d16] flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>Bhavya Sri • Physical Design & RTL Engineer</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
