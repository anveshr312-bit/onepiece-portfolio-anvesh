"use client";
import { motion } from "framer-motion";

export default function Zone8_Projects() {
    return (
        <section className="h-screen w-screen flex-shrink-0 relative flex items-center justify-center snap-center bg-amber-950">
            <div className="text-center z-10">
                <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mb-12">Projects</h2>
                <div className="flex gap-8 justify-center flex-wrap">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-64 h-96 bg-[#f4e4bc] text-black flex flex-col items-center p-4 shadow-2xl relative"
                            initial={{ rotate: i % 2 === 0 ? 2 : -2 }}
                            whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-400 opacity-50" /> {/* Pin */}
                            <h3 className="text-3xl font-serif tracking-widest mb-2 mt-2 border-b-2 border-black w-full text-center">WANTED</h3>
                            <div className="w-full h-40 bg-gray-800 mb-2 border-2 border-black" />
                            <p className="font-bold text-xl font-serif">Project {i}</p>
                            <p className="text-xs mt-1 font-mono">DEAD OR ALIVE</p>
                            <div className="mt-auto w-full border-t-2 border-black pt-2 flex justify-between items-center">
                                <span className="font-serif text-xl">฿</span>
                                <span className="font-serif text-xl">1,000,000,000</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
