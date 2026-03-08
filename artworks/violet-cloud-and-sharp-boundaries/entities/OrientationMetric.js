import { clamp01 } from '../utils/math.js';

export class OrientationMetric {
  constructor() {
    this.orientationError = 0.18;
    this.earPullEnergy = 0.0; // private: temporary assist
  }

  applyIntention(intent) {
    if (intent.type === 'PULL_EAR') {
      const amount = clamp01(intent.params?.amount ?? 0.2);
      this.earPullEnergy = clamp01(this.earPullEnergy + amount);
    }
  }

  update({ dt, residue, fogPressure }) {
    this.earPullEnergy = clamp01(this.earPullEnergy - dt * 0.35);
    const base = 0.12;
    this.orientationError = clamp01(base + residue * 0.6 + fogPressure * 0.2 - this.earPullEnergy * 0.3);
  }
}
