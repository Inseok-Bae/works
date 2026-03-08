import { clamp01 } from '../utils/math.js';

export class VoiceReturnProcess {
  constructor({ rng }) {
    this.rng = rng;
    this.voicePulse = 0.0;
    this.listenCharge = 0.0; // private: increases pulse rate
    this.pulse = null; // { startedAtMs, durationMs }
    this.marks = [];
  }

  applyIntention(intent) {
    if (intent.type === 'LISTEN_HOLD') {
      this.listenCharge = clamp01(this.listenCharge + 0.05);
    }
  }

  maybeTrigger(nowMs, dt) {
    // hazard rate (per second), slow rhythm
    const rate = 0.06 + this.listenCharge * 0.18;
    const p = 1 - Math.exp(-rate * dt);
    if (this.rng() < p) {
      this.pulse = { startedAtMs: nowMs, durationMs: 1800 };
      this.marks.push({
        bornMs: nowMs,
        x: (this.rng() * 2 - 1) * 0.6,
        y: (this.rng() * 2 - 1) * 0.2 - 0.05,
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

    // 0 → 1 → 0 envelope
    this.voicePulse = Math.sin(t * Math.PI);
  }
}
