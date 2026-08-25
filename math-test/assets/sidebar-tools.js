import { concepts } from './concepts/index.js';
import { areaForPath } from './site-map.js';
import { journeys } from './site-map.js';
import { getJourney, subscribe } from './journey-store.js';

const sidebar = document.querySelector('.sidebar');
if (sidebar && !sidebar.dataset.utilityReady) {
  sidebar.dataset.utilityReady = 'true';
  const nav = sidebar.querySelector('nav');
  const root = (path = '') => new URL(`../${path}`, import.meta.url).href;
  const currentArea = areaForPath(location.pathname);
  const normalize = (value) => value.normalize('NFKC').toLocaleLowerCase('ko').replace(/\s+/g, ' ').trim();
  const searchable = concepts.map((concept) => ({
    concept,
    text: normalize([concept.title, ...concept.terms, concept.summary, concept.why, concept.example, ...concept.usedIn].join(' '))
  }));

  nav.innerHTML = `
    <a class="sidebar-home" href="${root('index.html')}">학습 홈</a>
    <form class="sidebar-search" role="search">
      <label for="sidebar-concept-search">개념 검색</label>
      <div><input id="sidebar-concept-search" type="search" placeholder="용어·기호·질문" autocomplete="off" aria-controls="sidebar-search-results" aria-expanded="false"><button type="submit" aria-label="검색">⌕</button></div>
      <div id="sidebar-search-results" class="sidebar-search-results" hidden></div>
    </form>
    <section class="sidebar-location" aria-labelledby="sidebar-location-title">
      <h5 id="sidebar-location-title">현재 위치</h5>
      <strong>${currentArea?.label || '학습 홈'}</strong>
      <small>${currentArea?.children.slice(0, 4).join(' · ') || '분야를 검색하거나 지도에서 고르세요.'}</small>
      <button type="button" data-open-atlas>전체 지도 열기</button>
    </section>
    <section class="sidebar-journey" aria-labelledby="sidebar-journey-title"></section>
    <details class="sidebar-references">
      <summary>답안·참고 자료</summary>
      <a href="${root('lattice/lattice-answers.html')}">Lattice 답안 (1–9)</a>
      <a href="${root('algebra/algebra-answers.html')}">Algebra 답안 (1–16)</a>
      <a href="${root('probability/probability-answers.html')}">Probability 답안 (1–10)</a>
      <a href="${root('linear-algebra/linear-algebra-answers.html')}">Linear Algebra 답안 (1–17)</a>
      <a href="${root('background/real-analysis.html')}">실해석학 보충</a>
    </details>`;

  const input = nav.querySelector('#sidebar-concept-search');
  const results = nav.querySelector('#sidebar-search-results');
  const form = nav.querySelector('.sidebar-search');
  function renderSearch() {
    const query = normalize(input.value);
    results.replaceChildren();
    if (!query) { results.hidden = true; input.setAttribute('aria-expanded', 'false'); return; }
    const tokens = query.split(' ');
    const matches = searchable.filter((item) => tokens.every((token) => item.text.includes(token))).slice(0, 7);
    matches.forEach(({ concept }) => {
      const link = document.createElement('a');
      link.href = root(concept.target);
      const title = document.createElement('strong'); title.textContent = concept.title;
      const summary = document.createElement('span'); summary.textContent = concept.summary;
      link.append(title, summary); results.append(link);
    });
    if (!matches.length) {
      const empty = document.createElement('span'); empty.className = 'sidebar-search-empty'; empty.textContent = '등록된 설명을 찾지 못했습니다.'; results.append(empty);
    }
    results.hidden = false; input.setAttribute('aria-expanded', 'true');
  }
  input.addEventListener('input', renderSearch);
  input.addEventListener('keydown', (event) => { if (event.key === 'Escape') { input.value = ''; renderSearch(); } });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const first = results.querySelector('a');
    if (first) first.click(); else location.href = `${root('index.html')}?q=${encodeURIComponent(input.value)}#finder-title`;
  });
  document.addEventListener('pointerdown', (event) => { if (!form.contains(event.target)) { results.hidden = true; input.setAttribute('aria-expanded', 'false'); } });
  nav.querySelector('[data-open-atlas]').addEventListener('click', () => document.dispatchEvent(new CustomEvent('pqc:open-atlas')));

  function renderJourney() {
    const host = nav.querySelector('.sidebar-journey');
    const journey = getJourney();
    host.replaceChildren();
    const heading = document.createElement('h5'); heading.id = 'sidebar-journey-title'; heading.textContent = '학습 경로';
    host.append(heading);
    if (!journey) {
      const text = document.createElement('small'); text.textContent = '진행 중인 경로 없음'; host.append(text); return;
    }
    const current = journey.frames.at(-1);
    const title = document.createElement('strong'); title.textContent = `${journeys[journey.goalId]?.label || '학습 경로'} · ${journey.status === 'paused' ? '일시 중지' : `${journey.frames.length - 1}단계`}`;
    const detail = document.createElement('small'); detail.textContent = current.label;
    const button = document.createElement('button'); button.type = 'button'; button.textContent = '내려온 길 보기';
    button.addEventListener('click', () => document.dispatchEvent(new CustomEvent('pqc:open-atlas', { detail: { tab: 'trail' } })));
    host.append(title, detail, button);
  }
  subscribe(renderJourney);
  renderJourney();
}
