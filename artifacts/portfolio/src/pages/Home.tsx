import { MouseHover } from "@/components/MouseHover";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30">
      <MouseHover />
      
      {/* Content Wrapper */}
      <div className="relative z-10 pb-28 md:pb-0">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}
