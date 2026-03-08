import { autorun } from 'mobx';
import { acting } from './acting.js';
import readme_source from './README.md?raw';
import { render_readme } from '../../shared/utils/util.js';
import { initThoughtOverlay } from '../../shared/utils/thought-overlay.js';
import { initI18n } from '../../shared/utils/i18n.js';

let thoughtOverlayController;
const { language, t } = initI18n({
  utilityActions: [
    { labelKey: 'common.thought.reopen', onSelect: () => thoughtOverlayController?.open() },
    { labelKey: 'common.thought.backToIndex', href: '../../index.html' },
  ],
});
const { world, publicState } = acting({ language, autoStart: false, timeScale: 1.25 });

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d', { alpha: false });
const conceptLogEl = document.getElementById('conceptLog');
const oortCanvas = document.getElementById('oortHud');
const oortCtx = oortCanvas ? oortCanvas.getContext('2d') : null;

render_readme('readme_section', readme_source);
thoughtOverlayController = initThoughtOverlay();
const thoughtOverlay = thoughtOverlayController;

let loopStarted = false;
let loopEnded = false;
let loopStartMs = null;
let focusNorm = { x: 0.5, y: 0.5 };
let lastPointerForDoor = null;
let renderedConceptSignature = null;
const LOOP_DURATION_MS = 45000;
const TAU = Math.PI * 2;
const STAGE = {
  redAt: 1 / 6,
  greenAt: 2 / 6,
  bloomAt: 3 / 6,
  stainAt: 4 / 6,
  voidAt: 5 / 6,
};
const OORT_STOPS = [
  { at: 0, rgb: [246, 211, 101] },
  { at: STAGE.redAt, rgb: [239, 68, 68] },
  { at: STAGE.greenAt, rgb: [34, 197, 94] },
  { at: STAGE.bloomAt, rgb: [116, 114, 232] },
  { at: STAGE.stainAt, rgb: [168, 162, 158] },
  { at: STAGE.voidAt, rgb: [212, 208, 201] },
  { at: 1, rgb: [247, 242, 232] },
];
const BLOOM_COLORS = [
  [246, 211, 101],
  [239, 68, 68],
  [236, 72, 153],
  [168, 85, 247],
  [99, 102, 241],
  [34, 197, 94],
  [6, 182, 212],
  [251, 146, 60],
  [49, 46, 129],
];
const BLOOM_DARKS = [
  [32, 30, 58],
  [44, 24, 66],
  [24, 36, 54],
];
const OORT_POINT_COUNT = 560;
const oortPoints = Array.from({ length: OORT_POINT_COUNT }, () => {
  const band = Math.random() < 0.38;
  return {
    angle: Math.random() * TAU,
    radius: band ? 0.28 + Math.random() * 0.42 : 0.55 + Math.random() * 0.45,
    depth: Math.random(),
    size: band ? 0.6 + Math.random() * 1.6 : 0.4 + Math.random() * 1.2,
    drift: Math.random() * TAU,
    band,
  };
});
const doorState = {
  anchor: {
    x: 0.5 + (Math.random() - 0.5) * 0.12,
    y: 0.44 + (Math.random() - 0.5) * 0.1,
  },
  radius01: 0.2,
  openedAtMs: null,
  hintAtMs: 0,
  hovered: false,
  dust: Array.from({ length: 26 }, () => ({
    angle: Math.random() * TAU,
    radius: 1 + Math.random() * 0.7,
    size: 0.5 + Math.random() * 1.2,
    phase: Math.random() * TAU,
  })),
};
const DOOR_TRIGGER_PAD = 0.16;

function startLoopAt(point, nowMs = Date.now()) {
  if (loopStarted) return;
  loopStarted = true;
  loopStartMs = nowMs;
  doorState.openedAtMs = loopStartMs;
  doorState.hovered = false;
  world.start();
  if (typeof world.beginNarrative === 'function') {
    world.beginNarrative({ x01: point.x, y01: point.y });
  } else {
    world.enqueueIntention({
      type: 'OFFER_WARMTH',
      params: { x01: point.x, y01: point.y, strength01: 0.35 },
    });
  }
  canvas.removeEventListener('pointerdown', beginLoopOnFirstTouch);
  canvas.removeEventListener('pointermove', beginLoopOnHover);
  canvas.removeEventListener('pointerenter', beginLoopOnHover);
  window.removeEventListener('pointermove', trackPointerForDoor);
}

const beginLoopOnFirstTouch = (event) => {
  if (loopStarted) return;
  if (thoughtOverlay.isOpen()) return;
  if (event && event.pointerType && !['touch', 'pen'].includes(event.pointerType)) return;
  const point = event ? pointInCanvas(event.clientX, event.clientY) : { x: 0.5, y: 0.5 };
  tryStartFromPoint(point, { hintOnMiss: true });
};

