import { clamp01, lerp } from '../utils/math.js';

export class SunHeatProcess {
  constructor({ baselineWarmth = 0.18 } = {}) {
    this.baselineWarmth = baselineWarmth;
    this.warmth = baselineWarmth;
    this.heatDebt = 0.0;
    this.burn = 0.0;
    this.phase = 'warm';
  }

  applyIntention({ type, params = {} }) {
    const strength = clamp01(params.strength01 ?? 0.45);
    const durationMs = Math.max(0, params.durationMs ?? 0);
    const durationFactor = Math.min(2, durationMs / 1200);

    if (type === 'OFFER_WARMTH') {
      this.warmth = clamp01(this.warmth + 0.09 * strength);
      this.heatDebt = clamp01(this.heatDebt + 0.016 * strength);
      return;
    }
    if (type === 'HOLD') {
      this.warmth = clamp01(this.warmth + 0.12 * strength);
      this.heatDebt = clamp01(this.heatDebt + 0.13 * strength * (1 + durationFactor * 0.5));
      return;
    }
    if (type === 'RELEASE') {
      this.warmth = clamp01(this.warmth - 0.05 * strength);
      return;
    }
    if (type === 'WITHDRAW') {
      this.warmth = clamp01(this.warmth - 0.045 * strength);
    }
  }

  update({ dt }) {
    const cooling = clamp01(dt * (0.12 + this.burn * 0.08));
    this.warmth = lerp(this.warmth, this.baselineWarmth, cooling);
    this.heatDebt = clamp01(this.heatDebt + Math.max(0, this.warmth - 0.55) * dt * 0.08 - dt * 0.012);

    const burnTarget = clamp01((this.heatDebt - 0.22) * 1.65 + Math.max(0, this.warmth - 0.62) * 0.95);
    this.burn = lerp(this.burn, burnTarget, clamp01(dt * 0.95));

    if (this.burn >= 0.38) this.phase = 'burn';
    else if (this.warmth <= this.baselineWarmth + 0.04) this.phase = 'fade';
    else this.phase = 'warm';
  }

  getHint() {
    return {
      warmth01: this.warmth,
      burn01: this.burn,
      phase: this.phase,
      heatDebt01: this.heatDebt,
    };
  }
}
