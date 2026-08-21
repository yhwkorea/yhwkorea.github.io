(() => {
  const script = document.currentScript;
  const assetBase = new URL('.', script.src);
  const page = (path) => new URL(`../${path}`, assetBase).href;
  const entries = {
    '이항연산': ['두 원소를 입력받아 같은 집합의 원소 하나를 출력하는 함수입니다.', 'foundations/algebra.html#연산이란-무엇인가'],
    '군': ['결합법칙, 항등원, 역원을 갖는 하나의 이항연산 구조입니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
    '아벨군': ['연산의 순서를 바꿔도 결과가 같은 군입니다. 가환군이라고도 합니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
    '가환군': ['연산의 순서를 바꿔도 결과가 같은 군입니다. 아벨군이라고도 합니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
    '부분군': ['큰 군의 부분집합이 같은 연산으로 다시 군을 이루는 경우입니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
    '준동형': ['연산을 보존하는 함수입니다. 군에서는 f(ab)=f(a)f(b)를 만족합니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
    '커널': ['준동형이 항등원으로 보내는 원소들의 집합입니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
    '환': ['덧셈은 아벨군을 이루고, 결합적인 곱셈과 분배법칙을 갖는 구조입니다.', 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조'],
    '가환환': ['곱셈 순서를 바꿔도 ab=ba가 성립하는 환입니다.', 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조'],
    '단원': ['환에서 곱셈 역원을 갖는 원소입니다.', 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조'],
    '영인자': ['0이 아닌데 다른 0 아닌 원소와 곱해서 0이 되는 원소입니다.', 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조'],
    '아이디얼': ['덧셈 부분군이면서 환 전체 원소의 곱을 흡수하는 부분집합입니다.', 'foundations/algebra.html#아이디얼-몫환을-만들-수-있는-부분집합'],
    '주아이디얼': ['원소 하나의 모든 환 배수로 이루어진 아이디얼입니다.', 'foundations/algebra.html#아이디얼-몫환을-만들-수-있는-부분집합'],
    '몫환': ['아이디얼의 원소만큼 차이 나는 원소들을 같다고 보는 환입니다.', 'foundations/algebra.html#아이디얼-몫환을-만들-수-있는-부분집합'],
    '정역': ['1≠0이고 영인자가 없는 가환환입니다.', 'foundations/algebra.html#정역과-체'],
    '체': ['0이 아닌 모든 원소가 곱셈 역원을 갖는 가환환입니다.', 'foundations/algebra.html#정역과-체'],
    '유한체': ['원소 개수가 유한한 체입니다. SQIsign에서는 주로 Fp와 Fp²를 사용합니다.', 'isogeny/01-finite-fields.html#체란-무엇인가'],
    'Frobenius': ['특성 p의 체에서 x를 x^p로 보내는 체 준동형입니다.', 'isogeny/01-finite-fields.html#frobenius와-켤레'],
    '아핀평면': ['체 F에 대해 순서쌍 (x,y) 전체로 이루어진 F²입니다.', 'isogeny/02-elliptic-curves.html#아핀평면과-대수곡선'],
    '사영평면': ['0이 아닌 세 좌표를 공통 스칼라배까지 같게 보는 공간입니다.', 'isogeny/02-elliptic-curves.html#사영평면과-무한원점'],
    '대수곡선': ['두 변수 다항식 방정식의 해집합으로 주어지는 1차원 대수적 대상입니다.', 'isogeny/02-elliptic-curves.html#아핀평면과-대수곡선'],
    '특이점': ['곡선식과 모든 편미분이 동시에 0이 되는 점입니다.', 'isogeny/02-elliptic-curves.html#특이점과-매끄러움'],
    '타원곡선': ['지정된 유리점을 가진 매끄러운 사영 genus 1 곡선입니다.', 'isogeny/02-elliptic-curves.html#특이점과-매끄러움'],
    'torsion': ['어떤 양의 정수 n에 대해 [n]P=O가 되는 유한 차수의 점입니다.', 'isogeny/02-elliptic-curves.html#torsion-점'],
    'isogeny': ['항등원을 보존하는 타원곡선 사이의 비상수 대수적 사상입니다.', 'isogeny/03-isogenies.html#isogeny의-정의'],
    'Isogeny': ['항등원을 보존하는 타원곡선 사이의 비상수 대수적 사상입니다.', 'isogeny/03-isogenies.html#isogeny의-정의'],
    'endomorphism': ['곡선에서 자기 자신으로 가는 isogeny입니다.', 'isogeny/03-isogenies.html#isogeny의-정의'],
    '쌍대 isogeny': ['합성하면 차수배 사상이 되는 반대 방향의 isogeny입니다.', 'isogeny/03-isogenies.html#쌍대-isogeny']
  };

  const pop = document.createElement('aside');
  pop.className = 'glossary-popover';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-live', 'polite');
  pop.hidden = true;
  document.body.append(pop);

  const hint = document.createElement('div');
  hint.className = 'selection-hint';
  hint.textContent = '용어를 드래그하면 정의를 볼 수 있습니다';
  document.body.append(hint);

  const clean = (value) => value.replace(/\s+/g, ' ').trim().replace(/^[“”"'‘’()[\]{}]+|[“”"'‘’()[\]{}.,:;!?]+$/g, '');
  const lookup = (raw) => {
    const word = clean(raw);
    if (entries[word]) return [word, entries[word]];
    for (const suffix of ['에서는','으로','에서','에게','은','는','이','가','을','를','의','과','와']) {
      if (word.endsWith(suffix) && entries[word.slice(0, -suffix.length)]) return [word.slice(0, -suffix.length), entries[word.slice(0, -suffix.length)]];
    }
    return null;
  };
  const hide = () => { pop.hidden = true; };
  const show = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return hide();
    const raw = selection.toString();
    if (!raw || raw.length > 32) return hide();
    const found = lookup(raw);
    if (!found) return hide();
    const [term, [definition, target]] = found;
    pop.replaceChildren();
    const title = document.createElement('strong'); title.textContent = term;
    const text = document.createElement('p'); text.textContent = definition;
    const link = document.createElement('a'); link.href = page(target); link.textContent = '설명에서 자세히 보기 →';
    link.addEventListener('click', () => {
      const destination = new URL(link.href);
      sessionStorage.setItem('glossary-target', destination.hash);
      sessionStorage.setItem('glossary-term', term);
    });
    pop.append(title, text, link);
    pop.hidden = false;
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 24);
    const left = Math.max(12, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12));
    const top = Math.min(window.innerHeight - pop.offsetHeight - 12, rect.bottom + 10);
    pop.style.width = `${width}px`; pop.style.left = `${left}px`; pop.style.top = `${Math.max(12, top)}px`;
  };
  document.addEventListener('mouseup', () => setTimeout(show, 0));
  document.addEventListener('touchend', () => setTimeout(show, 120));
  document.addEventListener('mousedown', (e) => { if (!pop.contains(e.target)) hide(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
})();
