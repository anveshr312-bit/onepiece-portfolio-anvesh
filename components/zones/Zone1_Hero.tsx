"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollContext } from "../HorizontalScrollContainer";

export default function Zone1_Hero() {
    const { scrollToZone } = useScrollContext();

    const scrollToJourney = () => {
        scrollToZone(1); // Zone 2
    };

    const scrollToContact = () => {
        scrollToZone(9); // Zone 10
    };

    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden bg-ocean-deep">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/placeholder-sky.jpg')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ocean-deep" />

            <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-left space-y-6 -mt-24">
                    {/* NAME SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Logo replacing text */}
                        <img
                            src="/images/logo.png"
                            alt="Anvesh Rathore Logo"
                            className="h-32 md:h-48 w-auto mb-4 object-contain"
                        />
                    </motion.div>

                    {/* QUOTE SECTION */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="border-l-4 border-gold pl-6 py-2"
                    >
                        {/* 'text-2xl' controls quote size */}
                        <p className="text-1xl md:text-2xl font-heading italic text-white/90">
                            "Sailing toward the version of myself I haven’t discovered yet."
                        </p>
                    </motion.div>

                    {/* BUTTONS SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        // 'gap-4' controls space between buttons. 'pt-4' adds padding top.
                        className="flex gap-4 pt-4"
                    >
                        <button
                            onClick={scrollToContact}
                            className="px-8 py-3 border border-gold text-gold font-bold rounded hover:bg-gold/10 transition-all"
                        >
                            Contact Me
                        </button>
                        <button
                            onClick={scrollToJourney}
                            className="px-8 py-3 bg-gold text-ocean-900 font-bold rounded hover:bg-gold-light transition-all transform hover:scale-110 -rotate-2 hover:rotate-0 flex items-center gap-2 font-heading text-xl shadow-lg hover:shadow-gold/50"
                        >
                            <span>Swipe!</span>
                            <motion.span
                                animate={{ x: [0, 5, 0], rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="text-2xl"
                            >
                                👉
                            </motion.span>
                        </button>
                    </motion.div>
                </div>

                {/* Right Side Illustration Placeholder */}
                <div className="hidden md:flex justify-center items-center relative">
                    {/* This area is for the large ship illustration or character art */}
                    <div className="w-96 h-96 rounded-full bg-gradient-radial from-ocean-400/20 to-transparent blur-2xl absolute" />
                    {/* Placeholder for user to add image */}
                    {/* <img src="/path/to/ship.png" alt="Thousand Sunny" className="relative z-10 animate-float" /> */}
                </div>
            </div>
        </section>
    );
}
