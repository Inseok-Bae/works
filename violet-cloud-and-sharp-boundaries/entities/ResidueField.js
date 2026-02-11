import { clamp01 } from '../utils/math.js';

export class ResidueField {
  constructor() {
    this.residue = 0.08;
    this.odorParticles = [];
    this.odorArmedAtMs = null; // when odor is allowed to appear
  }

  update({ nowMs, dt, edgePressure, edgeDebt }) {
    this.residue = clamp01(
      this.residue + Math.pow(edgePressure, 2) * 0.015 * dt + edgeDebt * 0.01 * dt - dt * 0.0035
    );

    const threshold = 0.35;
    if (this.residue > threshold && this.odorArmedAtMs == null) {
      this.odorArmedAtMs = nowMs + 3000;
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
          life: 1.0,
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
}
