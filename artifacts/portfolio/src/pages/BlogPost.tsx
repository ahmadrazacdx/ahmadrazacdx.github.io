import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getPost, renderPost, type Heading } from "@/lib/posts";
import { Navbar } from "@/components/Navbar";
import { MouseHover } from "@/components/MouseHover";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";

// Table of Contents Component
function TableOfContents({ headings, activeId }: { headings: Heading[]; activeId: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="toc-sidebar">
      <h3 className="toc-title">Contents</h3>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item ${heading.level === 3 ? "toc-sub" : ""} ${
              activeId === heading.id ? "toc-active" : ""
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="toc-link"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = getPost(slug);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    if (!post?.headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    // Add IDs to h2 headings in rendered content (TOC only tracks h2s)
    const article = contentRef.current;
    if (article) {
      const h2s = article.querySelectorAll("h2");
      
      h2s.forEach((heading) => {
        const text = heading.textContent?.trim() || "";
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        heading.id = id;
        observer.observe(heading);
      });
    }

    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="relative min-h-screen">
        <MouseHover />
        <div className="relative z-10">
          <Navbar />
          <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 pt-36 pb-24 text-center">
            <h1 className="text-4xl font-display font-bold mb-4">Post not found</h1>
            <Link href="/blog">
              <span className="text-primary hover:underline cursor-pointer">← Back to Writing</span>
            </Link>
          </main>
        </div>
      </div>
    );
  }

  const html = renderPost(post.content);

  return (
    <div className="relative min-h-screen">
      <MouseHover />
      <div className="relative z-10">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-36 pb-24">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Left Sidebar - TOC */}
            {post.headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-36">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Link href="/blog">
                      <span className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors cursor-pointer text-sm font-medium mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Writing
                      </span>
                    </Link>
                    <TableOfContents headings={post.headings} activeId={activeId} />
                  </motion.div>
                </div>
              </aside>
            )}

            {/* Main Content */}
            <main className="max-w-3xl">
              {/* Back link - mobile only */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10 lg:hidden"
              >
                <Link href="/blog">
                  <span className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors cursor-pointer text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Writing
                  </span>
                </Link>
              </motion.div>

              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs text-primary/80 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-bold leading-[1.15] tracking-tight mb-5">
                  {post.title}
                </h1>

                {post.description && (
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {post.description}
                  </p>
                )}

                <div className="mt-8 border-t border-white/8" />
              </motion.header>

              {/* Markdown content */}
              <motion.article
                ref={contentRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* Footer nav */}
              <div className="mt-16 pt-8 border-t border-white/8">
                <Link href="/blog">
                  <span className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors cursor-pointer text-sm">
                    <ArrowLeft className="w-4 h-4" /> Back to all articles
                  </span>
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
