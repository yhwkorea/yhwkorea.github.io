export default {
  id: 'ring', title: '환', terms: ['환'],
  summary: '덧셈과 곱셈이 함께 있고 두 연산이 분배법칙으로 연결된 구조입니다.',
  target: 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조',
  prerequisites: ['set', 'group'],
  why: '정수·다항식·행렬처럼 더하기와 곱하기를 함께 하는 계산을 하나의 언어로 다룹니다.',
  example: '정수 Z는 환입니다. 행렬도 환이지만 행렬 곱셈은 보통 순서를 바꿀 수 없습니다.',
  formal: '(R,+)가 아벨군이고 곱셈이 결합적이며 좌우 분배법칙을 만족하면 R은 환입니다.',
  usedIn: ['다항식환', 'endomorphism 환', '아이디얼과 몫환']
};
