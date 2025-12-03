"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import FogAnimation from "../ui/FogAnimation";

// ... (imports)

export default function Zone2_Prologue() {
    return (
        <section className="h-screen w-screen flex-shrink-0 relative flex items-center justify-center snap-center overflow-hidden bg-black">

            {/* Transition Fog Overlay - High Z-Index */}
            <motion.div
                className="absolute inset-0 z-50 pointer-events-none bg-[#bdcdd6]" // Added solid fog color background
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ amount: 0.4, once: false }}
                transition={{ duration: 4.5, ease: "easeInOut" }} // Slower duration
            >
                <FogAnimation />
            </motion.div>

            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                {/* Background Image - Fully Visible */}
                <Image
                    src="/images/prologue-bg.png"
                    alt="Prologue BG"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Subtle dark overlay for text readability only */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Ambient Fog Layers (Sea Mist) - Lower Z-Index for depth */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <motion.div
                    className="absolute inset-0 opacity-40 mix-blend-screen"
                    animate={{ x: ["-5%", "5%"] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                >
                    <Image src="/images/fog1.png" alt="Fog" fill className="object-cover" />
                </motion.div>
                <motion.div
                    className="absolute inset-0 opacity-30 mix-blend-screen"
                    animate={{ x: ["5%", "-5%"] }}
                    transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
                >
                    <Image src="/images/fog2.png" alt="Fog" fill className="object-cover" />
                </motion.div>
            </div>

            {/* Main Content Container - Grid Layout */}
            <div className="relative z-20 container mx-auto px-6 h-full grid grid-cols-1 md:grid-cols-2">

                {/* Left Column: The Pirate Note */}
                <div className="flex flex-col justify-center items-start text-left space-y-6 pl-4 md:pl-12">

                    {/* Heading Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center space-y-2"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-gold text-4xl opacity-80 drop-shadow-[-2px_4px_2px_rgba(0,0,0,0.6)]">☠️</span>
                            <h2 className="text-5xl md:text-6xl font-heading text-[#d4af37] drop-shadow-[0_4px_4px_rgba(0,0,0,1)] tracking-[0.15em] uppercase border-b-2 border-[#d4af37] pb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                                Prologue
                            </h2>
                            <span className="text-gold text-4xl opacity-80 drop-shadow-[-2px_4px_2px_rgba(0,0,0,0.6)]">☠️</span>
                        </div>
                        {/* Replaced Golden Bar with Text Divider */}
                        <div className="text-[#8b4513] text-xl font-bold opacity-80 tracking-widest drop-shadow-[-1px_2px_1px_rgba(0,0,0,0.5)]">
                            ~ x ~
                        </div>
                    </motion.div>

                    {/* Handwritten Story Content */}
                    <div className="relative z-10 text-[#1a0f0a] font-hand text-xl md:text-2xl leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] max-w-xl">

                        <div className="mb-2">
                            <p className="text-[#8b4513] font-serif font-bold text-sm tracking-widest uppercase mb-1 drop-shadow-sm">Captain's Log: Entry 01</p>
                            <p>
                                My name is Anvesh Rathore. A navigator of Information Technology, charting a course through the waters of Acropolis Institute of Technology & Research, Indore.
                            </p>
                        </div>

                        <div className="mb-2">
                            <p>
                                Currently sailing through 2nd Year, 2nd Semester.
                            </p>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-gold/80 to-transparent my-4" />

                        <div className="mb-2">
                            <p className="text-[#8b4513] font-serif font-bold text-sm tracking-widest uppercase mb-1 drop-shadow-sm">Origin Coordinates</p>
                            <p>
                                Before setting sail on this grand line, I completed my training at:
                            </p>
                        </div>

                        <ul className="space-y-2 pl-2 border-l-2 border-gold/60 ml-2">
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 5, duration: 0.5 }}
                                className="flex items-center gap-3"
                            >
                                <span className="text-gold text-lg">⚓</span>
                                <span className="text-lg md:text-xl">10th – Jawahar Navodaya Vidyalaya, Indore</span>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 6, duration: 0.5 }}
                                className="flex items-center gap-3"
                            >
                                <span className="text-gold text-lg">⚓</span>
                                <span className="text-lg md:text-xl">12th – Malwa Public Higher Secondary School, Depalpur</span>
                            </motion.li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Empty (or reserved for illustration) */}
                <div className="hidden md:block">
                    {/* This space is intentionally left open to show the background image's subject (e.g., the ship or character) */}
                </div>

            </div>
        </section>
    );
}
