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

// bleeding-colors/utils/math.js
function clamp01(value) {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}
function lerp(a, b, t2) {
  return a + (b - a) * t2;
}

// bleeding-colors/utils/mulberry32.js
function mulberry32(seed) {
  let state = seed >>> 0;
  return function next() {
    state = state + 1831565813 >>> 0;
    let t2 = Math.imul(state ^ state >>> 15, 1 | state);
    t2 ^= t2 + Math.imul(t2 ^ t2 >>> 7, 61 | t2);
    return ((t2 ^ t2 >>> 14) >>> 0) / 4294967296;
  };
}

// bleeding-colors/entities/ConceptualLogProcess.js
var MESSAGE_SETS = {
  ko: {
    queued: {
      OFFER_WARMTH: [
        "\uC628\uAE30\uAC00 \uBA3C\uC800 \uD45C\uBA74\uC744 \uC2A4\uCE58\uBA70 \uB4E4\uC5B4\uC628\uB2E4.",
        "\uB178\uB791\uC758 \uACB0\uC774 \uCC9C\uCC9C\uD788 \uC790\uB9AC \uC7A1\uAE30 \uC2DC\uC791\uD55C\uB2E4.",
        "\uD615\uD0DC\uBCF4\uB2E4 \uBA3C\uC800 \uC5F4\uAE30\uAC00 \uBC88\uC9D0\uC744 \uC608\uACE0\uD55C\uB2E4."
      ],
      HOLD: [
        "\uC555\uB825\uC774 \uD55C \uC9C0\uC810\uC744 \uC624\uB798 \uBD99\uC7A1\uB294\uB2E4.",
        "\uBD89\uC740 \uAE34\uC7A5\uC774 \uB0B4\uBD80\uB85C \uB20C\uB9AC\uB4EF \uC2A4\uBA70\uB4E0\uB2E4.",
        "\uC190\uC544\uADC0\uC758 \uBB34\uAC8C\uAC00 \uD45C\uBA74\uC744 \uC7A0\uC2DC \uBB36\uC5B4\uB454\uB2E4."
      ],
      RELEASE: [
        "\uBD99\uC7A1\uB358 \uD798\uC774 \uD480\uB9AC\uBA70 \uACBD\uACC4\uAC00 \uD754\uB4E4\uB9B0\uB2E4.",
        "\uC815\uC9C0\uB41C \uC790\uB9AC\uC5D0\uC11C \uB2E4\uC2DC \uC774\uB3D9\uC774 \uC2DC\uC791\uB41C\uB2E4.",
        "\uBE44\uC5B4\uB09C \uD2C8\uC73C\uB85C \uBBF8\uC138\uD55C \uC0C9\uC774 \uBC88\uC838 \uB098\uAC04\uB2E4."
      ],
      WITHDRAW: [
        "\uCD08\uB85D\uC740 \uC218\uBD84\uC774 \uB0A8\uC740 \uBC29\uD5A5\uC73C\uB85C \uD2C0\uC5B4\uC9C4\uB2E4.",
        "\uBC14\uAE65\uC744 \uD5A5\uD55C \uC774\uD0C8\uC774 \uD45C\uBA74\uC744 \uAC00\uB978\uB2E4.",
        "\uAC70\uB9AC\uAC00 \uBC8C\uC5B4\uC9C0\uBA70 \uC816\uC740 \uD754\uC801\uC774 \uAE38\uAC8C \uB0A8\uB294\uB2E4."
      ],
      TOGGLE_ZOOM: [
        "\uAC19\uC740 \uC7A5\uBA74\uC744 \uB2E4\uB978 \uAC70\uB9AC\uC5D0\uC11C \uB2E4\uC2DC \uBCF8\uB2E4.",
        "\uC2DC\uC120\uC758 \uCD95\uC744 \uBC14\uAFB8\uC790 \uD754\uB4E4\uB9BC\uC758 \uACB0\uC774 \uB4DC\uB7EC\uB09C\uB2E4.",
        "\uAD6C\uC870\uC640 \uAC10\uAC01\uC758 \uAC04\uACA9\uC774 \uC0C8\uB85C \uC870\uC815\uB41C\uB2E4."
      ]
    },
    applied: {
      OFFER_WARMTH: [
        "\uB178\uB791\uC774 \uACB0\uC744 \uB530\uB77C \uBD80\uB4DC\uB7FD\uAC8C \uD37C\uC9C4\uB2E4.",
        "\uC628\uAE30\uAC00 \uBA3C\uC800 \uB3C4\uCC29\uD574 \uD45C\uBA74\uC744 \uD480\uC5B4\uB0B8\uB2E4.",
        "\uD76C\uBBF8\uD55C \uBE5B\uC774 \uC816\uC740 \uCE35\uC744 \uB113\uD78C\uB2E4."
      ],
      HOLD: [
        "\uBE68\uAC15\uC774 \uC810\uC5D0 \uACE0\uC774\uBA70 \uC555\uB825\uC774 \uB0A8\uB294\uB2E4.",
        "\uBA48\uCD98 \uC790\uB9AC \uC8FC\uC704\uC5D0 \uAE34\uC7A5\uB41C \uB450\uAED8\uAC00 \uC0DD\uAE34\uB2E4.",
        "\uB20C\uB9B0 \uD45C\uBA74\uC740 \uB290\uB9B0 \uC5F4\uB85C \uBD89\uC5B4\uC9C4\uB2E4."
      ],
      RELEASE: [
        "\uB2E8\uB2E8\uD588\uB358 \uACBD\uACC4\uAC00 \uB290\uC2A8\uD574\uC9C0\uAE30 \uC2DC\uC791\uD55C\uB2E4.",
        "\uBD99\uC7A1\uD798\uC774 \uD480\uB9AC\uC790 \uD750\uB984\uC774 \uB2E4\uC2DC \uC774\uC5B4\uC9C4\uB2E4.",
        "\uBC00\uB3C4 \uCC28\uC774 \uC0AC\uC774\uB85C \uC794\uC0C9\uC774 \uBBF8\uB044\uB7EC\uC9C4\uB2E4."
      ],
      WITHDRAW: [
        "\uCD08\uB85D\uC774 \uC816\uC740 \uBC29\uD5A5\uC744 \uB530\uB77C \uBC16\uC73C\uB85C \uD750\uB978\uB2E4.",
        "\uC774\uD0C8\uC758 \uADA4\uC801\uC774 \uAC00\uC7A5\uC790\uB9AC\uB85C \uAE38\uAC8C \uB0A8\uB294\uB2E4.",
        "\uAC70\uB9AC\uC758 \uBCA1\uD130\uAC00 \uD45C\uBA74 \uC704\uC5D0 \uC120\uC744 \uAE0B\uB294\uB2E4."
      ],
      TOGGLE_ZOOM: [
        "\uAC19\uC740 \uC5BC\uB8E9\uC774 \uB2E4\uB978 \uD574\uC0C1\uB3C4\uB85C \uC77D\uD78C\uB2E4.",
        "\uAC70\uB9AC \uBCC0\uD654\uAC00 \uAD00\uACC4\uC758 \uB9AC\uB4EC\uC744 \uBC14\uAFBC\uB2E4.",
        "\uAD00\uCC30\uC758 \uCD95\uC774 \uBC14\uB00C\uBA70 \uAC19\uC740 \uD754\uC801\uC774 \uB2EC\uB9AC \uB4E4\uB9B0\uB2E4."
      ],
      BURN_START: [
        "\uC628\uAE30\uAC00 \uACFC\uC5F4\uB85C \uB118\uC5B4\uAC00\uBA70 \uD45C\uBA74\uC774 \uBE60\uB974\uAC8C \uC870\uC778\uB2E4.",
        "\uC5F4\uC758 \uBC00\uB3C4\uAC00 \uC62C\uB77C\uAC00 \uC0C9\uC758 \uC228\uC774 \uAC00\uBE60\uC9C4\uB2E4.",
        "\uBD89\uC740 \uC555\uB825\uC774 \uBC30\uACBD\uC758 \uACB0\uAE4C\uC9C0 \uBC00\uC5B4\uBD99\uC778\uB2E4."
      ],
      DRY_LOCK: [
        "\uB9C8\uB984\uC774 \uACE0\uC815\uB418\uBA70 \uBC88\uC9D0\uC740 \uC5BC\uB8E9\uC73C\uB85C \uAD73\uB294\uB2E4.",
        "\uC816\uC74C\uC774 \uBB3C\uB7EC\uB098\uACE0 \uACBD\uACC4\uAC00 \uAE30\uC5B5\uCC98\uB7FC \uBD99\uB294\uB2E4.",
        "\uD45C\uBA74\uC740 \uB354 \uC774\uC0C1 \uD750\uB974\uC9C0 \uC54A\uACE0 \uD754\uC801\uB9CC \uB0A8\uAE34\uB2E4."
      ],
      FADE_OUT: [
        "\uC5BC\uB8E9\uC758 \uC724\uACFD\uB9C8\uC800 \uCC9C\uCC9C\uD788 \uC605\uC5B4\uC9C4\uB2E4.",
        "\uB0A8\uC544 \uC788\uB358 \uC794\uC0C9\uC774 \uACF5\uAE30 \uCABD\uC73C\uB85C \uC0AC\uB77C\uC9C4\uB2E4.",
        "\uAE30\uC5B5\uC758 \uCE35\uC774 \uBE44\uC6CC\uC9C0\uBA70 \uBE48 \uBA74\uC774 \uB3CC\uC544\uC628\uB2E4."
      ]
    },
    fallback: {
      queued: [
        "\uC791\uC740 \uBCC0\uD654\uAC00 \uC9C0\uC5F0 \uD050 \uC548\uC73C\uB85C \uB4E4\uC5B4\uC628\uB2E4.",
        "\uC7A5\uBA74\uC740 \uC989\uC2DC \uBC18\uC751\uD558\uC9C0 \uC54A\uACE0 \uC7A0\uC2DC \uBA38\uBB38\uB2E4.",
        "\uC870\uC6A9\uD55C \uC785\uB825\uC774 \uB0B4\uBD80 \uADDC\uCE59\uC73C\uB85C \uBC88\uC5ED\uB41C\uB2E4."
      ],
      applied: [
        "\uC9C0\uC5F0\uB41C \uBCC0\uD654\uAC00 \uD45C\uBA74\uC73C\uB85C \uB098\uD0C0\uB09C\uB2E4.",
        "\uADDC\uCE59\uC740 \uB204\uC801\uB41C \uD754\uC801\uC744 \uB2E4\uC2DC \uBC30\uC5F4\uD55C\uB2E4.",
        "\uAC19\uC740 \uC7A5\uBA74\uC774 \uB2E4\uB978 \uB9AC\uB4EC\uC73C\uB85C \uAC31\uC2E0\uB41C\uB2E4."
      ]
    },
    tail: {
      drynessEmpty: [
        "\uB9C8\uB984\uC740 \uC774\uC81C \uC5BC\uB8E9\uC870\uCC28 \uC9C0\uC6B0\uB294 \uB2E8\uACC4\uB85C \uB4E4\uC5B4\uAC04\uB2E4.",
        "\uAC74\uC870\uAC00 \uB05D\uB2E8\uAE4C\uC9C0 \uBC00\uACE0 \uAC00\uBA70 \uB0A8\uC740 \uCE35\uC744 \uBE44\uC6B4\uB2E4."
      ],
      drynessStain: [
        "\uBC88\uC9D0\uC740 \uBA48\uCD94\uACE0 \uC5BC\uB8E9\uC774 \uACBD\uACC4\uB97C \uB300\uC2E0\uD55C\uB2E4.",
        "\uC816\uC74C\uC740 \uBB3C\uB7EC\uB098\uACE0 \uC794\uC0C9\uB9CC \uD45C\uBA74\uC5D0 \uBD99\uC5B4 \uB0A8\uB294\uB2E4.",
        "\uB9C8\uB978 \uACB0\uC774 \uAE30\uC5B5\uC758 \uC724\uACFD\uC744 \uACE0\uC815\uD55C\uB2E4."
      ],
      burn: [
        "\uACFC\uC5F4\uC758 \uD754\uB4E4\uB9BC\uC774 \uC544\uC9C1 \uAEBC\uC9C0\uC9C0 \uC54A\uB294\uB2E4.",
        "\uC5F4\uC758 \uC555\uB825\uC740 \uBC30\uACBD\uAE4C\uC9C0 \uBC00\uC5B4\uBD99\uC778 \uCC44 \uB0A8\uC544 \uC788\uB2E4.",
        "\uD45C\uBA74\uC740 \uC9E7\uC740 \uC228\uC73C\uB85C \uB5A8\uBA70 \uC628\uB3C4\uB97C \uBD99\uB4E0\uB2E4."
      ],
      flee: [
        "\uCD08\uB85D\uC740 \uACC4\uC18D \uAC70\uB9AC \uCABD\uC73C\uB85C \uBC29\uD5A5\uC744 \uC7A1\uB294\uB2E4.",
        "\uC774\uD0C8\uC758 \uBCA1\uD130\uAC00 \uBC14\uAE65\uC744 \uD5A5\uD574 \uB0A8\uC544 \uC788\uB2E4.",
        "\uBA40\uC5B4\uC9C0\uB824\uB294 \uD798\uC774 \uD654\uBA74\uC758 \uACB0\uC744 \uBE44\uD2BC\uB2E4."
      ],
      wet: [
        "\uC544\uC9C1 \uC816\uC740 \uAD6C\uAC04\uC774 \uACBD\uACC4\uB97C \uD750\uB9AC\uAC8C \uC720\uC9C0\uD55C\uB2E4.",
        "\uD45C\uBA74\uC740 \uC644\uC804\uD788 \uAD73\uC9C0 \uC54A\uACE0 \uB290\uB9AC\uAC8C \uC6C0\uC9C1\uC778\uB2E4.",
        "\uBC88\uC9D0\uC740 \uB05D\uB098\uC9C0 \uC54A\uC740 \uCC44 \uBBF8\uC138\uD558\uAC8C \uC774\uC5B4\uC9C4\uB2E4."
      ],
      neutral: [
        "\uAE30\uC5B5\uC740 \uC120\uBA85\uD55C \uACBD\uACC4 \uC5C6\uC774 \uCE35\uC73C\uB85C \uB0A8\uB294\uB2E4.",
        "\uAC19\uC740 \uC0C9\uB3C4 \uB2E4\uB978 \uD638\uD761\uC73C\uB85C \uB2E4\uC2DC \uBCF4\uC778\uB2E4.",
        "\uD45C\uBA74\uC740 \uC870\uC6A9\uD788 \uB2E4\uC74C \uBCC0\uD615\uC744 \uC900\uBE44\uD55C\uB2E4."
      ]
    }
  },
  en: {
    queued: {
      OFFER_WARMTH: [
        "Warmth enters first and brushes the surface.",
        "A yellow grain starts to settle in place.",
        "Heat signals spread before shape appears."
      ],
      HOLD: [
        "Pressure holds one point for too long.",
        "Red tension presses inward through the layer.",
        "The grip leaves weight on the skin of color."
      ],
      RELEASE: [
        "The held force loosens and edges start to sway.",
        "Motion resumes from the point that stalled.",
        "A fine stain slips through the released gap."
      ],
      WITHDRAW: [
        "Green turns toward where moisture remains.",
        "Withdrawal cuts a route toward the outside.",
        "Distance opens and leaves a long wet trace."
      ],
      COLOR_BLOOM: [
        "Many colors arrive at once and spill across the field.",
        "Layer after layer, mixed hues start to bloom outward.",
        "The surface opens into a crowded spectrum before drying."
      ],
      TOGGLE_ZOOM: [
        "The same scene is read from another distance.",
        "A shifted viewpoint exposes a different rhythm.",
        "Structure and sensation are re-scaled."
      ]
    },
    applied: {
      OFFER_WARMTH: [
        "Yellow spreads softly along the grain.",
        "Warmth arrives first and loosens the surface.",
        "A pale light widens the wet layer."
      ],
      HOLD: [
        "Red pools at a point and pressure remains.",
        "A tense thickness forms around the pause.",
        "The pressed skin reddens under slow heat."
      ],
      RELEASE: [
        "A rigid edge starts to loosen.",
        "Once released, flow reconnects itself.",
        "Residual color slides through density gaps."
      ],
      WITHDRAW: [
        "Green follows moisture and drifts outward.",
        "The route of departure stretches to the rim.",
        "A distance vector draws a line on the field."
      ],
      COLOR_BLOOM: [
        "Mixed pigments surge and spread in overlapping bands.",
        "The field swells with many hues before settling.",
        "Color crowds the surface, then starts to thin."
      ],
      TOGGLE_ZOOM: [
        "The same stain reads at another resolution.",
        "Distance changes the rhythm of relation.",
        "A shifted gaze lets the same trace sound different."
      ],
      BURN_START: [
        "Warmth crosses into burn and the surface tightens.",
        "Heat density rises and color breath shortens.",
        "Red pressure pushes into the background grain."
      ],
      DRY_LOCK: [
        "Dry lock fixes spread into stain.",
        "Wetness retreats and edges cling like memory.",
        "Flow stops; only residue remains."
      ],
      FADE_OUT: [
        "Even the contour of stain starts to fade.",
        "Remaining color thins into air.",
        "The memory layer empties toward a blank face."
      ]
    },
    fallback: {
      queued: [
        "A small change enters the delayed queue.",
        "The scene pauses before it answers.",
        "A quiet input is translated into rule."
      ],
      applied: [
        "A delayed change surfaces on the field.",
        "Rules rearrange accumulated traces.",
        "The same scene refreshes with a different rhythm."
      ]
    },
    tail: {
      drynessEmpty: [
        "Dryness now erases even the stain itself.",
        "The dry phase reaches the end and clears the layer."
      ],
      drynessStain: [
        "Spread stops, and stain replaces boundary.",
        "Wetness withdraws; residue stays attached.",
        "A dry grain fixes the contour of memory."
      ],
      burn: [
        "The oscillation of burn is still active.",
        "Heat pressure keeps pushing through the field.",
        "The surface trembles in short breaths."
      ],
      flee: [
        "Green keeps taking direction toward distance.",
        "Departure vectors still lean outward.",
        "The urge to leave twists the grain of the scene."
      ],
      wet: [
        "Wet zones still keep boundaries soft.",
        "The surface is not fixed yet and keeps moving.",
        "Spread continues in a low, unfinished motion."
      ],
      neutral: [
        "Memory remains in layers without hard borders.",
        "The same color returns with a different breath.",
        "The surface quietly prepares its next shift."
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
function pickVariant({ rng, memory, key, variants }) {
  if (!Array.isArray(variants) || variants.length === 0) return "";
  if (variants.length === 1) return variants[0];
  const last = memory.get(key);
  let index = Math.floor(rng() * variants.length);
  if (last != null && index === last) index = (index + 1) % variants.length;
  memory.set(key, index);
  return variants[index];
}
function metricTail({ metrics, pick, messages }) {
  if (!metrics) return "";
  if (metrics.dryness >= 0.95) return pick("tail:drynessEmpty", messages.tail.drynessEmpty);
  if (metrics.dryness >= 0.82) return pick("tail:drynessStain", messages.tail.drynessStain);
  if (metrics.burn >= 0.58) return pick("tail:burn", messages.tail.burn);
  if (metrics.flee >= 0.45) return pick("tail:flee", messages.tail.flee);
  if (metrics.wetness >= 0.5) return pick("tail:wet", messages.tail.wet);
  return pick("tail:neutral", messages.tail.neutral);
}
var ConceptualLogProcess = class {
  constructor({ rng = Math.random, maxEvents = 24, language: language2 = "en" } = {}) {
    this.rng = rng;
    this.maxEvents = maxEvents;
    this.events = [];
    this.pickMemory = /* @__PURE__ */ new Map();
    this.sequence = 0;
    this.lastQueuedType = null;
    this.lastQueuedAtMs = 0;
    this.lastAnyQueuedAtMs = 0;
    this.minQueuedIntervalMs = 280;
    this.lastAppliedType = null;
    this.lastAppliedAtMs = 0;
    this.lastAnyAppliedAtMs = 0;
    this.minAppliedIntervalMs = 460;
    this.lastAppliedText = "";
    this.messages = MESSAGE_SETS[resolveLanguage(language2)];
  }
  pick(key, variants) {
    return pickVariant({ rng: this.rng, memory: this.pickMemory, key, variants });
  }
  onEnqueue(intention, nowMs) {
    var _a, _b;
    if (!intention || ((_a = intention.params) == null ? void 0 : _a.seed)) return null;
    if (nowMs - this.lastAnyQueuedAtMs < this.minQueuedIntervalMs) return null;
    if (this.lastQueuedType === intention.type && nowMs - this.lastQueuedAtMs < 620) return null;
    this.lastQueuedType = intention.type;
    this.lastQueuedAtMs = nowMs;
    this.lastAnyQueuedAtMs = nowMs;
    const text = this.pick(
      `queued:${intention.type}`,
      (_b = this.messages.queued[intention.type]) != null ? _b : this.messages.fallback.queued
    );
    return this.push({ nowMs, phase: "gesture", text });
  }
  onApplied(intention, nowMs, metrics) {
    var _a, _b;
    if (!intention || ((_a = intention.params) == null ? void 0 : _a.seed)) return null;
    if (nowMs - this.lastAnyAppliedAtMs < this.minAppliedIntervalMs) return null;
    if (this.lastAppliedType === intention.type && nowMs - this.lastAppliedAtMs < 850) return null;
    const lead = this.pick(
      `applied:${intention.type}`,
      (_b = this.messages.applied[intention.type]) != null ? _b : this.messages.fallback.applied
    );
    const tail = metricTail({ metrics, messages: this.messages, pick: (k, v) => this.pick(k, v) });
    const text = tail ? `${lead} ${tail}` : lead;
    if (text === this.lastAppliedText && nowMs - this.lastAppliedAtMs < 1600) return null;
    this.lastAppliedType = intention.type;
    this.lastAppliedAtMs = nowMs;
    this.lastAnyAppliedAtMs = nowMs;
    this.lastAppliedText = text;
    return this.push({ nowMs, phase: "manifest", text });
  }
  push({ nowMs, phase, text }) {
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

// bleeding-colors/entities/InteractionLogger.js
var InteractionLogger = class {
  constructor({ storageKey, maxEntries = 2e3, transport } = {}) {
    this.storageKey = storageKey;
    this.maxEntries = maxEntries;
    this.transport = transport;
    this.entries = this.load();
    this.count = this.entries.length;
  }
  load() {
    if (!this.storageKey) return [];
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(-this.maxEntries);
    } catch (_) {
      return [];
    }
  }
  save() {
    if (!this.storageKey) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
    } catch (_) {
    }
  }
  log(entry) {
    var _a;
    this.entries.push(entry);
    if (this.entries.length > this.maxEntries) {
      this.entries.splice(0, this.entries.length - this.maxEntries);
    }
    this.count = this.entries.length;
    this.save();
    if ((_a = this.transport) == null ? void 0 : _a.send) {
      this.transport.send(entry);
    }
  }
};

// bleeding-colors/entities/IntentionQueue.js
var IntentionQueue = class {
  constructor({
    lagMsBase = 500,
    jitterMs = 700,
    minIntervalMs = 70,
    maxSize = 240,
    rng = Math.random
  } = {}) {
    this.lagMsBase = lagMsBase;
    this.jitterMs = jitterMs;
    this.minIntervalMs = minIntervalMs;
    this.maxSize = maxSize;
    this.rng = rng;
    this.sequence = 0;
    this.queue = [];
    this.lastByTypeMs = /* @__PURE__ */ new Map();
  }
  enqueue({ type, params = {}, nowMs = Date.now() }) {
    var _a;
    const last = (_a = this.lastByTypeMs.get(type)) != null ? _a : -Infinity;
    if (nowMs - last < this.minIntervalMs) return null;
    this.lastByTypeMs.set(type, nowMs);
    const lag = this.lagMsBase + Math.floor(this.rng() * this.jitterMs);
    const intention = {
      id: `intent-${nowMs}-${this.sequence++}`,
      type,
      params,
      enqueuedAtMs: nowMs,
      dueAtMs: nowMs + lag
    };
    this.queue.push(intention);
    if (this.queue.length > this.maxSize) {
      this.queue.splice(0, this.queue.length - this.maxSize);
    }
    return intention;
  }
  drainDue(nowMs = Date.now(), limit = Infinity) {
    if (this.queue.length === 0) return [];
    const due = [];
    const nextQueue = [];
    for (const item of this.queue) {
      if (item.dueAtMs <= nowMs && due.length < limit) {
        due.push(item);
      } else {
        nextQueue.push(item);
      }
    }
    this.queue = nextQueue;
    return due;
  }
  get size() {
    return this.queue.length;
  }
};

// bleeding-colors/entities/MoistureSeeker.js
var MoistureSeeker = class {
  constructor({ rng = Math.random } = {}) {
    this.rng = rng;
    this.pos = { x: 0.62, y: 0.48 };
    this.vel = { x: 0, y: 0 };
    this.fleeVector = { x: 0, y: 0 };
    this.fleeDebt = 0;
    this.wanderPhase = rng() * Math.PI * 2;
  }
  onPressure({ x01, y01, strength01 = 0.5 }) {
    const dx = this.pos.x - x01;
    const dy = this.pos.y - y01;
    const len = Math.hypot(dx, dy) || 1;
    this.fleeVector.x = dx / len;
    this.fleeVector.y = dy / len;
    this.fleeDebt = clamp01(this.fleeDebt + clamp01(strength01) * 0.65);
  }
  update({ dt, fieldMetrics, burn01 = 0 }) {
    var _a, _b, _c;
    const targetX = (_a = fieldMetrics == null ? void 0 : fieldMetrics.wetCentroidX) != null ? _a : 0.5;
    const targetY = (_b = fieldMetrics == null ? void 0 : fieldMetrics.wetCentroidY) != null ? _b : 0.5;
    const wetness = (_c = fieldMetrics == null ? void 0 : fieldMetrics.wetness) != null ? _c : 0.4;
    const towardX = targetX - this.pos.x;
    const towardY = targetY - this.pos.y;
    this.wanderPhase += dt * (0.35 + burn01 * 0.6);
    const wanderX = Math.cos(this.wanderPhase + this.rng() * 0.5) * 0.08;
    const wanderY = Math.sin(this.wanderPhase * 1.2 + this.rng() * 0.5) * 0.08;
    const seekGain = 0.22 + wetness * 0.18;
    const fleeGain = (0.25 + burn01 * 0.45) * this.fleeDebt;
    this.vel.x += (towardX * seekGain + wanderX + this.fleeVector.x * fleeGain) * dt;
    this.vel.y += (towardY * seekGain + wanderY + this.fleeVector.y * fleeGain) * dt;
    const drag = Math.max(0, 1 - dt * 1.7);
    this.vel.x *= drag;
    this.vel.y *= drag;
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -0.4;
    } else if (this.pos.x > 1) {
      this.pos.x = 1;
      this.vel.x *= -0.4;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -0.4;
    } else if (this.pos.y > 1) {
      this.pos.y = 1;
      this.vel.y *= -0.4;
    }
    this.fleeDebt = clamp01(this.fleeDebt - dt * 0.18);
  }
  getTrace() {
    return {
      pos01: { x: this.pos.x, y: this.pos.y },
      flee01: this.fleeDebt
    };
  }
};

// bleeding-colors/entities/PigmentField.js
var PigmentField = class {
  constructor({ width = 240, height = 135 } = {}) {
    this.width = width;
    this.height = height;
    this.length = width * height;
    this.y = new Float32Array(this.length);
    this.r = new Float32Array(this.length);
    this.g = new Float32Array(this.length);
    this.wet = new Float32Array(this.length);
    this.stain = new Float32Array(this.length);
    this.drynessMap = new Float32Array(this.length);
    this.tmpY = new Float32Array(this.length);
    this.tmpR = new Float32Array(this.length);
    this.tmpG = new Float32Array(this.length);
    this.metrics = {
      dryness: 0,
      wetness: 0,
      stainLevel: 0,
      edgeSoftnessHint: 1,
      wetCentroidX: 0.5,
      wetCentroidY: 0.5
    };
    this.recalculateMetrics();
  }
  deposit({ x01, y01, color = "Y", amount = 0.2, radius01 = 0.05, heat = 0 }) {
    const amount01 = clamp01(amount);
    if (amount01 <= 0) return;
    const cx = Math.floor(clamp01(x01) * (this.width - 1));
    const cy = Math.floor(clamp01(y01) * (this.height - 1));
    const radiusPx = Math.max(1, Math.round(radius01 * Math.min(this.width, this.height)));
    const radiusSq = radiusPx * radiusPx;
    const xMin = Math.max(0, cx - radiusPx);
    const xMax = Math.min(this.width - 1, cx + radiusPx);
    const yMin = Math.max(0, cy - radiusPx);
    const yMax = Math.min(this.height - 1, cy + radiusPx);
    const channel = color === "R" ? this.r : color === "G" ? this.g : this.y;
    const heat01 = clamp01(heat);
    for (let y = yMin; y <= yMax; y++) {
      const dy = y - cy;
      const row = y * this.width;
      for (let x = xMin; x <= xMax; x++) {
        const dx = x - cx;
        const d2 = dx * dx + dy * dy;
        if (d2 > radiusSq) continue;
        const f = 1 - d2 / radiusSq;
        const influence = f * f;
        const idx = row + x;
        const add = amount01 * influence;
        channel[idx] = clamp01(channel[idx] + add);
        this.wet[idx] = clamp01(this.wet[idx] + add * 0.85 + heat01 * 0.035 * influence);
        if (heat01 > 0.42) {
          this.drynessMap[idx] = clamp01(this.drynessMap[idx] + (heat01 - 0.42) * 0.012 * influence);
        }
      }
    }
  }
  depositPath({ points, color = "Y", amount = 0.2, radius01 = 0.04, heat = 0 }) {
    if (!Array.isArray(points) || points.length === 0) return;
    if (points.length === 1) {
      const p = points[0];
      this.deposit({ x01: p.x, y01: p.y, color, amount, radius01, heat });
      return;
    }
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / 0.012));
      for (let s = 0; s <= steps; s++) {
        const t2 = s / steps;
        this.deposit({
          x01: p0.x + dx * t2,
          y01: p0.y + dy * t2,
          color,
          amount: amount / (1 + steps * 0.1),
          radius01,
          heat
        });
      }
    }
  }
  diffuse({ dt, diffusionK = 0.18 }) {
    const width = this.width;
    const height = this.height;
    this.tmpY.set(this.y);
    this.tmpR.set(this.r);
    this.tmpG.set(this.g);
    for (let y = 1; y < height - 1; y++) {
      const row = y * width;
      for (let x = 1; x < width - 1; x++) {
        const idx = row + x;
        const wet = this.wet[idx];
        if (wet < 2e-3) continue;
        const mix = Math.min(0.24, diffusionK * wet * dt * 60);
        if (mix <= 0) continue;
        const nY = (this.y[idx - 1] + this.y[idx + 1] + this.y[idx - width] + this.y[idx + width]) * 0.25;
        const nR = (this.r[idx - 1] + this.r[idx + 1] + this.r[idx - width] + this.r[idx + width]) * 0.25;
        const nG = (this.g[idx - 1] + this.g[idx + 1] + this.g[idx - width] + this.g[idx + width]) * 0.25;
        this.tmpY[idx] = this.y[idx] + (nY - this.y[idx]) * mix;
        this.tmpR[idx] = this.r[idx] + (nR - this.r[idx]) * mix;
        this.tmpG[idx] = this.g[idx] + (nG - this.g[idx]) * mix;
        const nWet = (this.wet[idx - 1] + this.wet[idx + 1] + this.wet[idx - width] + this.wet[idx + width]) * 0.25;
        this.wet[idx] = clamp01(this.wet[idx] + (nWet - this.wet[idx]) * mix * 0.3);
      }
    }
    const yRef = this.y;
    const rRef = this.r;
    const gRef = this.g;
    this.y = this.tmpY;
    this.r = this.tmpR;
    this.g = this.tmpG;
    this.tmpY = yRef;
    this.tmpR = rRef;
    this.tmpG = gRef;
  }
  dry({ dt, heat01 = 0, interactionCost01 = 0 }) {
    const heat = clamp01(heat01);
    const cost = clamp01(interactionCost01);
    for (let i = 0; i < this.length; i++) {
      const evap = dt * (8e-3 + heat * 0.036 + cost * 0.03);
      const wetLoss = evap * (0.9 + this.drynessMap[i] * 0.55);
      this.wet[i] = Math.max(0, this.wet[i] - wetLoss);
      this.drynessMap[i] = clamp01(this.drynessMap[i] + evap * 1.55);
      const pigment = this.y[i] + this.r[i] + this.g[i];
      if (this.wet[i] < 0.08 && pigment > 1e-3) {
        const fix = evap * 0.55;
        this.stain[i] = clamp01(this.stain[i] + pigment * fix * (0.4 + this.drynessMap[i] * 0.6));
        this.y[i] = Math.max(0, this.y[i] - this.y[i] * fix * 0.5);
        this.r[i] = Math.max(0, this.r[i] - this.r[i] * fix * 0.5);
        this.g[i] = Math.max(0, this.g[i] - this.g[i] * fix * 0.5);
      }
      if (this.drynessMap[i] > 0.86) {
        const lockedFade = evap * 0.22;
        this.y[i] = Math.max(0, this.y[i] - this.y[i] * lockedFade);
        this.r[i] = Math.max(0, this.r[i] - this.r[i] * lockedFade);
        this.g[i] = Math.max(0, this.g[i] - this.g[i] * lockedFade);
      }
    }
  }
  evolvePalette({ dt, warmth01 = 0, burn01 = 0, flee01 = 0, dryness01 = 0 }) {
    const warmth = clamp01(warmth01);
    const burn = clamp01(burn01);
    const flee = clamp01(flee01);
    const dry = clamp01(dryness01);
    for (let i = 0; i < this.length; i++) {
      const yellow = this.y[i];
      if (yellow <= 4e-4) continue;
      const toRedRate = dt * (0.01 + burn * 1.35 + Math.max(0, warmth - 0.45) * 0.75);
      const toRed = Math.min(yellow, yellow * toRedRate);
      let remain = yellow - toRed;
      const toGreenRate = dt * (8e-3 + flee * 0.72 + Math.max(0, dry - 0.35) * 0.34);
      const toGreen = Math.min(remain, remain * toGreenRate);
      remain -= toGreen;
      const eraseRate = dt * (2e-3 + Math.max(0, dry - 0.52) * 0.8 + burn * 0.08);
      const erase = Math.min(remain, remain * eraseRate);
      remain -= erase;
      this.y[i] = Math.max(0, remain);
      this.r[i] = clamp01(this.r[i] + toRed * (0.9 + burn * 0.08));
      this.g[i] = clamp01(this.g[i] + toGreen * (0.84 + flee * 0.1));
      this.stain[i] = clamp01(this.stain[i] + (toRed + toGreen + erase) * (0.04 + dry * 0.12));
    }
  }
  fade({ dt, strength01 = 1 }) {
    const strength = clamp01(strength01);
    const pigmentFade = dt * (6e-3 + strength * 0.016);
    const stainFade = dt * (0.01 + strength * 0.036);
    for (let i = 0; i < this.length; i++) {
      this.y[i] = Math.max(0, this.y[i] - this.y[i] * pigmentFade * 1.55);
      this.r[i] = Math.max(0, this.r[i] - this.r[i] * pigmentFade);
      this.g[i] = Math.max(0, this.g[i] - this.g[i] * pigmentFade);
      this.stain[i] = Math.max(0, this.stain[i] - this.stain[i] * stainFade);
    }
  }
  recalculateMetrics() {
    let drySum = 0;
    let wetSum = 0;
    let stainSum = 0;
    let weightedX = 0;
    let weightedY = 0;
    for (let y = 0; y < this.height; y++) {
      const row = y * this.width;
      for (let x = 0; x < this.width; x++) {
        const idx = row + x;
        const wet = this.wet[idx];
        const dry = this.drynessMap[idx];
        const stain = this.stain[idx];
        drySum += dry;
        wetSum += wet;
        stainSum += stain;
        const w = wet + 1e-4;
        weightedX += x * w;
        weightedY += y * w;
      }
    }
    const inv = 1 / this.length;
    const dryness = clamp01(drySum * inv);
    const wetness = clamp01(wetSum * inv);
    const stainLevel = clamp01(stainSum * inv);
    let wetCentroidX = 0.5;
    let wetCentroidY = 0.5;
    const totalWeight = wetSum + this.length * 1e-4;
    if (totalWeight > 0) {
      wetCentroidX = clamp01(weightedX / totalWeight / Math.max(1, this.width - 1));
      wetCentroidY = clamp01(weightedY / totalWeight / Math.max(1, this.height - 1));
    }
    this.metrics = {
      dryness,
      wetness,
      stainLevel,
      edgeSoftnessHint: clamp01(0.72 * wetness + (1 - dryness) * 0.28),
      wetCentroidX,
      wetCentroidY
    };
    return this.metrics;
  }
  getMetrics() {
    return this.metrics;
  }
  getPreview({ width = 160, height = 90 } = {}) {
    const w = Math.max(1, Math.floor(width));
    const h = Math.max(1, Math.floor(height));
    const length = w * h;
    const outY = new Float32Array(length);
    const outR = new Float32Array(length);
    const outG = new Float32Array(length);
    const outStain = new Float32Array(length);
    for (let y = 0; y < h; y++) {
      const sy = Math.min(this.height - 1, Math.floor((y + 0.5) / h * this.height));
      const srcRow = sy * this.width;
      const outRow = y * w;
      for (let x = 0; x < w; x++) {
        const sx = Math.min(this.width - 1, Math.floor((x + 0.5) / w * this.width));
        const srcIdx = srcRow + sx;
        const outIdx = outRow + x;
        const stain = this.stain[srcIdx];
        outY[outIdx] = clamp01(this.y[srcIdx] + stain * 0.22);
        outR[outIdx] = clamp01(this.r[srcIdx] + stain * 0.26);
        outG[outIdx] = clamp01(this.g[srcIdx] + stain * 0.16);
        outStain[outIdx] = stain;
      }
    }
    return {
      width: w,
      height: h,
      y: outY,
      r: outR,
      g: outG,
      stain: outStain,
      drynessLevel: this.metrics.dryness,
      edgeSoftnessHint: this.metrics.edgeSoftnessHint,
      wetnessLevel: this.metrics.wetness,
      stainLevel: this.metrics.stainLevel
    };
  }
};

