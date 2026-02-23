import {
  createProgrammaticLogTransport
} from "../chunks/chunk-NCNIJLHM.js";
import {
  autorun,
  initI18n,
  initThoughtOverlay,
  observable,
  render_readme,
  runInAction
} from "../chunks/chunk-YTQZDIRW.js";

// raw-file:C:\Users\qodls\Desktop\source\works\violet-cloud-and-sharp-boundaries\README.md
var README_default = "\uAC11\uC791\uC2A4\uB7F0 \uD734\uAC00\uB97C \uB9C8\uCE58\uACE0 \uD55C \uBA87 \uB144\uC740 \uB354 \uC9D1\uC774\uB77C\uACE0 \uBD80\uB97C \uC218 \uC788\uB294 \uACF3\uC73C\uB85C \uB3CC\uC544\uAC00\uBA74\uC11C, \uCD5C\uADFC \uB4E4\uC5B4 \uB2E4\uC2DC \uCC3E\uC544 \uB4E3\uAE30 \uC2DC\uC791\uD55C \uC774\uC18C\uB77C\uC758 \uB178\uB798\uB97C \uB4E3\uB294\uB2E4. \uC5B4\uB9B4 \uC801 \uC5C4\uB9C8\uAC00 \uD2C0\uC5B4\uB450\uC5C8\uB358 \uC774\uC18C\uB77C\uC758 \uB178\uB798\uB294 \uC7A0\uB4E4\uAE30 \uC804 \uC774\uC5B4\uD3F0\uC73C\uB85C \uC62E\uACA8 \uB4E4\uC5B4\uC640 \uC774\uC720 \uC5C6\uB294 \uB098\uC758 \uC6B0\uC6B8\uC5D0, \uB290\uB9BF\uB290\uB9BF\uD558\uACE0, \uB3D9\uD0DC \uB208\uAE54 \uAC19\uB2E4\uB358 \uB208\uBE5B\uC5D0 \uD070 \uBAAB\uC744 \uD588\uB2E4. \uC5C4\uB9C8\uB294 \uC774 \uB178\uB798 \uC18D\uC73C\uB85C \uB354 \uD30C\uACE0 \uB4E4\uC5B4\uAC14\uACE0, \uB098\uB294 \uC774 \uBCF4\uB78F\uBE5B \uBB49\uAC8C \uAD6C\uB984\uC5D0\uC11C \uBE60\uC838\uB098\uC640\uC57C \uD588\uB2E4. \uD750\uB9BF\uD55C \uACBD\uACC4\uB4E4\uC744 \uAC01\uC9C0\uAC8C \uB2E4\uB4EC\uACE0 \uBA85\uD655\uD55C \uBA54\uC2DC\uC9C0\uB97C \uC804\uB2EC\uD574\uC57C \uD588\uB2E4. \uAC01\uC9C4 \uAC83\uC740 \uB531\uB531\uD574\uC9C0\uACE0, \uCE58\uC11D \uAC19\uC740 \uAC83\uB4E4\uC774 \uB418\uC5B4\uC11C \uB0C4\uC0C8\uB97C \uBFDC\uC5B4 \uC5B4\uC9C0\uB7FD\uAC8C \uD558\uACE0 \uAC77\uB294 \uC640\uC911\uC5D0\uB3C4 \uADC0\uB97C \uC591\uCABD\uC73C\uB85C \uCB49 \uC7A1\uC544\uB2F9\uACA8 \uC5B4\uB514\uB85C \uAC00\uC57C \uD560 \uC9C0 \uAC08\uD53C\uB97C \uC7A1\uC744 \uC218 \uC5C6\uC5C8\uB358 \uAC83\uC774\uB2E4. \uADF8\uB7EC\uB358 \uC5B4\uB290 \uB0A0\uC5D0 \uC774 \uBB49\uAC8C\uBB49\uAC1C\uD558\uACE0 \uBAA8\uD638\uD55C \uBAA9\uC18C\uB9AC\uAC00 \uB2E4\uC2DC \uB4E4\uB9B0 \uAC83\uC774\uB2E4. \uCEE4\uB2E4\uB780 \uBCF4\uB77C\uC0C9 \uADF8\uB9BC\uC744 \uC0AC\uC11C \uBCBD\uC5D0\uB2E4 \uAC78\uC5B4\uC57C \uD560 \uC218\uB3C4 \uC788\uACA0\uB2E4.\r\n\r\n---\r\n\r\nAfter finishing a sudden vacation, as I head back to a place I can still call home for the next few years, I find myself listening again to Lee Sora's songs. When I was young, the Lee Sora my mother used to play would move into my earphones before sleep and took a big part in my causeless sadness\u2014its slow pace, and the gaze people joked looked like a pollack's dead eyes. My mother sank deeper into these songs, and I had to climb out of those violet, billowing clouds. I had to sharpen blurred boundaries into hard edges and deliver a clear message. But what becomes angular becomes hard; it turns into something like tartar, giving off a smell that makes you dizzy, so that even while walking you end up pulling your ears outward with both hands, unable to find where you're supposed to go. And then one day, that smudgy, ambiguous voice returned. I might have to buy a large violet painting and hang it on the wall.\r\n";

