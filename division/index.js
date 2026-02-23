import { autorun } from 'mobx';
import readme_source from './README.md?raw';
import { acting } from './acting';
import { render_readme } from '../utils/util.js';
import { initThoughtOverlay } from '../utils/thought-overlay.js';
import { initI18n } from '../utils/i18n.js';
import { GOLD, BLUE, OUT_DURATION, IN_DURATION, RELOAD_THRESHOLD, EPHEM_RADIUS } from './config.js';
import {
  next_ephem_angle,
  next_ring_angle,
  permanent_depth,
  ring_dist_permanent,
  compute_target,
  radius_for_permanent,
  orbit_for_ephemeral,
} from './layout.js';

const { world } = acting();
initI18n();

const canvas = document.getElementById('world_canvas');
const ctx = canvas.getContext('2d');
render_readme('readme_section', readme_source);
initThoughtOverlay();

const resize_canvas = () => {
  const dpr = window.devicePixelRatio || 1;
  const target = Math.min(window.innerWidth * 0.92, 720);
  canvas.style.width = `${target}px`;
  canvas.style.height = `${target}px`;
  canvas.width = Math.floor(target * dpr);
  canvas.height = Math.floor(target * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

resize_canvas();
window.addEventListener('resize', resize_canvas);

const get_center = () => ({ x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 });

const nodes = new Map();
let last_frame = performance.now();
let animation_active = true;
let frame_handle = null;

const create_node = (being, center_point) => {
  const parent_id = being.origin ? being.origin.id : null;
  const parent_node = parent_id ? nodes.get(parent_id) : null;
  const is_permanent = Boolean(being.is_permanent);
  const level = is_permanent ? permanent_depth(being) : permanent_depth(being.origin || {});
  const angle = is_permanent
    ? level === 0
      ? 0
      : next_ring_angle(level)
    : parent_node
      ? next_ephem_angle(parent_id)
      : Math.random() * Math.PI * 2;

  const intended_phase = is_permanent ? (parent_id ? 'out' : 'permanent') : 'out';
  const has_parent_node = !parent_id || Boolean(parent_node);

  return {
    id: being.id,
    parent_id,
    is_permanent,
    phase: has_parent_node ? intended_phase : 'waiting',
    next_phase: has_parent_node ? undefined : intended_phase,
    after_out: is_permanent ? 'permanent' : 'idle',
    level,
    angle,
    distance: is_permanent ? ring_dist_permanent(canvas, level) : undefined,
    orbit: is_permanent ? undefined : orbit_for_ephemeral(level),
    time: 0,
    x: center_point.x,
    y: center_point.y,
    start_x: undefined,
    start_y: undefined,
    target_x: undefined,
    target_y: undefined,
    radius: is_permanent ? radius_for_permanent(level) : EPHEM_RADIUS,
    radius_initial: is_permanent ? radius_for_permanent(level) : EPHEM_RADIUS,
    color: is_permanent ? GOLD : BLUE,
    alpha: 1,
    needs_angle_lock: !is_permanent && Boolean(parent_id) && !parent_node,
  };
};

const with_parent = (node) => (node.parent_id ? nodes.get(node.parent_id) : null);

const handle_waiting = (node, parent_node, center_point) => {
  if (node.parent_id && !parent_node) return node;

  const should_lock = node.needs_angle_lock && parent_node && node.parent_id;
  const angle = should_lock ? next_ephem_angle(node.parent_id) : node.angle;
  const updated = should_lock ? { ...node, angle } : node;
  const next_phase = updated.next_phase ?? 'out';

  if (next_phase === 'out') {
    const start_point = parent_node ? { x: parent_node.x, y: parent_node.y } : center_point;
    const target_point = compute_target(updated, center_point, nodes, canvas);
    return {
      ...updated,
      phase: 'out',
      next_phase: undefined,
      needs_angle_lock: false,
      time: 0,
      start_x: start_point.x,
      start_y: start_point.y,
      target_x: target_point.x,
      target_y: target_point.y,
      x: start_point.x,
      y: start_point.y,
      alpha: 1,
    };
  }

  const target_point = compute_target(updated, center_point, nodes, canvas);
  return {
    ...updated,
    phase: next_phase,
    next_phase: undefined,
    needs_angle_lock: false,
    x: target_point.x,
    y: target_point.y,
    alpha: 1,
  };
};

const handle_static = (node, center_point) => {
  const target_point = compute_target(node, center_point, nodes, canvas);
  return { ...node, x: target_point.x, y: target_point.y, alpha: 1 };
};

const handle_out = (node, parent_node, center_point, delta) => {
  const start_point = {
    x: node.start_x ?? (parent_node ? parent_node.x : center_point.x),
    y: node.start_y ?? (parent_node ? parent_node.y : center_point.y),
  };
  const target_point = {
    x: node.target_x ?? compute_target(node, center_point, nodes, canvas).x,
    y: node.target_y ?? compute_target(node, center_point, nodes, canvas).y,
  };

  const time = node.time + delta;
  const progress = clamp_01(time / OUT_DURATION);
  const x = lerp(start_point.x, target_point.x, ease_out_quad(progress));
  const y = lerp(start_point.y, target_point.y, ease_out_quad(progress));

  if (progress >= 1) {
    return {
      ...node,
      phase: node.after_out ?? 'idle',
      time: 0,
      start_x: undefined,
      start_y: undefined,
      target_x: target_point.x,
      target_y: target_point.y,
      x: target_point.x,
      y: target_point.y,
      alpha: 1,
    };
  }

  return {
    ...node,
    start_x: start_point.x,
    start_y: start_point.y,
    target_x: target_point.x,
    target_y: target_point.y,
    time,
    x,
    y,
    alpha: 1,
  };
};

const handle_in = (node, parent_node, center_point, delta) => {
  const start_x = node.start_x ?? node.x;
  const start_y = node.start_y ?? node.y;
  const target_point = {
    x: node.target_x ?? (parent_node ? parent_node.x : center_point.x),
    y: node.target_y ?? (parent_node ? parent_node.y : center_point.y),
  };

  const time = node.time + delta;
  const progress = clamp_01(time / IN_DURATION);
  const x = lerp(start_x, target_point.x, ease_in_cubic(progress));
  const y = lerp(start_y, target_point.y, ease_in_cubic(progress));
  const radius = lerp(node.radius_initial ?? node.radius, 0, progress);
  const alpha = 1 - progress;

  if (progress >= 1) return null;

  return {
    ...node,
    start_x,
    start_y,
    target_x: target_point.x,
    target_y: target_point.y,
    time,
    x,
    y,
    radius,
    alpha,
  };
};

const advance_node = (node, parent_node, center_point, delta) => {
  switch (node.phase) {
    case 'waiting':
      return handle_waiting(node, parent_node, center_point);
    case 'permanent':
    case 'idle':
      return handle_static(node, center_point);
    case 'out':
      return handle_out(node, parent_node, center_point, delta);
    case 'in':
      return handle_in(node, parent_node, center_point, delta);
    default:
      return node;
  }
};

const render_node = (node) => {
  const radius = Math.max(0.1, node.radius ?? EPHEM_RADIUS / 2);
  ctx.globalAlpha = node.alpha ?? 1;
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = node.color;
  ctx.fill();
  ctx.globalAlpha = 1;
};

const step_nodes = (delta, center_point) => {
  const updates = [];
  const removals = [];

  nodes.forEach((node, id) => {
    const parent_node = with_parent(node);
    const next_node = advance_node(node, parent_node, center_point, delta);
    if (!next_node) {
      removals.push(id);
      return;
    }
    updates.push([id, next_node]);
    render_node(next_node);
  });

  removals.forEach((id) => nodes.delete(id));
  updates.forEach(([id, node]) => nodes.set(id, node));
};

const to_in_phase = (node, center_point) => {
  if (node.phase === 'in') return node;
  const parent_node = with_parent(node);
  const target_point = parent_node ? { x: parent_node.x, y: parent_node.y } : center_point;
  const start_point =
    node.phase === 'waiting'
      ? compute_target(node, center_point, nodes, canvas)
      : { x: node.x, y: node.y };

  return {
    ...node,
    phase: 'in',
    time: 0,
    start_x: start_point.x,
    start_y: start_point.y,
    target_x: target_point.x,
    target_y: target_point.y,
    alpha: node.alpha ?? 1,
  };
};

const reconcile_nodes = (live_ids, center_point) => {
  nodes.forEach((node, id) => {
    if (live_ids.has(id)) return;
    if (node.is_permanent) {
      nodes.delete(id);
      return;
    }
    nodes.set(id, to_in_phase(node, center_point));
  });
};

const create_live_id_set = (iterable) => new Set(iterable);

const reload_if_needed = () => {
  if (!animation_active) return;
  let permanent_count = 0;
  world.forEach((being) => {
    if (being.is_permanent) permanent_count += 1;
  });
  if (permanent_count > RELOAD_THRESHOLD) {
    stop_animation();
    setTimeout(() => window.location.reload(), 0);
  }
};

const ensure_being_nodes = (center_point) => {
  const sorted_beings = Array.from(world.values()).sort((a, b) => a.created_at - b.created_at);
  sorted_beings.forEach((being) => {
    if (!nodes.has(being.id)) {
      nodes.set(being.id, create_node(being, center_point));
    }
  });
  return sorted_beings.map((being) => being.id);
};

const draw = (timestamp) => {
  if (!animation_active) return;

  const delta = timestamp - last_frame;
  last_frame = timestamp;

  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  const center_point = get_center();
  step_nodes(delta, center_point);

  if (animation_active) {
    frame_handle = requestAnimationFrame(draw);
  }
};

const start_animation = () => {
  if (frame_handle) cancelAnimationFrame(frame_handle);
  animation_active = true;
  frame_handle = requestAnimationFrame(draw);
};

const stop_animation = () => {
  animation_active = false;
  if (frame_handle) {
    cancelAnimationFrame(frame_handle);
    frame_handle = null;
  }
};

start_animation();

autorun(() => {
  reload_if_needed();
  const center_point = get_center();
  const live_ids = create_live_id_set(ensure_being_nodes(center_point));
  reconcile_nodes(live_ids, center_point);
});

const lerp = (a, b, t) => a + (b - a) * t;
const clamp_01 = (value) => Math.max(0, Math.min(1, value));
const ease_out_quad = (value) => value * (2 - value);
const ease_in_cubic = (value) => value * value * value;



