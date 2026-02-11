import { easeInCubic } from '../utils/math.js';

export class PaintingCommitProcess {
  constructor() {
    this.paintingCommit = 0.0;
    this.locked = false;
    this.commitScheduledAtMs = null;
    this.commitStartedAtMs = null;
  }

  applyIntention(intent) {
    if (intent.type !== 'COMMIT_PAINTING') return;
    if (this.locked) return;
    if (this.commitScheduledAtMs != null) return;
    this.commitScheduledAtMs = Date.now() + 2000;
  }

  update({ nowMs }) {
    if (!this.locked && this.commitScheduledAtMs != null && nowMs >= this.commitScheduledAtMs) {
      this.locked = true;
      this.commitStartedAtMs = nowMs;
      this.commitScheduledAtMs = null;
    }

    if (!this.locked || this.commitStartedAtMs == null) return;
    const durationMs = 6000;
    const t = (nowMs - this.commitStartedAtMs) / durationMs;
    this.paintingCommit = easeInCubic(t);
  }
}
