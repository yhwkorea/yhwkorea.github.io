(() => {
  const content = document.querySelector('.content-inner');
  if (!content || document.body.dataset.chapterView !== 'true') return;

  const headings = [...content.children].filter((el) => el.tagName === 'H2');
  if (!headings.length) return;

  const chapters = [];
  headings.forEach((heading, index) => {
    const nextHeading = headings[index + 1] || null;
    const details = document.createElement('details');
    details.className = 'chapter';
    const summary = document.createElement('summary');
    summary.append(heading);
    const body = document.createElement('div');
    body.className = 'chapter-body';
    content.insertBefore(details, heading);
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

  const revealHash = () => {
    if (!location.hash) return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const chapter = target && target.closest('details.chapter');
    if (chapter) {
      chapter.open = true;
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    }
  };
  revealHash();
  window.addEventListener('hashchange', revealHash);
})();
