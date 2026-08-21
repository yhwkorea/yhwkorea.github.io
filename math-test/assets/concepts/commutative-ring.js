export default {
  id: 'commutative-ring', title: '가환환', terms: ['가환환'],
  summary: '모든 a,b에 대해 곱셈 순서를 바꿔도 ab=ba인 환입니다.',
  target: 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조',
  prerequisites: ['ring'],
  why: '곱셈 순서를 걱정하지 않고 다항식·나눗셈·아이디얼 이론을 전개할 수 있는 환을 구분합니다.',
  example: '정수와 F[x]는 가환환입니다. 2×2 행렬환은 보통 AB≠BA이므로 가환환이 아닙니다.',
  formal: '환 R이 모든 a,b∈R에 대해 ab=ba를 만족하면 가환환입니다.',
  usedIn: ['아이디얼', '정역', '체', '유한체 구성']
};