// bleeding-colors/entities/SleepWakeProcess.js
var SleepWakeProcess = class {
  constructor({ rng = Math.random, cycleMsMin = 14e3, cycleMsMax = 26e3 } = {}) {
    this.rng = rng;
    this.cycleMs = Math.floor(cycleMsMin + rng() * (cycleMsMax - cycleMsMin));
    this.phaseOffset = rng() * Math.PI * 2;
    this.pulse01 = 0.5;
    this.decay = 1;
    this.startedAtMs = null;
    this.nextEchoAtMs = 0;
  }
  update({ nowMs, dt }) {
    if (this.startedAtMs == null) {
      this.startedAtMs = nowMs;
      this.nextEchoAtMs = nowMs + 4e3 + Math.floor(this.rng() * 3e3);
    }
    const t2 = (nowMs - this.startedAtMs) % this.cycleMs / this.cycleMs;
    this.pulse01 = clamp01(0.5 + 0.5 * Math.sin(t2 * Math.PI * 2 + this.phaseOffset));
    this.decay = clamp01(this.decay - dt * 18e-4);
  }
  maybeEcho({ nowMs }) {
    if (nowMs < this.nextEchoAtMs) return null;
    this.nextEchoAtMs = nowMs + 5e3 + Math.floor(this.rng() * 6e3);
    this.decay = clamp01(this.decay * 0.992);
    return {
      strength01: clamp01(0.12 * this.decay + this.rng() * 0.08),
      radius01: 0.03 + this.rng() * 0.08,
      hue: this.rng() < 0.55 ? "Y" : "R"
    };
  }
};

