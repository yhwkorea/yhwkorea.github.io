const glossaryScript = document.currentScript;
import('./concepts/index.js').then(({ conceptsById, conceptsByTerm }) => {
const assetBase = new URL('.', glossaryScript.src);
const page = (path) => new URL(`../${path}`, assetBase).href;

const guideHome = document.querySelector('.sidebar nav ul li');
if (guideHome && !document.querySelector('.sidebar a[href*="cryptography.html"]')) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.href = page('foundations/cryptography.html');
  link.textContent = '암호학과 전자서명';
  if (location.pathname.endsWith('/foundations/cryptography.html')) link.className = 'active';
  item.append(link);
  guideHome.after(item);
}

// 아직 모듈로 옮기지 않은 전문 용어는 이 목록에서 계속 지원한다.
// 기초 개념부터 concepts/의 독립 파일로 순차 이관한다.
const legacyEntries = new Map(Object.entries({
  '원소': ['집합을 구성하는 각각의 대상입니다. a∈A는 a가 A의 원소라는 뜻입니다.', 'foundations/notation.html#집합과-원소'],
  '부분집합': ['A의 모든 원소가 B에도 들어 있을 때 A는 B의 부분집합입니다.', 'foundations/notation.html#부분집합과-집합-연산'],
  '함수': ['정의역의 각 원소에 공역의 원소를 정확히 하나씩 대응시키는 규칙입니다.', 'foundations/notation.html#함수와-화살표'],
  '단사': ['서로 다른 두 입력을 같은 출력으로 보내지 않는 함수입니다.', 'foundations/notation.html#함수와-화살표'],
  '전사': ['공역의 모든 원소가 적어도 한 입력의 출력으로 나타나는 함수입니다.', 'foundations/notation.html#함수와-화살표'],
  '이항연산': ['두 원소를 입력받아 같은 집합의 원소 하나를 출력하는 함수입니다.', 'foundations/algebra.html#연산이란-무엇인가'],
  '아벨군': ['연산의 순서를 바꿔도 결과가 같은 군입니다. 가환군이라고도 합니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
  '가환군': ['연산의 순서를 바꿔도 결과가 같은 군입니다. 아벨군이라고도 합니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
  '부분군': ['큰 군의 부분집합이 같은 연산으로 다시 군을 이루는 경우입니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
  '준동형': ['연산을 보존하는 함수입니다. 군에서는 f(ab)=f(a)f(b)를 만족합니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
  '커널': ['준동형이 항등원으로 보내는 원소들의 집합입니다.', 'foundations/algebra.html#군-연산-하나가-있는-구조'],
  '단원': ['환에서 곱셈 역원을 갖는 원소입니다.', 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조'],
  '영인자': ['0이 아닌데 다른 0 아닌 원소와 곱해서 0이 되는 원소입니다.', 'foundations/algebra.html#환-덧셈과-곱셈이-함께-있는-구조'],
  '주아이디얼': ['원소 하나의 모든 환 배수로 이루어진 아이디얼입니다.', 'foundations/algebra.html#아이디얼-몫환을-만들-수-있는-부분집합'],
  '정역': ['1≠0이고 영인자가 없는 가환환입니다.', 'foundations/algebra.html#정역과-체'],
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
}));

const pop = document.createElement('aside');
pop.className = 'glossary-popover';
pop.setAttribute('role', 'dialog');
pop.setAttribute('aria-live', 'polite');
pop.hidden = true;
document.body.append(pop);

const hint = document.createElement('div');
hint.className = 'selection-hint';
hint.textContent = '용어를 누르거나 드래그하면 설명을 볼 수 있습니다';
document.body.append(hint);

const clean = (value) => value.replace(/\s+/g, ' ').trim().replace(/^[“”"'‘’()[\]{}]+|[“”"'‘’()[\]{}.,:;!?]+$/g, '');
const lookup = (raw) => {
  const word = clean(raw);
  const candidates = [word];
  for (const suffix of ['에서는','으로','에서','에게','은','는','이','가','을','를','의','과','와']) {
    if (word.endsWith(suffix)) candidates.push(word.slice(0, -suffix.length));
  }
  for (const term of candidates) {
    const concept = conceptsByTerm.get(term);
    if (concept) return { term, concept };
    const legacy = legacyEntries.get(term);
    if (legacy) return { term, legacy };
  }
  return null;
};

function rememberDestination(link, term) {
  link.addEventListener('click', () => {
    const destination = new URL(link.href);
    sessionStorage.setItem('glossary-target', destination.hash);
    sessionStorage.setItem('glossary-term', term);
  });
}

function renderPopover(found) {
  pop.replaceChildren();
  const title = document.createElement('strong');
  title.textContent = found.term;
  const text = document.createElement('p');
  const target = found.concept ? found.concept.target : found.legacy[1];
  text.textContent = found.concept ? found.concept.summary : found.legacy[0];
  const link = document.createElement('a');
  link.href = page(target);
  link.textContent = '설명에서 자세히 보기 →';
  rememberDestination(link, found.term);
  pop.append(title, text);
  if (found.concept) {
    const actions = document.createElement('div');
    actions.className = 'glossary-actions';
    for (const [label, field] of [['예시', 'example'], ['왜?', 'why'], ['엄밀히', 'formal']]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => { text.textContent = found.concept[field]; });
      actions.append(button);
    }
    actions.append(link);
    pop.append(actions);
  } else {
    pop.append(link);
  }
}

function placePopover(rect) {
  pop.hidden = false;
  const width = Math.min(340, window.innerWidth - 24);
  const left = Math.max(12, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12));
  const top = Math.min(window.innerHeight - pop.offsetHeight - 12, rect.bottom + 10);
  pop.style.width = `${width}px`;
  pop.style.left = `${left}px`;
  pop.style.top = `${Math.max(12, top)}px`;
}

function showSelection() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;
  const raw = selection.toString();
  if (!raw || raw.length > 32) return;
  const found = lookup(raw);
  if (!found) return;
  renderPopover(found);
  placePopover(selection.getRangeAt(0).getBoundingClientRect());
}

document.querySelectorAll('[data-concept]').forEach((trigger) => {
  const concept = conceptsById.get(trigger.dataset.concept);
  if (!concept) return;
  trigger.classList.add('concept-term');
  trigger.tabIndex = 0;
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-label', `${concept.title} 정의 보기`);
  const show = () => {
    renderPopover({ term: concept.title, concept });
    placePopover(trigger.getBoundingClientRect());
  };
  trigger.addEventListener('click', show);
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); show(); }
  });
});

document.querySelectorAll('[data-concept-module]').forEach((host) => {
  const concept = conceptsById.get(host.dataset.conceptModule);
  if (!concept) return;
  host.classList.add('concept-module');
  const summary = document.createElement('p');
  summary.className = 'concept-module-summary';
  summary.textContent = concept.summary;
  const tabs = document.createElement('div');
  tabs.className = 'concept-module-tabs';
  const panel = document.createElement('div');
  panel.className = 'concept-module-panel';
  panel.id = `concept-${concept.id}-detail`;
  const modes = [['example', '계산 예시'], ['why', '왜 필요한가?'], ['formal', '엄밀한 정의']];
  const buttons = modes.map(([field, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', panel.id);
    button.textContent = label;
    button.addEventListener('click', () => {
      const closing = button.getAttribute('aria-expanded') === 'true';
      buttons.forEach((item) => item.setAttribute('aria-expanded', 'false'));
      button.setAttribute('aria-expanded', String(!closing));
      panel.hidden = closing;
      panel.textContent = closing ? '' : concept[field];
    });
    tabs.append(button);
    return button;
  });
  panel.hidden = true;
  const prerequisites = document.createElement('p');
  prerequisites.className = 'concept-prerequisites';
  prerequisites.append('낯설면 먼저: ');
  concept.prerequisites.forEach((id, index) => {
    const prerequisite = conceptsById.get(id);
    if (!prerequisite) return;
    if (index) prerequisites.append(' · ');
    const link = document.createElement('a');
    link.href = page(prerequisite.target);
    link.textContent = prerequisite.title;
    rememberDestination(link, prerequisite.title);
    prerequisites.append(link);
  });
  host.append(summary, tabs, panel, prerequisites);
});

const hide = () => { pop.hidden = true; };
document.addEventListener('mouseup', () => setTimeout(showSelection, 0));
document.addEventListener('touchend', () => setTimeout(showSelection, 120));
document.addEventListener('mousedown', (event) => { if (!pop.contains(event.target) && !event.target.closest('[data-concept]')) hide(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') hide(); });
}).catch((error) => console.error('Concept modules failed to load', error));
