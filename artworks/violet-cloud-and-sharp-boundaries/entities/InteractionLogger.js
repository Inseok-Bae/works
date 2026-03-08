export class InteractionLogger {
  constructor({ storageKey, transport = null }) {
    this.storageKey = storageKey;
    this.transport = transport;
    this.entries = [];
    this.flushTimer = null;

    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) this.entries = JSON.parse(raw);
    } catch (_) {
      this.entries = [];
    }
  }

  get count() {
    return this.entries.length;
  }

  log(entry) {
    this.entries.push(entry);
    if (this.entries.length > 5000) this.entries.splice(0, this.entries.length - 5000);
    if (this.transport?.send) {
      try {
        this.transport.send(entry);
      } catch (_) {
        // ignore transport errors for now
      }
    }
    this.flushSoon();
  }

  flushSoon() {
    if (this.flushTimer) return;
    this.flushTimer = setTimeout(() => {
      this.flushTimer = null;
      this.flush();
    }, 1000);
  }

  flush() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
    } catch (_) {
      // ignore (quota/private mode)
    }
  }

  exportJsonl() {
    return this.entries.map((e) => JSON.stringify(e)).join('\n') + '\n';
  }
}
