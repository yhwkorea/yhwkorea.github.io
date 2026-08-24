export const areas = [
  { id: 'cryptography', title: '암호학', description: '서명·공개키·해시·PQC가 무엇을 해결하는지', href: 'foundations/cryptography.html', concepts: ['public-key','private-key','authentication','integrity','encryption','digital-signature','hash-function','pqc'] },
  { id: 'sqisign', title: 'SQIsign', description: '프로토콜의 결과, 서명 과정, 사원수 계산', href: 'isogeny/isogeny-textbook.html', concepts: ['security-assumption','sqisign','witness','commitment','challenge','response','identification-protocol','fiat-shamir','klpt','supersingular','quaternion-algebra','order','quaternion-ideal','reduced-norm','deuring-correspondence','random-walk','spectral-gap','expander-graph','ramanujan-graph'] },
  { id: 'isogeny', title: 'Isogeny', description: '곡선 사이 사상, 커널, 차수와 그래프', href: 'isogeny/03-isogenies.html', concepts: ['rational-function','morphism','group-homomorphism','function-field','separable-morphism','isogeny','kernel','degree','velu-formulas','dual-isogeny','galois-action','graph','isogeny-graph','endomorphism'] },
  { id: 'elliptic-curves', title: '타원곡선', description: '곡선·특이점·무한원점·점 덧셈', href: 'isogeny/02-elliptic-curves.html', concepts: ['affine-plane','projective-plane','homogeneous-polynomial','algebraic-curve','singular-point','smooth-curve','genus','discriminant','point-at-infinity','rational-point','elliptic-curve','group-law','scalar-multiplication','algebraic-closure','j-invariant','torsion'] },
  { id: 'finite-fields', title: '유한체', description: 'Fₚ와 Fₚ²에서 계산하는 방법과 표수', href: 'isogeny/01-finite-fields.html', concepts: ['modular-arithmetic','polynomial','irreducible-polynomial','finite-field','extension-field','field-automorphism','frobenius-map','field-norm','field','characteristic'] },
  { id: 'calculus', title: '미적분', description: '미분·편미분과 곡선의 변화율', href: 'foundations/calculus.html', concepts: ['limit','slope','derivative','tangent-line','partial-derivative','gradient'] },
  { id: 'algebra', title: '대수학', description: '군·환·아이디얼·몫환·체', href: 'foundations/algebra.html', concepts: ['binary-operation','closure-property','identity-element','inverse-element','group','abelian-group','subgroup','normal-subgroup','quotient-group','group-homomorphism','kernel','ring','commutative-ring','unit','zero-divisor','integral-domain','ideal','principal-ideal','quotient-ring','field'] },
  { id: 'notation', title: '집합과 기호', description: '집합·함수·관계·동치류와 낯선 수학 기호', href: 'foundations/notation.html', concepts: ['set','element','subset','proposition','function','injective-function','surjective-function','relation','equivalence-relation','equivalence-class'] }
];

export const commonQuestions = [
  { question: '전자서명은 암호화와 뭐가 다른가?', href: 'foundations/cryptography.html#서명이-해결하는-문제', terms: ['전자서명', '암호화', '서명'] },
  { question: 'SQIsign은 결국 무엇을 하는가?', href: 'foundations/cryptography.html#sqisign의-기여', terms: ['SQIsign', 'PQC', '후양자'] }
];
