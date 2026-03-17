import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { Navbar } from "@/components/Navbar";
import { MouseGradient } from "@/components/MouseGradient";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen">
      <MouseGradient />
      <div className="relative z-10">
        <Navbar />

        <main className="max-w-4xl mx-auto px-6 pt-36 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-5">
              Technical Writings & Research
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Articles & Blogs on Machine Learning, Deep Learning, and Artificial Intelligence.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {posts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="glass-card p-8 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </span>
                      <span className="text-white/20">·</span>
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 text-xs text-primary/80 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-5">
                      {post.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                      Read article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {posts.length === 0 && (
              <div className="glass-card p-12 text-center text-muted-foreground">
                <p>No posts yet. Add a <code className="text-accent text-sm">.md</code> file to <code className="text-accent text-sm">src/posts/</code> to publish.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
