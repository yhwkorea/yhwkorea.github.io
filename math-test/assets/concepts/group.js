export default {
  id: 'group', title: '군', terms: ['군'],
  summary: '하나의 연산이 결합법칙을 만족하고 항등원과 모든 원소의 역원을 갖는 구조입니다.',
  target: 'foundations/algebra.html#군-연산-하나가-있는-구조',
  prerequisites: ['set'],
  why: '대칭이나 이동처럼 합성할 수 있고 언제나 되돌릴 수 있는 행동의 공통 규칙을 표현합니다.',
  example: '정수는 덧셈에 관해 군입니다. 항등원은 0이고 a의 역원은 -a입니다.',
  formal: '집합 G와 이항연산 *에 대해 결합법칙, 항등원, 역원이 존재하면 (G,*)는 군입니다.',
  usedIn: ['타원곡선 점 덧셈', 'isogeny의 커널', '암호 프로토콜의 군 작용']
};
