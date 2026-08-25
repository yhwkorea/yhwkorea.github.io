export const globalAreas = [
  { id: 'cryptography', label: '현대 암호학', href: 'foundations/cryptography.html', children: ['보안 목표', '대칭 암호·AEAD', '해시·MAC·KDF', '키 합의·KEM', '전자서명·PKI', 'TLS', 'PQC'] },
  { id: 'calculus', label: '미적분', href: 'foundations/calculus.html', children: ['미분', '편미분', '그래디언트', '특이점'] },
  { id: 'notation', label: '집합과 기호', href: 'foundations/notation.html', children: ['집합', '함수', '관계', '동치류'] },
  { id: 'algebra', label: '대수학', href: 'foundations/algebra.html', children: ['군', '환', '아이디얼', '몫', '체'] },
  { id: 'finite-fields', label: '유한체', href: 'isogeny/01-finite-fields.html', children: ['나머지 연산', '확장체', 'Frobenius'] },
  { id: 'elliptic-curves', label: '타원곡선', href: 'isogeny/02-elliptic-curves.html', children: ['곡선', '무한원점', '군법칙', 'torsion'] },
  { id: 'isogeny', label: '아이소제니', href: 'isogeny/03-isogenies.html', children: ['사상', '커널', '차수', '그래프'] },
  { id: 'sqisign', label: 'SQIsign', href: 'isogeny/isogeny-textbook.html', children: ['결과', '서명 흐름', '곡선 언어', '사원수 언어'] }
];

export const journeys = {
  'crypto-overview': { label: '현대 암호학 전체 이해', root: 'foundations/cryptography.html#crypto-atlas-title' },
  aes: { label: 'AES와 AEAD 이해', root: 'crypto/01-symmetric-hash.html#aes' },
  ascon: { label: 'Ascon 이해', root: 'crypto/01-symmetric-hash.html#ascon' },
  hash: { label: '해시·MAC·KDF 이해', root: 'crypto/01-symmetric-hash.html#hash' },
  kem: { label: '키 합의와 KEM 이해', root: 'crypto/02-key-establishment.html#kem' },
  'ml-kem': { label: 'ML-KEM 이해', root: 'crypto/02-key-establishment.html#ml-kem' },
  hqc: { label: 'HQC 이해', root: 'crypto/02-key-establishment.html#hqc' },
  signatures: { label: '전자서명 계열 이해', root: 'crypto/03-signatures.html#signature-interface' },
  'ml-dsa': { label: 'ML-DSA 이해', root: 'crypto/03-signatures.html#ml-dsa' },
  'slh-dsa': { label: 'SLH-DSA 이해', root: 'crypto/03-signatures.html#slh-dsa' },
  'fn-dsa': { label: 'FN-DSA 이해', root: 'crypto/03-signatures.html#fn-dsa' },
  'additional-signatures': { label: 'NIST 추가 서명 후보 비교', root: 'crypto/04-pqc-candidates.html#how-to-read' },
  faest: { label: 'FAEST 이해', root: 'crypto/04-pqc-candidates.html#faest' },
  hawk: { label: 'HAWK 이해', root: 'crypto/04-pqc-candidates.html#hawk' },
  mayo: { label: 'MAYO 이해', root: 'crypto/04-pqc-candidates.html#mayo' },
  mqom: { label: 'MQOM 이해', root: 'crypto/04-pqc-candidates.html#mqom' },
  'qr-uov': { label: 'QR-UOV 이해', root: 'crypto/04-pqc-candidates.html#qr-uov' },
  sdith: { label: 'SDitH 이해', root: 'crypto/04-pqc-candidates.html#sdith' },
  snova: { label: 'SNOVA 이해', root: 'crypto/04-pqc-candidates.html#snova' },
  uov: { label: 'UOV 이해', root: 'crypto/04-pqc-candidates.html#uov' },
  tls: { label: 'TLS 1.3 이해', root: 'crypto/05-tls-pki.html#client-hello' },
  notation: { label: '집합과 수학 기호 이해', root: 'foundations/notation.html#집합과-원소' },
  algebra: { label: '대수학 구조 이해', root: 'foundations/algebra.html#연산이란-무엇인가' },
  calculus: { label: '미분과 편미분 이해', root: 'foundations/calculus.html#미분은-무엇을-재나' },
  'finite-fields': { label: '유한체 이해', root: 'isogeny/01-finite-fields.html#체란-무엇인가' },
  'elliptic-curves': { label: '타원곡선 이해', root: 'isogeny/02-elliptic-curves.html#아핀평면과-대수곡선' },
  isogeny: { label: '아이소제니 이해', root: 'isogeny/03-isogenies.html#곡선-사이의-사상' },
  sqisign: {
    label: 'SQIsign 이해',
    root: 'isogeny/isogeny-textbook.html#먼저-sqisign-그림부터-읽자'
  }
};

