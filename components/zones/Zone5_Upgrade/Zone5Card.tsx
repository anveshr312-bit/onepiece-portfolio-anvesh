"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Zone5CardProps {
    elder: {
        id: string;
        title: string;
        weaknessTitle: string;
        weaknessDescription: string;
        counterStrategy: string;
        baseImage: string;
        yokaiImage: string;
    };
}

export default function Zone5Card({ elder }: Zone5CardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Toggle flip on click
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="relative w-full h-full cursor-pointer group"
            style={{ perspective: "1000px" }}
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleFlip();
                }
            }}
            aria-label={`View details for ${elder.title}`}
        >
            {/* Inner Container: Holds the 3D state */}
            <motion.div
                className="relative w-full h-full transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }} // ease-out-back
            >
                {/* FRONT FACE */}
                <div
                    className="absolute inset-0 z-20"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                    {/* Card Container matching existing style */}
                    <div className="relative w-full h-full flex flex-col items-center justify-end pb-4 overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-yellow-500/20">

                        {/* Base Image */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={elder.baseImage}
                                alt={elder.title}
                                fill
                                className="object-contain object-bottom opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                        </div>

                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                        {/* Text Content */}
                        <div className="relative z-20 text-center px-2">
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wider uppercase drop-shadow-md">
                                {elder.title}
                            </h3>
                            <p className="text-xs md:text-sm text-yellow-400/90 font-sans tracking-widest mt-1 uppercase">
                                {elder.weaknessTitle}
                            </p>
                        </div>

                        {/* Hover Glow Effect (Desktop) */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay bg-gradient-to-t from-yellow-500/20 to-transparent" />
                    </div>
                </div>

                {/* BACK FACE */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                    }}
                >
                    <div className="relative w-full h-full flex flex-col overflow-visible rounded-xl border border-red-900/50 bg-gray-950 shadow-2xl shadow-red-900/20">

                        {/* Yokai Image (Extending bounds) */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[140%] h-[80%] z-0 pointer-events-none">
                            <Image
                                src={elder.yokaiImage}
                                alt={`${elder.title} Yokai Form`}
                                fill
                                className="object-contain object-top drop-shadow-2xl"
                                sizes="(max-width: 768px) 60vw, 30vw"
                            />
                        </div>

                        {/* Dark Gradient to fade bottom for text */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10 rounded-xl" />

                        {/* Content Container */}
                        <div className="relative z-20 mt-auto p-4 text-center flex flex-col gap-3">

                            {/* Weakness Section */}
                            <div>
                                <h4 className="text-red-400 font-bold tracking-widest text-xs uppercase mb-1">
                                    Weakness
                                </h4>
                                <p className="text-gray-200 text-sm leading-snug font-sans">
                                    {elder.weaknessDescription}
                                </p>
                            </div>

                            {/* Counter Strategy Section */}
                            <div className="border-t border-white/10 pt-2">
                                <h4 className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-1">
                                    Counter Strategy
                                </h4>
                                <p className="text-blue-100/90 text-xs leading-relaxed font-sans">
                                    {elder.counterStrategy}
                                </p>
                            </div>
                        </div>

                        {/* Rim Light / Shine Effect on Flip */}
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
