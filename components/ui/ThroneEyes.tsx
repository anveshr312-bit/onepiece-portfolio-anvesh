"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ThroneEyes({
    intensity = 0.12, // default ambient
    cx = 0.5,
    cy = 0.12,
    mouseX = 0,
    mouseY = 0,
}: { intensity?: number; cx?: number; cy?: number; mouseX?: number; mouseY?: number }) {
    const controls = useAnimation();

    // Calculate eye movement (subtle tracking)
    // Assuming mouseX/Y are normalized 0..1 relative to screen/container
    // We want max 2-4px movement.
    const maxMove = 4;
    const eyeOffsetX = (mouseX - 0.5) * maxMove;
    const eyeOffsetY = (mouseY - 0.5) * maxMove;

    useEffect(() => {
        const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            controls.set({ opacity: Math.min(intensity, 0.18) });
            return;
        }
        controls.start({
            opacity: [Math.min(intensity, 0.02), Math.min(intensity, 0.18), Math.min(intensity, 0.04)],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            scale: [0.995, 1.005, 0.995],
        });
    }, [intensity, controls]);

    const left = `${cx * 100}%`;
    const top = `${cy * 100}%`;

    return (
        <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={controls}
            style={{
                position: "absolute",
                left,
                top,
                transform: "translate(-50%, -50%)",
                width: 420,
                height: 160,
                pointerEvents: "none",
                zIndex: 30,
                mixBlendMode: "screen",
            }}
        >
            <svg viewBox="0 0 840 320" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#7f2b35" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* left eye */}
                <g transform={`translate(${160 + eyeOffsetX},${eyeOffsetY})`}>
                    <ellipse cx="120" cy="160" rx="110" ry="44" fill="rgba(255,255,255,0.03)" />
                    <circle cx="120" cy="160" r="28" fill="url(#eyeGrad)" />
                    <circle cx="120" cy="160" r="10" fill="#100f12" />
                </g>

                {/* right eye */}
                <g transform={`translate(${420 + eyeOffsetX},${eyeOffsetY})`}>
                    <ellipse cx="120" cy="160" rx="110" ry="44" fill="rgba(255,255,255,0.03)" />
                    <circle cx="120" cy="160" r="28" fill="url(#eyeGrad)" />
                    <circle cx="120" cy="160" r="10" fill="#100f12" />
                </g>
            </svg>
        </motion.div>
    );
}
