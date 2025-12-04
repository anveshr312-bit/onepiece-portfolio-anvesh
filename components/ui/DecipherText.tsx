"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DecipherTextProps {
    text: string;
    className?: string;
    revealSpeed?: number; // ms per character
    scrambleSpeed?: number; // ms per scramble update
    startDelay?: number; // ms before starting
}

const ANCIENT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/~";

export default function DecipherText({
    text,
    className = "",
    revealSpeed = 50,
    scrambleSpeed = 30,
    startDelay = 0
}: DecipherTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let scrambleInterval: NodeJS.Timeout;
        let revealTimeout: NodeJS.Timeout;
        let currentIndex = 0;

        // Reset
        setDisplayText("");
        setIsComplete(false);

        const startAnimation = () => {
            scrambleInterval = setInterval(() => {
                if (currentIndex >= text.length) {
                    clearInterval(scrambleInterval);
                    setDisplayText(text); // Ensure final text is clean
                    setIsComplete(true);
                    return;
                }

                const scrambledPart = text
                    .slice(currentIndex, Math.min(currentIndex + 5, text.length))
                    .split("")
                    .map(() => ANCIENT_CHARS[Math.floor(Math.random() * ANCIENT_CHARS.length)])
                    .join("");

                setDisplayText(text.slice(0, currentIndex) + scrambledPart);
            }, scrambleSpeed);

            const revealNextChar = () => {
                if (currentIndex < text.length) {
                    currentIndex++;
                    revealTimeout = setTimeout(revealNextChar, revealSpeed);
                }
            };

            revealNextChar();
        };

        const initialDelay = setTimeout(startAnimation, startDelay);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(scrambleInterval);
            clearTimeout(revealTimeout);
        };
    }, [text, revealSpeed, scrambleSpeed, startDelay]);

    return (
        <motion.span className={className}>
            {displayText}
            {!isComplete && (
                <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
            )}
        </motion.span>
    );
}
