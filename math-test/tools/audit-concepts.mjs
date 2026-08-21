import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { concepts } from '../assets/concepts/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const byId = new Map();
const errors = [];
for (const concept of concepts) {
  if (byId.has(concept.id)) errors.push(`duplicate concept id: ${concept.id}`);
  byId.set(concept.id, concept);
  for (const field of ['id','title','terms','summary','target','prerequisites','why','example','formal','usedIn']) {
    if (concept[field] === undefined) errors.push(`${concept.id}: missing field ${field}`);
  }
}

async function htmlFiles(directory) {
  const out = [];
  for (const entry of await readdir(directory, { withFileTypes:true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !['assets','katex','tools'].includes(entry.name)) out.push(...await htmlFiles(path));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(path);
  }
  return out;
}

for (const concept of concepts) {
  for (const prerequisite of concept.prerequisites) {
    if (!byId.has(prerequisite)) errors.push(`${concept.id}: unknown prerequisite ${prerequisite}`);
  }
  const [relative, rawHash=''] = concept.target.split('#');
  const path = join(root, relative);
  if (!existsSync(path)) { errors.push(`${concept.id}: target file missing ${relative}`); continue; }
  if (rawHash) {
    const html = await readFile(path, 'utf8');
    const hash = decodeURIComponent(rawHash);
    if (!html.includes(`id="${hash}"`)) errors.push(`${concept.id}: target id missing #${hash}`);
  }
}

const pages = await htmlFiles(root);
const visibleCandidates = new Map();
for (const path of pages) {
  const html = await readFile(path, 'utf8');
  for (const match of html.matchAll(/data-concept="([^"]+)"/g)) {
    if (!byId.has(match[1])) errors.push(`${path.slice(root.length+1)}: unknown data-concept ${match[1]}`);
  }
  for (const match of html.matchAll(/<strong(?![^>]*data-concept)[^>]*>([^<]{2,45})<\/strong>/g)) {
    const text = match[1].replace(/\s+/g,' ').trim();
    if (/^(정의|정리|증명|예제|이전|다음|왜|계산|먼저|직접|결론|공식|검증|키 생성)/.test(text)) continue;
    if (!visibleCandidates.has(text)) visibleCandidates.set(text, new Set());
    visibleCandidates.get(text).add(path.slice(root.length+1));
  }
}

console.log(`concepts: ${concepts.length}`);
console.log(`html pages: ${pages.length}`);
console.log(`unclassified strong-text candidates: ${visibleCandidates.size}`);
for (const [term, locations] of [...visibleCandidates].sort().slice(0,80)) console.log(`  ? ${term} :: ${[...locations].join(', ')}`);
if (errors.length) {
  console.error(`\nconcept audit failed (${errors.length})`);
  errors.forEach((error) => console.error(`  - ${error}`));
  process.exit(1);
}
console.log('concept graph and targets: ok');
