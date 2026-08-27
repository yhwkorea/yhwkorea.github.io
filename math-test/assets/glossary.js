const glossaryScript = document.currentScript;
import('./journey-ui.js?v=20260827-50').catch((error) => console.error('학습 지도 초기화 실패', error));
import('./sidebar-tools.js?v=20260827-50').catch((error) => console.error('왼쪽 탐색 도구 초기화 실패', error));
Promise.all([import('./concepts/index.js?v=20260827-50'), import('./concept-catalog.js?v=20260827-50')]).then(([{ conceptsById, conceptsByTerm }, { areas }]) => {
const assetBase = new URL('.', glossaryScript.src);
const page = (path) => new URL(`../${path}`, assetBase).href;
const areaByConcept = new Map();
areas.forEach((area) => area.concepts.forEach((id) => {
  if (!areaByConcept.has(id)) areaByConcept.set(id, area);
}));
const dependentsByConcept = new Map([...conceptsById.keys()].map((id) => [id, []]));
conceptsById.forEach((concept) => concept.prerequisites.forEach((id) => {
  dependentsByConcept.get(id)?.push(concept.id);
}));
const decorateArea = (element, concept) => {
  const targetPage = concept.target.split('#')[0];
  const area = areas.find((candidate) => candidate.href === targetPage) || areaByConcept.get(concept.id);
  if (!area) return null;
  element.dataset.area = area.id;
  return area;
};

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
}));

const pop = document.createElement('aside');
pop.className = 'glossary-popover';
pop.id = 'glossary-popover';
pop.setAttribute('role', 'dialog');
pop.setAttribute('aria-modal', 'false');
pop.setAttribute('aria-live', 'polite');
pop.hidden = true;
document.body.append(pop);
let activeTrigger = null;
let moduleInstance = 0;

const hint = document.createElement('div');
hint.className = 'selection-hint';
hint.textContent = '용어를 누르거나 드래그하면 설명을 볼 수 있습니다';
document.body.append(hint);

const clean = (value) => value.replace(/\s+/g, ' ').trim().replace(/^[“”"'‘’()[\]{}]+|[“”"'‘’()[\]{}.,:;!?]+$/g, '');
const searchableTerms = [...conceptsById.values()].flatMap((concept) => concept.terms.map((term) => ({
  concept, term, normalized: term.normalize('NFKC').toLocaleLowerCase('ko')
}))).sort((a, b) => b.term.length - a.term.length);
const lookup = (raw) => {
  const word = clean(raw);
  const candidates = [word];
  for (const suffix of ['에서는','으로','에서','에게','은','는','이','가','을','를','의','과','와']) {
    if (word.endsWith(suffix)) candidates.push(word.slice(0, -suffix.length));
  }
  for (const term of candidates) {
    const concept = conceptsByTerm.get(term.normalize('NFKC').toLocaleLowerCase('ko'));
    if (concept) return { term, concept };
    const legacy = legacyEntries.get(term);
    if (legacy) return { term, legacy };
  }
  return null;
};

function appendConceptText(host, value, ownerId = '') {
  host.replaceChildren();
  const normalized = value.normalize('NFKC').toLocaleLowerCase('ko');
  let cursor = 0;
  while (cursor < value.length) {
    let best = null;
    for (const candidate of searchableTerms) {
      if (candidate.concept.id === ownerId) continue;
      const index = normalized.indexOf(candidate.normalized, cursor);
      if (index < 0) continue;
      const latin = /^[a-z0-9]/i.test(candidate.term);
      if (latin && ((index > 0 && /[a-z0-9]/i.test(normalized[index - 1])) || /[a-z0-9]/i.test(normalized[index + candidate.normalized.length] || ''))) continue;
      if (candidate.normalized.length === 1 && index > 0 && /[가-힣]/.test(normalized[index - 1])) continue;
      if (!best || index < best.index || (index === best.index && candidate.term.length > best.candidate.term.length)) best = { index, candidate };
    }
    if (!best) { host.append(value.slice(cursor)); break; }
    if (best.index > cursor) host.append(value.slice(cursor, best.index));
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'inline-concept-link';
    button.textContent = value.slice(best.index, best.index + best.candidate.term.length);
    button.setAttribute('aria-label', `${best.candidate.concept.title} 정의 보기`);
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const close = renderPopover({ term: best.candidate.concept.title, concept: best.candidate.concept });
      placePopover(button.getBoundingClientRect(), close);
    });
    host.append(button);
    cursor = best.index + best.candidate.term.length;
  }
}

