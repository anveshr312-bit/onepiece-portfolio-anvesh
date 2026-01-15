"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Send } from "lucide-react";

export default function Zone10_Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`;
        window.location.href = `mailto:anveshr312@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center bg-ocean-deep overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/images/zone10bg.webp"
                    alt="contact background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Contact Form */}
                <div>
                    <div className="mb-6">
                        <span className="block text-ocean-400 font-serif text-lg tracking-wide mb-1">Let’s Connect</span>
                        <h2 className="text-4xl md:text-5xl font-heading text-white">Join My Crew</h2>
                    </div>

                    <p className="text-ocean-200 mb-8 max-w-lg text-lg leading-relaxed">
                        If you’d like to discuss internships, collaborations, or have feedback on my work, I’d love to hear from you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full bg-ocean-800/50 border border-ocean-700 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors backdrop-blur-sm"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email (so I can reply)"
                                className="w-full bg-ocean-800/50 border border-ocean-700 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors backdrop-blur-sm"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your message or opportunity"
                                rows={4}
                                className="w-full bg-ocean-800/50 border border-ocean-700 rounded p-3 text-white focus:border-gold focus:outline-none transition-colors backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <button type="submit" className="w-full bg-gold text-ocean-900 font-bold py-3 rounded hover:bg-gold-light transition-colors flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
                                <Send size={18} /> Send Message
                            </button>
                            <p className="text-center text-xs text-white/40 italic font-serif">
                                I personally read every message.
                            </p>
                        </div>
                    </form>

                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                        <a href="mailto:anveshr312@gmail.com" className="flex items-center gap-3 text-ocean-200 hover:text-gold transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                <Mail size={18} />
                            </div>
                            <span className="font-medium">Email me: anveshr312@gmail.com</span>
                        </a>
                        <a href="https://instagram.com/anvesh__rathore" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ocean-200 hover:text-gold transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                <Instagram size={18} />
                            </div>
                            <span className="font-medium">Instagram: @anvesh__rathore</span>
                        </a>
                    </div>
                </div>

                {/* Right: Quotes */}
                <div className="space-y-0 text-right visible md:block mt-100">
                    <motion.blockquote
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="border-r-4 border-gold pr-8 pl-8 inline-block"
                    >
                        <span className="block text-sm text-ocean-400 font-medium tracking-wide uppercase mb-3 text-right">
                            A mindset I try to live by
                        </span>
                        <p className="text-xl md:text-xl italic text-white/90 mb-4 font-serif leading-relaxed">
                            “It’s not about whether I can or not. I’m gonna do it because I want to.”
                        </p>
                        <footer className="text-base text-ocean-400 font-medium tracking-wide uppercase">
                            – Monkey D. Luffy
                        </footer>
                    </motion.blockquote>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        transition={{ delay: 0.8 }}
                        className="text-sm text-white/100 pt-16 font-serif italic"
                    >
                        This journey is still unfolding, and I’m excited to see where it leads next.
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
