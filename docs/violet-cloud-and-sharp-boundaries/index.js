import {
  autorun,
  observable,
  render_readme,
  runInAction
} from "../chunks/chunk-RJNSBOXS.js";

// raw-file:C:\Users\qodls\Desktop\source\works\violet-cloud-and-sharp-boundaries\README.md
var README_default = "\uAC11\uC791\uC2A4\uB7F0 \uD734\uAC00\uB97C \uB9C8\uCE58\uACE0 \uD55C \uBA87 \uB144\uC740 \uB354 \uC9D1\uC774\uB77C\uACE0 \uBD80\uB97C \uC218 \uC788\uB294 \uACF3\uC73C\uB85C \uB3CC\uC544\uAC00\uBA74\uC11C, \uCD5C\uADFC \uB4E4\uC5B4 \uB2E4\uC2DC \uCC3E\uC544 \uB4E3\uAE30 \uC2DC\uC791\uD55C \uC774\uC18C\uB77C\uC758 \uB178\uB798\uB97C \uB4E3\uB294\uB2E4. \uC5B4\uB9B4 \uC801 \uC5C4\uB9C8\uAC00 \uD2C0\uC5B4\uB450\uC5C8\uB358 \uC774\uC18C\uB77C\uC758 \uB178\uB798\uB294 \uC7A0\uB4E4\uAE30 \uC804 \uC774\uC5B4\uD3F0\uC73C\uB85C \uC62E\uACA8 \uB4E4\uC5B4\uC640 \uC774\uC720 \uC5C6\uB294 \uB098\uC758 \uC6B0\uC6B8\uC5D0, \uB290\uB9BF\uB290\uB9BF\uD558\uACE0, \uB3D9\uD0DC \uB208\uAE54 \uAC19\uB2E4\uB358 \uB208\uBE5B\uC5D0 \uD070 \uBAAB\uC744 \uD588\uB2E4. \uC5C4\uB9C8\uB294 \uC774 \uB178\uB798 \uC18D\uC73C\uB85C \uB354 \uD30C\uACE0 \uB4E4\uC5B4\uAC14\uACE0, \uB098\uB294 \uC774 \uBCF4\uB78F\uBE5B \uBB49\uAC8C \uAD6C\uB984\uC5D0\uC11C \uBE60\uC838\uB098\uC640\uC57C \uD588\uB2E4. \uD750\uB9BF\uD55C \uACBD\uACC4\uB4E4\uC744 \uAC01\uC9C0\uAC8C \uB2E4\uB4EC\uACE0 \uBA85\uD655\uD55C \uBA54\uC2DC\uC9C0\uB97C \uC804\uB2EC\uD574\uC57C \uD588\uB2E4. \uAC01\uC9C4 \uAC83\uC740 \uB531\uB531\uD574\uC9C0\uACE0, \uCE58\uC11D \uAC19\uC740 \uAC83\uB4E4\uC774 \uB418\uC5B4\uC11C \uB0C4\uC0C8\uB97C \uBFDC\uC5B4 \uC5B4\uC9C0\uB7FD\uAC8C \uD558\uACE0 \uAC77\uB294 \uC640\uC911\uC5D0\uB3C4 \uADC0\uB97C \uC591\uCABD\uC73C\uB85C \uCB49 \uC7A1\uC544\uB2F9\uACA8 \uC5B4\uB514\uB85C \uAC00\uC57C \uD560 \uC9C0 \uAC08\uD53C\uB97C \uC7A1\uC744 \uC218 \uC5C6\uC5C8\uB358 \uAC83\uC774\uB2E4. \uADF8\uB7EC\uB358 \uC5B4\uB290 \uB0A0\uC5D0 \uC774 \uBB49\uAC8C\uBB49\uAC1C\uD558\uACE0 \uBAA8\uD638\uD55C \uBAA9\uC18C\uB9AC\uAC00 \uB2E4\uC2DC \uB4E4\uB9B0 \uAC83\uC774\uB2E4. \uCEE4\uB2E4\uB780 \uBCF4\uB77C\uC0C9 \uADF8\uB9BC\uC744 \uC0AC\uC11C \uBCBD\uC5D0\uB2E4 \uAC78\uC5B4\uC57C \uD560 \uC218\uB3C4 \uC788\uACA0\uB2E4.\n\n---\n\nAfter finishing a sudden vacation, as I head back to a place I can still call home for the next few years, I find myself listening again to Lee Sora's songs. When I was young, the Lee Sora my mother used to play would move into my earphones before sleep and took a big part in my causeless sadness\u2014its slow pace, and the gaze people joked looked like a pollack's dead eyes. My mother sank deeper into these songs, and I had to climb out of those violet, billowing clouds. I had to sharpen blurred boundaries into hard edges and deliver a clear message. But what becomes angular becomes hard; it turns into something like tartar, giving off a smell that makes you dizzy, so that even while walking you end up pulling your ears outward with both hands, unable to find where you're supposed to go. And then one day, that smudgy, ambiguous voice returned. I might have to buy a large violet painting and hang it on the wall.\n";

// violet-cloud-and-sharp-boundaries/utils/math.js
function clamp01(value) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}
function easeInCubic(t) {
  const x = clamp01(t);
  return x * x * x;
}

// violet-cloud-and-sharp-boundaries/utils/mulberry32.js
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// utils/programmatic-log-transport.js
function createProgrammaticLogTransport({ project, sender } = {}) {
  const projectName = project || "unknown-project";
  const sendFn = typeof sender === "function" ? sender : (envelope) => {
    console.log("[programmatic-log]", envelope);
  };
  return {
    send(entry) {
      const envelope = {
        channel: "programmatic",
        project: projectName,
        sentAt: Date.now(),
        payload: entry
      };
      sendFn(envelope);
    }
  };
}

// violet-cloud-and-sharp-boundaries/entities/InteractionLogger.js
var InteractionLogger = class {
  constructor({ storageKey, transport = null }) {
    this.storageKey = storageKey;
    this.transport = transport;
    this.entries = [];
    this.flushTimer = null;
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) this.entries = JSON.parse(raw);
    } catch (_) {
      this.entries = [];
    }
  }
  get count() {
    return this.entries.length;
  }
  log(entry) {
    var _a;
    this.entries.push(entry);
    if (this.entries.length > 5e3) this.entries.splice(0, this.entries.length - 5e3);
    if ((_a = this.transport) == null ? void 0 : _a.send) {
      try {
        this.transport.send(entry);
      } catch (_) {
      }
    }
    this.flushSoon();
  }
  flushSoon() {
    if (this.flushTimer) return;
    this.flushTimer = setTimeout(() => {
      this.flushTimer = null;
      this.flush();
    }, 1e3);
  }
  flush() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
    } catch (_) {
    }
  }
  exportJsonl() {
    return this.entries.map((e) => JSON.stringify(e)).join("\n") + "\n";
  }
};

// violet-cloud-and-sharp-boundaries/entities/IntentionQueue.js
var IntentionQueue = class {
  constructor({ lagMs, rng }) {
    this.lagMs = lagMs;
    this.rng = rng;
    this.items = [];
  }
  enqueue({ type, params }) {
    const nowMs = Date.now();
    const jitter = Math.floor(this.rng() * 180);
    this.items.push({ type, params, atMs: nowMs + this.lagMs + jitter });
  }
  drainDue(nowMs) {
    if (this.items.length === 0) return [];
    const due = [];
    const rest = [];
    for (const item of this.items) {
      if (item.atMs <= nowMs) due.push(item);
      else rest.push(item);
    }
    this.items = rest;
    return due;
  }
};

