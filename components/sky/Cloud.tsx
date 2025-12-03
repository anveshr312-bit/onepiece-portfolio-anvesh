"use client";
import Image from "next/image";

export default function Cloud({ className }: { className?: string }) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Image
                src="/images/cloud.png"
                alt="Cloud"
                fill
                className="object-contain opacity-60 blur-[1px]"
            />
        </div>
    );
}
