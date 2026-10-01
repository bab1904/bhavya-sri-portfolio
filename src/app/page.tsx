"use client";

import React, { useState } from "react";
import SiliconBackground from "@/components/SiliconBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import PhysicalDesignFlow from "@/components/PhysicalDesignFlow";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import WaveformInspector from "@/components/WaveformInspector";
import CertificatesCarousel from "@/components/CertificatesCarousel";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import ChatbotWidget from "@/components/ChatbotWidget";
import TerminalMode from "@/components/TerminalMode";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 relative overflow-hidden">
      {/* Background Silicon Grid & Ambient Glows */}
      <SiliconBackground />

      {/* Top Navbar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Page Flow Sections */}
      <div className="relative z-10">
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onToggleTerminal={() => setIsTerminalOpen(true)}
        />
        <Highlights />
        <About />
        <PhysicalDesignFlow />
        <Skills />
        <Experience />
        <Projects />
        <WaveformInspector />
        <CertificatesCarousel />
        <Education />
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
        <Footer />
      </div>

      {/* AI Portfolio Assistant Chatbot Widget */}
      <ChatbotWidget />

      {/* Interactive Linux Terminal Mode Modal */}
      <TerminalMode
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Full Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </main>
  );
}
