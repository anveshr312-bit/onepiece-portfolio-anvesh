"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function Zone8_Project() {
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-ocean-900 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">

                {/* Wanted Poster Style Card */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="bg-[#fdfbf7] text-gray-900 p-6 rounded-sm shadow-2xl max-w-md w-full rotate-1"
                >
                    <div className="border-4 border-gray-800 p-4 h-full flex flex-col items-center">
                        <div className="w-full h-48 bg-ocean-200 mb-4 flex items-center justify-center overflow-hidden relative">
                            {/* Placeholder for Screenshot */}
                            <div className="text-ocean-800 font-bold opacity-50">PORTFOLIO PREVIEW</div>
                        </div>
                        <h2 className="text-3xl font-heading font-black uppercase tracking-widest mb-2 text-center">
                            The Thousand Sunny Portfolio
                        </h2>
                        <div className="w-full border-b-2 border-gray-800 my-2" />
                        <p className="text-center font-serif text-sm mb-4">
                            My first real voyage. A narrative-driven portfolio turning my lack of experience into a story.
                        </p>
                        <div className="flex gap-2 mb-4 flex-wrap justify-center">
                            {["Next.js", "React", "Tailwind", "Framer Motion"].map(tech => (
                                <span key={tech} className="px-2 py-1 bg-gray-200 text-xs font-bold rounded">{tech}</span>
                            ))}
                        </div>
                        <div className="flex gap-4 w-full">
                            <button className="flex-1 bg-gray-900 text-white py-2 font-bold flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
                                <Github size={16} /> Code
                            </button>
                            <button className="flex-1 border-2 border-gray-900 text-gray-900 py-2 font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                                <ExternalLink size={16} /> Live
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="text-white max-w-lg">
                    <h2 className="text-4xl font-heading text-gold mb-6">First Bounty</h2>
                    <p className="text-lg text-ocean-100 mb-6">
                        "I learned how to think about user experience as a story. It’s not just about code; it’s about how the user feels sailing through the content."
                    </p>
                    <ul className="space-y-4 text-ocean-200">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-gold rounded-full" />
                            Built with modern React & TypeScript
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-gold rounded-full" />
                            Custom horizontal scroll engine
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-gold rounded-full" />
                            Responsive & Interactive
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
