import { clamp01 } from '../utils/math.js';

export class BoundarySharpeningProcess {
  constructor() {
    this.edgePressure = 0.22;
    this.edgeDebt = 0.0; // private: stiffening debt
    this.segments = [];
  }

  applyIntention(intent) {
    if (intent.type === 'SHARPEN_STROKE') {
      const points = intent.params?.points ?? [];
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
          bornMs: Date.now(),
        });
      }
      if (this.segments.length > 240) this.segments.splice(0, this.segments.length - 240);
    }

    if (intent.type === 'SMUDGE_STROKE') {
      this.edgePressure = clamp01(this.edgePressure - 0.085);
      if (this.segments.length > 0) this.segments.splice(-Math.min(18, this.segments.length));
    }
  }

  update({ dt }) {
    this.edgePressure = clamp01(this.edgePressure - dt * 0.008);
    this.edgeDebt = clamp01(this.edgeDebt + Math.pow(this.edgePressure, 2) * dt * 0.12 - dt * 0.01);
  }
}
