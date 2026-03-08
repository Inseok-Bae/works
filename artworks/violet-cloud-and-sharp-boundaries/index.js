import { autorun } from 'mobx';
import readme_source from './README.md?raw';
import { render_readme } from '../../shared/utils/util.js';
import { initThoughtOverlay } from '../../shared/utils/thought-overlay.js';
import { initI18n } from '../../shared/utils/i18n.js';
import { acting } from './acting.js';

const { language, t } = initI18n();
const { world, publicState } = acting({ language });

const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d', { alpha: false });

const logCountEl = document.getElementById('logCount');
const metricsEl = document.getElementById('metrics');
const conceptualLogEl = document.getElementById('conceptualLog');

render_readme('readme_section', readme_source);
initThoughtOverlay();

function clamp01(value) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function createMetricRow({ id, label, gradient }) {
  const root = document.createElement('div');
  root.className = 'metric';
  root.dataset.id = id;

  const labelEl = document.createElement('div');
  labelEl.className = 'label';
  labelEl.textContent = label;

  const bar = document.createElement('div');
  bar.className = 'bar';
  const fill = document.createElement('div');
  fill.className = 'fill';
  if (gradient) fill.style.background = gradient;
  bar.appendChild(fill);

  const valueEl = document.createElement('div');
  valueEl.className = 'value';
  valueEl.textContent = '0.00';

  root.appendChild(labelEl);
  root.appendChild(bar);
  root.appendChild(valueEl);

  return { root, fill, valueEl };
}

const metricRows = [
  createMetricRow({
    id: 'fogPressure',
    label: t('violet.metrics.fog'),
    gradient: 'linear-gradient(90deg, rgba(203,179,255,0.45), rgba(139,92,246,0.95))',
  }),
  createMetricRow({
    id: 'edgePressure',
    label: t('violet.metrics.edge'),
    gradient: 'linear-gradient(90deg, rgba(245,243,255,0.35), rgba(245,243,255,0.95))',
  }),
  createMetricRow({
    id: 'residue',
    label: t('violet.metrics.residue'),
    gradient: 'linear-gradient(90deg, rgba(216,195,138,0.35), rgba(216,195,138,0.95))',
  }),
  createMetricRow({
    id: 'orientationError',
    label: t('violet.metrics.orient'),
    gradient: 'linear-gradient(90deg, rgba(245,243,255,0.25), rgba(199,255,74,0.75))',
  }),
  createMetricRow({
    id: 'voicePulse',
    label: t('violet.metrics.voice'),
    gradient: 'linear-gradient(90deg, rgba(203,179,255,0.35), rgba(203,179,255,0.95))',
  }),
  createMetricRow({
    id: 'paintingCommit',
    label: t('violet.metrics.commit'),
    gradient: 'linear-gradient(90deg, rgba(139,92,246,0.35), rgba(199,255,74,0.85))',
  }),
  createMetricRow({
    id: 'motherDistance',
    label: t('violet.metrics.motherDistance'),
    gradient: 'linear-gradient(90deg, rgba(245,243,255,0.25), rgba(139,92,246,0.85))',
  }),
];

metricRows.forEach((r) => metricsEl.appendChild(r.root));
const overlayLabels = {
  listener: t('violet.overlay.listener'),
  mother: t('violet.overlay.mother'),
  voice: t('violet.overlay.voice'),
  metricFog: t('violet.overlay.metricFog'),
  metricEdge: t('violet.overlay.metricEdge'),
  metricResidue: t('violet.overlay.metricResidue'),
  metricOrient: t('violet.overlay.metricOrient'),
};

function renderConceptualLog(entries) {
  conceptualLogEl.innerHTML = '';

  const recent = entries.slice(-10).reverse();
  if (recent.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'conceptual-empty';
    empty.textContent = t('violet.conceptual.empty');
    conceptualLogEl.appendChild(empty);
    return;
  }

  for (const item of recent) {
    const row = document.createElement('div');
    row.className = 'conceptual-item';

    const time = document.createElement('div');
    time.className = 'conceptual-time';
    time.textContent = item.clock ?? '';

    const text = document.createElement('div');
    text.className = 'conceptual-text';
    text.textContent = item.text ?? '';

    row.appendChild(time);
    row.appendChild(text);
    conceptualLogEl.appendChild(row);
  }
}