// violet-cloud-and-sharp-boundaries/entities/AmbiguityField.js
var AmbiguityField = class {
  constructor() {
    this.fogPressure = 0.35;
    this.purpleSaturation = 0.55;
    this.memoryTank = 0.18;
  }
  applyIntention(intent) {
    if (intent.type === "LISTEN_HOLD") {
      this.memoryTank = clamp01(this.memoryTank + 0.04);
    }
    if (intent.type === "SMUDGE_STROKE") {
      this.fogPressure = clamp01(this.fogPressure + 0.08);
      this.memoryTank = clamp01(this.memoryTank + 0.03);
    }
  }
  update({ dt, voicePulse, edgePressure, paintingCommit }) {
    this.memoryTank = clamp01(this.memoryTank - dt * 0.014);
    const base = 0.12;
    const target = clamp01(
      base + this.memoryTank * 0.55 + voicePulse * 0.55 - edgePressure * 0.24 - paintingCommit * 0.32
    );
    this.fogPressure = clamp01(this.fogPressure + (target - this.fogPressure) * dt * 0.55);
    this.purpleSaturation = clamp01(0.24 + this.fogPressure * 0.76);
  }
};

// violet-cloud-and-sharp-boundaries/entities/BoundarySharpeningProcess.js
var BoundarySharpeningProcess = class {
  constructor() {
    this.edgePressure = 0.22;
    this.edgeDebt = 0;
    this.segments = [];
  }
  applyIntention(intent) {
    var _a, _b;
    if (intent.type === "SHARPEN_STROKE") {
      const points = (_b = (_a = intent.params) == null ? void 0 : _a.points) != null ? _b : [];
      const intensity = clamp01(0.14 + points.length / 90);
      this.edgePressure = clamp01(this.edgePressure + intensity * 0.22);
      const step = Math.max(1, Math.floor(points.length / 50));
      for (let i = 0; i + step < points.length; i += step) {
        const a = points[i];
        const b = points[i + step];
        this.segments.push({
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
          bornMs: Date.now()
        });
      }
      if (this.segments.length > 240) this.segments.splice(0, this.segments.length - 240);
    }
    if (intent.type === "SMUDGE_STROKE") {
      this.edgePressure = clamp01(this.edgePressure - 0.085);
      if (this.segments.length > 0) this.segments.splice(-Math.min(18, this.segments.length));
    }
  }
  update({ dt }) {
    this.edgePressure = clamp01(this.edgePressure - dt * 8e-3);
    this.edgeDebt = clamp01(this.edgeDebt + Math.pow(this.edgePressure, 2) * dt * 0.12 - dt * 0.01);
  }
};

// violet-cloud-and-sharp-boundaries/entities/ResidueField.js
var ResidueField = class {
  constructor() {
    this.residue = 0.08;
    this.odorParticles = [];
    this.odorArmedAtMs = null;
  }
  update({ nowMs, dt, edgePressure, edgeDebt }) {
    this.residue = clamp01(
      this.residue + Math.pow(edgePressure, 2) * 0.015 * dt + edgeDebt * 0.01 * dt - dt * 35e-4
    );
    const threshold = 0.35;
    if (this.residue > threshold && this.odorArmedAtMs == null) {
      this.odorArmedAtMs = nowMs + 3e3;
    }
    if (this.residue <= threshold) {
      this.odorArmedAtMs = null;
    }
    const odorActive = this.odorArmedAtMs != null && nowMs >= this.odorArmedAtMs;
    if (odorActive) {
      const spawn = 1 + Math.floor(this.residue * 2);
      for (let i = 0; i < spawn; i++) {
        this.odorParticles.push({
          x: (Math.random() * 2 - 1) * 0.95,
          y: 0.86 + Math.random() * 0.1,
          vx: (Math.random() * 2 - 1) * 0.03,
          vy: -0.03 - Math.random() * 0.04,
          life: 1
        });
      }
    }
    for (const p of this.odorParticles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt * (0.22 + this.residue * 0.3);
    }
    this.odorParticles = this.odorParticles.filter((p) => p.life > 0);
    if (this.odorParticles.length > 140) this.odorParticles.splice(0, this.odorParticles.length - 140);
  }
};

// violet-cloud-and-sharp-boundaries/entities/OrientationMetric.js
var OrientationMetric = class {
  constructor() {
    this.orientationError = 0.18;
    this.earPullEnergy = 0;
  }
  applyIntention(intent) {
    var _a, _b;
    if (intent.type === "PULL_EAR") {
      const amount = clamp01((_b = (_a = intent.params) == null ? void 0 : _a.amount) != null ? _b : 0.2);
      this.earPullEnergy = clamp01(this.earPullEnergy + amount);
    }
  }
  update({ dt, residue, fogPressure }) {
    this.earPullEnergy = clamp01(this.earPullEnergy - dt * 0.35);
    const base = 0.12;
    this.orientationError = clamp01(base + residue * 0.6 + fogPressure * 0.2 - this.earPullEnergy * 0.3);
  }
};

// violet-cloud-and-sharp-boundaries/entities/VoiceReturnProcess.js
var VoiceReturnProcess = class {
  constructor({ rng }) {
    this.rng = rng;
    this.voicePulse = 0;
    this.listenCharge = 0;
    this.pulse = null;
    this.marks = [];
  }
  applyIntention(intent) {
    if (intent.type === "LISTEN_HOLD") {
      this.listenCharge = clamp01(this.listenCharge + 0.05);
    }
  }
  maybeTrigger(nowMs, dt) {
    const rate = 0.06 + this.listenCharge * 0.18;
    const p = 1 - Math.exp(-rate * dt);
    if (this.rng() < p) {
      this.pulse = { startedAtMs: nowMs, durationMs: 1800 };
      this.marks.push({
        bornMs: nowMs,
        x: (this.rng() * 2 - 1) * 0.6,
        y: (this.rng() * 2 - 1) * 0.2 - 0.05
      });
      if (this.marks.length > 40) this.marks.splice(0, this.marks.length - 40);
    }
  }
  update({ nowMs, dt }) {
    this.listenCharge = clamp01(this.listenCharge - dt * 0.12);
    this.maybeTrigger(nowMs, dt);
    if (!this.pulse) {
      this.voicePulse = clamp01(this.voicePulse - dt * 0.2);
      return;
    }
    const elapsed = nowMs - this.pulse.startedAtMs;
    const t = elapsed / this.pulse.durationMs;
    if (t >= 1) {
      this.pulse = null;
      this.voicePulse = 0;
      return;
    }
    this.voicePulse = Math.sin(t * Math.PI);
  }
};

// violet-cloud-and-sharp-boundaries/entities/PaintingCommitProcess.js
var PaintingCommitProcess = class {
  constructor() {
    this.paintingCommit = 0;
    this.locked = false;
    this.commitScheduledAtMs = null;
    this.commitStartedAtMs = null;
  }
  applyIntention(intent) {
    if (intent.type !== "COMMIT_PAINTING") return;
    if (this.locked) return;
    if (this.commitScheduledAtMs != null) return;
    this.commitScheduledAtMs = Date.now() + 2e3;
  }
  update({ nowMs }) {
    if (!this.locked && this.commitScheduledAtMs != null && nowMs >= this.commitScheduledAtMs) {
      this.locked = true;
      this.commitStartedAtMs = nowMs;
      this.commitScheduledAtMs = null;
    }
    if (!this.locked || this.commitStartedAtMs == null) return;
    const durationMs = 6e3;
    const t = (nowMs - this.commitStartedAtMs) / durationMs;
    this.paintingCommit = easeInCubic(t);
  }
};