// violet-cloud-and-sharp-boundaries/utils/math.js
function clamp01(value) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}
function easeInCubic(t2) {
  const x = clamp01(t2);
  return x * x * x;
}

// violet-cloud-and-sharp-boundaries/utils/mulberry32.js
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = a + 1831565813 | 0;
    let t2 = Math.imul(a ^ a >>> 15, 1 | a);
    t2 = t2 + Math.imul(t2 ^ t2 >>> 7, 61 | t2) ^ t2;
    return ((t2 ^ t2 >>> 14) >>> 0) / 4294967296;
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
    const t2 = elapsed / this.pulse.durationMs;
    if (t2 >= 1) {
      this.pulse = null;
      this.voicePulse = 0;
      return;
    }
    this.voicePulse = Math.sin(t2 * Math.PI);
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
    const t2 = (nowMs - this.commitStartedAtMs) / durationMs;
    this.paintingCommit = easeInCubic(t2);
  }
};

// violet-cloud-and-sharp-boundaries/entities/ConceptualLogProcess.js
var MESSAGE_SETS = {
  ko: {
    queued: {
      LISTEN_HOLD: [
        "\uB4E3\uAE30\uC758 \uC9C0\uC18D\uC774 \uC548\uAC1C\uB97C \uD5A5\uD574 \uAE30\uC6B8\uAE30 \uC2DC\uC791\uD55C\uB2E4.",
        "\uC870\uC6A9\uD55C \uB20C\uB9BC\uC774 \uBAA9\uC18C\uB9AC\uC758 \uADC0\uD658\uC744 \uAE30\uB2E4\uB9B0\uB2E4.",
        "\uBA48\uCD98 \uC190\uB05D\uC774 \uD750\uB9BF\uD55C \uCE35\uC744 \uB354 \uAC00\uAE4C\uC774 \uB2F9\uAE34\uB2E4."
      ],
      SHARPEN_STROKE: [
        "\uACBD\uACC4\uB97C \uC138\uC6B0\uB824\uB294 \uD798\uC774 \uC120\uC758 \uACB0\uC744 \uB9CC\uB4E0\uB2E4.",
        "\uB0A0\uCE74\uB85C\uC6B4 \uD68D\uC774 \uC548\uAC1C\uC758 \uBA74\uC744 \uAC00\uB978\uB2E4.",
        "\uBAA8\uD638\uD568\uC744 \uACAC\uB514\uC9C0 \uBABB\uD55C \uC190\uC774 \uAC00\uC7A5\uC790\uB9AC\uBD80\uD130 \uC870\uC778\uB2E4."
      ],
      SMUDGE_STROKE: [
        "\uB2E8\uB2E8\uD55C \uBAA8\uC11C\uB9AC\uB97C \uB2E4\uC2DC \uBC88\uC9C0\uAC8C \uB20C\uB7EC \uB193\uB294\uB2E4.",
        "\uACBD\uACC4 \uC704\uC5D0 \uD750\uB9BC\uC744 \uB367\uCE60\uD558\uB824\uB294 \uC6C0\uC9C1\uC784\uC774 \uB4E4\uC5B4\uC628\uB2E4.",
        "\uBD84\uB9AC\uB41C \uBA74\uC744 \uB2E4\uC2DC \uD55C \uB369\uC5B4\uB9AC\uB85C \uBB36\uC73C\uB824\uB294 \uC81C\uC2A4\uCC98\uB2E4."
      ],
      PULL_EAR: [
        "\uBC29\uD5A5 \uAC10\uAC01\uC744 \uC7A0\uC2DC \uBC14\uB85C\uC7A1\uAE30 \uC704\uD574 \uADC0\uB97C \uB2F9\uAE34\uB2E4.",
        "\uAE30\uC900\uC810\uC758 \uD754\uB4E4\uB9BC\uC744 \uC904\uC774\uB824\uB294 \uC694\uCCAD\uC774 \uB4E4\uC5B4\uC628\uB2E4.",
        "\uBA40\uC5B4\uC9C4 \uC18C\uB9AC\uB97C \uB2E4\uC2DC \uBD99\uB4E4\uAE30 \uC704\uD55C \uBBF8\uC138\uD55C \uC870\uC815\uC774\uB2E4."
      ],
      COMMIT_PAINTING: [
        "\uBCF4\uB78F\uBE5B \uC7A5\uBA74\uC744 \uBCBD\uC758 \uC2DC\uAC04\uC73C\uB85C \uACE0\uC815\uD558\uB824 \uD55C\uB2E4.",
        "\uD754\uB4E4\uB9AC\uB294 \uD45C\uBA74\uC744 \uD55C \uBC88 \uBA48\uCDB0 \uC138\uC6B0\uB294 \uC120\uD0DD\uC774\uB2E4.",
        "\uB5A0\uB2E4\uB2C8\uB294 \uAC10\uAC01\uC744 \uAE30\uB85D \uAC00\uB2A5\uD55C \uBA74\uC73C\uB85C \uC62E\uAE34\uB2E4."
      ],
      TOGGLE_ZOOM: [
        "\uAD00\uC810\uC774 \uBC14\uB00C\uBA70 \uAC19\uC740 \uC7A5\uBA74\uC758 \uAC70\uB9AC\uAC10\uC774 \uB2EC\uB77C\uC9C4\uB2E4.",
        "\uC90C\uC758 \uC804\uD658\uC774 \uAD6C\uC870\uC640 \uAC10\uAC01\uC758 \uBE44\uC728\uC744 \uB2E4\uC2DC \uB9DE\uCD98\uB2E4.",
        "\uD55C \uBC1C \uBB3C\uB7EC\uC11C\uAC70\uB098 \uB2E4\uAC00\uC11C\uBA70 \uC77D\uB294 \uB2E8\uC704\uAC00 \uBC14\uB010\uB2E4."
      ],
      RESET_SOFT: [
        "\uACFC\uC5F4\uB41C \uACB0\uC744 \uCC9C\uCC9C\uD788 \uC2DD\uD788\uB824\uB294 \uAC1C\uC785\uC774\uB2E4.",
        "\uACFC\uB3C4\uD558\uAC8C \uB0A0 \uC120 \uBA74\uC744 \uC644\uB9CC\uD558\uAC8C \uB418\uB3CC\uB9B0\uB2E4.",
        "\uAE34\uC7A5\uC744 \uB04A\uC9C0 \uC54A\uACE0 \uAC15\uB3C4\uB9CC \uB0AE\uCD94\uB824 \uD55C\uB2E4."
      ]
    },
    applied: {
      LISTEN_HOLD: [
        "\uC548\uAC1C\uCE35\uC774 \uBAA9\uC18C\uB9AC\uC758 \uC5EC\uC6B4\uC744 \uB2E4\uC2DC \uB04C\uC5B4\uC628\uB2E4.",
        "\uD76C\uBBF8\uD55C \uD30C\uB3D9\uC774 \uD45C\uBA74\uC5D0 \uB0AE\uAC8C \uBC88\uC9C4\uB2E4.",
        "\uB4E3\uAE30\uC758 \uC794\uB958\uAC00 \uC7A5\uBA74\uC758 \uBC00\uB3C4\uB97C \uBC14\uAFBC\uB2E4."
      ],
      SHARPEN_STROKE: [
        "\uACBD\uACC4\uC758 \uC120\uBA85\uB3C4\uAC00 \uC870\uAE08 \uB354 \uC62C\uB77C\uAC04\uB2E4.",
        "\uD750\uB9B0 \uB369\uC5B4\uB9AC \uC548\uC5D0\uC11C \uBAA8\uC11C\uB9AC\uAC00 \uB4DC\uB7EC\uB09C\uB2E4.",
        "\uC548\uAC1C\uAC00 \uBB3C\uB7EC\uC11C\uACE0 \uC120\uC758 \uAE34\uC7A5\uC774 \uB0A8\uB294\uB2E4."
      ],
      SMUDGE_STROKE: [
        "\uC120\uBA85\uD588\uB358 \uACBD\uACC4\uAC00 \uB2E4\uC2DC \uBD80\uB4DC\uB7EC\uC6CC\uC9C4\uB2E4.",
        "\uACBD\uACC4\uC640 \uC548\uAC1C\uC758 \uAC70\uB9AC \uCC28\uAC00 \uC904\uC5B4\uB4E0\uB2E4.",
        "\uB2E8\uB2E8\uD55C \uBD84\uC808\uC774 \uB290\uB9B0 \uCE35\uC73C\uB85C \uD769\uC5B4\uC9C4\uB2E4."
      ],
      PULL_EAR: [
        "\uBC29\uD5A5 \uC624\uCC28\uAC00 \uC7A0\uC2DC \uB0AE\uC544\uC9C4\uB2E4.",
        "\uD754\uB4E4\uB9AC\uB358 \uAE30\uC900\uC810\uC774 \uC9E7\uAC8C \uC815\uB82C\uB41C\uB2E4.",
        "\uADC0\uB97C \uB2F9\uAE34 \uB9CC\uD07C \uC2DC\uC120\uC758 \uD3B8\uCC28\uAC00 \uC904\uC5B4\uB4E0\uB2E4."
      ],
      COMMIT_PAINTING: [
        "\uBCF4\uB78F\uBE5B \uCE35\uC774 \uACE0\uC815\uBA74\uC5D0 \uAC00\uAE4C\uC6CC\uC9C4\uB2E4.",
        "\uB5A0\uB2E4\uB2C8\uB358 \uC774\uBBF8\uC9C0\uAC00 \uBCBD\uC758 \uC2DC\uAC04\uC73C\uB85C \uBD99\uB294\uB2E4.",
        "\uACE0\uC815\uB3C4\uAC00 \uC62C\uB77C\uAC00\uBA70 \uD754\uB4E4\uB9BC\uC758 \uC5EC\uC9C0\uAC00 \uC904\uC5B4\uB4E0\uB2E4."
      ],
      TOGGLE_ZOOM: [
        "\uAC19\uC740 \uD754\uC801\uC774 \uB2E4\uB978 \uD574\uC0C1\uB3C4\uB85C \uC77D\uD78C\uB2E4.",
        "\uAD00\uCC30 \uAC70\uB9AC\uC758 \uBCC0\uACBD\uC774 \uAD00\uACC4\uC758 \uC74C\uC0C9\uC744 \uBC14\uAFBC\uB2E4.",
        "\uAD6C\uC870\uC640 \uAC10\uAC01\uC774 \uC11C\uB85C \uB2E4\uB978 \uBE44\uC728\uB85C \uAC15\uC870\uB41C\uB2E4."
      ],
      RESET_SOFT: [
        "\uB0A0 \uC120 \uACB0\uC774 \uB204\uADF8\uB7EC\uC9C0\uBA70 \uC7A5\uBA74\uC774 \uC228\uC744 \uACE0\uB978\uB2E4.",
        "\uACFC\uC5F4 \uAD6C\uAC04\uC774 \uC644\uB9CC\uD558\uAC8C \uB0AE\uC544\uC9C4\uB2E4.",
        "\uAE34\uC7A5\uC744 \uB0A8\uAE34 \uCC44 \uD45C\uBA74\uC758 \uAC15\uB3C4\uB9CC \uB0B4\uB824\uAC04\uB2E4."
      ]
    },
    fallback: {
      queued: [
        "\uC791\uC740 \uAC1C\uC785\uC774 \uC9C0\uC5F0 \uD050\uC5D0 \uC313\uC778\uB2E4.",
        "\uC9C0\uAE08\uC758 \uC785\uB825\uC740 \uC7A0\uC2DC \uB4A4 \uC7A5\uBA74\uC5D0 \uB3C4\uCC29\uD55C\uB2E4.",
        "\uBCC0\uD654\uC758 \uBA85\uB839\uC774 \uB0B4\uBD80 \uB9AC\uB4EC\uC73C\uB85C \uBC88\uC5ED\uB41C\uB2E4."
      ],
      applied: [
        "\uB204\uC801\uB41C \uAC1C\uC785\uC774 \uD45C\uBA74\uC73C\uB85C \uB098\uD0C0\uB09C\uB2E4.",
        "\uC9C0\uC5F0\uB41C \uADDC\uCE59\uC774 \uC7A5\uBA74\uC758 \uC9C8\uAC10\uC744 \uB2E4\uC2DC \uC4F4\uB2E4.",
        "\uAC19\uC740 \uD654\uBA74\uC774 \uB2E4\uB978 \uAE34\uC7A5\uB3C4\uB85C \uAC31\uC2E0\uB41C\uB2E4."
      ]
    },
    tail: {
      paintingCommit: [
        "\uACE0\uC815\uB41C \uBCF4\uB77C\uAC00 \uBCBD\uC758 \uC2DC\uAC04\uC5D0 \uAC70\uC758 \uB3C4\uB2EC\uD588\uB2E4.",
        "\uBCF4\uB77C\uC758 \uD45C\uBA74\uC740 \uC774\uC81C \uC27D\uAC8C \uD754\uB4E4\uB9AC\uC9C0 \uC54A\uB294\uB2E4."
      ],
      residue: [
        "\uAC00\uC7A5\uC790\uB9AC\uC758 \uC794\uC5EC\uAC00 \uC11D\uD68C\uCC98\uB7FC \uB0A8\uC544 \uC788\uB2E4.",
        "\uB204\uC801\uB41C \uC794\uB958\uAC00 \uACF5\uAE30\uC758 \uACB0\uC744 \uD0C1\uD558\uAC8C \uB9CC\uB4E0\uB2E4.",
        "\uB0A8\uC740 \uBD80\uD558\uAC00 \uC7A5\uBA74\uC758 \uC228\uC744 \uBB34\uAC81\uAC8C \uD55C\uB2E4."
      ],
      orientationError: [
        "\uBC29\uD5A5 \uAC10\uAC01\uC758 \uD754\uB4E4\uB9BC\uC774 \uC544\uC9C1 \uD06C\uB2E4.",
        "\uAE30\uC900\uC810\uC758 \uD3B8\uCC28\uAC00 \uAC77\uB294 \uCD95\uC744 \uBE44\uD2C0\uACE0 \uC788\uB2E4.",
        "\uC815\uB82C\uB418\uC9C0 \uC54A\uC740 \uAC10\uAC01\uC774 \uC2DC\uC57C\uB97C \uD754\uB4E0\uB2E4."
      ],
      fogDominant: [
        "\uC548\uAC1C\uAC00 \uACBD\uACC4\uB97C \uB2E4\uC2DC \uAC10\uC2FC\uB2E4.",
        "\uD750\uB9BC\uC758 \uC555\uB825\uC774 \uBAA8\uC11C\uB9AC\uB97C \uB36E\uACE0 \uC9C0\uB098\uAC04\uB2E4."
      ],
      edgeDominant: [
        "\uACBD\uACC4\uAC00 \uC548\uAC1C\uB97C \uBC00\uC5B4\uB0B4\uBA70 \uC55E\uC120\uB2E4.",
        "\uBAA8\uC11C\uB9AC\uC758 \uAE34\uC7A5\uC774 \uD750\uB9BC\uC758 \uBA74\uC744 \uAC00\uB978\uB2E4."
      ],
      balance: [
        "\uD750\uB9BC\uACFC \uACBD\uACC4\uAC00 \uBD88\uC548\uC815\uD55C \uADE0\uD615\uC744 \uC720\uC9C0\uD55C\uB2E4.",
        "\uB458 \uC0AC\uC774\uC758 \uAE34\uC7A5\uC740 \uC5B4\uB290 \uCABD\uB3C4 \uC644\uC804\uD788 \uC774\uAE30\uC9C0 \uBABB\uD55C\uB2E4."
      ]
    }
  },
  en: {
    queued: {
      LISTEN_HOLD: [
        "Sustained listening tilts the scene toward fog.",
        "A quiet hold waits for voice to return.",
        "A still fingertip draws the hazy layer closer."
      ],
      SHARPEN_STROKE: [
        "A force to define edges enters the field.",
        "A sharp stroke cuts through the fog plane.",
        "The hand tightens the boundary from the rim inward."
      ],
      SMUDGE_STROKE: [
        "Hard edges are pressed back into blur.",
        "A softening pass lands on top of the boundary.",
        "Separated planes are asked to merge again."
      ],
      PULL_EAR: [
        "The ear is pulled to recover orientation.",
        "A request arrives to steady the reference point.",
        "A small adjustment tries to catch a drifting signal."
      ],
      COMMIT_PAINTING: [
        "The violet scene is asked to lock to wall-time.",
        "A floating surface is briefly fixed in place.",
        "Drift is converted into a recordable frame."
      ],
      TOGGLE_ZOOM: [
        "View distance shifts and relation scale changes.",
        "Zoom switching rewrites structure-to-sensation ratio.",
        "Stepping in or out changes the reading unit."
      ],
      RESET_SOFT: [
        "An intervention cools the overheated grain.",
        "Over-sharpened surfaces are softened without erasing.",
        "Tension remains, but intensity is lowered."
      ]
    },
    applied: {
      LISTEN_HOLD: [
        "Fog pulls back the tail of voice.",
        "A low wave spreads across the surface.",
        "Residual listening changes scene density."
      ],
      SHARPEN_STROKE: [
        "Edge clarity rises a little.",
        "Corners emerge from the blurred mass.",
        "Fog retreats while line tension remains."
      ],
      SMUDGE_STROKE: [
        "A crisp edge softens again.",
        "Distance between edge and fog narrows.",
        "Hard segmentation dissolves into slower layers."
      ],
      PULL_EAR: [
        "Orientation error drops for a moment.",
        "The drifting reference aligns briefly.",
        "Gaze variance tightens after the pull."
      ],
      COMMIT_PAINTING: [
        "The violet layer nears a fixed state.",
        "A drifting image adheres to wall-time.",
        "Commit depth rises and reduces drift room."
      ],
      TOGGLE_ZOOM: [
        "The same trace reads at another resolution.",
        "Distance change retunes relational timbre.",
        "Structure and sensation are reweighted."
      ],
      RESET_SOFT: [
        "Sharp grain eases and the scene exhales.",
        "Hot zones cool into a gentler slope.",
        "Tension is kept while intensity drops."
      ]
    },
    fallback: {
      queued: [
        "A small intervention enters the delayed queue.",
        "This input arrives in the scene a little later.",
        "A change request is translated into internal rhythm."
      ],
      applied: [
        "Accumulated interventions surface on the frame.",
        "Delayed rules rewrite the scene texture.",
        "The same image refreshes with different tension."
      ]
    },
    tail: {
      paintingCommit: [
        "Committed violet is close to wall-time.",
        "The purple surface is now hard to dislodge."
      ],
      residue: [
        "Edge residue remains like mineral crust.",
        "Accumulated residue muddies the air grain.",
        "Leftover load makes the scene breathe heavier."
      ],
      orientationError: [
        "Orientation jitter is still high.",
        "Reference drift keeps twisting the walking axis.",
        "Unaligned sensing continues to shake the view."
      ],
      fogDominant: [
        "Fog folds over the boundary again.",
        "Blur pressure moves across the edge line."
      ],
      edgeDominant: [
        "Boundary pushes ahead of fog.",
        "Edge tension cuts across the blur plane."
      ],
      balance: [
        "Fog and edge hold an unstable balance.",
        "Neither side fully dominates the other."
      ]
    }
  }
};
function resolveLanguage(language2) {
  if (!language2 || typeof language2 !== "string") return "en";
  const lower = language2.toLowerCase();
  if (lower.startsWith("ko")) return "ko";
  if (lower.startsWith("en")) return "en";
  return "en";
}
function clockText(nowMs) {
  const d = new Date(nowMs);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
function pickFrom({ rng, memory, key, variants }) {
  if (!Array.isArray(variants) || variants.length === 0) return "";
  if (variants.length === 1) return variants[0];
  const last = memory.get(key);
  let idx = Math.floor(rng() * variants.length);
  if (last != null && idx === last) idx = (idx + 1) % variants.length;
  memory.set(key, idx);
  return variants[idx];
}
function atmosphereTail({ metrics, pick, messages }) {
  if (!metrics) return "";
  if (metrics.paintingCommit >= 0.95) return pick("tail:paintingCommit", messages.tail.paintingCommit);
  if (metrics.residue >= 0.45) return pick("tail:residue", messages.tail.residue);
  if (metrics.orientationError >= 0.5) return pick("tail:orientationError", messages.tail.orientationError);
  if (metrics.fogPressure > metrics.edgePressure + 0.12) return pick("tail:fogDominant", messages.tail.fogDominant);
  if (metrics.edgePressure > metrics.fogPressure + 0.12)
    return pick("tail:edgeDominant", messages.tail.edgeDominant);
  return pick("tail:balance", messages.tail.balance);
}
var ConceptualLogProcess = class {
  constructor({ rng = Math.random, language: language2 = "en" } = {}) {
    this.rng = rng;
    this.pickMemory = /* @__PURE__ */ new Map();
    this.events = [];
    this.maxEvents = 24;
    this.sequence = 0;
    this.lastQueuedType = null;
    this.lastQueuedAtMs = 0;
    this.messages = MESSAGE_SETS[resolveLanguage(language2)];
  }
  pick(key, variants) {
    return pickFrom({ rng: this.rng, memory: this.pickMemory, key, variants });
  }
  onEnqueue(intent, nowMs) {
    var _a, _b;
    if ((_a = intent.params) == null ? void 0 : _a.seed) return null;
    if (intent.type === this.lastQueuedType && nowMs - this.lastQueuedAtMs < 650) return null;
    this.lastQueuedType = intent.type;
    this.lastQueuedAtMs = nowMs;
    const text = this.pick(
      `queued:${intent.type}`,
      (_b = this.messages.queued[intent.type]) != null ? _b : this.messages.fallback.queued
    );
    return this.push({ nowMs, text, phase: "gesture" });
  }
  onApplied(intent, nowMs, metrics) {
    var _a, _b;
    if ((_a = intent.params) == null ? void 0 : _a.seed) return null;
    const lead = this.pick(
      `applied:${intent.type}`,
      (_b = this.messages.applied[intent.type]) != null ? _b : this.messages.fallback.applied
    );
    const tail = atmosphereTail({ metrics, messages: this.messages, pick: (k, v) => this.pick(k, v) });
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
  constructor({ language: language2 = "en" } = {}) {
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
    this.conceptualLog = new ConceptualLogProcess({ rng: this.logRng, language: language2 });
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
var acting = ({ language: language2 = "en" } = {}) => {
  const world2 = new VioletCloudWorld({ language: language2 });
  world2.start();
  world2.enqueueIntention({ type: "LISTEN_HOLD", params: { seed: true } });
  return {
    world: world2,
    publicState: world2.publicState
  };
};

// violet-cloud-and-sharp-boundaries/index.js
var { language, t } = initI18n();
var { world, publicState } = acting({ language });
var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d", { alpha: false });
var logCountEl = document.getElementById("logCount");
var metricsEl = document.getElementById("metrics");
var conceptualLogEl = document.getElementById("conceptualLog");
render_readme("readme_section", README_default);
initThoughtOverlay();
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
    label: t("violet.metrics.fog"),
    gradient: "linear-gradient(90deg, rgba(203,179,255,0.45), rgba(139,92,246,0.95))"
  }),
  createMetricRow({
    id: "edgePressure",
    label: t("violet.metrics.edge"),
    gradient: "linear-gradient(90deg, rgba(245,243,255,0.35), rgba(245,243,255,0.95))"
  }),
  createMetricRow({
    id: "residue",
    label: t("violet.metrics.residue"),
    gradient: "linear-gradient(90deg, rgba(216,195,138,0.35), rgba(216,195,138,0.95))"
  }),
  createMetricRow({
    id: "orientationError",
    label: t("violet.metrics.orient"),
    gradient: "linear-gradient(90deg, rgba(245,243,255,0.25), rgba(199,255,74,0.75))"
  }),
  createMetricRow({
    id: "voicePulse",
    label: t("violet.metrics.voice"),
    gradient: "linear-gradient(90deg, rgba(203,179,255,0.35), rgba(203,179,255,0.95))"
  }),
  createMetricRow({
    id: "paintingCommit",
    label: t("violet.metrics.commit"),
    gradient: "linear-gradient(90deg, rgba(139,92,246,0.35), rgba(199,255,74,0.85))"
  }),
  createMetricRow({
    id: "motherDistance",
    label: t("violet.metrics.motherDistance"),
    gradient: "linear-gradient(90deg, rgba(245,243,255,0.25), rgba(139,92,246,0.85))"
  })
];
metricRows.forEach((r) => metricsEl.appendChild(r.root));
var overlayLabels = {
  listener: t("violet.overlay.listener"),
  mother: t("violet.overlay.mother"),
  voice: t("violet.overlay.voice"),
  metricFog: t("violet.overlay.metricFog"),
  metricEdge: t("violet.overlay.metricEdge"),
  metricResidue: t("violet.overlay.metricResidue"),
  metricOrient: t("violet.overlay.metricOrient")
};
function renderConceptualLog(entries) {
  var _a, _b;
  conceptualLogEl.innerHTML = "";
  const recent = entries.slice(-10).reverse();
  if (recent.length === 0) {
    const empty = document.createElement("div");
    empty.className = "conceptual-empty";
    empty.textContent = t("violet.conceptual.empty");
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
var lastPointerMoveMs = 0;
var lastWheelMs = 0;
var MOVE_THROTTLE_MS = 24;
var WHEEL_THROTTLE_MS = 120;
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
    const nowMs = Date.now();
    if (nowMs - lastWheelMs < WHEEL_THROTTLE_MS) return;
    lastWheelMs = nowMs;
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
function drawFog({ w, h, t: t2, fogPressure, purpleSaturation }) {
  const alphaBase = 0.04 + fogPressure * 0.12;
  for (let i = 0; i < puffs.length; i++) {
    const p = puffs[i];
    const dx = Math.sin((t2 + p.phase) * 5e-4 + i * 1.7) * (0.16 + fogPressure * 0.18);
    const dy = Math.cos((t2 + p.phase) * 42e-5 + i * 2.1) * (0.16 + fogPressure * 0.16);
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
function drawBoundary({ w, h, t: t2, edgePressure, residue, segments }) {
  const lineW = 2 + edgePressure * 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "miter";
  ctx.lineWidth = lineW;
  const nowMs = t2;
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
      const s = segments[(i * 17 + Math.floor(t2 / 50)) % segments.length];
      const k = i * 73 % 100 / 100;
      const x = mapX(s.x1 + (s.x2 - s.x1) * k, w) + Math.sin(t2 * 0.01 + i) * 2.2;
      const y = mapY(s.y1 + (s.y2 - s.y1) * k, h) + Math.cos(t2 * 0.012 + i) * 2.2;
      const r = 0.8 + i * 13 % 5 * 0.25;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
function drawOdor({ w, h, t: t2, residue, particles }) {
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
    const n = Math.sin(t2 * 6e-3 + x * 0.02) + Math.sin(t2 * 13e-4 + x * 0.05) * 0.6;
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
function drawPainting({ w, h, t: t2, commit, locked }) {
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
      const shift = Math.sin(t2 * 12e-4 + i * 1.7) * 12 * commit;
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
function drawZoomOutOverlay({ w, h, t: t2, metrics }) {
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
    ctx.arc(x, y, 16 + Math.sin(t2 * 4e-3 + x) * 1.6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(245,243,255,0.7)";
    ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(label, x, y + 18);
  }
  node({
    ...listener,
    label: overlayLabels.listener,
    fill: "rgba(245,243,255,0.55)",
    ring: `rgba(245,243,255,${0.08 + (1 - dist) * 0.22})`
  });
  node({
    ...mother,
    label: overlayLabels.mother,
    fill: `rgba(203,179,255,${0.28 + (1 - dist) * 0.22})`,
    ring: `rgba(203,179,255,${0.06 + (1 - dist) * 0.25})`
  });
  node({
    ...voice,
    label: overlayLabels.voice,
    fill: `rgba(139,92,246,${0.25 + pulse * 0.55})`,
    ring: `rgba(199,255,74,${0.04 + pulse * 0.25})`
  });
  ctx.fillStyle = "rgba(245,243,255,0.55)";
  ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(
    `${overlayLabels.metricFog}:${fog.toFixed(2)} ${overlayLabels.metricEdge}:${edge.toFixed(2)} ${overlayLabels.metricResidue}:${metrics.residue.toFixed(2)} ${overlayLabels.metricOrient}:${metrics.orientationError.toFixed(2)}`,
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
  const t2 = Date.now();
  const dt = Math.min(0.05, Math.max(0, (nowMs - lastFrameMs) / 1e3));
  lastFrameMs = nowMs;
  const m = publicState.metrics;
  const traces = publicState.traces;
  const vibHz = 7.4;
  const vib = Math.sin(t2 / 1e3 * Math.PI * 2 * vibHz);
  const maxRot = 2.2 * Math.PI / 180;
  const rot = m.orientationError * (0.35 + 0.65 * vib) * maxRot;
  const drift = m.orientationError * 22 * Math.sin(t2 * 21e-4);
  ctx.save();
  ctx.translate(w / 2 + drift, h / 2);
  ctx.rotate(rot);
  ctx.translate(-w / 2, -h / 2);
  drawBackground({ w, h, fogPressure: m.fogPressure, purpleSaturation: 0.24 + m.fogPressure * 0.76 });
  drawFog({ w, h, t: t2, fogPressure: m.fogPressure, purpleSaturation: 0.24 + m.fogPressure * 0.76 });
  drawBoundary({ w, h, t: t2, edgePressure: m.edgePressure, residue: m.residue, segments: traces.boundarySegments });
  drawOdor({ w, h, t: t2, residue: m.residue, particles: traces.odorParticles });
  drawPainting({ w, h, t: t2, commit: m.paintingCommit, locked: traces.painting.locked });
  drawVoice({ w, h, voicePulse: m.voicePulse });
  if (publicState.mode === "zoom-out") {
    drawZoomOutOverlay({ w, h, t: t2, metrics: m });
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
  stopListenLoop();
  world.stop();
});
//# sourceMappingURL=index.js.map
