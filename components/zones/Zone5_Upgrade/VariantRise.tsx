"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface VariantRiseProps {
    base: string;
    yokai: string;
    name: string;
    weakness: string;
    isActive?: boolean; // For mobile/focus state
}

export default function VariantRise({ base, yokai, name, weakness, isActive }: VariantRiseProps) {
    return (
        <motion.div
            className="relative w-full h-full rounded-xl overflow-visible"
            initial="idle"
            whileHover="hover"
            whileFocus="hover"
            animate={isActive ? "hover" : "idle"}
        >
            {/* Card Frame (CSS Fallback for panel-frame.webp) */}
            <div className="absolute inset-0 z-10 border border-white/10 bg-gradient-to-b from-white/5 to-black/90 backdrop-blur-[1px] rounded-xl overflow-hidden group-hover:border-yellow-500/30 transition-colors duration-500">
                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.svg')] mix-blend-overlay pointer-events-none" />

                {/* Gold Rim Light */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Yokai Form (Rising from behind) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={{
                    idle: {
                        opacity: 0.12,
                        y: 30,
                        scale: 0.95,
                        filter: "grayscale(100%) brightness(0.5)"
                    },
                    hover: {
                        opacity: 0.28,
                        y: -180, // Rises further above the card
                        scale: 1.08,
                        filter: "grayscale(0%) brightness(1)",
                        transition: {
                            duration: 0.7,
                            ease: [0.22, 0.9, 0.3, 1]
                        }
                    }
                }}
            >
                <Image
                    src={yokai}
                    alt=""
                    fill
                    className="object-cover object-top mix-blend-screen"
                    priority
                />
            </motion.div>

            {/* Base Character (Front) */}
            <div className="absolute inset-0 z-20 pointer-events-none p-4">
                <Image
                    src={base}
                    alt={name}
                    fill
                    className="object-contain object-bottom drop-shadow-2xl"
                    priority
                />
            </div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-6 flex flex-col items-center text-center">
                <motion.h3
                    className="text-2xl font-serif tracking-widest text-white drop-shadow-lg mb-1"
                    variants={{
                        idle: { y: 0, color: "#9ca3af" }, // gray-400
                        hover: { y: -5, color: "#fef3c7" } // yellow-100
                    }}
                >
                    {name}
                </motion.h3>

                <motion.div
                    className="overflow-hidden"
                    variants={{
                        idle: { opacity: 0, height: 0 },
                        hover: { opacity: 1, height: "auto" }
                    }}
                >
                    <div className="h-[1px] w-8 mx-auto bg-white/30 mb-2" />
                    <p className="text-xs text-gray-300 tracking-[0.2em] font-sans uppercase">
                        {weakness}
                    </p>
                </motion.div>
            </div>

            {/* Particle Burst (CSS) - Triggered on hover */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-yellow-200 rounded-full opacity-0 group-hover:animate-ping transition-opacity" />
            </div>
        </motion.div>
    );
}
