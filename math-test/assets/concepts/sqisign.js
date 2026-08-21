export default {
  id: 'sqisign', title: 'SQIsign', terms: ['SQIsign'],
  summary: '초특이 타원곡선의 Isogeny 구조를 사용하는 후양자 전자서명 방식입니다.',
  target: 'foundations/cryptography.html#sqisign의-기여', prerequisites: ['digital-signature', 'pqc'],
  why: '다른 PQC 계열과 구별되는 수학적 기반에서 비교적 짧은 키와 서명을 얻으려는 방식입니다.',
  example: '사용자는 메시지와 서명, 공개키를 검증기에 넣어 참 또는 거짓을 얻습니다.',
  formal: '초특이 곡선의 endomorphism ring 지식을 증명하는 식별 프로토콜을 Fiat–Shamir 방식으로 변환한 서명 계열입니다.',
  usedIn: ['후양자 전자서명 연구', 'Isogeny 기반 암호']
};
