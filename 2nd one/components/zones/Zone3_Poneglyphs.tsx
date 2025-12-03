"use client";

import React from "react";
import { motion } from "framer-motion";

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
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-[#050b14] overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-heading text-center text-stone-400 mb-12 tracking-widest"
                >
                    ANCIENT TEXTS
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {poneglyphs.map((glyph, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-8 rounded-lg border-2 bg-ocean-950/50 backdrop-blur-sm ${glyph.borderColor} ${glyph.dim ? 'opacity-70' : 'opacity-100'} hover:opacity-100 transition-all hover:scale-105`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className={`text-2xl font-heading font-bold ${glyph.color}`}>{glyph.title}</h3>
                                <span className="text-xs uppercase tracking-widest text-white/30 border border-white/20 px-2 py-1 rounded">
                                    {glyph.status}
                                </span>
                            </div>
                            <p className={`font-serif leading-relaxed ${glyph.dim ? 'text-white/40 blur-[0.5px]' : 'text-white/80'}`}>
                                {glyph.text}
                            </p>
                            {glyph.dim && (
                                <div className="mt-4 text-xs text-white/20 font-mono">
                  // ENCRYPTED DATA //
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
