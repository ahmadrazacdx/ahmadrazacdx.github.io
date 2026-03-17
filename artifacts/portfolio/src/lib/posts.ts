import { marked } from "marked";
import markedKatex from "marked-katex-extension";
import Prism from "prismjs";

// Import core Prism CSS and common languages
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";

marked.use({
  gfm: true,
  breaks: true
});

marked.use(
  markedKatex({
    throwOnError: false,
    output: "html",
    displayMode: true,
  })
);

// Pre-process LaTeX to handle aligned environments properly
function preprocessLatex(content: string): string {
  // Replace $$\begin{aligned}...\end{aligned}$$ with proper handling
  return content.replace(
    /\$\$\s*\\begin\{(aligned|align)\}([\s\S]*?)\\end\{(aligned|align)\}\s*\$\$/g,
    (match, env1, body, env2) => {
      // Wrap in display math delimiters that KaTeX can handle
      return `$$\\begin{${env1}}${body}\\end{${env2}}$$`;
    }
  );
}

// Custom renderer for code blocks with syntax highlighting and copy button
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  const language = lang || "text";
  const grammar = Prism.languages[language] || Prism.languages.text;
  const highlighted = Prism.highlight(text, grammar, language);
  return `
    <div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-language">${language}</span>
        <button class="copy-button" onclick="copyCode(this)" aria-label="Copy code">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Copy</span>
        </button>
      </div>
      <pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>
    </div>
  `;
};

marked.use({ renderer });

// Vite: import all .md files under src/posts/ as raw strings
const rawFiles = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  headings: Heading[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yaml = match[1];
  const content = match[2];
  const data: Record<string, string | string[]> = {};

  for (const line of yaml.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const rawVal = line.slice(colonIdx + 1).trim();

    if (key === "tags") {
      // supports: tags: [a, b, c] or tags: a, b, c
      data[key] = rawVal
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = rawVal.replace(/^["']|["']$/g, "");
    }
  }

  return { data, content };
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(rawFiles)
    .map(([filepath, raw]) => {
      const slug = filepath.split("/").pop()!.replace(/\.md$/, "");
      const { data, content } = parseFrontmatter(raw);
      return {
        slug,
        title: (data.title as string) || slug,
        date: (data.date as string) || "",
        description: (data.description as string) || "",
        tags: (data.tags as string[]) || [],
        content,
        headings: extractHeadings(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    // Only extract h2 headings (##), skip h3s and others
    const match = line.match(/^(##)\s+(.+)$/);
    if (match) {
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headings.push({ id, text, level: 2 });
    }
  }
  
  return headings;
}

export function renderPost(content: string): string {
  const processed = preprocessLatex(content);
  const result = marked(processed);
  if (typeof result === 'string') {
    return result;
  }
  throw new Error('marked returned a Promise, expected string');
}
