import { Being } from '../../shared/models/being.js';

export const acting = () => {
  new Being();

  return { world: Being.world };
};


