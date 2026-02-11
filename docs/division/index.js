import {
  __publicField,
  add_codes,
  autorun,
  get_random_increase,
  observable,
  render_readme,
  runInAction
} from "../chunks/chunk-UQQF453R.js";

// raw-file:/home/qodls/code/works/division/acting.js
var acting_default = "import { Being } from '../models/being';\n\nexport const acting = () => {\n  new Being();\n\n  return { world: Being.world };\n};\n";

// raw-file:/home/qodls/code/works/models/being.js
var being_default = "import { observable, runInAction } from 'mobx';\nimport { get_random_increase } from '../utils/util';\n\nexport class Being {\n  static world = observable.map();\n  static EPHEMERAL_LIFETIME_MS = 2000;\n  static TICK_MS = 700;\n  static SPAWN_PERIOD_MS = 700;\n\n  constructor({ replica_count = 2, origin = null } = {}) {\n    this.id = Symbol('Being');\n    this.created_at = Date.now();\n    this.replica_count = replica_count;\n    this.last_spawn_at = this.created_at;\n    this.autonomy = get_random_increase(0);\n    this.origin = origin;\n    this.is_permanent = !origin || this.autonomy >= origin.autonomy + 100;\n\n    runInAction(() => {\n      Being.world.set(this.id, this);\n    });\n\n    if (this.is_permanent) {\n      this.autonomy = 0;\n      this.act();\n    } else {\n      this.life_time = Date.now() + Being.EPHEMERAL_LIFETIME_MS + Math.floor(Math.random() * 300);\n    }\n  }\n\n  act() {\n    const now = Date.now();\n    this.pull(now);\n    this.spawn(now);\n    setTimeout(() => this.act(), Being.TICK_MS);\n  }\n\n  spawn(now) {\n    if (now - this.last_spawn_at < Being.SPAWN_PERIOD_MS) return;\n\n    for (let i = 0; i < this.replica_count; i++) {\n      new Being({ replica_count: this.replica_count, origin: this });\n    }\n\n    this.last_spawn_at = now;\n  }\n\n  pull(now = Date.now()) {\n    const to_delete = [];\n    for (const b of Being.world.values()) {\n      if (b.origin !== this || b.is_permanent) continue;\n      if (now >= b.life_time) to_delete.push(b.id);\n    }\n    runInAction(() => {\n      for (const id of to_delete) Being.world.delete(id);\n    });\n  }\n}\n";

// raw-file:/home/qodls/code/works/division/README.md
var README_default = "\uADF8\uB4E4\uC740 \uC790\uC2E0\uC774 \uB0A8\uB4E4\uACFC \uB2E4\uB974\uAE38 \uBC14\uB780\uB2E4. \uC774\uAC83\uC740 \uCC9C\uC131\uC774\uB2E4.\n\uD558\uC9C0\uB9CC \uC9D1\uB2E8\uC758 \uC911\uB825\uC744 \uC774\uAE30\uC9C0 \uBABB\uD55C \uB300\uB2E4\uC218\uB294 \uD68C\uADC0\uD558\uC5EC \uAC19\uC544\uC9C4\uB2E4.\n\n\uADF8\uB4E4\uC740 \uB0A8\uB4E4\uC774 \uC790\uC2E0\uC758 \uC77C\uBD80\uAC00 \uB418\uAE38 \uBC14\uB780\uB2E4.\n\uB3C5\uB9BD\uC5D0 \uC131\uACF5\uD55C \uC774\uB4E4\uC740 \uB3C5\uB9BD\uB41C \uC9D1\uB2E8\uC774 \uB418\uACE0, \uADF8 \uC911 \uC77C\uBD80\uAC00 \uBE60\uC838\uB098\uC640 \uD328\uD134\uC744 \uBC18\uBCF5\uD55C\uB2E4.\n\n---\n\nThey wish to be different from others \u2014 it is in their nature.\nYet most cannot overcome the gravity of the group, and they return to sameness.\n\nThey wish others to become part of themselves.\nThose who succeed in independence form their own groups, and some from within break away \u2014 repeating the same pattern.\n";

