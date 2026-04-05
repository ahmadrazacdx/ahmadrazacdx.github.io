import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId?: string;
  tags: string[];
  credentialUrl?: string;
  tint: string;
  accent: string;
};

const certificates: Certificate[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "Nov 2025",
    image: `${import.meta.env.BASE_URL}images/certificates/dl-spec-dlai.jpg`,
    credentialId: "CFQLNORGBIWM",
    tags: ["Neural Networks", "RNNs", "Transformer", "Sequence Modeling", "Neural Machine Translation"],
    credentialUrl: "https://coursera.org/verify/specialization/CFQLNORGBIWM",
    tint: "rgba(255, 213, 79, 0.14)",
    accent: "#ffd54f",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University",
    date: "Oct 2025",
    image: `${import.meta.env.BASE_URL}images/certificates/ml-spec-dlai.jpg`,
    credentialId: "QB7M4Y3N3A3Q",
    tags: ["Supervised Learning", "Unsupervised Learning", "Recommender Systems", "Reinforcement Learning"],
    credentialUrl: "https://coursera.org/verify/specialization/QB7M4Y3N3A3Q",
    tint: "rgba(239, 68, 68, 0.14)",
    accent: "#ef4444",
  },
  {
    title: "Mathematics for Machine Learning and Data Science",
    issuer: "DeepLearning.AI",
    date: "Oct 2025",
    image: `${import.meta.env.BASE_URL}images/certificates/math-spec.jpg`,
    credentialId: "OC9J6N03ZJQI",
    tags: ["Linear Algebra", "Calculus", "Statistics", "Probability"],
    credentialUrl: "https://coursera.org/verify/specialization/OC9J6N03ZJQI",
    tint: "rgba(139, 92, 246, 0.14)",
    accent: "#8b5cf6",
  },
  {
    title: "MLOps | Machine Learning Operations Specialization",
    issuer: "Duke University",
    date: "Oct 2025",
    image: `${import.meta.env.BASE_URL}images/certificates/duke-mlops-spec.jpg`,
    credentialId: "YQ9GJU4F32XY",
    tags: ["MLOps", "Model Deployment", "Pipeline Orchestration", "CI/CD for ML"],
    credentialUrl: "https://coursera.org/verify/specialization/YQ9GJU4F32XY",
    tint: "rgba(59, 130, 246, 0.14)",
    accent: "#3b82f6",
  },
  {
    title: "Machine Learning Professional Certificate",
    issuer: "IBM",
    date: "Oct 2025",
    image: `${import.meta.env.BASE_URL}images/certificates/ibm-ml-spec.jpg`,
    credentialId: "LEC0K9XY6YFH",
    tags: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Time Series Forecasting"],
    credentialUrl: "https://coursera.org/verify/specialization/LEC0K9XY6YFH",
    tint: "rgba(234, 179, 8, 0.14)",
    accent: "#facc15",
  },
  {
    title: "Applied Data Science Specialization",
    issuer: "IBM",
    date: "Oct 2025",
    image: `${import.meta.env.BASE_URL}images/certificates/ibm-ds-spec.jpg`,
    credentialId: "3SV2LBV95VTL",
    tags: ["Python", "Data Analysis", "EDA", "Data Visualization", "Statistical Analysis"],
    credentialUrl: "https://coursera.org/verify/specialization/3SV2LBV95VTL",
    tint: "rgba(234, 179, 8, 0.14)",
    accent: "#14b8a6",
  },
  {
    title: "Google Advanced Data Analytics Professional Certificate",
    issuer: "Google",
    date: "Oct 2025",
    image: `${import.meta.env.BASE_URL}images/certificates/google-spec.jpg`,
    credentialId: "LZUGSNU4N4KJ",
    tags: ["Google Analytics", "Data Analysis", "EDA", "Statistical Analysis", "Predictive Modeling"],
    credentialUrl: "https://coursera.org/verify/specialization/LZUGSNU4N4KJ",
    tint: "rgba(234, 179, 8, 0.14)",
    accent: "#f97316",
  },
  {
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp",
    date: "Aug 2024",
    image: `${import.meta.env.BASE_URL}images/certificates/free-code-camp.jpg`,
    credentialId: "N/A",
    tags: ["Data Analysis", "Data Visualization", "Matplotlib", "Seaborn"],
    credentialUrl: "https://www.freecodecamp.org/certification/ahmadrazacdx/data-analysis-with-python-v7",
    tint: "rgba(34, 197, 94, 0.14)",
    accent: "#84cc16",
  },
  {
    title: "CS50P: Introduction to Programming with Python",
    issuer: "Harvard University",
    date: "Aug 2023",
    image: `${import.meta.env.BASE_URL}images/certificates/cs50p.jpg`,
    credentialId: "e9f2d08e-4eee-4e95-b602-dcd2d6f05ff7",
    tags: ["Python Programming", "Object-Oriented Programming", "Problem Solving"],
    credentialUrl: "https://cs50.harvard.edu/certificates/e9f2d08e-4eee-4e95-b602-dcd2d6f05ff7",
    tint: "rgba(34, 197, 94, 0.14)",
    accent: "#ec4899",
  },
];

export function Certificates() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  return (
    <section id="certificates" className="relative z-10 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h1
            className="torch-heading text-4xl md:text-5xl font-display font-bold"
            data-text="Professional Certifications"
          >
            Professional Certifications
          </h1>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {certificates.map((cert, idx) => {
            const isHovered = hoveredCard === idx;

            return (
            <motion.article
              key={`${cert.title}-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03] backdrop-blur-xl hover:-translate-y-1 transition-all duration-300"
              style={{
                borderColor: isHovered ? cert.accent : "rgba(255,255,255,0.1)",
                boxShadow: isHovered
                  ? `0 18px 44px -22px ${cert.tint}`
                  : `0 14px 35px -24px ${cert.tint}`,
              }}
            >
              <div
                className="aspect-[4/3] border-b border-white/10 flex items-center justify-center"
                style={{
                  borderBottomColor: isHovered ? cert.accent : "rgba(255,255,255,0.1)",
                  background: `linear-gradient(135deg, ${cert.tint} 0%, rgba(255,255,255,0.02) 100%)`,
                }}
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className={`w-full h-full object-cover rounded-lg transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] tracking-[0.08em] uppercase text-white/70 font-semibold">{cert.issuer}</span>
                  <span className="text-xs text-white/50">{cert.date}</span>
                </div>

                <h3 className="text-base md:text-[17px] font-display font-semibold leading-tight text-white mb-2">{cert.title}</h3>

                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-white/45 mb-4">ID: {cert.credentialId}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-5">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-md border bg-white/5 text-white/65 transition-colors duration-300"
                      style={{ borderColor: isHovered ? cert.accent : "rgba(255,255,255,0.1)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={cert.credentialUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredButton(idx)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="inline-flex items-center gap-2 text-sm text-white/70 border rounded-lg px-3.5 py-2 hover:text-white hover:bg-white/5 transition-colors duration-300"
                  style={{ borderColor: hoveredButton === idx ? cert.accent : "rgba(255,255,255,0.15)" }}
                >
                  Show Credential
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
            );
          })}
        </div>

        <p className="text-center text-sm text-white/50 mt-12">Always Learning, Always Growing.</p>
      </div>
    </section>
  );
}
