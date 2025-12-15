"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ==================================================================================
// 🛠️ ULTIMATE CONFIGURATION ZONE - CONTROL EVERY SINGLE PIXEL
// ==================================================================================

const CONFIG = {
    // --- GLOBAL SETTINGS ---
    global: {
        rope: {
            color: "#8B5A2B",
            width: 8,
            dash: "20 15",
            opacity: 0.8
        },
        background: {
            src: "/images/zone9/zone9-bg.png",
            blur: "3px", // CSS blur value
            scale: 1.06,
            overlayGradient: "radial-gradient(circle at center, transparent 0%, #083e57 100%)",
            overlayOpacity: 0.56
        }
    },

    // --- MAIN TITLE ---
    title: {
        text: "The New World Horizon",
        subtitle: "Where I stand today, what I’m chasing next, and the long-term goal ahead.",
        poeticQuote: '"Between the unknown path and the treasure ahead lies my voyage."',
        position: { top: 10, left: 0 },
        style: {
            fontSize: "text-4xl md:text-6xl", // Tailwind classes
            color: "#a3ddffff",
            subtitleColor: "#fcfefeff"
        }
    },

    // --- NODE 1: SANJI (Left) ---
    sanji: {
        pos: { top: 45, left: 20 },
        size: { mobile: 170, desktop: 300 }, // px
        label: {
            title: "Present",
            subtitle: "Learning & Building Daily",
            titleColor: "#F7EFE2",
            subtitleColor: "#C9E7F5"
        },
        chat: {
            position: "bottom",
            offsetY: 24,
            text: "I’m actively refining my craft by learning, experimenting, and building consistently. This phase is about discipline, routine, and strengthening my fundamentals."
        },
        // INTERNAL ELEMENTS
        content: {
            innerSize: "80%", // Size of the inner square relative to circle
            borderRadius: "12px", // CSS Value
            gif: "/images/zone9/cookingsanji.gif",
            overlayFx: "/images/zone9/node0-sanji-fx.png",
            overlayOpacity: 0.8,
            borderColor: "rgba(244, 233, 214, 0.1)" // #F4E9D6/10
        }
    },

    // --- NODE 2: ZORO (Center) ---
    zoro: {
        pos: { top: 53, left: 50 },
        size: { mobile: 170, desktop: 260 },
        label: {
            title: "1-Year Horizon",
            subtitle: "Find My Dream Role",
            titleColor: "#BEEFC6",
            subtitleColor: "#C9E7F5"
        },
        chat: {
            position: "bottom",
            offsetY: 4,
            text: "I’m still defining my ideal role. This year is about gaining clarity, exploring opportunities, and understanding where my skills fit best in the real world."
        },
        // INTERNAL ELEMENTS
        content: {
            innerSize: "80%",
            img: "/images/zone9/lostzoro.png",
            overlayFx: "/images/zone9/node1-zoro-fx.png",
            overlayScale: 0.9,
            borderColor: "rgba(87, 192, 106, 0.15)", // #57C06A/15
            blinkAnimation: {
                duration: 0.4,
                delay: 0.5
            }
        }
    },

    // --- NODE 3: NAMI (Right) ---
    nami: {
        pos: { top: 45, left: 80 },
        size: { mobile: 180, desktop: 280 },
        label: {
            title: "The One Piece",
            subtitle: "My Treasure",
            titleColor: "#FFEBB8", // user request might want this changed, keeping default
            subtitleColor: "#C9E7F5"
        },
        chat: {
            position: "bottom",
            offsetY: 3,
            text: "My long-term goal is to master my craft, grow into a meaningful role, and build work I’m truly proud of. This is the future I’m steadily working toward."
        },
        // INTERNAL ELEMENTS (Complex Layout)
        content: {
            borderColor: "#D8A84A",
            shadow: "0 0 60px rgba(216, 168, 74, 0.3)",
            // Layout: Left (Island) | Right (Nami)
            island: {
                src: "/images/zone9/laughtale-island.png",
                scale: 0.9,
                position: "object-middle", // CSS object-position
                pos: { top: 50, left: 40 }
            },
            nami: {
                src: "/images/zone9/nami.png",
                scale: 0.9, // Scale usually 1, but we use strict styling
                marginBottom: "-8px", // -mb-2 equivalent
                pos: { top: 70, left: 80 }
            },
            sparkles: {
                src: "/images/zone9/sparkalingstars.png",
                size: 30, // px (w-6 h-6)
                top: 70, // -top-2
                right: 70 // right-2
            },
            coins: {
                src: "/images/zone9/node3-berry-coin-variations.png",
                count: 3
            }
        }
    }
};

