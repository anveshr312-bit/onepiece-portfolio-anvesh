"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Send } from "lucide-react";

export default function Zone10_Contact() {
    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-ocean-deep overflow-hidden">
            {/* Stars Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Contact Form */}
                <div>
                    <h2 className="text-4xl font-heading text-white mb-6">Join My Crew</h2>
                    <p className="text-ocean-200 mb-8">
                        If you’d like to share ideas, opportunities, or feedback, feel free to reach out.
                    </p>

                    <form className="space-y-4 max-w-md">
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-ocean-800/50 border border-ocean-700 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-ocean-800/50 border border-ocean-700 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Message"
                                rows={4}
                                className="w-full bg-ocean-800/50 border border-ocean-700 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors"
                            />
                        </div>
                        <button className="w-full bg-gold text-ocean-900 font-bold py-3 rounded hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
                            <Send size={18} /> Send Message
                        </button>
                    </form>

                    <div className="flex gap-6 mt-8">
                        <a href="mailto:anveshr312@gmail.com" className="flex items-center gap-2 text-ocean-300 hover:text-gold transition-colors">
                            <Mail size={20} /> anveshr312@gmail.com
                        </a>
                        <a href="https://instagram.com/anvesh__rathore" className="flex items-center gap-2 text-ocean-300 hover:text-gold transition-colors">
                            <Instagram size={20} /> @anvesh__rathore
                        </a>
                    </div>
                </div>

                {/* Right: Quotes */}
                <div className="space-y-12 text-right">
                    <motion.blockquote
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="border-r-4 border-red-500 pr-6"
                    >
                        <p className="text-xl italic text-white/90 mb-2">
                            “One of the reasons why Spider-Man is my favorite superhero is because we both undergo big changes in our lives.”
                        </p>
                        <footer className="text-sm text-ocean-400">– Tom Holland</footer>
                    </motion.blockquote>

                    <motion.blockquote
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="border-r-4 border-gold pr-6"
                    >
                        <p className="text-xl italic text-white/90 mb-2">
                            “It’s not about whether I can or not. I’m gonna do it because I want to.”
                        </p>
                        <footer className="text-sm text-ocean-400">– Monkey D. Luffy</footer>
                    </motion.blockquote>

                    <div className="text-sm text-white/30 pt-12">
                        This journey is still incomplete. That’s exactly why it’s worth sailing.
                    </div>
                </div>

            </div>
        </section>
    );
}