const beginLoopOnHover = (event) => {
  if (loopStarted) return;
  if (thoughtOverlay.isOpen()) return;
  if (event && event.pointerType === 'touch') return;
  const point = event ? pointInCanvas(event.clientX, event.clientY) : null;
  if (!point) {
    doorState.hovered = false;
    return;
  }
  focusNorm = point;
  tryStartFromPoint(point);
};

function trackPointerForDoor(event) {
  if (event.pointerType === 'touch') return;
  const point = pointInCanvas(event.clientX, event.clientY);
  if (!point) {
    if (!loopStarted) doorState.hovered = false;
    lastPointerForDoor = null;
    return;
  }
  focusNorm = point;
  lastPointerForDoor = { point, pointerType: event.pointerType ?? 'mouse' };
  if (loopStarted || thoughtOverlay.isOpen()) return;
  tryStartFromPoint(point);
}

function tryStartFromPoint(point, { hintOnMiss = false } = {}) {
  if (!point || loopStarted || thoughtOverlay.isOpen()) return false;
  focusNorm = point;
  doorState.hovered = isDoorHit(point, DOOR_TRIGGER_PAD);
  if (doorState.hovered) {
    startLoopAt(point);
    return true;
  }
  if (hintOnMiss) {
    doorState.hintAtMs = Date.now();
  }
  return false;
}

canvas.addEventListener('pointerdown', beginLoopOnFirstTouch, { passive: true });
canvas.addEventListener('pointermove', beginLoopOnHover, { passive: true });
canvas.addEventListener('pointerenter', beginLoopOnHover, { passive: true });
window.addEventListener('pointermove', trackPointerForDoor, { passive: true });
canvas.addEventListener(
  'pointerleave',
  () => {
    doorState.hovered = false;
  },
  { passive: true }
);

const previewCanvas = document.createElement('canvas');
const previewCtx = previewCanvas.getContext('2d', { alpha: false });
let previewImageData = null;

const grainCanvas = document.createElement('canvas');
grainCanvas.width = 256;
grainCanvas.height = 256;
const grainCtx = grainCanvas.getContext('2d');
const grainData = grainCtx.createImageData(grainCanvas.width, grainCanvas.height);
for (let i = 0; i < grainData.data.length; i += 4) {
  const n = 136 + Math.floor(Math.random() * 90);
  grainData.data[i] = n;
  grainData.data[i + 1] = n;
  grainData.data[i + 2] = n;
  grainData.data[i + 3] = 255;
}
grainCtx.putImageData(grainData, 0, 0);
const grainPattern = ctx.createPattern(grainCanvas, 'repeat');