// ==================================================================================
// END CONFIGURATION
// ==================================================================================

// Reusable Chat Bubble
const ChatBubble = ({ config }: { config: typeof CONFIG.sanji.chat }) => {
    const isTop = config.position === "top";
    const tailClass = isTop
        ? "border-t-[6px] border-t-white/95 -bottom-[6px]"
        : "border-b-[6px] border-b-white/95 -top-[6px]";
    const style = isTop
        ? { bottom: `calc(100% + ${config.offsetY}px)` }
        : { top: `calc(100% + ${config.offsetY}px)` };

    return (
        <div
            className="absolute w-72 bg-white/95 text-black text-xs p-3 rounded-lg shadow-xl 
      pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 z-50 font-sans border-2 border-black left-1/2 -translate-x-1/2"
            style={style}
        >
            <p className="leading-tight">{config.text}</p>
            <div className={`absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent left-1/2 -translate-x-1/2 ${tailClass}`} />
        </div>
    );
};

export default function Zone9_Goals() {

    const ropePathData = useMemo(() => {
        // Screen Reference: 3840 x 2160
        const W = 3840;
        const H = 2160;
        const x1 = (CONFIG.sanji.pos.left / 100) * W;
        const y1 = (CONFIG.sanji.pos.top / 100) * H;
        const x2 = (CONFIG.zoro.pos.left / 100) * W;
        const y2 = (CONFIG.zoro.pos.top / 100) * H;
        const x3 = (CONFIG.nami.pos.left / 100) * W;
        const y3 = (CONFIG.nami.pos.top / 100) * H;
        return `M ${x1} ${y1} Q ${x2} ${y2}, ${x3} ${y3}`;
    }, []);

    return (
        <section className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-slate-950">

            {/* GLOBAL BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={CONFIG.global.background.src}
                    fill
                    alt="Horizon Background"
                    className="object-cover"
                    style={{
                        filter: `blur(${CONFIG.global.background.blur})`,
                        transform: `scale(${CONFIG.global.background.scale})`
                    }}
                    priority
                />
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: CONFIG.global.background.overlayGradient,
                        opacity: CONFIG.global.background.overlayOpacity
                    }}
                />
            </div>

            {/* TITLE */}
            <div
                className="absolute w-full z-50 text-center pointer-events-none"
                style={{
                    top: `${CONFIG.title.position.top}%`,
                    left: `${CONFIG.title.position.left}%`
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 0.95, y: 0 }}
                    transition={{ duration: 1 }}
                    className={`${CONFIG.title.style.fontSize} font-sans font-bold tracking-wider drop-shadow-lg uppercase`}
                    style={{ color: CONFIG.title.style.color }}
                >
                    {CONFIG.title.text}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.88 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg md:text-2xl mt-4 font-sans font-medium text-[#C9E7F5]"
                >
                    {CONFIG.title.subtitle}
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-sm md:text-lg italic mt-2 font-serif text-[#fcfefeff]/70"
                >
                    {CONFIG.title.poeticQuote}
                </motion.p>
            </div>

            {/* NODES CONTAINER */}
            <div className="absolute inset-0 z-20">

                {/* ROPE */}
                <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: CONFIG.global.rope.opacity }}>
                    <svg className="w-full h-full" viewBox="0 0 3840 2160" preserveAspectRatio="none">
                        <path
                            d={ropePathData}
                            fill="none"
                            stroke={CONFIG.global.rope.color}
                            strokeWidth={CONFIG.global.rope.width}
                            strokeDasharray={CONFIG.global.rope.dash}
                        />
                    </svg>
                    {/* Animated Arrows (keeping specific implementation hidden or hardcoded usually fine, but strictly not 'configurable' unless exposed) */}
                    {/* Simplified arrow logic for cleaner code, hardcoded 'rope-arrow.png' usage here for now unless user asks deeper */}
                </div>


                {/* --- NODE 1: SANJI --- */}
                <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group"
                    style={{ top: `${CONFIG.sanji.pos.top}%`, left: `${CONFIG.sanji.pos.left}%` }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <ChatBubble config={CONFIG.sanji.chat} />

                    {/* Node Circle */}
                    <div
                        className="rounded-full relative flex items-center justify-center bg-gradient-to-r from-white/10 to-transparent shadow-2xl border-2"
                        style={{ borderColor: CONFIG.sanji.content.borderColor }}
                    >
                        <style jsx>{`
                    div { width: ${CONFIG.sanji.size.mobile}px; height: ${CONFIG.sanji.size.mobile}px; }
                    @media (min-width: 500px) {
                        div { width: ${CONFIG.sanji.size.desktop}px; height: ${CONFIG.sanji.size.desktop}px; }
                    }
                 `}</style>

                        {/* Internal Content */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                width: CONFIG.sanji.content.innerSize,
                                height: CONFIG.sanji.content.innerSize,
                                borderRadius: CONFIG.sanji.content.borderRadius
                            }}
                        >
                            <img src={CONFIG.sanji.content.gif} className="w-full h-full object-cover" />
                            <div
                                className="absolute inset-0 bg-cover mix-blend-screen pointer-events-none"
                                style={{
                                    backgroundImage: `url(${CONFIG.sanji.content.overlayFx})`,
                                    opacity: CONFIG.sanji.content.overlayOpacity
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <h3 className="font-bold text-lg uppercase tracking-widest" style={{ color: CONFIG.sanji.label.titleColor }}>
                            {CONFIG.sanji.label.title}
                        </h3>
                        <p className="italic text-xs md:text-sm" style={{ color: CONFIG.sanji.label.subtitleColor }}>
                            {CONFIG.sanji.label.subtitle}
                        </p>
                    </div>
                </motion.div>


                {/* --- NODE 2: ZORO --- */}
                <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group"
                    style={{ top: `${CONFIG.zoro.pos.top}%`, left: `${CONFIG.zoro.pos.left}%` }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <ChatBubble config={CONFIG.zoro.chat} />

                    <div
                        className="rounded-full relative flex items-center justify-center bg-gradient-to-r from-white/10 to-transparent shadow-2xl border-2"
                        style={{ borderColor: CONFIG.zoro.content.borderColor }}
                    >
                        <style jsx>{`
                    div { width: ${CONFIG.zoro.size.mobile}px; height: ${CONFIG.zoro.size.mobile}px; }
                    @media (min-width: 500px) {
                        div { width: ${CONFIG.zoro.size.desktop}px; height: ${CONFIG.zoro.size.desktop}px; }
                    }
                 `}</style>

                        <div className="relative flex items-center justify-center" style={{ width: CONFIG.zoro.content.innerSize, height: CONFIG.zoro.content.innerSize }}>
                            <div className="relative w-full h-full">
                                <motion.div
                                    className="w-full h-full relative"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{
                                        duration: CONFIG.zoro.content.blinkAnimation.duration,
                                        repeat: Infinity,
                                        repeatDelay: CONFIG.zoro.content.blinkAnimation.delay,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Image src={CONFIG.zoro.content.img} fill alt="Zoro" className="object-contain" />
                                </motion.div>
                                <div
                                    className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                                    style={{
                                        backgroundImage: `url(${CONFIG.zoro.content.overlayFx})`,
                                        transform: `scale(${CONFIG.zoro.content.overlayScale})`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <h3 className="font-bold text-lg uppercase tracking-widest" style={{ color: CONFIG.zoro.label.titleColor }}>{CONFIG.zoro.label.title}</h3>
                        <p className="italic text-xs md:text-sm" style={{ color: CONFIG.zoro.label.subtitleColor }}>{CONFIG.zoro.label.subtitle}</p>
                    </div>
                </motion.div>


                {/* --- NODE 3: NAMI --- */}
                <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group"
                    style={{ top: `${CONFIG.nami.pos.top}%`, left: `${CONFIG.nami.pos.left}%` }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <ChatBubble config={CONFIG.nami.chat} />

                    <div
                        className="rounded-full relative flex items-center justify-center bg-gradient-to-r from-white/10 to-transparent border-2 overflow-hidden"
                        style={{
                            borderColor: CONFIG.nami.content.borderColor,
                            boxShadow: CONFIG.nami.content.shadow
                        }}
                    >
                        <style jsx>{`
                    div { width: ${CONFIG.nami.size.mobile}px; height: ${CONFIG.nami.size.mobile}px; }
                    @media (min-width: 500px) {
                        div { width: ${CONFIG.nami.size.desktop}px; height: ${CONFIG.nami.size.desktop}px; }
                    }
                 `}</style>

                        <div className="relative w-[90%] h-[60%] flex items-end justify-center">
                            {/* Island */}
                            <div
                                className="absolute w-1/2 h-full transition-all duration-300 ease-in-out"
                                style={{
                                    top: `${CONFIG.nami.content.island.pos.top}%`,
                                    left: `${CONFIG.nami.content.island.pos.left}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <Image
                                    src={CONFIG.nami.content.island.src} fill alt="Laugh Tale Island" className={`object-contain ${CONFIG.nami.content.island.position}`}
                                    style={{ transform: `scale(${CONFIG.nami.content.island.scale})` }}
                                />
                            </div>
                            {/* Nami */}
                            <div
                                className="absolute w-1/2 h-[60%] transition-all duration-300 ease-in-out"
                                style={{
                                    top: `${CONFIG.nami.content.nami.pos.top}%`,
                                    left: `${CONFIG.nami.content.nami.pos.left}%`,
                                    transform: 'translate(-50%, -50%)',
                                    marginBottom: CONFIG.nami.content.nami.marginBottom
                                }}
                            >
                                <Image
                                    src={CONFIG.nami.content.nami.src} fill alt="Nami Character" className="object-contain object-bottom drop-shadow-lg"
                                    style={{ transform: `scale(${CONFIG.nami.content.nami.scale})` }}
                                />
                            </div>
                            {/* Sparkles */}
                            <motion.div
                                className="absolute"
                                style={{
                                    width: CONFIG.nami.content.sparkles.size,
                                    height: CONFIG.nami.content.sparkles.size,
                                    top: CONFIG.nami.content.sparkles.top,
                                    right: CONFIG.nami.content.sparkles.right
                                }}
                                animate={{ rotate: [-10, 10, -10], scale: [0.9, 1.1, 0.9] }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image src={CONFIG.nami.content.sparkles.src} fill alt="Sparkles Effect" className="object-contain" />
                            </motion.div>
                        </div>

                        {/* Coins */}
                        <div className="absolute inset-[-50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            {[...Array(CONFIG.nami.content.coins.count)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-8 h-8 md:w-10 md:h-10"
                                    initial={{ y: 0, opacity: 0 }}
                                    whileInView={{ y: -60, opacity: 1 }}
                                    animate={{ y: [-20, -100], opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                    style={{
                                        top: '50%',
                                        left: `${30 + i * 20}%`,
                                        backgroundImage: `url(${CONFIG.nami.content.coins.src})`,
                                        backgroundSize: 'contain'
                                    }}
                                />
                            ))}
                        </div>

                    </div>



                    <div className="mt-4 text-center">
                        <h3 className="font-bold text-lg uppercase tracking-widest" style={{ color: CONFIG.nami.label.titleColor }}>{CONFIG.nami.label.title}</h3>
                        <p className="italic text-xs md:text-sm" style={{ color: CONFIG.nami.label.subtitleColor }}>{CONFIG.nami.label.subtitle}</p>
                    </div>
                </motion.div>

            </div>

            {/* OPTIONAL: Subtly placed bottom line */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-20 left-0 w-full text-center z-40 pointer-events-none"
            >
                <p className="text-xs md:text-sm text-[#fcfefeff]/70 font-serif tracking-widest uppercase">
                    This journey is ongoing, and every step forward matters.
                </p>
            </motion.div>

        </section>
    );
}
