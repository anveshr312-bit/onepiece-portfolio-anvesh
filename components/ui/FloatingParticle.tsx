"use client";

import { motion } from "framer-motion";

interface FloatingParticleProps {
    className?: string;
    delay?: number;
}

export default function FloatingParticle({ className = "", delay = 0 }: FloatingParticleProps) {
    // Generate a random duration between 5 and 9 seconds
    const duration = 5 + Math.random() * 4;

    return (
        <motion.div
            className={`absolute w-3 h-3 bg-white/20 rounded-full blur-[1px] ${className}`}
            initial={{ y: 0, opacity: 0.1 }}
            animate={{ y: [0, -15, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            style={{ pointerEvents: "none" }}
        />
    );
}
