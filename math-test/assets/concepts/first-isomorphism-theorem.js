export default {
  id:'first-isomorphism-theorem', title:'제1동형정리', terms:['제1동형정리','first isomorphism theorem'], summary:'준동형이 같은 값으로 보내는 원소들을 묶으면 남은 구조가 상과 정확히 같아진다는 정리입니다.',
  target:'foundations/algebra.html#잉여류와-동형정리', prerequisites:['group-homomorphism','kernel','quotient-group'],
  why:'함수가 잃어버리는 정보인 커널과 실제 출력으로 남기는 구조인 상을 하나의 등식 G/ker f≅im f로 연결합니다.',
  intuition:'흐릿한 카메라가 구분하지 못하는 입력들을 한 묶음으로 취급하면, 그 묶음들의 세계와 실제 사진에 나타나는 출력들의 세계가 일대일로 맞아떨어집니다.',
  beginner:'정수를 3으로 나눈 나머지만 보는 함수는 0과 3과 6을 구분하지 못합니다. 3의 배수만큼 차이 나는 정수들을 묶으면 정확히 [0],[1],[2] 세 출력만 남습니다.',
  notation:['ker f={g∈G:f(g)=e}: 커널','im f={f(g):g∈G}: 상','G/ker f: 커널 잉여류의 몫군','≅: 구조를 보존하는 일대일 대응'],
  example:'f:Z→Z₆, f(n)=[n]에서 ker f=6Z이고 im f=Z₆입니다. 따라서 Z/6Z≅Z₆입니다.',
  nonExample:'임의의 함수에는 적용할 수 없습니다. f(ab)=f(a)f(b)를 만족하지 않으면 커널이 정규부분군일 보장도, 잉여류 위 함수가 잘 정의될 보장도 없습니다.',
  calculation:'유도 함수 φ:G/ker f→im f를 φ(g ker f)=f(g)로 둡니다. g ker f=h ker f이면 h⁻¹g∈ker f이므로 f(g)=f(h), 따라서 대표원을 바꿔도 출력이 같습니다.',
  formal:'군 준동형 f:G→H에 대해 함수 φ:G/ker f→im f, φ(g ker f)=f(g)는 잘 정의된 군 동형사상입니다.',
  theorem:'제1동형정리: G/ker f≅im f. 특히 f가 전사이면 G/ker f≅H이고, 단사이면 ker f={e}입니다.',
  theoremAssumptions:['G,H는 군','f:G→H는 군 준동형','몫군은 정규부분군 ker f에 대해 구성'],
  proofIdea:'커널의 같은 잉여류에 속하는 것과 f값이 같은 것이 동치임을 보여 φ가 잘 정의되고 단사임을 얻습니다. 상을 공역으로 잡았으므로 전사이며, 준동형 성질은 f에서 그대로 옵니다.',
  counterexample:'f:Z→Z, f(n)=n²은 일반 함수지만 덧셈 준동형이 아닙니다. f(1+1)=4≠2=f(1)+f(1)이므로 “커널로 나눈 구조가 상과 같다”는 군 정리를 적용할 수 없습니다.',
  applications:['선형대수의 rank-nullity 원리','환과 가군의 동형정리','몫구조의 계산','아이소제니의 커널과 상'],
  sources:[
    {author:'Thomas W. Judson',title:'Abstract Algebra: Theory and Applications',locator:'Chapter 11, Fundamental Homomorphism Theorem',href:'https://abstract.ups.edu/'},
    {author:'MIT OpenCourseWare',title:'18.701 Algebra I',locator:'Homomorphisms and quotient groups',href:'https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/'}
  ],
  usedIn:['몫군 계산','환 동형정리','rank-nullity','아이소제니'], next:['quotient-ring','linear-transformation','isogeny'], related:['kernel','group-homomorphism','quotient-group'], depth:'encyclopedia'
};
