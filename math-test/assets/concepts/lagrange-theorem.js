export default {
  id:'lagrange-theorem', title:'Lagrange 정리', terms:['Lagrange 정리','라그랑주 정리'], summary:'유한군의 크기는 부분군 크기의 정수배라는 정리입니다.',
  target:'foundations/algebra.html#잉여류와-동형정리', prerequisites:['group','subgroup','coset'],
  why:'유한군 안에 어떤 부분군과 원소 위수가 가능한지 실제 계산 전에 제한합니다.',
  intuition:'부분군 H를 군 안에서 겹치지 않게 평행 이동한 잉여류들이 G를 빈틈없이 타일처럼 덮습니다. 모든 타일의 크기는 |H|로 같습니다.',
  beginner:'12개 물건을 똑같은 크기의 묶음으로 나누면 한 묶음의 크기는 12의 약수여야 합니다. 유한군의 잉여류가 바로 그런 동일 크기 묶음입니다.',
  notation:['|G|: 군 G의 크기','[G:H]: H의 잉여류 개수인 지표','|G|=[G:H]|H|'],
  example:'Z₁₂의 부분군 ⟨4⟩={0,4,8}은 크기 3이고, 네 잉여류가 Z₁₂를 분할하므로 12=4·3입니다.',
  nonExample:'“|H|가 |G|를 나누면 반드시 그런 부분군 H가 존재한다”는 역은 일반적으로 거짓입니다. A₄에는 크기 6인 부분군이 없습니다.',
  calculation:'원소 g가 생성하는 순환부분군 ⟨g⟩의 크기는 g의 위수입니다. Lagrange 정리에 따라 ord(g)||G|이고, 따라서 모든 g∈G에 대해 g^|G|=e입니다.',
  formal:'유한군 G의 부분군 H에 대해 왼쪽 잉여류들은 G를 분할하고 각 잉여류의 크기가 |H|이므로 |G|=[G:H]|H|입니다.',
  theorem:'따름정리: 유한군 G의 모든 원소 g의 위수는 |G|를 나누며 g^|G|=e입니다.',
  theoremAssumptions:['G는 유한군','H≤G','원소 위수 결론에서는 g∈G'],
  proofIdea:'h↦gh는 H에서 gH로 가는 전단사이므로 모든 잉여류가 H와 같은 크기입니다. 잉여류들은 서로 같거나 겹치지 않고 합쳐서 G 전체가 되므로 크기를 더하면 공식이 나옵니다.',
  counterexample:'무한군에서는 |G|=[G:H]|H|를 평범한 정수 곱으로 해석할 수 없습니다. Z의 부분군 2Z는 둘 다 무한하지만 지표는 2입니다.',
  applications:['원소 위수 계산','소수 크기 군의 분류','Fermat 소정리','Sylow 정리의 출발점'],
  sources:[
    {author:'Thomas W. Judson',title:'Abstract Algebra: Theory and Applications',locator:'Chapter 6, Cosets and Lagrange’s Theorem',href:'https://abstract.ups.edu/'},
    {author:'MIT OpenCourseWare',title:'18.701 Algebra I',locator:'Cosets and Lagrange theorem',href:'https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/'}
  ],
  usedIn:['원소의 위수','Fermat 소정리','Sylow 정리','유한군 분류'], next:['normal-subgroup','quotient-group','first-isomorphism-theorem'], related:['coset','group','subgroup'], depth:'encyclopedia'
};