export const cryptoBranches = [
  { label: '공통 바탕', nodes: [
    { label: '보안 목표', href: 'foundations/cryptography.html#보안-목표', journey: 'crypto-overview' },
    { label: '키·난수·nonce', href: 'foundations/cryptography.html#난수와-nonce' }
  ] },
  { label: '대칭 암호', nodes: [
    { label: 'AES·AEAD', href: 'crypto/01-symmetric-hash.html#aes', journey: 'aes' },
    { label: 'Ascon', href: 'crypto/01-symmetric-hash.html#ascon', journey: 'ascon' }
  ] },
  { label: '해시·인증', nodes: [
    { label: 'SHA-2·SHA-3·SHAKE', href: 'crypto/01-symmetric-hash.html#hash', journey: 'hash' },
    { label: 'HMAC·CMAC·KMAC', href: 'crypto/01-symmetric-hash.html#hash', journey: 'hash' }
  ] },
  { label: '키 설정', nodes: [
    { label: 'DH·ECDH·KEM', href: 'crypto/02-key-establishment.html#kem', journey: 'kem' },
    { label: 'ML-KEM', href: 'crypto/02-key-establishment.html#ml-kem', journey: 'ml-kem' },
    { label: 'HQC', href: 'crypto/02-key-establishment.html#hqc', journey: 'hqc' }
  ] },
  { label: '전자서명', nodes: [
    { label: 'RSA·ECDSA·EdDSA', href: 'crypto/03-signatures.html#signature-interface', journey: 'signatures' },
    { label: 'ML-DSA', href: 'crypto/03-signatures.html#ml-dsa', journey: 'ml-dsa' },
    { label: 'SLH-DSA', href: 'crypto/03-signatures.html#slh-dsa', journey: 'slh-dsa' },
    { label: 'FN-DSA', href: 'crypto/03-signatures.html#fn-dsa', journey: 'fn-dsa' },
    { label: '후보 9개 비교', href: 'crypto/04-pqc-candidates.html#how-to-read', journey: 'additional-signatures' },
    { label: 'FAEST', href: 'crypto/04-pqc-candidates.html#faest', journey: 'faest' },
    { label: 'HAWK', href: 'crypto/04-pqc-candidates.html#hawk', journey: 'hawk' },
    { label: 'MAYO', href: 'crypto/04-pqc-candidates.html#mayo', journey: 'mayo' },
    { label: 'MQOM', href: 'crypto/04-pqc-candidates.html#mqom', journey: 'mqom' },
    { label: 'QR-UOV', href: 'crypto/04-pqc-candidates.html#qr-uov', journey: 'qr-uov' },
    { label: 'SDitH', href: 'crypto/04-pqc-candidates.html#sdith', journey: 'sdith' },
    { label: 'SNOVA', href: 'crypto/04-pqc-candidates.html#snova', journey: 'snova' },
    { label: 'UOV', href: 'crypto/04-pqc-candidates.html#uov', journey: 'uov' }
  ] },
  { label: '프로토콜', nodes: [
    { label: '인증서·PKI', href: 'crypto/05-tls-pki.html#certificate' },
    { label: 'TLS 1.3', href: 'crypto/05-tls-pki.html#client-hello', journey: 'tls' }
  ] },
  { label: '아이소제니 연구', nodes: [
    { label: 'SQIsign', href: 'isogeny/isogeny-textbook.html#먼저-sqisign-그림부터-읽자', journey: 'sqisign' }
  ] }
];

