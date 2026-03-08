import {
  CANVAS_PAD,
  TAU,
  GOLDEN_ANGLE,
  PERM_RING_BASE_FRAC,
  PERM_RING_GAP_FRAC,
  PERM_ROOT_RADIUS,
  DEPTH_DECAY,
  PERM_MIN_RADIUS,
  EPHEM_OFFSET,
  EPHEM_MIN_OFFSET,
} from './config.js';

const ring_angle = new Map();
const ephem_angle = new Map();

export const next_ephem_angle = (parent_id) => {
  const angle = ephem_angle.get(parent_id) ?? Math.random() * TAU;
  ephem_angle.set(parent_id, (angle + GOLDEN_ANGLE) % TAU);
  return angle;
};

export const next_ring_angle = (level) => {
  const key = `perm-${level}`;
  const angle = ring_angle.get(key) ?? Math.random() * TAU;
  ring_angle.set(key, (angle + GOLDEN_ANGLE) % TAU);
  return angle;
};

export const permanent_depth = (being) => {
  let depth = 0;
  let current = being && being.origin;
  while (current) {
    if (current.is_permanent) depth += 1;
    current = current.origin;
  }
  return depth;
};

export const ring_dist_permanent = (canvas, level) => {
  if (level <= 0) return 0;
  const half_min = Math.min(canvas.clientWidth, canvas.clientHeight) / 2;
  const base = half_min * PERM_RING_BASE_FRAC;
  const gap = half_min * PERM_RING_GAP_FRAC;
  return base + (level - 1) * gap;
};

export const radius_for_permanent = (level) => {
  if (level === 0) return PERM_ROOT_RADIUS;
  const radius = PERM_ROOT_RADIUS * Math.pow(DEPTH_DECAY, level);
  return Math.max(PERM_MIN_RADIUS, Math.round(radius));
};

export const orbit_for_ephemeral = (level) => {
  const orbit = EPHEM_OFFSET * Math.pow(DEPTH_DECAY, level);
  return Math.max(EPHEM_MIN_OFFSET, Math.round(orbit));
};

export const compute_target = (node, center_point, nodes, canvas) => {
  const half_min = Math.min(canvas.clientWidth, canvas.clientHeight) / 2;

  if (node.is_permanent) {
    if (node.level === 0) return { x: center_point.x, y: center_point.y };
    const distance = node.distance ?? ring_dist_permanent(canvas, node.level);
    const clamped_distance = Math.max(0, Math.min(distance, half_min - CANVAS_PAD - EPHEM_OFFSET));
    return {
      x: center_point.x + Math.cos(node.angle) * clamped_distance,
      y: center_point.y + Math.sin(node.angle) * clamped_distance,
    };
  }

  const parent_node = node.parent_id ? nodes.get(node.parent_id) : null;
  const pivot = parent_node ? compute_target(parent_node, center_point, nodes, canvas) : center_point;
  const base_orbit = node.orbit ?? EPHEM_OFFSET;
  const allowed = Math.max(
    2,
    Math.min(
      pivot.x - CANVAS_PAD,
      canvas.clientWidth - pivot.x - CANVAS_PAD,
      pivot.y - CANVAS_PAD,
      canvas.clientHeight - pivot.y - CANVAS_PAD
    )
  );
  const radius = Math.max(2, Math.min(base_orbit, allowed));
  return {
    x: pivot.x + Math.cos(node.angle) * radius,
    y: pivot.y + Math.sin(node.angle) * radius,
  };
};

export const wrap_angle = (value) => {
  const wrapped = value % TAU;
  return wrapped < 0 ? wrapped + TAU : wrapped;
};

