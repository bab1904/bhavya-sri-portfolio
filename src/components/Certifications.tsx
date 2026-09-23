"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle,
  Search,
  ShieldCheck,
  Cpu,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  Sparkles,
  Layers,
  FileText,
} from "lucide-react";
import { certificatesList, Certificate } from "@/data/certificates";

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);
  const [modalZoom, setModalZoom] = useState<number>(1);

  const categories = [
    "All",
    "VLSI & Hardware",
    "Semiconductors",
    "Software & AI",
    "Core Engineering",
  ];

  // Filtered certificates list
  const filteredCerts = certificatesList.filter((cert) => {
    const matchesCategory =
      selectedCategory === "All" || cert.category === selectedCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (cert.description && cert.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFeatured = !featuredOnly || cert.featured;

    return matchesCategory && matchesSearch && matchesFeatured;
  });

  // Lightbox navigation
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

  const handleNext = useCallback(() => {
    if (!activeModalCert) return;
    const currentIndex = filteredCerts.findIndex((c) => c.id === activeModalCert.id);
    const nextIndex = (currentIndex + 1) % filteredCerts.length;
    setActiveModalCert(filteredCerts[nextIndex]);
    setModalZoom(1);
  }, [activeModalCert, filteredCerts]);

  const handlePrev = useCallback(() => {
    if (!activeModalCert) return;
    const currentIndex = filteredCerts.findIndex((c) => c.id === activeModalCert.id);
    const prevIndex = (currentIndex - 1 + filteredCerts.length) % filteredCerts.length;
    setActiveModalCert(filteredCerts[prevIndex]);
    setModalZoom(1);
  }, [activeModalCert, filteredCerts]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalCert) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "+" || e.key === "=") setModalZoom((prev) => Math.min(prev + 0.25, 3));
      if (e.key === "-") setModalZoom((prev) => Math.max(prev - 0.25, 0.75));
      if (e.key === "0" || e.key === "r") setModalZoom(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalCert, closeModal, handleNext, handlePrev]);

  return (
    <section id="certifications" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/70 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>05. Industry Accreditations & Verified Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certifications & <span className="amber-gradient-text">Visual Showcase</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              26+ verified industry credentials extracted in 300 DPI high resolution from global semiconductor academies, Samsung, NIELIT MeitY, Synopsys, IBM, and top engineering bodies.
            </p>
          </div>

          {/* Search bar & filter toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, issuer, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-800 focus:border-amber-400 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                featuredOnly
                  ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                  : "bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{featuredOnly ? "Showing Featured" : "Featured Only"}</span>
            </button>
          </div>
        </div>

        {/* Highlights Stat Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3.5 rounded-xl bg-[#0c1322]/80 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">26+</div>
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
              <div className="text-[11px] text-slate-400">300 DPI Visual Inspection</div>
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

          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-amber-400 font-bold">{filteredCerts.length}</span> of {certificatesList.length} items
          </div>
        </div>

        {/* Certifications Visual Grid */}
        {filteredCerts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0c1322]/60 border border-slate-800">
            <Award className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No certifications match your criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try changing the search query or category filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setFeaturedOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono hover:bg-amber-500/20 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col justify-between rounded-2xl bg-[#0c1322]/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] hover:-translate-y-1 overflow-hidden backdrop-blur-md relative"
              >
                {/* Visual Certificate Card Preview */}
                <div>
                  <div
                    onClick={() => openModal(cert)}
                    className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer border-b border-slate-800/80 group-hover:border-amber-500/30"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-transparent to-black/40 opacity-70 group-hover:opacity-40 transition-opacity" />

                    {/* Top Badges */}
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

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-amber-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect High-Res</span>
                      </div>
                    </div>

                    {/* Bottom Document indicator */}
                    <div className="absolute bottom-2 right-2 z-10">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-slate-400 border border-slate-700/60 flex items-center gap-1">
                        <FileText className="w-2.5 h-2.5" /> Doc #{cert.pageNumber}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* Grade / Award Badge if present */}
                    {cert.grade && (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                          <CheckCircle className="w-3 h-3 text-emerald-400" /> {cert.grade}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      onClick={() => openModal(cert)}
                      className="text-base font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight leading-snug cursor-pointer"
                    >
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs font-mono text-cyan-300/90 mt-1.5 mb-3 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{cert.issuer}</span>
                    </p>

                    {/* Description */}
                    {cert.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {cert.description}
                      </p>
                    )}

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    {cert.date || "Verified"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(cert)}
                      className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline transition-colors"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>View</span>
                    </button>
                    <a
                      href={cert.pngImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors p-1"
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

      {/* Fullscreen High-Resolution Lightbox Modal */}
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
                {/* Zoom Controls */}
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setModalZoom((prev) => Math.max(prev - 0.25, 0.75))}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-mono text-slate-400 px-2">
                    {Math.round(modalZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setModalZoom((prev) => Math.min(prev + 0.25, 3))}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                    title="Zoom In (+)"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setModalZoom(1)}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors border-l border-slate-800 ml-0.5"
                    title="Reset Zoom (0)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* High-res Image Download / View */}
                <a
                  href={activeModalCert.pngImage}
                  download={`Certificate_${activeModalCert.id}.png`}
                  className="p-2 text-slate-400 hover:text-amber-300 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors"
                  title="Download High-Res 300 DPI PNG"
                >
                  <Download className="w-4 h-4" />
                </a>

                <a
                  href={activeModalCert.pngImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-cyan-300 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                  title="Open Original Image in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/40 hover:bg-red-500/10 transition-colors ml-1"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Central Stage */}
            <div className="relative flex-1 flex items-center justify-center p-4 overflow-auto">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-amber-400 transition-all duration-200 shadow-xl backdrop-blur-md group"
                title="Previous Certificate (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* Main Image Viewport with zoom */}
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

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-amber-400 transition-all duration-200 shadow-xl backdrop-blur-md group"
                title="Next Certificate (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Bottom Meta & Filmstrip Bar */}
            <div className="border-t border-slate-800 bg-[#0c1322]/90 backdrop-blur-md px-4 sm:px-6 py-3">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-amber-400 font-bold">
                    {filteredCerts.findIndex((c) => c.id === activeModalCert.id) + 1} of {filteredCerts.length}
                  </span>
                  <span>•</span>
                  <span className="text-slate-200">{activeModalCert.title}</span>
                  {activeModalCert.grade && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{activeModalCert.grade}</span>
                    </>
                  )}
                </div>

                {/* Interactive Filmstrip Thumbnails */}
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
                          : "border-slate-800 opacity-50 hover:opacity-100 hover:border-slate-600"
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
