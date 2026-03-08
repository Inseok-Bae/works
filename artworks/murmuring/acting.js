import { Conversations } from '../../shared/models/conversations.js';
import { Speaker } from '../../shared/models/speaker.js';
import { Murmurer } from '../../shared/models/murmurer.js';

export const acting = () => {
  const public_conversations = new Conversations();

  new Speaker({
    public_conversations,
    name: 'speaker',
  });
  const mumurer = new Murmurer({
    public_conversations,
    name: 'murmurer',
  });

  public_conversations.push({ content: 0, by: 'wind' });

  return {
    public_conversations,
    murmurer_regret: mumurer.regret,
  };
};


