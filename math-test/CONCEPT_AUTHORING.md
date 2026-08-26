# 개념 모듈 작성 안내

이 사이트의 한 개념은 `assets/concepts/<id>.js` 한 파일을 단일 원본으로 사용합니다.
AI나 사람이 새 파일을 만든 뒤 아래 명령을 실행하면 `index.js`가 자동 생성됩니다.

```bash
npm run sync:concepts
npm run audit:concepts
```

`id`는 소문자 kebab-case로 쓰고, `target`은 실제 HTML의 존재하는 `id`를 가리켜야 합니다.
간단한 사전 항목은 기본 필드만 사용할 수 있지만, 핵심 개념은 `depth: 'encyclopedia'`와 아래 필드를 모두 작성합니다.

```js
export default {
  id: 'concept-id',
  title: '화면 제목',
  terms: ['대표 용어', 'English term'],
  summary: '한 문장 정의',
  target: 'university/page.html#section-id',
  prerequisites: ['known-concept-id'],
  why: '왜 필요해졌는가',
  intuition: '직관적 모형',
  beginner: '처음 보는 사람을 위한 설명',
  notation: ['기호: 뜻'],
  example: '정확한 예시',
  nonExample: '경계가 드러나는 비예시',
  calculation: '손으로 따라가는 계산',
  formal: '엄밀한 정의',
  theorem: '대표 정리',
  theoremAssumptions: ['정리에 필요한 가정'],
  proofIdea: '증명의 핵심 연결',
  counterexample: '가정을 제거했을 때의 반례',
  applications: ['구체적 응용'],
  sources: [{ author: '저자', title: '원서', locator: '장·절', href: 'https://...' }],
  usedIn: ['사람에게 보일 사용처'],
  next: ['next-concept-id'],
  related: ['related-concept-id'],
  depth: 'encyclopedia'
};
```

그다음 `assets/concept-catalog.js`의 해당 분야 `concepts` 배열과 본문의
`data-concept` 또는 `data-concept-module`에 ID를 연결합니다. 감사기는 누락된 분야,
존재하지 않는 관계·링크·HTML 앵커, 중복 용어와 불완전한 백과 필드를 차단합니다.
