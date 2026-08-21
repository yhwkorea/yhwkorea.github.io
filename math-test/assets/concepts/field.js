export default {
  id: 'field', title: '체', terms: ['체'],
  summary: '0이 아닌 모든 원소가 곱셈 역원을 가져 나눗셈이 가능한 가환환입니다.',
  target: 'foundations/algebra.html#정역과-체',
  prerequisites: ['commutative-ring'],
  why: '0이 아닌 수로 언제나 나눌 수 있는 계산 환경을 정확히 구분합니다.',
  example: 'F7에서 3의 역원은 5입니다. 3·5=15≡1 (mod 7)이기 때문입니다.',
  formal: '1≠0인 가환환 F에서 모든 a≠0이 a⁻¹을 가지면 F는 체입니다.',
  usedIn: ['유한체', '타원곡선 좌표', 'isogeny 계산']
};
