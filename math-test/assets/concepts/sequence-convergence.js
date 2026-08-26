export default {
  id:'sequence-convergence', title:'수열의 수렴', terms:['수열의 수렴','수렴수열','sequence convergence'], summary:'항 번호가 충분히 커지면 이후 모든 항이 한 값에 원하는 만큼 가까워지는 성질입니다.',
  target:'university/03-real-analysis.html#sequences', prerequisites:['real-number','limit'],
  why:'“끝없이 가까워진다”는 말을 임의의 허용오차 ε와 그 오차를 만족시키기 시작하는 시점 N으로 엄밀하게 만듭니다.',
  intuition:'목표 L 주위에 아무리 좁은 띠를 그려도, 수열의 꼬리 전체가 언젠가 그 띠 안에 들어가 다시 나오지 않으면 L로 수렴합니다.',
  beginner:'1, 1/2, 1/3, …은 0이 되지는 않지만 0.01보다 작게, 0.0001보다 작게 만드는 항 번호를 언제나 찾을 수 있으므로 0으로 수렴합니다.',
  notation:['(aₙ): 수열','aₙ→L: aₙ이 L로 수렴','ε>0: 요구하는 출력 오차','N: 이후 모든 항이 오차 안에 드는 시작 번호'],
  example:'aₙ=1/n에 대해 ε>0가 주어지면 N>1/ε인 자연수를 고릅니다. n≥N이면 |aₙ−0|=1/n≤1/N<ε입니다.',
  nonExample:'aₙ=(−1)ⁿ은 −1과 1 사이를 계속 오가므로 어느 한 값 주위의 작은 띠 안에 머물지 않습니다.',
  calculation:'aₙ=(3n+1)/(n+2)의 극한은 3입니다. |aₙ−3|=5/(n+2)<ε가 되려면 n>5/ε−2이면 충분합니다.',
  formal:'aₙ→L이란 모든 ε>0에 대해 어떤 N∈N이 존재하여 모든 n≥N에 |aₙ−L|<ε가 성립하는 것입니다.',
  theorem:'수렴수열의 극한은 유일하며 모든 수렴수열은 유계입니다.',
  theoremAssumptions:['(aₙ)은 실수 수열','aₙ이 어떤 실수 극한으로 수렴'],
  proofIdea:'서로 다른 두 극한 L,M을 가정하고 ε=|L−M|/3을 쓰면 큰 n에서 aₙ이 두 개의 서로 겹치지 않는 근방에 동시에 있어야 해 모순입니다. 유계성은 꼬리를 극한 근처에 넣고 앞의 유한 개 항의 최댓값을 함께 잡습니다.',
  counterexample:'항 사이 차이 aₙ₊₁−aₙ→0만으로 수렴하지 않습니다. 조화부분합 aₙ=1+1/2+⋯+1/n은 연속한 차이가 1/(n+1)→0이지만 무한대로 발산합니다.',
  applications:['무한급수의 정의','함수의 연속성과 극한','수치 알고리즘의 오차 분석','확률론의 극한정리'],
  sources:[
    {author:'Jiří Lebl',title:'Basic Analysis I',locator:'Chapter 2, Sequences and Series',href:'https://www.jirka.org/ra/'},
    {author:'MIT OpenCourseWare',title:'18.100A Real Analysis',locator:'Sequences and convergence',href:'https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/'}
  ],
  usedIn:['Cauchy 수열','급수','연속','함수열'], next:['cauchy-sequence','infinite-series','continuity','uniform-convergence'], related:['limit','completeness-real','real-number'], depth:'encyclopedia'
};