// violet-cloud-and-sharp-boundaries/entities/ConceptualLogProcess.js
var QUEUED_MESSAGES = {
  LISTEN_HOLD: [
    "\uB108\uB294 \uBAA8\uD638\uD55C \uBAA9\uC18C\uB9AC \uCABD\uC73C\uB85C \uADC0\uB97C \uB354 \uC624\uB798 \uAE30\uC6B8\uC778\uB2E4.",
    "\uB108\uB294 \uC7A0\uAE50 \uBA48\uCDB0 \uC11C\uC11C, \uB4E4\uB824\uC624\uB294 \uCABD\uC744 \uB354\uB4EC\uB294\uB2E4.",
    "\uB108\uB294 \uC774\uC720 \uC5C6\uB294 \uC6B0\uC6B8\uC758 \uC18D\uB3C4\uC5D0 \uB9DE\uCDB0, \uCC9C\uCC9C\uD788 \uB354 \uAC00\uAE4C\uC774 \uB4E3\uB294\uB2E4.",
    "\uB108\uB294 \uC7A0\uB4E4\uAE30 \uC804\uCC98\uB7FC \uC870\uC6A9\uD788, \uADC0\uB97C \uC548\uCABD\uC73C\uB85C \uC62E\uACA8 \uB193\uB294\uB2E4."
  ],
  SHARPEN_STROKE: [
    "\uB108\uB294 \uD750\uB9BF\uD55C \uACBD\uACC4\uB97C \uB354 \uB2E8\uB2E8\uD55C \uBAA8\uC11C\uB9AC\uB85C \uBC00\uC5B4 \uBD99\uC778\uB2E4.",
    "\uB108\uB294 \uBA54\uC2DC\uC9C0\uB97C \uB610\uB837\uD558\uAC8C \uB9CC\uB4E4\uAE30 \uC704\uD574, \uACBD\uACC4\uB97C \uAC01\uC9C0\uAC8C \uB2E4\uB4EC\uB294\uB2E4.",
    "\uB108\uB294 \uBB49\uAC8C \uAD6C\uB984\uC744 \uC798\uB77C\uB0B4\uB4EF, \uC120\uC744 \uC138\uC6B4\uB2E4.",
    "\uB108\uB294 \uBAA8\uD638\uD568\uC744 \uACAC\uB514\uC9C0 \uBABB\uD574, \uD45C\uBA74\uC744 \uB531\uB531\uD558\uAC8C \uAD73\uD788\uB824 \uD55C\uB2E4."
  ],
  SMUDGE_STROKE: [
    "\uB108\uB294 \uAD73\uC740 \uC120\uC744 \uB2E4\uC2DC \uBC88\uC9C0\uAC8C \uD558\uBA70 \uD2C8\uC744 \uB9CC\uB4E0\uB2E4.",
    "\uB108\uB294 \uAC01\uC9C4 \uACBD\uACC4\uC758 \uB05D\uC744 \uBB38\uC9C0\uB974\uBA70, \uD750\uB9BC\uC744 \uB418\uB3CC\uB9B0\uB2E4.",
    "\uB108\uB294 \uB531\uB531\uD574\uC9C4 \uBA74\uC744 \uD480\uC5B4, \uAD6C\uB984\uC774 \uB2E4\uC2DC \uC2A4\uBA70\uB4E4\uAC8C \uD55C\uB2E4.",
    "\uB108\uB294 \uBA85\uD655\uD568\uC758 \uCE7C\uB0A0\uC744 \uC7A0\uC2DC \uB215\uD600, \uBAA8\uD638\uD568\uC774 \uC9C0\uB098\uAC08 \uAE38\uC744 \uB0B8\uB2E4."
  ],
  PULL_EAR: [
    "\uB108\uB294 \uD754\uB4E4\uB9AC\uB294 \uBC29\uD5A5\uAC10\uC744 \uBD99\uC7A1\uC73C\uB824 \uADC0\uB97C \uB2F9\uAE34\uB2E4.",
    "\uB108\uB294 \uAC77\uB294 \uC640\uC911\uC5D0\uB3C4, \uAC08\uD53C\uB97C \uC7A1\uAE30 \uC704\uD574 \uADC0\uB97C \uCB49 \uC7A1\uC544\uB2F9\uAE34\uB2E4.",
    "\uB108\uB294 \uC5B4\uC9C0\uB7FC\uC758 \uD55C\uAC00\uC6B4\uB370\uC11C, \uC5B4\uB290 \uCABD\uC774 \uC9D1\uC778\uC9C0 \uD655\uC778\uD558\uB824 \uD55C\uB2E4."
  ],
  COMMIT_PAINTING: [
    "\uB108\uB294 \uBCF4\uB77C\uC0C9 \uC7A5\uBA74\uC744 \uBCBD\uC5D0 \uACE0\uC815\uD558\uB824\uB294 \uACB0\uC2EC\uC744 \uC62C\uB9B0\uB2E4.",
    "\uB108\uB294 \uCEE4\uB2E4\uB780 \uBCF4\uB77C\uC0C9 \uADF8\uB9BC\uC744 \uAC78\uC5B4 \uB458 \uC790\uB9AC\uB97C \uB5A0\uC62C\uB9B0\uB2E4.",
    "\uB108\uB294 \uD754\uB4E4\uB9AC\uB294 \uC7A5\uBA74\uC744 \u201C\uBD99\uC5EC \uB450\uAE30\u201D \uC704\uD574, \uACB0\uC2EC\uC758 \uBABB\uC744 \uAEBC\uB0B8\uB2E4."
  ],
  TOGGLE_ZOOM: [
    "\uB108\uB294 \uC7A5\uBA74\uC758 \uAC70\uB9AC\uB97C \uBC14\uAFB8\uBA70 \uAD00\uACC4\uB97C \uB2E4\uC2DC \uC77D\uB294\uB2E4.",
    "\uB108\uB294 \uD55C \uAC78\uC74C \uBB3C\uB7EC\uB098\uAC70\uB098 \uB2E4\uAC00\uAC00\uBA70, \uAC19\uC740 \uC7A5\uBA74\uC744 \uB2E4\uB978 \uD574\uC0C1\uB3C4\uB85C \uBCF8\uB2E4.",
    "\uB108\uB294 \uAD6C\uC870\uC640 \uAC10\uAC01 \uC0AC\uC774\uC5D0\uC11C, \uC2DC\uC120\uC744 \uC62E\uAE34\uB2E4."
  ],
  RESET_SOFT: [
    "\uB108\uB294 \uACFC\uC5F4\uB41C \uD45C\uBA74\uC744 \uC7A0\uC2DC \uAC00\uB77C\uC549\uD788\uB824 \uC228\uC744 \uACE0\uB978\uB2E4.",
    "\uB108\uB294 \uB531\uB531\uD574\uC9C0\uB824\uB294 \uC18D\uB3C4\uB97C \uB2A6\uCD94\uACE0, \uD55C \uBC88 \uB354 \uC5EC\uC9C0\uB97C \uB0A8\uAE34\uB2E4.",
    "\uB108\uB294 \uC2A4\uC2A4\uB85C \uB9CC\uB4E0 \uAE34\uC7A5\uC744 \uC7A0\uAE50 \uD480\uC5B4, \uB9E5\uBC15\uC744 \uB0AE\uCD98\uB2E4."
  ]
};
var APPLIED_MESSAGES = {
  LISTEN_HOLD: [
    "\uAE30\uC6B8\uC778 \uADC0\uAC00 \uC548\uAC1C\uC758 \uACB0\uC744 \uB2E4\uC2DC \uAE68\uC6B4\uB2E4.",
    "\uB290\uB9B0 \uCCAD\uCDE8\uAC00 \uC7A5\uBA74\uC758 \uBAA8\uD638\uD568\uC744 \uB2E4\uC2DC \uBD88\uB7EC\uB0B8\uB2E4.",
    "\uBAA9\uC18C\uB9AC\uC758 \uC794\uD5A5\uC774 \uD45C\uBA74\uC744 \uC544\uC8FC \uC587\uAC8C \uD754\uB4E0\uB2E4.",
    "\uB4E3\uB294 \uCABD\uC73C\uB85C \uC138\uACC4\uAC00 \uC870\uAE08 \uAE30\uC6B4\uB2E4."
  ],
  SHARPEN_STROKE: [
    "\uACBD\uACC4\uC758 \uAC01\uC774 \uC870\uAE08 \uB354 \uC0B4\uC544\uB09C\uB2E4.",
    "\uC120\uC774 \uC138\uC6CC\uC9C0\uBA70 \uC7A5\uBA74\uC774 \uB2E8\uB2E8\uD574\uC9C4\uB2E4.",
    "\uBAA8\uD638\uD568\uC774 \uD55C \uBC88 \uBC00\uB824\uB098\uACE0, \uBAA8\uC11C\uB9AC\uAC00 \uB0A8\uB294\uB2E4.",
    "\uAC01\uC9C0\uAC8C \uB2E4\uB4EC\uC740 \uC790\uB9AC\uC5D0\uC11C, \uB531\uB531\uD55C \uD45C\uBA74\uC774 \uC790\uB780\uB2E4."
  ],
  SMUDGE_STROKE: [
    "\uB531\uB531\uD55C \uBA74\uC774 \uC870\uAE08 \uD480\uB9AC\uBA70 \uD37C\uC9C4\uB2E4.",
    "\uAD73\uC740 \uC120\uC774 \uD750\uB824\uC9C0\uACE0, \uC548\uAC1C\uAC00 \uB2E4\uC2DC \uC2A4\uBBFC\uB2E4.",
    "\uACBD\uACC4\uAC00 \uBBF8\uB044\uB7EC\uC9C0\uBA70, \uC7A5\uBA74\uC774 \uB2E4\uC2DC \uBB49\uAC8C\uC9C4\uB2E4.",
    "\uC120\uC758 \uACE0\uC9D1\uC774 \uD55C\uC228\uCC98\uB7FC \uB290\uC2A8\uD574\uC9C4\uB2E4."
  ],
  PULL_EAR: [
    "\uD754\uB4E4\uB9AC\uB358 \uAC08\uD53C\uAC00 \uC7A0\uC2DC \uC815\uB82C\uB41C\uB2E4.",
    "\uBC29\uD5A5\uAC10\uC774 \uC7A0\uAE50 \uC7A1\uD788\uACE0, \uD754\uB4E4\uB9BC\uC774 \uC904\uC5B4\uB4E0\uB2E4.",
    "\uC5B4\uC9C0\uB7FC\uC774 \uD55C \uBC15\uC790 \uB2A6\uCDB0\uC9C0\uACE0, \uAE38\uC774 \uC7A0\uAE50 \uBCF4\uC778\uB2E4."
  ],
  COMMIT_PAINTING: [
    "\uBCF4\uB77C\uC0C9 \uACB0\uC2EC\uC774 \uBCBD \uCABD\uC73C\uB85C \uCC9C\uCC9C\uD788 \uAD73\uB294\uB2E4.",
    "\uC7A5\uBA74\uC774 \u201C\uAC78\uB9AC\uB294\u201D \uCABD\uC73C\uB85C, \uC2DC\uAC04\uC774 \uC751\uACE0\uB418\uAE30 \uC2DC\uC791\uD55C\uB2E4.",
    "\uD754\uB4E4\uB9AC\uB358 \uBCF4\uB77C\uAC00 \uACE0\uC815\uC810\uC744 \uCC3E\uB294\uB2E4."
  ],
  TOGGLE_ZOOM: [
    "\uAD00\uACC4\uC758 \uD574\uC0C1\uB3C4\uAC00 \uB2E4\uB978 \uCE35\uC73C\uB85C \uB118\uC5B4\uAC04\uB2E4.",
    "\uAC19\uC740 \uC7A5\uBA74\uC774 \uB2E4\uB978 \uD06C\uAE30\uB85C \uC77D\uD788\uBA70, \uC758\uBBF8\uC758 \uAC04\uACA9\uC774 \uBC14\uB010\uB2E4.",
    "\uAD6C\uC870\uC640 \uAC10\uAC01\uC758 \uBE44\uC728\uC774 \uC0B4\uC9DD \uB4A4\uBC14\uB010\uB2E4."
  ],
  RESET_SOFT: [
    "\uACFC\uD558\uAC8C \uAD73\uC740 \uAE34\uC7A5\uC774 \uD55C \uB2E8\uACC4 \uB0B4\uB824\uAC04\uB2E4.",
    "\uD45C\uBA74\uC774 \uC870\uAE08 \uC2DD\uC73C\uBA70, \uBE44\uC6A9\uC774 \uC7A0\uAE50 \uBA48\uCD98\uB2E4.",
    "\uC228\uC744 \uACE0\uB978 \uC790\uB9AC\uC5D0\uC11C, \uC138\uACC4\uAC00 \uACFC\uC5F4\uC744 \uB193\uCE5C\uB2E4."
  ]
};
function clockText(nowMs) {
  const d = new Date(nowMs);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}
