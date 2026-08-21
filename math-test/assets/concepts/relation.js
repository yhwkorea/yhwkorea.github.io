export default {
  id: 'equivalence-relation', title: '동치관계', terms: ['동치관계'],
  summary: '어떤 두 원소를 같은 종류로 볼지 정하며, 반사성·대칭성·추이성을 만족하는 관계입니다.',
  target: 'foundations/notation.html#관계와-동치류-a',
  prerequisites: ['set'],
  why: '서로 다른 표현을 하나의 대상으로 묶되, 그 묶음이 모순 없이 나뉘게 하기 위해 필요합니다.',
  example: '정수에서 a-b가 6의 배수이면 a와 b가 같다고 보면 1, 7, 13이 한 묶음입니다.',
  formal: '모든 a,b,c에 대해 a~a, a~b⇒b~a, a~b이고 b~c⇒a~c를 만족하는 이항관계입니다.',
  usedIn: ['동치류', '몫집합', '몫환', '사영공간']
};
