import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Code2 } from "lucide-react";
import { HighlightLink } from "./HighlightLink";

export function About() {
  // const stats = [
  //   { label: "CGPA", value: "3.83", icon: <GraduationCap className="w-5 h-5 text-primary" /> },
  //   { label: "Projects Built", value: "5+", icon: <Code2 className="w-5 h-5 text-secondary" /> },
  //   { label: "Specializations", value: "6+", icon: <Award className="w-5 h-5 text-accent" /> },
  //   { label: "Technical Writings", value: "1", icon: <BookOpen className="w-5 h-5 text-primary" /> },
  // ];

  return (
    <section id="about" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-card p-2">
              <img 
                src={`${import.meta.env.BASE_URL}images/profile-avatar.png`} 
                alt="Ahmad Raza"
                className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Understanding Intelligence <br/>
              <span className="text-muted-foreground">From First Principles.</span>
            </h2>
            
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed text-justify-smooth">
              <p>
                My research interests lie in <HighlightLink text="Representation Learning" />, <HighlightLink text="World Models" />, <HighlightLink text="Representation Geometry" /> and <HighlightLink text="Multi-Agent LLM Systems" /> with the goal of understanding how learning systems can build internal models of their environments and use them for reasoning and planning.
              </p>
              <p>
                To study these ideas rigorously, I work from first principles, implementing neural architectures from scratch. This approach allows me to closely examine the internal mechanics of deep learning systems, including gradient dynamics, representation geometry, and optimization behavior.
              </p>
              <p>
                Besides AI, I find it interesting to read about <HighlightLink text="Philosophy of Mind" href="https://en.wikipedia.org/wiki/Philosophy_of_mind"/>, <HighlightLink text="Epistemology" href="https://en.wikipedia.org/wiki/Epistemology"/>, <HighlightLink text="Computational Neuroscience" href="https://en.wikipedia.org/wiki/Computational_neuroscience"/>, and <HighlightLink text="Cognitive Psychology" href="https://en.wikipedia.org/wiki/Cognitive_psychology"/>. I spend my free time with Urdu Literature, play chess, and listen to Classical Ghazal & Bollywood Music.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - Independent row below */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
