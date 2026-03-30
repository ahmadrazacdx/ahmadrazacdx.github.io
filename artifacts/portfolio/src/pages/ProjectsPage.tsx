import SplashCursor from "@/components/SplashCursor";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30">
      <SplashCursor />

      <div className="relative z-10 pt-24 pb-28 md:pb-0">
        <Navbar />
        <Projects />
      </div>
    </div>
  );
}
