import { clamp01 } from '../utils/math.js';

export class PigmentField {
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
      wetCentroidY: 0.5,
    };
    this.recalculateMetrics();
  }

  deposit({ x01, y01, color = 'Y', amount = 0.2, radius01 = 0.05, heat = 0 }) {
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

    const channel = color === 'R' ? this.r : color === 'G' ? this.g : this.y;
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

  depositPath({ points, color = 'Y', amount = 0.2, radius01 = 0.04, heat = 0 }) {
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
        const t = s / steps;
        this.deposit({
          x01: p0.x + dx * t,
          y01: p0.y + dy * t,
          color,
          amount: amount / (1 + steps * 0.1),
          radius01,
          heat,
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
        if (wet < 0.002) continue;

        const mix = Math.min(0.24, diffusionK * wet * dt * 60);
        if (mix <= 0) continue;

        const nY = (this.y[idx - 1] + this.y[idx + 1] + this.y[idx - width] + this.y[idx + width]) * 0.25;
        const nR = (this.r[idx - 1] + this.r[idx + 1] + this.r[idx - width] + this.r[idx + width]) * 0.25;
        const nG = (this.g[idx - 1] + this.g[idx + 1] + this.g[idx - width] + this.g[idx + width]) * 0.25;

        this.tmpY[idx] = this.y[idx] + (nY - this.y[idx]) * mix;
        this.tmpR[idx] = this.r[idx] + (nR - this.r[idx]) * mix;
        this.tmpG[idx] = this.g[idx] + (nG - this.g[idx]) * mix;

        const nWet =
          (this.wet[idx - 1] + this.wet[idx + 1] + this.wet[idx - width] + this.wet[idx + width]) * 0.25;
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
      const evap = dt * (0.008 + heat * 0.036 + cost * 0.03);
      const wetLoss = evap * (0.9 + this.drynessMap[i] * 0.55);
      this.wet[i] = Math.max(0, this.wet[i] - wetLoss);
      this.drynessMap[i] = clamp01(this.drynessMap[i] + evap * 1.55);

      const pigment = this.y[i] + this.r[i] + this.g[i];
      if (this.wet[i] < 0.08 && pigment > 0.001) {
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
      if (yellow <= 0.0004) continue;

      const toRedRate = dt * (0.01 + burn * 1.35 + Math.max(0, warmth - 0.45) * 0.75);
      const toRed = Math.min(yellow, yellow * toRedRate);
      let remain = yellow - toRed;

      const toGreenRate = dt * (0.008 + flee * 0.72 + Math.max(0, dry - 0.35) * 0.34);
      const toGreen = Math.min(remain, remain * toGreenRate);
      remain -= toGreen;

      const eraseRate = dt * (0.002 + Math.max(0, dry - 0.52) * 0.8 + burn * 0.08);
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
    const pigmentFade = dt * (0.006 + strength * 0.016);
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
        const w = wet + 0.0001;
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
    const totalWeight = wetSum + this.length * 0.0001;
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
      wetCentroidY,
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
      const sy = Math.min(this.height - 1, Math.floor(((y + 0.5) / h) * this.height));
      const srcRow = sy * this.width;
      const outRow = y * w;
      for (let x = 0; x < w; x++) {
        const sx = Math.min(this.width - 1, Math.floor(((x + 0.5) / w) * this.width));
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
      stainLevel: this.metrics.stainLevel,
    };
  }
}
