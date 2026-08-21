export default {
  id: 'equivalence-class', title: '동치류', terms: ['동치류'],
  summary: '한 원소와 동치라고 판정되는 원소를 전부 모은 집합이며 [a]로 씁니다.',
  target: 'foundations/notation.html#관계와-동치류-a',
  prerequisites: ['set', 'equivalence-relation'],
  why: '표현은 다르지만 같은 대상으로 취급할 것들을 실제로 하나의 새 원소처럼 다루기 위해 만듭니다.',
  example: '6으로 나눈 나머지를 볼 때 [1]={..., -5, 1, 7, 13, ...}입니다.',
  formal: '[a]={x : x~a}. 대괄호는 숫자 a 하나가 아니라 a와 동치인 원소들의 집합을 뜻합니다.',
  usedIn: ['Z/nZ', '몫환 R/I', '사영좌표']
};