function renderConceptValue(host, concept, field) {
  host.replaceChildren();
  const value = concept[field];
  if (field === 'sources') {
    const list = document.createElement('ul');
    list.className = 'concept-source-list';
    value.forEach((source) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = source.href;
      link.textContent = `${source.author ? `${source.author}, ` : ''}${source.title}`;
      link.target = '_blank';
      link.rel = 'noreferrer';
      item.append(link);
      if (source.locator) item.append(` · ${source.locator}`);
      list.append(item);
    });
    host.append(list);
    return;
  }
  if (Array.isArray(value)) {
    const list = document.createElement('ul');
    value.forEach((entry) => {
      const item = document.createElement('li');
      appendConceptText(item, entry, concept.id);
      list.append(item);
    });
    host.append(list);
    return;
  }
  appendConceptText(host, value, concept.id);
}

function rememberDestination(link, term) {
  link.addEventListener('click', () => {
    const destination = new URL(link.href);
    sessionStorage.setItem('glossary-target', destination.hash);
    sessionStorage.setItem('glossary-term', term);
    window.PQCJourney?.descend({
      nodeId: link.closest('[data-concept]')?.dataset.concept || term,
      label: term,
      href: link.href,
      sourceHref: location.href,
      reason: `${document.title.replace(/\s*[—-].*$/, '')}에서 “${term}”이 낯설어서 내려왔습니다.`
    });
  });
}

function conceptLink(id) {
  const destination = conceptsById.get(id);
  if (!destination) return null;
  const link = document.createElement('a');
  link.href = page(destination.target);
  link.textContent = destination.title;
  rememberDestination(link, destination.title);
  return link;
}

function appendConceptLinks(host, ids) {
  ids.forEach((id, index) => {
    const link = conceptLink(id);
    if (!link) return;
    if (index) host.append(' · ');
    host.append(link);
  });
}

function conceptNeighborhood(concept) {
  const details = document.createElement('details');
  details.className = 'concept-neighborhood';
  const summary = document.createElement('summary');
  summary.textContent = '이 개념의 연결 지도';
  const map = document.createElement('div');
  map.className = 'concept-neighborhood-map';
  const groups = [
    ['먼저 알아둘 것', concept.prerequisites],
    ['함께 보면 좋은 것', concept.related || []],
    ['이어서 볼 것', concept.next || []],
    ['이 개념을 사용하는 항목', dependentsByConcept.get(concept.id) || []]
  ];
  groups.forEach(([label, ids]) => {
    if (!ids.length) return;
    const row = document.createElement('p');
    const heading = document.createElement('b');
    heading.textContent = label;
    row.append(heading);
    appendConceptLinks(row, [...new Set(ids)]);
    map.append(row);
  });
  details.append(summary, map);
  return details;
}

function renderPopover(found) {
  pop.replaceChildren();
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'glossary-close';
  close.setAttribute('aria-label', '개념 설명 닫기');
  close.textContent = '×';
  if (found.concept) {
    const area = decorateArea(pop, found.concept);
    if (area) {
      const badge = document.createElement('span');
      badge.className = 'concept-area-badge';
      badge.textContent = area.title;
      pop.append(badge);
    }
  } else {
    delete pop.dataset.area;
  }
  const title = document.createElement('strong');
  title.id = 'glossary-popover-title';
  title.textContent = found.term;
  pop.setAttribute('aria-labelledby', title.id);
  const text = document.createElement('p');
  const target = found.concept ? found.concept.target : found.legacy[1];
  if (found.concept) appendConceptText(text, found.concept.summary, found.concept.id);
  else text.textContent = found.legacy[0];
  const link = document.createElement('a');
  link.href = page(target);
  link.textContent = '설명에서 자세히 보기 →';
  rememberDestination(link, found.term);
  pop.append(close, title, text);
  if (found.concept) {
    const actions = document.createElement('div');
    actions.className = 'glossary-actions';
    for (const [label, field] of [['예시', 'example'], ['왜?', 'why'], ['엄밀히', 'formal']]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => { appendConceptText(text, found.concept[field], found.concept.id); });
      actions.append(button);
    }
    actions.append(link);
    pop.append(actions);
  } else {
    pop.append(link);
  }
  close.addEventListener('click', () => hide({ restoreFocus: true }));
  return close;
}

