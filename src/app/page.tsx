"use client";

import React, { useState } from "react";
import SiliconBackground from "@/components/SiliconBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 relative overflow-hidden">
      {/* Background Silicon Grid & Ambient Glows */}
      <SiliconBackground />

      {/* Top Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Page Flow Sections */}
      <div className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <Highlights />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
        <Footer />
      </div>

      {/* Full Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </main>
  );
}