// bleeding-colors/entities/SunHeatProcess.js
var SunHeatProcess = class {
  constructor({ baselineWarmth = 0.18 } = {}) {
    this.baselineWarmth = baselineWarmth;
    this.warmth = baselineWarmth;
    this.heatDebt = 0;
    this.burn = 0;
    this.phase = "warm";
  }
  applyIntention({ type, params = {} }) {
    var _a, _b;
    const strength = clamp01((_a = params.strength01) != null ? _a : 0.45);
    const durationMs = Math.max(0, (_b = params.durationMs) != null ? _b : 0);
    const durationFactor = Math.min(2, durationMs / 1200);
    if (type === "OFFER_WARMTH") {
      this.warmth = clamp01(this.warmth + 0.09 * strength);
      this.heatDebt = clamp01(this.heatDebt + 0.016 * strength);
      return;
    }
    if (type === "HOLD") {
      this.warmth = clamp01(this.warmth + 0.12 * strength);
      this.heatDebt = clamp01(this.heatDebt + 0.13 * strength * (1 + durationFactor * 0.5));
      return;
    }
    if (type === "RELEASE") {
      this.warmth = clamp01(this.warmth - 0.05 * strength);
      return;
    }
    if (type === "WITHDRAW") {
      this.warmth = clamp01(this.warmth - 0.045 * strength);
    }
  }
  update({ dt }) {
    const cooling = clamp01(dt * (0.12 + this.burn * 0.08));
    this.warmth = lerp(this.warmth, this.baselineWarmth, cooling);
    this.heatDebt = clamp01(this.heatDebt + Math.max(0, this.warmth - 0.55) * dt * 0.08 - dt * 0.012);
    const burnTarget = clamp01((this.heatDebt - 0.22) * 1.65 + Math.max(0, this.warmth - 0.62) * 0.95);
    this.burn = lerp(this.burn, burnTarget, clamp01(dt * 0.95));
    if (this.burn >= 0.38) this.phase = "burn";
    else if (this.warmth <= this.baselineWarmth + 0.04) this.phase = "fade";
    else this.phase = "warm";
  }
  getHint() {
    return {
      warmth01: this.warmth,
      burn01: this.burn,
      phase: this.phase,
      heatDebt01: this.heatDebt
    };
  }
};