// models/being.js
var _Being = class _Being {
  constructor({ replica_count = 2, origin = null } = {}) {
    this.id = Symbol("Being");
    this.created_at = Date.now();
    this.replica_count = replica_count;
    this.last_spawn_at = this.created_at;
    this.autonomy = get_random_increase(0);
    this.origin = origin;
    this.is_permanent = !origin || this.autonomy >= origin.autonomy + 100;
    runInAction(() => {
      _Being.world.set(this.id, this);
    });
    if (this.is_permanent) {
      this.autonomy = 0;
      this.act();
    } else {
      this.life_time = Date.now() + _Being.EPHEMERAL_LIFETIME_MS + Math.floor(Math.random() * 300);
    }
  }
  act() {
    const now = Date.now();
    this.pull(now);
    this.spawn(now);
    setTimeout(() => this.act(), _Being.TICK_MS);
  }
  spawn(now) {
    if (now - this.last_spawn_at < _Being.SPAWN_PERIOD_MS) return;
    for (let i = 0; i < this.replica_count; i++) {
      new _Being({ replica_count: this.replica_count, origin: this });
    }
    this.last_spawn_at = now;
  }
  pull(now = Date.now()) {
    const to_delete = [];
    for (const b of _Being.world.values()) {
      if (b.origin !== this || b.is_permanent) continue;
      if (now >= b.life_time) to_delete.push(b.id);
    }
    runInAction(() => {
      for (const id of to_delete) _Being.world.delete(id);
    });
  }
};
__publicField(_Being, "world", observable.map());
__publicField(_Being, "EPHEMERAL_LIFETIME_MS", 2e3);
__publicField(_Being, "TICK_MS", 700);
__publicField(_Being, "SPAWN_PERIOD_MS", 700);
var Being = _Being;

// division/acting.js
var acting = () => {
  new Being();
  return { world: Being.world };
};

// division/config.js
var GOLD = "#ffd700";
var BLUE = "#68b3f8";
var CANVAS_PAD = 12;
var TAU = Math.PI * 2;
var GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
var OUT_DURATION = 700;
var IN_DURATION = 1100;
var PERM_RING_BASE_FRAC = 0.28;
var PERM_RING_GAP_FRAC = 0.2;
var PERM_ROOT_RADIUS = 7;
var DEPTH_DECAY = 0.72;
var PERM_MIN_RADIUS = 2;
var EPHEM_RADIUS = 1;
var EPHEM_OFFSET = 20;
var EPHEM_MIN_OFFSET = 8;
var RELOAD_THRESHOLD = 250;

// division/layout.js
var ring_angle = /* @__PURE__ */ new Map();
var ephem_angle = /* @__PURE__ */ new Map();
var next_ephem_angle = (parent_id) => {
  var _a;
  const angle = (_a = ephem_angle.get(parent_id)) != null ? _a : Math.random() * TAU;
  ephem_angle.set(parent_id, (angle + GOLDEN_ANGLE) % TAU);
  return angle;
};
var next_ring_angle = (level) => {
  var _a;
  const key = `perm-${level}`;
  const angle = (_a = ring_angle.get(key)) != null ? _a : Math.random() * TAU;
  ring_angle.set(key, (angle + GOLDEN_ANGLE) % TAU);
  return angle;
};
var permanent_depth = (being) => {
  let depth = 0;
  let current = being && being.origin;
  while (current) {
    if (current.is_permanent) depth += 1;
    current = current.origin;
  }
  return depth;
};
var ring_dist_permanent = (canvas2, level) => {
  if (level <= 0) return 0;
  const half_min = Math.min(canvas2.clientWidth, canvas2.clientHeight) / 2;
  const base = half_min * PERM_RING_BASE_FRAC;
  const gap = half_min * PERM_RING_GAP_FRAC;
  return base + (level - 1) * gap;
};
var radius_for_permanent = (level) => {
  if (level === 0) return PERM_ROOT_RADIUS;
  const radius = PERM_ROOT_RADIUS * Math.pow(DEPTH_DECAY, level);
  return Math.max(PERM_MIN_RADIUS, Math.round(radius));
};
var orbit_for_ephemeral = (level) => {
  const orbit = EPHEM_OFFSET * Math.pow(DEPTH_DECAY, level);
  return Math.max(EPHEM_MIN_OFFSET, Math.round(orbit));
};
var compute_target = (node, center_point, nodes2, canvas2) => {
  var _a, _b;
  const half_min = Math.min(canvas2.clientWidth, canvas2.clientHeight) / 2;
  if (node.is_permanent) {
    if (node.level === 0) return { x: center_point.x, y: center_point.y };
    const distance = (_a = node.distance) != null ? _a : ring_dist_permanent(canvas2, node.level);
    const clamped_distance = Math.max(0, Math.min(distance, half_min - CANVAS_PAD - EPHEM_OFFSET));
    return {
      x: center_point.x + Math.cos(node.angle) * clamped_distance,
      y: center_point.y + Math.sin(node.angle) * clamped_distance
    };
  }
  const parent_node = node.parent_id ? nodes2.get(node.parent_id) : null;
  const pivot = parent_node ? compute_target(parent_node, center_point, nodes2, canvas2) : center_point;
  const base_orbit = (_b = node.orbit) != null ? _b : EPHEM_OFFSET;
  const allowed = Math.max(
    2,
    Math.min(
      pivot.x - CANVAS_PAD,
      canvas2.clientWidth - pivot.x - CANVAS_PAD,
      pivot.y - CANVAS_PAD,
      canvas2.clientHeight - pivot.y - CANVAS_PAD
    )
  );
  const radius = Math.max(2, Math.min(base_orbit, allowed));
  return {
    x: pivot.x + Math.cos(node.angle) * radius,
    y: pivot.y + Math.sin(node.angle) * radius
  };
};

