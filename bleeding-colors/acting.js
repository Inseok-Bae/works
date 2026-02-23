import { observable, runInAction } from 'mobx';
import { createProgrammaticLogTransport } from '../utils/programmatic-log-transport.js';
import { clamp01 } from './utils/math.js';
import { mulberry32 } from './utils/mulberry32.js';
import { ConceptualLogProcess } from './entities/ConceptualLogProcess.js';
import { InteractionLogger } from './entities/InteractionLogger.js';
import { IntentionQueue } from './entities/IntentionQueue.js';
import { MoistureSeeker } from './entities/MoistureSeeker.js';
import { PigmentField } from './entities/PigmentField.js';
import { SleepWakeProcess } from './entities/SleepWakeProcess.js';
import { SunHeatProcess } from './entities/SunHeatProcess.js';

const PROJECT_KEY = 'bleeding-colors';
const STORAGE_KEY = `${PROJECT_KEY}:interactionLog:v1`;

function asPoints(params = {}) {
  if (Array.isArray(params.points) && params.points.length > 0) {
    return params.points.map((p) => ({
      x: clamp01(p.x ?? p.x01 ?? 0.5),
      y: clamp01(p.y ?? p.y01 ?? 0.5),
    }));
  }
  if (params.x01 != null && params.y01 != null) {
    return [{ x: clamp01(params.x01), y: clamp01(params.y01) }];
  }
  return [{ x: 0.5, y: 0.5 }];
}

