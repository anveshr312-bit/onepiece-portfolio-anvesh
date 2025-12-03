import type { Metadata } from "next";
import { Playfair_Display, Outfit, Cedarville_Cursive } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const cedarville = Cedarville_Cursive({ weight: "400", subsets: ["latin"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: "Anvesh Rathore | One Piece Portfolio",
  description: "Sailing toward the version of myself I haven’t discovered yet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${outfit.variable} ${cedarville.variable} font-sans antialiased overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
