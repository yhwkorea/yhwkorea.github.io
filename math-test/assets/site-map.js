export const globalAreas = [
  { id: 'cryptography', label: '현대 암호학', href: 'foundations/cryptography.html', children: ['보안 목표', '대칭 암호·AEAD', '해시·MAC·KDF', '키 합의·KEM', '전자서명·PKI', 'TLS', 'PQC'] },
  { id: 'notation', label: '집합과 기호', href: 'foundations/notation.html', children: ['집합', '함수', '관계', '동치류'] },
  { id: 'algebra', label: '대수학', href: 'foundations/algebra.html', children: ['군', '환', '아이디얼', '몫', '체'] },
  { id: 'finite-fields', label: '유한체', href: 'isogeny/01-finite-fields.html', children: ['나머지 연산', '확장체', 'Frobenius'] },
  { id: 'elliptic-curves', label: '타원곡선', href: 'isogeny/02-elliptic-curves.html', children: ['곡선', '무한원점', '군법칙', 'torsion'] },
  { id: 'isogeny', label: '아이소제니', href: 'isogeny/03-isogenies.html', children: ['사상', '커널', '차수', '그래프'] },
  { id: 'sqisign', label: 'SQIsign', href: 'isogeny/isogeny-textbook.html', children: ['결과', '서명 흐름', '곡선 언어', '사원수 언어'] }
];

export const journeys = {
  'crypto-overview': { label: '현대 암호학 전체 이해', root: 'foundations/cryptography.html#crypto-atlas-title' },
  aes: { label: 'AES와 AEAD 이해', root: 'foundations/cryptography.html#대칭암호와-aead' },
  ascon: { label: 'Ascon 이해', root: 'foundations/cryptography.html#nist-대칭-해시-mac' },
  hash: { label: '해시·MAC·KDF 이해', root: 'foundations/cryptography.html#해시-mac-kdf' },
  kem: { label: '키 합의와 KEM 이해', root: 'foundations/cryptography.html#공개키-키교환-kem' },
  'ml-kem': { label: 'ML-KEM 이해', root: 'foundations/cryptography.html#nist-pqc-현황판' },
  hqc: { label: 'HQC 이해', root: 'foundations/cryptography.html#nist-pqc-현황판' },
  signatures: { label: '전자서명 계열 이해', root: 'foundations/cryptography.html#전자서명-표준' },
  'ml-dsa': { label: 'ML-DSA 이해', root: 'foundations/cryptography.html#nist-pqc-현황판' },
  'slh-dsa': { label: 'SLH-DSA 이해', root: 'foundations/cryptography.html#nist-pqc-현황판' },
  'fn-dsa': { label: 'FN-DSA 이해', root: 'foundations/cryptography.html#nist-pqc-현황판' },
  'additional-signatures': { label: 'NIST 추가 서명 후보 비교', root: 'foundations/cryptography.html#추가-서명-후보' },
  faest: { label: 'FAEST 이해', root: 'foundations/cryptography.html#추가-서명-후보' },
  hawk: { label: 'HAWK 이해', root: 'foundations/cryptography.html#추가-서명-후보' },
  mayo: { label: 'MAYO 이해', root: 'foundations/cryptography.html#추가-서명-후보' },
  mqom: { label: 'MQOM 이해', root: 'foundations/cryptography.html#추가-서명-후보' },
  'qr-uov': { label: 'QR-UOV 이해', root: 'foundations/cryptography.html#추가-서명-후보' },
  sdith: { label: 'SDitH 이해', root: 'foundations/cryptography.html#추가-서명-후보' },
  snova: { label: 'SNOVA 이해', root: 'foundations/cryptography.html#추가-서명-후보' },
  uov: { label: 'UOV 이해', root: 'foundations/cryptography.html#추가-서명-후보' },
  tls: { label: 'TLS 1.3 이해', root: 'foundations/cryptography.html#tls-흐름' },
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
    { label: 'AES·AEAD', href: 'foundations/cryptography.html#대칭암호와-aead', journey: 'aes' },
    { label: 'Ascon', href: 'foundations/cryptography.html#nist-대칭-해시-mac', journey: 'ascon' }
  ] },
  { label: '해시·인증', nodes: [
    { label: 'SHA-2·SHA-3·SHAKE', href: 'foundations/cryptography.html#해시-mac-kdf', journey: 'hash' },
    { label: 'HMAC·CMAC·KMAC', href: 'foundations/cryptography.html#해시-mac-kdf', journey: 'hash' }
  ] },
  { label: '키 설정', nodes: [
    { label: 'DH·ECDH·KEM', href: 'foundations/cryptography.html#공개키-키교환-kem', journey: 'kem' },
    { label: 'ML-KEM', href: 'foundations/cryptography.html#nist-pqc-현황판', journey: 'ml-kem' },
    { label: 'HQC', href: 'foundations/cryptography.html#nist-pqc-현황판', journey: 'hqc' }
  ] },
  { label: '전자서명', nodes: [
    { label: 'RSA·ECDSA·EdDSA', href: 'foundations/cryptography.html#전자서명-표준', journey: 'signatures' },
    { label: 'ML-DSA', href: 'foundations/cryptography.html#nist-pqc-현황판', journey: 'ml-dsa' },
    { label: 'SLH-DSA', href: 'foundations/cryptography.html#nist-pqc-현황판', journey: 'slh-dsa' },
    { label: 'FN-DSA', href: 'foundations/cryptography.html#nist-pqc-현황판', journey: 'fn-dsa' },
    { label: '후보 9개 비교', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'additional-signatures' },
    { label: 'FAEST', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'faest' },
    { label: 'HAWK', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'hawk' },
    { label: 'MAYO', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'mayo' },
    { label: 'MQOM', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'mqom' },
    { label: 'QR-UOV', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'qr-uov' },
    { label: 'SDitH', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'sdith' },
    { label: 'SNOVA', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'snova' },
    { label: 'UOV', href: 'foundations/cryptography.html#추가-서명-후보', journey: 'uov' }
  ] },
  { label: '프로토콜', nodes: [
    { label: '인증서·PKI', href: 'foundations/cryptography.html#인증서와-tls' },
    { label: 'TLS 1.3', href: 'foundations/cryptography.html#tls-흐름', journey: 'tls' }
  ] },
  { label: '아이소제니 연구', nodes: [
    { label: 'SQIsign', href: 'isogeny/isogeny-textbook.html#먼저-sqisign-그림부터-읽자', journey: 'sqisign' }
  ] }
];

export function areaForPath(pathname) {
  return globalAreas.find((area) => pathname.endsWith(area.href)) || null;
}
