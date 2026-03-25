import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe, Cpu } from "lucide-react";

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Seq Modeling From Scratch",
      description: "Implemented RNN, LSTM, and GRU from first principles without auto-differentiation frameworks. Manually derived and coded forward/backward passes (BPTT) and built Seq2Seq models with Bahdanau & Luong attention for language modeling.",
      tech: ["Python", "NumPy", "Math"],
      github: "https://github.com/ahmadrazacdx/seq-modeling-from-scratch",
      demo: null,
      date: "Nov 2025",
      accent: "#facc15"
    },
    {
      title: "NeuroScope",
      description: "Production-grade Python framework for informed training and diagnosis of neural networks. Real-time diagnostics monitoring 10 health indicators (Dead Neurons, Gradient SNR, Weight Update Ratios) validated against research by Glorot, He, and Pascanu. Published to PyPI.",
      tech: ["Python", "NumPy", "Matplotlib", "PyPI"],
      github: "https://github.com/ahmadrazacdx/neuro-scope",
      demo: "https://neuroscope.dev/",
      date: "Sep 2025",
      accent: "#38bdf8"
    },
    {
      title: "House Oracle",
      description: "Dual-model regression system (Rent vs. Sale) using XGBoost on 168k+ house listings from Pakistan, achieving R²=0.86 and MAPE≈21%. Bayesian hyperparameter optimization via Optuna (100 iterations). Deployed as a Flask REST API on Hugging Face Spaces.",
      tech: ["Python", "Flask", "XGBoost", "Optuna", "JavaScript"],
      github: "https://github.com/ahmadrazacdx/house-oracle",
      demo: "https://house-oracle.pages.dev/",
      date: "Apr 2025",
      accent: "#34d399"
    }
  ];

  return (
    <section id="projects" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Projects</h2>
          <p className="text-xl text-muted-foreground">A showcase of my work in Machine Learning and Deep Learning.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const isHovered = hoveredProject === idx;

            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
              className="glass-card p-8 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300"
              style={{ borderColor: isHovered ? project.accent : "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-2xl bg-white/5 border flex items-center justify-center transition-colors"
                  style={{ borderColor: isHovered ? project.accent : "rgba(255,255,255,0.1)" }}
                >
                  <Cpu
                    className="w-6 h-6 transition-colors"
                    style={{ color: isHovered ? project.accent : "#ffffff" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{project.date}</span>
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground flex-grow mb-8 leading-relaxed text-justify-smooth text-sm">
                {project.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-medium text-accent border border-accent/30 bg-accent/10 px-2 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                      <Globe className="w-4 h-4" /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
