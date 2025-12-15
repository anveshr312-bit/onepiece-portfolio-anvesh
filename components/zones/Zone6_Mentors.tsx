"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useTime, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Anchor, Book, Flame, Sword, Hammer, Compass } from "lucide-react";

// --- TYPES ---
type IslandId = "shanks" | "sabo" | "ace" | "rayleigh" | "gaban";

interface IslandData {
    id: IslandId;
    name: string;
    mentor: string;
    role: string;
    theme: string;
    desc: string;
    quote: string;
    mapImg: string;
    sceneImg: string;
    charImg: string;
    icon: React.ElementType;
    x: string; // Map position X (%)
    y: string; // Map position Y (%)
    color: string;
}

// --- DATA ---
const ISLANDS: IslandData[] = [
    {
        id: "shanks",
        name: "Calm Waters",
        mentor: "Shanks",
        role: "The Anchor",
        theme: "Confidence",
        desc: "Developing confidence by staying calm under uncertainty, making decisions without panic, and focusing on clarity over noise.",
        quote: "Panic is the enemy. Confidence is the anchor.",
        mapImg: "/images/zone6/island_shanks.png",
        sceneImg: "/images/zone6/scene_shanks.png",
        charImg: "/images/zone6/char_shanks.png",
        icon: Anchor,
        x: "15%",
        y: "65%",
        color: "text-red-400",
    },
    {
        id: "sabo",
        name: "Harbor of Discipline",
        mentor: "Sabo",
        role: "The Planner",
        theme: "Discipline",
        desc: "Building discipline through planning, consistency, and showing up daily, even when motivation fades.",
        quote: "A plan without action is just a dream.",
        mapImg: "/images/zone6/island_sabo.png",
        sceneImg: "/images/zone6/scene_sabo.png",
        charImg: "/images/zone6/char_sabo.png",
        icon: Book,
        x: "30%",
        y: "35%",
        color: "text-blue-400",
    },
    {
        id: "ace",
        name: "Flames of Passion",
        mentor: "Ace",
        role: "The Drive",
        theme: "Passion",
        desc: "Learning to channel passion productively, balancing ambition and energy without burning out over time.",
        quote: "Live a life with no regrets.",
        mapImg: "/images/zone6/island_ace.png",
        sceneImg: "/images/zone6/scene_ace.png",
        charImg: "/images/zone6/char_ace.png",
        icon: Flame,
        x: "50%",
        y: "55%",
        color: "text-orange-400",
    },
    {
        id: "rayleigh",
        name: "Reef of Mastery",
        mentor: "Rayleigh",
        role: "The Mentor",
        theme: "Mastery",
        desc: "Focusing on technical depth by strengthening fundamentals, refining skills, and understanding concepts beyond surface-level usage.",
        quote: "Haki blooms in the heat of battle.",
        mapImg: "/images/zone6/island_rayleigh.png",
        sceneImg: "/images/zone6/scene_rayleigh.png",
        charImg: "/images/zone6/char_rayleigh.png",
        icon: Sword,
        x: "70%",
        y: "25%",
        color: "text-teal-400",
    },
    {
        id: "gaban",
        name: "Workshop of Craft",
        mentor: "Gaban",
        role: "The Builder",
        theme: "Craft",
        desc: "Improving craftsmanship through focused practice, attention to detail, and respect for clean, well-built work.",
        quote: "Every strike shapes the future.",
        mapImg: "/images/zone6/island_gaban.png",
        sceneImg: "/images/zone6/scene_gaban.png",
        charImg: "/images/zone6/char_gaban.png",
        icon: Hammer,
        x: "85%",
        y: "60%",
        color: "text-yellow-400",
    },
];

// Path string for the ship (same as before, scaled 1920x1080)
const PATH_DATA = "M -100,500 C 300,800 500,100 900,300 C 1300,500 1500,800 1800,500 C 2100,200 2300,900 2600,600";

