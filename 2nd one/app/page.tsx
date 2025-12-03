import HorizontalScroll from "@/components/layout/HorizontalScrollContainer";
import Navbar from "@/components/ui/Navbar";
import Ship from "@/components/ui/Ship";
import Zone1_Hero from "@/components/zones/Zone1_Hero";
import Zone2_Journey from "@/components/zones/Zone2_Journey";
import Zone3_Poneglyphs from "@/components/zones/Zone3_Poneglyphs";
import Zone4_Gears from "@/components/zones/Zone4_Gears";
import Zone5_Challenges from "@/components/zones/Zone5_Challenges";
import Zone6_Mentors from "@/components/zones/Zone6_Mentors";
import Zone7_Creative from "@/components/zones/Zone7_Creative";
import Zone8_Project from "@/components/zones/Zone8_Project";
import Zone9_Goals from "@/components/zones/Zone9_Goals";
import Zone10_Contact from "@/components/zones/Zone10_Contact";

export default function Home() {
    return (
        <main className="bg-ocean-deep min-h-screen text-white">
            <Navbar />
            <Ship />

            <HorizontalScroll>
                <div id="zone-1"><Zone1_Hero /></div>
                <div id="zone-2"><Zone2_Journey /></div>
                <div id="zone-3"><Zone3_Poneglyphs /></div>
                <div id="zone-4"><Zone4_Gears /></div>
                <div id="zone-5"><Zone5_Challenges /></div>
                <div id="zone-6"><Zone6_Mentors /></div>
                <div id="zone-7"><Zone7_Creative /></div>
                <div id="zone-8"><Zone8_Project /></div>
                <div id="zone-9"><Zone9_Goals /></div>
                <div id="zone-10"><Zone10_Contact /></div>
            </HorizontalScroll>
        </main>
    );
}
