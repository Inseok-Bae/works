const MESSAGE_SETS = {
  ko: {
    queued: {
      LISTEN_HOLD: [
        '듣기의 지속이 안개를 향해 기울기 시작한다.',
        '조용한 눌림이 목소리의 귀환을 기다린다.',
        '멈춘 손끝이 흐릿한 층을 더 가까이 당긴다.',
      ],
      SHARPEN_STROKE: [
        '경계를 세우려는 힘이 선의 결을 만든다.',
        '날카로운 획이 안개의 면을 가른다.',
        '모호함을 견디지 못한 손이 가장자리부터 조인다.',
      ],
      SMUDGE_STROKE: [
        '단단한 모서리를 다시 번지게 눌러 놓는다.',
        '경계 위에 흐림을 덧칠하려는 움직임이 들어온다.',
        '분리된 면을 다시 한 덩어리로 묶으려는 제스처다.',
      ],
      PULL_EAR: [
        '방향 감각을 잠시 바로잡기 위해 귀를 당긴다.',
        '기준점의 흔들림을 줄이려는 요청이 들어온다.',
        '멀어진 소리를 다시 붙들기 위한 미세한 조정이다.',
      ],
      COMMIT_PAINTING: [
        '보랏빛 장면을 벽의 시간으로 고정하려 한다.',
        '흔들리는 표면을 한 번 멈춰 세우는 선택이다.',
        '떠다니는 감각을 기록 가능한 면으로 옮긴다.',
      ],
      TOGGLE_ZOOM: [
        '관점이 바뀌며 같은 장면의 거리감이 달라진다.',
        '줌의 전환이 구조와 감각의 비율을 다시 맞춘다.',
        '한 발 물러서거나 다가서며 읽는 단위가 바뀐다.',
      ],
      RESET_SOFT: [
        '과열된 결을 천천히 식히려는 개입이다.',
        '과도하게 날 선 면을 완만하게 되돌린다.',
        '긴장을 끊지 않고 강도만 낮추려 한다.',
      ],
    },
    applied: {
      LISTEN_HOLD: [
        '안개층이 목소리의 여운을 다시 끌어온다.',
        '희미한 파동이 표면에 낮게 번진다.',
        '듣기의 잔류가 장면의 밀도를 바꾼다.',
      ],
      SHARPEN_STROKE: [
        '경계의 선명도가 조금 더 올라간다.',
        '흐린 덩어리 안에서 모서리가 드러난다.',
        '안개가 물러서고 선의 긴장이 남는다.',
      ],
      SMUDGE_STROKE: [
        '선명했던 경계가 다시 부드러워진다.',
        '경계와 안개의 거리 차가 줄어든다.',
        '단단한 분절이 느린 층으로 흩어진다.',
      ],
      PULL_EAR: [
        '방향 오차가 잠시 낮아진다.',
        '흔들리던 기준점이 짧게 정렬된다.',
        '귀를 당긴 만큼 시선의 편차가 줄어든다.',
      ],
      COMMIT_PAINTING: [
        '보랏빛 층이 고정면에 가까워진다.',
        '떠다니던 이미지가 벽의 시간으로 붙는다.',
        '고정도가 올라가며 흔들림의 여지가 줄어든다.',
      ],
      TOGGLE_ZOOM: [
        '같은 흔적이 다른 해상도로 읽힌다.',
        '관찰 거리의 변경이 관계의 음색을 바꾼다.',
        '구조와 감각이 서로 다른 비율로 강조된다.',
      ],
      RESET_SOFT: [
        '날 선 결이 누그러지며 장면이 숨을 고른다.',
        '과열 구간이 완만하게 낮아진다.',
        '긴장을 남긴 채 표면의 강도만 내려간다.',
      ],
    },
    fallback: {
      queued: [
        '작은 개입이 지연 큐에 쌓인다.',
        '지금의 입력은 잠시 뒤 장면에 도착한다.',
        '변화의 명령이 내부 리듬으로 번역된다.',
      ],
      applied: [
        '누적된 개입이 표면으로 나타난다.',
        '지연된 규칙이 장면의 질감을 다시 쓴다.',
        '같은 화면이 다른 긴장도로 갱신된다.',
      ],
    },
    tail: {
      paintingCommit: [
        '고정된 보라가 벽의 시간에 거의 도달했다.',
        '보라의 표면은 이제 쉽게 흔들리지 않는다.',
      ],
      residue: [
        '가장자리의 잔여가 석회처럼 남아 있다.',
        '누적된 잔류가 공기의 결을 탁하게 만든다.',
        '남은 부하가 장면의 숨을 무겁게 한다.',
      ],
      orientationError: [
        '방향 감각의 흔들림이 아직 크다.',
        '기준점의 편차가 걷는 축을 비틀고 있다.',
        '정렬되지 않은 감각이 시야를 흔든다.',
      ],
      fogDominant: [
        '안개가 경계를 다시 감싼다.',
        '흐림의 압력이 모서리를 덮고 지나간다.',
      ],
      edgeDominant: [
        '경계가 안개를 밀어내며 앞선다.',
        '모서리의 긴장이 흐림의 면을 가른다.',
      ],
      balance: [
        '흐림과 경계가 불안정한 균형을 유지한다.',
        '둘 사이의 긴장은 어느 쪽도 완전히 이기지 못한다.',
      ],
    },
  },
  en: {
    queued: {
      LISTEN_HOLD: [
        'Sustained listening tilts the scene toward fog.',
        'A quiet hold waits for voice to return.',
        'A still fingertip draws the hazy layer closer.',
      ],
      SHARPEN_STROKE: [
        'A force to define edges enters the field.',
        'A sharp stroke cuts through the fog plane.',
        'The hand tightens the boundary from the rim inward.',
      ],
      SMUDGE_STROKE: [
        'Hard edges are pressed back into blur.',
        'A softening pass lands on top of the boundary.',
        'Separated planes are asked to merge again.',
      ],
      PULL_EAR: [
        'The ear is pulled to recover orientation.',
        'A request arrives to steady the reference point.',
        'A small adjustment tries to catch a drifting signal.',
      ],
      COMMIT_PAINTING: [
        'The violet scene is asked to lock to wall-time.',
        'A floating surface is briefly fixed in place.',
        'Drift is converted into a recordable frame.',
      ],
      TOGGLE_ZOOM: [
        'View distance shifts and relation scale changes.',
        'Zoom switching rewrites structure-to-sensation ratio.',
        'Stepping in or out changes the reading unit.',
      ],
      RESET_SOFT: [
        'An intervention cools the overheated grain.',
        'Over-sharpened surfaces are softened without erasing.',
        'Tension remains, but intensity is lowered.',
      ],
    },
    applied: {
      LISTEN_HOLD: [
        'Fog pulls back the tail of voice.',
        'A low wave spreads across the surface.',
        'Residual listening changes scene density.',
      ],
      SHARPEN_STROKE: [
        'Edge clarity rises a little.',
        'Corners emerge from the blurred mass.',
        'Fog retreats while line tension remains.',
      ],
      SMUDGE_STROKE: [
        'A crisp edge softens again.',
        'Distance between edge and fog narrows.',
        'Hard segmentation dissolves into slower layers.',
      ],
      PULL_EAR: [
        'Orientation error drops for a moment.',
        'The drifting reference aligns briefly.',
        'Gaze variance tightens after the pull.',
      ],
      COMMIT_PAINTING: [
        'The violet layer nears a fixed state.',
        'A drifting image adheres to wall-time.',
        'Commit depth rises and reduces drift room.',
      ],
      TOGGLE_ZOOM: [
        'The same trace reads at another resolution.',
        'Distance change retunes relational timbre.',
        'Structure and sensation are reweighted.',
      ],
      RESET_SOFT: [
        'Sharp grain eases and the scene exhales.',
        'Hot zones cool into a gentler slope.',
        'Tension is kept while intensity drops.',
      ],
    },
    fallback: {
      queued: [
        'A small intervention enters the delayed queue.',
        'This input arrives in the scene a little later.',
        'A change request is translated into internal rhythm.',
      ],
      applied: [
        'Accumulated interventions surface on the frame.',
        'Delayed rules rewrite the scene texture.',
        'The same image refreshes with different tension.',
      ],
    },
    tail: {
      paintingCommit: [
        'Committed violet is close to wall-time.',
        'The purple surface is now hard to dislodge.',
      ],
      residue: [
        'Edge residue remains like mineral crust.',
        'Accumulated residue muddies the air grain.',
        'Leftover load makes the scene breathe heavier.',
      ],
      orientationError: [
        'Orientation jitter is still high.',
        'Reference drift keeps twisting the walking axis.',
        'Unaligned sensing continues to shake the view.',
      ],
      fogDominant: [
        'Fog folds over the boundary again.',
        'Blur pressure moves across the edge line.',
      ],
      edgeDominant: [
        'Boundary pushes ahead of fog.',
        'Edge tension cuts across the blur plane.',
      ],
      balance: [
        'Fog and edge hold an unstable balance.',
        'Neither side fully dominates the other.',
      ],
    },
  },
};

