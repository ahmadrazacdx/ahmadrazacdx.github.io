import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronDown, FileDown, FileText, PenLine } from "lucide-react";
import { createPortal } from "react-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SCROLL_SECTIONS = ["about"] as const;

export function Navbar() {
  const [location] = useLocation();
  const isHome = location === "/";
  const isWriting = location.startsWith("/blog");
  const isProjectsPage = location === "/projects" || location === "/projects/";
  const isResearchPage = location === "/research" || location === "/research/";
  const isCertificatesPage = location === "/certificates" || location === "/certificates/";

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDocumentsOpen, setMobileDocumentsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    setMobileDocumentsOpen(false);
  }, [location]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

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

  const mobileMenuItemClass =
    "block w-full px-1 py-2 text-left text-sm font-medium text-[#cfcfd6] transition-colors duration-200 hover:text-white";

  const documentLinkClass =
    "flex w-full items-center gap-2 rounded-lg px-2 py-1 text-sm text-[#d7d7df] transition-colors duration-200 hover:bg-white/5 hover:text-white";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={baseItemClass}
                  aria-label="Open professional documents menu"
                >
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    Profile
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" sideOffset={8} className="min-w-[10.25rem] rounded-2xl border border-white/10 bg-[#121214]/95 p-1.25 text-white shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                <DropdownMenuItem asChild>
                  <a
                    href={`${import.meta.env.BASE_URL}Ahmad_Raza_Resume.pdf`}
                    download
                    className={documentLinkClass}
                  >
                    <FileDown className="h-4 w-4 text-white/75" />
                    <span>Resume</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href={`${import.meta.env.BASE_URL}Ahmad_Raza_CV.pdf`}
                    download
                    className={documentLinkClass}
                  >
                    <FileText className="h-4 w-4 text-white/75" />
                    <span>CV</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      {mounted && createPortal(
        <nav className="fixed inset-x-0 top-0 z-[100] px-2 pt-2 md:hidden">
          <div
            className="rounded-b-2xl px-3 py-2"
            style={{
              background: "rgba(17, 17, 18, 0.58)",
              backdropFilter: "blur(18px) saturate(170%)",
              WebkitBackdropFilter: "blur(18px) saturate(170%)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-display pl-1 text-base font-semibold tracking-[0.02em] text-white">
                Ahmad Raza
              </span>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="inline-flex h-10 items-center justify-center px-1 text-white/90 transition-colors duration-200 hover:text-white"
              >
                <span className="flex flex-col items-center justify-center gap-1.5">
                  <span className="h-[2px] w-5 rounded-full bg-white/90" />
                  <span className="h-[2px] w-5 rounded-full bg-white/90" />
                  <span className="h-[2px] w-5 rounded-full bg-white/90" />
                </span>
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="mt-2 pt-1">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => {
                        scrollTo("about");
                        closeMobileMenu();
                      }}
                      className={`${mobileMenuItemClass} ${aboutActive ? "text-white" : ""}`}
                    >
                      About
                    </button>
                  </li>

                  <li>
                    <Link href="/certificates">
                      <div
                        onClick={closeMobileMenu}
                        className={`${mobileMenuItemClass} ${isCertificatesPage ? "text-white" : ""}`}
                      >
                        Certificates
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link href="/projects">
                      <div
                        onClick={closeMobileMenu}
                        className={`${mobileMenuItemClass} ${isProjectsPage ? "text-white" : ""}`}
                      >
                        Projects
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link href="/research">
                      <div
                        onClick={closeMobileMenu}
                        className={`${mobileMenuItemClass} ${isResearchPage ? "text-white" : ""}`}
                      >
                        Research
                      </div>
                    </Link>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => setMobileDocumentsOpen((open) => !open)}
                      className={`${mobileMenuItemClass} flex items-center justify-between`}
                      aria-expanded={mobileDocumentsOpen}
                    >
                      <span>Profile</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileDocumentsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileDocumentsOpen && (
                      <div className="mt-1 space-y-1 pl-3">
                        <a
                          href={`${import.meta.env.BASE_URL}Ahmad_Raza_Resume.pdf`}
                          download
                          onClick={closeMobileMenu}
                          className={mobileMenuItemClass}
                        >
                          Resume
                        </a>
                        <a
                          href={`${import.meta.env.BASE_URL}Ahmad_Raza_CV.pdf`}
                          download
                          onClick={closeMobileMenu}
                          className={mobileMenuItemClass}
                        >
                          CV
                        </a>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link href="/blog">
                      <div
                        onClick={closeMobileMenu}
                        className={`${mobileMenuItemClass} ${isWriting ? "text-white" : ""}`}
                      >
                        Blog
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>,
        document.body,
      )}
    </>
  );
}
