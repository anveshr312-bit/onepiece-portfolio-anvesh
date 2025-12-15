import { useEffect, useRef } from "react";

export default function useParallax(ref: React.RefObject<HTMLElement>) {
    const raf = useRef<number | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let mx = 0, my = 0, vx = 0, vy = 0;
        function onMove(e: MouseEvent) {
            const r = el!.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            const dx = (e.clientX - cx) / r.width; // -0.5 .. 0.5
            const dy = (e.clientY - cy) / r.height;
            mx = dx * 12; // multiplier
            my = dy * 8;
            if (raf.current === null) loop();
        }
        function loop() {
            vx += (mx - vx) * 0.08;
            vy += (my - vy) * 0.08;
            // apply transforms to layers
            const throne = el!.querySelector<HTMLElement>(".zone5-throne");
            const pillars = el!.querySelector<HTMLElement>(".zone5-pillars");
            const fog = el!.querySelector<HTMLElement>(".zone5-fog");
            if (throne) throne.style.transform = `translate3d(${vx * 0.4}px, ${vy * 0.2}px, 0)`;
            if (pillars) pillars.style.transform = `translate3d(${vx * 0.7}px, ${vy * 0.25}px, 0)`;
            if (fog) fog.style.transform = `translate3d(${vx * 0.9}px, ${vy * 0.15}px, 0)`;
            raf.current = requestAnimationFrame(loop);
        }
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            if (raf.current) cancelAnimationFrame(raf.current);
            raf.current = null;
        };
    }, [ref]);
}
