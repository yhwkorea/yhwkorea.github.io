const script = document.currentScript;
Promise.all([
  import('./concepts/index.js'),
  import('./concept-catalog.js')
]).then(([{ concepts, conceptsById }, { areas, commonQuestions }]) => {
  const host = document.querySelector('[data-concept-browser]');
  if (!host) return;
  const page = (path) => new URL(`../${path}`, new URL('.', script.src)).href;
  const input = host.querySelector('input[type="search"]');
  const areaList = host.querySelector('[data-area-list]');
  const questionList = host.querySelector('[data-question-list]');
  const results = host.querySelector('[data-search-results]');

  const areaFor = (id) => areas.find((area) => area.concepts.includes(id));
  const normalize = (value) => value.toLocaleLowerCase('ko').replace(/\s+/g, ' ').trim();
  const conceptText = (concept) => normalize([
    concept.title, ...concept.terms, concept.summary, concept.why,
    concept.example, concept.formal, ...concept.usedIn
  ].join(' '));

  areas.forEach((area) => {
    const link = document.createElement('a');
    link.className = 'area-card';
    link.href = page(area.href);
    const title = document.createElement('strong'); title.textContent = area.title;
    const description = document.createElement('span'); description.textContent = area.description;
    link.append(title, description);
    areaList.append(link);
  });

  commonQuestions.forEach((item) => {
    const link = document.createElement('a');
    link.href = page(item.href);
    link.textContent = item.question;
    questionList.append(link);
  });

  function renderResults(query) {
    const needle = normalize(query);
    results.replaceChildren();
    results.hidden = !needle;
    if (!needle) return;
    const tokens = needle.split(' ').filter(Boolean);
    const matches = concepts.filter((concept) => tokens.every((token) => conceptText(concept).includes(token)));
    const questionMatches = commonQuestions.filter((item) => tokens.every((token) => normalize([item.question, ...item.terms].join(' ')).includes(token)));
    const heading = document.createElement('h3');
    heading.textContent = `“${query}” 검색 결과 ${matches.length + questionMatches.length}개`;
    results.append(heading);
    questionMatches.forEach((item) => {
      const link = document.createElement('a'); link.className = 'search-result'; link.href = page(item.href);
      const title = document.createElement('strong'); title.textContent = item.question;
      const text = document.createElement('span'); text.textContent = '질문에 해당하는 설명으로 이동';
      link.append(title, text); results.append(link);
    });
    matches.forEach((concept) => {
      const area = areaFor(concept.id);
      const link = document.createElement('a'); link.className = 'search-result'; link.href = page(concept.target);
      const title = document.createElement('strong'); title.textContent = concept.title;
      const text = document.createElement('span'); text.textContent = concept.summary;
      const meta = document.createElement('small'); meta.textContent = area ? `${area.title} · 자세한 설명으로 이동` : '자세한 설명으로 이동';
      link.append(title, text, meta); results.append(link);
    });
    if (!matches.length && !questionMatches.length) {
      const empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.textContent = '아직 등록된 설명이 없습니다. 더 짧은 용어나 분야 이름으로 검색해 보세요.';
      results.append(empty);
    }
  }

  input.addEventListener('input', () => renderResults(input.value));
  const initial = new URLSearchParams(location.search).get('q');
  if (initial) { input.value = initial; renderResults(initial); }
}).catch((error) => console.error('Concept browser failed to load', error));
