"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface HorizontalScrollProps {
    children: React.ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const ghostRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);
    const [viewportW, setViewportW] = useState(0);

    useEffect(() => {
        scrollRef.current && setScrollRange(scrollRef.current.scrollWidth);
    }, [scrollRef, children]);

    useEffect(() => {
        const handleResize = () => {
            setViewportW(window.innerWidth);
            if (scrollRef.current) {
                setScrollRange(scrollRef.current.scrollWidth);
            }
        };

        handleResize(); // Initial set
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll();
    const transform = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -scrollRange + viewportW]
    );

    const physics = { damping: 15, mass: 0.27, stiffness: 55 };
    const spring = useSpring(transform, physics);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-ocean-deep">
                <motion.div
                    ref={scrollRef}
                    style={{ x: spring }}
                    className="flex h-full w-max"
                >
                    {children}
                </motion.div>
            </div>

            {/* Ghost container to enable vertical scrolling to drive horizontal movement */}
            <div
                ref={ghostRef}
                style={{ height: scrollRange }}
                className="w-full"
            />
        </>
    );
}
