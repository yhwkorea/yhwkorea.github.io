import { journeys } from './site-map.js';

const KEY = 'pqc-journey-v2';
const OLD_KEY = 'pqc-learning-path-v1';
const listeners = new Set();
let state = load();

function safeUrl(value) {
  try {
    const url = new URL(value, location.href);
    return url.origin === location.origin ? `${url.pathname}${url.hash}` : null;
  } catch (_) { return null; }
}

function validFrame(frame) {
  return frame && typeof frame.id === 'string' && typeof frame.label === 'string' &&
    typeof frame.href === 'string' && safeUrl(frame.href);
}

function load() {
  sessionStorage.removeItem(OLD_KEY);
  try {
    const value = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (!value || value.schema !== 2 || !journeys[value.goalId] || !Array.isArray(value.frames) || !value.frames.every(validFrame)) {
      sessionStorage.removeItem(KEY);
      return null;
    }
    return value;
  } catch (_) {
    sessionStorage.removeItem(KEY);
    return null;
  }
}

function publish() {
  if (state) sessionStorage.setItem(KEY, JSON.stringify(state));
  else sessionStorage.removeItem(KEY);
  listeners.forEach((listener) => listener(state));
}

export function getJourney() { return state; }

export function startJourney(goalId, origin = {}) {
  const goal = journeys[goalId];
  if (!goal) return;
  const root = safeUrl(goal.root);
  state = {
    schema: 2,
    goalId,
    status: 'active',
    startedAt: Date.now(),
    frames: [{ id: `${Date.now()}-root`, nodeId: goalId, label: goal.label, href: root, sourceHref: safeUrl(origin.href || location.href), reason: origin.reason || '이 학습 경로를 직접 시작했습니다.' }]
  };
  publish();
}

export function descend({ nodeId, label, href, reason, sourceHref = location.href }) {
  if (!state) return;
  const destination = safeUrl(href);
  if (!destination) return;
  const repeated = state.frames.findIndex((frame) => frame.nodeId === nodeId && frame.href === destination);
  if (repeated >= 0) state.frames = state.frames.slice(0, repeated + 1);
  else state.frames.push({ id: `${Date.now()}-${state.frames.length}`, nodeId, label, href: destination, sourceHref: safeUrl(sourceHref), reason });
  state.status = 'active';
  publish();
}

export function reconcile() {
  if (!state) return;
  const here = `${location.pathname}${location.hash}`;
  const page = location.pathname;
  let index = state.frames.findIndex((frame) => frame.href === here);
  if (index < 0) index = state.frames.findIndex((frame) => new URL(frame.href, location.href).pathname === page);
  if (index >= 0) {
    state.frames = state.frames.slice(0, index + 1);
    state.status = 'active';
  } else state.status = 'paused';
  publish();
}

export function returnTo(index) {
  if (!state || index < 0 || index >= state.frames.length) return null;
  state.frames = state.frames.slice(0, index + 1);
  state.status = 'active';
  publish();
  return state.frames[index].href;
}

export function endJourney() { state = null; publish(); }
export function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }
