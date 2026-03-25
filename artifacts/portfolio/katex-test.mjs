import fs from 'node:fs';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

marked.use({ gfm: true, breaks: true });
marked.use(markedKatex({ throwOnError: false, output: 'html', displayMode: true }));

const s = fs.readFileSync('./src/posts/seq-modeling-from-scratch.md', 'utf8');
const start = s.indexOf('$$\\begin{aligned}');
const end = s.indexOf('\\end{aligned}$$');
console.log('start', start, 'end', end);
if (start !== -1 && end !== -1) {
  const block = s.slice(start, end + '\\end{aligned}$$'.length);
  const out = marked.parse(block);
  console.log(out.slice(0, 1200));
}
