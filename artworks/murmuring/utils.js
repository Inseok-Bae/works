import { getSpeakerColor } from './chart';

export function getSpeakerNames(t) {
  return {
    wind: t('murmuring.speakers.wind'),
    speaker: t('murmuring.speakers.speaker'),
    murmurer: t('murmuring.speakers.murmurer'),
  };
}

export function toData(origin, speakerNames) {
  return origin.map((record) => ({
    x: record.when.getTime(),
    y: record.content,
    label: speakerNames[record.by],
    by: record.by,
  }));
}

export function makeSpeakerLegend(speaker, speakerNames) {
  return {
    text: speakerNames[speaker],
    fillStyle: getSpeakerColor(speaker).point,
    strokeStyle: getSpeakerColor(speaker).point,
    lineWidth: 0,
    pointStyle: 'circle',
    hidden: false,
    index: Object.keys(speakerNames).length,
  };
}
