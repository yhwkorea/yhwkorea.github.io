export default {
  id:'eigenvalue', title:'고유값과 고유벡터', terms:['고유값','고유벡터','eigenvalue','eigenvector'],
  summary:'선형변환 뒤에도 방향이 유지되는 0이 아닌 벡터와 그 방향의 확대율입니다.', target:'university/01-linear-algebra.html#eigenvalues', prerequisites:['linear-transformation','null-space'],
  why:'여러 좌표가 섞이는 변환에서 서로 간섭하지 않고 독립적으로 확대되는 방향을 찾아 반복 계산과 장기 행동을 단순화합니다.',
  intuition:'지도에서 북동쪽 방향만 정확히 두 배로 늘어나고 다른 방향은 섞인다고 생각해 봅시다. 그 특별한 북동쪽 화살표가 고유벡터이고 두 배라는 수가 고유값입니다.',
  beginner:'벡터 v를 행렬 A에 넣었을 때 방향은 그대로이고 길이와 부호만 λ배 바뀌면 Av=λv입니다. v=0은 모든 λ에 대해 식을 만족하므로 방향을 주지 못해 제외합니다.',
  notation:['λ: 고유값','v≠0: λ에 속하는 고유벡터','E_λ=ker(T−λI): λ-고유공간','χ_A(t)=det(tI−A): 특성다항식'],
  example:'A=[[2,1],[0,3]]에서 e₁=(1,0)은 Ae₁=2e₁이므로 고유값 2의 고유벡터입니다. λ=3에서는 (1,1)이 A(1,1)=(3,3)=3(1,1)을 만족합니다.',
  nonExample:'Av가 v와 평행하지 않으면 v는 고유벡터가 아닙니다. 또한 영벡터는 Av=λv를 만족하더라도 고유벡터로 정의하지 않습니다.',
  calculation:'Av=λv를 (A−λI)v=0으로 옮깁니다. 0이 아닌 해가 있으려면 A−λI가 비가역이므로 det(A−λI)=0입니다. A=[[2,1],[0,3]]이면 (2−λ)(3−λ)=0에서 λ=2,3을 얻고 각 행렬의 영공간을 구해 고유벡터를 찾습니다.',
  formal:'선형연산자 T:V→V에 대해 0≠v∈V와 λ∈F가 Tv=λv를 만족하면 λ는 T의 고유값, v는 λ-고유벡터입니다. E_λ=ker(T−λI)는 λ의 고유공간입니다.',
  theorem:'서로 다른 고유값에 속하는 고유벡터들은 선형독립입니다.',
  theoremAssumptions:['T는 같은 벡터공간 V에서 V로 가는 선형연산자','v₁,…,v_m은 0이 아닌 고유벡터','대응하는 고유값 λ₁,…,λ_m은 서로 다름'],
  proofIdea:'최소 개수의 종속관계 ∑aᵢvᵢ=0을 가정합니다. T를 적용한 식에서 λ_m배 한 원래 식을 빼면 ∑_{i<m}aᵢ(λᵢ−λ_m)vᵢ=0이 되어 더 짧은 종속관계가 생깁니다. 최소성에 모순입니다.',
  counterexample:'고유값의 중복도만큼 항상 독립 고유벡터가 생기지는 않습니다. Jordan 블록 [[1,1],[0,1]]은 특성다항식에서 1이 두 번 나오지만 고유공간은 1차원이라 대각화되지 않습니다.',
  applications:['행렬 거듭제곱과 선형 점화식','미분방정식의 안정성','Markov chain의 정상분포','그래프 스펙트럼과 익스팬더','PCA와 양자역학'],
  sources:[{author:'Sheldon Axler',title:'Linear Algebra Done Right',locator:'3rd ed., §5A–5C',href:'https://linear.axler.net/'},{author:'Gilbert Strang',title:'MIT 18.06SC Linear Algebra',locator:'Unit III, Eigenvalues and Eigenvectors',href:'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/'}],
  usedIn:['대각화','spectral theorem','Jordan 형식','SVD'], next:['diagonalization','spectral-theorem','jordan-form','singular-value-decomposition'], related:['determinant','linear-transformation','spectral-gap'], depth:'encyclopedia'
};
