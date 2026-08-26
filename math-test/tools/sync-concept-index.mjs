import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const conceptsDir = join(root, 'assets', 'concepts');
const indexPath = join(conceptsDir, 'index.js');
const files = (await readdir(conceptsDir))
  .filter((name) => name.endsWith('.js') && name !== 'index.js')
  .sort((a, b) => a.localeCompare(b, 'en'));

const imports = files.map((name, index) => `import concept${String(index).padStart(3, '0')} from './${name}';`);
const variables = files.map((_, index) => `concept${String(index).padStart(3, '0')}`);
const generated = `${imports.join('\n')}\n\nexport const concepts = [${variables.join(', ')}];
export const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]));
export const conceptsByTerm = new Map(concepts.flatMap((concept) => concept.terms.map((term) => [term.normalize('NFKC').toLocaleLowerCase('ko'), concept])));

export function getConcept(id) {
  return conceptsById.get(id) || null;
}
`;

if (process.argv.includes('--check')) {
  const current = await readFile(indexPath, 'utf8');
  if (current !== generated) {
    console.error(`${relative(root, indexPath)} is stale; run npm run sync:concepts`);
    process.exit(1);
  }
  console.log(`concept index: ${files.length} modules, up to date`);
} else {
  await writeFile(indexPath, generated);
  console.log(`wrote ${relative(root, indexPath)} from ${files.length} concept modules`);
}
