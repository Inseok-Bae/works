import { observable, runInAction } from 'mobx';
import { get_random_increase } from '../utils/util';

export class Being {
  static world = observable.map();
  static EPHEMERAL_LIFETIME_MS = 2000;
  static TICK_MS = 700;
  static SPAWN_PERIOD_MS = 700;

  constructor({ replica_count = 2, origin = null } = {}) {
    this.id = Symbol('Being');
    this.created_at = Date.now();
    this.replica_count = replica_count;
    this.last_spawn_at = this.created_at;
    this.autonomy = get_random_increase(0);
    this.origin = origin;
    this.is_permanent = !origin || this.autonomy >= origin.autonomy + 100;

    runInAction(() => {
      Being.world.set(this.id, this);
    });

    if (this.is_permanent) {
      this.autonomy = 0;
      this.act();
    } else {
      this.life_time = Date.now() + Being.EPHEMERAL_LIFETIME_MS + Math.floor(Math.random() * 300);
    }
  }

  act() {
    const now = Date.now();
    this.pull(now);
    this.spawn(now);
    setTimeout(() => this.act(), Being.TICK_MS);
  }

  spawn(now) {
    if (now - this.last_spawn_at < Being.SPAWN_PERIOD_MS) return;

    for (let i = 0; i < this.replica_count; i++) {
      new Being({ replica_count: this.replica_count, origin: this });
    }

    this.last_spawn_at = now;
  }

  pull(now = Date.now()) {
    const to_delete = [];
    for (const b of Being.world.values()) {
      if (b.origin !== this || b.is_permanent) continue;
      if (now >= b.life_time) to_delete.push(b.id);
    }
    runInAction(() => {
      for (const id of to_delete) Being.world.delete(id);
    });
  }
}
