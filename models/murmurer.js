import { Speaker } from './speaker';
import { occasionally } from '../utils/util';
import { observable } from 'mobx';

export class Murmurer extends Speaker {
  constructor({ public_conversations, name }) {
    super({ public_conversations, name });
    this.delay = this.delay * 10 + 3000;
    this.ownContent = 0;
    this.regret = observable([]);
    this.limit = 10;
  }

  speak(something) {
    try {
      occasionally(() => {
        super.speak(something > this.limit ? this.limit : something);
        try {
          occasionally(() => {
            const spoken = something;
            this.regret.push({ content: spoken, when: new Date(), by: this.name });
          });
        } catch (_) {
          // what the hell i'm doing here
        }
      });
    } catch (_) {
      const unspoken = something;
      this.regret.push({ content: unspoken, when: new Date(), by: this.name });
    }
  }
}
