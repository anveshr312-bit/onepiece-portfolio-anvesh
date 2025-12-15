"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Zone5Card from "./Zone5_Upgrade/Zone5Card";

interface Panel {
    id: string;
    title: string;
    weaknessTitle: string;
    weaknessDescription: string;
    counterStrategy: string;
    baseImage: string;
    yokaiImage: string;
}

const PANELS: Panel[] = [
    {
        id: "saturn",
        title: "SATURN",
        weaknessTitle: "OVERTHINKING",
        weaknessDescription: "I tend to overanalyze situations, sometimes delaying action by exploring too many possibilities at once.",
        counterStrategy: "Bias toward action. Start small, gather feedback, and refine instead of waiting for certainty.",
        baseImage: "/images/zone5/upgrade/saturn-base.png",
        yokaiImage: "/images/zone5/upgrade/saturn-yokai.png",
    },
    {
        id: "mars",
        title: "MARS",
        weaknessTitle: "EMOTIONAL SENSITIVITY",
        weaknessDescription: "I experience emotions deeply, which can sometimes affect focus if left unchecked.",
        counterStrategy: "Acknowledge emotions without letting them drive decisions. Build consistency through routine and reflection.",
        baseImage: "/images/zone5/upgrade/mars-base.png",
        yokaiImage: "/images/zone5/upgrade/mars-yokai.png",
    },
    {
        id: "warcury",
        title: "WARCURY",
        weaknessTitle: "INDECISION",
        weaknessDescription: "When faced with too many options, I can hesitate while weighing outcomes too carefully.",
        counterStrategy: "Limit options, commit to a direction, and adjust based on results. Progress beats perfection.",
        baseImage: "/images/zone5/upgrade/warcury-base.png",
        yokaiImage: "/images/zone5/upgrade/warcury-yokai.png",
    },
    {
        id: "nusjuro",
        title: "NUSJURO",
        weaknessTitle: "PROCRASTINATION",
        weaknessDescription: "I can delay starting tasks when motivation is low, even when priorities are clear.",
        counterStrategy: "Use the 5-minute rule to break inertia. Starting small consistently builds momentum.",
        baseImage: "/images/zone5/upgrade/nusjuro-base.png",
        yokaiImage: "/images/zone5/upgrade/nusjuro-yokai.png",
    },
    {
        id: "juppeter",
        title: "PETER",
        weaknessTitle: "AVOIDING CONFLICT",
        weaknessDescription: "I sometimes avoid difficult conversations to maintain harmony, which can delay necessary clarity.",
        counterStrategy: "Address issues early and respectfully. Clear communication prevents long-term friction.",
        baseImage: "/images/zone5/upgrade/juppeter-base.png",
        yokaiImage: "/images/zone5/upgrade/juppeter-yokai.png",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const panelVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Cinematic ease
        },
    },
};

export default function Zone5_CharacterPanels() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-[#020205]">
            {/* Unified Background: Council Chamber Atmosphere */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/zone5/throne-room.png"
                    alt="Throne Room"
                    fill
                    className="object-cover object-center opacity-60"
                    priority
                />

                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

                {/* Ambient Fog/Smoke */}
                <div className="absolute inset-0 opacity-15 mix-blend-screen">
                    <Image src="/images/zone5/character-panels/fog-overlay-top.png" alt="fog" fill className="object-cover animate-drift-slow" />
                </div>
            </div>

            <div className="relative z-20 text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-serif text-white tracking-[0.2em] opacity-90 drop-shadow-2xl">
                    THE FIVE ELDERS
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-4 mb-4" />
                <p className="text-sm md:text-lg text-gray-400 tracking-[0.3em] uppercase font-light">
                    Inner Weaknesses Manifested
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-30 flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-[1800px] px-8 h-[300px]"
            >
                {PANELS.map((panel) => (
                    <motion.div
                        key={panel.id}
                        variants={panelVariants}
                        className="relative w-full md:w-[180px] h-full flex-1"
                    >
                        <Zone5Card elder={panel} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