function pickFrom({ rng, memory, key, variants }) {
  const options = toArray(variants);
  if (options.length === 0) return "";
  if (options.length === 1) return options[0];
  const last = memory.get(key);
  let idx = Math.floor(rng() * options.length);
  if (last != null && idx === last) idx = (idx + 1) % options.length;
  memory.set(key, idx);
  return options[idx];
}
function atmosphereTail({ metrics, pick }) {
  if (!metrics) return "";
  if (metrics.paintingCommit >= 0.95) {
    return pick("tail:paintingCommit", [
      "\uBCF4\uB77C\uC0C9 \uADF8\uB9BC\uC774 \uBCBD\uC5D0 \uAC70\uC758 \uBD99\uC5C8\uB2E4.",
      "\uBCF4\uB77C\uC0C9\uC758 \uACE0\uC815\uC774 \uAC70\uC758 \uB05D\uB0AC\uB2E4."
    ]);
  }
  if (metrics.residue >= 0.45) {
    return pick("tail:residue", [
      "\uAD73\uC740 \uC794\uC5EC\uAC00 \uB0C4\uC0C8\uCC98\uB7FC \uB5A0\uB3C8\uB2E4.",
      "\uCE58\uC11D \uAC19\uC740 \uC794\uC5EC\uAC00 \uC785\uC548\uCC98\uB7FC \uBD99\uC5B4 \uC788\uB2E4.",
      "\uB0A8\uC740 \uBD80\uC0B0\uBB3C\uC774 \uACF5\uAE30\uB97C \uD0C1\uD558\uAC8C \uB9CC\uB4E0\uB2E4."
    ]);
  }
  if (metrics.orientationError >= 0.5) {
    return pick("tail:orientationError", [
      "\uAC08\uD53C\uAC00 \uC544\uC9C1 \uD06C\uAC8C \uD754\uB4E4\uB9B0\uB2E4.",
      "\uC5B4\uB514\uB85C \uAC00\uC57C \uD560\uC9C0, \uBC29\uD5A5\uAC10\uC774 \uC5B4\uAE0B\uB09C\uB2E4.",
      "\uAC77\uB294 \uC640\uC911\uC5D0 \uAE38\uC774 \uC790\uC8FC \uBE60\uC9C4\uB2E4."
    ]);
  }
  if (metrics.fogPressure > metrics.edgePressure + 0.12) {
    return pick("tail:fogDominant", [
      "\uC548\uAC1C\uAC00 \uACBD\uACC4\uB97C \uB2E4\uC2DC \uAC10\uC2FC\uB2E4.",
      "\uBB49\uAC8C \uAD6C\uB984\uC774 \uBAA8\uC11C\uB9AC\uB97C \uB36E\uB294\uB2E4."
    ]);
  }
  if (metrics.edgePressure > metrics.fogPressure + 0.12) {
    return pick("tail:edgeDominant", [
      "\uACBD\uACC4\uAC00 \uC548\uAC1C\uB97C \uC870\uAE08 \uBC00\uC5B4\uB0B8\uB2E4.",
      "\uBAA8\uC11C\uB9AC\uAC00 \uAD6C\uB984\uC744 \uC798\uB77C\uB0B8\uB2E4."
    ]);
  }
  return pick("tail:balance", [
    "\uD33D\uD33D\uD55C \uADE0\uD615\uC774 \uB0AE\uC740 \uD638\uD761\uC73C\uB85C \uC774\uC5B4\uC9C4\uB2E4.",
    "\uB458 \uC0AC\uC774\uAC00 \uC5B4\uB290 \uCABD\uB3C4 \uC644\uC804\uD788 \uC774\uAE30\uC9C0 \uBABB\uD55C \uCC44 \uC720\uC9C0\uB41C\uB2E4."
  ]);
}
var ConceptualLogProcess = class {
  constructor({ rng = Math.random } = {}) {
    this.rng = rng;
    this.pickMemory = /* @__PURE__ */ new Map();
    this.events = [];
    this.maxEvents = 24;
    this.sequence = 0;
    this.lastQueuedType = null;
    this.lastQueuedAtMs = 0;
  }
  pick(key, variants) {
    return pickFrom({ rng: this.rng, memory: this.pickMemory, key, variants });
  }
  onEnqueue(intent, nowMs) {
    var _a;
    if ((_a = intent.params) == null ? void 0 : _a.seed) return null;
    if (intent.type === this.lastQueuedType && nowMs - this.lastQueuedAtMs < 650) return null;
    this.lastQueuedType = intent.type;
    this.lastQueuedAtMs = nowMs;
    const text = this.pick(`queued:${intent.type}`, QUEUED_MESSAGES[intent.type] || [
      "\uB108\uB294 \uC138\uACC4\uC758 \uACB0\uC744 \uC544\uC8FC \uC870\uAE08 \uAC74\uB4DC\uB9B0\uB2E4.",
      "\uB108\uB294 \uADDC\uCE59\uC758 \uD45C\uBA74\uC744 \uC870\uC6A9\uD788 \uC2A4\uCE5C\uB2E4.",
      "\uB108\uB294 \uC7A5\uBA74\uC758 \uAE30\uC6B8\uAE30\uB97C \uC544\uC8FC \uC870\uAE08 \uBC14\uAFBC\uB2E4."
    ]);
    return this.push({ nowMs, text, phase: "gesture" });
  }
  onApplied(intent, nowMs, metrics) {
    var _a;
    if ((_a = intent.params) == null ? void 0 : _a.seed) return null;
    const lead = this.pick(`applied:${intent.type}`, APPLIED_MESSAGES[intent.type] || [
      "\uC138\uACC4\uC758 \uACB0\uC774 \uC870\uC6A9\uD788 \uB2E4\uB978 \uCABD\uC73C\uB85C \uAE30\uC6B8\uC5C8\uB2E4.",
      "\uADDC\uCE59\uC774 \uC544\uC8FC \uB0AE\uAC8C \uC6B8\uB9AC\uBA70 \uC790\uB9AC\uB97C \uBC14\uAFE8\uB2E4.",
      "\uC7A5\uBA74\uC774 \uC870\uC6A9\uD788 \uB2E4\uB978 \uBC30\uC5F4\uC744 \uCDE8\uD588\uB2E4."
    ]);
    const tail = atmosphereTail({ metrics, pick: (k, v) => this.pick(k, v) });
    const text = tail ? `${lead} ${tail}` : lead;
    return this.push({ nowMs, text, phase: "manifest" });
  }
  push({ nowMs, text, phase }) {
    const event = {
      id: `concept-${nowMs}-${this.sequence++}`,
      at: nowMs,
      clock: clockText(nowMs),
      phase,
      text
    };
    this.events.push(event);
    if (this.events.length > this.maxEvents) {
      this.events.splice(0, this.events.length - this.maxEvents);
    }
    return event;
  }
  snapshot() {
    return this.events.slice();
  }
};

