"use client";
import { motion } from "framer-motion";

export default function Wave2() {
    return (
        <motion.div
            className="fixed bottom-[-10px] left-0 w-[200vw] h-40 md:h-56 z-30 pointer-events-none opacity-80"
            animate={{ x: ["-50%", "0%"], y: [0, -15, 0] }}
            transition={{
                x: { duration: 35, repeat: Infinity, ease: "linear" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
        >
            <img src="/images/wave2.svg" className="w-full h-full" alt="Wave 2" />
        </motion.div>
    );
}
