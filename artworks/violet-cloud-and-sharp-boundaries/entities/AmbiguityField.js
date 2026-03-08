import { clamp01 } from '../utils/math.js';

export class AmbiguityField {
  constructor() {
    this.fogPressure = 0.35;
    this.purpleSaturation = 0.55;
    this.memoryTank = 0.18; // private: accumulates while listening
  }

  applyIntention(intent) {
    if (intent.type === 'LISTEN_HOLD') {
      this.memoryTank = clamp01(this.memoryTank + 0.04);
    }
    if (intent.type === 'SMUDGE_STROKE') {
      this.fogPressure = clamp01(this.fogPressure + 0.08);
      this.memoryTank = clamp01(this.memoryTank + 0.03);
    }
  }

  update({ dt, voicePulse, edgePressure, paintingCommit }) {
    this.memoryTank = clamp01(this.memoryTank - dt * 0.014);

    const base = 0.12;
    const target = clamp01(
      base +
        this.memoryTank * 0.55 +
        voicePulse * 0.55 -
        edgePressure * 0.24 -
        paintingCommit * 0.32
    );
    this.fogPressure = clamp01(this.fogPressure + (target - this.fogPressure) * dt * 0.55);
    this.purpleSaturation = clamp01(0.24 + this.fogPressure * 0.76);
  }
}
