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

  const pathKey = 'pqc-learning-path-v1';
  const readPath = () => {
    try { return JSON.parse(sessionStorage.getItem(pathKey) || 'null'); } catch (_) { return null; }
  };
  const writePath = (value) => sessionStorage.setItem(pathKey, JSON.stringify(value));
  let learningPath = readPath();
  if (!learningPath && document.body.dataset.learningGoal) {
    learningPath = {
      goal: document.body.dataset.learningGoal,
      trail: [{ title: document.body.dataset.learningRoot || document.title, href: location.href }]
    };
    writePath(learningPath);
  }
  document.querySelectorAll('[data-learning-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const path = readPath() || {
        goal: document.body.dataset.learningGoal || 'SQIsign 이해',
        trail: [{ title: document.body.dataset.learningRoot || document.title, href: location.href }]
      };
      path.trail.push({
        title: link.dataset.learningTitle || link.textContent.trim(),
        href: link.href,
        returnHref: location.href,
        reason: link.dataset.learningReason || '원래 설명에서 낯선 개념을 확인하기 위해'
      });
      writePath(path);
    });
  });

  if (learningPath) {
    const nav = document.createElement('aside');
    nav.className = 'learning-float';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'learning-float-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = `<span>경로</span><b>${learningPath.trail.length - 1}</b>`;
    const panel = document.createElement('div');
    panel.className = 'learning-float-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', '현재 학습 경로');
    const goal = document.createElement('small');
    goal.textContent = `목표 · ${learningPath.goal}`;
    const title = document.createElement('strong');
    title.textContent = learningPath.trail.at(-1).title;
    const list = document.createElement('ol');
    learningPath.trail.forEach((step, index) => {
      const item = document.createElement('li');
      item.textContent = step.title;
      if (index === learningPath.trail.length - 1) item.setAttribute('aria-current', 'step');
      list.append(item);
    });
    panel.append(goal, title, list);
    const currentStep = learningPath.trail.at(-1);
    if (currentStep.reason) {
      const reason = document.createElement('p');
      reason.textContent = `왜 여기 있나요? ${currentStep.reason}`;
      panel.append(reason);
    }
    if (learningPath.trail.length > 1) {
      const back = document.createElement('a');
      back.className = 'learning-return';
      back.href = currentStep.returnHref || learningPath.trail.at(-2).href;
      back.textContent = `${learningPath.trail.at(-2).title}로 돌아가기`;
      back.addEventListener('click', () => {
        learningPath.trail.pop();
        writePath(learningPath);
      });
      panel.append(back);
    }
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'learning-reset';
    reset.textContent = '경로 지우기';
    reset.addEventListener('click', () => {
      sessionStorage.removeItem(pathKey);
      nav.remove();
    });
    panel.append(reset);
    toggle.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
    });
    nav.append(toggle, panel);
    document.body.append(nav);
  }

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