function clamp01(value) {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function colorAt(progress01) {
  const clamped = clamp01(progress01);
  for (let i = 0; i < OORT_STOPS.length - 1; i += 1) {
    const a = OORT_STOPS[i];
    const b = OORT_STOPS[i + 1];
    if (clamped <= b.at) {
      const t = clamp01((clamped - a.at) / Math.max(0.0001, b.at - a.at));
      return lerpColor(a.rgb, b.rgb, t);
    }
  }
  return OORT_STOPS[OORT_STOPS.length - 1].rgb;
}

function bloomColorAt(seed01) {
  const wrapped = ((seed01 % 1) + 1) % 1;
  const scaled = wrapped * (BLOOM_COLORS.length - 1);
  const i0 = Math.floor(scaled);
  const i1 = Math.min(BLOOM_COLORS.length - 1, i0 + 1);
  const t = scaled - i0;
  return lerpColor(BLOOM_COLORS[i0], BLOOM_COLORS[i1], t);
}

function rgba(rgb, alpha) {
  return `rgba(${rgb[0].toFixed(1)}, ${rgb[1].toFixed(1)}, ${rgb[2].toFixed(1)}, ${alpha})`;
}

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / Math.max(0.0001, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function renderConceptLog(entries) {
  const recent = entries.slice(-12).reverse();
  const signature = recent.map((entry) => entry.id ?? `${entry.clock ?? ''}:${entry.text ?? ''}`).join('|');
  if (renderedConceptSignature === signature) return;
  renderedConceptSignature = signature;

  conceptLogEl.innerHTML = '';
  if (recent.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-log';
    empty.textContent = t('bleeding.concept.empty');
    conceptLogEl.appendChild(empty);
    return;
  }

  for (const entry of recent) {
    const row = document.createElement('div');
    row.className = 'concept-row';
    const time = document.createElement('div');
    time.className = 'concept-time';
    time.textContent = entry.clock ?? '';
    const text = document.createElement('div');
    text.className = 'concept-text';
    text.textContent = entry.text ?? '';
    row.append(time, text);
    conceptLogEl.appendChild(row);
  }
}

function loopProgress(nowMs) {
  if (!loopStarted || loopStartMs == null) return 0;
  const elapsed = Math.max(0, nowMs - loopStartMs);
  return clamp01(elapsed / LOOP_DURATION_MS);
}

function doorEllipse(width, height) {
  const minDim = Math.min(width, height);
  const radiusPx = minDim * doorState.radius01;
  return {
    cx: doorState.anchor.x * width,
    cy: doorState.anchor.y * height,
    rx: radiusPx * 0.88,
    ry: radiusPx * 1.2,
  };
}

function isDoorHit(point, pad01 = 0) {
  const rx = doorState.radius01 * (0.88 + pad01);
  const ry = doorState.radius01 * (1.2 + pad01 * 0.85);
  const dx = (point.x - doorState.anchor.x) / Math.max(0.0001, rx);
  const dy = (point.y - doorState.anchor.y) / Math.max(0.0001, ry);
  return dx * dx + dy * dy <= 1;
}

function drawDoor(width, height, nowMs) {
  const { cx, cy, rx, ry } = doorEllipse(width, height);
  let alpha = 1;
  if (doorState.openedAtMs != null) {
    alpha = clamp01(1 - (nowMs - doorState.openedAtMs) / 1400);
  }
  if (alpha <= 0) return;

  const hintBoost = clamp01(1 - (nowMs - doorState.hintAtMs) / 680);
  const hoverBoost = doorState.hovered ? 0.42 : 0;
  const pulse = 0.5 + 0.5 * Math.sin(nowMs * 0.0023);
  const glowAlpha = 0.24 + pulse * 0.24 + hintBoost * 0.3 + hoverBoost;

  ctx.save();
  ctx.globalAlpha = 0.95 * alpha;

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx * 1.95);
  glow.addColorStop(0, `rgba(246,211,101,${glowAlpha})`);
  glow.addColorStop(1, 'rgba(246,211,101,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx * 1.25, ry * 1.45, 0, 0, TAU);
  ctx.fill();

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx * 0.95);
  core.addColorStop(0, `rgba(247,242,232,${0.2 + hoverBoost * 0.3})`);
  core.addColorStop(1, 'rgba(247,242,232,0)');
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx * 0.72, ry * 0.9, 0, 0, TAU);
  ctx.fill();

  ctx.strokeStyle = `rgba(247,242,232,${0.72 + pulse * 0.2 + hoverBoost * 0.22})`;
  ctx.lineWidth = 2.6 + pulse * 1.9 + hoverBoost * 1.4;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, TAU);
  ctx.stroke();

  ctx.strokeStyle = `rgba(247,242,232,${0.35 + pulse * 0.2 + hoverBoost * 0.2})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx + rx * 0.18, cy - ry * 0.5);
  ctx.lineTo(cx + rx * 0.18, cy + ry * 0.5);
  ctx.stroke();

  ctx.globalCompositeOperation = 'screen';
  for (const dust of doorState.dust) {
    const drift = Math.sin(nowMs * 0.0014 + dust.phase) * 0.06;
    const dx = Math.cos(dust.angle) * (rx * dust.radius * (1 + drift));
    const dy = Math.sin(dust.angle) * (ry * dust.radius * (1 + drift));
    const size = dust.size * (0.7 + pulse * 0.4);
    ctx.fillStyle = `rgba(246,211,101,${(0.2 + hoverBoost * 0.2) * alpha})`;
    ctx.beginPath();
    ctx.arc(cx + dx, cy + dy, size, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function drawOortHud(targetCtx, width, height, nowMs, progress01) {
  if (!targetCtx) return;
  targetCtx.clearRect(0, 0, width, height);

  const minDim = Math.min(width, height);
  const cx = width * 0.5;
  const cy = height * 0.52;
  const base = minDim * 0.5;
  const baseCool = [120, 170, 230];
  const tint = 0.66 + progress01 * 0.28;
  const redPhase = smoothstep(STAGE.redAt - 0.03, STAGE.redAt + 0.03, progress01);
  const greenPhase = smoothstep(STAGE.greenAt - 0.03, STAGE.greenAt + 0.03, progress01);
  const bloomPhase =
    smoothstep(STAGE.bloomAt - 0.03, STAGE.bloomAt + 0.03, progress01) *
    (1 - smoothstep(STAGE.stainAt - 0.02, STAGE.stainAt + 0.03, progress01));
  const stainPhase = smoothstep(STAGE.stainAt - 0.04, STAGE.stainAt + 0.04, progress01);
  const voidPhase = smoothstep(STAGE.voidAt - 0.04, 1, progress01);
  const baseColor = lerpColor(baseCool, colorAt(progress01), tint);
  const stainColor = [167, 161, 156];
  const color = lerpColor(baseColor, stainColor, stainPhase * 0.78);
  const withRed = lerpColor(color, [239, 68, 68], redPhase * 0.44 * (1 - greenPhase * 0.25));
  const withGreen = lerpColor(withRed, [34, 197, 94], greenPhase * 0.38);
  const finalColor = lerpColor(withGreen, [247, 242, 232], voidPhase * 0.94);
  const density = lerp(1.04, 0.44, voidPhase);
  const swell = 1 + Math.sin(nowMs * 0.0012 + progress01 * TAU) * 0.045;
  const tilt = -0.38;
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);

  targetCtx.save();
  const halo = targetCtx.createRadialGradient(cx, cy, 0, cx, cy, base * 1.9);
  halo.addColorStop(0, rgba(finalColor, 0.24 * density));
  halo.addColorStop(0.6, rgba(finalColor, 0.09 * density));
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  targetCtx.fillStyle = halo;
  targetCtx.beginPath();
  targetCtx.ellipse(cx, cy, base * 1.25, base * 0.92, 0, 0, TAU);
  targetCtx.fill();

  targetCtx.globalCompositeOperation = 'screen';
  for (const point of oortPoints) {
    const spin = nowMs * 0.00018 * (point.band ? 1.2 : 0.72) * (1 + bloomPhase * 0.55);
    const angle = point.angle + spin + progress01 * TAU * 0.2;
    const ripple = Math.sin(nowMs * 0.0015 + point.drift) * 0.075;
    const radius = base * point.radius * swell * (1 + ripple) * (1 + bloomPhase * 0.16);
    const flatten = point.band ? 0.42 : 0.7;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * flatten;
    const tx = x * cosTilt - y * sinTilt;
    const ty = x * sinTilt + y * cosTilt;
    const prismSeed = point.depth * 0.74 + nowMs * 0.00009 + point.angle / TAU * 0.31;
    const prismColor = bloomPhase > 0.02 ? bloomColorAt(prismSeed) : colorAt(prismSeed % 1);
    const blended = lerpColor(finalColor, prismColor, bloomPhase * (0.98 + point.depth * 0.52));
    const pointColor = lerpColor(blended, [247, 242, 232], voidPhase * 0.86);
    const alpha = (point.band ? 0.28 : 0.16) * (0.58 + point.depth * 0.62) * density * (1 + bloomPhase * 0.64);
    targetCtx.fillStyle = rgba(pointColor, alpha);
    targetCtx.beginPath();
    targetCtx.arc(cx + tx, cy + ty, point.size, 0, TAU);
    targetCtx.fill();
  }

  if (bloomPhase > 0.02) {
    targetCtx.globalCompositeOperation = 'multiply';
    for (let i = 0; i < 4; i += 1) {
      const dark = BLOOM_DARKS[i % BLOOM_DARKS.length];
      const dx = Math.cos(nowMs * 0.0006 + i * 1.7) * base * 0.34;
      const dy = Math.sin(nowMs * 0.0008 + i * 1.4) * base * 0.24;
      const glow = targetCtx.createRadialGradient(
        cx + dx,
        cy + dy,
        base * 0.06,
        cx + dx,
        cy + dy,
        base * (0.34 + i * 0.08)
      );
      glow.addColorStop(0, rgba(dark, 0.2 * bloomPhase));
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      targetCtx.fillStyle = glow;
      targetCtx.fillRect(0, 0, width, height);
    }
  }

  const ringAngle = progress01 * TAU - Math.PI / 2;
  const ringR = base * 0.52;
  const ringX = Math.cos(ringAngle) * ringR;
  const ringY = Math.sin(ringAngle) * ringR * 0.45;
  const ringTx = ringX * cosTilt - ringY * sinTilt;
  const ringTy = ringX * sinTilt + ringY * cosTilt;

  targetCtx.globalCompositeOperation = 'source-over';
  targetCtx.strokeStyle = rgba(finalColor, 0.6);
  targetCtx.lineWidth = 1.5;
  targetCtx.beginPath();
  targetCtx.ellipse(cx, cy, ringR, ringR * 0.45, tilt, ringAngle - 0.38, ringAngle + 0.38);
  targetCtx.stroke();
  targetCtx.fillStyle = rgba(finalColor, 0.88);
  targetCtx.beginPath();
  targetCtx.arc(cx + ringTx, cy + ringTy, 2.8, 0, TAU);
  targetCtx.fill();
  targetCtx.restore();
}

autorun(() => {
  renderConceptLog(publicState.traces.conceptualLog ?? []);
});

const pointers = new Map();
let pinchState = null;
let lastZoomToggleMs = 0;
let primaryGesture = null;
let lastPointerMoveMs = 0;
let lastWheelMs = 0;
const MOVE_THROTTLE_MS = 24;
const WHEEL_THROTTLE_MS = 120;
const gesturesEnabled = false;

function normFromClient(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = clamp01((clientX - rect.left) / Math.max(1, rect.width));
  const y = clamp01((clientY - rect.top) / Math.max(1, rect.height));
  return { x, y };
}

function pointInCanvas(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  if (
    clientX < rect.left ||
    clientX > rect.right ||
    clientY < rect.top ||
    clientY > rect.bottom
  ) {
    return null;
  }
  return normFromClient(clientX, clientY);
}

function clearPrimaryTimers() {
  if (!primaryGesture) return;
  if (primaryGesture.holdTimeoutId) {
    clearTimeout(primaryGesture.holdTimeoutId);
    primaryGesture.holdTimeoutId = null;
  }
  if (primaryGesture.holdIntervalId) {
    clearInterval(primaryGesture.holdIntervalId);
    primaryGesture.holdIntervalId = null;
  }
}

function beginHold() {
  if (!primaryGesture || primaryGesture.holdActive) return;
  primaryGesture.holdActive = true;
  primaryGesture.holdStartedAtMs = Date.now();

  const sendHold = () => {
    if (!primaryGesture) return;
    const point = primaryGesture.points[primaryGesture.points.length - 1];
    const heldFor = Date.now() - primaryGesture.holdStartedAtMs;
    world.enqueueIntention({
      type: 'HOLD',
      params: {
        x01: point.x,
        y01: point.y,
        strength01: 0.75,
        durationMs: heldFor,
      },
    });
  };

  sendHold();
  primaryGesture.holdIntervalId = setInterval(sendHold, 200);
}

function appendPoint(points, point) {
  const last = points[points.length - 1];
  const dx = point.x - last.x;
  const dy = point.y - last.y;
  if (dx * dx + dy * dy < 0.0001) return false;
  points.push(point);
  if (points.length > 64) {
    points.splice(0, points.length - 64);
  }
  return true;
}

canvas.addEventListener('pointerdown', (event) => {
  if (!gesturesEnabled) return;
  canvas.setPointerCapture(event.pointerId);
  pointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY,
    pointerType: event.pointerType,
  });

  const point = normFromClient(event.clientX, event.clientY);
  focusNorm = point;

  if (!primaryGesture) {
    const nowMs = Date.now();
    primaryGesture = {
      pointerId: event.pointerId,
      startedAtMs: nowMs,
      lastMoveAtMs: nowMs,
      lastWarmthAtMs: 0,
      holdActive: false,
      holdStartedAtMs: null,
      holdTimeoutId: null,
      holdIntervalId: null,
      points: [point],
      totalDistance: 0,
      withdrawCandidate: false,
    };
    primaryGesture.holdTimeoutId = setTimeout(beginHold, 420);
  }
});

canvas.addEventListener('pointermove', (event) => {
  if (!gesturesEnabled) return;
  const tracked = pointers.get(event.pointerId);
  if (tracked) {
    tracked.x = event.clientX;
    tracked.y = event.clientY;
  }

  const nowMs = Date.now();
  if (nowMs - lastPointerMoveMs < MOVE_THROTTLE_MS) return;
  lastPointerMoveMs = nowMs;
  const point = normFromClient(event.clientX, event.clientY);
  focusNorm = point;

  if (primaryGesture && primaryGesture.pointerId === event.pointerId) {
    const lastPoint = primaryGesture.points[primaryGesture.points.length - 1];
    const moved = appendPoint(primaryGesture.points, point);
    if (moved) {
      const segmentDist = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
      primaryGesture.totalDistance += segmentDist;
      const dt = Math.max(16, nowMs - primaryGesture.lastMoveAtMs);
      const speed = segmentDist / dt;
      primaryGesture.withdrawCandidate = speed > 0.0013;
      if (!primaryGesture.holdActive && nowMs - primaryGesture.lastWarmthAtMs > 120) {
        world.enqueueIntention({
          type: 'OFFER_WARMTH',
          params: {
            points: [lastPoint, point],
            strength01: clamp01(1 - speed * 380),
          },
        });
        primaryGesture.lastWarmthAtMs = nowMs;
      }
      primaryGesture.lastMoveAtMs = nowMs;
    }
  }

  const touchPointers = Array.from(pointers.values()).filter((p) => p.pointerType === 'touch');
  if (touchPointers.length === 2) {
    const a = touchPointers[0];
    const b = touchPointers[1];
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    if (!pinchState) {
      pinchState = { baseDist: dist };
    } else if (Math.abs(dist - pinchState.baseDist) > 24) {
      if (nowMs - lastZoomToggleMs > 650) {
        world.enqueueIntention({ type: 'TOGGLE_ZOOM', params: {} });
        lastZoomToggleMs = nowMs;
      }
      pinchState.baseDist = dist;
    }
  } else {
    pinchState = null;
  }
});

function finishPrimaryGesture(pointerId) {
  if (!primaryGesture || primaryGesture.pointerId !== pointerId) return;
  clearPrimaryTimers();

  const nowMs = Date.now();
  const elapsed = nowMs - primaryGesture.startedAtMs;
  const lastPoint = primaryGesture.points[primaryGesture.points.length - 1];
  const firstPoint = primaryGesture.points[0];
  const travel = primaryGesture.totalDistance;
  const speed = travel / Math.max(1, elapsed);

  if (primaryGesture.holdActive) {
    world.enqueueIntention({
      type: 'RELEASE',
      params: { x01: lastPoint.x, y01: lastPoint.y, strength01: 0.45 },
    });
  } else if (primaryGesture.withdrawCandidate && elapsed < 1200 && speed > 0.0011 && travel > 0.15) {
    world.enqueueIntention({
      type: 'WITHDRAW',
      params: {
        x01: lastPoint.x,
        y01: lastPoint.y,
        points: [firstPoint, lastPoint],
        strength01: clamp01(speed * 640),
      },
    });
  } else {
    world.enqueueIntention({
      type: 'RELEASE',
      params: { x01: lastPoint.x, y01: lastPoint.y, strength01: 0.3 },
    });
  }

  primaryGesture = null;
}

function onPointerEnd(event) {
  if (!gesturesEnabled) return;
  pointers.delete(event.pointerId);
  pinchState = null;
  finishPrimaryGesture(event.pointerId);
  try {
    canvas.releasePointerCapture(event.pointerId);
  } catch (_) {
    // ignore capture release errors
  }
}

canvas.addEventListener('pointerup', onPointerEnd);
canvas.addEventListener('pointercancel', onPointerEnd);

canvas.addEventListener(
  'wheel',
  (event) => {
    if (!gesturesEnabled) return;
    event.preventDefault();
    const nowMs = Date.now();
    if (nowMs - lastWheelMs < WHEEL_THROTTLE_MS) return;
    lastWheelMs = nowMs;
    if (nowMs - lastZoomToggleMs < 650) return;
    world.enqueueIntention({ type: 'TOGGLE_ZOOM', params: {} });
    lastZoomToggleMs = nowMs;
  },
  { passive: false }
);

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width * dpr));
  const height = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width === width && canvas.height === height) {
    resizeHudCanvas();
    return;
  }
  canvas.width = width;
  canvas.height = height;
  resizeHudCanvas();
}

function resizeHudCanvas() {
  if (!oortCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = oortCanvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width * dpr));
  const height = Math.max(1, Math.floor(rect.height * dpr));
  if (oortCanvas.width === width && oortCanvas.height === height) return;
  oortCanvas.width = width;
  oortCanvas.height = height;
}

window.addEventListener('resize', resizeCanvas, { passive: true });
resizeCanvas();
resizeHudCanvas();

function updatePreviewImage(progress01 = 0) {
  const preview = publicState.preview;
  if (!preview || !preview.width || !preview.height) return;

  if (previewCanvas.width !== preview.width || previewCanvas.height !== preview.height) {
    previewCanvas.width = preview.width;
    previewCanvas.height = preview.height;
    previewImageData = previewCtx.createImageData(preview.width, preview.height);
  }

  if (!previewImageData) {
    previewImageData = previewCtx.createImageData(preview.width, preview.height);
  }

  const data = previewImageData.data;
  const invWidth = 1 / Math.max(1, preview.width - 1);
  const invHeight = 1 / Math.max(1, preview.height - 1);
  const bloomPhase =
    smoothstep(STAGE.bloomAt - 0.03, STAGE.bloomAt + 0.03, progress01) *
    (1 - smoothstep(STAGE.stainAt - 0.02, STAGE.stainAt + 0.03, progress01));
  const dryness = clamp01(publicState.metrics.dryness);
  for (let i = 0; i < preview.width * preview.height; i++) {
    const x01 = (i % preview.width) * invWidth;
    const y01 = Math.floor(i / preview.width) * invHeight;
    const y = preview.y[i];
    const r = preview.r[i];
    const g = preview.g[i];
    const stain = preview.stain[i];

    let red = 247;
    let green = 242;
    let blue = 232;

    red = lerp(red, 246, y * 0.96);
    green = lerp(green, 211, y * 0.98);
    blue = lerp(blue, 101, y * 0.92);

    red = lerp(red, 239, r * 1);
    green = lerp(green, 64, r * 0.9);
    blue = lerp(blue, 64, r * 0.82);

    red = lerp(red, 34, g * 0.74);
    green = lerp(green, 197, g * 0.96);
    blue = lerp(blue, 94, g * 0.74);

    const blend = clamp01((y + r + g) * 0.38);
    red = lerp(red, 128, blend * 0.24);
    green = lerp(green, 114, blend * 0.22);
    blue = lerp(blue, 180, blend * 0.3);

    const redDominance = clamp01(r * 1.15);
    red = lerp(red, 246, redDominance * 0.18);
    green = lerp(green, 52, redDominance * 0.16);
    blue = lerp(blue, 56, redDominance * 0.16);

    if (bloomPhase > 0.01) {
      const washA = 0.5 + 0.5 * Math.sin((x01 * 2.1 + y01 * 1.4 + progress01 * 2.2) * TAU);
      const washB = 0.5 + 0.5 * Math.sin((x01 * -1.6 + y01 * 2.4 + progress01 * 1.8) * TAU);
      const toneA = lerpColor([236, 72, 153], [168, 85, 247], washA);
      const toneB = lerpColor([6, 182, 212], [251, 146, 60], washB);
      const vivid = lerpColor(toneA, toneB, 0.5 + (washB - 0.5) * 0.28);
      const vividMix = bloomPhase * (0.16 + (1 - stain) * 0.11);
      red = lerp(red, vivid[0], vividMix);
      green = lerp(green, vivid[1], vividMix);
      blue = lerp(blue, vivid[2], vividMix);
    }

    red = lerp(red, 168, stain * 0.56);
    green = lerp(green, 162, stain * 0.56);
    blue = lerp(blue, 158, stain * 0.56);

    const dryFade = 1 - dryness * 0.18;
    red *= dryFade;
    green *= dryFade;
    blue *= dryFade;

    const idx = i * 4;
    data[idx] = Math.round(red);
    data[idx + 1] = Math.round(green);
    data[idx + 2] = Math.round(blue);
    data[idx + 3] = 255;
  }

  previewCtx.putImageData(previewImageData, 0, 0);
}

function drawBackground(width, height) {
  const g = ctx.createLinearGradient(0, 0, 0, height);
  g.addColorStop(0, '#19140f');
  g.addColorStop(0.45, '#110f14');
  g.addColorStop(1, '#08090d');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
}

function drawField(width, height, nowMs, progress01) {
  updatePreviewImage(progress01);
  if (!previewCanvas.width || !previewCanvas.height) return;

  const mode = publicState.mode;
  const edgeSoftness = clamp01(publicState.metrics.edgeSoftness);
  const blurPx = 1 + edgeSoftness * 9;
  const seeker = publicState.traces.seeker ?? focusNorm;
  const focus = mode === 'zoom-in' ? focusNorm : seeker;

  ctx.save();
  if (mode === 'zoom-in') {
    const zoom = 1.45;
    const srcW = previewCanvas.width / zoom;
    const srcH = previewCanvas.height / zoom;
    const srcX = clamp01(focus.x) * previewCanvas.width - srcW / 2;
    const srcY = clamp01(focus.y) * previewCanvas.height - srcH / 2;
    const clampedX = Math.min(previewCanvas.width - srcW, Math.max(0, srcX));
    const clampedY = Math.min(previewCanvas.height - srcH, Math.max(0, srcY));
    ctx.filter = `blur(${blurPx.toFixed(2)}px)`;
    ctx.drawImage(previewCanvas, clampedX, clampedY, srcW, srcH, 0, 0, width, height);
  } else {
    ctx.filter = `blur(${(blurPx * 0.65).toFixed(2)}px)`;
    ctx.drawImage(previewCanvas, 0, 0, width, height);
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.86;
  ctx.drawImage(previewCanvas, 0, 0, width, height);
  ctx.restore();

  const dryness = clamp01(publicState.metrics.dryness);
  if (grainPattern) {
    ctx.save();
    ctx.globalAlpha = 0.05 + dryness * 0.16;
    ctx.fillStyle = grainPattern;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  const pulse = clamp01(publicState.metrics.sleepWakePulse);
  ctx.save();
  ctx.globalAlpha = (0.03 + pulse * 0.07) * (1 - dryness * 0.35);
  const light = ctx.createRadialGradient(width * 0.24, height * 0.2, 0, width * 0.24, height * 0.2, width * 0.8);
  light.addColorStop(0, 'rgba(246,211,101,0.75)');
  light.addColorStop(1, 'rgba(246,211,101,0)');
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  const burn = clamp01(publicState.metrics.burn);
  if (burn > 0.2) {
    ctx.save();
    const flicker = 0.7 + Math.sin(nowMs * 0.0032) * 0.3;
    ctx.globalAlpha = ((burn - 0.2) / 0.8) * 0.28 * flicker;
    const burnGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.53,
      width * 0.18,
      width * 0.5,
      height * 0.53,
      width * 0.7
    );
    burnGrad.addColorStop(0, 'rgba(239,68,68,0)');
    burnGrad.addColorStop(1, 'rgba(239,68,68,0.75)');
    ctx.fillStyle = burnGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  const joyPhase = 1 - smoothstep(STAGE.redAt - 0.03, STAGE.redAt + 0.04, progress01);
  const angerPhase =
    smoothstep(STAGE.redAt - 0.04, STAGE.redAt + 0.04, progress01) *
    (1 - smoothstep(STAGE.greenAt + 0.02, STAGE.bloomAt - 0.02, progress01));
  const leavePhase =
    smoothstep(STAGE.greenAt - 0.04, STAGE.greenAt + 0.04, progress01) *
    (1 - smoothstep(STAGE.stainAt - 0.02, STAGE.stainAt + 0.04, progress01));
  const bloomPhase =
    smoothstep(STAGE.bloomAt - 0.03, STAGE.bloomAt + 0.03, progress01) *
    (1 - smoothstep(STAGE.stainAt - 0.02, STAGE.stainAt + 0.03, progress01));
  const stainPhase =
    smoothstep(STAGE.stainAt - 0.04, STAGE.stainAt + 0.04, progress01) *
    (1 - smoothstep(STAGE.voidAt + 0.02, 1, progress01));
  const voidPhase = smoothstep(STAGE.voidAt - 0.03, 1, progress01);

  if (joyPhase > 0.01) {
    ctx.save();
    const radial = ctx.createRadialGradient(
      width * 0.45,
      height * 0.3,
      width * 0.05,
      width * 0.45,
      height * 0.3,
      width * 0.62
    );
    radial.addColorStop(0, `rgba(246,211,101,${0.46 * joyPhase})`);
    radial.addColorStop(1, 'rgba(246,211,101,0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (angerPhase > 0.01) {
    ctx.save();
    const burnSpread = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      width * 0.08,
      width * 0.5,
      height * 0.5,
      width * 0.9
    );
    burnSpread.addColorStop(0, `rgba(239,68,68,${0.42 * angerPhase})`);
    burnSpread.addColorStop(1, 'rgba(239,68,68,0)');
    ctx.fillStyle = burnSpread;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = `rgba(239,68,68,${0.28 * angerPhase})`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (leavePhase > 0.01) {
    ctx.save();
    const seeker = publicState.traces.seeker ?? focusNorm;
    const leaveLight = ctx.createRadialGradient(
      seeker.x * width,
      seeker.y * height,
      width * 0.03,
      seeker.x * width,
      seeker.y * height,
      width * 0.58
    );
    leaveLight.addColorStop(0, `rgba(34,197,94,${0.36 * leavePhase})`);
    leaveLight.addColorStop(1, 'rgba(34,197,94,0)');
    ctx.fillStyle = leaveLight;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (bloomPhase > 0.01) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 9; i += 1) {
      const hueColor = bloomColorAt(progress01 + i * 0.11 + nowMs * 0.00004);
      const cx = width * (0.15 + (i % 3) * 0.34 + Math.sin(nowMs * 0.001 + i * 0.8) * 0.05);
      const cy = height * (0.2 + Math.floor(i / 3) * 0.3 + Math.cos(nowMs * 0.0012 + i * 1.1) * 0.05);
      const glow = ctx.createRadialGradient(cx, cy, width * 0.04, cx, cy, width * 0.46);
      glow.addColorStop(0, rgba(hueColor, 0.12 * bloomPhase));
      glow.addColorStop(0.55, rgba(hueColor, 0.06 * bloomPhase));
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.globalCompositeOperation = 'soft-light';
    const ribbon = ctx.createLinearGradient(0, 0, width, height);
    ribbon.addColorStop(0, `rgba(246,211,101,${0.13 * bloomPhase})`);
    ribbon.addColorStop(0.22, `rgba(239,68,68,${0.13 * bloomPhase})`);
    ribbon.addColorStop(0.44, `rgba(236,72,153,${0.13 * bloomPhase})`);
    ribbon.addColorStop(0.66, `rgba(168,85,247,${0.13 * bloomPhase})`);
    ribbon.addColorStop(0.84, `rgba(6,182,212,${0.13 * bloomPhase})`);
    ribbon.addColorStop(1, `rgba(34,197,94,${0.13 * bloomPhase})`);
    ctx.fillStyle = ribbon;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (stainPhase > 0.01) {
    ctx.save();
    ctx.fillStyle = `rgba(160,154,148,${0.4 * stainPhase})`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (voidPhase > 0.01) {
    ctx.save();
    ctx.fillStyle = `rgba(247,242,232,${0.9 * voidPhase})`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}

function frame(renderNowMs) {
  resizeCanvas();
  const width = canvas.width;
  const height = canvas.height;
  const clockNowMs = Date.now();
  const progress01 = loopStarted ? loopProgress(clockNowMs) : 0;

  if (!loopStarted && !thoughtOverlay.isOpen() && lastPointerForDoor?.point) {
    tryStartFromPoint(lastPointerForDoor.point);
  }
  if (loopStarted && typeof world.syncNarrative === 'function') {
    world.syncNarrative({ progress01, nowMs: clockNowMs });
  }

  drawBackground(width, height);
  drawField(width, height, renderNowMs, progress01);
  if (oortCtx && oortCanvas) {
    drawOortHud(oortCtx, oortCanvas.width, oortCanvas.height, renderNowMs, progress01);
  }
  if (!loopStarted || doorState.openedAtMs != null) {
    drawDoor(width, height, clockNowMs);
  }
  if (loopStarted && !loopEnded && progress01 >= 1) {
    loopEnded = true;
    world.stop();
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

window.addEventListener('beforeunload', () => {
  clearPrimaryTimers();
  world.stop();
});

