"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- Data Structure ---
const gears = [
    {
        id: "GEAR 1",
        name: "Open-Mindedness",
        desc: "Open to different ideas and perspectives.",
        image: "/images/gear 1.png",
        color: "from-blue-500 to-cyan-400",
        shadowColor: "#38bdf8",
        accent: "#0369a1",
    },
    {
        id: "GEAR 2",
        name: "Empathy",
        desc: "Understanding what others feel naturally.",
        image: "/images/gear 2.png",
        color: "from-red-500 to-pink-600",
        shadowColor: "#fb7185",
        accent: "#be123c",
    },
    {
        id: "GEAR 3",
        name: "Loyalty",
        desc: "Sticking with the team through storms.",
        image: "/images/gear 3.png",
        color: "from-orange-500 to-yellow-500",
        shadowColor: "#f97316",
        accent: "#b45309",
    },
    {
        id: "GEAR 4",
        name: "Creativity",
        desc: "Turning ideas into expressive forms.",
        image: "/images/gear 4.png",
        color: "from-purple-600 to-indigo-600",
        shadowColor: "#7c3aed",
        accent: "#6d28d9",
    },
    {
        id: "GEAR 5",
        name: "Freedom",
        desc: "Living by values, not just expectations.",
        image: "/images/gear 5.png",
        color: "from-white to-yellow-200",
        shadowColor: "#fff9c4",
        accent: "#f59e0b",
        textColor: "text-black",
    },
];

// --- Animation Variants ---
const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: [0, 0.08, 0.20, 0.32, 0.44][i],
            type: "spring",
            stiffness: 120,
            damping: 16,
        },
    }),
};

// --- VFX Components ---

const Gear1Wind = () => (
    <div className="absolute inset-[-50%] -z-10 overflow-visible pointer-events-none mix-blend-screen">
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-80"
            animate={{ x: [-20, 20, -20], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <Image src="/images/zone4/vfx_wind_streak.svg" alt="wind" fill className="object-contain" />
        </motion.div>
    </div>
);

const Gear2Steam = () => (
    <div className="absolute inset-[-80px] -z-20 overflow-visible pointer-events-none">
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bottom-0 left-1/2 w-24 h-48 origin-bottom"
                initial={{ opacity: 0, y: 20, scale: 0.2 }}
                animate={{
                    opacity: [0, 0.9, 0], // Higher opacity
                    y: -350, // Go much higher
                    scale: [0.4, 3],
                    x: Math.sin(i * 132) * 60
                }}
                transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 0.5, // Faster generation
                    ease: "easeOut"
                }}
                style={{ marginLeft: (i - 6) * 15 }}
            >
                <Image src="/images/zone4/vfx_steam_puff.svg" alt="steam" fill className="object-contain opacity-80" />
            </motion.div>
        ))}
    </div>
);

const Gear3Impact = () => (
    <div className="absolute inset-[-40%] -z-10 flex items-center justify-center pointer-events-none overflow-visible">
        <motion.div
            className="absolute w-[100%] h-[100%] rounded-full bg-orange-600/30 blur-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.9, 1.4, 1.2], opacity: [0.4, 0.1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
            className="absolute w-[90%] h-[90%] rounded-full border-4 border-orange-500/40"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
    </div>
);

const Gear4Aura = () => (
    <div className="absolute inset-[-50%] -z-10 flex items-center justify-center pointer-events-none overflow-visible">
        <motion.div
            className="w-[160%] h-[160%] relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
            <Image src="/images/zone4/vfx_ring_aura.svg" alt="aura" fill className="object-contain opacity-90 drop-shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
        </motion.div>
        <motion.div
            className="w-[130%] h-[130%] absolute"
            animate={{ rotate: -360, scale: [1, 1.1, 1] }}
            transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <Image src="/images/zone4/vfx_ring_aura.svg" alt="aura" fill className="object-contain opacity-60 mix-blend-screen" />
        </motion.div>
    </div>
);

const Gear5GodMode = () => (
    <div className="absolute inset-[-50%] z-0 pointer-events-none overflow-visible">
        {/* Rainbow/Holographic Glow - GREEN REMOVED */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-white/40 to-yellow-300/20 blur-3xl rounded-full"
            animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-10 h-10"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`
                }}
                animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 2
                }}
            >
                <Image src="/images/zone4/vfx_sparkle.svg" alt="sparkle" fill className="object-contain drop-shadow-[0_0_8px_white]" />
            </motion.div>
        ))}
    </div>
);


