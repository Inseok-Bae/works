import { clamp01 } from '../utils/math.js';

export class SleepWakeProcess {
  constructor({ rng = Math.random, cycleMsMin = 14000, cycleMsMax = 26000 } = {}) {
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
      this.nextEchoAtMs = nowMs + 4000 + Math.floor(this.rng() * 3000);
    }

    const t = ((nowMs - this.startedAtMs) % this.cycleMs) / this.cycleMs;
    this.pulse01 = clamp01(0.5 + 0.5 * Math.sin(t * Math.PI * 2 + this.phaseOffset));
    this.decay = clamp01(this.decay - dt * 0.0018);
  }

  maybeEcho({ nowMs }) {
    if (nowMs < this.nextEchoAtMs) return null;
    this.nextEchoAtMs = nowMs + 5000 + Math.floor(this.rng() * 6000);
    this.decay = clamp01(this.decay * 0.992);
    return {
      strength01: clamp01(0.12 * this.decay + this.rng() * 0.08),
      radius01: 0.03 + this.rng() * 0.08,
      hue: this.rng() < 0.55 ? 'Y' : 'R',
    };
  }
}
