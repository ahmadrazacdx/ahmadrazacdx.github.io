import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

const SCROLL_SECTIONS = ["about"] as const;

export function Navbar() {
  const [location] = useLocation();
  const isHome = location === "/";
  const isWriting = location.startsWith("/blog");
  const isProjectsPage = location === "/projects" || location === "/projects/";
  const isResearchPage = location === "/research" || location === "/research/";
  const isCertificatesPage = location === "/certificates" || location === "/certificates/";

  const [activeSection, setActiveSection] = useState<string | null>(null);

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
      for (const id of SCROLL_SECTIONS) {
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
      window.location.href = `${import.meta.env.BASE_URL}#${id}`;
    }
  };

  const navContainerStyle = {
    background: "rgba(17, 17, 18, 0.15)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
  } as const;

  const activePillStyle = {
    background: "#1a1625",
    borderRadius: "9999px",
    boxShadow: "0 0 20px 6px rgba(169,147,254,0.30), 0 0 40px 12px rgba(169,147,254,0.10), inset 0 1px rgba(255,255,255,0.10)",
  } as const;

  const baseItemClass =
    "relative flex items-center justify-center rounded-full h-9 px-4 text-sm font-normal transition-all duration-300 ease-out cursor-pointer text-[#cccccc] hover:text-white hover:bg-white/5 hover:-translate-y-px";

  const aboutActive = isHome;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 top-8 z-[100] hidden w-fit max-w-[95vw] -translate-x-1/2 items-center justify-center rounded-full px-3 py-2 md:flex"
        style={navContainerStyle}
      >
        <ul className="flex items-center gap-1 px-1">
          <li className="flex-shrink-0">
            <button
              onClick={() => scrollTo("about")}
              className={baseItemClass}
              style={{ color: aboutActive ? "#ffffff" : undefined }}
            >
              {aboutActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full"
                  style={activePillStyle}
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
              <span className="relative z-10">About</span>
            </button>
          </li>

          <li className="flex-shrink-0">
            <Link href="/certificates">
              <div
                className={baseItemClass}
                style={{ color: isCertificatesPage ? "#ffffff" : undefined }}
              >
                {isCertificatesPage && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full"
                    style={activePillStyle}
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <span className="relative z-10">Certificates</span>
              </div>
            </Link>
          </li>

          <li className="flex-shrink-0">
            <Link href="/projects">
              <div
                className={baseItemClass}
                style={{ color: isProjectsPage ? "#ffffff" : undefined }}
              >
                {isProjectsPage && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full"
                    style={activePillStyle}
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <span className="relative z-10">Projects</span>
              </div>
            </Link>
          </li>

          <li className="flex-shrink-0">
            <Link href="/research">
              <div
                className={baseItemClass}
                style={{ color: isResearchPage ? "#ffffff" : undefined }}
              >
                {isResearchPage && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full"
                    style={activePillStyle}
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <span className="relative z-10">Research</span>
              </div>
            </Link>
          </li>

          <li className="flex-shrink-0">
            <a
              href={`${import.meta.env.BASE_URL}Ahmad_Raza_Resume.pdf`}
              download
              className={baseItemClass}
              title="Download Resume"
            >
              <span className="relative z-10">Resume</span>
            </a>
          </li>

          <li className="mx-1 h-4 w-px rounded-full bg-white/10" />

          <li className="flex-shrink-0">
            <Link href="/blog">
              <div
                className={baseItemClass}
                style={{ color: isWriting ? "#ffffff" : undefined }}
              >
                {isWriting && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full"
                    style={activePillStyle}
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <PenLine className="w-3.5 h-3.5" />
                  Blog
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </motion.nav>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-2 left-1/2 z-[100] w-[96vw] max-w-[98vw] -translate-x-1/2 rounded-2xl px-1.5 py-1 md:hidden"
        style={{
          ...navContainerStyle,
          background: "rgba(17, 17, 18, 0.95)",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-full min-w-max items-center justify-start gap-1 px-1">
            <li className="flex-shrink-0">
              <button
                onClick={() => scrollTo("about")}
                className="relative flex h-10 items-center justify-center rounded-full px-4 text-sm font-normal text-[#cccccc] transition-all duration-300 ease-out hover:bg-white/10 hover:text-white"
                style={aboutActive ? { color: "#fff" } : undefined}
              >
                {aboutActive && <span className="absolute inset-0 rounded-full" style={activePillStyle} />}
                <span className="relative z-10">About</span>
              </button>
            </li>
            <li className="flex-shrink-0">
              <Link href="/certificates">
                <span className="relative flex h-10 items-center justify-center rounded-full px-4 text-sm font-normal text-[#cccccc] transition-all duration-300 ease-out hover:bg-white/10 hover:text-white cursor-pointer" style={isCertificatesPage ? { color: "#fff" } : undefined}>
                  {isCertificatesPage && <span className="absolute inset-0 rounded-full" style={activePillStyle} />}
                  <span className="relative z-10">Certificates</span>
                </span>
              </Link>
            </li>
            <li className="flex-shrink-0">
              <Link href="/projects">
                <span className="relative flex h-10 items-center justify-center rounded-full px-4 text-sm font-normal text-[#cccccc] transition-all duration-300 ease-out hover:bg-white/10 hover:text-white cursor-pointer" style={isProjectsPage ? { color: "#fff" } : undefined}>
                  {isProjectsPage && <span className="absolute inset-0 rounded-full" style={activePillStyle} />}
                  <span className="relative z-10">Projects</span>
                </span>
              </Link>
            </li>
            <li className="flex-shrink-0">
              <Link href="/research">
                <span className="relative flex h-10 items-center justify-center rounded-full px-4 text-sm font-normal text-[#cccccc] transition-all duration-300 ease-out hover:bg-white/10 hover:text-white cursor-pointer" style={isResearchPage ? { color: "#fff" } : undefined}>
                  {isResearchPage && <span className="absolute inset-0 rounded-full" style={activePillStyle} />}
                  <span className="relative z-10">Research</span>
                </span>
              </Link>
            </li>
            <li className="flex-shrink-0">
              <a href={`${import.meta.env.BASE_URL}Ahmad_Raza_Resume.pdf`} download className="relative flex h-10 items-center justify-center rounded-full px-4 text-sm font-normal text-[#cccccc] transition-all duration-300 ease-out hover:bg-white/10 hover:text-white">
                Resume
              </a>
            </li>
            <li className="mx-1 h-4 w-px flex-shrink-0 rounded-full bg-white/15" />
            <li className="flex-shrink-0">
              <Link href="/blog">
                <span className="relative flex h-10 items-center justify-center gap-1 rounded-full px-4 text-sm font-normal text-[#cccccc] transition-all duration-300 ease-out hover:bg-white/10 hover:text-white cursor-pointer" style={isWriting ? { color: "#fff" } : undefined}>
                  {isWriting && <span className="absolute inset-0 rounded-full" style={activePillStyle} />}
                  <span className="relative z-10 flex items-center gap-1">
                    <PenLine className="h-3 w-3" />
                    Blog
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </motion.nav>
    </>
  );
}
