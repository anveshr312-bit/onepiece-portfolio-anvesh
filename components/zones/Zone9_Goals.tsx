"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Coins } from "lucide-react";

export default function Zone9_Goals() {
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-gradient-to-l from-ocean-950 to-ocean-900 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-heading text-white text-center mb-16">
                    The New World Horizon
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-center gap-16">

                    {/* 1 Year Goal */}
                    <div className="text-center max-w-xs relative group">
                        <div className="w-32 h-32 mx-auto bg-ocean-800 rounded-full flex items-center justify-center mb-6 relative border-2 border-dashed border-white/20">
                            <HelpCircle className="w-12 h-12 text-white/50" />

                            {/* Lost Zoro Gag */}
                            <motion.div
                                animate={{ x: [0, 20, 0, -20, 0], y: [0, 10, 0, -10, 0] }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="absolute -right-10 -bottom-10 bg-green-900/80 text-green-200 text-xs p-2 rounded shadow-lg w-24"
                            >
                                <span className="block font-bold">Zoro?</span>
                                "I think the dream role is this way..."
                            </motion.div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">1 Year Goal</h3>
                        <p className="text-ocean-200">To figure out what dream role fits me and start filling the question marks.</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />

                    {/* 3-4 Year Goal */}
                    <div className="text-center max-w-xs relative">
                        <div className="w-32 h-32 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6 border-2 border-gold shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                            <Coins className="w-12 h-12 text-gold" />

                            {/* Nami Gag */}
                            <div className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                                $$$
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gold mb-2">Laugh Tale (3-4 Years)</h3>
                        <p className="text-ocean-200">To get a very good job and build something I can proudly call my own treasure.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