function placePopover(rect, focusTarget) {
  pop.hidden = false;
  const width = Math.min(340, window.innerWidth - 24);
  const left = Math.max(12, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12));
  const top = Math.min(window.innerHeight - pop.offsetHeight - 12, rect.bottom + 10);
  pop.style.width = `${width}px`;
  pop.style.left = `${left}px`;
  pop.style.top = `${Math.max(12, top)}px`;
  focusTarget?.focus({ preventScroll: true });
}

function showSelection() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;
  const raw = selection.toString();
  if (!raw || raw.length > 32) return;
  const found = lookup(raw);
  if (!found) return;
  activeTrigger = null;
  const close = renderPopover(found);
  placePopover(selection.getRangeAt(0).getBoundingClientRect(), close);
}

document.querySelectorAll('[data-concept]').forEach((trigger) => {
  const concept = conceptsById.get(trigger.dataset.concept);
  if (!concept) return;
  trigger.classList.add('concept-term');
  const area = decorateArea(trigger, concept);
  trigger.tabIndex = 0;
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-controls', pop.id);
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-label', `${concept.title}${area ? `, ${area.title} 분야` : ''} 정의 보기`);
  const show = () => {
    if (activeTrigger && activeTrigger !== trigger) activeTrigger.setAttribute('aria-expanded', 'false');
    activeTrigger = trigger;
    trigger.setAttribute('aria-expanded', 'true');
    const close = renderPopover({ term: concept.title, concept });
    placePopover(trigger.getBoundingClientRect(), close);
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
  const area = decorateArea(host, concept);
  if (area) {
    const badge = document.createElement('span');
    badge.className = 'concept-area-badge';
    badge.textContent = `${area.title} 개념`;
    host.append(badge);
  }
  const summary = document.createElement('p');
  summary.className = 'concept-module-summary';
  appendConceptText(summary, concept.summary, concept.id);
  const tabs = document.createElement('div');
  tabs.className = 'concept-module-tabs';
  const panel = document.createElement('div');
  panel.className = 'concept-module-panel';
  panel.id = `concept-${concept.id}-detail-${++moduleInstance}`;
  const availableModes = [
    ['why', '왜 등장했나'], ['intuition', '직관'], ['beginner', '먼저 읽기'],
    ['notation', '기호'], ['example', '예시'], ['nonExample', '비예시'],
    ['calculation', '계산 과정'], ['formal', '엄밀한 정의'], ['theorem', '핵심 정리'], ['theoremAssumptions', '정리의 가정'],
    ['proofIdea', '증명'], ['counterexample', '반례'], ['applications', '어디에 쓰이나'],
    ['sources', '원서·출처']
  ];
  const modes = availableModes.filter(([field]) => concept[field] != null);
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
      if (closing) panel.replaceChildren();
      else renderConceptValue(panel, concept, field);
    });
    tabs.append(button);
    return button;
  });
  panel.hidden = true;
  const prerequisites = document.createElement('p');
  prerequisites.className = 'concept-prerequisites';
  prerequisites.append('낯설면 먼저: ');
  concept.prerequisites.forEach((id, index) => {
    const link = conceptLink(id);
    if (!link) return;
    if (index) prerequisites.append(' · ');
    prerequisites.append(link);
  });
  const next = document.createElement('p');
  next.className = 'concept-prerequisites concept-next';
  if (concept.next?.length) {
    next.append('이어서 보기: ');
    concept.next.forEach((id, index) => {
      const link = conceptLink(id);
      if (!link) return;
      if (index) next.append(' · ');
      next.append(link);
    });
  }
  host.append(summary, tabs, panel, prerequisites);
  if (concept.next?.length) host.append(next);
  host.append(conceptNeighborhood(concept));
});

function hide({ restoreFocus = false } = {}) {
  if (pop.hidden) return;
  pop.hidden = true;
  if (activeTrigger) {
    activeTrigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) activeTrigger.focus({ preventScroll: true });
  }
  activeTrigger = null;
}
document.addEventListener('mouseup', () => setTimeout(showSelection, 0));
document.addEventListener('touchend', () => setTimeout(showSelection, 120));
document.addEventListener('mousedown', (event) => { if (!pop.contains(event.target) && !event.target.closest('[data-concept]')) hide(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') hide({ restoreFocus: true }); });
}).catch((error) => console.error('Concept modules failed to load', error));
