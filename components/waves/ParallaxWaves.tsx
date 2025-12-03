"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useScrollContext } from "../HorizontalScrollContainer";

// Wave Paths for Morphing
const WAVE_PATHS = [
    "M0,224L48,224C96,224,192,224,288,218.7C384,213,480,203,576,192C672,181,768,171,864,176C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    "M0,224L48,234.7C96,245,192,267,288,256C384,245,480,203,576,192C672,181,768,203,864,213.3C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
];

function WavePath({ color, duration = 10, delay = 0 }: { color: string, duration?: number, delay?: number }) {
    return (
        <svg
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
        >
            <motion.path
                fill={color}
                d={WAVE_PATHS[0]}
                animate={{ d: [WAVE_PATHS[0], WAVE_PATHS[1], WAVE_PATHS[2], WAVE_PATHS[0]] }}
                transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay }}
            />
        </svg>
    );
}

export default function ParallaxWaves({ children }: { children?: React.ReactNode }) {
    const { scrollXProgress, currentZone } = useScrollContext();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1, // -1 to 1
                y: (e.clientY / window.innerHeight) * 2 - 1  // -1 to 1
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Scroll Parallax (Horizontal movement based on scroll)
    // Limits adjusted to be safe (max 80% for 500vw width)
    const x1 = useTransform(scrollXProgress, [0, 1], ["0%", "-70%"]);
    const x2 = useTransform(scrollXProgress, [0, 1], ["0%", "-55%"]);
    const x3 = useTransform(scrollXProgress, [0, 1], ["0%", "-35%"]);

    // Zone 1 Height Adjustment (Waves start higher and settle down)
    const heightAdjustment = useTransform(scrollXProgress, [0, 0.15], ["-40px", "0px"]);

    // Mouse Parallax (Subtle movement based on cursor)
    const mouseX1 = mousePosition.x * 30;
    const mouseY1 = mousePosition.y * 15;

    const mouseX2 = mousePosition.x * 20;
    const mouseY2 = mousePosition.y * 10;

    const mouseX3 = mousePosition.x * 10;
    const mouseY3 = mousePosition.y * 5;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-end transition-opacity duration-700"
            style={{ opacity: currentZone === 1 ? 0 : 1 }}
        >

            {/* Layer 3: Back Wave */}
            <motion.div
                className="absolute bottom-[-80px] left-0 w-[500vw] h-[350px] opacity-40 text-ocean-300"
                style={{ x: x3, y: heightAdjustment, translateX: mouseX3, translateY: mouseY3 }}
            >
                <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <WavePath color="currentColor" duration={12} />
                </motion.div>
            </motion.div>

            {/* Layer 2: Mid Wave */}
            <motion.div
                className="absolute bottom-[-80px] left-[-10vw] w-[500vw] h-[300px] opacity-60 text-ocean-400"
                style={{ x: x2, y: heightAdjustment, translateX: mouseX2, translateY: mouseY2 }}
            >
                <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <WavePath color="currentColor" duration={10} delay={2} />
                </motion.div>
            </motion.div>

            {/* The Ship (Children) - Sandwiched between Layer 2 and 1 */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Layer 1: Front Wave */}
            <motion.div
                className="absolute bottom-[-90px] left-[-20vw] w-[500vw] h-[250px] opacity-90 text-ocean-500 z-20"
                style={{ x: x1, y: heightAdjustment, translateX: mouseX1, translateY: mouseY1 }}
            >
                <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <WavePath color="currentColor" duration={8} delay={1} />
                </motion.div>
            </motion.div>
        </div>
    );
}
