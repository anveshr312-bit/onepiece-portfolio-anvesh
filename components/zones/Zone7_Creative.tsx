"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { PenTool, BookOpen, Music } from "lucide-react";
import Image from "next/image";

// ==================================================================================
//  ZONE 7 CONFIGURATION - EDIT THIS SECTION TO CUSTOMIZE LAYOUT & ASSETS
// ==================================================================================
const ZONE7_CONFIG = {
    // --- Section Settings ---
    section: {
        paddingY: "py-0 md:py-0", // Removed padding to fit screen exactly
        backgroundColor: "bg-[#e0f7fa]", // Fallback background color
        gradientOverlay: "linear-gradient(to bottom, rgba(0, 40, 80, 0.45), rgba(0, 80, 160, 0.35))", // Ocean overlay
    },

    // --- Header Settings ---
    header: {
        title: "THE STRAW HAT CREATIVE COVE",
        subtitle: "“A place where imagination sets sail.”",
        description: "Creative practices that shape how I think, design, and solve problems.",
        titleColor: "from-blue-900 via-blue-800 to-blue-950", // Gradient text
        subtitleColor: "text-slate-100",
    },

    // --- Background Assets ---
    backgrounds: {
        mainOcean: {
            src: "/images/zone7/[BG-01].png",
            opacity: 0.9,
        },
        emblem: {
            src: "/images/zone7/[EMB-01].png",
            size: "w-64 h-64 md:w-96 md:h-96", // Increased size for background effect
            opacity: 0.15, // Lower opacity since it's now a background element
        }
    },

    // --- Hobby Cards Configuration ---
    cards: [
        // 1. Usopp - Sketching
        {
            id: "usopp",
            title: "Sketching",
            description: "Sketching helps me visualize ideas early, explore layouts quickly, and communicate concepts before jumping into code.",
            icon: <PenTool className="w-8 h-8" />,
            assets: {
                bg: "/images/zone7/[BG-02].png",
                silhouette: "/images/zone7/Usopp Silhouette.png",
                decor: "/images/zone7/[DECOR-01].png",
                particles: "/images/zone7/FX-02A-Usopp.png",
                iconRef: "[ICO-01: Sketching]",
            },
            theme: {
                titleColor: "text-orange-600",
                bgColor: "bg-[#f4e4bc]",
                glowColor: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]",
                borderColor: "text-orange-900 border-orange-900/20",
                iconWrapperColor: "text-orange-800",
                decorBlendMode: "opacity-75 mix-blend-overlay", // Reduced transparency (was 90)
            },
            layout: {
                silhouette: {
                    position: "top-0 right-0",
                    translate: "translate-x-8 -translate-y-2",
                    width: 300,
                    height: 300,
                }
            }
        },
        // 2. Robin - Reading (Template for balance)
        {
            id: "robin",
            title: "Reading",
            description: "Reading expands my perspective, strengthens critical thinking, and improves how I understand users, stories, and complex ideas.",
            icon: <BookOpen className="w-8 h-8" />,
            assets: {
                bg: "/images/zone7/[BG-03].png",
                silhouette: "/images/zone7/Robin Silhouette.png",
                decor: "/images/zone7/[DECOR-02].png",
                particles: "/images/zone7/FX-02B-Robin.png",
                iconRef: "[ICO-02: Reading]",
            },
            theme: {
                titleColor: "text-purple-700",
                bgColor: "bg-[#eaddcf]",
                glowColor: "group-hover:shadow-[0_0_40px_rgba(147,51,234,0.5)]",
                borderColor: "text-purple-900 border-purple-900/20",
                iconWrapperColor: "text-purple-900",
                decorBlendMode: "opacity-70 mix-blend-color-burn",
            },
            layout: {
                silhouette: {
                    position: "top-0 right-0",
                    translate: "translate-x-8 -translate-y-2",
                    width: 300,
                    height: 300,
                }
            }
        },
        // 3. Brook - Story Writing
        {
            id: "brook",
            title: "Story Writing",
            description: "Story writing sharpens my ability to structure ideas, create engaging narratives, and design experiences that feel coherent and meaningful. Yohoho!",
            icon: <Music className="w-8 h-8" />,
            assets: {
                bg: "/images/zone7/[BG-04].png",
                silhouette: "/images/zone7/Brook Silhouette.png",
                decor: "/images/zone7/[DECOR-03].png",
                particles: "/images/zone7/FX-02C-Brook.png",
                iconRef: "[ICO-03: Writing]",
            },
            theme: {
                titleColor: "text-cyan-600",
                bgColor: "bg-[#fff8e1]",
                glowColor: "group-hover:shadow-[0_0_40px_rgba(8,145,178,0.5)]",
                borderColor: "text-cyan-900 border-cyan-900/20",
                iconWrapperColor: "text-cyan-700",
                decorBlendMode: "opacity-20 mix-blend-hard-light", // Significantly reduced (was 40)
            },
            layout: {
                silhouette: {
                    position: "top-0 right-0",
                    translate: "translate-x-8 -translate-y-2",
                    width: 300,
                    height: 300,
                }
            }
        },
    ],
};
// ==================================================================================


