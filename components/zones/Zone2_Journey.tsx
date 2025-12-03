"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const milestones = [
    { title: "Started B.Tech", desc: "Information Technology" },
    { title: "Hello World", desc: "First exposure to coding" },
    { title: "Artistic Spark", desc: "Sketching & Painting" },
    { title: "Storytelling", desc: "Writing & Worldbuilding" },
    { title: "This Portfolio", desc: "Setting Sail" },
];

import FogAnimation from "../ui/FogAnimation";

export default function Zone2_Journey() {
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-ocean-900 overflow-hidden border-r border-ocean-800/30">
            {/* Fog Animation Layer */}
            <FogAnimation />

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-heading text-gold text-center mb-16"
                >
                    The Logbook
                </motion.h2>

                <div className="relative flex justify-between items-center max-w-5xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-ocean-700 -translate-y-1/2 border-t-2 border-dashed border-ocean-500/50" />

                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 flex flex-col items-center group"
                        >
                            <div className="w-12 h-12 rounded-full bg-ocean-800 border-2 border-gold flex items-center justify-center group-hover:scale-125 transition-transform duration-300 bg-ocean-deep">
                                <MapPin className="w-5 h-5 text-gold" />
                            </div>
                            <div className="absolute top-16 w-40 text-center">
                                <h3 className="text-lg font-bold text-white mb-1">{milestone.title}</h3>
                                <p className="text-sm text-ocean-300">{milestone.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Map Texture Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-overlay" />
        </section>
    );
}
