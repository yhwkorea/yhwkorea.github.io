import { conceptsById } from './concepts/index.js?v=20260901-56';
import { buildDependents, renderConceptGraph } from './concept-graph.js?v=20260901-56';

const layout = document.querySelector('.layout');
if (layout && !document.querySelector('.study-workspace')) {
  const storageKey = 'pqc-study-workspace-v1';
  const assetRoot = new URL('../', import.meta.url);
  const hrefFor = (concept) => new URL(concept.target, assetRoot).href;
  const read = () => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(value) ? value.filter((item) => item && conceptsById.has(item.id)).map((item) => ({ id: item.id, note: String(item.note || '') })) : [];
    } catch { return []; }
  };
  let items = read();
  let mode = 'cards';
  let dragging = null;

  const host = document.createElement('aside');
  host.className = 'study-workspace';
  host.setAttribute('aria-label', '내 학습 작업대');
  layout.append(host);

  const save = () => {
    localStorage.setItem(storageKey, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('pqc:study-workspace-changed', { detail: { ids: items.map((item) => item.id) } }));
  };
  const add = (id) => {
    if (!conceptsById.has(id)) return;
    const existing = items.findIndex((item) => item.id === id);
    if (existing >= 0) {
      const [item] = items.splice(existing, 1);
      items.push(item);
    } else items.push({ id, note: '' });
    mode = 'cards'; save(); render();
  };
  const remove = (id) => { items = items.filter((item) => item.id !== id); save(); render(); };
  const move = (fromId, toId) => {
    const from = items.findIndex((item) => item.id === fromId);
    const to = items.findIndex((item) => item.id === toId);
    if (from < 0 || to < 0 || from === to) return;
    const [item] = items.splice(from, 1); items.splice(to, 0, item); save(); render();
  };

  function makeCard(item, index) {
    const concept = conceptsById.get(item.id);
    const card = document.createElement('article');
    card.className = 'study-card'; card.draggable = true; card.dataset.conceptId = item.id;
    const order = document.createElement('span'); order.className = 'study-card-order'; order.textContent = String(index + 1).padStart(2, '0');
    const handle = document.createElement('button'); handle.type = 'button'; handle.className = 'study-card-handle'; handle.textContent = '⠿'; handle.title = '끌어서 순서 변경';
    const link = document.createElement('a'); link.href = hrefFor(concept); link.className = 'study-card-title'; link.textContent = concept.title;
    const summary = document.createElement('p'); summary.textContent = concept.summary;
    const noteToggle = document.createElement('button'); noteToggle.type = 'button'; noteToggle.className = 'study-card-note-toggle'; noteToggle.textContent = item.note ? '메모 수정' : '메모';
    const note = document.createElement('textarea'); note.rows = 2; note.placeholder = '내가 이해한 말이나 질문을 적으세요.'; note.value = item.note; note.hidden = !item.note;
    noteToggle.addEventListener('click', () => { note.hidden = !note.hidden; if (!note.hidden) note.focus(); });
    note.addEventListener('input', () => { item.note = note.value; clearTimeout(note._saveTimer); note._saveTimer = setTimeout(save, 250); });
    const removeButton = document.createElement('button'); removeButton.type = 'button'; removeButton.className = 'study-card-remove'; removeButton.textContent = '×'; removeButton.setAttribute('aria-label', `${concept.title} 작업대에서 제거`); removeButton.addEventListener('click', () => remove(item.id));
    card.addEventListener('dragstart', (event) => { dragging = item.id; card.classList.add('dragging'); event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', item.id); });
    card.addEventListener('dragend', () => { dragging = null; card.classList.remove('dragging'); });
    card.addEventListener('dragover', (event) => { event.preventDefault(); card.classList.add('drag-over'); });
    card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
    card.addEventListener('drop', (event) => { event.preventDefault(); card.classList.remove('drag-over'); move(dragging || event.dataTransfer.getData('text/plain'), item.id); });
    card.append(order, handle, link, removeButton, summary, noteToggle, note);
    return card;
  }

  function render() {
    host.querySelector('.study-board-graph')?._conceptGraphDestroy?.();
    host.replaceChildren();
    const header = document.createElement('header');
    const eyebrow = document.createElement('span'); eyebrow.textContent = '개인 학습 기록';
    const title = document.createElement('h2'); title.textContent = '내 학습 작업대';
    const count = document.createElement('small'); count.textContent = `${items.length}개 개념`;
    header.append(eyebrow, title, count);
    const actions = document.createElement('div'); actions.className = 'study-workspace-actions';
    const cardsButton = document.createElement('button'); cardsButton.type = 'button'; cardsButton.textContent = '카드'; cardsButton.className = mode === 'cards' ? 'active' : '';
    const graphButton = document.createElement('button'); graphButton.type = 'button'; graphButton.textContent = '보드로 펼치기'; graphButton.className = mode === 'graph' ? 'active' : '';
    const clear = document.createElement('button'); clear.type = 'button'; clear.textContent = '비우기'; clear.disabled = !items.length;
    cardsButton.addEventListener('click', () => { mode = 'cards'; render(); });
    graphButton.addEventListener('click', () => { mode = 'graph'; render(); });
    clear.addEventListener('click', () => { if (items.length && confirm('작업대의 개념과 메모를 모두 비울까요?')) { items = []; save(); render(); } });
    actions.append(cardsButton, graphButton, clear);
    const body = document.createElement('div'); body.className = 'study-workspace-body';
    if (!items.length) {
      const empty = document.createElement('div'); empty.className = 'study-workspace-empty';
      const mark = document.createElement('span'); mark.textContent = '+';
      const heading = document.createElement('strong'); heading.textContent = '아직 모은 개념이 없습니다';
      const help = document.createElement('p'); help.textContent = '가운데 설명에서 궁금한 개념 옆의 +를 누르세요. 선택한 것만 이곳에 남습니다.';
      empty.append(mark, heading, help); body.append(empty);
    } else if (mode === 'cards') {
      const help = document.createElement('p'); help.className = 'study-workspace-help'; help.textContent = '카드를 끌어 내가 이해할 순서로 정리하세요.'; body.append(help);
      items.forEach((item, index) => body.append(makeCard(item, index)));
    } else {
      const subset = new Map(items.map((item) => [item.id, conceptsById.get(item.id)]));
      const graph = document.createElement('div'); graph.className = 'study-board-graph';
      renderConceptGraph(graph, { centerId: items.at(-1).id, conceptsById: subset, dependentsByConcept: buildDependents(subset), allowGlobal: false, initialDepth: 3, hrefFor });
      body.append(graph);
    }
    host.append(header, actions, body);
  }

  document.addEventListener('pqc:add-study-concept', (event) => add(event.detail?.conceptId));
  document.addEventListener('pqc:remove-study-concept', (event) => remove(event.detail?.conceptId));
  window.PQCStudyWorkspace = { add, remove, getIds: () => items.map((item) => item.id) };
  render(); save();
}
