"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Heart, Shield, PenTool, Wind } from "lucide-react";

const gears = [
    { id: "GEAR 1", name: "Open-Mindedness", icon: Wind, desc: "Open to different ideas and perspectives." },
    { id: "GEAR 2", name: "Empathy", icon: Heart, desc: "Understanding what others feel naturally." },
    { id: "GEAR 3", name: "Loyalty", icon: Shield, desc: "Sticking with the team through storms." },
    { id: "GEAR 4", name: "Creativity", icon: PenTool, desc: "Turning ideas into expressive forms." },
    { id: "GEAR 5", name: "Freedom", icon: Zap, desc: "Living by values, not just expectations." },
];

export default function Zone4_Gears() {
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-gradient-to-br from-ocean-900 to-ocean-800 overflow-hidden">
            {/* Steam / Smoke Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-heading text-white text-center mb-16">
                    FORMS OF <span className="text-red-500">STRENGTH</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {gears.map((gear, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1, y: -10 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-64 h-80 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center backdrop-blur-md hover:bg-white/10 hover:border-red-500/50 transition-colors group"
                        >
                            <div className="text-red-500 font-black text-4xl mb-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                {gear.id}
                            </div>
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6 group-hover:animate-pulse">
                                <gear.icon className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{gear.name}</h3>
                            <p className="text-sm text-white/60">{gear.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
