import { Conversations } from '../models/conversations';
import { Speaker } from '../models/speaker';
import { Murmurer } from '../models/murmurer';

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
