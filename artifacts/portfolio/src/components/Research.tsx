import { motion } from "framer-motion";
import { ExternalLink, FileText, BookOpen } from "lucide-react";

export function Research() {
  const writings = [
    {
      title: "EduRAG: Verified and Stateless Cognitive Load-Aware Adaptation for Retrieval-Augmented Generation",
      venue: "Proposed Work · Summer 2026",
      abstract: "Educational Retrieval-Augmented Generation (RAG) systems face a fundamental, unaddressed tension: knowledge grounding mechanisms assume output should approximate source form, but pedagogical effectiveness demands cognitive-level transformation — simplification, analogy, and instantiation. This research presents EduRAG, a lightweight offline-first RAG architecture addressing this Adaptation-Grounding Tension through three primary contributions (CLAG, AGR, ERSA) and two application demonstrations (PCO, CAQ).",
      tags: ["AI in Education", "RAG", "Cognitive Adaptation", "RAG Evaluation"],
      pdf: `${import.meta.env.BASE_URL}research_proposal.pdf`,
      link: undefined,
      featured: true
    }
  ];

  const researchAreas = [
    {
      title: "Multi-Agent RAG Systems",
      description: "Designing orchestrated offline-first multi-agent pipelines that direct queries to specialized retrieval and reasoning sub-tasks with self-reflection, improving factual grounding and verification in LLM outputs.",
      tags: ["LLMs", "Agentic AI", "RAG"]
    },
    {
      title: "Cognitive Load Aware Generation",
      description: "Building AI tutoring systems that adapt their responses and explanation depth based on inferred cognitive load signals from query without user interaction models, also verification of pedagogically transformed responses.",
      tags: ["NLP", "Cognitive Adaptation", "AI in Education"]
    },
    {
      title: "Sequence Modeling from Scratch",
      description: "Implementing RNN, LSTM, GRU, and attention architectures without auto-differentiation to deeply understand gating mechanisms, BPTT, gradient flow, training dynamics and geometry in dynamic networks.",
      tags: ["Sequence Modeling", "Deep Learning", "Education"]
    }
  ];

  return (
    <section id="research" className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Research</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Exploring intelligence through rigorous theory, empirical experiments, and written synthesis.
          </p>
        </motion.div>

        {/* Technical Writing */}
        <div className="grid gap-6 mb-16">
          {writings.map((pub, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className={`glass-card p-8 group ${
                pub.featured ? "border-primary/40 shadow-[0_0_30px_-10px_rgba(139,92,246,0.15)]" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                      {pub.venue}
                    </span>
                    {pub.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {pub.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-justify-smooth mb-6 leading-relaxed">
                    {pub.abstract}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map(tag => (
                      <span key={tag} className="text-sm text-white/60 bg-white/5 px-3 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {pub.pdf ? (
                    <a 
                      href={pub.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors" 
                      title="Read"
                    >
                      <FileText className="w-5 h-5" />
                    </a>
                  ) : (
                    <>
                      <a href={pub.link || "#"} className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors" title="Read">
                        <FileText className="w-5 h-5" />
                      </a>
                      <a href={pub.link || "#"} className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors" title="Open Link">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Areas */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-display font-bold mb-8 text-muted-foreground"
        >
          Current Research Directions
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-6">
          {researchAreas.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 group hover:-translate-y-1 transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-display font-bold mb-3 group-hover:text-primary transition-colors">{area.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify-smooth mb-4">{area.description}</p>
              <div className="flex flex-wrap gap-2">
                {area.tags.map(tag => (
                  <span key={tag} className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
