export function buildDependents(conceptsById) {
  const dependents = new Map([...conceptsById.keys()].map((id) => [id, []]));
  conceptsById.forEach((concept) => concept.prerequisites.forEach((id) => {
    dependents.get(id)?.push(concept.id);
  }));
  return dependents;
}

export function renderConceptGraph(host, {
  centerId,
  conceptsById,
  dependentsByConcept = buildDependents(conceptsById),
  hrefFor = (concept) => concept.target,
  onNavigate = () => {},
  limit = 14
}) {
  host.replaceChildren();
  host.classList.add('local-concept-graph');
  const center = conceptsById.get(centerId);
  if (!center) {
    host.textContent = '이 페이지에서 개념을 선택하면 주변 연결을 볼 수 있습니다.';
    return;
  }

  const seen = new Set([center.id]);
  const nodes = [];
  const add = (ids, relation) => (ids || []).forEach((id) => {
    if (seen.has(id) || !conceptsById.has(id)) return;
    seen.add(id);
    nodes.push({ id, relation });
  });
  add(center.prerequisites, 'prerequisite');
  add(center.next, 'next');
  add(center.related, 'related');
  add(dependentsByConcept.get(center.id), 'backlink');
  const visible = nodes.slice(0, limit);

  const heading = document.createElement('div');
  heading.className = 'local-graph-heading';
  const title = document.createElement('strong');
  title.textContent = center.title;
  const hint = document.createElement('span');
  hint.textContent = '노드를 누르면 해당 개념으로 이동합니다.';
  heading.append(title, hint);

  const canvas = document.createElement('div');
  canvas.className = 'local-graph-canvas';
  canvas.setAttribute('role', 'group');
  canvas.setAttribute('aria-label', `${center.title} 주변 개념 그래프`);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('aria-hidden', 'true');
  visible.forEach((node, index) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index / Math.max(visible.length, 1));
    const radiusX = visible.length > 9 ? 43 : 39;
    const radiusY = visible.length > 9 ? 40 : 36;
    node.x = 50 + radiusX * Math.cos(angle);
    node.y = 50 + radiusY * Math.sin(angle);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '50'); line.setAttribute('y1', '50');
    line.setAttribute('x2', String(node.x)); line.setAttribute('y2', String(node.y));
    line.setAttribute('class', `graph-edge graph-edge-${node.relation}`);
    svg.append(line);
  });
  canvas.append(svg);

  const centerNode = document.createElement('span');
  centerNode.className = 'graph-node graph-node-center';
  centerNode.textContent = center.title;
  centerNode.style.left = '50%'; centerNode.style.top = '50%';
  canvas.append(centerNode);
  visible.forEach((node) => {
    const concept = conceptsById.get(node.id);
    const link = document.createElement('a');
    link.className = `graph-node graph-node-${node.relation}`;
    link.href = hrefFor(concept);
    link.textContent = concept.title;
    link.style.left = `${node.x}%`; link.style.top = `${node.y}%`;
    link.dataset.relation = node.relation;
    onNavigate(link, concept, node.relation);
    canvas.append(link);
  });

  const labels = { prerequisite: '선수', next: '후속', related: '관련', backlink: '이 개념을 사용' };
  const legend = document.createElement('div');
  legend.className = 'local-graph-legend';
  Object.entries(labels).forEach(([relation, label]) => {
    const item = document.createElement('span');
    item.className = `graph-legend-${relation}`;
    item.textContent = label;
    legend.append(item);
  });
  host.append(heading, canvas, legend);
  if (nodes.length > visible.length) {
    const more = document.createElement('small');
    more.className = 'local-graph-more';
    more.textContent = `연결 ${nodes.length - visible.length}개는 화면 복잡도를 줄이기 위해 생략했습니다.`;
    host.append(more);
  }
}
