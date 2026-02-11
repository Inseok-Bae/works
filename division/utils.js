import { getSpeakerColor } from './chart';

export const speakerNames = {
  wind: 'Wind',
  speaker: 'Mr. Speaker',
  murmurer: 'Mr. Murmurer',
};

export function toData(origin) {
  return origin.map((record) => ({
    x: record.when.getTime(),
    y: record.content,
    label: speakerNames[record.by],
    by: record.by,
  }));
}

export function makeSpeakerLegend(speaker) {
  return {
    text: speakerNames[speaker],
    fillStyle: getSpeakerColor(speaker).point,
    strokeStyle: getSpeakerColor(speaker).point,
    lineWidth: 0,
    pointStyle: 'circle',
    hidden: false,
    index: speakerNames.length,
  };
}
