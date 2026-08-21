export default {
  id: 'hash-function', title: '해시 함수', terms: ['해시', '해시 함수'],
  summary: '길이가 제각각인 입력을 짧고 고정된 길이의 지문으로 바꾸는 함수입니다.',
  target: 'foundations/cryptography.html#해시가-하는-일', prerequisites: [],
  why: '큰 메시지를 짧은 지문으로 다루고 입력의 작은 변경도 검출하기 위해 사용합니다.',
  example: '파일 한 글자가 바뀌면 새 해시가 나오므로 원래 서명과 맞지 않게 됩니다.',
  formal: '암호학적 해시는 역상·두 번째 역상·충돌을 현실적인 계산량으로 찾기 어려워야 합니다.',
  usedIn: ['전자서명', '파일 무결성', 'Fiat–Shamir 변환']
};
