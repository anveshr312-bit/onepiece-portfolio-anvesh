"use client";
import Image from "next/image";

export default function Ship({ className }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <div className="relative w-full h-full z-10">
                <Image
                    src="/images/sunny.png"
                    alt="Thousand Sunny"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </div>

            {/* Reflection */}
            <div
                className="absolute top-[85%] left-0 w-full h-[60%] opacity-40 z-0"
                style={{
                    transform: "scaleY(-1)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)"
                }}
            >
                <Image
                    src="/images/sunny.png"
                    alt="Reflection"
                    fill
                    className="object-contain blur-[2px]"
                />
            </div>
        </div>
    );
}
