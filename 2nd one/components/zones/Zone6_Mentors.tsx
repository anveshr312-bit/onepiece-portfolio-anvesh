"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sword, Flame, Book, Anchor, Hammer } from "lucide-react";

const mentors = [
    { name: "Shanks", trait: "Confidence", icon: Anchor, color: "text-red-500", desc: "Staying calm when things are uncertain." },
    { name: "Sabo", trait: "Discipline", icon: Book, color: "text-blue-500", desc: "Planning better and following through." },
    { name: "Ace", trait: "Passion", icon: Flame, color: "text-orange-500", desc: "Channeling fire without burning out." },
    { name: "Rayleigh", trait: "Mastery", icon: Sword, color: "text-gray-300", desc: "Building strong technical foundations." },
    { name: "Gaban", trait: "Craft", icon: Hammer, color: "text-yellow-600", desc: "Sharpening skill through quiet dedication." },
];

export default function Zone6_Mentors() {
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-ocean-800 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-heading text-white text-center mb-16">
                    Mentors of the Sea
                </h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {mentors.map((mentor, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="w-48 h-64 bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center text-center backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className={`w-16 h-16 rounded-full bg-black/20 flex items-center justify-center mb-4 ${mentor.color}`}>
                                <mentor.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">{mentor.trait}</div>
                            <p className="text-xs text-white/70">{mentor.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