autorun(() => {
  const m = publicState.metrics;
  for (const row of metricRows) {
    const v = clamp01(m[row.root.dataset.id] ?? 0);
    row.fill.style.width = `${(v * 100).toFixed(1)}%`;
    row.valueEl.textContent = v.toFixed(2);
  }
  logCountEl.textContent = String(publicState.logCount ?? 0);
});

autorun(() => {
  const conceptualEntries = publicState.traces.conceptualLog ?? [];
  renderConceptualLog(conceptualEntries);
});

// --- Controls (intentions only; no instant world effects)

document.getElementById('zoomToggle').addEventListener('click', () => {
  world.enqueueIntention({ type: 'TOGGLE_ZOOM', params: {} });
});
document.getElementById('commitPainting').addEventListener('click', () => {
  world.enqueueIntention({ type: 'COMMIT_PAINTING', params: {} });
});
document.getElementById('resetSoft').addEventListener('click', () => {
  world.enqueueIntention({ type: 'RESET_SOFT', params: {} });
});

const listenHoldButton = document.getElementById('listenHold');
let listenTimer = null;
function listenOnce() {
  world.enqueueIntention({ type: 'LISTEN_HOLD', params: {} });
}
function startListenLoop() {
  if (listenTimer) return;
  listenOnce();
  listenTimer = setInterval(() => listenOnce(), 200);
}
function stopListenLoop() {
  if (!listenTimer) return;
  clearInterval(listenTimer);
  listenTimer = null;
}
listenHoldButton.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  listenHoldButton.setPointerCapture(e.pointerId);
  startListenLoop();
});
listenHoldButton.addEventListener('pointerup', (e) => {
  stopListenLoop();
  try {
    listenHoldButton.releasePointerCapture(e.pointerId);
  } catch (_) {
    // ignore
  }
});
listenHoldButton.addEventListener('pointercancel', stopListenLoop);
listenHoldButton.addEventListener('lostpointercapture', stopListenLoop);

// --- Optional assets (developer-attached files under `./assets/`; no user upload)

let paintingBitmap = null;
let fogVideoEl = null;
let audioBuffer = null;

function assetUrl(filename) {
  return `./assets/${filename}`;
}

async function tryFetchBlob(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  return res.blob();
}

async function firstSuccessful(candidates, loader) {
  for (const c of candidates) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const v = await loader(c);
      if (v) return v;
    } catch (_) {
      // try next
    }
  }
  return null;
}

async function loadPaintingBitmap() {
  const candidates = ['painting.jpg', 'painting.png', 'painting.webp'].map(assetUrl);
  return firstSuccessful(candidates, async (url) => {
    const blob = await tryFetchBlob(url);
    return createImageBitmap(blob);
  });
}

async function loadFogVideo() {
  const candidates = ['fog.webm', 'fog.mp4'].map(assetUrl);
  return firstSuccessful(candidates, async (url) => {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('no video');
    // Use direct URL; live-server can serve it as-is.
    const video = document.createElement('video');
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    // Best-effort; if autoplay fails it's still usable as a texture once user interacts.
    await video.play().catch(() => {});
    return video;
  });
}

async function decodeAudioUrl(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('no audio');
  const arrayBuffer = await res.arrayBuffer();
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return audioContext.decodeAudioData(arrayBuffer);
}

async function loadVoiceAudio() {
  const candidates = ['voice.ogg', 'voice.mp3', 'voice.wav'].map(assetUrl);
  return firstSuccessful(candidates, decodeAudioUrl);
}