// violet-cloud-and-sharp-boundaries/acting.js
var PROJECT_KEY = "violet-cloud-and-sharp-boundaries";
var STORAGE_KEY = `${PROJECT_KEY}:interactionLog:v1`;
var VioletCloudWorld = class {
  constructor() {
    const seed = Math.floor(Math.random() * 1e7) ^ Date.now();
    this.rng = mulberry32(seed);
    this.logRng = mulberry32(seed ^ 2654435769);
    this.intentionLagMs = 1200;
    this.tickHz = 20;
    this.timeMs = Date.now();
    this.programmaticTransport = createProgrammaticLogTransport({ project: PROJECT_KEY });
    this.logger = new InteractionLogger({ storageKey: STORAGE_KEY, transport: this.programmaticTransport });
    this.queue = new IntentionQueue({ lagMs: this.intentionLagMs, rng: this.rng });
    this.ambiguity = new AmbiguityField();
    this.boundary = new BoundarySharpeningProcess();
    this.residue = new ResidueField();
    this.orientation = new OrientationMetric();
    this.voice = new VoiceReturnProcess({ rng: this.rng });
    this.painting = new PaintingCommitProcess();
    this.conceptualLog = new ConceptualLogProcess({ rng: this.logRng });
    this.assets = {
      audioBuffer: null,
      paintingBitmap: null,
      fogVideoEl: null
    };
    this.publicState = observable({
      mode: "zoom-in",
      metrics: {
        fogPressure: 0.35,
        edgePressure: 0.22,
        residue: 0.08,
        orientationError: 0.18,
        voicePulse: 0,
        paintingCommit: 0,
        motherDistance: 0.62
      },
      traces: {
        boundarySegments: [],
        odorParticles: [],
        voiceMarks: [],
        painting: { locked: false },
        conceptualLog: []
      },
      logCount: this.logger.count
    });
    this.lastTickMs = Date.now();
    this.timer = null;
  }
  start() {
    if (this.timer) return;
    this.lastTickMs = Date.now();
    this.timer = setInterval(() => this.tick(), Math.floor(1e3 / this.tickHz));
  }
  stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }
  enqueueIntention({ type, params }) {
    const nowMs = Date.now();
    this.queue.enqueue({ type, params });
    const event = this.conceptualLog.onEnqueue({ type, params }, nowMs);
    if (!event) return;
    runInAction(() => {
      this.publicState.traces.conceptualLog = this.conceptualLog.snapshot();
    });
  }
  setAssets({ audioBuffer: audioBuffer2, paintingBitmap: paintingBitmap2, fogVideoEl: fogVideoEl2 }) {
    if (audioBuffer2) this.assets.audioBuffer = audioBuffer2;
    if (paintingBitmap2) this.assets.paintingBitmap = paintingBitmap2;
    if (fogVideoEl2) this.assets.fogVideoEl = fogVideoEl2;
  }
  applyIntention(intent) {
    if (intent.type === "RESET_SOFT") {
      this.boundary.edgePressure = clamp01(this.boundary.edgePressure * 0.55);
      this.residue.residue = clamp01(this.residue.residue * 0.55);
      this.ambiguity.fogPressure = clamp01(this.ambiguity.fogPressure * 0.7);
      return;
    }
    if (intent.type === "TOGGLE_ZOOM") {
      runInAction(() => {
        this.publicState.mode = this.publicState.mode === "zoom-in" ? "zoom-out" : "zoom-in";
      });
      return;
    }
    this.painting.applyIntention(intent);
    this.voice.applyIntention(intent);
    this.ambiguity.applyIntention(intent);
    this.boundary.applyIntention(intent);
    this.orientation.applyIntention(intent);
  }
  tick() {
    var _a;
    const nowMs = Date.now();
    const dt = Math.min(0.2, Math.max(0, (nowMs - this.lastTickMs) / 1e3));
    this.lastTickMs = nowMs;
    this.timeMs = nowMs;
    const due = this.queue.drainDue(nowMs);
    for (const intent of due) {
      this.applyIntention(intent);
    }
    this.voice.update({ nowMs, dt });
    this.painting.update({ nowMs, dt });
    this.boundary.update({ dt });
    this.ambiguity.update({
      dt,
      voicePulse: this.voice.voicePulse,
      edgePressure: this.boundary.edgePressure,
      paintingCommit: this.painting.paintingCommit
    });
    this.residue.update({
      nowMs,
      dt,
      edgePressure: this.boundary.edgePressure,
      edgeDebt: this.boundary.edgeDebt
    });
    this.orientation.update({
      dt,
      residue: this.residue.residue,
      fogPressure: this.ambiguity.fogPressure
    });
    const motherDistance = clamp01(0.18 + this.ambiguity.fogPressure * 0.62 - this.boundary.edgePressure * 0.32);
    const metricSnapshot = {
      fogPressure: this.ambiguity.fogPressure,
      edgePressure: this.boundary.edgePressure,
      residue: this.residue.residue,
      orientationError: this.orientation.orientationError,
      voicePulse: this.voice.voicePulse,
      paintingCommit: this.painting.paintingCommit,
      motherDistance
    };
    for (const intent of due) {
      const programmaticEntry = {
        t: nowMs,
        type: intent.type,
        params: (_a = intent.params) != null ? _a : {},
        mode: this.publicState.mode,
        metrics: metricSnapshot
      };
      this.logger.log(programmaticEntry);
      this.conceptualLog.onApplied(intent, nowMs, metricSnapshot);
    }
    runInAction(() => {
      this.publicState.metrics.fogPressure = metricSnapshot.fogPressure;
      this.publicState.metrics.edgePressure = metricSnapshot.edgePressure;
      this.publicState.metrics.residue = metricSnapshot.residue;
      this.publicState.metrics.orientationError = metricSnapshot.orientationError;
      this.publicState.metrics.voicePulse = metricSnapshot.voicePulse;
      this.publicState.metrics.paintingCommit = metricSnapshot.paintingCommit;
      this.publicState.metrics.motherDistance = metricSnapshot.motherDistance;
      this.publicState.traces.boundarySegments = this.boundary.segments;
      this.publicState.traces.odorParticles = this.residue.odorParticles;
      this.publicState.traces.voiceMarks = this.voice.marks;
      this.publicState.traces.painting.locked = this.painting.locked;
      if (due.length > 0) {
        this.publicState.traces.conceptualLog = this.conceptualLog.snapshot();
      }
      this.publicState.logCount = this.logger.count;
    });
  }
};
var acting = () => {
  const world2 = new VioletCloudWorld();
  world2.start();
  world2.enqueueIntention({ type: "LISTEN_HOLD", params: { seed: true } });
  return {
    world: world2,
    publicState: world2.publicState
  };
};

