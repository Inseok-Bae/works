import { clamp01 } from '../utils/math.js';

export class MoistureSeeker {
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
    const targetX = fieldMetrics?.wetCentroidX ?? 0.5;
    const targetY = fieldMetrics?.wetCentroidY ?? 0.5;
    const wetness = fieldMetrics?.wetness ?? 0.4;

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
      flee01: this.fleeDebt,
    };
  }
}
