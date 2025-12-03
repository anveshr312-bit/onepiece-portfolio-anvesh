import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import FloatingSunny from "@/components/FloatingSunny";
import Navbar from "@/components/ui/Navbar";
import ParallaxWaves from "@/components/waves/ParallaxWaves";
import Zone1_Hero from "@/components/zones/Zone1_Hero";
import Zone2_Prologue from "@/components/zones/Zone2_Prologue";
import Zone3_Poneglyphs from "@/components/zones/Zone3_Poneglyphs";
import Zone4_Gears from "@/components/zones/Zone4_Gears";
import Zone5_Challenges from "@/components/zones/Zone5_Challenges";
import Zone6_Mentors from "@/components/zones/Zone6_Mentors";
import Zone7_Creative from "@/components/zones/Zone7_Creative";
import Zone8_Project from "@/components/zones/Zone8_Project";
import Zone9_Goals from "@/components/zones/Zone9_Goals";
import Zone10_Contact from "@/components/zones/Zone10_Contact";
import NewsCooField from "@/components/ui/NewsCooField";

import CloudField from "@/components/ui/CloudField";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-sky-500 to-sky-200">
      <HorizontalScrollContainer
        content={
          <>
            <div id="zone-1" className="flex-shrink-0 w-screen h-screen snap-center"><Zone1_Hero /></div>
            <div id="zone-2" className="flex-shrink-0 w-screen h-screen snap-center"><Zone2_Prologue /></div>
            <div id="zone-3" className="flex-shrink-0 w-screen h-screen snap-center"><Zone3_Poneglyphs /></div>
            <div id="zone-4" className="flex-shrink-0 w-screen h-screen snap-center"><Zone4_Gears /></div>
            <div id="zone-5" className="flex-shrink-0 w-screen h-screen snap-center"><Zone5_Challenges /></div>
            <div id="zone-6" className="flex-shrink-0 w-screen h-screen snap-center"><Zone6_Mentors /></div>
            <div id="zone-7" className="flex-shrink-0 w-screen h-screen snap-center"><Zone7_Creative /></div>
            <div id="zone-8" className="flex-shrink-0 w-screen h-screen snap-center"><Zone8_Project /></div>
            <div id="zone-9" className="flex-shrink-0 w-screen h-screen snap-center"><Zone9_Goals /></div>
            <div id="zone-10" className="flex-shrink-0 w-screen h-screen snap-center"><Zone10_Contact /></div>
          </>
        }
      >
        {/* Global Environmental Layers */}
        <CloudField count={15} />
        <NewsCooField count={18} />

        {/* Waves (Order: Back to Front) */}
        <ParallaxWaves>
          <FloatingSunny />
        </ParallaxWaves>

        {/* UI */}
        <Navbar />
      </HorizontalScrollContainer>
    </main>
  );
}