// violet-cloud-and-sharp-boundaries/index.js
var { world, publicState } = acting();
var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d", { alpha: false });
var logCountEl = document.getElementById("logCount");
var metricsEl = document.getElementById("metrics");
var conceptualLogEl = document.getElementById("conceptualLog");
render_readme("readme_section", README_default);
function clamp012(value) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}
function createMetricRow({ id, label, gradient }) {
  const root = document.createElement("div");
  root.className = "metric";
  root.dataset.id = id;
  const labelEl = document.createElement("div");
  labelEl.className = "label";
  labelEl.textContent = label;
  const bar = document.createElement("div");
  bar.className = "bar";
  const fill = document.createElement("div");
  fill.className = "fill";
  if (gradient) fill.style.background = gradient;
  bar.appendChild(fill);
  const valueEl = document.createElement("div");
  valueEl.className = "value";
  valueEl.textContent = "0.00";
  root.appendChild(labelEl);
  root.appendChild(bar);
  root.appendChild(valueEl);
  return { root, fill, valueEl };
}
var metricRows = [
  createMetricRow({
    id: "fogPressure",
    label: "Fog",
    gradient: "linear-gradient(90deg, rgba(203,179,255,0.45), rgba(139,92,246,0.95))"
  }),
  createMetricRow({
    id: "edgePressure",
    label: "Edge",
    gradient: "linear-gradient(90deg, rgba(245,243,255,0.35), rgba(245,243,255,0.95))"
  }),
  createMetricRow({
    id: "residue",
    label: "Residue",
    gradient: "linear-gradient(90deg, rgba(216,195,138,0.35), rgba(216,195,138,0.95))"
  }),
  createMetricRow({
    id: "orientationError",
    label: "Orient",
    gradient: "linear-gradient(90deg, rgba(245,243,255,0.25), rgba(199,255,74,0.75))"
  }),
  createMetricRow({
    id: "voicePulse",
    label: "Voice",
    gradient: "linear-gradient(90deg, rgba(203,179,255,0.35), rgba(203,179,255,0.95))"
  }),
  createMetricRow({
    id: "paintingCommit",
    label: "Commit",
    gradient: "linear-gradient(90deg, rgba(139,92,246,0.35), rgba(199,255,74,0.85))"
  }),
  createMetricRow({
    id: "motherDistance",
    label: "Mother Distance",
    gradient: "linear-gradient(90deg, rgba(245,243,255,0.25), rgba(139,92,246,0.85))"
  })
];
metricRows.forEach((r) => metricsEl.appendChild(r.root));
function renderConceptualLog(entries) {
  var _a, _b;
  conceptualLogEl.innerHTML = "";
  const recent = entries.slice(-10).reverse();
  if (recent.length === 0) {
    const empty = document.createElement("div");
    empty.className = "conceptual-empty";
    empty.textContent = "\uC544\uC9C1 \uD574\uC11D\uB41C \uC6C0\uC9C1\uC784\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.";
    conceptualLogEl.appendChild(empty);
    return;
  }
  for (const item of recent) {
    const row = document.createElement("div");
    row.className = "conceptual-item";
    const time = document.createElement("div");
    time.className = "conceptual-time";
    time.textContent = (_a = item.clock) != null ? _a : "";
    const text = document.createElement("div");
    text.className = "conceptual-text";
    text.textContent = (_b = item.text) != null ? _b : "";
    row.appendChild(time);
    row.appendChild(text);
    conceptualLogEl.appendChild(row);
  }
}
autorun(() => {
  var _a, _b;
  const m = publicState.metrics;
  for (const row of metricRows) {
    const v = clamp012((_a = m[row.root.dataset.id]) != null ? _a : 0);
    row.fill.style.width = `${(v * 100).toFixed(1)}%`;
    row.valueEl.textContent = v.toFixed(2);
  }
  logCountEl.textContent = String((_b = publicState.logCount) != null ? _b : 0);
});
autorun(() => {
  var _a;
  const conceptualEntries = (_a = publicState.traces.conceptualLog) != null ? _a : [];
  renderConceptualLog(conceptualEntries);
});
document.getElementById("zoomToggle").addEventListener("click", () => {
  world.enqueueIntention({ type: "TOGGLE_ZOOM", params: {} });
});
document.getElementById("commitPainting").addEventListener("click", () => {
  world.enqueueIntention({ type: "COMMIT_PAINTING", params: {} });
});
document.getElementById("resetSoft").addEventListener("click", () => {
  world.enqueueIntention({ type: "RESET_SOFT", params: {} });
});
var listenHoldButton = document.getElementById("listenHold");
var listenTimer = null;
function listenOnce() {
  world.enqueueIntention({ type: "LISTEN_HOLD", params: {} });
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
listenHoldButton.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  listenHoldButton.setPointerCapture(e.pointerId);
  startListenLoop();
});
listenHoldButton.addEventListener("pointerup", (e) => {
  stopListenLoop();
  try {
    listenHoldButton.releasePointerCapture(e.pointerId);
  } catch (_) {
  }
});
listenHoldButton.addEventListener("pointercancel", stopListenLoop);
listenHoldButton.addEventListener("lostpointercapture", stopListenLoop);
var paintingBitmap = null;
var fogVideoEl = null;
var audioBuffer = null;
function assetUrl(filename) {
  return `./assets/${filename}`;
}
async function tryFetchBlob(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  return res.blob();
}
async function firstSuccessful(candidates, loader) {
  for (const c of candidates) {
    try {
      const v = await loader(c);
      if (v) return v;
    } catch (_) {
    }
  }
  return null;
}
async function loadPaintingBitmap() {
  const candidates = ["painting.jpg", "painting.png", "painting.webp"].map(assetUrl);
  return firstSuccessful(candidates, async (url) => {
    const blob = await tryFetchBlob(url);
    return createImageBitmap(blob);
  });
}
async function loadFogVideo() {
  const candidates = ["fog.webm", "fog.mp4"].map(assetUrl);
  return firstSuccessful(candidates, async (url) => {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("no video");
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    await video.play().catch(() => {
    });
    return video;
  });
}
async function decodeAudioUrl(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("no audio");
  const arrayBuffer = await res.arrayBuffer();
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return audioContext.decodeAudioData(arrayBuffer);
}
async function loadVoiceAudio() {
  const candidates = ["voice.ogg", "voice.mp3", "voice.wav"].map(assetUrl);
  return firstSuccessful(candidates, decodeAudioUrl);
}
async function loadBundledAssets() {
  const [bmp, fog, audio] = await Promise.all([
    loadPaintingBitmap(),
    loadFogVideo(),
    loadVoiceAudio()
  ]);
  if (bmp) paintingBitmap = bmp;
  if (fog) fogVideoEl = fog;
  if (audio) audioBuffer = audio;
  world.setAssets({ paintingBitmap: bmp != null ? bmp : void 0, fogVideoEl: fog != null ? fog : void 0, audioBuffer: audio != null ? audio : void 0 });
}
loadBundledAssets().catch(() => {
});
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
var activePointers = /* @__PURE__ */ new Map();
var singleStroke = null;
var dualStroke = null;
var pinchState = null;
function toNormPointFromClient(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width * 2 - 1;
  const y = (clientY - rect.top) / rect.height * 2 - 1;
  return { x: clamp012((x + 1) / 2) * 2 - 1, y: clamp012((y + 1) / 2) * 2 - 1 };
}
function touchPointerIds() {
  return Array.from(activePointers.entries()).filter(([, p]) => p.pointerType === "touch").map(([id]) => id);
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
  if (dx * dx + dy * dy < 8e-5) return;
  points.push(p);
  if (points.length > 220) points.splice(0, points.length - 220);
}
function resetPinchIfNeeded() {
  const ids = touchPointerIds();
  if (ids.length !== 2) {
    pinchState = null;
    return;
  }
  if (pinchState && pinchState.pointerIds[0] === ids[0] && pinchState.pointerIds[1] === ids[1]) {
    return;
  }
  const a = activePointers.get(ids[0]);
  const b = activePointers.get(ids[1]);
  if (!a || !b) return;
  pinchState = {
    pointerIds: [ids[0], ids[1]],
    lastDistPx: distancePx(a, b),
    lastSentAtMs: 0
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
  const amount = clamp012(Math.abs(delta) / 140);
  world.enqueueIntention({ type: "PULL_EAR", params: { amount } });
  pinchState.lastSentAtMs = nowMs;
}
function endSingleStroke() {
  if (!singleStroke) return;
  world.enqueueIntention({ type: singleStroke.type, params: { points: singleStroke.points } });
  singleStroke = null;
}
function endDualStroke() {
  if (!dualStroke) return;
  world.enqueueIntention({ type: "SMUDGE_STROKE", params: { points: dualStroke.points } });
  dualStroke = null;
}
canvas.addEventListener("pointerdown", (e) => {
  var _a, _b;
  canvas.setPointerCapture(e.pointerId);
  activePointers.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY, pointerType: e.pointerType });
  const nowMs = Date.now();
  if (e.pointerType === "mouse") {
    if (singleStroke || dualStroke) return;
    const type = e.button === 2 ? "SMUDGE_STROKE" : "SHARPEN_STROKE";
    singleStroke = {
      type,
      pointerId: e.pointerId,
      pointerType: "mouse",
      startedAtMs: nowMs,
      points: [toNormPointFromClient(e.clientX, e.clientY)]
    };
    return;
  }
  if (e.pointerType === "pen") {
    if (singleStroke || dualStroke) return;
    singleStroke = {
      type: "SHARPEN_STROKE",
      pointerId: e.pointerId,
      pointerType: "pen",
      startedAtMs: nowMs,
      points: [toNormPointFromClient(e.clientX, e.clientY)]
    };
    return;
  }
  resetPinchIfNeeded();
  const touchIds = touchPointerIds();
  if (touchIds.length === 2 && !dualStroke) {
    const shouldPromoteToDual = !singleStroke || singleStroke.pointerType === "touch" && (nowMs - singleStroke.startedAtMs < 180 || ((_b = (_a = singleStroke.points) == null ? void 0 : _a.length) != null ? _b : 0) <= 2);
    if (shouldPromoteToDual) {
      singleStroke = null;
      const a = activePointers.get(touchIds[0]);
      const b = activePointers.get(touchIds[1]);
      if (!a || !b) return;
      const c = centroidPoint(a, b);
      dualStroke = {
        pointerIds: [touchIds[0], touchIds[1]],
        points: [toNormPointFromClient(c.clientX, c.clientY)]
      };
    }
    return;
  }
  if (touchIds.length === 1 && !singleStroke && !dualStroke) {
    singleStroke = {
      type: "SHARPEN_STROKE",
      pointerId: e.pointerId,
      pointerType: "touch",
      startedAtMs: nowMs,
      points: [toNormPointFromClient(e.clientX, e.clientY)]
    };
  }
});
canvas.addEventListener("pointermove", (e) => {
  const p = activePointers.get(e.pointerId);
  if (p) {
    p.clientX = e.clientX;
    p.clientY = e.clientY;
  }
  const nowMs = Date.now();
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
    }
    endDualStroke();
    return;
  }
  if (singleStroke && e.pointerId === singleStroke.pointerId) {
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (_) {
    }
    endSingleStroke();
  }
}
canvas.addEventListener("pointerup", onPointerEnd);
canvas.addEventListener("pointercancel", onPointerEnd);
canvas.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const amount = clamp012(Math.abs(e.deltaY) / 800);
    world.enqueueIntention({ type: "PULL_EAR", params: { amount } });
  },
  { passive: false }
);
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width === w && canvas.height === h) return;
  canvas.width = w;
  canvas.height = h;
}
window.addEventListener("resize", resizeCanvas, { passive: true });
resizeCanvas();
var puffs = Array.from({ length: 60 }, (_, i) => {
  const a = i / 60 * Math.PI * 2;
  const r = 0.28 + i * 17 % 23 / 120;
  return {
    x: Math.cos(a) * r * 0.85 + (Math.random() * 2 - 1) * 0.1,
    y: Math.sin(a) * r * 0.55 + (Math.random() * 2 - 1) * 0.12,
    radius: 90 + i * 97 % 120,
    phase: Math.random() * 1e3
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
  g.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}
function drawFog({ w, h, t, fogPressure, purpleSaturation }) {
  const alphaBase = 0.04 + fogPressure * 0.12;
  for (let i = 0; i < puffs.length; i++) {
    const p = puffs[i];
    const dx = Math.sin((t + p.phase) * 5e-4 + i * 1.7) * (0.16 + fogPressure * 0.18);
    const dy = Math.cos((t + p.phase) * 42e-5 + i * 2.1) * (0.16 + fogPressure * 0.16);
    const x = mapX(p.x + dx, w);
    const y = mapY(p.y + dy, h);
    const rad = p.radius * (0.65 + fogPressure * 0.6);
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, `rgba(203,179,255,${alphaBase * (0.9 + purpleSaturation * 0.4)})`);
    g.addColorStop(0.6, `rgba(139,92,246,${alphaBase * (0.5 + purpleSaturation * 0.3)})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
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
  ctx.lineCap = "round";
  ctx.lineJoin = "miter";
  ctx.lineWidth = lineW;
  const nowMs = t;
  for (const s of segments) {
    const age = nowMs - s.bornMs;
    const fade = clamp012(1 - age / 8e3);
    if (fade <= 0) continue;
    ctx.strokeStyle = `rgba(245,243,255,${fade * (0.12 + edgePressure * 0.88)})`;
    ctx.beginPath();
    ctx.moveTo(mapX(s.x1, w), mapY(s.y1, h));
    ctx.lineTo(mapX(s.x2, w), mapY(s.y2, h));
    ctx.stroke();
  }
  if (residue > 0.18 && segments.length > 0) {
    const specks = Math.floor(18 + residue * 64);
    ctx.fillStyle = `rgba(216,195,138,${0.08 + residue * 0.25})`;
    for (let i = 0; i < specks; i++) {
      const s = segments[(i * 17 + Math.floor(t / 50)) % segments.length];
      const k = i * 73 % 100 / 100;
      const x = mapX(s.x1 + (s.x2 - s.x1) * k, w) + Math.sin(t * 0.01 + i) * 2.2;
      const y = mapY(s.y1 + (s.y2 - s.y1) * k, h) + Math.cos(t * 0.012 + i) * 2.2;
      const r = 0.8 + i * 13 % 5 * 0.25;
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
    const n = Math.sin(t * 6e-3 + x * 0.02) + Math.sin(t * 13e-4 + x * 0.05) * 0.6;
    const y = y0 + n * amp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
  for (const p of particles) {
    const x = mapX(p.x, w);
    const y = mapY(p.y, h);
    const a = clamp012(p.life) * (0.35 + residue * 0.4);
    ctx.fillStyle = `rgba(199,255,74,${a})`;
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawVoice({ w, h, voicePulse }) {
  if (voicePulse <= 0.02) return;
  const alpha = clamp012(voicePulse) * 0.92;
  const scale = 0.98 + voicePulse * 0.07;
  ctx.save();
  ctx.translate(w / 2, h * 0.45);
  ctx.scale(scale, scale);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "600 44px ui-serif, Georgia, Cambria, Times, serif";
  ctx.fillStyle = `rgba(245,243,255,${alpha})`;
  ctx.fillText("...", 0, 0);
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
    g.addColorStop(0, "rgba(203,179,255,0.9)");
    g.addColorStop(0.7, "rgba(139,92,246,0.7)");
    g.addColorStop(1, "rgba(20,6,43,0.95)");
    ctx.fillStyle = g;
    ctx.fillRect(x + 2, y + 2, ww - 4, hh - 4);
    ctx.globalAlpha *= 0.55;
    ctx.fillStyle = "rgba(245,243,255,0.08)";
    const bands = 10;
    for (let i = 0; i < bands; i++) {
      const yy = y + 2 + (i + 0.5) / bands * (hh - 4);
      const shift = Math.sin(t * 12e-4 + i * 1.7) * 12 * commit;
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
    ctx.arc(x, y, 16 + Math.sin(t * 4e-3 + x) * 1.6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(245,243,255,0.7)";
    ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(label, x, y + 18);
  }
  node({
    ...listener,
    label: "Listener",
    fill: "rgba(245,243,255,0.55)",
    ring: `rgba(245,243,255,${0.08 + (1 - dist) * 0.22})`
  });
  node({
    ...mother,
    label: "Mother",
    fill: `rgba(203,179,255,${0.28 + (1 - dist) * 0.22})`,
    ring: `rgba(203,179,255,${0.06 + (1 - dist) * 0.25})`
  });
  node({
    ...voice,
    label: "Voice",
    fill: `rgba(139,92,246,${0.25 + pulse * 0.55})`,
    ring: `rgba(199,255,74,${0.04 + pulse * 0.25})`
  });
  ctx.fillStyle = "rgba(245,243,255,0.55)";
  ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(
    `fog:${fog.toFixed(2)} edge:${edge.toFixed(2)} residue:${metrics.residue.toFixed(2)} orient:${metrics.orientationError.toFixed(2)}`,
    cx,
    h * 0.94
  );
  ctx.restore();
}
var lastFrameMs = performance.now();
function frame(nowMs) {
  resizeCanvas();
  const w = canvas.width;
  const h = canvas.height;
  const t = Date.now();
  const dt = Math.min(0.05, Math.max(0, (nowMs - lastFrameMs) / 1e3));
  lastFrameMs = nowMs;
  const m = publicState.metrics;
  const traces = publicState.traces;
  const vibHz = 7.4;
  const vib = Math.sin(t / 1e3 * Math.PI * 2 * vibHz);
  const maxRot = 2.2 * Math.PI / 180;
  const rot = m.orientationError * (0.35 + 0.65 * vib) * maxRot;
  const drift = m.orientationError * 22 * Math.sin(t * 21e-4);
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
  if (publicState.mode === "zoom-out") {
    drawZoomOutOverlay({ w, h, t, metrics: m });
  }
  ctx.restore();
  if (dt > 0) {
    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, w, 1);
    ctx.fillRect(0, h - 1, w, 1);
    ctx.restore();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.addEventListener("beforeunload", () => {
  stopListen();
  world.stop();
});
//# sourceMappingURL=index.js.map
