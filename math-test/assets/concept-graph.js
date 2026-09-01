const cytoscapeUrl = new URL('./vendor/cytoscape.min.js?v=3.33.1', import.meta.url).href;
let cytoscapePromise;

function loadCytoscape() {
  if (window.cytoscape) return Promise.resolve(window.cytoscape);
  if (cytoscapePromise) return cytoscapePromise;
  cytoscapePromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-cytoscape-loader]');
    const script = existing || document.createElement('script');
    const done = () => window.cytoscape ? resolve(window.cytoscape) : reject(new Error('Cytoscape를 불러오지 못했습니다.'));
    script.addEventListener('load', done, { once: true });
    script.addEventListener('error', () => reject(new Error('Cytoscape 파일을 불러오지 못했습니다.')), { once: true });
    if (!existing) {
      script.src = cytoscapeUrl;
      script.defer = true;
      script.dataset.cytoscapeLoader = 'true';
      document.head.append(script);
    }
  });
  return cytoscapePromise;
}

export function buildDependents(conceptsById) {
  const dependents = new Map([...conceptsById.keys()].map((id) => [id, []]));
  conceptsById.forEach((concept) => (concept.prerequisites || []).forEach((id) => {
    dependents.get(id)?.push(concept.id);
  }));
  return dependents;
}

const relationLabels = {
  prerequisite: '선수',
  next: '후속',
  related: '관련',
  backlink: '이 개념을 사용'
};

function neighbours(id, conceptsById, dependents, enabled) {
  const concept = conceptsById.get(id);
  if (!concept) return [];
  const result = [];
  const add = (ids, relation) => {
    if (!enabled.has(relation)) return;
    (ids || []).forEach((target) => {
      if (target !== id && conceptsById.has(target)) result.push({ source: id, target, relation });
    });
  };
  add(concept.prerequisites, 'prerequisite');
  add(concept.next, 'next');
  add(concept.related, 'related');
  add(dependents.get(id), 'backlink');
  return result;
}

function graphData(centerId, conceptsById, dependents, { depth, global, enabled }) {
  const ids = new Set(global ? conceptsById.keys() : [centerId]);
  const edges = new Map();
  const queue = global ? [...ids].map((id) => [id, 0]) : [[centerId, 0]];
  const visited = new Set();
  while (queue.length) {
    const [id, level] = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    if (!global && level >= depth) continue;
    neighbours(id, conceptsById, dependents, enabled).forEach((edge) => {
      if (!global) ids.add(edge.target);
      if (ids.has(edge.target)) {
        const pair = [edge.source, edge.target].sort().join('|');
        const key = `${pair}|${edge.relation}`;
        if (!edges.has(key)) edges.set(key, edge);
      }
      if (!global && !visited.has(edge.target)) queue.push([edge.target, level + 1]);
    });
  }
  if (global) {
    ids.forEach((id) => neighbours(id, conceptsById, dependents, enabled).forEach((edge) => {
      const pair = [edge.source, edge.target].sort().join('|');
      const key = `${pair}|${edge.relation}`;
      if (!edges.has(key)) edges.set(key, edge);
    }));
  }
  return {
    nodes: [...ids].map((id) => ({ data: { id, label: conceptsById.get(id).title, center: id === centerId ? 'yes' : 'no' } })),
    edges: [...edges.values()].map((edge, index) => ({ data: { id: `e${index}`, ...edge } }))
  };
}

function button(label, title, handler) {
  const element = document.createElement('button');
  element.type = 'button';
  element.textContent = label;
  element.title = title;
  element.addEventListener('click', handler);
  return element;
}

