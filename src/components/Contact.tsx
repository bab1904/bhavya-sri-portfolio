"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolioData";
import confetti from "canvas-confetti";

interface ContactProps {
  onOpenResume: () => void;
}

export default function Contact({ onOpenResume }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    // Simulate sending message
    setTimeout(() => {
      setFormStatus("success");
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#06b6d4", "#f59e0b", "#10b981"],
        });
      } catch {
        // Safe fallback if confetti isn't supported
      }
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>07. Initiate Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In <span className="silicon-gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Open to Physical Design, RTL Engineering, and VLSI internship & full-time opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1322]/90 border border-slate-800 shadow-xl backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Let&apos;s build next-gen silicon together
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Whether you are hiring for an ASIC physical design team, collaborating on RTL verification, or seeking technical discussions on VLSI architectures, feel free to reach out directly.
                </p>
              </div>

              {/* Direct Info list */}
              <div className="space-y-3">
                
                {/* Email item */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">Email Address</span>
                      <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="text-xs sm:text-sm font-mono text-slate-200 hover:text-cyan-300 transition-colors"
                      >
                        {portfolioData.personal.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(portfolioData.personal.email, "Email")}
                    className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    title="Copy Email"
                  >
                    {copiedField === "Email" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone item */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">Phone / Mobile</span>
                      <a
                        href={`tel:${portfolioData.personal.phone}`}
                        className="text-xs sm:text-sm font-mono text-slate-200 hover:text-cyan-300 transition-colors"
                      >
                        {portfolioData.personal.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(portfolioData.personal.phone, "Phone")}
                    className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedField === "Phone" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* LinkedIn Direct */}
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/40 hover:bg-[#0077b5]/20 flex items-center justify-between text-slate-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0077b5]/30 flex items-center justify-center text-[#38bdf8]">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">Professional Network</span>
                      <span className="text-xs sm:text-sm font-mono text-[#38bdf8] group-hover:underline">
                        linkedin.com/in/bhavya-sri-7b5646291
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">Connect →</span>
                </a>

              </div>

              {/* View Resume CTA */}
              <div className="pt-2">
                <button
                  onClick={onOpenResume}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 text-xs font-mono font-medium text-slate-200 hover:text-cyan-300 flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Preview & Export Curriculum Vitae</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1322] border border-cyan-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Dispatch Message</span>
                </div>
                <span className="text-xs font-mono text-slate-500">Latency: &lt; 24 hrs response</span>
              </div>

              {formStatus === "success" ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Transmission Successful</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, your message has been transmitted. Bhavya will connect with you shortly.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  
                  {formStatus === "error" && (
                    <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold block">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / Recruiter"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold block">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Physical Design Opportunity / RTL Project"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">
                      Message Content <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your note, job requirement, or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-slate-200 placeholder-slate-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-3.5 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2 transform active:scale-[0.99]"
                  >
                    {formStatus === "submitting" ? (
                      <span>Synthesizing transmission...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
