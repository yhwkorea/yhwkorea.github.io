import { readFile, writeFile } from 'node:fs/promises';

const pages = [
  ['foundations/cryptography.html', 'cryptography'],
  ['foundations/calculus.html', 'calculus'],
  ['foundations/notation.html', 'notation'],
  ['foundations/algebra.html', 'algebra'],
  ['isogeny/01-finite-fields.html', 'finite-fields'],
  ['isogeny/02-elliptic-curves.html', 'elliptic-curves'],
  ['isogeny/03-isogenies.html', 'isogeny'],
  ['isogeny/isogeny-textbook.html', 'sqisign']
];
const guideLinks = [
  ['home', '../index.html', '학습 홈'],
  ['cryptography', '../foundations/cryptography.html', '암호학과 전자서명'],
  ['calculus', '../foundations/calculus.html', '미분과 편미분'],
  ['notation', '../foundations/notation.html', '집합과 기호'],
  ['algebra', '../foundations/algebra.html', '대수학'],
  ['finite-fields', '../isogeny/01-finite-fields.html', '유한체'],
  ['elliptic-curves', '../isogeny/02-elliptic-curves.html', '타원곡선'],
  ['isogeny', '../isogeny/03-isogenies.html', '아이소제니'],
  ['sqisign', '../isogeny/isogeny-textbook.html', 'SQIsign']
];
const references = [
  ['../lattice/lattice-answers.html', 'Lattice 답안 (1–9)'],
  ['../algebra/algebra-answers.html', 'Algebra 답안 (1–16)'],
  ['../probability/probability-answers.html', 'Probability 답안 (1–10)'],
  ['../linear-algebra/linear-algebra-answers.html', 'Linear Algebra 답안 (1–17)'],
  ['../background/real-analysis.html', '실해석학 보충']
];

for (const [path, active] of pages) {
  const guide = guideLinks.map(([id, href, label]) => `<li><a href="${href}"${id === active ? ' class="active" aria-current="page"' : ''}>${label}</a></li>`).join('');
  const refs = references.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('');
  const nav = `<nav><h5>학습 가이드</h5><ul>${guide}</ul><h5>참고 자료</h5><ul>${refs}</ul></nav>`;
  const html = await readFile(path, 'utf8');
  if (!/<nav>[\s\S]*?<\/nav>/.test(html)) throw new Error(`${path}: navigation not found`);
  const next = html.replace(/<nav>[\s\S]*?<\/nav>/, nav);
  if (next !== html) await writeFile(path, next);
}
