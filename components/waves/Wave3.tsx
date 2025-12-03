"use client";
import { motion } from "framer-motion";

export default function Wave3() {
    return (
        <motion.div
            className="fixed bottom-0 left-0 w-[200vw] h-48 md:h-64 z-20 pointer-events-none opacity-70"
            animate={{ x: ["0%", "-50%"], y: [0, -8, 0] }}
            transition={{
                x: { duration: 45, repeat: Infinity, ease: "linear" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
        >
            <img src="/images/wave3.svg" className="w-full h-full" alt="Wave 3" />
        </motion.div>
    );
}
