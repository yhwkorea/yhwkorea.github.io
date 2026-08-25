(() => {
  const content = document.querySelector('.content-inner');
  if (!content || document.body.dataset.chapterView !== 'true') return;

  document.querySelectorAll('[data-slide-deck]').forEach((deck) => {
    const slides = [...deck.querySelectorAll('.learning-slide')];
    if (slides.length < 2) return;
    let current = 0;
    const controls = document.createElement('div');
    controls.className = 'slide-controls';
    const previous = document.createElement('button');
    const status = document.createElement('span');
    const next = document.createElement('button');
    previous.type = next.type = 'button';
    previous.textContent = '← 이전';
    next.textContent = '다음 →';
    status.setAttribute('aria-live', 'polite');
    const show = (index) => {
      current = Math.max(0, Math.min(index, slides.length - 1));
      slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== current; });
      previous.disabled = current === 0;
      next.disabled = current === slides.length - 1;
      status.textContent = `${current + 1} / ${slides.length}`;
    };
    previous.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    controls.append(previous, status, next);
    deck.append(controls);
    show(0);
  });

  import('./journey-ui.js').catch((error) => console.error('학습 지도 초기화 실패', error));
  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-learning-link]');
    if (!link || link.hasAttribute('data-learning-start')) return;
    window.PQCJourney?.descend({
      nodeId: link.dataset.learningNode || link.dataset.learningTitle || link.href,
      label: link.dataset.learningTitle || link.textContent.trim(),
      href: link.href,
      sourceHref: location.href,
      reason: link.dataset.learningReason || '원래 설명에서 낯선 개념을 확인하기 위해'
    });
  });

  const headings = [...content.children].filter((el) => el.tagName === 'H2');
  if (!headings.length) return;

  const chapters = [];
  headings.forEach((heading, index) => {
    const nextHeading = headings[index + 1] || null;
    const details = document.createElement('details');
    details.className = 'chapter';
    const summary = document.createElement('summary');
    const body = document.createElement('div');
    body.className = 'chapter-body';
    content.insertBefore(details, heading);
    summary.append(heading);
    details.append(summary, body);
    while (details.nextSibling && details.nextSibling !== nextHeading) {
      body.append(details.nextSibling);
    }
    chapters.push({ details, heading });
  });

  const index = document.createElement('section');
  index.className = 'chapter-index';
  index.setAttribute('aria-labelledby', 'chapter-index-title');
  const kicker = document.createElement('span');
  kicker.textContent = 'Contents';
  const title = document.createElement('h2');
  title.id = 'chapter-index-title';
  title.textContent = '목차';
  const help = document.createElement('p');
  help.textContent = '읽을 절을 선택하면 내용이 펼쳐집니다.';
  const list = document.createElement('ol');
  chapters.forEach(({ details, heading }) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = heading.textContent;
    button.addEventListener('click', () => {
      details.open = true;
      details.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    item.append(button);
    list.append(item);
  });
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'collapse-all';
  close.textContent = '모두 접기';
  close.addEventListener('click', () => {
    chapters.forEach(({ details }) => { details.open = false; });
    index.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  index.append(kicker, title, help, list, close);
  content.insertBefore(index, chapters[0].details);

  const findTarget = (hash) => {
    if (!hash) return null;
    const raw = hash.replace(/^#/, '');
    const candidates = [raw];
    try { candidates.unshift(decodeURIComponent(raw)); } catch (_) { /* already decoded */ }
    for (const id of candidates) {
      const target = document.getElementById(id);
      if (target) return target;
    }
    return null;
  };
  const revealHash = () => {
    const pending = sessionStorage.getItem('glossary-target');
    const target = findTarget(location.hash) || findTarget(pending);
    const chapter = target && target.closest('details.chapter');
    if (chapter) {
      chapter.open = true;
      chapter.classList.add('glossary-revealed');
      sessionStorage.removeItem('glossary-target');
      sessionStorage.removeItem('glossary-term');
      requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' })));
      setTimeout(() => chapter.classList.remove('glossary-revealed'), 2600);
    }
  };
  revealHash();
  window.addEventListener('pageshow', revealHash);
  window.addEventListener('hashchange', revealHash);
})();
