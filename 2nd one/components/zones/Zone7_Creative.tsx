"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pen, BookOpen, Feather } from "lucide-react";

export default function Zone7_Creative() {
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-gradient-to-r from-ocean-800 to-ocean-700 overflow-hidden">
            <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-heading text-gold text-center mb-16">
                    The Creative Cove
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Sketching */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-parchment text-ocean-900 p-8 rounded-lg shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform"
                    >
                        <Pen className="w-10 h-10 mb-4 text-wood" />
                        <h3 className="text-2xl font-bold font-heading mb-2">Sketching</h3>
                        <p className="font-serif">Exploring ideas visually through sketches and paintings. The world looks different when you try to draw it.</p>
                    </motion.div>

                    {/* Reading */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-parchment text-ocean-900 p-8 rounded-lg shadow-xl rotate-[1deg] hover:rotate-0 transition-transform translate-y-8"
                    >
                        <BookOpen className="w-10 h-10 mb-4 text-wood" />
                        <h3 className="text-2xl font-bold font-heading mb-2">Reading</h3>
                        <p className="font-serif">Books are my Log Pose to different worlds, ideas, and perspectives.</p>
                    </motion.div>

                    {/* Writing */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-parchment text-ocean-900 p-8 rounded-lg shadow-xl rotate-[-1deg] hover:rotate-0 transition-transform"
                    >
                        <Feather className="w-10 h-10 mb-4 text-wood" />
                        <h3 className="text-2xl font-bold font-heading mb-2">Story Writing</h3>
                        <p className="font-serif">I enjoy creating stories. This portfolio itself is written as a journey across the sea.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
