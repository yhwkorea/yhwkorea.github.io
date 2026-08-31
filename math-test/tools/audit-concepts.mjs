import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { concepts } from '../assets/concepts/index.js';
import { areas, commonQuestions } from '../assets/concept-catalog.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const byId = new Map();
const errors = [];
const warnings = [];
const targetChecks = [];
// These emphasized strings were manually reviewed as UI labels, example titles,
// people, subject cards, or complete explanatory claims rather than reusable terms.
// Exact matching makes changed or newly introduced wording return to the review queue.
const reviewedNonConceptPhrases = new Set([
  'Algebra', 'Lattice', 'Linear Algebra', 'Probability',
  'SQIsign의 사용자 관점', '같은 점에서 모두 0', '개발자 지수', '결합법칙:',
  '곡선식도 0이고', '기호를 문장으로 읽기', '네 곡선과 세 종류의 화살표가 왜 필요한지',
  '다른 수학적 기반을 가진 암호가 하나쯤 더 있으면', '사용자 민수', '선행 지식:',
  '순수 대수 문제', '아이소제니(isogeny) 그래프 위에서 길찾기', '어디에 쓰이나?',
  '어떤 종류의 대상을 입력받고 무엇을 말하는지', '완전히 다른 수학 계열',
  '정말 모두 0인지 확인하기', '직관.', '집합 연산 계산',
  '초특이 타원곡선 사이에서 숨겨진 Isogeny 구조를 찾기 어렵다',
  '프로토콜이 아니라 깨지는 초안', '한 글자만 바뀌어도',
  '핵심 사실 (인용, Pizer 등).', '환 전체의 아무 원소를 곱해도'
]);
const utilityNavPages = new Set([
  'foundations/cryptography.html', 'foundations/calculus.html', 'foundations/notation.html',
  'foundations/algebra.html', 'isogeny/01-finite-fields.html', 'isogeny/02-elliptic-curves.html',
  'isogeny/03-isogenies.html', 'isogeny/isogeny-textbook.html',
  'crypto/01-symmetric-hash.html', 'crypto/02-key-establishment.html',
  'crypto/03-signatures.html', 'crypto/04-pqc-candidates.html', 'crypto/05-tls-pki.html',
  'school/01-primary.html', 'school/02-middle.html',
  'school/03-secondary.html', 'school/04-senior-secondary.html',
  'university/01-linear-algebra.html', 'university/02-probability.html',
  'university/03-real-analysis.html', 'university/04-number-theory.html',
  'university/05-discrete-math.html', 'university/06-differential-equations.html',
  'university/07-topology.html', 'university/08-complex-analysis.html'
  , 'university/09-measure-theory.html', 'university/10-functional-analysis.html',
  'university/11-differential-geometry.html', 'university/12-algebraic-geometry.html'
  , 'university/13-numerical-analysis.html', 'university/14-optimization.html',
  'university/15-statistics.html'
  , 'university/16-mathematical-logic.html', 'university/17-set-theory.html',
  'university/18-category-theory.html'
]);
const scalarFields = ['id', 'title', 'summary', 'target', 'why', 'example', 'formal'];
const arrayFields = ['terms', 'prerequisites', 'usedIn'];
const encyclopediaFields = ['intuition', 'beginner', 'notation', 'nonExample', 'calculation', 'theorem', 'theoremAssumptions', 'proofIdea', 'counterexample', 'applications', 'sources'];

function nonempty(value) { return typeof value === 'string' && value.trim(); }
function normalizeTerm(value) { return value.normalize('NFKC').toLocaleLowerCase('ko').replace(/\s+/g, ' ').trim(); }
function localTarget(label, value) {
  if (!nonempty(value)) { errors.push(`${label}: empty href/target`); return; }
  let decoded;
  try { decoded = decodeURI(value); } catch { errors.push(`${label}: malformed URI ${value}`); return; }
  const [rel, rawHash = ''] = decoded.split('#');
  if (!rel || /^[a-z][a-z+.-]*:/i.test(rel) || rel.startsWith('//')) { errors.push(`${label}: non-local target ${value}`); return; }
  const path = resolve(root, rel);
  const escaped = relative(root, path);
  if (escaped === '..' || escaped.startsWith(`..${sep}`) || path === root) { errors.push(`${label}: target escapes root ${value}`); return; }
  targetChecks.push({ label, path, rawHash, value });
}

