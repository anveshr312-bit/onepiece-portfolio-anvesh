"use client";

import React from "react";
// We might need to adjust this for the custom scroll
// Since we are hijacking scroll, standard react-scroll might not work out of the box with the ghost div.
// For now, let's implement a simple jump-to logic or just visual links.
// Actually, with the ghost div method, window.scrollTo works for the vertical scroll, which drives the horizontal.
// So we just need to calculate the offset.

interface NavItem {
    name: string;
    id: string; // This will correspond to the index or ID of the section
}

const navItems: NavItem[] = [
    { name: "Home", id: "zone-1" },
    { name: "Journey", id: "zone-2" },
    { name: "Poneglyphs", id: "zone-3" },
    { name: "Gears", id: "zone-4" },
    { name: "Challenges", id: "zone-5" },
    { name: "Mentors", id: "zone-6" },
    { name: "Arts", id: "zone-7" },
    { name: "Project", id: "zone-8" },
    { name: "Future", id: "zone-9" },
    { name: "Contact", id: "zone-10" },
];

export default function Navbar() {
    const scrollToSection = (index: number) => {
        // Rough estimation: each section is 100vw.
        // The ghost div height is roughly total width.
        // So to scroll to section N, we scroll vertically to N * viewportWidth.
        const viewportWidth = window.innerWidth;
        window.scrollTo({
            top: index * viewportWidth,
            behavior: "smooth",
        });
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-ocean-deep/80 to-transparent backdrop-blur-sm">
            <div className="text-xl font-heading font-bold text-gold tracking-widest">
                AR
            </div>
            <ul className="hidden md:flex space-x-6">
                {navItems.map((item, index) => (
                    <li key={item.name}>
                        <button
                            onClick={() => scrollToSection(index)}
                            className="text-sm font-medium text-ocean-100 hover:text-gold transition-colors uppercase tracking-wider"
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
            {/* Mobile Menu Button Placeholder */}
            <div className="md:hidden text-gold">
                MENU
            </div>
        </nav>
    );
}
