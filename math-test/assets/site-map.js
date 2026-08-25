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
  sqisign: {
    label: 'SQIsign 이해',
    root: 'isogeny/isogeny-textbook.html#먼저-sqisign-그림부터-읽자'
  }
};

export function areaForPath(pathname) {
  return globalAreas.find((area) => pathname.endsWith(area.href)) || null;
}
