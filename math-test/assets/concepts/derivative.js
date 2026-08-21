export default {
  id: 'derivative', title: '미분', terms: ['미분', '도함수'],
  summary: '입력이 아주 조금 변할 때 출력이 얼마나 빠르게 변하는지를 나타내는 방법입니다.',
  target: 'foundations/calculus.html#미분은-무엇을-재나', prerequisites: ['function'],
  why: '그래프의 한 점에서 기울기와 변화 방향을 알아내기 위해 사용합니다.',
  example: 'f(x)=x²이면 f\'(x)=2x이므로 x=3에서 순간 기울기는 6입니다.',
  formal: "f'(a)=lim_{h→0}(f(a+h)-f(a))/h가 존재할 때 이를 a에서의 미분계수라 합니다.",
  usedIn: ['접선', '최댓값·최솟값', '편미분', '곡선의 특이점 판정']
};