// bleeding-colors/acting.js
var PROJECT_KEY = "bleeding-colors";
var STORAGE_KEY = `${PROJECT_KEY}:interactionLog:v1`;
function asPoints(params = {}) {
  if (Array.isArray(params.points) && params.points.length > 0) {
    return params.points.map((p) => {
      var _a, _b, _c, _d;
      return {
        x: clamp01((_b = (_a = p.x) != null ? _a : p.x01) != null ? _b : 0.5),
        y: clamp01((_d = (_c = p.y) != null ? _c : p.y01) != null ? _d : 0.5)
      };
    });
  }
  if (params.x01 != null && params.y01 != null) {
    return [{ x: clamp01(params.x01), y: clamp01(params.y01) }];
  }
  return [{ x: 0.5, y: 0.5 }];
}
var BleedingColorsWorld = class {
  constructor({ language: language2 = "en", timeScale = 1 } = {}) {
    this.seed = (Math.floor(Math.random() * 4294967295) ^ Date.now()) >>> 0;
    this.rng = mulberry32(this.seed);
    this.logRng = mulberry32(this.seed ^ 2654435769);
    this.tickHz = 24;
    this.lastTickMs = Date.now();
    this.timer = null;
    this.timeScale = Math.max(0.6, Math.min(2, timeScale));
    this.programmaticTransport = createProgrammaticLogTransport({ project: PROJECT_KEY });
    this.logger = new InteractionLogger({
      storageKey: STORAGE_KEY,
      transport: this.programmaticTransport,
      maxEntries: 2e3
    });
    this.conceptualLog = new ConceptualLogProcess({ rng: this.logRng, maxEvents: 24, language: language2 });
    this.queue = new IntentionQueue({
      lagMsBase: 140,
      jitterMs: 230,
      minIntervalMs: 90,
      maxSize: 220,
      rng: this.rng
    });
    this.field = new PigmentField({ width: 240, height: 135 });
    this.sun = new SunHeatProcess();
    this.moistureSeeker = new MoistureSeeker({ rng: this.rng });
    this.sleepWake = new SleepWakeProcess({ rng: this.rng });
    this.fadeActive = false;
    this.fadeClock = 0;
    this.narrativeTimers = [];
    this.timelineIndex = -1;
    const timelineLead = 0.03;
    this.timelineMarkers = [
      { at: 0 / 6, type: "OFFER_WARMTH" },
      { at: Math.max(0, 1 / 6 - timelineLead), type: "HOLD" },
      { at: Math.max(0, 2 / 6 - timelineLead), type: "WITHDRAW" },
      { at: Math.max(0, 3 / 6 - timelineLead), type: "COLOR_BLOOM" },
      { at: Math.max(0, 4 / 6 - timelineLead), type: "DRY_LOCK" },
      { at: Math.max(0, 5 / 6 - timelineLead), type: "FADE_OUT" }
    ];
    const preview = this.field.getPreview({ width: 160, height: 90 });
    this.publicState = observable({
      mode: "zoom-in",
      phaseHint: "warm",
      preview,
      metrics: {
        dryness: preview.drynessLevel,
        wetness: preview.wetnessLevel,
        stainLevel: preview.stainLevel,
        warmth: this.sun.warmth,
        burn: this.sun.burn,
        flee: this.moistureSeeker.fleeDebt,
        sleepWakePulse: this.sleepWake.pulse01,
        edgeSoftness: preview.edgeSoftnessHint
      },
      traces: {
        seeker: { x: 0.5, y: 0.5 },
        conceptualLog: []
      },
      logCount: this.logger.count,
      queueSize: this.queue.size
    });
  }
  start() {
    if (this.timer) return;
    this.lastTickMs = Date.now();
    this.timelineIndex = -1;
    this.timer = setInterval(() => this.tick(), Math.floor(1e3 / this.tickHz));
  }
  stop() {
    this.clearNarrativeTimers();
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }
  clearNarrativeTimers() {
    if (!this.narrativeTimers.length) return;
    for (const timerId of this.narrativeTimers) {
      clearTimeout(timerId);
    }
    this.narrativeTimers = [];
  }
  beginNarrative({ x01 = 0.5, y01 = 0.5 } = {}) {
    var _a;
    this.clearNarrativeTimers();
    this.timelineIndex = -1;
    const seed = {
      x01: clamp01(x01),
      y01: clamp01(y01)
    };
    const schedule = [
      { atMs: 0, type: "OFFER_WARMTH", strength01: 0.72 },
      { atMs: 360, type: "HOLD", strength01: 0.72, durationMs: 1200 },
      { atMs: 880, type: "RELEASE", strength01: 0.42 },
      { atMs: 1380, type: "HOLD", strength01: 0.82, durationMs: 1520 },
      { atMs: 1880, type: "WITHDRAW", strength01: 0.9 },
      { atMs: 2520, type: "OFFER_WARMTH", strength01: 0.54 },
      { atMs: 3220, type: "RELEASE", strength01: 0.5 },
      { atMs: 3960, type: "WITHDRAW", strength01: 0.72 }
    ];
    const [first, ...rest] = schedule;
    this.enqueueIntention({
      type: first.type,
      params: {
        x01: seed.x01,
        y01: seed.y01,
        strength01: first.strength01,
        durationMs: (_a = first.durationMs) != null ? _a : 0
      }
    });
    for (const step of rest) {
      const timerId = setTimeout(() => {
        var _a2;
        const spread = 0.11;
        const x = clamp01(seed.x01 + (this.rng() - 0.5) * spread);
        const y = clamp01(seed.y01 + (this.rng() - 0.5) * spread);
        this.enqueueIntention({
          type: step.type,
          params: {
            x01: x,
            y01: y,
            strength01: step.strength01,
            durationMs: (_a2 = step.durationMs) != null ? _a2 : 0
          }
        });
      }, step.atMs);
      this.narrativeTimers.push(timerId);
    }
  }
  syncNarrative({ progress01 = 0, nowMs = Date.now() } = {}) {
    if (!this.timelineMarkers.length) return;
    const clamped = clamp01(progress01);
    let conceptualDirty = false;
    while (this.timelineIndex + 1 < this.timelineMarkers.length && clamped >= this.timelineMarkers[this.timelineIndex + 1].at) {
      this.timelineIndex += 1;
      const marker = this.timelineMarkers[this.timelineIndex];
      const emitted = this.emitAutoEvent(marker.type, nowMs);
      if (emitted) conceptualDirty = true;
    }
    if (!conceptualDirty) return;
    runInAction(() => {
      this.publicState.traces.conceptualLog = this.conceptualLog.snapshot();
      this.publicState.logCount = this.logger.count;
    });
  }
  composeMetrics() {
    const fieldMetrics = this.field.getMetrics();
    return {
      dryness: fieldMetrics.dryness,
      wetness: fieldMetrics.wetness,
      stainLevel: fieldMetrics.stainLevel,
      warmth: this.sun.warmth,
      burn: this.sun.burn,
      flee: this.moistureSeeker.fleeDebt,
      sleepWakePulse: this.sleepWake.pulse01,
      edgeSoftness: fieldMetrics.edgeSoftnessHint
    };
  }
  logProgrammatic({ nowMs, phase, type, params, metrics }) {
    this.logger.log({
      t: nowMs,
      phase,
      type,
      params: params != null ? params : {},
      metrics: {
        dryness: metrics.dryness,
        wetness: metrics.wetness,
        warmth: metrics.warmth,
        burn: metrics.burn,
        flee: metrics.flee,
        stainLevel: metrics.stainLevel
      },
      seed: this.seed
    });
  }
  enqueueIntention({ type, params = {} }) {
    const nowMs = Date.now();
    const queued = this.queue.enqueue({ type, params, nowMs });
    if (!queued) return;
    const metrics = this.composeMetrics();
    this.logProgrammatic({
      nowMs,
      phase: "enqueue",
      type: queued.type,
      params: queued.params,
      metrics
    });
    runInAction(() => {
      this.publicState.queueSize = this.queue.size;
      this.publicState.logCount = this.logger.count;
    });
  }
  applyIntention(intention) {
    var _a, _b;
    if (intention.type === "TOGGLE_ZOOM") {
      runInAction(() => {
        this.publicState.mode = this.publicState.mode === "zoom-in" ? "zoom-out" : "zoom-in";
      });
      return;
    }
    this.sun.applyIntention(intention);
    const points = asPoints(intention.params);
    const strength = clamp01((_a = intention.params.strength01) != null ? _a : 0.55);
    const durationMs = Math.max(0, (_b = intention.params.durationMs) != null ? _b : 0);
    const heat = this.sun.getHint().warmth01;
    if (intention.type === "OFFER_WARMTH") {
      this.field.depositPath({
        points,
        color: "Y",
        amount: 0.34 * (0.52 + strength),
        radius01: 0.06,
        heat
      });
      return;
    }
    if (intention.type === "HOLD") {
      const anchor = points[points.length - 1];
      this.field.deposit({
        x01: anchor.x,
        y01: anchor.y,
        color: "R",
        amount: 0.42 * (0.58 + strength),
        radius01: 0.075 + Math.min(0.08, durationMs / 9e3),
        heat: Math.min(1, heat + 0.28)
      });
      this.moistureSeeker.onPressure({ x01: anchor.x, y01: anchor.y, strength01: strength });
      return;
    }
    if (intention.type === "RELEASE") {
      this.field.depositPath({
        points,
        color: "Y",
        amount: 0.16 * (0.46 + strength),
        radius01: 0.052,
        heat: Math.max(0, heat - 0.12)
      });
      return;
    }
    if (intention.type === "WITHDRAW") {
      const anchor = points[points.length - 1];
      this.moistureSeeker.onPressure({
        x01: anchor.x,
        y01: anchor.y,
        strength01: 0.65 + strength * 0.35
      });
      this.field.deposit({
        x01: anchor.x,
        y01: anchor.y,
        color: "G",
        amount: 0.22 * (0.48 + strength),
        radius01: 0.058,
        heat: 0
      });
    }
  }
  emitAutoEvent(type, nowMs) {
    const metrics = this.composeMetrics();
    this.logProgrammatic({
      nowMs,
      phase: "auto",
      type,
      params: {},
      metrics
    });
    return this.conceptualLog.onApplied({ type, params: {} }, nowMs, metrics);
  }
  tick() {
    const nowMs = Date.now();
    const rawDt = Math.min(0.2, Math.max(0, (nowMs - this.lastTickMs) / 1e3));
    const dt = Math.min(0.28, rawDt * this.timeScale);
    this.lastTickMs = nowMs;
    const due = this.queue.drainDue(nowMs, 2);
    for (const intention of due) {
      this.applyIntention(intention);
      const metricsAfterApply = this.composeMetrics();
      this.logProgrammatic({
        nowMs,
        phase: "apply",
        type: intention.type,
        params: intention.params,
        metrics: metricsAfterApply
      });
    }
    this.sun.update({ dt });
    this.sleepWake.update({ nowMs, dt });
    const fieldMetrics = this.field.getMetrics();
    this.moistureSeeker.update({
      dt,
      fieldMetrics,
      burn01: this.sun.burn
    });
    const seeker = this.moistureSeeker.getTrace();
    this.field.deposit({
      x01: seeker.pos01.x,
      y01: seeker.pos01.y,
      color: "G",
      amount: 0.012 + seeker.flee01 * 0.021,
      radius01: 0.035 + seeker.flee01 * 0.036,
      heat: 0
    });
    if (this.sun.warmth > 0.2) {
      for (let i = 0; i < 3; i++) {
        const wobbleX = 0.5 + (this.rng() - 0.5) * 0.45;
        const wobbleY = 0.5 + (this.rng() - 0.5) * 0.3;
        this.field.deposit({
          x01: wobbleX,
          y01: wobbleY,
          color: this.sun.burn > 0.42 ? "R" : "Y",
          amount: 4e-3 + this.sun.warmth * 0.013,
          radius01: 0.02 + this.sun.warmth * 0.034,
          heat: this.sun.burn
        });
      }
    }
    const echo = this.sleepWake.maybeEcho({ nowMs });
    if (echo && this.field.getMetrics().dryness < 0.94) {
      const phaseColor = this.sun.burn > 0.34 || this.field.getMetrics().dryness > 0.56 ? this.rng() < 0.62 ? "R" : "G" : echo.hue;
      this.field.deposit({
        x01: 0.5 + (this.rng() - 0.5) * 0.35,
        y01: 0.5 + (this.rng() - 0.5) * 0.25,
        color: phaseColor,
        amount: echo.strength01 * 0.35,
        radius01: echo.radius01,
        heat: this.sun.warmth * 0.35
      });
    }
    if (this.sun.burn > 0.24 && this.field.getMetrics().dryness < 0.82) {
      this.field.deposit({
        x01: 0.5 + (this.rng() - 0.5) * 0.5,
        y01: 0.5 + (this.rng() - 0.5) * 0.34,
        color: this.rng() < 0.55 ? "R" : this.rng() < 0.5 ? "Y" : "G",
        amount: 6e-3 + this.sun.burn * 8e-3,
        radius01: 0.02 + this.rng() * 0.025,
        heat: this.sun.burn * 0.62
      });
    }
    if (this.timelineIndex === 3 && this.field.getMetrics().dryness < 0.84) {
      for (let i = 0; i < 5; i++) {
        const hueRoll = this.rng();
        const color = hueRoll < 0.34 ? "Y" : hueRoll < 0.67 ? "R" : "G";
        this.field.deposit({
          x01: 0.5 + (this.rng() - 0.5) * 0.62,
          y01: 0.5 + (this.rng() - 0.5) * 0.42,
          color,
          amount: 8e-3 + this.rng() * 0.012,
          radius01: 0.025 + this.rng() * 0.04,
          heat: this.sun.burn * 0.48 + this.sun.warmth * 0.2
        });
      }
    }
    this.field.evolvePalette({
      dt,
      warmth01: this.sun.warmth,
      burn01: this.sun.burn,
      flee01: seeker.flee01,
      dryness01: this.field.getMetrics().dryness
    });
    const interactionCost01 = clamp01(due.length / 3 + this.queue.size / 120);
    this.field.diffuse({ dt, diffusionK: 0.24 });
    this.field.dry({ dt, heat01: this.sun.burn * 0.82 + this.sun.warmth * 0.32, interactionCost01 });
    const metrics = this.field.recalculateMetrics();
    if (metrics.dryness >= 0.9) {
      this.fadeClock += dt;
      if (this.fadeClock >= 1.4) {
        if (!this.fadeActive) {
          this.fadeActive = true;
        }
        this.field.fade({ dt, strength01: clamp01((this.fadeClock - 1.4) / 3.6) });
        this.field.recalculateMetrics();
      }
    } else {
      this.fadeClock = Math.max(0, this.fadeClock - dt * 0.3);
    }
    const preview = this.field.getPreview({ width: 160, height: 90 });
    const composedMetrics = this.composeMetrics();
    const phaseHint = this.fadeActive ? "fade" : this.sun.getHint().phase;
    runInAction(() => {
      this.publicState.phaseHint = phaseHint;
      this.publicState.preview = preview;
      this.publicState.metrics.dryness = composedMetrics.dryness;
      this.publicState.metrics.wetness = composedMetrics.wetness;
      this.publicState.metrics.stainLevel = composedMetrics.stainLevel;
      this.publicState.metrics.warmth = composedMetrics.warmth;
      this.publicState.metrics.burn = composedMetrics.burn;
      this.publicState.metrics.flee = composedMetrics.flee;
      this.publicState.metrics.sleepWakePulse = composedMetrics.sleepWakePulse;
      this.publicState.metrics.edgeSoftness = composedMetrics.edgeSoftness;
      this.publicState.traces.seeker = { x: seeker.pos01.x, y: seeker.pos01.y };
      this.publicState.logCount = this.logger.count;
      this.publicState.queueSize = this.queue.size;
    });
  }
};
var acting = ({ language: language2 = "en", autoStart = true, timeScale = 1 } = {}) => {
  const world2 = new BleedingColorsWorld({ language: language2, timeScale });
  if (autoStart) {
    world2.start();
    world2.enqueueIntention({ type: "OFFER_WARMTH", params: { seed: true, x01: 0.5, y01: 0.5 } });
  }
  return {
    world: world2,
    publicState: world2.publicState
  };
};