async function loadBundledAssets() {
  const [bmp, fog, audio] = await Promise.all([
    loadPaintingBitmap(),
    loadFogVideo(),
    loadVoiceAudio(),
  ]);

  if (bmp) paintingBitmap = bmp;
  if (fog) fogVideoEl = fog;
  if (audio) audioBuffer = audio;

  world.setAssets({ paintingBitmap: bmp ?? undefined, fogVideoEl: fog ?? undefined, audioBuffer: audio ?? undefined });
}

loadBundledAssets().catch(() => {});

// --- Input mapping to intentions (delayed)

canvas.addEventListener('contextmenu', (e) => e.preventDefault());

const activePointers = new Map(); // pointerId -> { clientX, clientY, pointerType }
let singleStroke = null; // { type, pointerId, pointerType, startedAtMs, points: [{x,y}] }
let dualStroke = null; // { pointerIds: [a,b], points: [{x,y}] }
let pinchState = null; // { pointerIds: [a,b], lastDistPx, lastSentAtMs }
let lastPointerMoveMs = 0;
let lastWheelMs = 0;
const MOVE_THROTTLE_MS = 24;
const WHEEL_THROTTLE_MS = 120;

function toNormPointFromClient(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = ((clientY - rect.top) / rect.height) * 2 - 1;
  return { x: clamp01((x + 1) / 2) * 2 - 1, y: clamp01((y + 1) / 2) * 2 - 1 };
}

function touchPointerIds() {
  return Array.from(activePointers.entries())
    .filter(([, p]) => p.pointerType === 'touch')
    .map(([id]) => id);
}

function distancePx(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function centroidPoint(a, b) {
  return { clientX: (a.clientX + b.clientX) * 0.5, clientY: (a.clientY + b.clientY) * 0.5 };
}

function pushPoint(points, p) {
  const last = points[points.length - 1];
  const dx = p.x - last.x;
  const dy = p.y - last.y;
  if (dx * dx + dy * dy < 0.00008) return;
  points.push(p);
  if (points.length > 220) points.splice(0, points.length - 220);
}

function resetPinchIfNeeded() {
  const ids = touchPointerIds();
  if (ids.length !== 2) {
    pinchState = null;
    return;
  }

  if (
    pinchState &&
    pinchState.pointerIds[0] === ids[0] &&
    pinchState.pointerIds[1] === ids[1]
  ) {
    return;
  }

  const a = activePointers.get(ids[0]);
  const b = activePointers.get(ids[1]);
  if (!a || !b) return;
  pinchState = {
    pointerIds: [ids[0], ids[1]],
    lastDistPx: distancePx(a, b),
    lastSentAtMs: 0,
  };
}

function maybeSendPinch(nowMs) {
  if (!pinchState) return;
  const [idA, idB] = pinchState.pointerIds;
  const a = activePointers.get(idA);
  const b = activePointers.get(idB);
  if (!a || !b) return;

  const dist = distancePx(a, b);
  const delta = dist - pinchState.lastDistPx;
  pinchState.lastDistPx = dist;

  if (Math.abs(delta) < 1.5) return;
  if (nowMs - pinchState.lastSentAtMs < 90) return;

  const amount = clamp01(Math.abs(delta) / 140);
  world.enqueueIntention({ type: 'PULL_EAR', params: { amount } });
  pinchState.lastSentAtMs = nowMs;
}

function endSingleStroke() {
  if (!singleStroke) return;
  world.enqueueIntention({ type: singleStroke.type, params: { points: singleStroke.points } });
  singleStroke = null;
}

function endDualStroke() {
  if (!dualStroke) return;
  world.enqueueIntention({ type: 'SMUDGE_STROKE', params: { points: dualStroke.points } });
  dualStroke = null;
}

canvas.addEventListener('pointerdown', (e) => {
  // Keyboard modifiers are not assumed; mobile-first pointer gestures only.
  canvas.setPointerCapture(e.pointerId);
  activePointers.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY, pointerType: e.pointerType });

  const nowMs = Date.now();

  if (e.pointerType === 'mouse') {
    if (singleStroke || dualStroke) return;
    const type = e.button === 2 ? 'SMUDGE_STROKE' : 'SHARPEN_STROKE';
    singleStroke = {
      type,
      pointerId: e.pointerId,
      pointerType: 'mouse',
      startedAtMs: nowMs,
      points: [toNormPointFromClient(e.clientX, e.clientY)],
    };
    return;
  }

  if (e.pointerType === 'pen') {
    if (singleStroke || dualStroke) return;
    singleStroke = {
      type: 'SHARPEN_STROKE',
      pointerId: e.pointerId,
      pointerType: 'pen',
      startedAtMs: nowMs,
      points: [toNormPointFromClient(e.clientX, e.clientY)],
    };
    return;
  }

  resetPinchIfNeeded();

  const touchIds = touchPointerIds();
  if (touchIds.length === 2 && !dualStroke) {
    const shouldPromoteToDual =
      !singleStroke ||
      (singleStroke.pointerType === 'touch' &&
        (nowMs - singleStroke.startedAtMs < 180 || (singleStroke.points?.length ?? 0) <= 2));

    if (shouldPromoteToDual) {
      // Cancel a not-yet-meaningful single stroke and treat this as a 2-finger smudge gesture.
      singleStroke = null;
      const a = activePointers.get(touchIds[0]);
      const b = activePointers.get(touchIds[1]);
      if (!a || !b) return;
      const c = centroidPoint(a, b);
      dualStroke = {
        pointerIds: [touchIds[0], touchIds[1]],
        points: [toNormPointFromClient(c.clientX, c.clientY)],
      };
    }
    return;
  }

  if (touchIds.length === 1 && !singleStroke && !dualStroke) {
    singleStroke = {
      type: 'SHARPEN_STROKE',
      pointerId: e.pointerId,
      pointerType: 'touch',
      startedAtMs: nowMs,
      points: [toNormPointFromClient(e.clientX, e.clientY)],
    };
  }
});

