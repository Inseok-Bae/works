const QUEUED_MESSAGES = {
  LISTEN_HOLD: [
    '너는 모호한 목소리 쪽으로 귀를 더 오래 기울인다.',
    '너는 잠깐 멈춰 서서, 들려오는 쪽을 더듬는다.',
    '너는 이유 없는 우울의 속도에 맞춰, 천천히 더 가까이 듣는다.',
    '너는 잠들기 전처럼 조용히, 귀를 안쪽으로 옮겨 놓는다.',
  ],
  SHARPEN_STROKE: [
    '너는 흐릿한 경계를 더 단단한 모서리로 밀어 붙인다.',
    '너는 메시지를 또렷하게 만들기 위해, 경계를 각지게 다듬는다.',
    '너는 뭉게 구름을 잘라내듯, 선을 세운다.',
    '너는 모호함을 견디지 못해, 표면을 딱딱하게 굳히려 한다.',
  ],
  SMUDGE_STROKE: [
    '너는 굳은 선을 다시 번지게 하며 틈을 만든다.',
    '너는 각진 경계의 끝을 문지르며, 흐림을 되돌린다.',
    '너는 딱딱해진 면을 풀어, 구름이 다시 스며들게 한다.',
    '너는 명확함의 칼날을 잠시 눕혀, 모호함이 지나갈 길을 낸다.',
  ],
  PULL_EAR: [
    '너는 흔들리는 방향감을 붙잡으려 귀를 당긴다.',
    '너는 걷는 와중에도, 갈피를 잡기 위해 귀를 쭉 잡아당긴다.',
    '너는 어지럼의 한가운데서, 어느 쪽이 집인지 확인하려 한다.',
  ],
  COMMIT_PAINTING: [
    '너는 보라색 장면을 벽에 고정하려는 결심을 올린다.',
    '너는 커다란 보라색 그림을 걸어 둘 자리를 떠올린다.',
    '너는 흔들리는 장면을 “붙여 두기” 위해, 결심의 못을 꺼낸다.',
  ],
  TOGGLE_ZOOM: [
    '너는 장면의 거리를 바꾸며 관계를 다시 읽는다.',
    '너는 한 걸음 물러나거나 다가가며, 같은 장면을 다른 해상도로 본다.',
    '너는 구조와 감각 사이에서, 시선을 옮긴다.',
  ],
  RESET_SOFT: [
    '너는 과열된 표면을 잠시 가라앉히려 숨을 고른다.',
    '너는 딱딱해지려는 속도를 늦추고, 한 번 더 여지를 남긴다.',
    '너는 스스로 만든 긴장을 잠깐 풀어, 맥박을 낮춘다.',
  ],
};

const APPLIED_MESSAGES = {
  LISTEN_HOLD: [
    '기울인 귀가 안개의 결을 다시 깨운다.',
    '느린 청취가 장면의 모호함을 다시 불러낸다.',
    '목소리의 잔향이 표면을 아주 얇게 흔든다.',
    '듣는 쪽으로 세계가 조금 기운다.',
  ],
  SHARPEN_STROKE: [
    '경계의 각이 조금 더 살아난다.',
    '선이 세워지며 장면이 단단해진다.',
    '모호함이 한 번 밀려나고, 모서리가 남는다.',
    '각지게 다듬은 자리에서, 딱딱한 표면이 자란다.',
  ],
  SMUDGE_STROKE: [
    '딱딱한 면이 조금 풀리며 퍼진다.',
    '굳은 선이 흐려지고, 안개가 다시 스민다.',
    '경계가 미끄러지며, 장면이 다시 뭉게진다.',
    '선의 고집이 한숨처럼 느슨해진다.',
  ],
  PULL_EAR: [
    '흔들리던 갈피가 잠시 정렬된다.',
    '방향감이 잠깐 잡히고, 흔들림이 줄어든다.',
    '어지럼이 한 박자 늦춰지고, 길이 잠깐 보인다.',
  ],
  COMMIT_PAINTING: [
    '보라색 결심이 벽 쪽으로 천천히 굳는다.',
    '장면이 “걸리는” 쪽으로, 시간이 응고되기 시작한다.',
    '흔들리던 보라가 고정점을 찾는다.',
  ],
  TOGGLE_ZOOM: [
    '관계의 해상도가 다른 층으로 넘어간다.',
    '같은 장면이 다른 크기로 읽히며, 의미의 간격이 바뀐다.',
    '구조와 감각의 비율이 살짝 뒤바뀐다.',
  ],
  RESET_SOFT: [
    '과하게 굳은 긴장이 한 단계 내려간다.',
    '표면이 조금 식으며, 비용이 잠깐 멈춘다.',
    '숨을 고른 자리에서, 세계가 과열을 놓친다.',
  ],
};