// raw-file:C:\Users\qodls\Desktop\source\works\bleeding-colors\README.md
var README_default = "\uBC88\uC9C4\uB2E4. \uB530\uB73B\uD55C \uD587\uBCD5\uC744 \uBC1B\uC73C\uBA70 \uCE68\uB300 \uC704\uC5D0\uC11C \uB108\uC758 \uC5BC\uAD74\uC744 \uC5B4\uB8E8\uB9CC\uC9C8 \uB54C \uB290\uB07C\uB294 \uB178\uB791\uC5D0, \uD587\uBCD5\uC774 \uB664\uC57D\uBCD5\uC774 \uB418\uC5B4 \uB4F1\uAC00\uC8FD\uC744 \uC9C0\uC9C0\uACE0 \uC6B0\uC545\uC2A4\uB7F0 \uC190\uC544\uADC0\uB85C \uB108\uB97C \uC6C0\uCF1C\uC958 \uB54C \uB290\uAEF4\uC9C0\uB294 \uBE68\uAC15\uC774 \uBC88\uC9C4\uB2E4.\n\uB108\uC758 \uC218\uBD84\uC744 \uCC3E\uC73C\uB824 \uB098\uB97C \uBFCC\uB9AC\uCE58\uACE0 \uB5A0\uB0A0 \uB54C\uC5D0 \uADF8 \uC704\uC5D4 \uCD08\uB85D\uC774 \uBC88\uC9C4\uB2E4. \uB610 \uB2E4\uC2DC, \uB610 \uB2E4\uC2DC, \uC218 \uB9CE\uC740 \uC0C9\uB4E4\uB85C \uBC88\uC9C4\uB2E4. \uBB3C\uAC10\uC774 \uB5A8\uC5B4\uC9C0\uBA74 \uB9C8\uB974\uAE30 \uC2DC\uC791\uD560\uD14C\uACE0 \uADF8 \uC5B4\uB5A4 \uC120\uBA85\uD55C \uACBD\uACC4\uB3C4 \uC5C6\uB294 \uADF8 \uACF3\uC5D0\uC11C \uC774 \uAE30\uC5B5, \uC800 \uAE30\uC5B5\uC744 \uB354\uB4EC\uC73C\uBA70 \uC790\uB2E4 \uAE68\uB2E4\uB97C \uBC18\uBCF5\uD558\uACA0\uC9C0. \uB2E4\uC74C\uC5D4 \uC5BC\uB8E9\uB9CC\uC774 \uB0A8\uC744 \uAC83\uC774\uACE0, \uC5BC\uB8E9\uC870\uCC28 \uC5C6\uC744 \uAC83\uC774\uB2E4.\n---\n\nIt bleeds. Into the yellow I feel as I caress your face on a bed warmed by sunlight; into the red I feel when that light turns harsh, searing the skin of my back as a rough hand grips you.\nWhen you push me away and leave to find your own moisture, green bleeds over it. Again and again, it spreads into countless colors. When the paint runs out, it begins to dry. In that place with no sharp boundary, I will trace this memory and that one, drifting between sleep and waking. Next, only a stain will remain, and then not even the stain.\n";

