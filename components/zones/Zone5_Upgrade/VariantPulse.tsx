"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface VariantPulseProps {
    base: string;
    yokai: string;
    name: string;
    weakness: string;
    isActive?: boolean;
}

export default function VariantPulse({ base, yokai, name, weakness, isActive }: VariantPulseProps) {
    return (
        <motion.div
            className="relative w-full h-full rounded-xl overflow-visible"
            initial="idle"
            whileHover="hover"
            whileFocus="hover"
            animate={isActive ? "hover" : "idle"}
        >
            {/* Card Frame */}
            <motion.div
                className="absolute inset-0 z-10 border border-white/10 bg-gradient-to-b from-white/5 to-black/90 backdrop-blur-[1px] rounded-xl overflow-hidden"
                variants={{
                    idle: { scale: 1 },
                    hover: { scale: 1.03, transition: { duration: 0.4 } }
                }}
            >
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.svg')] mix-blend-overlay" />
            </motion.div>

            {/* Ambient Background Pulse (Behind Yokai) */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-50 animate-pulse" style={{ animationDuration: '6s' }} />
            </div>

            {/* Yokai Form (Drift) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={{
                    idle: {
                        opacity: 0.1,
                        x: 0,
                        filter: "grayscale(100%)"
                    },
                    hover: {
                        opacity: 0.2,
                        x: [0, 18, 0, -18, 0], // Lateral drift loop
                        filter: "grayscale(0%)",
                        transition: {
                            opacity: { duration: 0.3 },
                            x: { duration: 20, repeat: Infinity, ease: "linear" }
                        }
                    }
                }}
            >
                <Image
                    src={yokai}
                    alt=""
                    fill
                    className="object-cover object-center mix-blend-screen"
                />
            </motion.div>

            {/* Base Character */}
            <div className="absolute inset-0 z-20 pointer-events-none p-4">
                <Image
                    src={base}
                    alt={name}
                    fill
                    className="object-contain object-bottom drop-shadow-2xl"
                />
            </div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-6 flex flex-col items-center text-center">
                <h3 className="text-2xl font-serif tracking-widest text-white drop-shadow-lg mb-1">
                    {name}
                </h3>

                <motion.div
                    className="overflow-hidden"
                    variants={{
                        idle: { opacity: 0, height: 0 },
                        hover: { opacity: 1, height: "auto" }
                    }}
                >
                    <p className="text-xs text-gray-300 tracking-[0.2em] font-sans uppercase mt-2">
                        {weakness}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