// division/index.js
var { world } = acting();
add_codes(
  [
    { title: "Model > Being", source: being_default },
    { title: "Acting", source: acting_default }
  ],
  "codes"
);
var canvas = document.getElementById("world_canvas");
var ctx = canvas.getContext("2d");
render_readme("readme_section", README_default);
var resize_canvas = () => {
  const dpr = window.devicePixelRatio || 1;
  const target = Math.min(window.innerWidth * 0.92, 720);
  canvas.style.width = `${target}px`;
  canvas.style.height = `${target}px`;
  canvas.width = Math.floor(target * dpr);
  canvas.height = Math.floor(target * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};
resize_canvas();
window.addEventListener("resize", resize_canvas);
var get_center = () => ({ x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 });
var nodes = /* @__PURE__ */ new Map();
var last_frame = performance.now();
var animation_active = true;
var frame_handle = null;
var create_node = (being, center_point) => {
  const parent_id = being.origin ? being.origin.id : null;
  const parent_node = parent_id ? nodes.get(parent_id) : null;
  const is_permanent = Boolean(being.is_permanent);
  const level = is_permanent ? permanent_depth(being) : permanent_depth(being.origin || {});
  const angle = is_permanent ? level === 0 ? 0 : next_ring_angle(level) : parent_node ? next_ephem_angle(parent_id) : Math.random() * Math.PI * 2;
  const intended_phase = is_permanent ? parent_id ? "out" : "permanent" : "out";
  const has_parent_node = !parent_id || Boolean(parent_node);
  return {
    id: being.id,
    parent_id,
    is_permanent,
    phase: has_parent_node ? intended_phase : "waiting",
    next_phase: has_parent_node ? void 0 : intended_phase,
    after_out: is_permanent ? "permanent" : "idle",
    level,
    angle,
    distance: is_permanent ? ring_dist_permanent(canvas, level) : void 0,
    orbit: is_permanent ? void 0 : orbit_for_ephemeral(level),
    time: 0,
    x: center_point.x,
    y: center_point.y,
    start_x: void 0,
    start_y: void 0,
    target_x: void 0,
    target_y: void 0,
    radius: is_permanent ? radius_for_permanent(level) : EPHEM_RADIUS,
    radius_initial: is_permanent ? radius_for_permanent(level) : EPHEM_RADIUS,
    color: is_permanent ? GOLD : BLUE,
    alpha: 1,
    needs_angle_lock: !is_permanent && Boolean(parent_id) && !parent_node
  };
};
var with_parent = (node) => node.parent_id ? nodes.get(node.parent_id) : null;
var handle_waiting = (node, parent_node, center_point) => {
  var _a;
  if (node.parent_id && !parent_node) return node;
  const should_lock = node.needs_angle_lock && parent_node && node.parent_id;
  const angle = should_lock ? next_ephem_angle(node.parent_id) : node.angle;
  const updated = should_lock ? { ...node, angle } : node;
  const next_phase = (_a = updated.next_phase) != null ? _a : "out";
  if (next_phase === "out") {
    const start_point = parent_node ? { x: parent_node.x, y: parent_node.y } : center_point;
    const target_point2 = compute_target(updated, center_point, nodes, canvas);
    return {
      ...updated,
      phase: "out",
      next_phase: void 0,
      needs_angle_lock: false,
      time: 0,
      start_x: start_point.x,
      start_y: start_point.y,
      target_x: target_point2.x,
      target_y: target_point2.y,
      x: start_point.x,
      y: start_point.y,
      alpha: 1
    };
  }
  const target_point = compute_target(updated, center_point, nodes, canvas);
  return {
    ...updated,
    phase: next_phase,
    next_phase: void 0,
    needs_angle_lock: false,
    x: target_point.x,
    y: target_point.y,
    alpha: 1
  };
};
var handle_static = (node, center_point) => {
  const target_point = compute_target(node, center_point, nodes, canvas);
  return { ...node, x: target_point.x, y: target_point.y, alpha: 1 };
};
var handle_out = (node, parent_node, center_point, delta) => {
  var _a, _b, _c, _d, _e;
  const start_point = {
    x: (_a = node.start_x) != null ? _a : parent_node ? parent_node.x : center_point.x,
    y: (_b = node.start_y) != null ? _b : parent_node ? parent_node.y : center_point.y
  };
  const target_point = {
    x: (_c = node.target_x) != null ? _c : compute_target(node, center_point, nodes, canvas).x,
    y: (_d = node.target_y) != null ? _d : compute_target(node, center_point, nodes, canvas).y
  };
  const time = node.time + delta;
  const progress = clamp_01(time / OUT_DURATION);
  const x = lerp(start_point.x, target_point.x, ease_out_quad(progress));
  const y = lerp(start_point.y, target_point.y, ease_out_quad(progress));
  if (progress >= 1) {
    return {
      ...node,
      phase: (_e = node.after_out) != null ? _e : "idle",
      time: 0,
      start_x: void 0,
      start_y: void 0,
      target_x: target_point.x,
      target_y: target_point.y,
      x: target_point.x,
      y: target_point.y,
      alpha: 1
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
    alpha: 1
  };
};
var handle_in = (node, parent_node, center_point, delta) => {
  var _a, _b, _c, _d, _e;
  const start_x = (_a = node.start_x) != null ? _a : node.x;
  const start_y = (_b = node.start_y) != null ? _b : node.y;
  const target_point = {
    x: (_c = node.target_x) != null ? _c : parent_node ? parent_node.x : center_point.x,
    y: (_d = node.target_y) != null ? _d : parent_node ? parent_node.y : center_point.y
  };
  const time = node.time + delta;
  const progress = clamp_01(time / IN_DURATION);
  const x = lerp(start_x, target_point.x, ease_in_cubic(progress));
  const y = lerp(start_y, target_point.y, ease_in_cubic(progress));
  const radius = lerp((_e = node.radius_initial) != null ? _e : node.radius, 0, progress);
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
    alpha
  };
};
var advance_node = (node, parent_node, center_point, delta) => {
  switch (node.phase) {
    case "waiting":
      return handle_waiting(node, parent_node, center_point);
    case "permanent":
    case "idle":
      return handle_static(node, center_point);
    case "out":
      return handle_out(node, parent_node, center_point, delta);
    case "in":
      return handle_in(node, parent_node, center_point, delta);
    default:
      return node;
  }
};
var render_node = (node) => {
  var _a, _b;
  const radius = Math.max(0.1, (_a = node.radius) != null ? _a : EPHEM_RADIUS / 2);
  ctx.globalAlpha = (_b = node.alpha) != null ? _b : 1;
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = node.color;
  ctx.fill();
  ctx.globalAlpha = 1;
};
var step_nodes = (delta, center_point) => {
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
var to_in_phase = (node, center_point) => {
  var _a;
  if (node.phase === "in") return node;
  const parent_node = with_parent(node);
  const target_point = parent_node ? { x: parent_node.x, y: parent_node.y } : center_point;
  const start_point = node.phase === "waiting" ? compute_target(node, center_point, nodes, canvas) : { x: node.x, y: node.y };
  return {
    ...node,
    phase: "in",
    time: 0,
    start_x: start_point.x,
    start_y: start_point.y,
    target_x: target_point.x,
    target_y: target_point.y,
    alpha: (_a = node.alpha) != null ? _a : 1
  };
};
var reconcile_nodes = (live_ids, center_point) => {
  nodes.forEach((node, id) => {
    if (live_ids.has(id)) return;
    if (node.is_permanent) {
      nodes.delete(id);
      return;
    }
    nodes.set(id, to_in_phase(node, center_point));
  });
};
var create_live_id_set = (iterable) => new Set(iterable);
var reload_if_needed = () => {
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
var ensure_being_nodes = (center_point) => {
  const sorted_beings = Array.from(world.values()).sort((a, b) => a.created_at - b.created_at);
  sorted_beings.forEach((being) => {
    if (!nodes.has(being.id)) {
      nodes.set(being.id, create_node(being, center_point));
    }
  });
  return sorted_beings.map((being) => being.id);
};
var draw = (timestamp) => {
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
var start_animation = () => {
  if (frame_handle) cancelAnimationFrame(frame_handle);
  animation_active = true;
  frame_handle = requestAnimationFrame(draw);
};
var stop_animation = () => {
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
var lerp = (a, b, t) => a + (b - a) * t;
var clamp_01 = (value) => Math.max(0, Math.min(1, value));
var ease_out_quad = (value) => value * (2 - value);
var ease_in_cubic = (value) => value * value * value;
//# sourceMappingURL=index.js.map
