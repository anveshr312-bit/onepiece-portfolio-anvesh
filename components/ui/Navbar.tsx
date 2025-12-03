"use client";
import { useScrollContext } from "../HorizontalScrollContainer";
import { motion } from "framer-motion";

const zones = [
    "Hero", "Prologue", "Poneglyphs", "Gears", "Challenges",
    "Mentors", "Creative", "Projects", "Goals", "Contact"
];

export default function Navbar() {
    const { currentZone, scrollToZone } = useScrollContext();

    // Hide in Zone 1 (index 0)
    if (currentZone === 0) return null;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none"
        >
            <div className="bg-black/60 backdrop-blur-md rounded-full px-8 py-3 flex gap-6 pointer-events-auto border border-amber-500/50 shadow-lg">
                {zones.map((zone, i) => (
                    <button
                        key={zone}
                        onClick={() => scrollToZone(i)}
                        className={`text-sm font-serif transition-all duration-300 ${currentZone === i
                                ? "text-amber-400 font-bold scale-125"
                                : "text-amber-100/60 hover:text-amber-200"
                            }`}
                    >
                        {i === 0 ? "☠" : i}
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}