// --- New Component: Floating Particles ---
const FloatingParticles = () => {
    // Generate 5-7 random particles
    const particles = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2, // 2px to 6px
        x: Math.random() * 100, // % position
        y: Math.random() * 100, // % position
        duration: Math.random() * 2 + 4, // 4s to 6s
        delay: Math.random() * 2,
    }));

    return (
        <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0.6, y: 0, rotate: 0 }}
                    animate={{
                        opacity: [0.6, 1, 0.6],
                        y: -30, // Drift up ~30px (interpreted as small relative movement)
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay,
                    }}
                    style={{
                        position: "absolute",
                        top: `${p.y}%`,
                        left: `${p.x}%`,
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.6)", // Subtle white/light particle
                        boxShadow: "0 0 4px rgba(255, 255, 255, 0.4)",
                    }}
                />
            ))}
        </div>
    );
};


interface HobbyCardProps {
    cardConfig: typeof ZONE7_CONFIG.cards[0];
}

const HobbyCard: React.FC<HobbyCardProps> = ({ cardConfig }) => {
    const { title, description, icon, assets, theme, layout } = cardConfig;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03, rotate: 3 }}
            // Added shadow-[0_0_15px_rgba(251,191,36,0.3)] for subtle golden edge glow (amber-400)
            className={`group relative overflow-hidden rounded-xl ${theme.bgColor} border-2 ${theme.borderColor} shadow-xl hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] cursor-pointer p-6 min-h-[380px] flex flex-col justify-between transition-all duration-300 transform`}
        >
            {/* --- Card Background Texture --- */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full opacity-40">
                    <Image
                        src={assets.bg}
                        alt="Parchment Texture"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            </div>

            {/* --- Micro-Decorations (MOVED BEHIND SILHOUETTE) z-index 1 --- */}
            <div className={`absolute top-0 left-0 w-full h-full z-[1] pointer-events-none transition-transform duration-500 group-hover:scale-110 ${theme.decorBlendMode}`}>
                <Image
                    src={assets.decor}
                    alt="Decoration Overlay"
                    fill
                    className="object-contain p-4"
                />
            </div>

            {/* --- Character Silhouette (MOVED IN FRONT OF DECOR) z-index 20 --- */}
            <div className={`absolute ${layout.silhouette.position || "top-0 right-0"} w-64 h-64 ${layout.silhouette.translate} opacity-20 group-hover:opacity-70 transition-opacity duration-500 bg-blend-multiply z-[20]`}>
                <Image
                    src={assets.silhouette}
                    alt={`${title} silhouette`}
                    width={layout.silhouette.width}
                    height={layout.silhouette.height}
                    className="object-contain w-full h-full"
                />
            </div>

            {/* --- Floating Particles (New Animation) --- */}
            <FloatingParticles />

            {/* --- Particle Effects (Static background particles) --- */}
            <div className="absolute inset-0 z-[3] pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-700 mix-blend-screen">
                <Image
                    src={assets.particles}
                    alt="Particle Effects"
                    fill
                    className="object-cover"
                />
            </div>

            {/* --- Border/Ripple Animation Effect --- */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl z-[4]" style={{ color: "currentColor" }} />

            {/* Content Container - Modified Layout */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Top Section: Title & Description */}
                <div className="max-w-[70%] pt-2">
                    <h3 className={`text-2xl font-heading font-black ${theme.titleColor} mb-2`}>{title}</h3>
                    <p className="font-serif text-slate-800 leading-relaxed text-[15px] opacity-90 font-medium tracking-wide text-left">
                        {description}
                    </p>
                    {/* Hover Decoration Line - Moved here */}
                    <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-current ${theme.titleColor} opacity-60 mt-2`} />
                </div>

                {/* Bottom Section: Icon (Right Aligned) */}
                <div className="self-end mt-4">
                    <div className={`w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-inner ${theme.iconWrapperColor} group-hover:scale-115 transition-transform duration-300 ring-4 ring-white/30`}>
                        {icon}
                        <span className="sr-only">{assets.iconRef}</span>
                    </div>
                </div>
            </div>

            {/* Ropes/Corner Decors */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-400/60 rounded-tl-sm z-[20]" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-400/60 rounded-tr-sm z-[20]" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-400/60 rounded-bl-sm z-[20]" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-400/60 rounded-br-sm z-[20]" />

            {/* Outer Glow on Hover */}
            <div className={`absolute inset-0 rounded-xl transition-shadow duration-300 pointer-events-none ${theme.glowColor}`} />
        </motion.div>
    );
};

export default function Zone7_Creative() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section
            ref={containerRef}
            /* vertical scroll fix: use h-screen and overflow-hidden, remove excess padding */
            className={`relative h-screen overflow-hidden ${ZONE7_CONFIG.section.backgroundColor} flex flex-col justify-center items-center`}
        >
            {/* --- Main Background Layer --- */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={ZONE7_CONFIG.backgrounds.mainOcean.src}
                    alt="Creative Cove Ocean"
                    fill
                    className="object-cover"
                    style={{ opacity: ZONE7_CONFIG.backgrounds.mainOcean.opacity }}
                    priority
                />

                {/* Configurable Gradient Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: ZONE7_CONFIG.section.gradientOverlay
                    }}
                />
            </div>

            {/* --- Foreground Ambient Particles [FX-01/02] --- */}
            <div className="absolute inset-0 z-[5] pointer-events-none">
                <div className="absolute inset-0 opacity-40 bg-repeat animate-pulse">
                    {/* <Image src="/images/zone7/[FX-01].png" alt="Particles" fill className="object-cover" /> */}
                </div>
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
                {/* Header with Centered/Behind Emblem */}
                <div className="relative text-center mb-16 w-full flex flex-col items-center justify-center">
                    {/* Emblem - Absolute Behind */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: ZONE7_CONFIG.backgrounds.emblem.opacity, scale: 1 }}
                        viewport={{ once: true }}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${ZONE7_CONFIG.backgrounds.emblem.size} -z-10`}
                    >
                        <Image
                            src={ZONE7_CONFIG.backgrounds.emblem.src}
                            alt="Creative Emblem"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Title Text */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`relative z-10 text-4xl md:text-7xl font-heading font-extrabold text-blue-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] tracking-wide bg-clip-text text-transparent bg-gradient-to-b ${ZONE7_CONFIG.header.titleColor}`}
                    >
                        {ZONE7_CONFIG.header.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={`relative z-10 text-lg md:text-2xl font-serif italic font-medium tracking-wide drop-shadow-md ${ZONE7_CONFIG.header.subtitleColor} mt-4`}
                    >
                        {ZONE7_CONFIG.header.subtitle}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10 text-base md:text-lg font-sans text-slate-200/90 mt-2 tracking-wide drop-shadow-sm max-w-2xl mx-auto"
                    >
                        {ZONE7_CONFIG.header.description}
                    </motion.p>
                </div>

                {/* Hobby Cards Grid - Dynamically Generated from Config */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ staggerChildren: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto perspective-1000 w-full"
                >
                    {ZONE7_CONFIG.cards.map((card) => (
                        <HobbyCard key={card.id} cardConfig={card} />
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
