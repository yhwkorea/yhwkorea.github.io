export default {
  id:'group', title:'군', terms:['군'], summary:'하나의 연산을 계속 합성할 수 있고, 아무 동작이나 되돌릴 수 있는 대수 구조입니다.',
  target:'foundations/algebra.html#군-연산-하나가-있는-구조', prerequisites:['set','binary-operation'],
  why:'회전·치환·이동·곡선점 덧셈처럼 겉모습이 다른 “합성 가능한 대칭”을 동일한 공리로 계산하려고 등장했습니다.',
  intuition:'군은 행동들의 상자입니다. 두 행동을 이어서 할 수 있고, 아무것도 하지 않는 행동이 있으며, 모든 행동에는 정확히 되돌리는 행동이 있습니다.',
  beginner:'정수의 덧셈을 생각하면 됩니다. 두 정수를 더하면 정수이고, 0을 더하면 그대로이며, a를 더한 뒤 −a를 더하면 출발점으로 돌아옵니다.',
  notation:['(G,★): 집합 G와 연산 ★를 함께 표시','e: 항등원','g⁻¹: g의 역원','|G|: 유한군 G의 원소 수'],
  example:'정삼각형을 평면 안에서 그대로 유지하는 회전과 반사 6개는 합성을 연산으로 하는 비가환군을 이룹니다.',
  nonExample:'자연수 N은 덧셈에 닫혀 있고 결합법칙과 항등원 0이 있지만, 1의 덧셈 역원 −1이 N에 없으므로 군이 아닙니다.',
  calculation:'Z/5Z에서 [2]+[4]=[6]=[1]이고 [2]의 역원은 [3]입니다. [2]+[3]=[5]=[0]이기 때문입니다.',
  formal:'집합 G와 이항연산 ★:G×G→G가 모든 a,b,c∈G에 대해 (a★b)★c=a★(b★c)를 만족하고, e★a=a★e=a인 e와 a★a⁻¹=a⁻¹★a=e인 a⁻¹이 존재하면 (G,★)를 군이라 합니다.',
  theorem:'군의 항등원과 각 원소의 역원은 유일하며, (ab)⁻¹=b⁻¹a⁻¹입니다.',
  theoremAssumptions:['G는 군','a,b는 G의 임의의 원소'],
  proofIdea:'항등원 e,f가 둘이면 e=ef=f입니다. a의 두 역원 b,c가 있으면 b=be=b(ac)=(ba)c=ec=c입니다. ab에 b⁻¹a⁻¹을 양쪽에서 곱하면 항등원이 됩니다.',
  counterexample:'결합법칙을 빼면 괄호 위치에 따라 결과가 달라져 반복 합성이 모호해집니다. 정수의 연산 a★b=a−b는 (5★3)★1=1이지만 5★(3★1)=3입니다.',
  applications:['기하학의 대칭군과 치환군','타원곡선 점 덧셈','Galois 군과 방정식의 근','공개키 암호의 군 연산'],
  sources:[
    {author:'Thomas W. Judson',title:'Abstract Algebra: Theory and Applications',locator:'Chapter 3, Groups',href:'https://abstract.ups.edu/'},
    {author:'MIT OpenCourseWare',title:'18.701 Algebra I',locator:'Groups, subgroups, homomorphisms',href:'https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/'}
  ],
  usedIn:['부분군','군의 작용','몫군','Galois 군','타원곡선'], next:['subgroup','group-homomorphism','group-action','coset'], related:['abelian-group','ring','elliptic-curve'], depth:'encyclopedia'
};