canvas.addEventListener('pointermove', (e) => {
  const p = activePointers.get(e.pointerId);
  if (p) {
    p.clientX = e.clientX;
    p.clientY = e.clientY;
  }

  const nowMs = Date.now();
  if (nowMs - lastPointerMoveMs < MOVE_THROTTLE_MS) return;
  lastPointerMoveMs = nowMs;
  resetPinchIfNeeded();
  maybeSendPinch(nowMs);

  if (dualStroke) {
    const [idA, idB] = dualStroke.pointerIds;
    const a = activePointers.get(idA);
    const b = activePointers.get(idB);
    if (!a || !b) return;
    const c = centroidPoint(a, b);
    pushPoint(dualStroke.points, toNormPointFromClient(c.clientX, c.clientY));
    return;
  }

  if (singleStroke && e.pointerId === singleStroke.pointerId) {
    pushPoint(singleStroke.points, toNormPointFromClient(e.clientX, e.clientY));
  }
});

function onPointerEnd(e) {
  activePointers.delete(e.pointerId);
  resetPinchIfNeeded();

  if (dualStroke && dualStroke.pointerIds.includes(e.pointerId)) {
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (_) {
      // ignore
    }
    endDualStroke();
    return;
  }

  if (singleStroke && e.pointerId === singleStroke.pointerId) {
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (_) {
      // ignore
    }
    endSingleStroke();
  }
}

canvas.addEventListener('pointerup', onPointerEnd);
canvas.addEventListener('pointercancel', onPointerEnd);

canvas.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
    const nowMs = Date.now();
    if (nowMs - lastWheelMs < WHEEL_THROTTLE_MS) return;
    lastWheelMs = nowMs;
    const amount = clamp01(Math.abs(e.deltaY) / 800);
    world.enqueueIntention({ type: 'PULL_EAR', params: { amount } });
  },
  { passive: false }
);

// --- Canvas rendering (no assets required)

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width === w && canvas.height === h) return;
  canvas.width = w;
  canvas.height = h;
}

