"use client";
import { motion } from "framer-motion";

export default function Wave1() {
    return (
        <motion.div
            className="fixed bottom-[-20px] left-0 w-[200vw] h-32 md:h-48 z-50 pointer-events-none opacity-90"
            animate={{ x: ["0%", "-50%"], y: [0, -10, 0] }}
            transition={{
                x: { duration: 25, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <img src="/images/wave1.svg" className="w-full h-full" alt="Wave 1" />
        </motion.div>
    );
}
