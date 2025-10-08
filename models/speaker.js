import { reaction } from 'mobx';
import { occasionally, getRandomInt } from '../utils/util';

export class Speaker {
  constructor({ public_conversations, name }) {
    this.delay = getRandomInt(1000, 3000);
    this.ownContent = getRandomInt(1, 10);
    this.public_conversations = public_conversations;
    this.name = name;
    this.join();
  }

  join() {
    reaction(
      () => this.public_conversations.getLastRecord(),
      async (_) => {
        try {
          const result = occasionally(() => {
            return this.think(this.public_conversations.getContents());
          });
          this.speak(result);
        } catch (_) {
          this.speak(this.ownContent);
        }
      },
      { delay: this.delay }
    );
  }

  think(materials) {
    try {
      return occasionally(() => {
        const lastMemory = getRandomInt(1, 3) * -1;
        const content = materials.slice(lastMemory).reduce((a, b) => a + b, 1);
        return this.ownContent > content ? this.ownContent : content;
      });
    } catch (_) {
      return this.ownContent;
    }
  }

  speak(something) {
    this.public_conversations.push({ content: something, by: this.name });
  }
}
