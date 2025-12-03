"use client";

import React, { useEffect, useRef } from "react";
import { useScrollContext } from "../HorizontalScrollContainer";
import { useTransform, motion } from "framer-motion";

type Props = {
    count?: number;
    spread?: number;
};

const CONFIG = {
    // Number of clouds to spawn if not specified in props
    DEFAULT_COUNT: 15,
    // Total width of the cloud area (pixels)
    SPREAD: 20000,

    // Size range for clouds (pixels)
    MIN_SIZE: 150,
    MAX_SIZE: 350, // 150 + 200

    // Vertical positioning (0.0 to 1.0)
    // 0.375 means top 37.5% of the screen
    VERTICAL_COVERAGE: 0.375,
    // Buffer from the bottom of the coverage area (pixels)
    VERTICAL_BUFFER: 150,

    // Drift animation speed range (seconds)
    MIN_DURATION: 20,
    MAX_DURATION: 40, // 20 + 20

    // Layering (z-index base)
    Z_INDEX_BASE: 10
};

export default function CloudField({ count = CONFIG.DEFAULT_COUNT, spread = CONFIG.SPREAD }: Props) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const { scrollXProgress } = useScrollContext();

    // Parallax: Clouds move slower than foreground, creating depth
    // Different range than birds to separate layers
    const x = useTransform(scrollXProgress, [0, 1], ["10%", "-60%"]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        // Create clouds if not already created
        if (root.children.length === 0) {
            const frag = document.createDocumentFragment();
            for (let i = 0; i < count; i++) {
                const container = document.createElement("div");
                container.className = "cloud-container";

                // Random size (larger than birds) based on CONFIG
                const size = Math.round(CONFIG.MIN_SIZE + Math.random() * (CONFIG.MAX_SIZE - CONFIG.MIN_SIZE));

                // Linear distribution across the spread
                const sectionWidth = spread / count;
                const xPos = (i * sectionWidth) + (Math.random() * sectionWidth * 0.8);

                // Vertical position: Top portion of screen based on CONFIG
                const maxY = window.innerHeight * CONFIG.VERTICAL_COVERAGE - CONFIG.VERTICAL_BUFFER;
                const yPos = Math.random() * Math.max(0, maxY);

                // Random z-depth for layering
                const zPos = Math.round((Math.random() - 0.5) * 100);

                // Random drift speed
                const duration = (Number(CONFIG.MIN_DURATION) + Math.random() * (Number(CONFIG.MAX_DURATION) - Number(CONFIG.MIN_DURATION))).toFixed(2);
                const delay = (Math.random() * -20).toFixed(2);

                container.style.width = `${size}px`;
                container.style.height = `${size * 0.6}px`;
                container.style.left = `${xPos}px`;
                container.style.top = `${yPos}px`;
                container.style.setProperty("--drift-duration", `${duration}s`);
                container.style.setProperty("--drift-delay", `${delay}s`);
                container.style.zIndex = `${CONFIG.Z_INDEX_BASE + (zPos > 0 ? 1 : -1)}`; // Behind birds (z-index 30)

                // Create cloud puffs (simple div shapes)
                const puff = document.createElement("div");
                puff.className = "cloud-puff";
                container.appendChild(puff);

                frag.appendChild(container);
            }
            root.appendChild(frag);
        }
    }, [count, spread]);

    return (
        <motion.div
            ref={rootRef}
            className="fixed inset-0 pointer-events-none z-10 overflow-visible"
            style={{ x }} // Apply scroll parallax
        >
            {/* Clouds injected here */}
        </motion.div>
    );
}
