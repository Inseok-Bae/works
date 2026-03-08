const MESSAGE_SETS = {
  ko: {
    queued: {
      OFFER_WARMTH: [
        '온기가 먼저 표면을 스치며 들어온다.',
        '노랑의 결이 천천히 자리 잡기 시작한다.',
        '형태보다 먼저 열기가 번짐을 예고한다.',
      ],
      HOLD: [
        '압력이 한 지점을 오래 붙잡는다.',
        '붉은 긴장이 내부로 눌리듯 스며든다.',
        '손아귀의 무게가 표면을 잠시 묶어둔다.',
      ],
      RELEASE: [
        '붙잡던 힘이 풀리며 경계가 흔들린다.',
        '정지된 자리에서 다시 이동이 시작된다.',
        '비어난 틈으로 미세한 색이 번져 나간다.',
      ],
      WITHDRAW: [
        '초록은 수분이 남은 방향으로 틀어진다.',
        '바깥을 향한 이탈이 표면을 가른다.',
        '거리가 벌어지며 젖은 흔적이 길게 남는다.',
      ],
      TOGGLE_ZOOM: [
        '같은 장면을 다른 거리에서 다시 본다.',
        '시선의 축을 바꾸자 흔들림의 결이 드러난다.',
        '구조와 감각의 간격이 새로 조정된다.',
      ],
    },
    applied: {
      OFFER_WARMTH: [
        '노랑이 결을 따라 부드럽게 퍼진다.',
        '온기가 먼저 도착해 표면을 풀어낸다.',
        '희미한 빛이 젖은 층을 넓힌다.',
      ],
      HOLD: [
        '빨강이 점에 고이며 압력이 남는다.',
        '멈춘 자리 주위에 긴장된 두께가 생긴다.',
        '눌린 표면은 느린 열로 붉어진다.',
      ],
      RELEASE: [
        '단단했던 경계가 느슨해지기 시작한다.',
        '붙잡힘이 풀리자 흐름이 다시 이어진다.',
        '밀도 차이 사이로 잔색이 미끄러진다.',
      ],
      WITHDRAW: [
        '초록이 젖은 방향을 따라 밖으로 흐른다.',
        '이탈의 궤적이 가장자리로 길게 남는다.',
        '거리의 벡터가 표면 위에 선을 긋는다.',
      ],
      TOGGLE_ZOOM: [
        '같은 얼룩이 다른 해상도로 읽힌다.',
        '거리 변화가 관계의 리듬을 바꾼다.',
        '관찰의 축이 바뀌며 같은 흔적이 달리 들린다.',
      ],
      BURN_START: [
        '온기가 과열로 넘어가며 표면이 빠르게 조인다.',
        '열의 밀도가 올라가 색의 숨이 가빠진다.',
        '붉은 압력이 배경의 결까지 밀어붙인다.',
      ],
      DRY_LOCK: [
        '마름이 고정되며 번짐은 얼룩으로 굳는다.',
        '젖음이 물러나고 경계가 기억처럼 붙는다.',
        '표면은 더 이상 흐르지 않고 흔적만 남긴다.',
      ],
      FADE_OUT: [
        '얼룩의 윤곽마저 천천히 옅어진다.',
        '남아 있던 잔색이 공기 쪽으로 사라진다.',
        '기억의 층이 비워지며 빈 면이 돌아온다.',
      ],
    },
    fallback: {
      queued: [
        '작은 변화가 지연 큐 안으로 들어온다.',
        '장면은 즉시 반응하지 않고 잠시 머문다.',
        '조용한 입력이 내부 규칙으로 번역된다.',
      ],
      applied: [
        '지연된 변화가 표면으로 나타난다.',
        '규칙은 누적된 흔적을 다시 배열한다.',
        '같은 장면이 다른 리듬으로 갱신된다.',
      ],
    },
    tail: {
      drynessEmpty: [
        '마름은 이제 얼룩조차 지우는 단계로 들어간다.',
        '건조가 끝단까지 밀고 가며 남은 층을 비운다.',
      ],
      drynessStain: [
        '번짐은 멈추고 얼룩이 경계를 대신한다.',
        '젖음은 물러나고 잔색만 표면에 붙어 남는다.',
        '마른 결이 기억의 윤곽을 고정한다.',
      ],
      burn: [
        '과열의 흔들림이 아직 꺼지지 않는다.',
        '열의 압력은 배경까지 밀어붙인 채 남아 있다.',
        '표면은 짧은 숨으로 떨며 온도를 붙든다.',
      ],
      flee: [
        '초록은 계속 거리 쪽으로 방향을 잡는다.',
        '이탈의 벡터가 바깥을 향해 남아 있다.',
        '멀어지려는 힘이 화면의 결을 비튼다.',
      ],
      wet: [
        '아직 젖은 구간이 경계를 흐리게 유지한다.',
        '표면은 완전히 굳지 않고 느리게 움직인다.',
        '번짐은 끝나지 않은 채 미세하게 이어진다.',
      ],
      neutral: [
        '기억은 선명한 경계 없이 층으로 남는다.',
        '같은 색도 다른 호흡으로 다시 보인다.',
        '표면은 조용히 다음 변형을 준비한다.',
      ],
    },
  },
  en: {
    queued: {
      OFFER_WARMTH: [
        'Warmth enters first and brushes the surface.',
        'A yellow grain starts to settle in place.',
        'Heat signals spread before shape appears.',
      ],
      HOLD: [
        'Pressure holds one point for too long.',
        'Red tension presses inward through the layer.',
        'The grip leaves weight on the skin of color.',
      ],
      RELEASE: [
        'The held force loosens and edges start to sway.',
        'Motion resumes from the point that stalled.',
        'A fine stain slips through the released gap.',
      ],
      WITHDRAW: [
        'Green turns toward where moisture remains.',
        'Withdrawal cuts a route toward the outside.',
        'Distance opens and leaves a long wet trace.',
      ],
      COLOR_BLOOM: [
        'Many colors arrive at once and spill across the field.',
        'Layer after layer, mixed hues start to bloom outward.',
        'The surface opens into a crowded spectrum before drying.',
      ],
      TOGGLE_ZOOM: [
        'The same scene is read from another distance.',
        'A shifted viewpoint exposes a different rhythm.',
        'Structure and sensation are re-scaled.',
      ],
    },
    applied: {
      OFFER_WARMTH: [
        'Yellow spreads softly along the grain.',
        'Warmth arrives first and loosens the surface.',
        'A pale light widens the wet layer.',
      ],
      HOLD: [
        'Red pools at a point and pressure remains.',
        'A tense thickness forms around the pause.',
        'The pressed skin reddens under slow heat.',
      ],
      RELEASE: [
        'A rigid edge starts to loosen.',
        'Once released, flow reconnects itself.',
        'Residual color slides through density gaps.',
      ],
      WITHDRAW: [
        'Green follows moisture and drifts outward.',
        'The route of departure stretches to the rim.',
        'A distance vector draws a line on the field.',
      ],
      COLOR_BLOOM: [
        'Mixed pigments surge and spread in overlapping bands.',
        'The field swells with many hues before settling.',
        'Color crowds the surface, then starts to thin.',
      ],
      TOGGLE_ZOOM: [
        'The same stain reads at another resolution.',
        'Distance changes the rhythm of relation.',
        'A shifted gaze lets the same trace sound different.',
      ],
      BURN_START: [
        'Warmth crosses into burn and the surface tightens.',
        'Heat density rises and color breath shortens.',
        'Red pressure pushes into the background grain.',
      ],
      DRY_LOCK: [
        'Dry lock fixes spread into stain.',
        'Wetness retreats and edges cling like memory.',
        'Flow stops; only residue remains.',
      ],
      FADE_OUT: [
        'Even the contour of stain starts to fade.',
        'Remaining color thins into air.',
        'The memory layer empties toward a blank face.',
      ],
    },
    fallback: {
      queued: [
        'A small change enters the delayed queue.',
        'The scene pauses before it answers.',
        'A quiet input is translated into rule.',
      ],
      applied: [
        'A delayed change surfaces on the field.',
        'Rules rearrange accumulated traces.',
        'The same scene refreshes with a different rhythm.',
      ],
    },
    tail: {
      drynessEmpty: [
        'Dryness now erases even the stain itself.',
        'The dry phase reaches the end and clears the layer.',
      ],
      drynessStain: [
        'Spread stops, and stain replaces boundary.',
        'Wetness withdraws; residue stays attached.',
        'A dry grain fixes the contour of memory.',
      ],
      burn: [
        'The oscillation of burn is still active.',
        'Heat pressure keeps pushing through the field.',
        'The surface trembles in short breaths.',
      ],
      flee: [
        'Green keeps taking direction toward distance.',
        'Departure vectors still lean outward.',
        'The urge to leave twists the grain of the scene.',
      ],
      wet: [
        'Wet zones still keep boundaries soft.',
        'The surface is not fixed yet and keeps moving.',
        'Spread continues in a low, unfinished motion.',
      ],
      neutral: [
        'Memory remains in layers without hard borders.',
        'The same color returns with a different breath.',
        'The surface quietly prepares its next shift.',
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

function pickVariant({ rng, memory, key, variants }) {
  if (!Array.isArray(variants) || variants.length === 0) return '';
  if (variants.length === 1) return variants[0];
  const last = memory.get(key);
  let index = Math.floor(rng() * variants.length);
  if (last != null && index === last) index = (index + 1) % variants.length;
  memory.set(key, index);
  return variants[index];
}

function metricTail({ metrics, pick, messages }) {
  if (!metrics) return '';
  if (metrics.dryness >= 0.95) return pick('tail:drynessEmpty', messages.tail.drynessEmpty);
  if (metrics.dryness >= 0.82) return pick('tail:drynessStain', messages.tail.drynessStain);
  if (metrics.burn >= 0.58) return pick('tail:burn', messages.tail.burn);
  if (metrics.flee >= 0.45) return pick('tail:flee', messages.tail.flee);
  if (metrics.wetness >= 0.5) return pick('tail:wet', messages.tail.wet);
  return pick('tail:neutral', messages.tail.neutral);
}

export class ConceptualLogProcess {
  constructor({ rng = Math.random, maxEvents = 24, language = 'en' } = {}) {
    this.rng = rng;
    this.maxEvents = maxEvents;
    this.events = [];
    this.pickMemory = new Map();
    this.sequence = 0;
    this.lastQueuedType = null;
    this.lastQueuedAtMs = 0;
    this.lastAnyQueuedAtMs = 0;
    this.minQueuedIntervalMs = 280;
    this.lastAppliedType = null;
    this.lastAppliedAtMs = 0;
    this.lastAnyAppliedAtMs = 0;
    this.minAppliedIntervalMs = 460;
    this.lastAppliedText = '';
    this.messages = MESSAGE_SETS[resolveLanguage(language)];
  }

  pick(key, variants) {
    return pickVariant({ rng: this.rng, memory: this.pickMemory, key, variants });
  }

  onEnqueue(intention, nowMs) {
    if (!intention || intention.params?.seed) return null;
    if (nowMs - this.lastAnyQueuedAtMs < this.minQueuedIntervalMs) return null;
    if (this.lastQueuedType === intention.type && nowMs - this.lastQueuedAtMs < 620) return null;
    this.lastQueuedType = intention.type;
    this.lastQueuedAtMs = nowMs;
    this.lastAnyQueuedAtMs = nowMs;

    const text = this.pick(
      `queued:${intention.type}`,
      this.messages.queued[intention.type] ?? this.messages.fallback.queued
    );
    return this.push({ nowMs, phase: 'gesture', text });
  }

  onApplied(intention, nowMs, metrics) {
    if (!intention || intention.params?.seed) return null;
    if (nowMs - this.lastAnyAppliedAtMs < this.minAppliedIntervalMs) return null;
    if (this.lastAppliedType === intention.type && nowMs - this.lastAppliedAtMs < 850) return null;
    const lead = this.pick(
      `applied:${intention.type}`,
      this.messages.applied[intention.type] ?? this.messages.fallback.applied
    );
    const tail = metricTail({ metrics, messages: this.messages, pick: (k, v) => this.pick(k, v) });
    const text = tail ? `${lead} ${tail}` : lead;
    if (text === this.lastAppliedText && nowMs - this.lastAppliedAtMs < 1600) return null;
    this.lastAppliedType = intention.type;
    this.lastAppliedAtMs = nowMs;
    this.lastAnyAppliedAtMs = nowMs;
    this.lastAppliedText = text;
    return this.push({ nowMs, phase: 'manifest', text });
  }

  push({ nowMs, phase, text }) {
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
