import { readFile, writeFile } from 'node:fs/promises';

const pages = [
  ['foundations/cryptography.html', 'cryptography'],
  ['foundations/calculus.html', 'calculus'],
  ['foundations/notation.html', 'notation'],
  ['foundations/algebra.html', 'algebra'],
  ['isogeny/01-finite-fields.html', 'finite-fields'],
  ['isogeny/02-elliptic-curves.html', 'elliptic-curves'],
  ['isogeny/03-isogenies.html', 'isogeny'],
  ['isogeny/isogeny-textbook.html', 'sqisign'],
  ['crypto/01-symmetric-hash.html', 'cryptography'],
  ['crypto/02-key-establishment.html', 'cryptography'],
  ['crypto/03-signatures.html', 'cryptography'],
  ['crypto/04-pqc-candidates.html', 'cryptography'],
  ['crypto/05-tls-pki.html', 'cryptography'],
  ['lattice/lattice-answers.html', 'references'],
  ['algebra/algebra-answers.html', 'references'],
  ['probability/probability-answers.html', 'references'],
  ['linear-algebra/linear-algebra-answers.html', 'references'],
  ['background/real-analysis.html', 'references']
];
const references = [
  ['../lattice/lattice-answers.html', 'Lattice 답안 (1–9)'],
  ['../algebra/algebra-answers.html', 'Algebra 답안 (1–16)'],
  ['../probability/probability-answers.html', 'Probability 답안 (1–10)'],
  ['../linear-algebra/linear-algebra-answers.html', 'Linear Algebra 답안 (1–17)'],
  ['../background/real-analysis.html', '실해석학 보충']
];

for (const [path] of pages) {
  const refs = references.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('');
  const nav = `<nav><a class="sidebar-home" href="../index.html">학습 홈</a><p class="sidebar-loading">검색과 전체 지도를 불러오는 중…</p><noscript><details class="sidebar-references"><summary>답안·참고 자료</summary><ul>${refs}</ul></details></noscript></nav>`;
  const html = await readFile(path, 'utf8');
  if (!/<nav>[\s\S]*?<\/nav>/.test(html)) throw new Error(`${path}: navigation not found`);
  const next = html.replace(/<nav>[\s\S]*?<\/nav>/, nav);
  if (next !== html) await writeFile(path, next);
}