window.addEventListener('resize', resizeCanvas, { passive: true });
resizeCanvas();

const puffs = Array.from({ length: 60 }, (_, i) => {
  const a = (i / 60) * Math.PI * 2;
  const r = 0.28 + ((i * 17) % 23) / 120;
  return {
    x: Math.cos(a) * r * 0.85 + (Math.random() * 2 - 1) * 0.1,
    y: Math.sin(a) * r * 0.55 + (Math.random() * 2 - 1) * 0.12,
    radius: 90 + ((i * 97) % 120),
    phase: Math.random() * 1000,
  };
});

function mapX(normX, w) {
  return (normX * 0.5 + 0.5) * w;
}
function mapY(normY, h) {
  return (normY * 0.5 + 0.5) * h;
}

function drawBackground({ w, h, fogPressure, purpleSaturation }) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  const top = `rgba(20,6,43,${0.9 + purpleSaturation * 0.06})`;
  const mid = `rgba(7,2,13,${0.88 + fogPressure * 0.08})`;
  g.addColorStop(0, top);
  g.addColorStop(0.6, mid);
  g.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function drawFog({ w, h, t, fogPressure, purpleSaturation }) {
  const alphaBase = 0.04 + fogPressure * 0.12;
  for (let i = 0; i < puffs.length; i++) {
    const p = puffs[i];
    const dx = Math.sin((t + p.phase) * 0.0005 + i * 1.7) * (0.16 + fogPressure * 0.18);
    const dy = Math.cos((t + p.phase) * 0.00042 + i * 2.1) * (0.16 + fogPressure * 0.16);
    const x = mapX(p.x + dx, w);
    const y = mapY(p.y + dy, h);
    const rad = p.radius * (0.65 + fogPressure * 0.6);

    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, `rgba(203,179,255,${alphaBase * (0.9 + purpleSaturation * 0.4)})`);
    g.addColorStop(0.6, `rgba(139,92,246,${alphaBase * (0.5 + purpleSaturation * 0.3)})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  if (fogVideoEl && fogVideoEl.readyState >= 2) {
    ctx.save();
    ctx.globalAlpha = 0.05 + fogPressure * 0.12;
    ctx.drawImage(fogVideoEl, 0, 0, w, h);
    ctx.restore();
  }
}

function drawBoundary({ w, h, t, edgePressure, residue, segments }) {
  const lineW = 2 + edgePressure * 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'miter';
  ctx.lineWidth = lineW;

  const nowMs = t;
  for (const s of segments) {
    const age = nowMs - s.bornMs;
    const fade = clamp01(1 - age / 8000);
    if (fade <= 0) continue;
    ctx.strokeStyle = `rgba(245,243,255,${fade * (0.12 + edgePressure * 0.88)})`;
    ctx.beginPath();
    ctx.moveTo(mapX(s.x1, w), mapY(s.y1, h));
    ctx.lineTo(mapX(s.x2, w), mapY(s.y2, h));
    ctx.stroke();
  }

  if (residue > 0.18 && segments.length > 0) {
    // tartar specks near edges (delayed cost)
    const specks = Math.floor(18 + residue * 64);
    ctx.fillStyle = `rgba(216,195,138,${0.08 + residue * 0.25})`;
    for (let i = 0; i < specks; i++) {
      const s = segments[(i * 17 + Math.floor(t / 50)) % segments.length];
      const k = ((i * 73) % 100) / 100;
      const x = mapX(s.x1 + (s.x2 - s.x1) * k, w) + Math.sin(t * 0.01 + i) * 2.2;
      const y = mapY(s.y1 + (s.y2 - s.y1) * k, h) + Math.cos(t * 0.012 + i) * 2.2;
      const r = 0.8 + ((i * 13) % 5) * 0.25;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawOdor({ w, h, t, residue, particles }) {
  const threshold = 0.35;
  const active = residue > threshold || particles.length > 0;
  if (!active) return;

  const y0 = h * 0.88;
  const amp = 12 + residue * 26;
  const step = 14;
  ctx.save();
  ctx.strokeStyle = `rgba(199,255,74,${0.12 + residue * 0.42})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x <= w + step; x += step) {
    const n = Math.sin(t * 0.006 + x * 0.02) + Math.sin(t * 0.0013 + x * 0.05) * 0.6;
    const y = y0 + n * amp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  for (const p of particles) {
    const x = mapX(p.x, w);
    const y = mapY(p.y, h);
    const a = clamp01(p.life) * (0.35 + residue * 0.4);
    ctx.fillStyle = `rgba(199,255,74,${a})`;
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawVoice({ w, h, voicePulse }) {
  if (voicePulse <= 0.02) return;
  const alpha = clamp01(voicePulse) * 0.92;
  const scale = 0.98 + voicePulse * 0.07;

  ctx.save();
  ctx.translate(w / 2, h * 0.45);
  ctx.scale(scale, scale);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '600 44px ui-serif, Georgia, Cambria, Times, serif';
  ctx.fillStyle = `rgba(245,243,255,${alpha})`;
  ctx.fillText('...', 0, 0);
  ctx.restore();
}

function drawPainting({ w, h, t, commit, locked }) {
  if (commit <= 0.01 && !locked) return;

  const x = w * 0.08;
  const y = h * 0.12;
  const ww = w * 0.28;
  const hh = h * 0.34;

  const frameAlpha = 0.15 + commit * 0.8;
  ctx.save();
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = `rgba(245,243,255,${frameAlpha})`;
  ctx.strokeRect(x, y, ww, hh);

  ctx.save();
  ctx.globalAlpha = 0.08 + commit * 0.32;
  if (paintingBitmap) {
    ctx.drawImage(paintingBitmap, x + 2, y + 2, ww - 4, hh - 4);
  } else {
    const g = ctx.createLinearGradient(x, y, x + ww, y + hh);
    g.addColorStop(0, 'rgba(203,179,255,0.9)');
    g.addColorStop(0.7, 'rgba(139,92,246,0.7)');
    g.addColorStop(1, 'rgba(20,6,43,0.95)');
    ctx.fillStyle = g;
    ctx.fillRect(x + 2, y + 2, ww - 4, hh - 4);

    // subtle movement inside the painting (even without assets)
    ctx.globalAlpha *= 0.55;
    ctx.fillStyle = 'rgba(245,243,255,0.08)';
    const bands = 10;
    for (let i = 0; i < bands; i++) {
      const yy = y + 2 + ((i + 0.5) / bands) * (hh - 4);
      const shift = Math.sin(t * 0.0012 + i * 1.7) * 12 * commit;
      ctx.fillRect(x + 2 + shift, yy, ww - 4, 2);
    }
  }
  ctx.restore();

  if (locked) {
    ctx.fillStyle = `rgba(199,255,74,${0.08 + commit * 0.22})`;
    ctx.fillRect(x, y + hh + 10, ww, 2);
  }
  ctx.restore();
}

function drawZoomOutOverlay({ w, h, t, metrics }) {
  const cx = w * 0.5;
  const cy = h * 0.62;
  const voice = { x: cx, y: h * 0.25 };
  const listener = { x: w * 0.36, y: cy };
  const mother = { x: w * 0.64, y: cy };

  const fog = metrics.fogPressure;
  const edge = metrics.edgePressure;
  const pulse = metrics.voicePulse;
  const dist = metrics.motherDistance;

  ctx.save();
  ctx.globalAlpha = 0.95;

  const linkAlpha = 0.1 + fog * 0.5;
  ctx.strokeStyle = `rgba(203,179,255,${linkAlpha})`;
  ctx.lineWidth = 1 + fog * 3;
  ctx.beginPath();
  ctx.moveTo(listener.x, listener.y);
  ctx.lineTo(voice.x, voice.y);
  ctx.stroke();

  ctx.strokeStyle = `rgba(245,243,255,${0.08 + edge * 0.32})`;
  ctx.lineWidth = 1 + edge * 2;
  ctx.beginPath();
  ctx.moveTo(mother.x, mother.y);
  ctx.lineTo(voice.x, voice.y);
  ctx.stroke();

  ctx.strokeStyle = `rgba(199,255,74,${0.06 + pulse * 0.4})`;
  ctx.lineWidth = 1 + pulse * 3;
  ctx.beginPath();
  ctx.moveTo(listener.x, listener.y);
  ctx.lineTo(mother.x, mother.y);
  ctx.stroke();

  function node({ x, y, label, fill, ring }) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ring;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 16 + Math.sin(t * 0.004 + x) * 1.6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(245,243,255,0.7)';
    ctx.font = '12px ui-sans-serif, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(label, x, y + 18);
  }

  node({
    ...listener,
    label: overlayLabels.listener,
    fill: 'rgba(245,243,255,0.55)',
    ring: `rgba(245,243,255,${0.08 + (1 - dist) * 0.22})`,
  });
  node({
    ...mother,
    label: overlayLabels.mother,
    fill: `rgba(203,179,255,${0.28 + (1 - dist) * 0.22})`,
    ring: `rgba(203,179,255,${0.06 + (1 - dist) * 0.25})`,
  });
  node({
    ...voice,
    label: overlayLabels.voice,
    fill: `rgba(139,92,246,${0.25 + pulse * 0.55})`,
    ring: `rgba(199,255,74,${0.04 + pulse * 0.25})`,
  });

  ctx.fillStyle = 'rgba(245,243,255,0.55)';
  ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(
    `${overlayLabels.metricFog}:${fog.toFixed(2)} ${overlayLabels.metricEdge}:${edge.toFixed(2)} ${overlayLabels.metricResidue}:${metrics.residue.toFixed(2)} ${overlayLabels.metricOrient}:${metrics.orientationError.toFixed(2)}`,
    cx,
    h * 0.94
  );

  ctx.restore();
}

let lastFrameMs = performance.now();
function frame(nowMs) {
  resizeCanvas();
  const w = canvas.width;
  const h = canvas.height;
  const t = Date.now();
  const dt = Math.min(0.05, Math.max(0, (nowMs - lastFrameMs) / 1000));
  lastFrameMs = nowMs;

  const m = publicState.metrics;
  const traces = publicState.traces;

  // camera distortion (orientation), subtle but persistent
  const vibHz = 7.4;
  const vib = Math.sin((t / 1000) * Math.PI * 2 * vibHz);
  const maxRot = (2.2 * Math.PI) / 180;
  const rot = m.orientationError * (0.35 + 0.65 * vib) * maxRot;
  const drift = m.orientationError * 22 * Math.sin(t * 0.0021);

  ctx.save();
  ctx.translate(w / 2 + drift, h / 2);
  ctx.rotate(rot);
  ctx.translate(-w / 2, -h / 2);

  drawBackground({ w, h, fogPressure: m.fogPressure, purpleSaturation: 0.24 + m.fogPressure * 0.76 });
  drawFog({ w, h, t, fogPressure: m.fogPressure, purpleSaturation: 0.24 + m.fogPressure * 0.76 });
  drawBoundary({ w, h, t, edgePressure: m.edgePressure, residue: m.residue, segments: traces.boundarySegments });
  drawOdor({ w, h, t, residue: m.residue, particles: traces.odorParticles });
  drawPainting({ w, h, t, commit: m.paintingCommit, locked: traces.painting.locked });
  drawVoice({ w, h, voicePulse: m.voicePulse });

  if (publicState.mode === 'zoom-out') {
    drawZoomOutOverlay({ w, h, t, metrics: m });
  }

  ctx.restore();

  // A tiny dt-dependent fade on the canvas edges (keeps it breathing without huge cost)
  if (dt > 0) {
    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, w, 1);
    ctx.fillRect(0, h - 1, w, 1);
    ctx.restore();
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

window.addEventListener('beforeunload', () => {
  stopListenLoop();
  world.stop();
});


