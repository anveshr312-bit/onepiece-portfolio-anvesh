"use client";

import React, { useRef, createContext, useContext, useEffect, useState } from "react";
import { useScroll, useSpring, MotionValue } from "framer-motion";

interface ScrollContextType {
    scrollXProgress: MotionValue<number>;
    scrollToZone: (index: number) => void;
    currentZone: number;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) throw new Error("useScrollContext must be used within HorizontalScrollContainer");
    return context;
};

export default function HorizontalScrollContainer({
    children,
    content
}: {
    children: React.ReactNode; // Fixed elements (overlays, background)
    content: React.ReactNode; // Scrollable zones
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentZone, setCurrentZone] = useState(0);

    const { scrollXProgress } = useScroll({
        container: containerRef,
    });

    const smoothProgress = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scrollToZone = (index: number) => {
        if (containerRef.current) {
            const width = window.innerWidth;
            containerRef.current.scrollTo({
                left: width * index,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (containerRef.current) {
                        const width = window.innerWidth;
                        const scrollLeft = containerRef.current.scrollLeft;
                        const zone = Math.round(scrollLeft / width);
                        setCurrentZone(zone);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        const ref = containerRef.current;
        if (ref) {
            ref.addEventListener("scroll", handleScroll, { passive: true });
            return () => ref.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <ScrollContext.Provider value={{ scrollXProgress: smoothProgress, scrollToZone, currentZone }}>
            <div className="h-screen w-screen overflow-hidden bg-sky-300 relative">
                {/* Fixed Elements (Children) */}
                {children as any}


                {/* Scroll Container */}
                <div
                    ref={containerRef}
                    className="flex h-full w-full overflow-x-scroll snap-x snap-mandatory scrollbar-hide scroll-smooth relative z-10"
                >
                    {content}
                </div>
            </div>
        </ScrollContext.Provider>
    );
}
