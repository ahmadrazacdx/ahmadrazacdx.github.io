import SplashCursor from "@/components/SplashCursor";
import { Navbar } from "@/components/Navbar";
import { Research } from "@/components/Research";

export default function ResearchPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30">
      <SplashCursor />

      <div className="relative z-10 pt-24 pb-28 md:pb-0">
        <Navbar />
        <Research />
      </div>
    </div>
  );
}
