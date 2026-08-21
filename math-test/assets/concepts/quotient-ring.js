export default {
  id: 'quotient-ring', title: '몫환', terms: ['몫환'],
  summary: '아이디얼만큼 차이 나는 원소를 같은 동치류로 보아 만든 새로운 환입니다.',
  target: 'foundations/algebra.html#아이디얼-몫환을-만들-수-있는-부분집합',
  prerequisites: ['equivalence-class', 'ring', 'ideal'],
  why: '특정 원소나 다항식을 0이라고 선언한 새로운 계산 세계를 일관되게 만들기 위해 사용합니다.',
  example: 'Z/6Z에서는 [2]=[8]이고 [2][3]=[6]=[0]입니다.',
  formal: 'R/I의 원소는 [a]=a+I이고 [a]+[b]=[a+b], [a][b]=[ab]로 연산합니다.',
  usedIn: ['나머지 연산', '유한체 F[x]/(f)', '대수적 구조의 단순화']
};
