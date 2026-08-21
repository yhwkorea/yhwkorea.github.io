import set from './set.js';
import relation from './relation.js';
import equivalenceClass from './equivalence-class.js';
import group from './group.js';
import ring from './ring.js';
import commutativeRing from './commutative-ring.js';
import ideal from './ideal.js';
import quotientRing from './quotient-ring.js';
import field from './field.js';

export const concepts = [set, relation, equivalenceClass, group, ring, commutativeRing, ideal, quotientRing, field];
export const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]));
export const conceptsByTerm = new Map(concepts.flatMap((concept) => concept.terms.map((term) => [term, concept])));

export function getConcept(id) {
  return conceptsById.get(id) || null;
}
