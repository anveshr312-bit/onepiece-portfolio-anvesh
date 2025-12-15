"use client";
import React from "react";
import Image from "next/image";
import LightBeams from "../ui/LightBeams";
import DustParticles from "../ui/DustParticles";
import Zone5Card from "./Zone5_Upgrade/Zone5Card";

/**
 * Zone5_Challenges.tsx
 * - Displays "The Five Elders" as interactive 3D flip cards.
 * - Front: Base form + Title.
 * - Back: Yokai form + Weakness + Counter Strategy.
 */

/* Config */
const ELDERS = [
    {
        id: "saturn",
        title: "Saturn",
        weaknessTitle: "Overthinking",
        weaknessDescription: "I tend to overanalyze situations, sometimes delaying action by exploring too many possibilities at once.",
        counterStrategy: "Bias toward action. Start small, gather feedback, and refine instead of waiting for certainty.",
        baseImage: "/images/zone5/upgrade/saturn-base.png",
        yokaiImage: "/images/zone5/upgrade/saturn-yokai.png",
    },
    {
        id: "juppeter",
        title: "Peter",
        weaknessTitle: "Avoiding Conflict",
        weaknessDescription: "I sometimes avoid difficult conversations to maintain harmony, which can delay necessary clarity.",
        counterStrategy: "Address issues early and respectfully. Clear communication prevents long-term friction.",
        baseImage: "/images/zone5/upgrade/juppeter-base.png",
        yokaiImage: "/images/zone5/upgrade/juppeter-yokai.png",
    },
    {
        id: "mars",
        title: "Mars",
        weaknessTitle: "Emotional Sensitivity",
        weaknessDescription: "I experience emotions deeply, which can sometimes affect focus if left unchecked.",
        counterStrategy: "Acknowledge emotions without letting them drive decisions. Build consistency through routine and reflection.",
        baseImage: "/images/zone5/upgrade/mars-base.png",
        yokaiImage: "/images/zone5/upgrade/mars-yokai.png",
    },
    {
        id: "nusjuro",
        title: "Nusjuro",
        weaknessTitle: "Procrastination",
        weaknessDescription: "I can delay starting tasks when motivation is low, even when priorities are clear.",
        counterStrategy: "Use the 5-minute rule to break inertia. Starting small consistently builds momentum.",
        baseImage: "/images/zone5/upgrade/nusjuro-base.png",
        yokaiImage: "/images/zone5/upgrade/nusjuro-yokai.png",
    },
    {
        id: "warcury",
        title: "Warcury",
        weaknessTitle: "Indecision",
        weaknessDescription: "When faced with too many options, I can hesitate while weighing outcomes too carefully.",
        counterStrategy: "Limit options, commit to a direction, and adjust based on results. Progress beats perfection.",
        baseImage: "/images/zone5/upgrade/warcury-base.png",
        yokaiImage: "/images/zone5/upgrade/warcury-yokai.png",
    },
];

export default function Zone5_Challenges() {
    return (
        <section className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
            {/* Background layers */}
            <Image src="/images/zone5/throne-room.png" alt="Throne Room" fill className="object-cover object-center opacity-70" priority />

            {/* Light Beams */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-50 mix-blend-screen">
                <LightBeams />
            </div>

            {/* Fog / Dust */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
                <DustParticles />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>

            {/* Content Container */}
            <div className="relative z-30 w-full max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">

                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-widest uppercase drop-shadow-lg">
                        The Five Elders
                    </h2>
                    <p className="text-yellow-500/80 text-sm md:text-base tracking-widest mt-2 uppercase">
                       Self-awareness, weaknesses, and how I actively work on them.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 h-[50vh] md:h-[60vh] items-center justify-center perspective-1000">
                    {ELDERS.map((elder) => (
                        <div key={elder.id} className="w-full h-full max-w-[300px] mx-auto md:max-w-none">
                            <Zone5Card elder={elder} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute left-0 right-0 bottom-0 z-40 pointer-events-none h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
}
