import { observable, runInAction } from 'mobx';
import { clamp01 } from './utils/math.js';
import { mulberry32 } from './utils/mulberry32.js';
import { createProgrammaticLogTransport } from '../utils/programmatic-log-transport.js';
import { InteractionLogger } from './entities/InteractionLogger.js';
import { IntentionQueue } from './entities/IntentionQueue.js';
import { AmbiguityField } from './entities/AmbiguityField.js';
import { BoundarySharpeningProcess } from './entities/BoundarySharpeningProcess.js';
import { ResidueField } from './entities/ResidueField.js';
import { OrientationMetric } from './entities/OrientationMetric.js';
import { VoiceReturnProcess } from './entities/VoiceReturnProcess.js';
import { PaintingCommitProcess } from './entities/PaintingCommitProcess.js';
import { ConceptualLogProcess } from './entities/ConceptualLogProcess.js';

const PROJECT_KEY = 'violet-cloud-and-sharp-boundaries';
const STORAGE_KEY = `${PROJECT_KEY}:interactionLog:v1`;

export class VioletCloudWorld {
  constructor() {
    const seed = Math.floor(Math.random() * 10_000_000) ^ Date.now();
    this.rng = mulberry32(seed);
    this.logRng = mulberry32(seed ^ 0x9e3779b9);

    this.intentionLagMs = 1200;
    this.tickHz = 20;
    this.timeMs = Date.now();

    this.programmaticTransport = createProgrammaticLogTransport({ project: PROJECT_KEY });
    this.logger = new InteractionLogger({ storageKey: STORAGE_KEY, transport: this.programmaticTransport });
    this.queue = new IntentionQueue({ lagMs: this.intentionLagMs, rng: this.rng });

    this.ambiguity = new AmbiguityField();
    this.boundary = new BoundarySharpeningProcess();
    this.residue = new ResidueField();
    this.orientation = new OrientationMetric();
    this.voice = new VoiceReturnProcess({ rng: this.rng });
    this.painting = new PaintingCommitProcess();
    this.conceptualLog = new ConceptualLogProcess({ rng: this.logRng });

    this.assets = {
      audioBuffer: null,
      paintingBitmap: null,
      fogVideoEl: null,
    };

    this.publicState = observable({
      mode: 'zoom-in',
      metrics: {
        fogPressure: 0.35,
        edgePressure: 0.22,
        residue: 0.08,
        orientationError: 0.18,
        voicePulse: 0.0,
        paintingCommit: 0.0,
        motherDistance: 0.62,
      },
      traces: {
        boundarySegments: [],
        odorParticles: [],
        voiceMarks: [],
        painting: { locked: false },
        conceptualLog: [],
      },
      logCount: this.logger.count,
    });

    this.lastTickMs = Date.now();
    this.timer = null;
  }

  start() {
    if (this.timer) return;
    this.lastTickMs = Date.now();
    this.timer = setInterval(() => this.tick(), Math.floor(1000 / this.tickHz));
  }

  stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }

  enqueueIntention({ type, params }) {
    const nowMs = Date.now();
    this.queue.enqueue({ type, params });
    const event = this.conceptualLog.onEnqueue({ type, params }, nowMs);
    if (!event) return;
    runInAction(() => {
      this.publicState.traces.conceptualLog = this.conceptualLog.snapshot();
    });
  }

  setAssets({ audioBuffer, paintingBitmap, fogVideoEl }) {
    if (audioBuffer) this.assets.audioBuffer = audioBuffer;
    if (paintingBitmap) this.assets.paintingBitmap = paintingBitmap;
    if (fogVideoEl) this.assets.fogVideoEl = fogVideoEl;
  }

  applyIntention(intent) {
    if (intent.type === 'RESET_SOFT') {
      // non-destructive: do not unlock painting commit
      this.boundary.edgePressure = clamp01(this.boundary.edgePressure * 0.55);
      this.residue.residue = clamp01(this.residue.residue * 0.55);
      this.ambiguity.fogPressure = clamp01(this.ambiguity.fogPressure * 0.7);
      return;
    }

    if (intent.type === 'TOGGLE_ZOOM') {
      runInAction(() => {
        this.publicState.mode = this.publicState.mode === 'zoom-in' ? 'zoom-out' : 'zoom-in';
      });
      return;
    }

    this.painting.applyIntention(intent);
    this.voice.applyIntention(intent);
    this.ambiguity.applyIntention(intent);
    this.boundary.applyIntention(intent);
    this.orientation.applyIntention(intent);
  }

  tick() {
    const nowMs = Date.now();
    const dt = Math.min(0.2, Math.max(0, (nowMs - this.lastTickMs) / 1000));
    this.lastTickMs = nowMs;
    this.timeMs = nowMs;

    const due = this.queue.drainDue(nowMs);
    for (const intent of due) {
      this.applyIntention(intent);
    }

    this.voice.update({ nowMs, dt });
    this.painting.update({ nowMs, dt });

    this.boundary.update({ dt });
    this.ambiguity.update({
      dt,
      voicePulse: this.voice.voicePulse,
      edgePressure: this.boundary.edgePressure,
      paintingCommit: this.painting.paintingCommit,
    });
    this.residue.update({
      nowMs,
      dt,
      edgePressure: this.boundary.edgePressure,
      edgeDebt: this.boundary.edgeDebt,
    });
    this.orientation.update({
      dt,
      residue: this.residue.residue,
      fogPressure: this.ambiguity.fogPressure,
    });

    const motherDistance = clamp01(0.18 + this.ambiguity.fogPressure * 0.62 - this.boundary.edgePressure * 0.32);
    const metricSnapshot = {
      fogPressure: this.ambiguity.fogPressure,
      edgePressure: this.boundary.edgePressure,
      residue: this.residue.residue,
      orientationError: this.orientation.orientationError,
      voicePulse: this.voice.voicePulse,
      paintingCommit: this.painting.paintingCommit,
      motherDistance,
    };

    // Log AFTER state changes, but only for applied intentions.
    for (const intent of due) {
      const programmaticEntry = {
        t: nowMs,
        type: intent.type,
        params: intent.params ?? {},
        mode: this.publicState.mode,
        metrics: metricSnapshot,
      };
      this.logger.log(programmaticEntry);
      this.conceptualLog.onApplied(intent, nowMs, metricSnapshot);
    }

    runInAction(() => {
      this.publicState.metrics.fogPressure = metricSnapshot.fogPressure;
      this.publicState.metrics.edgePressure = metricSnapshot.edgePressure;
      this.publicState.metrics.residue = metricSnapshot.residue;
      this.publicState.metrics.orientationError = metricSnapshot.orientationError;
      this.publicState.metrics.voicePulse = metricSnapshot.voicePulse;
      this.publicState.metrics.paintingCommit = metricSnapshot.paintingCommit;
      this.publicState.metrics.motherDistance = metricSnapshot.motherDistance;

      this.publicState.traces.boundarySegments = this.boundary.segments;
      this.publicState.traces.odorParticles = this.residue.odorParticles;
      this.publicState.traces.voiceMarks = this.voice.marks;
      this.publicState.traces.painting.locked = this.painting.locked;
      if (due.length > 0) {
        this.publicState.traces.conceptualLog = this.conceptualLog.snapshot();
      }

      this.publicState.logCount = this.logger.count;
    });
  }
}

export const acting = () => {
  const world = new VioletCloudWorld();
  world.start();

  // Seed: first public record
  world.enqueueIntention({ type: 'LISTEN_HOLD', params: { seed: true } });

  return {
    world,
    publicState: world.publicState,
  };
};