// bleeding-colors/index.js
var { language, t } = initI18n();
var { world, publicState } = acting({ language, autoStart: false, timeScale: 1.25 });
var canvas = document.getElementById("scene");
var ctx = canvas.getContext("2d", { alpha: false });
var conceptLogEl = document.getElementById("conceptLog");
var oortCanvas = document.getElementById("oortHud");
var oortCtx = oortCanvas ? oortCanvas.getContext("2d") : null;
render_readme("readme_section", README_default);
var thoughtOverlay = initThoughtOverlay();
var loopStarted = false;
var loopEnded = false;
var loopStartMs = null;
var focusNorm = { x: 0.5, y: 0.5 };
var lastPointerForDoor = null;
var renderedConceptSignature = null;
var LOOP_DURATION_MS = 45e3;
var TAU = Math.PI * 2;
var STAGE = {
  redAt: 1 / 6,
  greenAt: 2 / 6,
  bloomAt: 3 / 6,
  stainAt: 4 / 6,
  voidAt: 5 / 6
};
var OORT_STOPS = [
  { at: 0, rgb: [246, 211, 101] },
  { at: STAGE.redAt, rgb: [239, 68, 68] },
  { at: STAGE.greenAt, rgb: [34, 197, 94] },
  { at: STAGE.bloomAt, rgb: [116, 114, 232] },
  { at: STAGE.stainAt, rgb: [168, 162, 158] },
  { at: STAGE.voidAt, rgb: [212, 208, 201] },
  { at: 1, rgb: [247, 242, 232] }
];
var BLOOM_COLORS = [
  [246, 211, 101],
  [239, 68, 68],
  [236, 72, 153],
  [168, 85, 247],
  [99, 102, 241],
  [34, 197, 94],
  [6, 182, 212],
  [251, 146, 60],
  [49, 46, 129]
];
var BLOOM_DARKS = [
  [32, 30, 58],
  [44, 24, 66],
  [24, 36, 54]
];
var OORT_POINT_COUNT = 560;
var oortPoints = Array.from({ length: OORT_POINT_COUNT }, () => {
  const band = Math.random() < 0.38;
  return {
    angle: Math.random() * TAU,
    radius: band ? 0.28 + Math.random() * 0.42 : 0.55 + Math.random() * 0.45,
    depth: Math.random(),
    size: band ? 0.6 + Math.random() * 1.6 : 0.4 + Math.random() * 1.2,
    drift: Math.random() * TAU,
    band
  };
});
var doorState = {
  anchor: {
    x: 0.5 + (Math.random() - 0.5) * 0.12,
    y: 0.44 + (Math.random() - 0.5) * 0.1
  },
  radius01: 0.2,
  openedAtMs: null,
  hintAtMs: 0,
  hovered: false,
  dust: Array.from({ length: 26 }, () => ({
    angle: Math.random() * TAU,
    radius: 1 + Math.random() * 0.7,
    size: 0.5 + Math.random() * 1.2,
    phase: Math.random() * TAU
  }))
};
var DOOR_TRIGGER_PAD = 0.16;
function startLoopAt(point, nowMs = Date.now()) {
  if (loopStarted) return;
  loopStarted = true;
  loopStartMs = nowMs;
  doorState.openedAtMs = loopStartMs;
  doorState.hovered = false;
  world.start();
  if (typeof world.beginNarrative === "function") {
    world.beginNarrative({ x01: point.x, y01: point.y });
  } else {
    world.enqueueIntention({
      type: "OFFER_WARMTH",
      params: { x01: point.x, y01: point.y, strength01: 0.35 }
    });
  }
  canvas.removeEventListener("pointerdown", beginLoopOnFirstTouch);
  canvas.removeEventListener("pointermove", beginLoopOnHover);
  canvas.removeEventListener("pointerenter", beginLoopOnHover);
  window.removeEventListener("pointermove", trackPointerForDoor);
}
var beginLoopOnFirstTouch = (event) => {
  if (loopStarted) return;
  if (thoughtOverlay.isOpen()) return;
  if (event && event.pointerType && !["touch", "pen"].includes(event.pointerType)) return;
  const point = event ? pointInCanvas(event.clientX, event.clientY) : { x: 0.5, y: 0.5 };
  tryStartFromPoint(point, { hintOnMiss: true });
};
var beginLoopOnHover = (event) => {
  if (loopStarted) return;
  if (thoughtOverlay.isOpen()) return;
  if (event && event.pointerType === "touch") return;
  const point = event ? pointInCanvas(event.clientX, event.clientY) : null;
  if (!point) {
    doorState.hovered = false;
    return;
  }
  focusNorm = point;
  tryStartFromPoint(point);
};
function trackPointerForDoor(event) {
  var _a;
  if (event.pointerType === "touch") return;
  const point = pointInCanvas(event.clientX, event.clientY);
  if (!point) {
    if (!loopStarted) doorState.hovered = false;
    lastPointerForDoor = null;
    return;
  }
  focusNorm = point;
  lastPointerForDoor = { point, pointerType: (_a = event.pointerType) != null ? _a : "mouse" };
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
canvas.addEventListener("pointerdown", beginLoopOnFirstTouch, { passive: true });
canvas.addEventListener("pointermove", beginLoopOnHover, { passive: true });
canvas.addEventListener("pointerenter", beginLoopOnHover, { passive: true });
window.addEventListener("pointermove", trackPointerForDoor, { passive: true });
canvas.addEventListener(
  "pointerleave",
  () => {
    doorState.hovered = false;
  },
  { passive: true }
);
var previewCanvas = document.createElement("canvas");
var previewCtx = previewCanvas.getContext("2d", { alpha: false });
var previewImageData = null;
var grainCanvas = document.createElement("canvas");
grainCanvas.width = 256;
grainCanvas.height = 256;
var grainCtx = grainCanvas.getContext("2d");
var grainData = grainCtx.createImageData(grainCanvas.width, grainCanvas.height);
for (let i = 0; i < grainData.data.length; i += 4) {
  const n = 136 + Math.floor(Math.random() * 90);
  grainData.data[i] = n;
  grainData.data[i + 1] = n;
  grainData.data[i + 2] = n;
  grainData.data[i + 3] = 255;
}
grainCtx.putImageData(grainData, 0, 0);
var grainPattern = ctx.createPattern(grainCanvas, "repeat");
function clamp012(value) {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}
function lerp2(a, b, t2) {
  return a + (b - a) * t2;
}
function lerpColor(a, b, t2) {
  return [lerp2(a[0], b[0], t2), lerp2(a[1], b[1], t2), lerp2(a[2], b[2], t2)];
}
function colorAt(progress01) {
  const clamped = clamp012(progress01);
  for (let i = 0; i < OORT_STOPS.length - 1; i += 1) {
    const a = OORT_STOPS[i];
    const b = OORT_STOPS[i + 1];
    if (clamped <= b.at) {
      const t2 = clamp012((clamped - a.at) / Math.max(1e-4, b.at - a.at));
      return lerpColor(a.rgb, b.rgb, t2);
    }
  }
  return OORT_STOPS[OORT_STOPS.length - 1].rgb;
}
function bloomColorAt(seed01) {
  const wrapped = (seed01 % 1 + 1) % 1;
  const scaled = wrapped * (BLOOM_COLORS.length - 1);
  const i0 = Math.floor(scaled);
  const i1 = Math.min(BLOOM_COLORS.length - 1, i0 + 1);
  const t2 = scaled - i0;
  return lerpColor(BLOOM_COLORS[i0], BLOOM_COLORS[i1], t2);
}
function rgba(rgb, alpha) {
  return `rgba(${rgb[0].toFixed(1)}, ${rgb[1].toFixed(1)}, ${rgb[2].toFixed(1)}, ${alpha})`;
}
function smoothstep(edge0, edge1, x) {
  const t2 = clamp012((x - edge0) / Math.max(1e-4, edge1 - edge0));
  return t2 * t2 * (3 - 2 * t2);
}
function renderConceptLog(entries) {
  var _a, _b;
  const recent = entries.slice(-12).reverse();
  const signature = recent.map((entry) => {
    var _a2, _b2, _c;
    return (_c = entry.id) != null ? _c : `${(_a2 = entry.clock) != null ? _a2 : ""}:${(_b2 = entry.text) != null ? _b2 : ""}`;
  }).join("|");
  if (renderedConceptSignature === signature) return;
  renderedConceptSignature = signature;
  conceptLogEl.innerHTML = "";
  if (recent.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-log";
    empty.textContent = t("bleeding.concept.empty");
    conceptLogEl.appendChild(empty);
    return;
  }
  for (const entry of recent) {
    const row = document.createElement("div");
    row.className = "concept-row";
    const time = document.createElement("div");
    time.className = "concept-time";
    time.textContent = (_a = entry.clock) != null ? _a : "";
    const text = document.createElement("div");
    text.className = "concept-text";
    text.textContent = (_b = entry.text) != null ? _b : "";
    row.append(time, text);
    conceptLogEl.appendChild(row);
  }
}
function loopProgress(nowMs) {
  if (!loopStarted || loopStartMs == null) return 0;
  const elapsed = Math.max(0, nowMs - loopStartMs);
  return clamp012(elapsed / LOOP_DURATION_MS);
}
function doorEllipse(width, height) {
  const minDim = Math.min(width, height);
  const radiusPx = minDim * doorState.radius01;
  return {
    cx: doorState.anchor.x * width,
    cy: doorState.anchor.y * height,
    rx: radiusPx * 0.88,
    ry: radiusPx * 1.2
  };
}
function isDoorHit(point, pad01 = 0) {
  const rx = doorState.radius01 * (0.88 + pad01);
  const ry = doorState.radius01 * (1.2 + pad01 * 0.85);
  const dx = (point.x - doorState.anchor.x) / Math.max(1e-4, rx);
  const dy = (point.y - doorState.anchor.y) / Math.max(1e-4, ry);
  return dx * dx + dy * dy <= 1;
}
function drawDoor(width, height, nowMs) {
  const { cx, cy, rx, ry } = doorEllipse(width, height);
  let alpha = 1;
  if (doorState.openedAtMs != null) {
    alpha = clamp012(1 - (nowMs - doorState.openedAtMs) / 1400);
  }
  if (alpha <= 0) return;
  const hintBoost = clamp012(1 - (nowMs - doorState.hintAtMs) / 680);
  const hoverBoost = doorState.hovered ? 0.42 : 0;
  const pulse = 0.5 + 0.5 * Math.sin(nowMs * 23e-4);
  const glowAlpha = 0.24 + pulse * 0.24 + hintBoost * 0.3 + hoverBoost;
  ctx.save();
  ctx.globalAlpha = 0.95 * alpha;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx * 1.95);
  glow.addColorStop(0, `rgba(246,211,101,${glowAlpha})`);
  glow.addColorStop(1, "rgba(246,211,101,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx * 1.25, ry * 1.45, 0, 0, TAU);
  ctx.fill();
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx * 0.95);
  core.addColorStop(0, `rgba(247,242,232,${0.2 + hoverBoost * 0.3})`);
  core.addColorStop(1, "rgba(247,242,232,0)");
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
  ctx.globalCompositeOperation = "screen";
  for (const dust of doorState.dust) {
    const drift = Math.sin(nowMs * 14e-4 + dust.phase) * 0.06;
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
  const bloomPhase = smoothstep(STAGE.bloomAt - 0.03, STAGE.bloomAt + 0.03, progress01) * (1 - smoothstep(STAGE.stainAt - 0.02, STAGE.stainAt + 0.03, progress01));
  const stainPhase = smoothstep(STAGE.stainAt - 0.04, STAGE.stainAt + 0.04, progress01);
  const voidPhase = smoothstep(STAGE.voidAt - 0.04, 1, progress01);
  const baseColor = lerpColor(baseCool, colorAt(progress01), tint);
  const stainColor = [167, 161, 156];
  const color = lerpColor(baseColor, stainColor, stainPhase * 0.78);
  const withRed = lerpColor(color, [239, 68, 68], redPhase * 0.44 * (1 - greenPhase * 0.25));
  const withGreen = lerpColor(withRed, [34, 197, 94], greenPhase * 0.38);
  const finalColor = lerpColor(withGreen, [247, 242, 232], voidPhase * 0.94);
  const density = lerp2(1.04, 0.44, voidPhase);
  const swell = 1 + Math.sin(nowMs * 12e-4 + progress01 * TAU) * 0.045;
  const tilt = -0.38;
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);
  targetCtx.save();
  const halo = targetCtx.createRadialGradient(cx, cy, 0, cx, cy, base * 1.9);
  halo.addColorStop(0, rgba(finalColor, 0.24 * density));
  halo.addColorStop(0.6, rgba(finalColor, 0.09 * density));
  halo.addColorStop(1, "rgba(0,0,0,0)");
  targetCtx.fillStyle = halo;
  targetCtx.beginPath();
  targetCtx.ellipse(cx, cy, base * 1.25, base * 0.92, 0, 0, TAU);
  targetCtx.fill();
  targetCtx.globalCompositeOperation = "screen";
  for (const point of oortPoints) {
    const spin = nowMs * 18e-5 * (point.band ? 1.2 : 0.72) * (1 + bloomPhase * 0.55);
    const angle = point.angle + spin + progress01 * TAU * 0.2;
    const ripple = Math.sin(nowMs * 15e-4 + point.drift) * 0.075;
    const radius = base * point.radius * swell * (1 + ripple) * (1 + bloomPhase * 0.16);
    const flatten = point.band ? 0.42 : 0.7;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * flatten;
    const tx = x * cosTilt - y * sinTilt;
    const ty = x * sinTilt + y * cosTilt;
    const prismSeed = point.depth * 0.74 + nowMs * 9e-5 + point.angle / TAU * 0.31;
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
    targetCtx.globalCompositeOperation = "multiply";
    for (let i = 0; i < 4; i += 1) {
      const dark = BLOOM_DARKS[i % BLOOM_DARKS.length];
      const dx = Math.cos(nowMs * 6e-4 + i * 1.7) * base * 0.34;
      const dy = Math.sin(nowMs * 8e-4 + i * 1.4) * base * 0.24;
      const glow = targetCtx.createRadialGradient(
        cx + dx,
        cy + dy,
        base * 0.06,
        cx + dx,
        cy + dy,
        base * (0.34 + i * 0.08)
      );
      glow.addColorStop(0, rgba(dark, 0.2 * bloomPhase));
      glow.addColorStop(1, "rgba(0,0,0,0)");
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
  targetCtx.globalCompositeOperation = "source-over";
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
  var _a;
  renderConceptLog((_a = publicState.traces.conceptualLog) != null ? _a : []);
});
var pointers = /* @__PURE__ */ new Map();
var pinchState = null;
var lastZoomToggleMs = 0;
var primaryGesture = null;
var lastPointerMoveMs = 0;
var lastWheelMs = 0;
var MOVE_THROTTLE_MS = 24;
var WHEEL_THROTTLE_MS = 120;
var gesturesEnabled = false;
function normFromClient(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = clamp012((clientX - rect.left) / Math.max(1, rect.width));
  const y = clamp012((clientY - rect.top) / Math.max(1, rect.height));
  return { x, y };
}
function pointInCanvas(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
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
      type: "HOLD",
      params: {
        x01: point.x,
        y01: point.y,
        strength01: 0.75,
        durationMs: heldFor
      }
    });
  };
  sendHold();
  primaryGesture.holdIntervalId = setInterval(sendHold, 200);
}
function appendPoint(points, point) {
  const last = points[points.length - 1];
  const dx = point.x - last.x;
  const dy = point.y - last.y;
  if (dx * dx + dy * dy < 1e-4) return false;
  points.push(point);
  if (points.length > 64) {
    points.splice(0, points.length - 64);
  }
  return true;
}
canvas.addEventListener("pointerdown", (event) => {
  if (!gesturesEnabled) return;
  canvas.setPointerCapture(event.pointerId);
  pointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY,
    pointerType: event.pointerType
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
      withdrawCandidate: false
    };
    primaryGesture.holdTimeoutId = setTimeout(beginHold, 420);
  }
});
canvas.addEventListener("pointermove", (event) => {
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
      primaryGesture.withdrawCandidate = speed > 13e-4;
      if (!primaryGesture.holdActive && nowMs - primaryGesture.lastWarmthAtMs > 120) {
        world.enqueueIntention({
          type: "OFFER_WARMTH",
          params: {
            points: [lastPoint, point],
            strength01: clamp012(1 - speed * 380)
          }
        });
        primaryGesture.lastWarmthAtMs = nowMs;
      }
      primaryGesture.lastMoveAtMs = nowMs;
    }
  }
  const touchPointers = Array.from(pointers.values()).filter((p) => p.pointerType === "touch");
  if (touchPointers.length === 2) {
    const a = touchPointers[0];
    const b = touchPointers[1];
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    if (!pinchState) {
      pinchState = { baseDist: dist };
    } else if (Math.abs(dist - pinchState.baseDist) > 24) {
      if (nowMs - lastZoomToggleMs > 650) {
        world.enqueueIntention({ type: "TOGGLE_ZOOM", params: {} });
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
      type: "RELEASE",
      params: { x01: lastPoint.x, y01: lastPoint.y, strength01: 0.45 }
    });
  } else if (primaryGesture.withdrawCandidate && elapsed < 1200 && speed > 11e-4 && travel > 0.15) {
    world.enqueueIntention({
      type: "WITHDRAW",
      params: {
        x01: lastPoint.x,
        y01: lastPoint.y,
        points: [firstPoint, lastPoint],
        strength01: clamp012(speed * 640)
      }
    });
  } else {
    world.enqueueIntention({
      type: "RELEASE",
      params: { x01: lastPoint.x, y01: lastPoint.y, strength01: 0.3 }
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
  }
}
canvas.addEventListener("pointerup", onPointerEnd);
canvas.addEventListener("pointercancel", onPointerEnd);
canvas.addEventListener(
  "wheel",
  (event) => {
    if (!gesturesEnabled) return;
    event.preventDefault();
    const nowMs = Date.now();
    if (nowMs - lastWheelMs < WHEEL_THROTTLE_MS) return;
    lastWheelMs = nowMs;
    if (nowMs - lastZoomToggleMs < 650) return;
    world.enqueueIntention({ type: "TOGGLE_ZOOM", params: {} });
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
window.addEventListener("resize", resizeCanvas, { passive: true });
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
  const bloomPhase = smoothstep(STAGE.bloomAt - 0.03, STAGE.bloomAt + 0.03, progress01) * (1 - smoothstep(STAGE.stainAt - 0.02, STAGE.stainAt + 0.03, progress01));
  const dryness = clamp012(publicState.metrics.dryness);
  for (let i = 0; i < preview.width * preview.height; i++) {
    const x01 = i % preview.width * invWidth;
    const y01 = Math.floor(i / preview.width) * invHeight;
    const y = preview.y[i];
    const r = preview.r[i];
    const g = preview.g[i];
    const stain = preview.stain[i];
    let red = 247;
    let green = 242;
    let blue = 232;
    red = lerp2(red, 246, y * 0.96);
    green = lerp2(green, 211, y * 0.98);
    blue = lerp2(blue, 101, y * 0.92);
    red = lerp2(red, 239, r * 1);
    green = lerp2(green, 64, r * 0.9);
    blue = lerp2(blue, 64, r * 0.82);
    red = lerp2(red, 34, g * 0.74);
    green = lerp2(green, 197, g * 0.96);
    blue = lerp2(blue, 94, g * 0.74);
    const blend = clamp012((y + r + g) * 0.38);
    red = lerp2(red, 128, blend * 0.24);
    green = lerp2(green, 114, blend * 0.22);
    blue = lerp2(blue, 180, blend * 0.3);
    const redDominance = clamp012(r * 1.15);
    red = lerp2(red, 246, redDominance * 0.18);
    green = lerp2(green, 52, redDominance * 0.16);
    blue = lerp2(blue, 56, redDominance * 0.16);
    if (bloomPhase > 0.01) {
      const washA = 0.5 + 0.5 * Math.sin((x01 * 2.1 + y01 * 1.4 + progress01 * 2.2) * TAU);
      const washB = 0.5 + 0.5 * Math.sin((x01 * -1.6 + y01 * 2.4 + progress01 * 1.8) * TAU);
      const toneA = lerpColor([236, 72, 153], [168, 85, 247], washA);
      const toneB = lerpColor([6, 182, 212], [251, 146, 60], washB);
      const vivid = lerpColor(toneA, toneB, 0.5 + (washB - 0.5) * 0.28);
      const vividMix = bloomPhase * (0.16 + (1 - stain) * 0.11);
      red = lerp2(red, vivid[0], vividMix);
      green = lerp2(green, vivid[1], vividMix);
      blue = lerp2(blue, vivid[2], vividMix);
    }
    red = lerp2(red, 168, stain * 0.56);
    green = lerp2(green, 162, stain * 0.56);
    blue = lerp2(blue, 158, stain * 0.56);
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
  g.addColorStop(0, "#19140f");
  g.addColorStop(0.45, "#110f14");
  g.addColorStop(1, "#08090d");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
}
function drawField(width, height, nowMs, progress01) {
  var _a, _b;
  updatePreviewImage(progress01);
  if (!previewCanvas.width || !previewCanvas.height) return;
  const mode = publicState.mode;
  const edgeSoftness = clamp012(publicState.metrics.edgeSoftness);
  const blurPx = 1 + edgeSoftness * 9;
  const seeker = (_a = publicState.traces.seeker) != null ? _a : focusNorm;
  const focus = mode === "zoom-in" ? focusNorm : seeker;
  ctx.save();
  if (mode === "zoom-in") {
    const zoom = 1.45;
    const srcW = previewCanvas.width / zoom;
    const srcH = previewCanvas.height / zoom;
    const srcX = clamp012(focus.x) * previewCanvas.width - srcW / 2;
    const srcY = clamp012(focus.y) * previewCanvas.height - srcH / 2;
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
  const dryness = clamp012(publicState.metrics.dryness);
  if (grainPattern) {
    ctx.save();
    ctx.globalAlpha = 0.05 + dryness * 0.16;
    ctx.fillStyle = grainPattern;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
  const pulse = clamp012(publicState.metrics.sleepWakePulse);
  ctx.save();
  ctx.globalAlpha = (0.03 + pulse * 0.07) * (1 - dryness * 0.35);
  const light = ctx.createRadialGradient(width * 0.24, height * 0.2, 0, width * 0.24, height * 0.2, width * 0.8);
  light.addColorStop(0, "rgba(246,211,101,0.75)");
  light.addColorStop(1, "rgba(246,211,101,0)");
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
  const burn = clamp012(publicState.metrics.burn);
  if (burn > 0.2) {
    ctx.save();
    const flicker = 0.7 + Math.sin(nowMs * 32e-4) * 0.3;
    ctx.globalAlpha = (burn - 0.2) / 0.8 * 0.28 * flicker;
    const burnGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.53,
      width * 0.18,
      width * 0.5,
      height * 0.53,
      width * 0.7
    );
    burnGrad.addColorStop(0, "rgba(239,68,68,0)");
    burnGrad.addColorStop(1, "rgba(239,68,68,0.75)");
    ctx.fillStyle = burnGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
  const joyPhase = 1 - smoothstep(STAGE.redAt - 0.03, STAGE.redAt + 0.04, progress01);
  const angerPhase = smoothstep(STAGE.redAt - 0.04, STAGE.redAt + 0.04, progress01) * (1 - smoothstep(STAGE.greenAt + 0.02, STAGE.bloomAt - 0.02, progress01));
  const leavePhase = smoothstep(STAGE.greenAt - 0.04, STAGE.greenAt + 0.04, progress01) * (1 - smoothstep(STAGE.stainAt - 0.02, STAGE.stainAt + 0.04, progress01));
  const bloomPhase = smoothstep(STAGE.bloomAt - 0.03, STAGE.bloomAt + 0.03, progress01) * (1 - smoothstep(STAGE.stainAt - 0.02, STAGE.stainAt + 0.03, progress01));
  const stainPhase = smoothstep(STAGE.stainAt - 0.04, STAGE.stainAt + 0.04, progress01) * (1 - smoothstep(STAGE.voidAt + 0.02, 1, progress01));
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
    radial.addColorStop(1, "rgba(246,211,101,0)");
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
    burnSpread.addColorStop(1, "rgba(239,68,68,0)");
    ctx.fillStyle = burnSpread;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = `rgba(239,68,68,${0.28 * angerPhase})`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
  if (leavePhase > 0.01) {
    ctx.save();
    const seeker2 = (_b = publicState.traces.seeker) != null ? _b : focusNorm;
    const leaveLight = ctx.createRadialGradient(
      seeker2.x * width,
      seeker2.y * height,
      width * 0.03,
      seeker2.x * width,
      seeker2.y * height,
      width * 0.58
    );
    leaveLight.addColorStop(0, `rgba(34,197,94,${0.36 * leavePhase})`);
    leaveLight.addColorStop(1, "rgba(34,197,94,0)");
    ctx.fillStyle = leaveLight;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
  if (bloomPhase > 0.01) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 9; i += 1) {
      const hueColor = bloomColorAt(progress01 + i * 0.11 + nowMs * 4e-5);
      const cx = width * (0.15 + i % 3 * 0.34 + Math.sin(nowMs * 1e-3 + i * 0.8) * 0.05);
      const cy = height * (0.2 + Math.floor(i / 3) * 0.3 + Math.cos(nowMs * 12e-4 + i * 1.1) * 0.05);
      const glow = ctx.createRadialGradient(cx, cy, width * 0.04, cx, cy, width * 0.46);
      glow.addColorStop(0, rgba(hueColor, 0.12 * bloomPhase));
      glow.addColorStop(0.55, rgba(hueColor, 0.06 * bloomPhase));
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.globalCompositeOperation = "soft-light";
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
  if (!loopStarted && !thoughtOverlay.isOpen() && (lastPointerForDoor == null ? void 0 : lastPointerForDoor.point)) {
    tryStartFromPoint(lastPointerForDoor.point);
  }
  if (loopStarted && typeof world.syncNarrative === "function") {
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
window.addEventListener("beforeunload", () => {
  clearPrimaryTimers();
  world.stop();
});
//# sourceMappingURL=index.js.map
