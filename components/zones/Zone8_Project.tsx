"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Zone8_PosterCard from "./Zone8_PosterCard";
import FloatingParticle from "../ui/FloatingParticle";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Thousand Sunny",
        version: "Portfolio V1",
        bounty: "1,500,000,000",
        description: "\"This project taught me how to think about user experience as a journey, not just a collection of screens. I focused on storytelling, interaction, and smooth navigation using modern frontend tools.\"",
        image: "/images/zone8/poster_frame.png",
        links: {
            code: "https://github.com/anveshr312/onepiece-portfolio-anvesh",
            live: "/"
        },
        logEntries: [
            {
                id: "01",
                title: "Modern Frontend Stack",
                tech: "Next.js 14, TypeScript, TailwindCSS"
            },
            {
                id: "02",
                title: "Interactive User Experience",
                tech: "Framer Motion, custom animations, horizontal scroll system"
            },
            {
                id: "03",
                title: "Design Thinking",
                tech: "Narrative structure, visual hierarchy, user flow"
            }
        ]
    },
    {
        id: 2,
        title: "Mystery Vessel",
        version: "Unidentified",
        bounty: "???",
        description: "An upcoming project currently in the planning phase. This space is reserved for an idea I want to execute with stronger fundamentals, clearer scope, and real-world usefulness.",
        image: "/images/zone8/wanted_poster_1.png",
        links: {
            code: null,
            live: null,
            note: "Not deployed yet"
        },
        logEntries: [
            {
                id: "01",
                title: "Planning Phase",
                tech: "Problem definition and concept exploration"
            },
            {
                id: "02",
                title: "Tech Stack (Tentative)",
                tech: "To be finalized based on project requirements"
            },
            {
                id: "03",
                title: "Status",
                tech: "Actively ideating and learning prerequisites"
            }
        ]
    },
    {
        id: 3,
        title: "Classified",
        version: "Top Secret",
        bounty: "???",
        description: "A future experimental project reserved for when my skills mature further. Intended to push beyond comfort zones and explore more complex ideas.",
        image: "/images/zone8/wanted_poster_2.png",
        links: {
            code: null,
            live: null,
            note: "Not deployed yet"
        },
        logEntries: [
            {
                id: "01",
                title: "Reserved Slot",
                tech: "For a more advanced, future-ready project"
            },
            {
                id: "02",
                title: "Focus Area",
                tech: "Depth, complexity, and long-term learning"
            },
            {
                id: "03",
                title: "Timeline",
                tech: "To be unlocked after gaining more experience"
            }
        ]
    }
];

