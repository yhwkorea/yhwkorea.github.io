export default {
  id: 'pqc', title: '후양자암호', terms: ['후양자암호', 'PQC'],
  summary: '알려진 양자 알고리즘으로도 깨기 어렵도록 설계한 공개키 암호입니다.',
  target: 'foundations/cryptography.html#양자컴퓨터와-pqc', prerequisites: ['digital-signature'],
  why: '충분히 큰 양자컴퓨터가 RSA와 기존 타원곡선 암호의 기반 문제를 풀 수 있기 때문에 필요합니다.',
  example: 'SQIsign은 Isogeny 문제를 이용하는 후양자 전자서명 후보입니다.',
  formal: '양자 다항시간 공격자를 고려한 보안 정의를 만족하도록 설계·분석하는 암호 방식의 범주입니다.',
  usedIn: ['전자서명', '키 캡슐화', '장기 데이터 보호']
};
