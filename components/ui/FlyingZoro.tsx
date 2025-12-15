"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function FlyingZoro() {
    const [mounted, setMounted] = useState(false);
    const [config, setConfig] = useState<{ startX: string; top: string } | null>(null);

    const [showDialogue, setShowDialogue] = useState(false);

    useEffect(() => {
        // FIXED POSITION: Zone 5 Top-Left Box
        // Zone 5 is index 4 (0-indexed). Start X = 400vw.
        // User requested fixed place in the given box (top-left).
        const startX = "405vw";
        const top = "15vh";

        setConfig({ startX, top });
        setMounted(true);
    }, []);

    if (!mounted || !config) return null;

    return (
        <div
            className="absolute z-[9999] pointer-events-auto cursor-pointer w-64 h-64 hover:scale-105 transition-transform duration-300"
            style={{
                left: config.startX,
                top: config.top,
            }}
            onMouseEnter={() => setShowDialogue(true)}
            onMouseLeave={() => setShowDialogue(false)}
        >
            <div className="relative w-full h-full">
                <Image
                    src="/images/flying%20zoro.gif"
                    alt="Flying Zoro"
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>

            {/* Speech Bubble - APPEARING ABOVE */}
            <AnimatePresence>
                {showDialogue && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -10, y: 10 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            rotate: [0, -5, 5, -5, 5, 0], // Funny wiggle/shake
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                rotate: {
                                    duration: 0.5,
                                    repeat: 0,
                                    ease: "easeInOut"
                                }
                            }
                        }}
                        exit={{ opacity: 0, scale: 0, rotate: 10, y: 10 }}
                        // Changed to bottom-full to appear ABOVE
                        className="absolute bottom-[160px] left-1/2 -translate-x-1/2 mb-[30px] ml-[30px] w-[300px] bg-white text-black p-5 rounded-[20px] border-[4px] border-black shadow-2xl z-[10000]"
                    >
                        {/* Downward Pointing Tail */}
                        <div className="absolute -bottom-[12px] left-8 w-6 h-6 bg-white border-r-[4px] border-b-[4px] border-black transform rotate-45"></div>
                        {/* Mask to hide top border of tail so it blends with box */}
                        <div className="absolute bottom-[2px] left-8 w-8 h-4 bg-white transform -translate-x-[1px]"></div>

                        <p className="font-bold text-center text-sm leading-relaxed font-sans tracking-wide">
                            “East? Yeah, obviously that way. I knew that from the start. Anyone who thinks otherwise can go get lost.”
                            <span className="block mt-1 text-[10px] text-red-500 font-bold uppercase">
                                {"{ Bakayarou! East is that way --> }"}
                            </span>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
