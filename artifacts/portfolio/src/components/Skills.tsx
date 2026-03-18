import { motion } from "framer-motion";
import { Layers } from "lucide-react";

export function Skills() {
  const row1 = [
    "Python", "JavaScript", "HTML", "CSS", "MySQL", "Tableau", "Streamlit", "Postman", "AWS", "Azure", "GCP", "Docker", "Flask", "FastAPI", "Kubernetes", "CI/CD", "GitHub Actions", "DVC", "Mlflow", "Weights & Biases",
  ];
  const row2 = [
    "Python", "JavaScript", "HTML", "CSS", "MySQL", "Tableau", "Streamlit", "Postman", "AWS", "Azure", "GCP", "Docker", "Flask", "FastAPI", "Kubernetes", "CI/CD", "GitHub Actions", "DVC", "Mlflow", "Weights & Biases",
  ];
  
  const TechCard = ({ name }: { name: string }) => (
    <div className="flex items-center gap-3 px-5 py-3 glass-card whitespace-nowrap hover:scale-105 hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 flex-shrink-0">
      <Layers className="w-4 h-4 text-secondary flex-shrink-0" />
      <span className="font-display font-semibold text-base">{name}</span>
    </div>
  );

  return (
    <section id="skills" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center"
        >
          My Full Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mt-3 text-lg"
        >
          
        </motion.p>
      </div>

      {/* Fade masks on edges */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-5">
          {/* Row 1 — scrolls left */}
          <div className="overflow-hidden">
            <div className="flex gap-4 w-max animate-marquee-left">
              {[...row1, ...row1].map((tech, i) => (
                <TechCard key={`r1-${i}`} name={tech} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="overflow-hidden">
            <div className="flex gap-4 w-max animate-marquee-right">
              {[...row2, ...row2].map((tech, i) => (
                <TechCard key={`r2-${i}`} name={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