export default function Zone4_Gears() {
    const [activeGear, setActiveGear] = useState<string | null>(null);

    // --- Advanced Hover Animations ---
    const getHoverAnimation = (id: string) => {
        switch (id) {
            case "GEAR 1":
                return { y: -15, scale: 1.05, rotate: 1 };
            case "GEAR 2":
                // Angry vibration
                return {
                    y: -10,
                    scale: 1.05,
                    x: [0, -3, 3, -2, 2, 0],
                    transition: { x: { repeat: Infinity, duration: 0.15 } }
                };
            case "GEAR 3":
                // Balloon Inflation (Pop up and settle) - FIXED ARRAY ERROR
                return {
                    y: -20,
                    scale: 1.15,
                    transition: {
                        scale: { type: "spring", stiffness: 260, damping: 10 },
                        y: { duration: 0.3 }
                    }
                };
            case "GEAR 4":
                // Bouncing Ball (Heavy Rhythm)
                return {
                    y: [0, -60, 0],
                    scale: [1.05, 0.95, 1.05], // Squash at bottom, stretch at top
                    transition: {
                        y: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
                        scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                    }
                };
            case "GEAR 5":
                // God Mode / Reality Break - GREEN REMOVED
                return {
                    y: -40,
                    scale: 1.15,
                    rotate: [0, 5, -5, 0],
                    rotateY: [0, 15, -15, 0], // 3D wobble
                    filter: "brightness(1.3) contrast(1.1) drop-shadow(0 0 15px rgba(255,255,255,0.5))",
                    transition: {
                        rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                        rotateY: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                        filter: { repeat: Infinity, duration: 2, ease: "linear" }
                    }
                };
            default: return { y: -10, scale: 1.05 };
        }
    };

    // Screen Shake Effect for Gear 4
    const shakeX = useMotionValue(0);
    const shakeY = useMotionValue(0);

    useEffect(() => {
        if (activeGear === "GEAR 4") {
            // Initial thud
            const thud = () => {
                shakeY.set(6); // Drop screen
                setTimeout(() => shakeY.set(-4), 50); // Rebound up
                setTimeout(() => shakeY.set(0), 100); // Settle
            };

            thud(); // Immediate impact

            // Rhythmic loop
            const interval = setInterval(thud, 800); // Match new bounce duration
            return () => clearInterval(interval);
        }
    }, [activeGear, shakeY]);


    return (
        <section
            className="w-screen h-screen flex-shrink-0 relative flex flex-col items-center justify-start pt-24 md:pt-28 overflow-hidden bg-[#C3EAF8]"
        >
            {/* Screen Shake Wrapper */}
            <motion.div className="absolute inset-0 w-full h-full will-change-transform" style={{ x: shakeX, y: shakeY }}>

                {/* ============================================================================
                    BACKGROUND LAYERS (No Parallax, Auto-Drift)
                   ============================================================================ */}

                {/* 1. Base Sky Gradient */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/zone4/amazonlily_sky_base.png"
                        alt="Sky Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* 2. Mid Sky Clouds (Auto Drift) */}
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none"
                    animate={{ x: [-30, 30] }}
                    transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                >
                    <Image
                        src="/images/zone4/amazonlily_clouds_mid1.png"
                        alt="Clouds"
                        fill
                        className="object-cover opacity-50"
                    />
                </motion.div>
                <motion.div
                    className="absolute inset-0 z-50 pointer-events-none"
                    animate={{ x: [30, -30] }}
                    transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                >
                    <Image
                        src="/images/zone4/amazonlily_clouds_mid2.png"
                        alt="Clouds"
                        fill
                        className="object-cover opacity-50"
                    />
                </motion.div>

                {/* 3. Amazon Lily Silhouette (Static) */}
                <div className="absolute bottom-0 left-0 right-0 h-[100%] z-40 pointer-events-none">
                    <Image
                        src="/images/zone4/amazonlily_island_silhouette.png"
                        alt="Amazon Lily"
                        fill
                        className="object-contain object-bottom opacity-70"
                        priority
                    />
                </div>

                {/* 4. Water Reflection Strip */}
                <div className="absolute bottom-0 left-0 right-0 h-[30%] z-25 pointer-events-none mix-blend-overlay opacity-60">
                    <Image
                        src="/images/zone4/amazonlily_water_reflection.png"
                        alt="Water Reflection"
                        fill
                        className="object-cover object-bottom"
                    />
                </div>

                {/* 5. Foreground Mist (Breathing Opacity) */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        src="/images/zone4/amazonlily_foreground_mist.png"
                        alt="Mist"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Particles Overlay */}
                <div className="absolute inset-0 z-35 pointer-events-none overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/40 rounded-full blur-[1px]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>


                {/* ============================================================================
                    CONTENT
                   ============================================================================ */}

                {/* Dynamic Gear Overlay (Tint) */}
                <motion.div
                    className="absolute inset-0 z-40 pointer-events-none transition-colors duration-500"
                    animate={{
                        background: activeGear
                            ? `radial-gradient(circle at 50% 40%, ${gears.find(g => g.id === activeGear)?.shadowColor}40 0%, rgba(0,0,0,0) 60%)`
                            : "transparent",
                    }}
                />

                <div className="container mx-auto px-4 relative z-50 flex flex-col items-center h-full">

                    {/* --- Header --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 md:mb-8 text-center relative"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg mb-2 tracking-tighter relative overflow-hidden">
                            EVOLUTION
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "200%" }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            />
                        </h2>
                        <p className="text-white/90 text-sm md:text-base max-w-lg mx-auto font-medium drop-shadow-md">
                            My strengths, embodied by the Gears.
                        </p>

                        {/* Timeline Indicator */}
                        <div className="flex justify-center gap-4 mt-4">
                            {gears.map((g, i) => (
                                <motion.div
                                    key={i}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border border-white/30 transition-colors duration-300 ${activeGear === g.id ? "bg-white text-black shadow-[0_0_10px_white]" : "bg-black/20 text-white/50"}`}
                                    animate={activeGear === g.id ? { scale: 1.2 } : { scale: 1 }}
                                >
                                    {i + 1}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- Cards Container --- */}
                    <motion.div
                        className="flex flex-col md:flex-row flex-nowrap justify-center items-center gap-2 md:gap-4 w-full max-w-7xl h-auto md:h-[400px] !overflow-visible perspective-1000"
                    >
                        {gears.map((gear, index) => (
                            <motion.div
                                key={gear.id}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                onHoverStart={() => setActiveGear(gear.id)}
                                onHoverEnd={() => setActiveGear(null)}
                                whileHover={getHoverAnimation(gear.id)}
                                className={`relative group cursor-pointer transition-all duration-500 ease-out will-change-[flex-grow] min-w-0 !overflow-visible ${activeGear === gear.id
                                    ? "w-full md:w-auto md:flex-[2.5] z-50"
                                    : "w-full md:w-auto md:flex-1 opacity-90 grayscale hover:grayscale-0 hover:opacity-100"
                                    } h-[120px] md:h-full`}
                            >
                                {/* VFX Layers */}
                                {activeGear === gear.id && (
                                    <>
                                        {gear.id === "GEAR 1" && <Gear1Wind />}
                                        {gear.id === "GEAR 2" && <Gear2Steam />}
                                        {gear.id === "GEAR 3" && <Gear3Impact />}
                                        {gear.id === "GEAR 4" && <Gear4Aura />}
                                        {gear.id === "GEAR 5" && <Gear5GodMode />}
                                    </>
                                )}

                                {/* Main Card Content */}
                                <div className="relative z-10 w-full h-full rounded-xl overflow-hidden bg-black/20 backdrop-blur-md border border-white/10 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                                    {/* Card Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-b ${gear.color} opacity-10 group-hover:opacity-30 transition-opacity duration-300`} />

                                    {/* Gear 2 Rage Overlay */}
                                    {gear.id === "GEAR 2" && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-red-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                                    )}

                                    {/* Image */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center p-2 md:p-4 transition-all duration-500 group-hover:pb-24 overflow-hidden z-10"
                                        animate={activeGear === gear.id ? { scale: 1.06 } : { scale: 1 }}
                                    >
                                        <Image
                                            src={gear.image}
                                            alt={gear.name}
                                            width={300}
                                            height={450}
                                            className="object-contain w-full h-full drop-shadow-xl"
                                            priority={index < 3}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 300px"
                                        />
                                    </motion.div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className={`text-2xl md:text-3xl font-black italic mb-1 truncate ${gear.id === "GEAR 5" ? "text-yellow-400" : "text-white/90"}`}>
                                            {gear.id}
                                        </h3>
                                        <h4 className="text-lg md:text-xl font-bold text-white mb-2 leading-none tracking-wide truncate opacity-80 group-hover:opacity-100 transition-opacity">{gear.name}</h4>

                                        {/* Description */}
                                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                                            <p className="overflow-hidden text-sm text-gray-200 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                {gear.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Border Glow */}
                                    <div className={`absolute inset-0 border border-white/10 group-hover:border-white/40 rounded-xl transition-colors duration-300 ${gear.shadowColor} group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] z-20`} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* --- Centerpiece / Pulse Bar --- */}
                    <motion.div
                        className="absolute bottom-24 md:bottom-8 left-0 right-0 h-0.5 bg-white/10 overflow-hidden max-w-4xl mx-auto rounded-full backdrop-blur-md"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            className="h-full bg-white box-shadow-[0_0_15px_white]"
                            animate={{
                                width: activeGear ? "100%" : "0%",
                                opacity: activeGear ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
