export default {
  id: 'ideal', title: '아이디얼', terms: ['아이디얼', 'ideal'],
  summary: '환의 일부 원소를 0으로 취급해도 덧셈과 곱셈이 모순 없이 남게 하는 부분집합입니다.',
  target: 'foundations/algebra.html#아이디얼-몫환을-만들-수-있는-부분집합',
  prerequisites: ['set', 'group', 'ring', 'commutative-ring'],
  why: '환에서 원소들을 묶어 몫환을 만들 때, 대표원을 바꾸어도 계산 결과가 같게 만들기 위해 필요합니다.',
  example: '6Z는 Z의 아이디얼입니다. 2와 8을 같은 묶음으로 보아도 덧셈과 곱셈이 잘 정의됩니다.',
  formal: '가환환 R의 부분집합 I가 덧셈 부분군이고, 모든 r∈R와 a∈I에 대해 ra∈I이면 I는 아이디얼입니다.',
  usedIn: ['몫환 R/I', 'F[x]/(f)로 유한체 만들기', 'SQIsign의 사원수 좌아이디얼']
};
