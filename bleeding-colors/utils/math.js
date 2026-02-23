export function clamp01(value) {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function smoothstep01(value) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

export function distance2d(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
