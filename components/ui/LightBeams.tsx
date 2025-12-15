"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function LightBeams() {
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-screen">
            {/* Main Beams */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[150%] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl origin-top animate-beam-sway" />

            {/* Shimmering Rays */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute top-[-10%] bg-gradient-to-b from-white/20 to-transparent w-[2px] h-[120%] blur-[1px]"
                    style={{
                        left: `${40 + i * 10}%`,
                        transform: `rotate(${(i - 1) * 15}deg)`,
                    }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scaleY: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                />
            ))}
        </div>
    );
}
