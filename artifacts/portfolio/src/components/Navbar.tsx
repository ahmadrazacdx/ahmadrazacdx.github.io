import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Menu, X } from "lucide-react";

const SECTIONS = ["about", "skills", "projects", "research", "contact"] as const;

export function Navbar() {
  const [location] = useLocation();
  const isHome = location === "/";
  const isWriting = location.startsWith("/blog");

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const NAVBAR_OFFSET = 100;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // At the very top — nothing active
      if (scrollY < 80) {
        setActiveSection(null);
        return;
      }

      // Walk sections in reverse; pick the last one whose top edge
      // has scrolled past the navbar offset line
      let current: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + scrollY - NAVBAR_OFFSET <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // sync on mount without triggering false highlight

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const scrollTo = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-5 flex justify-center pointer-events-none hidden md:flex"
      >
      <div className="pointer-events-auto">
        {/* Gradient border wrapper */}
        <div
          className="rounded-full p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.45) 0%, rgba(59,130,246,0.25) 50%, rgba(99,102,241,0.15) 100%)",
          }}
        >
          <div
            className="flex items-center gap-0.5 px-2 py-1.5 rounded-full"
            style={{
              background: "hsl(240 12% 5% / 0.92)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            {/* Section items */}
            {SECTIONS.slice(0, 4).map((id) => {
              const label = id.charAt(0).toUpperCase() + id.slice(1);
              const isActive = isHome && activeSection === id;

              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium outline-none transition-colors duration-200 cursor-pointer"
                  style={{
                    color: isActive
                      ? "#ffffff"
                      : "hsl(240 5% 52%)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(139,92,246,0.22) 0%, rgba(59,130,246,0.14) 100%)",
                        border: "1px solid rgba(139,92,246,0.35)",
                        boxShadow: "0 0 12px rgba(139,92,246,0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}

            {/* Resume */}
            <a
              href={`${import.meta.env.BASE_URL}Ahmad_Raza_Resume.pdf`}
              download
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-white"
              style={{ color: "hsl(240 5% 52%)" }}
              title="Download Resume"
            >
              <span className="relative z-10">Resume</span>
            </a>

            {/* Contact button */}
            {(() => {
              const id = "contact";
              const label = "Contact";
              const isActive = isHome && activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium outline-none transition-colors duration-200 cursor-pointer"
                  style={{
                    color: isActive
                      ? "#ffffff"
                      : "hsl(240 5% 52%)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(139,92,246,0.22) 0%, rgba(59,130,246,0.14) 100%)",
                        border: "1px solid rgba(139,92,246,0.35)",
                        boxShadow: "0 0 12px rgba(139,92,246,0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })()}

            {/* Divider */}
            <div
              className="mx-1 h-4 w-px rounded-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />

            {/* Writing link */}
            <Link href="/blog">
              <div
                className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200"
                style={{
                  color: isWriting ? "#ffffff" : "hsl(240 5% 52%)",
                }}
              >
                {isWriting && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.22) 0%, rgba(59,130,246,0.14) 100%)",
                      border: "1px solid rgba(139,92,246,0.35)",
                      boxShadow: "0 0 12px rgba(139,92,246,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <PenLine className="w-3.5 h-3.5" />
                  Blog
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-4 px-4 flex justify-between items-center md:hidden"
      >
        <Link href="/">
          <span className="text-lg font-display font-bold text-white cursor-pointer">
            Ahmad Raza
          </span>
        </Link>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {SECTIONS.map((id) => {
                const label = id.charAt(0).toUpperCase() + id.slice(1);
                return (
                  <button
                    key={id}
                    onClick={() => {
                      scrollTo(id);
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl font-display font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                );
              })}
              
              <a
                href={`${import.meta.env.BASE_URL}Ahmad_Raza_Resume.pdf`}
                download
                className="text-2xl font-display font-medium text-primary hover:text-white transition-colors mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </a>
              
              <div className="w-12 h-px bg-white/20 my-4" />
              
              <Link href="/blog">
                <span 
                  className="flex items-center gap-2 text-xl font-display font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PenLine className="w-5 h-5" />
                  Blog
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
