import { globalAreas, areaForPath } from './site-map.js';
import { getJourney, startJourney, descend, reconcile, returnTo, endJourney, subscribe } from './journey-store.js';

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
  let open = false;
  let tab = 'location';

  function render() {
    const current = areaForPath(location.pathname);
    const journey = getJourney();
    const last = journey?.frames.at(-1);
    host.replaceChildren();
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'atlas-chip';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = journey?.status === 'active'
      ? `SQIsign 경로 · ${last.label} · ${journey.frames.length - 1}단계`
      : journey?.status === 'paused'
        ? `SQIsign 경로 일시 중지 · 현재 ${current?.label || '다른 페이지'}`
        : `전체 지도 · ${current?.label || '학습 홈'}`;
    toggle.addEventListener('click', () => { open = !open; render(); });
    host.append(toggle);
    if (!open) return;

    const panel = document.createElement('section');
    panel.className = 'atlas-panel';
    panel.setAttribute('aria-label', '학습 내비게이션');
    const close = document.createElement('button');
    close.type = 'button'; close.className = 'atlas-close'; close.textContent = '닫기';
    close.addEventListener('click', () => { open = false; render(); toggle.focus(); });
    const tabs = document.createElement('div'); tabs.className = 'atlas-tabs';
    [['location', '현재 위치'], ['trail', '내가 내려온 길']].forEach(([id, label]) => {
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
      const list = document.createElement('ul'); list.className = 'atlas-area-list';
      globalAreas.forEach((area) => {
        const item = document.createElement('li');
        if (area.id === current?.id) item.className = 'active';
        const link = document.createElement('a');
        link.href = new URL(`../${area.href}`, import.meta.url).href;
        link.textContent = area.label;
        const children = document.createElement('small'); children.textContent = area.children.join(' · ');
        item.append(link, children); list.append(item);
      });
      body.append(heading, list);
    } else if (!journey) {
      body.innerHTML = '<strong>시작한 학습 경로가 없습니다.</strong><p>SQIsign 경로는 시작 버튼을 눌렀을 때만 기록됩니다.</p>';
    } else {
      const heading = document.createElement('strong'); heading.textContent = '목표 · SQIsign 이해';
      const list = document.createElement('ol'); list.className = 'atlas-trail';
      journey.frames.forEach((frame, index) => {
        const item = document.createElement('li');
        const button = document.createElement('button'); button.type = 'button'; button.textContent = frame.label;
        button.addEventListener('click', () => { const href = returnTo(index); if (href) location.href = href; });
        const reason = document.createElement('small'); reason.textContent = frame.reason || '';
        item.append(button, reason); list.append(item);
      });
      const end = document.createElement('button'); end.type = 'button'; end.className = 'journey-end'; end.textContent = 'SQIsign 경로 종료';
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
  render();
}