function clockText(nowMs) {
  const d = new Date(nowMs);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

function pickFrom({ rng, memory, key, variants }) {
  const options = toArray(variants);
  if (options.length === 0) return '';
  if (options.length === 1) return options[0];

  const last = memory.get(key);
  let idx = Math.floor(rng() * options.length);
  if (last != null && idx === last) idx = (idx + 1) % options.length;
  memory.set(key, idx);
  return options[idx];
}

function atmosphereTail({ metrics, pick }) {
  if (!metrics) return '';

  if (metrics.paintingCommit >= 0.95) {
    return pick('tail:paintingCommit', [
      '보라색 그림이 벽에 거의 붙었다.',
      '보라색의 고정이 거의 끝났다.',
    ]);
  }

  if (metrics.residue >= 0.45) {
    return pick('tail:residue', [
      '굳은 잔여가 냄새처럼 떠돈다.',
      '치석 같은 잔여가 입안처럼 붙어 있다.',
      '남은 부산물이 공기를 탁하게 만든다.',
    ]);
  }

  if (metrics.orientationError >= 0.5) {
    return pick('tail:orientationError', [
      '갈피가 아직 크게 흔들린다.',
      '어디로 가야 할지, 방향감이 어긋난다.',
      '걷는 와중에 길이 자주 빠진다.',
    ]);
  }

  if (metrics.fogPressure > metrics.edgePressure + 0.12) {
    return pick('tail:fogDominant', [
      '안개가 경계를 다시 감싼다.',
      '뭉게 구름이 모서리를 덮는다.',
    ]);
  }

  if (metrics.edgePressure > metrics.fogPressure + 0.12) {
    return pick('tail:edgeDominant', [
      '경계가 안개를 조금 밀어낸다.',
      '모서리가 구름을 잘라낸다.',
    ]);
  }

  return pick('tail:balance', [
    '팽팽한 균형이 낮은 호흡으로 이어진다.',
    '둘 사이가 어느 쪽도 완전히 이기지 못한 채 유지된다.',
  ]);
}

export class ConceptualLogProcess {
  constructor({ rng = Math.random } = {}) {
    this.rng = rng;
    this.pickMemory = new Map();
    this.events = [];
    this.maxEvents = 24;
    this.sequence = 0;
    this.lastQueuedType = null;
    this.lastQueuedAtMs = 0;
  }

  pick(key, variants) {
    return pickFrom({ rng: this.rng, memory: this.pickMemory, key, variants });
  }

  onEnqueue(intent, nowMs) {
    if (intent.params?.seed) return null;
    if (intent.type === this.lastQueuedType && nowMs - this.lastQueuedAtMs < 650) return null;

    this.lastQueuedType = intent.type;
    this.lastQueuedAtMs = nowMs;

    const text = this.pick(`queued:${intent.type}`, QUEUED_MESSAGES[intent.type] || [
      '너는 세계의 결을 아주 조금 건드린다.',
      '너는 규칙의 표면을 조용히 스친다.',
      '너는 장면의 기울기를 아주 조금 바꾼다.',
    ]);
    return this.push({ nowMs, text, phase: 'gesture' });
  }

  onApplied(intent, nowMs, metrics) {
    if (intent.params?.seed) return null;
    const lead = this.pick(`applied:${intent.type}`, APPLIED_MESSAGES[intent.type] || [
      '세계의 결이 조용히 다른 쪽으로 기울었다.',
      '규칙이 아주 낮게 울리며 자리를 바꿨다.',
      '장면이 조용히 다른 배열을 취했다.',
    ]);
    const tail = atmosphereTail({ metrics, pick: (k, v) => this.pick(k, v) });
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
