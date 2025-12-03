"use client";

import React from "react";
import { motion } from "framer-motion";

const challenges = [
    { name: "Overthinking", desc: "Turning small situations into long mental stories.", fix: "Taking small, clear actions." },
    { name: "Conflict Avoidance", desc: "Tolerating things to keep peace.", fix: "Learning to speak up respectfully." },
    { name: "Procrastination", desc: "Deadlines chasing me instead of me chasing them.", fix: "Building better discipline." },
    { name: "Sensitivity", desc: "Feeling things too intensely.", fix: "Channeling emotion into art." },
    { name: "Indecisiveness", desc: "Getting stuck when too many options exist.", fix: "Trusting my gut more." },
];

export default function Zone5_Challenges() {
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-[#020408] overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-heading text-white/80 text-center mb-16 uppercase tracking-widest">
                    The Five Elders (Challenges)
                </h2>

                <div className="flex justify-center items-end gap-4 md:gap-8 h-[50vh]">
                    {challenges.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ height: "20%" }}
                            whileInView={{ height: "100%" }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="relative w-16 md:w-48 bg-gradient-to-t from-gray-900 to-gray-800 rounded-t-lg border-t border-x border-gray-700/30 group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />

                            <div className="absolute bottom-0 left-0 w-full p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                                <p className="text-xs text-gray-400 mb-4">{item.desc}</p>
                                <div className="text-[10px] uppercase tracking-wider text-gold">
                                    Counter Strategy: <br />
                                    <span className="text-white">{item.fix}</span>
                                </div>
                            </div>

                            {/* Silhouette Placeholder */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-950 shadow-lg" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
