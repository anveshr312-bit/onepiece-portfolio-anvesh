"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Zone1_Hero() {
    const scrollToJourney = () => {
        window.scrollTo({ top: window.innerWidth, behavior: 'smooth' });
    };

    const scrollToContact = () => {
        window.scrollTo({ top: window.innerWidth * 9, behavior: 'smooth' });
    };

    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden bg-ocean-deep">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/placeholder-sky.jpg')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ocean-deep" />

            <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-left space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-gold font-heading text-xl tracking-widest mb-2">THE JOURNEY BEGINS</h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                            Anvesh Rathore
                        </h1>
                        <p className="text-ocean-200 text-lg md:text-xl max-w-lg">
                            B.Tech in Information Technology <br />
                            Acropolis Institute of Technology and Research, Indore <br />
                            <span className="text-sm opacity-70">2nd Year, 2nd Semester</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="border-l-4 border-gold pl-6 py-2"
                    >
                        <p className="text-2xl md:text-3xl font-heading italic text-white/90">
                            "Sailing toward the version of myself I haven’t discovered yet."
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex gap-4 pt-4"
                    >
                        <button
                            onClick={scrollToJourney}
                            className="px-8 py-3 bg-gold text-ocean-900 font-bold rounded hover:bg-gold-light transition-all transform hover:scale-105"
                        >
                            View My Journey
                        </button>
                        <button
                            onClick={scrollToContact}
                            className="px-8 py-3 border border-gold text-gold font-bold rounded hover:bg-gold/10 transition-all"
                        >
                            Contact Me
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
