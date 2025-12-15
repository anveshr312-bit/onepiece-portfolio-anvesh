"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface VariantLungeProps {
    base: string;
    yokai: string;
    name: string;
    weakness: string;
    isActive?: boolean;
}

export default function VariantLunge({ base, yokai, name, weakness, isActive }: VariantLungeProps) {
    return (
        <motion.div
            className="relative w-full h-full rounded-xl overflow-visible perspective-1000"
            initial="idle"
            whileHover="hover"
            whileFocus="hover"
            animate={isActive ? "hover" : "idle"}
        >
            {/* Card Frame */}
            <div className="absolute inset-0 z-10 border border-white/10 bg-gradient-to-b from-white/5 to-black/90 backdrop-blur-[1px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.svg')] mix-blend-overlay" />
            </div>

            {/* Yokai Form (Lunge) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={{
                    idle: {
                        opacity: 0.08,
                        y: -60,
                        scale: 0.9,
                        filter: "grayscale(100%)"
                    },
                    hover: {
                        opacity: 0.22,
                        y: -10,
                        scale: 1.18,
                        filter: "grayscale(0%)",
                        transition: {
                            type: "spring",
                            stiffness: 150,
                            damping: 18,
                            mass: 1.2
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

            {/* Light Swipe Overlay */}
            <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:animate-shine" />
            </div>

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
                <motion.h3
                    className="text-2xl font-serif tracking-widest text-white drop-shadow-lg mb-1"
                    variants={{
                        idle: { scale: 1 },
                        hover: { scale: 1.05, color: "#fef3c7" }
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
                    <p className="text-xs text-gray-300 tracking-[0.2em] font-sans uppercase mt-2">
                        {weakness}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
