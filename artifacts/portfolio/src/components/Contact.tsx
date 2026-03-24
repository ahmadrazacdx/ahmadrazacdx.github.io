import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { SiOrcid, SiX } from "react-icons/si";

export function Contact() {
  const links = [
    { icon: <Mail className="w-6 h-6" />, label: "Email", href: "mailto:ahmadrazacdx@gmail.com" },
    { icon: <Github className="w-6 h-6" />, label: "GitHub", href: "https://github.com/ahmadrazacdx" },
    { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", href: "https://linkedin.com/in/ahmadrazacdx" },
    { icon: <SiOrcid className="w-6 h-6" />, label: "ORCID", href: "https://orcid.org/0009-0009-0715-6300" },
    { icon: <SiX className="w-6 h-6" />, label: "X/Twitter", href: "https://x.com/ahmadrazacdx" },
  ];

  return (
    <section id="contact" className="py-16 relative">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">Let's Connect.</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-4 text-justify-smooth">
              Open to research collaborations & internship opportunities. Always happy to talk about Deep Learning, AI research, Neuroscience, or Urdu Poetry. Feel free to reach out!
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {links.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass-card hover:bg-white/10 hover:scale-105 hover:border-white/30 transition-all duration-300 text-white font-medium"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      <footer className="mt-24 text-center text-muted-foreground text-sm border-t border-white/5 pt-8">
        <p>© {new Date().getFullYear()} Ahmad Raza. All rights reserved.</p>
      </footer>
    </section>
  );
}