export class BleedingColorsWorld {
  constructor({ language = 'en', timeScale = 1 } = {}) {
    this.seed = (Math.floor(Math.random() * 0xffffffff) ^ Date.now()) >>> 0;
    this.rng = mulberry32(this.seed);
    this.logRng = mulberry32(this.seed ^ 0x9e3779b9);

    this.tickHz = 24;
    this.lastTickMs = Date.now();
    this.timer = null;
    this.timeScale = Math.max(0.6, Math.min(2, timeScale));

    this.programmaticTransport = createProgrammaticLogTransport({ project: PROJECT_KEY });
    this.logger = new InteractionLogger({
      storageKey: STORAGE_KEY,
      transport: this.programmaticTransport,
      maxEntries: 2000,
    });
    this.conceptualLog = new ConceptualLogProcess({ rng: this.logRng, maxEvents: 24, language });
    this.queue = new IntentionQueue({
      lagMsBase: 140,
      jitterMs: 230,
      minIntervalMs: 90,
      maxSize: 220,
      rng: this.rng,
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
      { at: 0 / 6, type: 'OFFER_WARMTH' },
      { at: Math.max(0, 1 / 6 - timelineLead), type: 'HOLD' },
      { at: Math.max(0, 2 / 6 - timelineLead), type: 'WITHDRAW' },
      { at: Math.max(0, 3 / 6 - timelineLead), type: 'COLOR_BLOOM' },
      { at: Math.max(0, 4 / 6 - timelineLead), type: 'DRY_LOCK' },
      { at: Math.max(0, 5 / 6 - timelineLead), type: 'FADE_OUT' },
    ];

    const preview = this.field.getPreview({ width: 160, height: 90 });
    this.publicState = observable({
      mode: 'zoom-in',
      phaseHint: 'warm',
      preview,
      metrics: {
        dryness: preview.drynessLevel,
        wetness: preview.wetnessLevel,
        stainLevel: preview.stainLevel,
        warmth: this.sun.warmth,
        burn: this.sun.burn,
        flee: this.moistureSeeker.fleeDebt,
        sleepWakePulse: this.sleepWake.pulse01,
        edgeSoftness: preview.edgeSoftnessHint,
      },
      traces: {
        seeker: { x: 0.5, y: 0.5 },
        conceptualLog: [],
      },
      logCount: this.logger.count,
      queueSize: this.queue.size,
    });
  }

  start() {
    if (this.timer) return;
    this.lastTickMs = Date.now();
    this.timelineIndex = -1;
    this.timer = setInterval(() => this.tick(), Math.floor(1000 / this.tickHz));
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
    this.clearNarrativeTimers();
    this.timelineIndex = -1;
    const seed = {
      x01: clamp01(x01),
      y01: clamp01(y01),
    };
    const schedule = [
      { atMs: 0, type: 'OFFER_WARMTH', strength01: 0.72 },
      { atMs: 360, type: 'HOLD', strength01: 0.72, durationMs: 1200 },
      { atMs: 880, type: 'RELEASE', strength01: 0.42 },
      { atMs: 1380, type: 'HOLD', strength01: 0.82, durationMs: 1520 },
      { atMs: 1880, type: 'WITHDRAW', strength01: 0.9 },
      { atMs: 2520, type: 'OFFER_WARMTH', strength01: 0.54 },
      { atMs: 3220, type: 'RELEASE', strength01: 0.5 },
      { atMs: 3960, type: 'WITHDRAW', strength01: 0.72 },
    ];

    const [first, ...rest] = schedule;
    this.enqueueIntention({
      type: first.type,
      params: {
        x01: seed.x01,
        y01: seed.y01,
        strength01: first.strength01,
        durationMs: first.durationMs ?? 0,
      },
    });

    for (const step of rest) {
      const timerId = setTimeout(() => {
        const spread = 0.11;
        const x = clamp01(seed.x01 + (this.rng() - 0.5) * spread);
        const y = clamp01(seed.y01 + (this.rng() - 0.5) * spread);
        this.enqueueIntention({
          type: step.type,
          params: {
            x01: x,
            y01: y,
            strength01: step.strength01,
            durationMs: step.durationMs ?? 0,
          },
        });
      }, step.atMs);
      this.narrativeTimers.push(timerId);
    }
  }

  syncNarrative({ progress01 = 0, nowMs = Date.now() } = {}) {
    if (!this.timelineMarkers.length) return;
    const clamped = clamp01(progress01);
    let conceptualDirty = false;

    while (
      this.timelineIndex + 1 < this.timelineMarkers.length &&
      clamped >= this.timelineMarkers[this.timelineIndex + 1].at
    ) {
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
      edgeSoftness: fieldMetrics.edgeSoftnessHint,
    };
  }

  logProgrammatic({ nowMs, phase, type, params, metrics }) {
    this.logger.log({
      t: nowMs,
      phase,
      type,
      params: params ?? {},
      metrics: {
        dryness: metrics.dryness,
        wetness: metrics.wetness,
        warmth: metrics.warmth,
        burn: metrics.burn,
        flee: metrics.flee,
        stainLevel: metrics.stainLevel,
      },
      seed: this.seed,
    });
  }

  enqueueIntention({ type, params = {} }) {
    const nowMs = Date.now();
    const queued = this.queue.enqueue({ type, params, nowMs });
    if (!queued) return;

    const metrics = this.composeMetrics();
    this.logProgrammatic({
      nowMs,
      phase: 'enqueue',
      type: queued.type,
      params: queued.params,
      metrics,
    });

    runInAction(() => {
      this.publicState.queueSize = this.queue.size;
      this.publicState.logCount = this.logger.count;
    });
  }

  applyIntention(intention) {
    if (intention.type === 'TOGGLE_ZOOM') {
      runInAction(() => {
        this.publicState.mode = this.publicState.mode === 'zoom-in' ? 'zoom-out' : 'zoom-in';
      });
      return;
    }

    this.sun.applyIntention(intention);

    const points = asPoints(intention.params);
    const strength = clamp01(intention.params.strength01 ?? 0.55);
    const durationMs = Math.max(0, intention.params.durationMs ?? 0);
    const heat = this.sun.getHint().warmth01;

    if (intention.type === 'OFFER_WARMTH') {
      this.field.depositPath({
        points,
        color: 'Y',
        amount: 0.34 * (0.52 + strength),
        radius01: 0.06,
        heat,
      });
      return;
    }

    if (intention.type === 'HOLD') {
      const anchor = points[points.length - 1];
      this.field.deposit({
        x01: anchor.x,
        y01: anchor.y,
        color: 'R',
        amount: 0.42 * (0.58 + strength),
        radius01: 0.075 + Math.min(0.08, durationMs / 9000),
        heat: Math.min(1, heat + 0.28),
      });
      this.moistureSeeker.onPressure({ x01: anchor.x, y01: anchor.y, strength01: strength });
      return;
    }

    if (intention.type === 'RELEASE') {
      this.field.depositPath({
        points,
        color: 'Y',
        amount: 0.16 * (0.46 + strength),
        radius01: 0.052,
        heat: Math.max(0, heat - 0.12),
      });
      return;
    }

    if (intention.type === 'WITHDRAW') {
      const anchor = points[points.length - 1];
      this.moistureSeeker.onPressure({
        x01: anchor.x,
        y01: anchor.y,
        strength01: 0.65 + strength * 0.35,
      });
      this.field.deposit({
        x01: anchor.x,
        y01: anchor.y,
        color: 'G',
        amount: 0.22 * (0.48 + strength),
        radius01: 0.058,
        heat: 0,
      });
    }
  }

  emitAutoEvent(type, nowMs) {
    const metrics = this.composeMetrics();
    this.logProgrammatic({
      nowMs,
      phase: 'auto',
      type,
      params: {},
      metrics,
    });
    return this.conceptualLog.onApplied({ type, params: {} }, nowMs, metrics);
  }

  tick() {
    const nowMs = Date.now();
    const rawDt = Math.min(0.2, Math.max(0, (nowMs - this.lastTickMs) / 1000));
    const dt = Math.min(0.28, rawDt * this.timeScale);
    this.lastTickMs = nowMs;

    const due = this.queue.drainDue(nowMs, 2);
    for (const intention of due) {
      this.applyIntention(intention);
      const metricsAfterApply = this.composeMetrics();
      this.logProgrammatic({
        nowMs,
        phase: 'apply',
        type: intention.type,
        params: intention.params,
        metrics: metricsAfterApply,
      });
    }

    this.sun.update({ dt });
    this.sleepWake.update({ nowMs, dt });

    const fieldMetrics = this.field.getMetrics();
    this.moistureSeeker.update({
      dt,
      fieldMetrics,
      burn01: this.sun.burn,
    });
    const seeker = this.moistureSeeker.getTrace();

    this.field.deposit({
      x01: seeker.pos01.x,
      y01: seeker.pos01.y,
      color: 'G',
      amount: 0.012 + seeker.flee01 * 0.021,
      radius01: 0.035 + seeker.flee01 * 0.036,
      heat: 0,
    });

    if (this.sun.warmth > 0.2) {
      for (let i = 0; i < 3; i++) {
        const wobbleX = 0.5 + (this.rng() - 0.5) * 0.45;
        const wobbleY = 0.5 + (this.rng() - 0.5) * 0.3;
        this.field.deposit({
          x01: wobbleX,
          y01: wobbleY,
          color: this.sun.burn > 0.42 ? 'R' : 'Y',
          amount: 0.004 + this.sun.warmth * 0.013,
          radius01: 0.02 + this.sun.warmth * 0.034,
          heat: this.sun.burn,
        });
      }
    }

    const echo = this.sleepWake.maybeEcho({ nowMs });
    if (echo && this.field.getMetrics().dryness < 0.94) {
      const phaseColor =
        this.sun.burn > 0.34 || this.field.getMetrics().dryness > 0.56
          ? this.rng() < 0.62
            ? 'R'
            : 'G'
          : echo.hue;
      this.field.deposit({
        x01: 0.5 + (this.rng() - 0.5) * 0.35,
        y01: 0.5 + (this.rng() - 0.5) * 0.25,
        color: phaseColor,
        amount: echo.strength01 * 0.35,
        radius01: echo.radius01,
        heat: this.sun.warmth * 0.35,
      });
    }

    if (this.sun.burn > 0.24 && this.field.getMetrics().dryness < 0.82) {
      this.field.deposit({
        x01: 0.5 + (this.rng() - 0.5) * 0.5,
        y01: 0.5 + (this.rng() - 0.5) * 0.34,
        color: this.rng() < 0.55 ? 'R' : this.rng() < 0.5 ? 'Y' : 'G',
        amount: 0.006 + this.sun.burn * 0.008,
        radius01: 0.02 + this.rng() * 0.025,
        heat: this.sun.burn * 0.62,
      });
    }

    if (this.timelineIndex === 3 && this.field.getMetrics().dryness < 0.84) {
      for (let i = 0; i < 5; i++) {
        const hueRoll = this.rng();
        const color = hueRoll < 0.34 ? 'Y' : hueRoll < 0.67 ? 'R' : 'G';
        this.field.deposit({
          x01: 0.5 + (this.rng() - 0.5) * 0.62,
          y01: 0.5 + (this.rng() - 0.5) * 0.42,
          color,
          amount: 0.008 + this.rng() * 0.012,
          radius01: 0.025 + this.rng() * 0.04,
          heat: this.sun.burn * 0.48 + this.sun.warmth * 0.2,
        });
      }
    }

    this.field.evolvePalette({
      dt,
      warmth01: this.sun.warmth,
      burn01: this.sun.burn,
      flee01: seeker.flee01,
      dryness01: this.field.getMetrics().dryness,
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
    const phaseHint = this.fadeActive ? 'fade' : this.sun.getHint().phase;

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
}

export const acting = ({ language = 'en', autoStart = true, timeScale = 1 } = {}) => {
  const world = new BleedingColorsWorld({ language, timeScale });
  if (autoStart) {
    world.start();
    world.enqueueIntention({ type: 'OFFER_WARMTH', params: { seed: true, x01: 0.5, y01: 0.5 } });
  }

  return {
    world,
    publicState: world.publicState,
  };
};
