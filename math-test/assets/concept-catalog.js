export const areas = [
  { id: 'cryptography', title: '암호학', description: '서명·공개키·해시·PQC가 무엇을 해결하는지', href: 'foundations/cryptography.html', concepts: ['digital-signature', 'hash-function', 'pqc'] },
  { id: 'sqisign', title: 'SQIsign', description: '프로토콜의 결과, 서명 과정, 사원수 계산', href: 'isogeny/isogeny-textbook.html', concepts: ['sqisign'] },
  { id: 'isogeny', title: 'Isogeny', description: '곡선 사이 사상, 커널, 차수와 그래프', href: 'isogeny/03-isogenies.html', concepts: [] },
  { id: 'elliptic-curves', title: '타원곡선', description: '곡선·특이점·무한원점·점 덧셈', href: 'isogeny/02-elliptic-curves.html', concepts: ['partial-derivative', 'singular-point', 'point-at-infinity'] },
  { id: 'finite-fields', title: '유한체', description: 'Fₚ와 Fₚ²에서 계산하는 방법과 표수', href: 'isogeny/01-finite-fields.html', concepts: ['field', 'characteristic'] },
  { id: 'algebra', title: '대수학', description: '군·환·아이디얼·몫환·체', href: 'foundations/algebra.html', concepts: ['group', 'ring', 'commutative-ring', 'ideal', 'quotient-ring', 'field'] },
  { id: 'notation', title: '집합과 기호', description: '집합·관계·동치류와 낯선 수학 기호', href: 'foundations/notation.html', concepts: ['set', 'equivalence-relation', 'equivalence-class'] }
];

export const commonQuestions = [
  { question: '전자서명은 암호화와 뭐가 다른가?', href: 'foundations/cryptography.html#서명이-해결하는-문제', terms: ['전자서명', '암호화', '서명'] },
  { question: 'SQIsign은 결국 무엇을 하는가?', href: 'foundations/cryptography.html#sqisign의-기여', terms: ['SQIsign', 'PQC', '후양자'] },
  { question: '곡선 사이 화살표 Isogeny가 뭔가?', href: 'isogeny/03-isogenies.html#isogeny의-정의', terms: ['isogeny', '곡선', '화살표'] },
  { question: '𝒪는 숫자 0인가, 대문자 O인가?', href: 'isogeny/02-elliptic-curves.html#사영평면과-무한원점', terms: ['O', '0', '무한원점', '항등원'] },
  { question: '편미분이 왜 곡선에 등장하나?', href: 'isogeny/02-elliptic-curves.html#특이점과-매끄러움', terms: ['편미분', '특이점', '모두 0'] },
  { question: 'char F와 체의 표수는 무슨 뜻인가?', href: 'isogeny/02-elliptic-curves.html#특이점과-매끄러움', terms: ['char F', '표수', '특성'] },
  { question: '아이디얼은 왜 필요한가?', href: 'foundations/algebra.html#아이디얼-몫환을-만들-수-있는-부분집합', terms: ['아이디얼', '몫환', '왜'] },
  { question: '[a]는 숫자인가, 집합인가?', href: 'foundations/notation.html#관계와-동치류-a', terms: ['[a]', '동치류', '대괄호'] }
];