export default function Zone8_Project() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const currentProject = projects[currentIndex];

    // Reset to first project when leaving the zone (scrolling away)
    // We use a viewport callback on the main section container

    return (
        <motion.section
            onViewportEnter={() => setCurrentIndex(0)}
            onViewportLeave={() => setCurrentIndex(0)}
            className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden bg-[#083e57]"
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/zone8/background.png"
                    alt="Marine Archive Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-[#083e57]/70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#083e57] via-transparent to-[#083e57]/50" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

                {/* Left: Bounty Poster Card - Stack Effect */}
                <div className="relative w-[260px] md:w-[360px] lg:w-[420px] aspect-[3/4.2]">
                    <AnimatePresence>
                        {projects.map((project, index) => {
                            if (index > currentIndex) return null;

                            // Random slight rotation for "messy stack" feel, but consistent per id
                            const rotation = (project.id % 2 === 0 ? 2 : -2) + (index * 1.5);

                            return (
                                <Zone8_PosterCard
                                    key={project.id}
                                    className="absolute top-0 left-0 w-full h-full"
                                    onClick={handleNext}
                                    style={{ zIndex: index }}
                                >
                                    <motion.div
                                        initial={index === currentIndex ? { scale: 1.5, opacity: 0, y: -200, rotate: rotation + 10 } : false}
                                        animate={{ scale: 1, opacity: 1, y: 0, rotate: rotation }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 120, damping: 14 }}
                                        className="relative w-full aspect-[3/4.2] overflow-hidden rounded-sm bg-[#eaddcf]"
                                    >
                                        <Image
                                            src={project.image}
                                            alt="Bounty Poster Frame"
                                            fill
                                            className="object-cover z-20 pointer-events-none"
                                        />

                                        {/* Content Area */}
                                        <div className="absolute inset-0 flex flex-col items-center pt-[18%] px-[12%] pb-[8%] z-10">
                                            {/* WANTED Header */}
                                            <div className="w-full text-center mb-4">
                                                <h3 className="font-serif text-[#0B2340] text-4xl lg:text-5xl font-black tracking-widest uppercase opacity-90"
                                                    style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
                                                    WANTED
                                                </h3>
                                                <p className="font-serif text-[#0B2340] text-xs font-bold tracking-[0.2em] opacity-70">DEAD OR ALIVE</p>
                                            </div>

                                            {/* Portfolio Preview */}
                                            <div className="w-full aspect-square bg-[#0a0a0a] relative mb-4 border-4 border-[#0B2340]/80 shadow-inner">
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                                    <span className="font-heading text-[#0B2340] opacity-40 text-lg uppercase tracking-widest text-center px-4">
                                                        Portfolio Preview
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Project Name & Bounty */}
                                            <div className="w-full text-center mt-auto">
                                                <h2 className="font-heading text-[#0B2340] text-2xl lg:text-3xl uppercase mb-1 leading-none line-clamp-1">
                                                    {project.title}
                                                </h2>
                                                <p className="font-serif text-[#0B2340] text-sm italic opacity-80 mb-3">
                                                    {project.version}
                                                </p>
                                                <div className="border-t-2 border-[#0B2340] w-full pt-2 flex justify-between items-center px-2">
                                                    <span className="font-serif text-[#0B2340] font-bold text-xl">฿</span>
                                                    <span className="font-serif text-[#0B2340] font-black text-2xl tracking-tighter">{project.bounty}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Particles - Only for the top card */}
                                        {index === currentIndex && (
                                            <>
                                                <FloatingParticle className="top-10 left-10" delay={0} />
                                                <FloatingParticle className="bottom-20 right-10" delay={2} />
                                            </>
                                        )}
                                    </motion.div>
                                </Zone8_PosterCard>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Right: Ship Log Description - Book Flip Effect */}
                <div onClick={handleNext} className="cursor-pointer relative max-w-lg lg:w-[500px] p-8 lg:p-12 perspective-[1000px] group/log">

                    {/* New Text above the logbook - Inside layout flow to ensure visibility */}
                    <div className="w-full text-center text-[#F7EFE2]/90 font-serif italic mb-2 text-sm leading-relaxed px-4 mx-auto max-w-[90%] drop-shadow-md">
                        "Currently focused on quality over quantity. One completed project, more in active development."
                    </div>

                    <div className="relative">
                        {/* Static Background Layer (to prevent empty space during flip) */}
                        <div className="absolute inset-0 z-0 shadow-2xl rounded-sm transform lg:rotate-1">
                            <Image
                                src="/images/zone8/ship_log_parchment.png"
                                alt=""
                                fill
                                className="object-fill opacity-100 mix-blend-multiply rounded-sm"
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProject.id}
                                initial={{ rotateY: -90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: 90, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="relative z-10 transform-style-3d origin-left min-h-[400px]"
                            >
                                {/* Active Page Content */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/images/zone8/ship_log_parchment.png"
                                        alt=""
                                        fill
                                        className="object-fill opacity-100 mix-blend-multiply rounded-sm"
                                    />
                                </div>

                                <div className="relative z-20 p-6 flex flex-col h-full min-h-[450px]">
                                    <div className="flex items-center justify-between mb-6 border-b border-[#0B2340]/20 pb-4">
                                        <h2 className="text-3xl font-heading text-[#0B2340]">ship log</h2>
                                        <span className="font-serif text-[#D8A84A] font-bold opacity-80">Vol. {currentProject.id}</span>
                                    </div>

                                    <p className="text-lg text-[#0B2340] mb-6 font-serif leading-relaxed">
                                        {currentProject.description}
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        {currentProject.logEntries.map((entry) => (
                                            <div key={entry.id} className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border-2 border-[#D8A84A] flex items-center justify-center bg-[#0B2340]/5 flex-shrink-0">
                                                    <span className="font-heading text-[#0B2340] text-base">{entry.id}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#0B2340] font-serif text-sm">{entry.title}</h4>
                                                    <p className="text-xs text-[#0B2340]/70 font-serif">{entry.tech}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons - Moved here for visibility */}
                                    <div className="mt-auto pt-6 border-t border-[#0B2340]/10 flex flex-col items-center gap-4">
                                        <div className="flex gap-4 w-full justify-center">
                                            {currentProject.links.code ? (
                                                <a
                                                    href={currentProject.links.code}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-[#0B2340] text-[#F7EFE2] px-6 py-2 font-bold font-serif text-xs uppercase hover:bg-[#D8A84A] hover:text-[#0B2340] transition-colors flex items-center gap-2 shadow-sm"
                                                    onClick={(e) => e.stopPropagation()} // Prevent page flip
                                                >
                                                    <Github size={14} /> Code
                                                </a>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="bg-[#0B2340]/20 text-[#0B2340]/40 cursor-not-allowed px-6 py-2 font-bold font-serif text-xs uppercase flex items-center gap-2"
                                                    title={currentProject.links.note}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Github size={14} /> Code
                                                </button>
                                            )}

                                            {currentProject.links.live ? (
                                                <a
                                                    href={currentProject.links.live}
                                                    className="border-2 border-[#0B2340] text-[#0B2340] px-6 py-2 font-bold font-serif text-xs uppercase hover:bg-[#0B2340] hover:text-[#F7EFE2] transition-colors flex items-center gap-2"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink size={14} /> Live
                                                </a>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="border-2 border-[#0B2340]/20 text-[#0B2340]/40 cursor-not-allowed px-6 py-2 font-bold font-serif text-xs uppercase flex items-center gap-2"
                                                    title={currentProject.links.note}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink size={14} /> Live
                                                </button>
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <p className="text-[#0B2340] font-serif italic text-xs opacity-60 mb-1">
                                                More projects will appear here as I continue building.
                                            </p>
                                            <p className="text-[#0B2340]/40 text-[10px] font-serif uppercase tracking-widest animate-pulse">
                                                ( Click anywhere else to turn page )
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </motion.section>
    );
}