const terms = new Map();
for (const concept of concepts) {
  if (!concept || typeof concept !== 'object' || Array.isArray(concept)) { errors.push('concept entry must be an object'); continue; }
  for (const field of scalarFields) if (!nonempty(concept[field])) errors.push(`${concept.id || '(unknown)'}: invalid field ${field}`);
  for (const field of arrayFields) {
    const value = concept[field];
    if (!Array.isArray(value) || (field !== 'prerequisites' && value.length === 0) || value.some((item) => !nonempty(item))) errors.push(`${concept.id || '(unknown)'}: invalid field ${field}`);
  }
  if (concept.depth === 'encyclopedia') {
    for (const field of encyclopediaFields) {
      const value = concept[field];
      if (value == null || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && !value.length)) errors.push(`${concept.id}: encyclopedia field ${field} is missing`);
    }
    if (!Array.isArray(concept.sources) || concept.sources.some((source) => !source || !nonempty(source.title) || !nonempty(source.href) || !nonempty(source.locator))) errors.push(`${concept.id}: invalid encyclopedia sources`);
    for (const field of ['next', 'related']) if (!Array.isArray(concept[field]) || !concept[field].length) errors.push(`${concept.id}: encyclopedia relation ${field} is missing`);
  }
  if (!nonempty(concept.id)) continue;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(concept.id)) errors.push(`${concept.id}: invalid id format`);
  if (byId.has(concept.id)) errors.push(`duplicate concept id: ${concept.id}`);
  byId.set(concept.id, concept);
  if (Array.isArray(concept.terms)) for (const term of concept.terms) {
    if (!nonempty(term)) continue;
    const key = normalizeTerm(term);
    const owner = terms.get(key);
    if (owner) errors.push(`duplicate term "${term}": ${owner.id} (${owner.term}) and ${concept.id}`);
    else terms.set(key, { id: concept.id, term });
  }
  localTarget(`concept ${concept.id}`, concept.target);
}

for (const concept of concepts) if (concept && Array.isArray(concept.prerequisites)) {
  for (const prerequisite of concept.prerequisites) if (!byId.has(prerequisite)) errors.push(`${concept.id}: unknown prerequisite ${prerequisite}`);
  for (const field of ['next', 'related']) if (Array.isArray(concept[field])) for (const id of concept[field]) if (!byId.has(id)) errors.push(`${concept.id}: unknown ${field} concept ${id}`);
}

const state = new Map();
const stack = [];
function visit(id) {
  if (state.get(id) === 2) return;
  if (state.get(id) === 1) { errors.push(`prerequisite cycle: ${stack.slice(stack.indexOf(id)).concat(id).join(' -> ')}`); return; }
  state.set(id, 1); stack.push(id);
  for (const next of byId.get(id)?.prerequisites || []) if (byId.has(next)) visit(next);
  stack.pop(); state.set(id, 2);
}
for (const id of byId.keys()) visit(id);

const areaIds = new Set();
const catalogMembership = new Map([...byId.keys()].map((id) => [id, []]));
for (const area of areas) {
  if (!area || typeof area !== 'object') { errors.push('catalog area must be an object'); continue; }
  for (const field of ['id', 'title', 'description', 'href']) if (!nonempty(area[field])) errors.push(`catalog area ${area.id || '(unknown)'}: invalid ${field}`);
  if (areaIds.has(area.id)) errors.push(`duplicate catalog area id: ${area.id}`);
  areaIds.add(area.id);
  if (!Array.isArray(area.concepts) || !area.concepts.length) errors.push(`catalog area ${area.id}: invalid concepts`);
  else for (const id of area.concepts) {
    if (!byId.has(id)) errors.push(`catalog area ${area.id}: unknown concept ${id}`);
    else catalogMembership.get(id).push(area.id);
  }
  localTarget(`catalog area ${area.id}`, area.href);
}
for (const [id, memberships] of catalogMembership) if (!memberships.length) errors.push(`concept ${id}: missing catalog area`);
for (const [index, question] of commonQuestions.entries()) {
  if (!question || typeof question !== 'object' || !nonempty(question.question) || !Array.isArray(question.terms) || !question.terms.length) errors.push(`common question ${index}: invalid schema`);
  localTarget(`common question ${index}`, question?.href);
}

