"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  Download,
  X,
  Play,
  Pause,
  Layers,
  Building2,
  ShieldCheck,
  Cpu,
  RotateCw,
  LayoutGrid,
  Sliders,
} from "lucide-react";
import { certificatesList, Certificate } from "@/data/certificates";

export default function CertificatesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"carousel" | "flashcards" | "grid">("carousel");
  const [flippedCards, setFlippedCards] = useState<{ [id: string]: boolean }>({});
  
  // Lightbox state
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);
  const [modalZoom, setModalZoom] = useState<number>(1);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    "All",
    "VLSI & Hardware",
    "Semiconductors",
    "Software & AI",
    "Core Engineering",
  ];

  // Filtered certificates
  const filteredCerts = certificatesList.filter((cert) => {
    if (selectedCategory === "All") return true;
    return cert.category === selectedCategory;
  });

  // Ensure currentIndex stays within bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flipAllCards = () => {
    const allFlipped = filteredCerts.every((c) => flippedCards[c.id]);
    const newState: { [id: string]: boolean } = {};
    filteredCerts.forEach((c) => {
      newState[c.id] = !allFlipped;
    });
    setFlippedCards(newState);
  };

  // Next / Prev handlers with circular wrap
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredCerts.length);
  }, [filteredCerts.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredCerts.length) % filteredCerts.length);
  }, [filteredCerts.length]);

  // Auto-play interval
  useEffect(() => {
    if (isPlaying && viewMode === "carousel" && filteredCerts.length > 1) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, viewMode, handleNext, filteredCerts.length]);

  // Lightbox handlers
  const openModal = (cert: Certificate) => {
    setActiveModalCert(cert);
    setModalZoom(1);
    document.body.style.overflow = "hidden";
  };

  const closeModal = useCallback(() => {
    setActiveModalCert(null);
    setModalZoom(1);
    document.body.style.overflow = "auto";
  }, []);

  const handleModalNext = useCallback(() => {
    if (!activeModalCert) return;
    const idx = filteredCerts.findIndex((c) => c.id === activeModalCert.id);
    const nextIdx = (idx + 1) % filteredCerts.length;
    setActiveModalCert(filteredCerts[nextIdx]);
    setModalZoom(1);
  }, [activeModalCert, filteredCerts]);

  const handleModalPrev = useCallback(() => {
    if (!activeModalCert) return;
    const idx = filteredCerts.findIndex((c) => c.id === activeModalCert.id);
    const prevIdx = (idx - 1 + filteredCerts.length) % filteredCerts.length;
    setActiveModalCert(filteredCerts[prevIdx]);
    setModalZoom(1);
  }, [activeModalCert, filteredCerts]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalCert) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") handleModalNext();
        if (e.key === "ArrowLeft") handleModalPrev();
        if (e.key === "+" || e.key === "=") setModalZoom((prev) => Math.min(prev + 0.25, 3));
        if (e.key === "-") setModalZoom((prev) => Math.max(prev - 0.25, 0.75));
        if (e.key === "0" || e.key === "r") setModalZoom(1);
      } else if (viewMode === "carousel") {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalCert, closeModal, handleModalNext, handleModalPrev, handleNext, handlePrev, viewMode]);

  // 3D slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 350 : -350,
      opacity: 0,
      scale: 0.8,
      rotateY: dir > 0 ? 25 : -25,
      filter: "blur(4px)",
    }),
    center: {
      zIndex: 20,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring" as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 10,
      x: dir > 0 ? -350 : 350,
      opacity: 0,
      scale: 0.8,
      rotateY: dir > 0 ? -25 : 25,
      filter: "blur(4px)",
      transition: {
        x: { type: "spring" as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const activeCert = filteredCerts[currentIndex] || filteredCerts[0];
  const prevCert = filteredCerts[(currentIndex - 1 + filteredCerts.length) % filteredCerts.length];
  const nextCert = filteredCerts[(currentIndex + 1) % filteredCerts.length];

  return (
    <section id="certifications" className="py-20 md:py-28 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/70 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>05. Industry Accreditations & Verified Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certifications & <span className="amber-gradient-text">Interactive Showcase</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              {certificatesList.length}+ verified semiconductor and VLSI credentials extracted in 300 DPI high resolution from Samsung, NIELIT MeitY, Synopsys, IBM, and leading academies.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-[#0c1322] border border-slate-800 p-1.5 rounded-2xl shadow-inner">
            <button
              onClick={() => setViewMode("carousel")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === "carousel"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>3D Slideshow</span>
            </button>

            <button
              onClick={() => setViewMode("flashcards")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === "flashcards"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flash Cards</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === "grid"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Highlights Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3.5 rounded-xl bg-[#0c1322]/80 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{certificatesList.length}+</div>
              <div className="text-[11px] text-slate-400">Total Accreditations</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0c1322]/80 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-cyan-300 font-mono">Samsung</div>
              <div className="text-[11px] text-slate-400">ISWDP Fellowship Grade II</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0c1322]/80 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-purple-300 font-mono">NIELIT MeitY</div>
              <div className="text-[11px] text-slate-400">RTL-to-GDS & eChipHub</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0c1322]/80 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-300 font-mono">100% High-Res</div>
              <div className="text-[11px] text-slate-400">300 DPI Inspection</div>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? certificatesList.length
                  : certificatesList.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                      : "bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat
                        ? "bg-slate-950/20 text-slate-950 font-extrabold"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {viewMode === "flashcards" && (
            <button
              onClick={flipAllCards}
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-400 hover:text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip All Cards</span>
            </button>
          )}

          {viewMode === "carousel" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all ${
                  isPlaying
                    ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
                title={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isPlaying ? "Autoplay On" : "Paused"}</span>
              </button>
              <span className="text-xs font-mono text-slate-400">
                Card <span className="text-amber-400 font-bold">{currentIndex + 1}</span> of {filteredCerts.length}
              </span>
            </div>
          )}
        </div>

        {/* VIEW MODE 1: 3D ANIMATED CAROUSEL / SLIDESHOW */}
        {viewMode === "carousel" && activeCert && (
          <div
            className="relative py-8"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* 3D Focal Carousel Stage */}
            <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center perspective-[1200px] overflow-hidden px-4">
              
              {/* Left Background Peek Card */}
              {prevCert && filteredCerts.length > 2 && (
                <div
                  onClick={handlePrev}
                  className="hidden md:block absolute left-4 lg:left-12 w-72 lg:w-80 aspect-[16/11] rounded-2xl bg-[#0c1322]/60 border border-slate-800/80 shadow-2xl opacity-40 scale-[0.82] -rotate-y-12 cursor-pointer hover:opacity-75 transition-all duration-300 blur-[1px] hover:blur-none overflow-hidden z-0"
                >
                  <Image
                    src={prevCert.image}
                    alt={prevCert.title}
                    fill
                    className="object-cover object-center grayscale"
                  />
                  <div className="absolute inset-0 bg-slate-950/60" />
                </div>
              )}

              {/* Center Focal Card with Smooth Spring Animation */}
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeCert.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full max-w-xl md:max-w-2xl rounded-3xl bg-[#0c1322]/95 border border-amber-500/40 shadow-[0_20px_50px_rgba(245,158,11,0.2)] overflow-hidden backdrop-blur-xl z-20 group"
                >
                  {/* Top Ambient Highlight Glow */}
                  <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                  {/* Certificate Image Stage */}
                  <div
                    onClick={() => openModal(activeCert)}
                    className="relative w-full aspect-[16/10] bg-slate-950 cursor-pointer overflow-hidden group-hover:scale-[1.01] transition-transform duration-500"
                  >
                    <Image
                      src={activeCert.image}
                      alt={activeCert.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain object-center p-2"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Category & Verified Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-amber-500/50 text-amber-300 font-semibold uppercase shadow-md">
                        {activeCert.category}
                      </span>

                      {activeCert.featured && (
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-cyan-950/90 backdrop-blur-md text-cyan-300 border border-cyan-500/50 font-bold flex items-center gap-1 shadow-md">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Featured Credential
                        </span>
                      )}
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-amber-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-4 h-4" />
                        <span>Inspect Full High-Res (300 DPI)</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Grade / Percentile Tag */}
                    {activeCert.grade && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {activeCert.grade}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                      {activeCert.title}
                    </h3>

                    {/* Issuer & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-cyan-300">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="font-semibold">{activeCert.issuer}</span>
                      </div>
                      {activeCert.date && (
                        <span className="text-slate-400 bg-slate-900/90 px-2.5 py-0.5 rounded border border-slate-800">
                          {activeCert.date}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {activeCert.description && (
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activeCert.description}
                      </p>
                    )}

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeCert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => openModal(activeCert)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold transition-all hover:border-amber-400"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Fullscreen Lightbox</span>
                      </button>

                      <a
                        href={activeCert.pngImage}
                        download={`Certificate_${activeCert.id}.png`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-slate-900"
                        title="Download 300 DPI Original"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">300 DPI PNG</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right Background Peek Card */}
              {nextCert && filteredCerts.length > 2 && (
                <div
                  onClick={handleNext}
                  className="hidden md:block absolute right-4 lg:right-12 w-72 lg:w-80 aspect-[16/11] rounded-2xl bg-[#0c1322]/60 border border-slate-800/80 shadow-2xl opacity-40 scale-[0.82] rotate-y-12 cursor-pointer hover:opacity-75 transition-all duration-300 blur-[1px] hover:blur-none overflow-hidden z-0"
                >
                  <Image
                    src={nextCert.image}
                    alt={nextCert.title}
                    fill
                    className="object-cover object-center grayscale"
                  />
                  <div className="absolute inset-0 bg-slate-950/60" />
                </div>
              )}

              {/* Directional Slide Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/90 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-amber-400 transition-all duration-200 shadow-2xl backdrop-blur-md group"
                title="Previous Certificate (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/90 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-amber-400 transition-all duration-200 shadow-2xl backdrop-blur-md group"
                title="Next Certificate (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Interactive Dot / Carousel Indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap max-w-3xl mx-auto px-4">
              {filteredCerts.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                      : "w-2 bg-slate-800 hover:bg-slate-600"
                  }`}
                  title={c.title}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW MODE 2: 3D FLIPPABLE FLASH CARDS DECK */}
        {viewMode === "flashcards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => {
              const isFlipped = !!flippedCards[cert.id];
              return (
                <div
                  key={cert.id}
                  className="perspective-[1000px] h-[450px] w-full cursor-pointer"
                  onClick={() => toggleFlip(cert.id)}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 24 }}
                    className="relative w-full h-full transform-style-3d shadow-xl rounded-3xl"
                  >
                    {/* FRONT SIDE OF FLASH CARD */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#0c1322]/95 border border-slate-800 hover:border-amber-500/50 p-6 flex flex-col justify-between shadow-2xl overflow-hidden backdrop-blur-md group">
                      {/* Top Accent Line */}
                      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-950 border border-amber-500/40 text-amber-300 font-semibold uppercase">
                            {cert.category}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400/90 flex items-center gap-1 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                            <RotateCw className="w-3 h-3" /> Click to Flip
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-2">
                          {cert.title}
                        </h3>

                        {/* Issuer */}
                        <p className="text-xs font-mono text-cyan-300 mb-4 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{cert.issuer}</span>
                        </p>

                        {/* Grade */}
                        {cert.grade && (
                          <div className="mb-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                              <CheckCircle className="w-3 h-3 text-emerald-400" /> {cert.grade}
                            </span>
                          </div>
                        )}

                        {/* Description snippet */}
                        {cert.description && (
                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                            {cert.description}
                          </p>
                        )}
                      </div>

                      {/* Front Bottom Actions */}
                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 2).map((s, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                              #{s}
                            </span>
                          ))}
                        </div>

                        <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          View Proof →
                        </span>
                      </div>
                    </div>

                    {/* BACK SIDE OF FLASH CARD (CERTIFICATE PREVIEW) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-[#080d18] border border-amber-500/50 p-5 flex flex-col justify-between shadow-2xl overflow-hidden backdrop-blur-md">
                      {/* Document Stage */}
                      <div className="relative w-full h-[65%] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-contain object-center p-1"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(cert);
                          }}
                          className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </div>

                      {/* Back Side Info */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-400">{cert.date || "Verified"}</span>
                          <span className="text-cyan-400 font-semibold">{cert.issuer}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(cert);
                            }}
                            className="text-xs font-mono text-amber-300 hover:underline flex items-center gap-1"
                          >
                            <Maximize2 className="w-3 h-3" /> Full View
                          </button>

                          <a
                            href={cert.pngImage}
                            download={`Certificate_${cert.id}.png`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" /> Download PNG
                          </a>

                          <button
                            onClick={(e) => toggleFlip(cert.id, e)}
                            className="text-xs font-mono text-slate-400 hover:text-cyan-400"
                          >
                            Flip Back ↺
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 3: FULL GRID GALLERY */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="group flex flex-col justify-between rounded-2xl bg-[#0c1322]/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] hover:-translate-y-1 overflow-hidden backdrop-blur-md relative"
              >
                <div>
                  <div
                    onClick={() => openModal(cert)}
                    className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer border-b border-slate-800/80 group-hover:border-amber-500/30"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain object-center p-1 group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 font-semibold uppercase">
                        {cert.category}
                      </span>
                      {cert.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/90 backdrop-blur-md text-cyan-300 border border-cyan-700/60 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-cyan-400" /> Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-amber-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect High-Res</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    {cert.grade && (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                          <CheckCircle className="w-3 h-3 text-emerald-400" /> {cert.grade}
                        </span>
                      </div>
                    )}

                    <h3
                      onClick={() => openModal(cert)}
                      className="text-base font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight leading-snug cursor-pointer"
                    >
                      {cert.title}
                    </h3>

                    <p className="text-xs font-mono text-cyan-300/90 mt-1.5 mb-3 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{cert.issuer}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">{cert.date || "Verified"}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(cert)}
                      className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline"
                    >
                      <Maximize2 className="w-3 h-3" /> View
                    </button>
                    <a
                      href={cert.pngImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-cyan-400 p-1"
                      title="Open full 300 DPI Original"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeModalCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl"
          >
            {/* Modal Top Toolbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-[#0c1322]/90 backdrop-blur-md z-20">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="hidden sm:flex w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate flex items-center gap-2">
                    <span>{activeModalCert.title}</span>
                    <span className="hidden md:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-500/30 text-amber-300">
                      {activeModalCert.category}
                    </span>
                  </h4>
                  <p className="text-[11px] font-mono text-cyan-300/90 truncate">
                    {activeModalCert.issuer} {activeModalCert.date ? `• ${activeModalCert.date}` : ""}
                  </p>
                </div>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setModalZoom((prev) => Math.max(prev - 0.25, 0.75))}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-mono text-slate-400 px-2">
                    {Math.round(modalZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setModalZoom((prev) => Math.min(prev + 0.25, 3))}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                    title="Zoom In (+)"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setModalZoom(1)}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 border-l border-slate-800 ml-0.5"
                    title="Reset Zoom (0)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={activeModalCert.pngImage}
                  download={`Certificate_${activeModalCert.id}.png`}
                  className="p-2 text-slate-400 hover:text-amber-300 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40"
                  title="Download High-Res 300 DPI PNG"
                >
                  <Download className="w-4 h-4" />
                </a>

                <a
                  href={activeModalCert.pngImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-cyan-300 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40"
                  title="Open Original in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/40 hover:bg-red-500/10 ml-1"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Central Viewport */}
            <div className="relative flex-1 flex items-center justify-center p-4 overflow-auto">
              <button
                onClick={handleModalPrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-amber-400 shadow-xl backdrop-blur-md"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="relative max-w-5xl max-h-[70vh] sm:max-h-[75vh] w-full h-full flex items-center justify-center overflow-auto cursor-grab active:cursor-grabbing">
                <motion.div
                  animate={{ scale: modalZoom }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative max-w-full max-h-full flex items-center justify-center p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeModalCert.pngImage || activeModalCert.image}
                    alt={activeModalCert.title}
                    className="max-h-[68vh] sm:max-h-[72vh] w-auto object-contain rounded-lg shadow-2xl border border-slate-800 select-none"
                  />
                </motion.div>
              </div>

              <button
                onClick={handleModalNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-amber-400 shadow-xl backdrop-blur-md"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Filmstrip */}
            <div className="border-t border-slate-800 bg-[#0c1322]/90 backdrop-blur-md px-4 sm:px-6 py-3">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-amber-400 font-bold">
                    {filteredCerts.findIndex((c) => c.id === activeModalCert.id) + 1} of {filteredCerts.length}
                  </span>
                  <span>•</span>
                  <span className="text-slate-200 truncate max-w-xs sm:max-w-md">{activeModalCert.title}</span>
                  {activeModalCert.grade && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{activeModalCert.grade}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
                  {filteredCerts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveModalCert(c);
                        setModalZoom(1);
                      }}
                      className={`relative w-12 h-8 rounded overflow-hidden shrink-0 transition-all border ${
                        c.id === activeModalCert.id
                          ? "border-amber-400 ring-2 ring-amber-500/40 scale-105"
                          : "border-slate-800 opacity-50 hover:opacity-100"
                      }`}
                      title={c.title}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
