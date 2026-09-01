import { cryptoBranches, schoolBranches, mathBranches, journeys, areaForPath } from './site-map.js?v=20260901-55';
import { getJourney, startJourney, descend, reconcile, returnTo, endJourney, subscribe } from './journey-store.js';
import { conceptsById } from './concepts/index.js?v=20260901-55';
import { buildDependents, renderConceptGraph } from './concept-graph.js?v=20260901-55';

if (!window.PQCJourney) {
  window.PQCJourney = { start: startJourney, descend, end: endJourney };
  document.querySelectorAll('[data-learning-start], [data-journey-start]').forEach((link) => {
    link.addEventListener('click', () => startJourney(link.dataset.journeyStart || 'sqisign', {
      href: location.href,
      reason: link.dataset.learningReason
    }));
  });
  reconcile();

  const host = document.createElement('aside');
  host.className = 'atlas-float';
  document.body.append(host);
  const desktopDock = matchMedia('(min-width: 1200px)');
  let open = false;
  let tab = 'graph';
  const dependentsByConcept = buildDependents(conceptsById);
  const pagePath = location.pathname.split('/math-test/').pop() || '';
  const conceptAtLocation = () => {
    const hash = (() => { try { return decodeURIComponent(location.hash.slice(1)); } catch { return location.hash.slice(1); } })();
    const matches = [...conceptsById.values()].filter((concept) => concept.target.split('#')[0] === pagePath);
    return matches.find((concept) => concept.target.split('#')[1] === hash)
      || conceptsById.get(document.querySelector('[data-concept-module]')?.dataset.conceptModule)
      || conceptsById.get(document.querySelector('[data-concept]')?.dataset.concept)
      || null;
  };
  let graphConceptId = conceptAtLocation()?.id || null;
  if (desktopDock.matches && graphConceptId) open = true;

  function render() {
    const current = areaForPath(location.pathname);
    const journey = getJourney();
    const journeyMeta = journey ? journeys[journey.goalId] : null;
    const last = journey?.frames.at(-1);
    host.replaceChildren();
    host.classList.toggle('atlas-open', open);
    host.classList.toggle('atlas-docked', desktopDock.matches);
    document.body.classList.toggle('atlas-dock-visible', open && desktopDock.matches);
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'atlas-chip';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = journey?.status === 'active'
      ? `${journeyMeta.label} · ${last.label} · ${journey.frames.length - 1}단계`
      : journey?.status === 'paused'
        ? `${journeyMeta.label} 일시 중지 · 현재 ${current?.label || '다른 페이지'}`
        : `전체 지도 · ${current?.label || '학습 홈'}`;
    toggle.addEventListener('click', () => { open = !open; render(); });
    host.append(toggle);
    if (!open) return;

    const panel = document.createElement('section');
    panel.className = 'atlas-panel';
    panel.setAttribute('aria-label', '학습 내비게이션');
    const close = document.createElement('button');
    close.type = 'button'; close.className = 'atlas-close'; close.textContent = desktopDock.matches ? '접기' : '닫기';
    close.addEventListener('click', () => { open = false; render(); toggle.focus(); });
    const tabs = document.createElement('div'); tabs.className = 'atlas-tabs';
    [['location', '전체 지도'], ['graph', '개념 그래프'], ['trail', '내가 내려온 길']].forEach(([id, label]) => {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = label;
      button.className = tab === id ? 'active' : '';
      button.addEventListener('click', () => { tab = id; render(); });
      tabs.append(button);
    });
    const body = document.createElement('div'); body.className = 'atlas-panel-body';
    if (tab === 'location') {
      const heading = document.createElement('strong');
      heading.textContent = current ? `현재 · ${current.label}` : '학습 자료 전체';
      const makeBranchMap = (branches, context) => {
        const map = document.createElement('div'); map.className = 'crypto-map-branches';
        branches.forEach((branch) => {
          const group = document.createElement('section');
          if (branch.label === current?.label) group.className = 'active';
          const label = document.createElement('b'); label.textContent = branch.label;
          const nodes = document.createElement('div');
          branch.nodes.forEach((node) => {
            const row = document.createElement('span');
            const link = document.createElement('a'); link.href = new URL(`../${node.href}`, import.meta.url).href; link.textContent = node.label;
            row.append(link);
            const journeyId = node.journey || branch.journey;
            if (journeyId) {
              const start = document.createElement('button'); start.type = 'button'; start.textContent = '경로 시작';
              start.setAttribute('aria-label', `${node.label} 학습 경로 시작`);
              start.addEventListener('click', () => {
                startJourney(journeyId, { href: location.href, reason: `전체 ${context} 지도에서 ${node.label}을 선택했습니다.` });
                location.href = link.href;
              });
              row.append(start);
            }
            nodes.append(row);
          });
          group.append(label, nodes); map.append(group);
        });
        return map;
      };
      const cryptoTitle = document.createElement('h3'); cryptoTitle.textContent = '현대 암호학 가지';
      const schoolTitle = document.createElement('h3'); schoolTitle.textContent = '초·중·고 수학 가지';
      const mathTitle = document.createElement('h3'); mathTitle.textContent = '대학 수학·암호 선수개념';
      body.append(heading, cryptoTitle, makeBranchMap(cryptoBranches, '암호학'), schoolTitle, makeBranchMap(schoolBranches, '학교 수학'), mathTitle, makeBranchMap(mathBranches, '수학'));
    } else if (tab === 'graph') {
      panel.classList.add('atlas-panel-graph');
      const selected = conceptsById.get(graphConceptId) || conceptAtLocation();
      if (!selected) {
        body.innerHTML = '<strong>현재 선택한 개념이 없습니다.</strong><p>본문에서 밑줄 친 용어를 누르고 ‘연결 지도’를 선택하세요.</p>';
      } else {
        graphConceptId = selected.id;
        const graph = document.createElement('div');
        renderConceptGraph(graph, {
          centerId: selected.id,
          conceptsById,
          dependentsByConcept,
          allowGlobal: true,
          initialDepth: 2,
          hrefFor: (concept) => new URL(`../${concept.target}`, import.meta.url).href,
          onNavigate: (link, concept) => link.addEventListener('click', () => descend({
            nodeId: concept.id,
            label: concept.title,
            href: link.href,
            sourceHref: location.href,
            reason: `${selected.title}의 연결 그래프에서 이동했습니다.`
          }))
        });
        body.append(graph);
      }
    } else if (!journey) {
      body.innerHTML = '<strong>시작한 학습 경로가 없습니다.</strong><p>전체 지도에서 관심 있는 암호나 수학 개념 옆의 ‘경로 시작’을 누르세요.</p>';
    } else {
      const heading = document.createElement('strong'); heading.textContent = `목표 · ${journeyMeta.label}`;
      const list = document.createElement('ol'); list.className = 'atlas-trail';
      journey.frames.forEach((frame, index) => {
        const item = document.createElement('li');
        const button = document.createElement('button'); button.type = 'button'; button.textContent = frame.label;
        button.addEventListener('click', () => { const href = returnTo(index); if (href) location.href = href; });
        const reason = document.createElement('small'); reason.textContent = frame.reason || '';
        item.append(button, reason); list.append(item);
      });
      const end = document.createElement('button'); end.type = 'button'; end.className = 'journey-end'; end.textContent = '현재 학습 경로 종료';
      end.addEventListener('click', () => { endJourney(); tab = 'location'; render(); });
      body.append(heading, list, end);
    }
    panel.append(close, tabs, body); host.append(panel);
  }
  subscribe(render);
  addEventListener('pageshow', () => { reconcile(); render(); });
  addEventListener('popstate', () => { reconcile(); render(); });
  addEventListener('keydown', (event) => { if (event.key === 'Escape' && open) { open = false; render(); } });
  document.addEventListener('pqc:open-atlas', (event) => {
    open = true;
    if (event.detail?.tab) tab = event.detail.tab;
    render();
  });
  document.addEventListener('pqc:open-concept-map', (event) => {
    graphConceptId = event.detail?.conceptId || conceptAtLocation()?.id || null;
    open = true;
    tab = 'graph';
    render();
  });
  addEventListener('hashchange', () => {
    graphConceptId = conceptAtLocation()?.id || graphConceptId;
    if (open && tab === 'graph') render();
  });
  const conceptsOnPage = [...conceptsById.values()].filter((concept) => concept.target.split('#')[0] === pagePath);
  const conceptBySection = new Map(conceptsOnPage.map((concept) => [concept.target.split('#')[1], concept]));
  let scrollFrame;
  const updateConceptFromScroll = () => {
    scrollFrame = undefined;
    const headings = [...document.querySelectorAll('h2[id]')].filter((heading) => conceptBySection.has(heading.id));
    const readingLine = innerHeight * .58;
    const active = headings.sort((a, b) => Math.abs(a.getBoundingClientRect().top - readingLine) - Math.abs(b.getBoundingClientRect().top - readingLine))[0];
    const concept = active && conceptBySection.get(active.id);
    if (!concept || concept.id === graphConceptId) return;
    graphConceptId = concept.id;
    if (open && tab === 'graph') render();
  };
  addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateConceptFromScroll); }, { passive: true });
  desktopDock.addEventListener('change', () => {
    if (desktopDock.matches && graphConceptId) { open = true; tab = 'graph'; }
    render();
  });
  render();
}
