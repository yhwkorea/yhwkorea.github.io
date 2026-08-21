import set from './set.js';
import relation from './relation.js';
import equivalenceClass from './equivalence-class.js';
import group from './group.js';
import ring from './ring.js';
import commutativeRing from './commutative-ring.js';
import ideal from './ideal.js';
import quotientRing from './quotient-ring.js';
import field from './field.js';
import digitalSignature from './digital-signature.js';
import hashFunction from './hash-function.js';
import pqc from './pqc.js';
import sqisign from './sqisign.js';
import partialDerivative from './partial-derivative.js';
import characteristic from './characteristic.js';
import pointAtInfinity from './point-at-infinity.js';
import singularPoint from './singular-point.js';

export const concepts = [digitalSignature, hashFunction, pqc, sqisign, partialDerivative, characteristic, pointAtInfinity, singularPoint, set, relation, equivalenceClass, group, ring, commutativeRing, ideal, quotientRing, field];
export const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]));
export const conceptsByTerm = new Map(concepts.flatMap((concept) => concept.terms.map((term) => [term, concept])));

export function getConcept(id) {
  return conceptsById.get(id) || null;
}