async function htmlFiles(directory) {
  const out = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !['assets', 'katex', 'tools'].includes(entry.name)) out.push(...await htmlFiles(path));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(path);
  }
  return out;
}

const pages = await htmlFiles(root);
const pageData = new Map();
const visibleCandidates = new Map();
for (const path of pages) {
  const html = await readFile(path, 'utf8');
  const rel = relative(root, path);
  const ids = new Set();
  for (const match of html.matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)) {
    const id = match[2].trim();
    if (!id) errors.push(`${rel}: empty html id`);
    else if (ids.has(id)) errors.push(`${rel}: duplicate html id ${id}`);
    else ids.add(id);
  }
  pageData.set(path, { html, ids });
  if (/\bdata-chapter-view\s*=\s*(["'])true\1/i.test(html)
      && !/<script[^>]+src\s*=\s*(["'])[^"']*assets\/chapters\.js(?:\?[^"']*)?\1/i.test(html)) {
    errors.push(`${rel}: chapter view requires assets/chapters.js`);
  }
  if (utilityNavPages.has(rel)) {
    const nav = html.match(/<nav>[\s\S]*?<\/nav>/)?.[0];
    if (!nav) errors.push(`${rel}: missing navigation`);
    else {
      if (!nav.includes('class="sidebar-home"') || !nav.includes('href="../index.html"')) errors.push(`${rel}: utility navigation missing home link`);
      if (!nav.includes('class="sidebar-loading"')) errors.push(`${rel}: utility navigation missing loading state`);
      if (/href="\.\.\/(?:foundations|isogeny)\//.test(nav)) errors.push(`${rel}: utility navigation must not contain fixed curriculum links`);
    }
  }
  for (const attribute of ['data-concept', 'data-concept-module']) {
    const pattern = new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'gi');
    for (const match of html.matchAll(pattern)) {
      const id = match[2].trim();
      if (!id) errors.push(`${rel}: empty ${attribute}`);
      else if (!byId.has(id)) errors.push(`${rel}: unknown ${attribute} ${id}`);
    }
  }
  const learningGuide = rel === 'index.html' || rel.startsWith('foundations/') || rel.startsWith('isogeny/');
  if (!learningGuide) continue;
  for (const match of html.matchAll(/<(?:strong|em)(?![^>]*data-concept)[^>]*>([^<]{2,45})<\/(?:strong|em)>/g)) {
    const text = match[1].replace(/\s+/g, ' ').trim();
    if (/^(정의|정리|증명|예제|이전|다음|왜|계산|먼저|직접|결론|공식|검증|키 생성)/.test(text)) continue;
    if (reviewedNonConceptPhrases.has(text)) continue;
    if (!visibleCandidates.has(text)) visibleCandidates.set(text, new Set());
    visibleCandidates.get(text).add(rel);
  }
}

for (const target of targetChecks) {
  if (!existsSync(target.path)) { errors.push(`${target.label}: target file missing ${target.value}`); continue; }
  if (!target.rawHash) continue;
  let hash;
  try { hash = decodeURIComponent(target.rawHash); } catch { errors.push(`${target.label}: malformed fragment ${target.value}`); continue; }
  const data = pageData.get(target.path);
  if (!data || !data.ids.has(hash)) errors.push(`${target.label}: target id missing #${hash}`);
}

console.log(`concepts: ${concepts.length}`);
const encyclopediaCount = concepts.filter((concept) => concept.depth === 'encyclopedia').length;
console.log(`encyclopedia depth: ${encyclopediaCount}/${concepts.length} (${(100 * encyclopediaCount / concepts.length).toFixed(1)}%)`);
console.log(`html pages: ${pages.length}`);
console.log(`unreviewed emphasized-text candidates: ${visibleCandidates.size}`);
for (const [term, locations] of [...visibleCandidates].sort().slice(0, 80)) console.log(`  ? ${term} :: ${[...locations].join(', ')}`);
for (const warning of warnings) console.warn(`warning: ${warning}`);
if (errors.length) {
  console.error(`\nconcept audit failed (${errors.length})`);
  errors.forEach((error) => console.error(`  - ${error}`));
  process.exit(1);
}
console.log('concept schema, graph, catalog, HTML references and targets: ok');