export const mathBranches = [
  { label: '집합과 기호', journey: 'notation', nodes: [
    { label: '집합·원소', href: 'foundations/notation.html#집합과-원소' },
    { label: '부분집합·집합 연산', href: 'foundations/notation.html#부분집합과-집합-연산' },
    { label: '명제·논리 기호', href: 'foundations/notation.html#명제와-논리-기호' },
    { label: '함수·화살표', href: 'foundations/notation.html#함수와-화살표' },
    { label: '관계·동치류', href: 'foundations/notation.html#관계와-동치류-a' }
  ] },
  { label: '대수학', journey: 'algebra', nodes: [
    { label: '연산', href: 'foundations/algebra.html#연산이란-무엇인가' },
    { label: '군', href: 'foundations/algebra.html#군-연산-하나가-있는-구조' },
    { label: '환', href: 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조' },
    { label: '아이디얼·몫환', href: 'foundations/algebra.html#아이디얼-몫환을-만들-수-있는-부분집합' },
    { label: '정역·체', href: 'foundations/algebra.html#정역과-체' }
  ] },
  { label: '미적분', journey: 'calculus', nodes: [
    { label: '미분', href: 'foundations/calculus.html#미분은-무엇을-재나' },
    { label: '편미분', href: 'foundations/calculus.html#변수가-여러-개면-편미분' },
    { label: '그래디언트·특이점', href: 'foundations/calculus.html#곡선의-특이점과-연결' }
  ] },
  { label: '유한체', journey: 'finite-fields', nodes: [
    { label: '체', href: 'isogeny/01-finite-fields.html#체란-무엇인가' },
    { label: '소수체 F_p', href: 'isogeny/01-finite-fields.html#소수체-mathbb-f_p' },
    { label: '다항식·확장체', href: 'isogeny/01-finite-fields.html#다항식으로-확장체-만들기' },
    { label: 'F_{p²} 계산', href: 'isogeny/01-finite-fields.html#mathbb-f_p2를-손으로-만들기' },
    { label: 'Frobenius', href: 'isogeny/01-finite-fields.html#frobenius와-켤레' }
  ] },
  { label: '타원곡선', journey: 'elliptic-curves', nodes: [
    { label: '아핀평면·곡선', href: 'isogeny/02-elliptic-curves.html#아핀평면과-대수곡선' },
    { label: '사영평면·무한원점', href: 'isogeny/02-elliptic-curves.html#사영평면과-무한원점' },
    { label: '특이점·매끄러움', href: 'isogeny/02-elliptic-curves.html#특이점과-매끄러움' },
    { label: '군법칙', href: 'isogeny/02-elliptic-curves.html#ef와-군법칙' },
    { label: 'j-불변량', href: 'isogeny/02-elliptic-curves.html#j-불변량은-무엇을-분류하는가' },
    { label: 'torsion', href: 'isogeny/02-elliptic-curves.html#torsion-점' }
  ] },
  { label: '아이소제니', journey: 'isogeny', nodes: [
    { label: '곡선 사이 사상', href: 'isogeny/03-isogenies.html#곡선-사이의-사상' },
    { label: '아이소제니 정의', href: 'isogeny/03-isogenies.html#isogeny의-정의' },
    { label: '커널·Vélu', href: 'isogeny/03-isogenies.html#커널이-isogeny를-결정한다' },
    { label: '차수·분리가능성', href: 'isogeny/03-isogenies.html#차수와-분리가능성' },
    { label: '쌍대 아이소제니', href: 'isogeny/03-isogenies.html#쌍대-isogeny' },
    { label: '아이소제니 그래프', href: 'isogeny/03-isogenies.html#isogeny-그래프' }
  ] }
];

export function areaForPath(pathname) {
  if (pathname.includes('/crypto/')) return globalAreas.find((area) => area.id === 'cryptography');
  return globalAreas.find((area) => pathname.endsWith(area.href)) || null;
}
