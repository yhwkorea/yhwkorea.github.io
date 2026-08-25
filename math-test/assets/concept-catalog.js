export const areas = [
  { id: 'primary-math', title: '초등 수학', description: '수 감각·연산·분수·비율·측정·자료', href: 'school/01-primary.html', concepts: ['fraction','ratio'] },
  { id: 'middle-math', title: '중등 수학', description: '정수·유리수·식·방정식·기하·자료', href: 'school/02-middle.html', concepts: ['integer','rational-number','exponent','linear-equation'] },
  { id: 'secondary-math', title: '고등 기본 수학', description: '실수·다항식·함수·좌표·삼각비·확률', href: 'school/03-secondary.html', concepts: ['real-number','quadratic-equation'] },
  { id: 'senior-math', title: '고등 심화 수학', description: '함수·복소수·미적분·공간기하·확률', href: 'school/04-senior-secondary.html', concepts: ['trigonometry','complex-number','combinatorics','integral'] },
  { id: 'linear-algebra', title: '선형대수학', description: '벡터·행렬·선형변환·고유값', href: 'linear-algebra/linear-algebra-answers.html', concepts: ['matrix','vector'] },
  { id: 'cryptography', title: '현대 암호학', description: '보안 목표에서 TLS·NIST 표준·PQC 후보까지', href: 'foundations/cryptography.html', concepts: ['public-key','private-key','authentication','integrity','encryption','entropy','drbg','nonce','block-cipher','aes','aead','ascon','hash-function','mac','kdf','diffie-hellman','kem','ml-kem','hqc','digital-signature','certificate','tls13','ml-dsa','slh-dsa','fn-dsa','faest','hawk','mayo','mqom','qr-uov','sdith','snova','uov','pqc','security-assumption','sqisign','witness','commitment','challenge','response','identification-protocol','fiat-shamir'] },
  { id: 'quaternion-algebra', title: '사원수대수', description: '비가환 대수·order·아이디얼과 곡선의 대응', href: 'isogeny/isogeny-textbook.html#왜-초특이-곡선인가-자기동형사상환endomorphism-ring', concepts: ['quaternion-algebra','order','quaternion-ideal','reduced-norm','deuring-correspondence','klpt'] },
  { id: 'isogeny', title: '아이소제니 이론', description: '곡선 사이 사상, 커널, 차수와 그래프', href: 'isogeny/03-isogenies.html', concepts: ['rational-function','morphism','group-homomorphism','function-field','separable-morphism','isogeny','kernel','degree','velu-formulas','dual-isogeny','galois-action','graph','isogeny-graph','endomorphism','supersingular','random-walk','spectral-gap','expander-graph','ramanujan-graph'] },
  { id: 'elliptic-curves', title: '타원곡선', description: '곡선·특이점·무한원점·점 덧셈', href: 'isogeny/02-elliptic-curves.html', concepts: ['affine-plane','projective-plane','homogeneous-polynomial','algebraic-curve','singular-point','smooth-curve','genus','discriminant','point-at-infinity','rational-point','elliptic-curve','group-law','scalar-multiplication','algebraic-closure','j-invariant','torsion'] },
  { id: 'finite-fields', title: '유한체', description: 'Fₚ와 Fₚ²에서 계산하는 방법과 표수', href: 'isogeny/01-finite-fields.html', concepts: ['modular-arithmetic','polynomial','irreducible-polynomial','finite-field','extension-field','field-automorphism','frobenius-map','field-norm','field','characteristic'] },
  { id: 'calculus', title: '미적분', description: '미분·편미분과 곡선의 변화율', href: 'foundations/calculus.html', concepts: ['limit','slope','derivative','tangent-line','partial-derivative','gradient'] },
  { id: 'algebra', title: '추상대수학', description: '군·환·아이디얼·몫환·체', href: 'foundations/algebra.html', concepts: ['binary-operation','closure-property','identity-element','inverse-element','group','abelian-group','subgroup','normal-subgroup','quotient-group','group-homomorphism','kernel','ring','commutative-ring','unit','zero-divisor','integral-domain','ideal','principal-ideal','quotient-ring','field'] },
  { id: 'notation', title: '집합과 기호', description: '집합·함수·관계·동치류와 낯선 수학 기호', href: 'foundations/notation.html', concepts: ['set','element','subset','proposition','function','injective-function','surjective-function','relation','equivalence-relation','equivalence-class'] }
];

export const commonQuestions = [
  { question: '전자서명은 암호화와 뭐가 다른가?', href: 'foundations/cryptography.html#서명이-해결하는-문제', terms: ['전자서명', '암호화', '서명'] },
  { question: 'SQIsign은 결국 무엇을 하는가?', href: 'foundations/cryptography.html#sqisign의-기여', terms: ['SQIsign', 'PQC', '후양자'] }
];
