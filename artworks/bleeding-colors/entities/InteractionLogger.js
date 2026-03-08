export class InteractionLogger {
  constructor({ storageKey, maxEntries = 2000, transport } = {}) {
    this.storageKey = storageKey;
    this.maxEntries = maxEntries;
    this.transport = transport;
    this.entries = this.load();
    this.count = this.entries.length;
  }

  load() {
    if (!this.storageKey) return [];
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(-this.maxEntries);
    } catch (_) {
      return [];
    }
  }

  save() {
    if (!this.storageKey) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
    } catch (_) {
      // ignore storage failures (quota/private mode)
    }
  }

  log(entry) {
    this.entries.push(entry);
    if (this.entries.length > this.maxEntries) {
      this.entries.splice(0, this.entries.length - this.maxEntries);
    }
    this.count = this.entries.length;
    this.save();
    if (this.transport?.send) {
      this.transport.send(entry);
    }
  }
}
