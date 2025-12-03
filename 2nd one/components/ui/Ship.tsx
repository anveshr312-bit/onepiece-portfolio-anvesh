"use client";

import React from "react";
import { motion } from "framer-motion";
import { Ship as ShipIcon } from "lucide-react";

export default function Ship() {
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1, -1, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="relative"
            >
                {/* Placeholder for the Thousand Sunny */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gold/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-gold/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                    <ShipIcon className="w-12 h-12 md:w-16 md:h-16 text-gold" />
                    {/* User Note: Replace this div with your custom Ship Illustration */}
                </div>

                {/* Water Ripple Effect */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-4 bg-ocean-300/20 blur-xl rounded-full animate-pulse" />
            </motion.div>
        </div>
    );
}
