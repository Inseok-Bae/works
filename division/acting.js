import { Being } from '../models/being';

export const acting = () => {
  new Being();

  return { world: Being.world };
};
