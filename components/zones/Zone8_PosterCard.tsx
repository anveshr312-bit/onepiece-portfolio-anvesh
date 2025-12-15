"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PosterCardProps {
    children: ReactNode;
    className?: string; // Allow passing extra classes if needed
    onClick?: () => void;
    style?: React.CSSProperties;
}

export default function PosterCard({ children, className = "", onClick, style }: PosterCardProps) {
    return (
        <motion.div
            className={`drop-shadow-2xl ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
