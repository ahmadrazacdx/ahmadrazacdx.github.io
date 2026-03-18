import { motion } from "framer-motion";
import { ArrowRight, Terminal, User } from "lucide-react";
import { HighlightLink } from "./HighlightLink";

function PortraitFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center"
    >
      {/* Spinning beam wrapper */}
      <div className="portrait-beam-wrapper">
        {/* The spinning conic gradient beam */}
        <div className="portrait-beam" />
        {/* Frosted inner frame */}
        <div className="portrait-inner">
          {/* Replace src with your actual portrait image */}
          <img
            src={`${import.meta.env.BASE_URL}images/profile_pic.jpeg`}
            alt="Ahmad Raza"
            className="w-full h-full object-cover opacity-90"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "flex";
            }}
          />
          {/* Fallback placeholder shown if image missing */}
          <div className="portrait-placeholder" style={{ display: "none" }}>
            <User className="w-20 h-20 text-white/20" />
            <span className="text-white/30 text-sm font-medium mt-3">Add your portrait here</span>
            <span className="text-white/20 text-xs mt-1">public/images/profile.jpg</span>
          </div>
        </div>
      </div>

      {/* Soft ambient glow behind frame */}
      <div className="absolute inset-0 bg-primary/10 rounded-[28px] blur-[60px] -z-10 scale-110" />
    </motion.div>
  );
}

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 xl:gap-20 items-center">

          {/* Left — Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6"
            >
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide uppercase">Deep Learning Practitioner & Researcher</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-9xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter mb-6"
            >
              <span className="text-gradient">Ahmad</span> <br/>
              <span className="text-gradient">Raza</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              Final-year Software Engineering Undergraduate at <HighlightLink text="Thal University Bhakkar" href="https://www.tu.edu.pk" external />, Pakistan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="px-8 py-4 rounded-full font-semibold bg-white text-black flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-4 rounded-full font-semibold border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-md"
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Mobile/Tablet portrait */}
            <div className="mt-10 flex justify-center lg:hidden">
              <PortraitFrame />
            </div>
          </div>

          {/* Right — Portrait */}
          <div className="hidden lg:flex lg:justify-end">
            <PortraitFrame />
          </div>
        </div>
      </div>

      {/* Ambient blobs */}
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
