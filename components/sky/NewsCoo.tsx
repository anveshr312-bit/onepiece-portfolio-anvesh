"use client";

import React, { useEffect, useRef } from "react";

type Props = {
    count?: number;
    spread?: number;
};

export default function NewsCooField({ count = 8, spread = 20000 }: Props) {
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const root = rootRef.current!;
        if (!root) return;

        // Mouse parallax logic
        const onMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            root.style.setProperty("--mx", x.toFixed(3));
            root.style.setProperty("--my", y.toFixed(3));
        };
        window.addEventListener("mousemove", onMouseMove);

        // Scroll parallax logic
        const scrollContainer = document.getElementById("horizontal-scroll");
        const onScroll = () => {
            if (scrollContainer) {
                root.style.setProperty("--scroll-x", `${scrollContainer.scrollLeft}`);
            }
        };
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", onScroll);
        } else {
            setTimeout(() => {
                const el = document.getElementById("horizontal-scroll");
                if (el) el.addEventListener("scroll", onScroll);
            }, 500);
        }

        // create birds once
        if (root.children.length === 0) {
            const frag = document.createDocumentFragment();
            for (let i = 0; i < count; i++) {
                const container = document.createElement("div");
                container.className = "news-coo-container";

                // Random size
                const size = Math.round(60 + Math.random() * 40); // 60-100px

                // Linear distribution
                const x = Math.random() * spread;
                const y = 100 + Math.random() * 500; // 100-600px down
                const z = Math.round((Math.random() - 0.5) * 200);

                // Random speed for bobbing/flapping
                const speed = (2 + Math.random() * 2).toFixed(2);
                const delay = (Math.random() * -5).toFixed(2);

                container.style.width = `${size}px`;
                container.style.height = `${size * 0.8}px`; // Aspect ratio adjustment
                container.style.setProperty("--bx", `${x}px`);
                container.style.setProperty("--by", `${y}px`);
                container.style.setProperty("--bz", `${z}px`);
                container.style.setProperty("--bspd", `${speed}s`);
                container.style.setProperty("--bdel", `${delay}s`);

                // Create inner wrapper for interactive movement (so we don't conflict with main animation)
                const inner = document.createElement("div");
                inner.className = "nc-inner";
                inner.style.width = "100%";
                inner.style.height = "100%";
                inner.style.position = "relative";
                inner.style.transition = "transform 0.5s ease-out";
                inner.style.transformStyle = "preserve-3d";

                // Create wings and body
                const wingLeft = document.createElement("div");
                wingLeft.className = "nc-wing left";

                const body = document.createElement("div");
                body.className = "nc-body";

                const wingRight = document.createElement("div");
                wingRight.className = "nc-wing right";

                inner.appendChild(wingLeft);
                inner.appendChild(body);
                inner.appendChild(wingRight);

                container.appendChild(inner);

                // Interactive behavior: fly away on click
                container.addEventListener("click", () => {
                    inner.classList.add("flying-away");

                    // Fly up and away (random horizontal direction)
                    const moveX = (Math.random() - 0.5) * 1000;
                    const moveY = -1500; // Fly straight up off screen

                    inner.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.5)`;
                    inner.style.transition = "transform 1.5s ease-in";

                    // Reset after 3 seconds
                    setTimeout(() => {
                        inner.classList.remove("flying-away");
                        inner.style.transition = "none";
                        inner.style.transform = "translate(0, 0) scale(1)";
                        // Force reflow
                        void inner.offsetWidth;
                        inner.style.transition = "transform 0.5s ease-out";
                    }, 3000);
                });

                frag.appendChild(container);
            }
            root.appendChild(frag);
        }

        const onResize = () => { };
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
            if (scrollContainer) scrollContainer.removeEventListener("scroll", onScroll);
        };
    }, [count, spread]);

    const [visible, setVisible] = React.useState(true);

    useEffect(() => {
        const check = () => {
            const zone2State = document.body.dataset.zone2;
            if (zone2State === "revealed") {
                setVisible(false);
            } else {
                setVisible(true);
            }
        };
        check();
        const mo = new MutationObserver(check);
        mo.observe(document.body, { attributes: true, attributeFilter: ["data-zone2"] });
        return () => mo.disconnect();
    }, []);

    return <div ref={rootRef} className="bird-root" aria-hidden style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }} />;
}
