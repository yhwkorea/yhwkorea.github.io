export default {
  id:'group-action', title:'군의 작용', terms:['군의 작용','group action'], summary:'군의 각 원소를 어떤 집합을 움직이는 대칭으로 해석하는 규칙입니다.',
  target:'foundations/algebra.html#군의-작용과-대칭', prerequisites:['group','function','set'],
  why:'추상적인 군 원소가 실제로 점·도형·근·곡선에 어떤 변환을 일으키는지 연결하기 위해 필요합니다.',
  intuition:'군 G가 리모컨이고 집합 X가 화면이라 생각하면, g∈G는 화면의 모든 점을 한꺼번에 재배치하는 버튼입니다. 버튼을 연속으로 누르는 순서는 군의 곱과 같아야 합니다.',
  beginner:'정사각형을 90도 돌리는 행동을 네 번 하면 원래로 돌아옵니다. 회전 행동들의 계산이 정사각형 꼭짓점에 실제로 작용하는 것입니다.',
  notation:['G↷X: G가 X에 작용','g·x: g가 x를 옮긴 결과','G·x: x의 궤도','Gₓ: x의 안정자'],
  example:'정사각형의 회전군 C₄가 꼭짓점 {1,2,3,4}에 작용합니다. 90도 회전 r에 대해 r·1=2, r²·1=3입니다.',
  nonExample:'각 g마다 아무 함수 X→X를 고르는 것만으로는 작용이 아닙니다. 합성 규칙 (gh)·x=g·(h·x)가 깨질 수 있습니다.',
  calculation:'꼭짓점 1의 궤도는 {1,2,3,4}, 안정자는 {e}입니다. 따라서 |G·1|=4=|C₄|/|{e}|입니다.',
  formal:'군 G와 집합 X에 대해 e·x=x 및 (gh)·x=g·(h·x)를 만족하는 함수 G×X→X를 G의 X 위 왼쪽 작용이라 합니다.',
  theorem:'궤도-안정자 정리: 유한군 G가 X에 작용하면 |G·x|=[G:Gₓ]=|G|/|Gₓ|입니다.',
  theoremAssumptions:['G는 유한군','G가 집합 X에 작용','x∈X'],
  proofIdea:'g·x=h·x인 것과 h⁻¹g∈Gₓ인 것이 동치입니다. 따라서 x를 같은 점으로 보내는 군 원소들이 정확히 안정자의 잉여류 하나씩을 이루고, 궤도의 점은 그 잉여류들과 일대일 대응합니다.',
  counterexample:'e가 항등함수로 작용하더라도 합성 규칙이 없으면 군 구조와 변환 구조가 어긋납니다. C₂={e,s}에서 s가 상수함수라면 s²=e라는 군 관계를 만족하지 못합니다.',
  applications:['Burnside 보조정리와 경우의 수','Galois 군의 근에 대한 작용','군 표현론','암호학의 군 작용 기반 문제'],
  sources:[
    {author:'Thomas W. Judson',title:'Abstract Algebra: Theory and Applications',locator:'Chapter 14, Group Actions',href:'https://abstract.ups.edu/'},
    {author:'MIT OpenCourseWare',title:'18.703 Modern Algebra',locator:'Group actions and Sylow theorems',href:'https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/'}
  ],
  usedIn:['궤도와 안정자','대칭의 분류','Galois 군','군 작용 암호'], next:['coset','lagrange-theorem','galois-group'], related:['group','function','equivalence-relation'], depth:'encyclopedia'
};
