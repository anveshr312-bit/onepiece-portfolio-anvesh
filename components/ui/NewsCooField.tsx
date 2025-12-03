"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScrollContext } from "../HorizontalScrollContainer";
import { useTransform, motion } from "framer-motion";

type Props = {
    count?: number;
    spread?: number;
};

const CONFIG = {
    // Number of birds to spawn if not specified in props
    DEFAULT_COUNT: 12,
    // Total width of the flight area (pixels)
    SPREAD: 20000,

    // Size range for birds (pixels)
    MIN_SIZE: 50,
    MAX_SIZE: 110, // 50 + 60

    // Vertical positioning (0.0 to 1.0)
    // 0.25 means top 25% of the screen
    VERTICAL_COVERAGE: 0.25,
    // Buffer from the bottom of the coverage area (pixels)
    VERTICAL_BUFFER: 80,

    // Animation speed range (seconds)
    MIN_SPEED: 2,
    MAX_SPEED: 4, // 2 + 2

    // Layering (z-index base)
    Z_INDEX_BASE: 30
};

export default function NewsCooField({ count = CONFIG.DEFAULT_COUNT, spread = CONFIG.SPREAD }: Props) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const { scrollXProgress, currentZone } = useScrollContext();
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Parallax: Birds move slightly faster than background
    const x = useTransform(scrollXProgress, [0, 1], ["0%", "-20%"]);

    // Detect scrolling to trigger flying animation
    useEffect(() => {
        const unsubscribe = scrollXProgress.on("change", () => {
            setIsScrolling(true);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150); // Stop flying shortly after scroll stops
        });
        return () => unsubscribe();
    }, [scrollXProgress]);

    // Toggle class for CSS animation
    useEffect(() => {
        if (rootRef.current) {
            if (isScrolling) {
                rootRef.current.classList.add("is-flying");
            } else {
                rootRef.current.classList.remove("is-flying");
            }
        }
    }, [isScrolling]);

    // Reset birds when zone changes
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const flyingBirds = root.querySelectorAll(".flying-away");
        flyingBirds.forEach((bird) => {
            const element = bird as HTMLElement;
            element.classList.remove("flying-away");
            element.style.transition = "none";
            element.style.transform = "translate(0, 0) scale(1) rotate(0deg)";
            // Force reflow
            void element.offsetWidth;
            element.style.transition = "transform 0.5s ease-out";
        });
    }, [currentZone]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        // Create birds if not already created
        if (root.children.length === 0) {
            const frag = document.createDocumentFragment();
            for (let i = 0; i < count; i++) {
                const container = document.createElement("div");
                container.className = "news-coo-container";

                // Random size based on CONFIG
                const size = Math.round(CONFIG.MIN_SIZE + Math.random() * (CONFIG.MAX_SIZE - CONFIG.MIN_SIZE));

                // Linear distribution across the spread
                const sectionWidth = spread / count;
                const xPos = (i * sectionWidth) + (Math.random() * sectionWidth * 0.8);

                // Vertical position: Top portion of screen based on CONFIG
                const maxY = window.innerHeight * CONFIG.VERTICAL_COVERAGE - CONFIG.VERTICAL_BUFFER;
                const yPos = 20 + Math.random() * Math.max(0, maxY);

                const zPos = Math.round((Math.random() - 0.5) * 200);

                // Random speed for bobbing/flapping
                const speed = (Number(CONFIG.MIN_SPEED) + Math.random() * (Number(CONFIG.MAX_SPEED) - Number(CONFIG.MIN_SPEED))).toFixed(2);
                const delay = (Math.random() * -5).toFixed(2);

                container.style.width = `${size}px`;
                container.style.height = `${size * 0.8}px`;
                container.style.left = `${xPos}px`;
                container.style.top = `${yPos}px`;
                // We'll use CSS variables for the animation values
                container.style.setProperty("--bspd", `${speed}s`);
                container.style.setProperty("--bdel", `${delay}s`);
                container.style.zIndex = `${CONFIG.Z_INDEX_BASE + (zPos > 0 ? 1 : -1)}`; // Layering

                // inside your useEffect creating birds — replace wing + body creation with this
                const inner = document.createElement("div");
                inner.className = "nc-inner";

                /* Body image: use file from Next.js public folder */
                const bodyImg = document.createElement("img");
                bodyImg.className = "nc-body-img";
                bodyImg.src = "/images/coo.webp"; // <<-- your path in public folder
                bodyImg.alt = "news-coo";

                /* SVG wing markup (tuned for pivot and simple shape). We will inject these inline so pivots are consistent. */
                const wingSVGLeft = `
<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <g transform="translate(0,0)">
    <path d="M160 20 C120 10 80 6 50 40 C30 62 8 92 16 108 C36 90 80 74 110 64 C140 54 170 40 160 20 Z"
          fill="#ffffff" fill-opacity="0.98" stroke="#e8e8e8" stroke-width="1"/>
  </g>
</svg>`;

                const wingSVGRight = `
<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <g transform="translate(0,0)">
    <path d="M40 20 C80 10 120 6 150 40 C170 62 192 92 184 108 C164 90 120 74 90 64 C60 54 30 40 40 20 Z"
          fill="#ffffff" fill-opacity="0.98" stroke="#e8e8e8" stroke-width="1"/>
  </g>
</svg>`;

                /* Create wrappers where the SVG will live; position + animate via CSS classes */
                const wingLeftWrap = document.createElement("div");
                wingLeftWrap.className = "nc-wing-svg left";
                wingLeftWrap.style.pointerEvents = "none";
                wingLeftWrap.innerHTML = wingSVGLeft; // inline SVG

                const wingRightWrap = document.createElement("div");
                wingRightWrap.className = "nc-wing-svg right";
                wingRightWrap.style.pointerEvents = "none";
                wingRightWrap.innerHTML = wingSVGRight; // inline SVG

                // append in z-order: wings first (behind), body last (on top)
                inner.appendChild(wingLeftWrap);
                inner.appendChild(wingRightWrap);
                inner.appendChild(bodyImg);

                container.appendChild(inner);

                // Interactive behavior: fly away on hover/click
                const flyAway = () => {
                    if (inner.classList.contains("flying-away")) return;

                    inner.classList.add("flying-away");

                    // Fly up and away (random horizontal direction)
                    const moveX = (Math.random() - 0.5) * 1500;
                    const moveY = -1500 - Math.random() * 500; // Fly straight up off screen

                    inner.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.5) rotate(${moveX > 0 ? 15 : -15}deg)`;
                    inner.style.transition = "transform 2s ease-in";
                };

                container.addEventListener("mouseenter", flyAway);
                container.addEventListener("click", flyAway);

                frag.appendChild(container);
            }
            root.appendChild(frag);
        }
    }, [count, spread]);

    return (
        <motion.div
            ref={rootRef}
            className="fixed inset-0 pointer-events-none z-30 overflow-visible transition-opacity duration-700"
            style={{ x, opacity: currentZone === 1 ? 0 : 1 }} // Apply scroll parallax and visibility
        >
            {/* Birds injected here */}
        </motion.div>
    );
}
