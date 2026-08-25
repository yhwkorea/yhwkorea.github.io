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
  const pageTitles = [
    ['foundations/cryptography.html', '전자서명'],
    ['foundations/calculus.html', '미분과 편미분'],
    ['foundations/notation.html', '집합과 기호'],
    ['foundations/algebra.html', '대수학'],
    ['isogeny/01-finite-fields.html', '유한체'],
    ['isogeny/02-elliptic-curves.html', '타원곡선'],
    ['isogeny/03-isogenies.html', '아이소제니'],
    ['isogeny/isogeny-textbook.html', 'SQIsign 전체 흐름']
  ];
  const currentPageTitle = pageTitles.find(([path]) => location.pathname.endsWith(path))?.[1] || document.title;
  let learningPath = readPath();
  if (!learningPath) {
    learningPath = {
      goal: document.body.dataset.learningGoal || 'SQIsign 이해',
      trail: [{ title: 'SQIsign 전체 흐름', href: new URL('isogeny/isogeny-textbook.html', new URL('../', location.href)).href }]
    };
    if (currentPageTitle !== 'SQIsign 전체 흐름') learningPath.trail.push({
      title: currentPageTitle,
      href: location.href,
      reason: '이 개념 페이지에서 학습을 시작했습니다.'
    });
    writePath(learningPath);
  }

  const pushPath = ({ title, href, reason }) => {
    const path = readPath() || learningPath;
    path.trail.push({ title, href, returnHref: location.href, reason });
    writePath(path);
  };
  window.PQCLearningPath = { push: pushPath };
  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-learning-link]');
    if (!link) return;
    pushPath({
      title: link.dataset.learningTitle || link.textContent.trim(),
      href: link.href,
      reason: link.dataset.learningReason || '원래 설명에서 낯선 개념을 확인하기 위해'
    });
  });

  if (learningPath) {
    const mapBranches = [
      ['암호학', '전자서명', '해시'],
      ['곡선의 언어', '유한체', '타원곡선', '아이소제니'],
      ['서명 흐름', 'Commitment', 'Challenge', 'Response'],
      ['비밀 계산', '엔도모피즘', '사원수 아이디얼', 'KLPT']
    ];
    const nav = document.createElement('aside');
    nav.className = 'learning-float';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'learning-float-toggle';
    const compactMap = matchMedia('(max-width: 620px)').matches;
    toggle.setAttribute('aria-expanded', String(!compactMap));
    toggle.innerHTML = compactMap
      ? `<span>SQIsign › ${learningPath.trail.at(-1).title}</span><b aria-hidden="true">+</b>`
      : '<span>지도</span><b aria-hidden="true">−</b>';
    const panel = document.createElement('div');
    panel.className = 'learning-float-panel';
    panel.hidden = compactMap;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', '현재 학습 경로');
    const goal = document.createElement('small');
    goal.textContent = `목표 · ${learningPath.goal}`;
    const title = document.createElement('strong');
    title.textContent = '전체 지도';
    const overview = document.createElement('ul');
    overview.className = 'learning-overview';
    const activeNames = learningPath.trail.map((step) => step.title.toLocaleLowerCase('ko'));
    mapBranches.forEach(([branch, ...nodes]) => {
      const item = document.createElement('li');
      const label = document.createElement('b');
      label.textContent = branch;
      const chain = document.createElement('span');
      nodes.forEach((node, index) => {
        if (index) chain.append(' → ');
        const nodeLabel = document.createElement('i');
        nodeLabel.textContent = node;
        if (activeNames.some((name) => name.includes(node.toLocaleLowerCase('ko')))) nodeLabel.className = 'is-active';
        chain.append(nodeLabel);
      });
      item.append(label, chain);
      overview.append(item);
    });
    const trailLabel = document.createElement('h3');
    trailLabel.textContent = '내가 내려온 길';
    const list = document.createElement('ol');
    list.className = 'learning-trail';
    learningPath.trail.forEach((step, index) => {
      const item = document.createElement('li');
      const stepTitle = document.createElement('span');
      stepTitle.textContent = step.title;
      item.append(stepTitle);
      if (step.reason) {
        const reason = document.createElement('small');
        reason.textContent = step.reason;
        item.append(reason);
      }
      if (index === learningPath.trail.length - 1) item.setAttribute('aria-current', 'step');
      list.append(item);
    });
    panel.append(goal, title, overview, trailLabel, list);
    const currentStep = learningPath.trail.at(-1);
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
      learningPath = { goal: 'SQIsign 이해', trail: [{ title: 'SQIsign 전체 흐름', href: location.href }] };
      writePath(learningPath);
      location.reload();
    });
    panel.append(reset);
    toggle.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
      toggle.querySelector('b').textContent = panel.hidden ? '+' : '−';
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
