import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const cinzel = Cinzel({
    subsets: ["latin"],
    variable: "--font-cinzel",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Anvesh Rathore | The Journey",
    description: "A One Piece inspired portfolio journey.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} ${cinzel.variable} font-sans antialiased bg-ocean-deep text-white overflow-hidden`}>
                {children}
            </body>
        </html>
    );
}