export default function Zone6_Mentors() {
    const [activeIsland, setActiveIsland] = useState<IslandData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // --- MAP VIEW ---
    // If activeIsland is null, we show the map.
    // If activeIsland is set, we animate to the Island View.

    return (
        <section className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-[#0a192f] font-sans">
            <AnimatePresence mode="wait">
                {!activeIsland ? (
                    <MapView key="map-view" onSelect={setActiveIsland} />
                ) : (
                    <IslandView key="island-view" island={activeIsland} onBack={() => setActiveIsland(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}

// --- SUB-COMPONENTS ---

function MapView({ onSelect }: { onSelect: (i: IslandData) => void }) {
    // Ship Movement Logic (reusing logic from previous step)
    const time = useTime();
    // We use a CSS variable or Framer Motion value for the ship position?
    // Let's stick to the SVG animateMotion for robustness we established.

    return (
        <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2, filter: "blur(10px)", transition: { duration: 0.8 } }} // Zoom IN effect on exit
            transition={{ duration: 1 }}
        >
            {/* 1. Map Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/zone6/map_bg_v2.png" // Updated to Cartography style
                    alt="World Map"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Vignette & Texture Overlay */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 bg-[url('/textures/paper-grain.png')] opacity-30 mix-blend-overlay pointer-events-none" />
            </div>

            {/* 2. Route & Ship (SVG) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="none">
                    <defs>
                        <filter id="glow-map">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <path id="voyage-path" d={PATH_DATA} />
                    </defs>

                    {/* Path Line */}
                    <motion.path
                        d={PATH_DATA}
                        fill="none"
                        stroke="#eaddcf" // Parchment white/cream
                        strokeWidth="3"
                        strokeDasharray="15 15"
                        strokeOpacity="0.6"
                        filter="url(#glow-map)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                    />

                    {/* Ship Animation */}
                    <g>
                        <image
                            href="/images/zone6/ship.png"
                            width="150"
                            height="150"
                            x="-75"
                            y="-75"
                            transform="rotate(90)"
                        >
                            <animateMotion
                                dur="30s"
                                repeatCount="indefinite"
                                rotate="auto"
                            >
                                <mpath href="#voyage-path" />
                            </animateMotion>
                        </image>
                    </g>
                </svg>
            </div>

            {/* 3. Interactive Islands */}
            <div className="absolute inset-0 z-20">
                {ISLANDS.map((island) => (
                    <div
                        key={island.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ left: island.x, top: island.y }}
                        onClick={() => onSelect(island)}
                    >
                        {/* Pulsing Marker */}
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Island Map Icon */}
                        <motion.div
                            whileHover={{ scale: 1.2, y: -10 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                        >
                            <Image
                                src={island.mapImg}
                                alt={island.name}
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Tooltip Label */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-center pointer-events-none">
                            <div className="bg-[#1a2c4e]/90 text-[#eaddcf] px-4 py-2 rounded-lg border border-[#eaddcf]/30 backdrop-blur-md shadow-xl whitespace-nowrap">
                                <p className="text-xs font-bold tracking-widest uppercase text-[#4ecdc4]">{island.theme}</p>
                                <p className="font-heading text-lg">{island.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 4. Map Title HUD */}
            <div className="absolute top-8 left-0 w-full text-center z-30 pointer-events-none">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-heading text-[#eaddcf] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-widest relative inline-block"
                >
                    VOYAGE OF MASTERY
                </motion.h2>
                <p className="text-[#eaddcf]/80 text-lg font-light tracking-wide mt-2 max-w-2xl mx-auto px-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    The qualities and skills I’m actively developing through learning and practice.
                </p>
                <p className="text-[#4ecdc4] tracking-[0.4em] uppercase font-bold text-sm mt-4">Select a Destination</p>
            </div>
        </motion.div>
    );
}

function IslandView({ island, onBack }: { island: IslandData; onBack: () => void }) {
    return (
        <motion.div
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* 1. Full Scene Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="relative w-full h-full"
                    initial={{ scale: 1.2, filter: "blur(10px)" }} // Start zoomed in slightly
                    animate={{ scale: 1, filter: "blur(0px)" }} // Settle
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <Image
                        src={island.sceneImg}
                        alt={island.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Cinematic Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply`} />
                </motion.div>
            </div>

            {/* 2. Character Silhouette (Parallax Layer) */}
            <motion.div
                className="absolute bottom-0 right-0 z-10 w-[80vh] h-[80vh] md:w-[90vh] md:h-[90vh] pointer-events-none origin-bottom-right"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <Image
                    src={island.charImg}
                    alt={island.mentor}
                    fill
                    className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                />
            </motion.div>

            {/* 3. Info Card UI (Floating Panel) */}
            <div className="absolute left-8 bottom-16 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-24 z-20 max-w-xl">
                <motion.div
                    className="relative bg-[#0f172a]/80 backdrop-blur-xl border border-[#eaddcf]/20 p-8 rounded-2xl shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    {/* Top Decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#eaddcf]/50 to-transparent" />

                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-full bg-white/10 ${island.color}`}>
                            <island.icon size={32} />
                        </div>
                        <div>
                            <h4 className="text-[#4ecdc4] uppercase tracking-[0.2em] text-sm font-bold">{island.role}</h4>
                            <h2 className="text-4xl md:text-5xl font-heading text-white">{island.theme}</h2>
                        </div>
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed mb-6 font-light">
                        {island.desc}
                    </p>

                    <blockquote className="border-l-4 border-[#4ecdc4] pl-4 italic text-white/80 text-xl font-serif mb-4">
                        "{island.quote}"
                    </blockquote>
                    <p className="text-base text-gray-300 leading-relaxed mb-8 font-light">
                        This is a trait I actively work on through learning, reflection, and real projects.
                    </p>

                    {/* Return Button */}
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-3 px-6 py-3 bg-[#eaddcf]/10 hover:bg-[#eaddcf]/20 border border-[#eaddcf]/30 rounded-full transition-all text-[#eaddcf] font-bold tracking-wider"
                    >
                        <Compass className="group-hover:rotate-180 transition-transform duration-500" />
                        BACK TO MAP
                    </button>
                </motion.div>
            </div>

            {/* 4. Particles / Overlay Effects (Optional Polish) */}
            <div className="absolute inset-0 pointer-events-none z-10 mix-blend-screen opacity-30">
                {/* Can add a generic particle CSS here later if needed */}
            </div>

        </motion.div>
    );
}