export function renderConceptGraph(host, {
  centerId,
  conceptsById,
  dependentsByConcept = buildDependents(conceptsById),
  hrefFor = (concept) => concept.target,
  onNavigate = () => {},
  allowGlobal = false,
  initialDepth = 1
}) {
  host._conceptGraphDestroy?.();
  host.replaceChildren();
  host.classList.add('local-concept-graph');
  if (!conceptsById.has(centerId)) {
    host.textContent = '본문에서 개념을 선택하면 주변 연결을 볼 수 있습니다.';
    return;
  }

  let center = centerId;
  let depth = initialDepth;
  let global = false;
  let cy;
  let disposed = false;
  const enabled = new Set(Object.keys(relationLabels));

  const toolbar = document.createElement('div');
  toolbar.className = 'concept-graph-toolbar';
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = '개념 검색';
  search.setAttribute('aria-label', '그래프에서 개념 검색');
  const suggestions = document.createElement('datalist');
  suggestions.id = `concept-graph-list-${Math.random().toString(36).slice(2)}`;
  search.setAttribute('list', suggestions.id);
  [...conceptsById.values()].sort((a, b) => a.title.localeCompare(b.title, 'ko')).forEach((concept) => {
    const option = document.createElement('option');
    option.value = concept.title;
    option.dataset.id = concept.id;
    suggestions.append(option);
  });
  const depthSelect = document.createElement('select');
  depthSelect.setAttribute('aria-label', '표시할 연결 깊이');
  [1, 2, 3].forEach((value) => {
    const option = document.createElement('option');
    option.value = String(value); option.textContent = `${value}단계`;
    option.selected = value === depth;
    depthSelect.append(option);
  });
  const viewport = document.createElement('span');
  viewport.className = 'concept-graph-viewport';
  toolbar.append(search, suggestions, depthSelect, viewport);

  const filters = document.createElement('fieldset');
  filters.className = 'concept-graph-filters';
  const legend = document.createElement('legend'); legend.textContent = '관계 표시'; filters.append(legend);
  Object.entries(relationLabels).forEach(([relation, label]) => {
    const wrapper = document.createElement('label'); wrapper.className = `graph-filter-${relation}`;
    const input = document.createElement('input'); input.type = 'checkbox'; input.checked = true; input.value = relation;
    input.addEventListener('change', () => { input.checked ? enabled.add(relation) : enabled.delete(relation); rebuild(); });
    wrapper.append(input, ` ${label}`); filters.append(wrapper);
  });

  const canvas = document.createElement('div');
  canvas.className = 'local-graph-canvas';
  canvas.setAttribute('role', 'application');
  canvas.setAttribute('aria-label', '드래그와 확대·축소가 가능한 개념 그래프');
  canvas.tabIndex = 0;
  const status = document.createElement('div'); status.className = 'concept-graph-status'; status.setAttribute('aria-live', 'polite');
  const selectedTitle = document.createElement('strong');
  const selectedSummary = document.createElement('span');
  const openLink = document.createElement('a'); openLink.textContent = '설명 열기';
  status.append(selectedTitle, selectedSummary, openLink);
  const help = document.createElement('p');
  help.className = 'concept-graph-help';
  help.textContent = '노드 클릭: 중심 이동 · 노드 드래그: 위치 조정 · 빈 곳 드래그: 화면 이동 · 휠/핀치: 확대·축소';
  host.append(toolbar, filters, help, canvas, status);

  const updateStatus = (id) => {
    const concept = conceptsById.get(id);
    if (!concept) return;
    selectedTitle.textContent = concept.title;
    selectedSummary.textContent = concept.summary;
    openLink.href = hrefFor(concept);
    openLink.onclick = () => onNavigate(openLink, concept, 'open');
  };

  const recenter = (id) => {
    if (!conceptsById.has(id)) return;
    center = id; global = false; search.value = conceptsById.get(id).title;
    rebuild();
  };

  const rebuild = () => {
    if (!cy) return;
    const data = graphData(center, conceptsById, dependentsByConcept, { depth, global, enabled });
    cy.elements().remove();
    cy.add([...data.nodes, ...data.edges]);
    cy.nodes().removeClass('is-center');
    cy.$id(center).addClass('is-center');
    cy.layout({ name: 'cose', animate: false, randomize: true, fit: true, padding: 28, nodeRepulsion: global ? 9500 : 7200, idealEdgeLength: global ? 42 : 78 }).run();
    viewport.replaceChildren(
      button('−', '축소', () => cy.zoom({ level: Math.max(cy.minZoom(), cy.zoom() * .8), renderedPosition: { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 } })),
      button('+', '확대', () => cy.zoom({ level: Math.min(cy.maxZoom(), cy.zoom() * 1.25), renderedPosition: { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 } })),
      button('맞춤', '그래프 전체 맞춤', () => cy.fit(undefined, 28))
    );
    updateStatus(center);
  };

  depthSelect.addEventListener('change', () => { depth = Number(depthSelect.value); rebuild(); });
  canvas.addEventListener('keydown', (event) => {
    if (!cy) return;
    const moves = { ArrowLeft: [36, 0], ArrowRight: [-36, 0], ArrowUp: [0, 36], ArrowDown: [0, -36] };
    if (moves[event.key]) { event.preventDefault(); cy.panBy({ x: moves[event.key][0], y: moves[event.key][1] }); }
    else if (event.key === '+' || event.key === '=') { event.preventDefault(); cy.zoom(cy.zoom() * 1.2); }
    else if (event.key === '-') { event.preventDefault(); cy.zoom(cy.zoom() * .8); }
    else if (event.key === 'Home') { event.preventDefault(); cy.fit(undefined, 28); }
    else if (event.key === 'Enter') openLink.click();
  });
  search.addEventListener('change', () => {
    const query = search.value.trim().toLocaleLowerCase('ko');
    const match = [...conceptsById.values()].find((concept) => concept.title.toLocaleLowerCase('ko') === query
      || concept.terms?.some((term) => term.toLocaleLowerCase('ko') === query));
    if (match) recenter(match.id);
  });
  if (allowGlobal) {
    const globalButton = button('전체', '319개 개념 전체 그래프', () => {
      global = !global;
      globalButton.textContent = global ? '로컬' : '전체';
      globalButton.title = global ? '현재 개념 주변 그래프로 돌아가기' : '319개 개념 전체 그래프';
      rebuild();
    });
    toolbar.append(globalButton);
  }

  canvas.textContent = '그래프 엔진을 불러오는 중…';
  loadCytoscape().then((cytoscape) => {
    if (disposed) return;
    canvas.textContent = '';
    cy = cytoscape({
      container: canvas,
      elements: [],
      minZoom: .16,
      maxZoom: 3.5,
      wheelSensitivity: .22,
      boxSelectionEnabled: false,
      style: [
        { selector: 'node', style: { 'background-color': '#817a70', label: 'data(label)', color: '#f8f3e9', 'font-size': 10, 'font-weight': 650, 'text-wrap': 'wrap', 'text-max-width': 92, 'text-valign': 'center', 'text-halign': 'center', width: 32, height: 32, 'overlay-opacity': 0 } },
        { selector: 'node.is-center', style: { 'background-color': '#9b4d3b', width: 54, height: 54, 'font-size': 12, 'font-weight': 800, 'border-width': 3, 'border-color': '#f2e5ce' } },
        { selector: 'node:selected', style: { 'border-width': 3, 'border-color': '#fff' } },
        { selector: 'edge', style: { width: 1.4, opacity: .68, 'curve-style': 'bezier', 'line-color': '#aaa49a' } },
        { selector: 'edge[relation="prerequisite"]', style: { 'line-color': '#82a9c9', 'target-arrow-color': '#82a9c9', 'target-arrow-shape': 'triangle' } },
        { selector: 'edge[relation="next"]', style: { 'line-color': '#d7a45b' } },
        { selector: 'edge[relation="related"]', style: { 'line-style': 'dashed' } },
        { selector: 'edge[relation="backlink"]', style: { 'line-color': '#a58bc5' } },
        { selector: '.faded', style: { opacity: .09, 'text-opacity': .09 } },
        { selector: '.highlighted', style: { opacity: 1, 'text-opacity': 1, 'z-index': 9 } }
      ]
    });
    host._conceptGraph = cy;
    cy.on('tap', 'node', (event) => recenter(event.target.id()));
    cy.on('mouseover', 'node', (event) => {
      const node = event.target; cy.elements().addClass('faded');
      node.closedNeighborhood().removeClass('faded').addClass('highlighted');
      updateStatus(node.id());
    });
    cy.on('mouseout', 'node', () => { cy.elements().removeClass('faded highlighted'); updateStatus(center); });
    rebuild();
  }).catch((error) => { canvas.textContent = error.message; });

  host._conceptGraphDestroy = () => { disposed = true; cy?.destroy(); delete host._conceptGraph; };
}