function resolveLanguage(language) {
  if (!language || typeof language !== 'string') return 'en';
  const lower = language.toLowerCase();
  if (lower.startsWith('ko')) return 'ko';
  if (lower.startsWith('en')) return 'en';
  return 'en';
}

function clockText(nowMs) {
  const d = new Date(nowMs);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

function pickFrom({ rng, memory, key, variants }) {
  if (!Array.isArray(variants) || variants.length === 0) return '';
  if (variants.length === 1) return variants[0];

  const last = memory.get(key);
  let idx = Math.floor(rng() * variants.length);
  if (last != null && idx === last) idx = (idx + 1) % variants.length;
  memory.set(key, idx);
  return variants[idx];
}

function atmosphereTail({ metrics, pick, messages }) {
  if (!metrics) return '';

  if (metrics.paintingCommit >= 0.95) return pick('tail:paintingCommit', messages.tail.paintingCommit);
  if (metrics.residue >= 0.45) return pick('tail:residue', messages.tail.residue);
  if (metrics.orientationError >= 0.5) return pick('tail:orientationError', messages.tail.orientationError);
  if (metrics.fogPressure > metrics.edgePressure + 0.12) return pick('tail:fogDominant', messages.tail.fogDominant);
  if (metrics.edgePressure > metrics.fogPressure + 0.12)
    return pick('tail:edgeDominant', messages.tail.edgeDominant);
  return pick('tail:balance', messages.tail.balance);
}

export class ConceptualLogProcess {
  constructor({ rng = Math.random, language = 'en' } = {}) {
    this.rng = rng;
    this.pickMemory = new Map();
    this.events = [];
    this.maxEvents = 24;
    this.sequence = 0;
    this.lastQueuedType = null;
    this.lastQueuedAtMs = 0;
    this.messages = MESSAGE_SETS[resolveLanguage(language)];
  }

  pick(key, variants) {
    return pickFrom({ rng: this.rng, memory: this.pickMemory, key, variants });
  }

  onEnqueue(intent, nowMs) {
    if (intent.params?.seed) return null;
    if (intent.type === this.lastQueuedType && nowMs - this.lastQueuedAtMs < 650) return null;

    this.lastQueuedType = intent.type;
    this.lastQueuedAtMs = nowMs;

    const text = this.pick(
      `queued:${intent.type}`,
      this.messages.queued[intent.type] ?? this.messages.fallback.queued
    );
    return this.push({ nowMs, text, phase: 'gesture' });
  }

  onApplied(intent, nowMs, metrics) {
    if (intent.params?.seed) return null;
    const lead = this.pick(
      `applied:${intent.type}`,
      this.messages.applied[intent.type] ?? this.messages.fallback.applied
    );
    const tail = atmosphereTail({ metrics, messages: this.messages, pick: (k, v) => this.pick(k, v) });
    const text = tail ? `${lead} ${tail}` : lead;
    return this.push({ nowMs, text, phase: 'manifest' });
  }

  push({ nowMs, text, phase }) {
    const event = {
      id: `concept-${nowMs}-${this.sequence++}`,
      at: nowMs,
      clock: clockText(nowMs),
      phase,
      text,
    };
    this.events.push(event);
    if (this.events.length > this.maxEvents) {
      this.events.splice(0, this.events.length - this.maxEvents);
    }
    return event;
  }

  snapshot() {
    return this.events.slice();
  }
}
