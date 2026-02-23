export class IntentionQueue {
  constructor({
    lagMsBase = 500,
    jitterMs = 700,
    minIntervalMs = 70,
    maxSize = 240,
    rng = Math.random,
  } = {}) {
    this.lagMsBase = lagMsBase;
    this.jitterMs = jitterMs;
    this.minIntervalMs = minIntervalMs;
    this.maxSize = maxSize;
    this.rng = rng;
    this.sequence = 0;
    this.queue = [];
    this.lastByTypeMs = new Map();
  }

  enqueue({ type, params = {}, nowMs = Date.now() }) {
    const last = this.lastByTypeMs.get(type) ?? -Infinity;
    if (nowMs - last < this.minIntervalMs) return null;
    this.lastByTypeMs.set(type, nowMs);

    const lag = this.lagMsBase + Math.floor(this.rng() * this.jitterMs);
    const intention = {
      id: `intent-${nowMs}-${this.sequence++}`,
      type,
      params,
      enqueuedAtMs: nowMs,
      dueAtMs: nowMs + lag,
    };
    this.queue.push(intention);
    if (this.queue.length > this.maxSize) {
      this.queue.splice(0, this.queue.length - this.maxSize);
    }
    return intention;
  }

  drainDue(nowMs = Date.now(), limit = Infinity) {
    if (this.queue.length === 0) return [];
    const due = [];
    const nextQueue = [];
    for (const item of this.queue) {
      if (item.dueAtMs <= nowMs && due.length < limit) {
        due.push(item);
      } else {
        nextQueue.push(item);
      }
    }
    this.queue = nextQueue;
    return due;
  }

  get size() {
    return this.queue.length;
  }
}
