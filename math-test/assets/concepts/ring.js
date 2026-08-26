export default {
  id:'ring', title:'환', terms:['환'], summary:'덧셈과 곱셈이 함께 있고 분배법칙으로 연결되는 대수 구조입니다.',
  target:'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조', prerequisites:['set','group','binary-operation'],
  why:'정수·다항식·행렬·함수처럼 두 연산을 함께 쓰지만 나눗셈은 항상 가능하지 않은 계산을 공통 언어로 다룹니다.',
  intuition:'환은 덧셈은 언제나 되돌릴 수 있지만 곱셈은 그렇지 않을 수 있는 계산 세계입니다. 그래서 정수는 환이지만 체는 아닙니다.',
  beginner:'정수에서는 더하기·빼기·곱하기는 언제나 정수 안에서 가능하지만 1÷2는 정수가 아닙니다. 환은 바로 이 정도의 연산을 보장합니다.',
  notation:['(R,+,·): 환과 두 연산','0: 덧셈 항등원','1: 곱셈 항등원(이 가이드의 관례)','R[x]: R 계수 다항식환'],
  example:'2×2 실수행렬 전체 M₂(R)는 환입니다. 행렬 덧셈과 곱셈이 가능하지만 AB와 BA는 일반적으로 다릅니다.',
  nonExample:'양의 정수 집합은 보통 덧셈 역원을 포함하지 않으므로 덧셈 아벨군이 아니며 환도 아닙니다.',
  calculation:'A=[[0,1],[0,0]], B=[[0,0],[1,0]]이면 AB=[[1,0],[0,0]], BA=[[0,0],[0,1]]입니다. 둘이 달라 환의 곱셈이 가환일 필요가 없음을 보여 줍니다.',
  formal:'(R,+)가 아벨군이고 곱셈이 결합적이며 모든 a,b,c∈R에 대해 a(b+c)=ab+ac와 (a+b)c=ac+bc를 만족하면 R은 환입니다. 여기서는 곱셈 항등원 1도 요구합니다.',
  theorem:'환 R에서 0a=a0=0이고 (−a)b=−(ab)=a(−b)가 성립합니다.',
  theoremAssumptions:['R은 환','a,b는 R의 임의의 원소'],
  proofIdea:'0a=(0+0)a=0a+0a에서 덧셈 역원을 더하면 0a=0입니다. (−a)b+ab=(−a+a)b=0b=0이므로 (−a)b는 ab의 덧셈 역원입니다.',
  counterexample:'곱셈 교환법칙은 환 공리가 아닙니다. 행렬환과 초특이 타원곡선의 엔도모피즘환에서는 곱의 순서가 결과를 바꿉니다.',
  applications:['정수론과 합동식','다항식과 대수방정식','행렬과 선형변환','엔도모피즘환과 사원수대수'],
  sources:[
    {author:'Thomas W. Judson',title:'Abstract Algebra: Theory and Applications',locator:'Chapter 16, Rings',href:'https://abstract.ups.edu/'},
    {author:'MIT OpenCourseWare',title:'18.703 Modern Algebra',locator:'Ring theory units',href:'https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/'}
  ],
  usedIn:['아이디얼','몫환','다항식환','체','엔도모피즘환'], next:['commutative-ring','ideal','polynomial-ring','field'], related:['group','zero-divisor','unit'], depth:'encyclopedia'
};
