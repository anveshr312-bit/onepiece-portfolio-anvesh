"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PoneglyphScene from "../3d/PoneglyphScene";
import { X } from "lucide-react";
import DecipherText from "../ui/DecipherText";

const poneglyphs = [
    {
        title: "Foundations",
        status: "Discovered",
        text: "The early arcs: basic engineering concepts, exposure to IT, and learning how to think like a problem solver.",
        color: "text-blue-400",
        borderColor: "border-blue-500/50"
    },
    {
        title: "Creativity",
        status: "Discovered",
        text: "I sketch, paint, read, and write stories. Creativity is my most natural form of expression.",
        color: "text-purple-400",
        borderColor: "border-purple-500/50"
    },
    {
        title: "Skills",
        status: "Not Found Yet",
        text: "Web development, problem solving, and building real projects. Still sailing toward these.",
        color: "text-gray-500",
        borderColor: "border-gray-700/50",
        dim: true
    },
    {
        title: "My One Piece",
        status: "Uncharted",
        text: "My dream role and the work I want to be known for. I haven’t discovered it yet, but I’m on my way.",
        color: "text-red-900",
        borderColor: "border-red-900/30",
        dim: true
    }
];

export default function Zone3_Poneglyphs() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Positions for hover titles corresponding to the 2x2 grid
    // Adjusted to be to the RIGHT of each Poneglyph
    const hoverPositions = [
        "top-[25%] left-[35%]",   // 0: Top Left -> Right of it
        "top-[25%] left-[80%]",   // 1: Top Right -> Right of it
        "bottom-[25%] left-[35%]",// 2: Bottom Left -> Right of it
        "bottom-[25%] left-[80%]" // 3: Bottom Right -> Right of it
    ];

    return (
        <section className="h-screen w-screen flex-shrink-0 relative flex items-center justify-center snap-center overflow-hidden bg-zone-3">

            {/* Hover Heading Overlay - Z-Index 0 (Behind Scene) */}
            <AnimatePresence>
                {selectedIndex === null && hoveredIndex !== null && (
                    <motion.div
                        key="hover-heading"
                        // Slide from left (-100px) to 0. Starts "behind" the poneglyph (since z-index is 0)
                        initial={{ opacity: 0, x: -100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`absolute pointer-events-none ${hoverPositions[hoveredIndex]}`}
                    >
                        <h3 className={`text-4xl font-heading font-bold ${poneglyphs[hoveredIndex].color} drop-shadow-lg bg-black/40 px-6 py-3 rounded-lg backdrop-blur-md border border-white/5`}>
                            {poneglyphs[hoveredIndex].title}
                        </h3>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Poneglyph Scene - Z-Index 10 (In Front of Heading) */}
            <div className="absolute inset-0 z-10">
                <PoneglyphScene
                    onSelect={setSelectedIndex}
                    selectedIndex={selectedIndex}
                    onHover={setHoveredIndex}
                />
            </div>

            {/* Title Overlay (Only visible when nothing selected) - Z-Index 20 */}
            <AnimatePresence>
                {selectedIndex === null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] uppercase tracking-widest text-center">
                            The Poneglyphs
                        </h2>
                        <p className="text-white/50 font-serif mt-2 text-center">Click a stone to decipher</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Details Overlay (Visible when selected) - Z-Index 30 */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0, x: -50, clipPath: "inset(0 100% 0 0)" }} // Start clipped from right
                        animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }} // Reveal to full width
                        exit={{ opacity: 0, x: -20, clipPath: "inset(0 100% 0 0)" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute right-0 top-0 h-full w-full md:w-1/2 z-30 flex flex-col justify-center p-8 md:p-16 pointer-events-none"
                    >
                        {/* Background Gradient - Localized to text area for better readability but not full screen */}
                        <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent -z-10" />

                        <div className="pointer-events-auto">
                            <button
                                onClick={() => setSelectedIndex(null)}
                                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={32} />
                            </button>

                            <div className={`border-l-4 pl-6 ${poneglyphs[selectedIndex].borderColor}`}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-sm uppercase tracking-[0.2em] text-white/40 mb-2 block"
                                >
                                    <DecipherText
                                        text={poneglyphs[selectedIndex].status}
                                        revealSpeed={10}
                                        startDelay={200}
                                    />
                                </motion.div>

                                <h3 className={`text-4xl md:text-6xl font-heading font-bold mb-6 ${poneglyphs[selectedIndex].color} drop-shadow-lg`}>
                                    <DecipherText
                                        text={poneglyphs[selectedIndex].title}
                                        revealSpeed={15}
                                        startDelay={300}
                                    />
                                </h3>

                                <div className="text-lg md:text-xl font-serif text-white/80 leading-relaxed max-w-lg min-h-[100px]">
                                    <DecipherText
                                        text={poneglyphs[selectedIndex].text}
                                        revealSpeed={5}
                                        startDelay={500}
                                    />
                                </div>

                                {poneglyphs[selectedIndex].dim && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2.5 }}
                                        className="mt-8 p-4 bg-red-900/10 border border-red-900/30 rounded text-red-400/60 font-mono text-xs"
                                    >
                                        // ENCRYPTED DATA // TRANSLATION INCOMPLETE //
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
