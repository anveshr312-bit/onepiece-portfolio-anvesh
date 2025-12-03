"use client";

import { useScrollContext } from "./HorizontalScrollContainer";
import { motion, useTransform } from "framer-motion";
import Image from "next/image";

export default function FloatingSunny() {
    const { scrollXProgress, currentZone } = useScrollContext();

    // Hide in Zone 2 (index 1)
    const isHidden = currentZone === 1;

    // CONFIGURATION: Adjust these values to change the ship's path
    const SHIP_CONFIG = {
        START_X: "-2vw",      // Starting horizontal position
        END_X: "85vw",        // Ending horizontal position
        START_BOTTOM: "-9rem", // Starting vertical position (from bottom)
        END_BOTTOM: "-9rem",   // Ending vertical position (from bottom)
    };

    // Move across the screen as we scroll
    const x = useTransform(scrollXProgress, [0, 1], [SHIP_CONFIG.START_X, SHIP_CONFIG.END_X]);
    const bottom = useTransform(scrollXProgress, [0, 1], [SHIP_CONFIG.START_BOTTOM, SHIP_CONFIG.END_BOTTOM]);

    return (
        <motion.div
            className={`fixed z-40 transition-opacity duration-700 pointer-events-none`}
            style={{ x, bottom, opacity: isHidden ? 0 : 1 }}
            animate={{ y: [0, -15, 0], rotate: [0, 1.5, -1.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className="relative w-38 h-38 md:w-54 md:h-54">
                <Image
                    src="/images/sunny.webp"
                    alt="Thousand Sunny"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </div>

            {/* Reflection */}
            <div
                className="relative w-48 h-24 md:w-64 md:h-32 opacity-40 -mt-4"
                style={{
                    transform: "scaleY(-1)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)"
                }}
            >
                <Image
                    src="/images/sunny.webp"
                    alt="Reflection"
                    fill
                    className="object-contain blur-[2px]"
                />
            </div>
        </motion.div>
    );
}
