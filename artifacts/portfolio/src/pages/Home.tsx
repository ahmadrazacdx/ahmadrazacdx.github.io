import { MouseHover } from "@/components/MouseHover";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30">
      <MouseHover />
      
      {/* Content Wrapper */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Contact />
      </div>
    </div>
  );
}
