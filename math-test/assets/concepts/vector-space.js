export default {
  id: 'vector-space',
  title: '벡터공간',
  terms: ['벡터공간', 'vector space'],
  summary: '덧셈과 스칼라곱이 가능하고, 그 결과가 다시 같은 공간 안에 머무는 선형 구조입니다.',
  target: 'university/01-linear-algebra.html#vector-spaces',
  prerequisites: ['field', 'abelian-group'],
  why: '연립방정식의 해, 좌표벡터, 다항식, 함수처럼 겉모습이 다른 대상에서 동일한 선형 계산을 재사용하려고 등장했습니다.',
  intuition: '벡터공간은 원점을 포함하며, 공간 안의 화살표를 늘이거나 줄이고 서로 더해도 밖으로 나가지 않는 세계입니다. 곧은 선·평면뿐 아니라 함수들의 공간도 이 조건을 만족할 수 있습니다.',
  beginner: '숫자쌍 (x,y)만 벡터라고 생각할 필요는 없습니다. 두 대상을 더하는 법과 숫자를 곱하는 법이 있고, 그 연산이 평소 덧셈처럼 행동하면 벡터로 취급할 수 있습니다.',
  notation: ['F: 스칼라가 사는 체', 'V: 벡터들의 집합', 'u+v: 벡터 덧셈', 'av: 스칼라 a와 벡터 v의 스칼라곱'],
  example: 'R²는 실수체 R 위 벡터공간입니다. 두 좌표를 성분별로 더하고 실수를 각 성분에 곱합니다. 차수 2 이하 실수 다항식들의 집합도 계수별 덧셈과 스칼라곱으로 3차원 벡터공간입니다.',
  nonExample: '원점을 지나지 않는 직선 {(x,y): y=2x+1}은 R²의 부분벡터공간이 아닙니다. 영벡터 (0,0)를 포함하지 않고, 그 위의 점을 0배하면 직선 밖의 (0,0)이 되기 때문입니다.',
  calculation: 'p(x)=1+2x와 q(x)=x−x²를 벡터로 보면 3p−2q=3+6x−2x+2x²=3+4x+2x²입니다. 좌표기저 (1,x,x²)에서는 (1,2,0)과 (0,1,−1)의 계산 3(1,2,0)−2(0,1,−1)=(3,4,2)와 같습니다.',
  formal: '체 F 위 집합 V에 연산 +:V×V→V와 ·:F×V→V가 주어졌다고 하자. (V,+)가 아벨군이고, 모든 a,b∈F와 u,v∈V에 대해 a(u+v)=au+av, (a+b)v=av+bv, (ab)v=a(bv), 1v=v를 만족하면 V를 F-벡터공간이라 합니다.',
  theorem: '부분공간 판정법: 공집합이 아닌 U⊆V가 모든 u,v∈U와 a,b∈F에 대해 au+bv∈U를 만족하면 U는 V의 부분벡터공간입니다. 덧셈·스칼라곱 공리를 하나씩 다시 확인하는 일을 이 조건 하나로 줄입니다.',
  theoremAssumptions: ['V는 체 F 위의 벡터공간', 'U는 V의 공집합이 아닌 부분집합', 'U는 모든 두 원소의 선형결합에 닫힘'],
  proofIdea: 'U가 비어 있지 않아 w∈U를 잡을 수 있습니다. a=b=0을 넣으면 0∈U, a=1,b=1이면 덧셈에 닫히고, a=−1,b=0이면 덧셈 역원에 닫힙니다. 나머지 결합·분배 공리는 V에서 이미 성립하므로 U에 그대로 제한됩니다.',
  counterexample: '덧셈에만 닫혀 있다고 충분하지 않습니다. 정수격자 Z²는 두 격자점을 더하면 다시 Z²이지만, R 위에서 (1,0)에 스칼라 1/2을 곱한 (1/2,0)은 Z²에 없으므로 R-벡터공간이 아닙니다.',
  applications: ['연립방정식의 해집합과 영공간', '함수공간과 미분방정식', '오류정정부호와 유한체 선형대수', '격자암호에서 주변 실수공간과 정수격자의 구분'],
  sources: [
    { author: 'Sheldon Axler', title: 'Linear Algebra Done Right', locator: '3rd ed., §1A–1C', href: 'https://linear.axler.net/' },
    { author: 'Gilbert Strang', title: 'MIT 18.06SC Linear Algebra', locator: 'Unit I, Vector Spaces and Subspaces', href: 'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/' }
  ],
  usedIn: ['부분공간', '기저', '차원', '선형변환', '격자'],
  next: ['subspace', 'linear-combination', 'basis', 'linear-transformation'],
  related: ['matrix', 'field', 'abelian-group'],
  depth: 'encyclopedia'
};
