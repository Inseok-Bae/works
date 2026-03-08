export class IntentionQueue {
  constructor({ lagMs, rng }) {
    this.lagMs = lagMs;
    this.rng = rng;
    this.items = [];
  }

  enqueue({ type, params }) {
    const nowMs = Date.now();
    const jitter = Math.floor(this.rng() * 180);
    this.items.push({ type, params, atMs: nowMs + this.lagMs + jitter });
  }

  drainDue(nowMs) {
    if (this.items.length === 0) return [];
    const due = [];
    const rest = [];
    for (const item of this.items) {
      if (item.atMs <= nowMs) due.push(item);
      else rest.push(item);
    }
    this.items = rest;
    return due;
  }
}

