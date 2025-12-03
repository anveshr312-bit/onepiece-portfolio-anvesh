"use client";
import { useScrollContext } from "../HorizontalScrollContainer";
import { motion, useTransform, MotionValue } from "framer-motion";
import Cloud from "./Cloud";
import { useEffect, useState } from "react";

interface CloudData {
    id: number;
    top: string;
    left: string;
    scale: number;
    speed: number;
}

const ParallaxCloud = ({ data, progress }: { data: CloudData; progress: MotionValue<number> }) => {
    const parallaxX = useTransform(progress, [0, 1], ["0vw", `-${data.speed}vw`]);

    return (
        <motion.div
            className="absolute w-48 h-24 md:w-80 md:h-40"
            style={{ top: data.top, left: data.left, scale: data.scale, x: parallaxX }}
        >
            <motion.div
                className="w-full h-full"
                animate={{ x: ["-5%", "5%"] }}
                transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
                <Cloud />
            </motion.div>
        </motion.div>
    );
};

export default function CloudField() {
    const { scrollXProgress } = useScrollContext();
    const [clouds, setClouds] = useState<CloudData[]>([]);

    useEffect(() => {
        const newClouds = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            top: Math.random() * 50 + "%",
            left: (Math.random() * 400) - 50 + "%", // Spread widely
            scale: 0.4 + Math.random() * 0.8,
            speed: 20 + Math.random() * 100 // Parallax speed
        }));
        setClouds(newClouds);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {clouds.map((cloud) => (
                <ParallaxCloud key={cloud.id} data={cloud} progress={scrollXProgress} />
            ))}
        </div>
    );
}
