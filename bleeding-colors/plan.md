# Plan: Bleeding Colors

## 0) TL;DR
햇볕의 노랑(어루만짐)과 뙤약볕의 빨강(붙잡힘), 떠남의 초록(수분을 찾아감)이 경계 없이 번지는 “물감-건조-얼룩-소거” 시뮬레이션을 만든다.  
세계는 젖음(번짐)과 마름(고정)을 반복하며, 각 반복은 옅어져 결국 얼룩만 남고 얼룩조차 사라진다.  
관객의 손길은 즉시 색을 그리는 입력이 아니라, 열/수분/경계-흐림의 “규칙”을 바꾸는 의도(intention)로만 들어가고 지연되어 드러난다.  
`public/private`를 분리해 내부(열빚, 기억저장, 도주 의지)는 숨기고, 흔적(번짐/거칠어짐/고정/탈색)만 남긴다.  
로그는 2축: 구조화 이벤트(전송/개발용) + 화면 해석문(관객용, 비기술 어휘).

## 1) THOUGHT Summary
따뜻한 햇볕 아래 침대 위에서 얼굴을 어루만질 때의 노랑, 뙤약볕이 되어 등가죽을 지지고 우악스런 손아귀로 움켜쥘 때의 빨강, 수분을 찾으려 나를 뿌리치고 떠날 때의 초록이 겹쳐 번진다.  
수많은 색은 선명한 경계 없이 번지고, 물감이 마르면 그곳에서 기억을 더듬으며 자다 깨다를 반복한다. 결국 얼룩만 남고, 얼룩조차 없어진다.

## 2) Extraction
- Entity: `PigmentField(물감장)`, `SunHeatProcess(햇볕-뙤약볕 과정)`, `HandTrace(손길 흔적)`, `MoistureSeeker(수분을 찾는 너)`, `DryingProcess(마름)`, `SleepWakeProcess(자다-깨다)`, `Residue(얼룩)`
- Relationship: `HandTrace → SunHeatProcess`(따뜻함이 축적되어 거칠어짐), `SunHeatProcess → PigmentField`(노랑/빨강의 번짐 규칙 변화), `MoistureSeeker → PigmentField`(초록의 이동/도주 흔적), `DryingProcess ↔ PigmentField`(번짐 가능성 소진), `SleepWakeProcess → Residue`(기억의 재생은 약해짐)
- Tension: `어루만짐 vs 움켜쥠`, `머묾 vs 떠남`, `젖음(번짐) vs 마름(고정)`, `기억의 재생 vs 소거`
- Signal (observable via UI): 노랑/빨강/초록 농도 분포, 경계의 흐림(blur)과 거칠음(grain), 마름 진행(질감/탈색), 도주 궤적(초록의 외곽 흐름), 수면/각성 호흡(밝기 리듬), 얼룩 고정 후 소거
- Time Dynamics:
  - Rhythm: slow
  - Rules:
    - 젖어 있을수록 확산이 빠르고 경계가 흐려진다.
    - “붙잡힘(홀드)”이 누적되면 열빚이 쌓여, 시간이 지난 뒤 빨강의 과열 구간이 뒤늦게 발생한다.
    - “떠남(도주)”은 초록을 압력 구간에서 바깥으로 끌어내며, 수분 중심이 멀어진다.
    - 반복되는 수면/각성은 미세한 재젖음 + 과거 색의 희미한 재현을 만들지만, 매 회차 감쇠한다.
    - 마름이 일정 이상이면 새 입력은 번지지 않고 얼룩으로만 남는다. 더 지나면 얼룩도 옅어져 비어간다.
- Space Metaphor: 침대/피부/종이를 겸한 “경계 없는 한 장” 위에서 색이 스며들고, 바깥은 떠남의 방향(외곽)으로 열린다.

## 3) Translation Agreement
- Preserve: 노랑→빨강→초록의 전환과 겹침, 경계 소실, 마름 이후 얼룩/소거로 가는 시간성, “자다 깨다”의 반복
- Allowed distortion: ‘너/나/햇볕’을 인물로 고정하지 않고, 열·수분·흔적의 과정으로 추상화(직역 대신 구조 번역)
- Amplify: 지연 인과(따뜻함이 나중에 과열로 변함), 붙잡음의 비용(마름 가속), 반복의 감쇠(기억의 재현이 점점 희미해짐)

## 4) Model/Logic Plan
- Reuse/Add shared model candidates (`models/`):
  - (이번 작품 내부 구현 우선) 추후 여러 작품에서 재사용 가능하면 `IntentionQueue`, `NonRepeatingPicker`를 `models/`로 승격 후보
- Piece concept entities (`bleeding-colors/entities/`):
  - `PigmentField.js`: 2D grid (Y/R/G + wetness + stain + dryness) 및 확산/마름/소거 규칙
  - `SunHeatProcess.js`: 따뜻함→과열 전이(열빚/구간), 빨강 구간을 “나중에” 유발
  - `MoistureSeeker.js`: 수분 중심(너)의 위치/도주 벡터, 초록 흔적의 생성 규칙
  - `SleepWakeProcess.js`: 느린 호흡 리듬 + 약한 재젖음 + 희미한 색의 재현(감쇠)
  - `IntentionQueue.js`: 지연 큐(의도 스케줄) — DOM/Canvas 금지
  - `InteractionLogger.js`: programmatic log 저장/전송 + conceptual log 이벤트 생성(텍스트는 UI로 전달)
  - `ConceptualLogProcess.js`: 의도 타입별 문장 변주(>=3), 반복 방지 선택, 상태 꼬리문(마름/과열 등)
- Orchestration rules (`bleeding-colors/acting.js`):
  - `BleedingColorsWorld`(클래스) 또는 `createWorld()`(팩토리)로 엔티티를 조합
  - `tickHz=20~30` 고정 업데이트 + 내부 `dt` 클램프
  - `enqueueIntention({ type, params })`는 항상 `IntentionQueue`로 들어가며, 실제 적용은 `drainDue(nowMs)` 이후에만 발생
  - 매 tick: (1) 지연 의도 적용 (2) Sun/Moisture/SleepWake 업데이트 (3) PigmentField 확산/마름/얼룩/소거 (4) publicState 스냅샷 갱신 (5) 로그 기록
- UI plumbing (`bleeding-colors/index.js`):
  - Canvas2D 렌더링 + 입력 수집만 담당
  - 입력은 “색을 직접 칠하기”가 아니라 `OFFER_WARMTH / HOLD / RELEASE / CHASE / WITHDRAW` 같은 의도만 enqueue
  - conceptual log는 작은 오버레이로 실시간 표시(다운로드 기능 없음)
- Public/Private state sketch:
  - Private: `heatDebt`, `seekerIntent`, `memoryEchoBuffer`, RNG state, intention queue, full-res wetness map
  - Public: downsampled pigment preview(예: 160×90), `drynessLevel(0..1)`, `edgeSoftnessHint(0..1)`, `phaseHint:{warm|burn|fade}`, `conceptualLog[]`, `logCount`

## 5) Interaction Design
- Inputs touch “world rules”, not instant effects:
  - 손길은 열/수분/도주 확률/마름 속도 같은 규칙 파라미터를 조정하고, 화면 변화는 지연·누적된 결과로만 나타난다.
  - 동일한 제스처라도 “지금의 마름/열빚”에 따라 전혀 다른 결과(노랑의 번짐 vs 빨강의 과열)가 뒤늦게 나온다.
- Delayed/accumulative/irreversible/cost mechanisms (pick >=2):
  - Delay: 모든 의도는 `200~1200ms` 지터를 가진 지연 큐로 처리(즉시 반응 금지)
  - Accumulation: `HOLD` 누적 → `heatDebt` 증가 → 나중에 `burnPhase` 발생(빨강 강화)
  - Cost/Irreversibility: 상호작용은 `dryness` 증가를 가속; `dryness>0.85`부터는 번짐이 멈추고 얼룩만 남음
  - Terminal fade: 일정 시간 `dryness>0.95`가 지속되면 얼룩도 서서히 탈색되어 공백으로 이동(리셋 버튼 기본값 없음)
- Interaction logging plan:
  - Programmatic: enqueue/apply/phase-change를 구조화 기록 + 공통 전송 유틸(`utils/programmatic-log-transport.js`) 경유(기본 sink=`console.log`)
  - Conceptual: 의도 타입별 문장 변주(>=3) + 반복 방지 + 상태 꼬리문(예: “마름이 앞서감”, “과열이 남아있음”)

## 6) UI Translation Plan
- State → visual signal mapping (>=6):
  1) `pigmentY` → 따뜻한 번짐(#F6D365) + 부드러운 bloom
  2) `pigmentR` → 과열의 번짐(#EF4444) + 미세한 grain + 경계가 약간 더 날카로움
  3) `pigmentG` → 떠남의 흐름(#22C55E) + 압력 구간에서 바깥으로 당겨지는 궤적
  4) `wetness` → 확산 속도 + blur 반경(0~18px)
  5) `drynessLevel` → 탈색 + 종이 질감 대비 + 번짐의 둔화
  6) `stain` → matte 얼룩(blur 없음, alpha 낮음)으로 오래 남음
  7) `phaseHint.burn` → 아주 약한 비네트 떨림(불투명도 ≤0.12, 지연 포함)
  8) `sleepWakePulse` → 전체 밝기의 느린 호흡(14~26s)
- Zoom layers (zoom-out / zoom-in):
  - Zoom-out: 전체 장(필드) + 마름 게이지 1줄 + 최소한의 상태 힌트
  - Zoom-in: 포인터 주변 확대 원(모바일: 길게 누름으로 토글) + 미세 입자/경계 흐림을 더 잘 보이게

## 7) Files / Change Scope
- bleeding-colors/acting.js
- bleeding-colors/entities/*
- bleeding-colors/utils/*
- bleeding-colors/index.js
- bleeding-colors/index.html
- bleeding-colors/styles.css
- bleeding-colors/README.md
- (optional) root index.html

## 8) Implementation Steps (Checklist)
- [ ] Dependencies: **no new deps** (Canvas2D + 기존 빌드(esbuild)만 사용)
- [ ] Assets:
  - (optional) `bleeding-colors/assets/paper-grain.png` (grayscale PNG, 권장 2048×2048) — 없으면 절차적 노이즈로 대체
  - (optional) `bleeding-colors/assets/sun-hum.mp3` (10~30s loop) — 없으면 무음
- [ ] `bleeding-colors/index.html`: required elements
  - `<canvas id="scene"></canvas>`
  - `<div id="hud">` 안에 `<div id="conceptLog"></div>` (최근 12~24줄, 자동 스크롤)
  - (optional controls, mobile-friendly buttons) `<button id="zoomToggle">보기</button>`, `<button id="pauseToggle">멈춤</button>`
- [ ] `bleeding-colors/styles.css`:
  - Palette (HEX): `--bg:#0B0B0F`, `--paper:#F7F2E8`, `--y:#F6D365`, `--r:#EF4444`, `--g:#22C55E`, `--ink:#E7E2D6`, `--muted:#A8A29E`
  - Animations:
    - `breath` 18s `ease-in-out` infinite (sleep/wake pulse)
    - `shimmer` 3.2s linear infinite (burn vignette; very subtle)
    - `logIn` 600ms `cubic-bezier(.2,.8,.2,1)` (concept line fade/slide)
- [ ] `bleeding-colors/entities/PigmentField.js` (no DOM/Canvas):
  - Export: `class PigmentField`
  - State (private): full-res grids `y[] r[] g[] wet[] stain[]`, internal temp buffers, `width/height`
  - Public snapshot: `getPreview({ w:160, h:90 }) -> { y:Float32Array, r:..., g:..., stain:..., drynessLevel:number, edgeSoftnessHint:number }`
  - Methods:
    - `deposit({ x01, y01, color:'Y'|'R'|'G', amount, radius, heat })` (좌표는 0..1 정규화)
    - `diffuse({ dt, diffusionK })` (wetness 기반)
    - `dry({ dt, heat })` (interaction cost 반영)
    - `fade({ dt })` (terminal fade)
- [ ] `bleeding-colors/entities/SunHeatProcess.js` (no DOM/Canvas):
  - Export: `class SunHeatProcess`
  - State (private): `heatDebt`, `phase`, `phaseT`, `warmth`
  - Methods: `applyIntention({ type, params })`, `update({ dt })`
  - Output (public hint): `getHint() -> { warmth01, burn01 }` (직접 노출은 힌트만)
- [ ] `bleeding-colors/entities/MoistureSeeker.js` (no DOM/Canvas):
  - Export: `class MoistureSeeker`
  - State (private): `pos01`, `velocity01`, `fleeDebt`
  - Methods:
    - `update({ dt, fieldPreview, burn01 })` (젖음/열에 반응해 이동)
    - `onPressure({ x01, y01, strength01 })` (압력에 도주)
  - Output: `getTrace() -> { pos01, flee01 }` (UI는 위치를 직접 표시하지 않고 초록 궤적으로만 번역)
- [ ] `bleeding-colors/entities/SleepWakeProcess.js` (no DOM/Canvas):
  - Export: `class SleepWakeProcess`
  - State: `pulse01`, `cycleMs`, `decay`
  - Methods: `update({ nowMs, dt })`, `maybeEcho({ field })` (희미한 재현 이벤트)
- [ ] `bleeding-colors/entities/IntentionQueue.js` (no DOM/Canvas):
  - Export: `class IntentionQueue`
  - API: `enqueue({ type, params, nowMs })`, `drainDue(nowMs)`, `size`
  - Rules: `lagMsBase=500`, `jitterMs=700`, 연속 enqueue는 합쳐서 저출력 유지(간격 제한)
- [ ] `bleeding-colors/entities/InteractionLogger.js` + `bleeding-colors/entities/ConceptualLogProcess.js` (no DOM/Canvas):
  - Programmatic schema example:
    - `{ t:number, type:string, phase:'enqueue'|'apply'|'auto', params:{x01?,y01?,strength01?}, metrics:{dryness:number, warmth:number, burn:number}, seed:number }`
  - Storage: `localStorage['bleeding-colors:interactionLog:v1']`에 ring buffer(JSON array)로 유지(최대 2000개)
  - Transport: `../utils/programmatic-log-transport.js`의 `createProgrammaticLogTransport({ project:'bleeding-colors' })`로 `send(payload)` 호출
  - Conceptual copy policy:
    - 의도 타입별 >=3 변주, 비기술 어휘(“클릭/드래그/휠” 금지)
    - 반복 방지(직전 문장과 동일 금지), 상태 꼬리문 선택(마름/과열/떠남)
    - 예시 intention types: `OFFER_WARMTH`, `HOLD`, `RELEASE`, `WITHDRAW`
      - `OFFER_WARMTH` variants: “노랑이 천천히 스민다.” / “살결 위로 햇볕이 얇게 눕는다.” / “따뜻함이 먼저 도착한다.”
      - `HOLD` variants: “붙잡음이 남아, 열이 늦게 따라온다.” / “손아귀의 무게가 공기를 눌러둔다.” / “잠깐의 힘이 오래 남는다.”
      - `RELEASE` variants: “놓인 자리에서 경계가 풀린다.” / “빈틈으로 번짐이 새어 나온다.” / “남은 열만이 뒤늦게 흔들린다.”
      - `WITHDRAW` variants: “초록이 멀어지는 쪽으로 길을 낸다.” / “수분이 있는 곳을 향해 자리를 비운다.” / “떠남이 먼저, 얼룩이 나중에 남는다.”
- [ ] `bleeding-colors/acting.js`:
  - Export: `acting()` returning `{ world, publicState }` (repo conventions 유지)
  - World API: `enqueueIntention({ type, params })`, `start()/stop()` 또는 `tick()` 타이머
  - Update rates: `tickHz=24` (저출력), render는 `requestAnimationFrame`
  - Intention types + mapping params:
    - `OFFER_WARMTH { x01,y01,strength01 }` (이동 속도 낮을수록 강해짐)
    - `HOLD { x01,y01,strength01,durationMs }` (길게 누름으로 축적)
    - `RELEASE { x01,y01 }`
    - `WITHDRAW { dirX,dirY, speed01 }` (빠르게 멀어질수록 도주/초록 강화)
  - Logging: enqueue 시 1회, apply 시 1회, auto phase-change(`BURN_START`, `DRY_LOCK`, `FADE_OUT`) 시 1회
- [ ] `bleeding-colors/index.js`:
  - Input handlers (mobile-first):
    - `pointerdown/move/up/cancel`로 경로 추적 → 의도 enqueue(즉시 색칠 금지)
    - 길게 누름(>420ms) → `HOLD` 반복 enqueue(200ms 간격), 해제 시 `RELEASE`
    - 빠른 이탈(짧은 시간 큰 이동) → `WITHDRAW`
    - (optional) `wheel`/`pinch`로 zoom 토글, 버튼 `#zoomToggle`로 동일 기능 제공
  - Render loop:
    - `publicState.preview`를 캔버스에 업스케일 + blur/grain/texture 적용
    - `publicState.phaseHint`로 비네트/호흡 애니메이션 적용(저강도)
  - Logs:
    - conceptual log: `#conceptLog`에 줄 추가(최대 24줄), 자동 축소/페이드(다운로드 버튼 없음)
    - programmatic log: transport는 acting 내부에서만 처리, UI는 count만 표시 가능
- [ ] `bleeding-colors/README.md`:
  - THOUGHT 원문(그대로) + 영어 번역을 `---`로 구분해 포함
  - 최소 실행 방법(예: `npm run dev`, 브라우저에서 작품 선택)과 조작 안내는 “손길/머묾/떠남” 같은 비기술 어휘로 짧게

## 9) Risks / Open Questions
- 성능: 확산 그리드는 해상도 선택에 따라 무거울 수 있음(미리보기 다운샘플 + 내부 grid 240×135 정도로 시작 권장).
- 폭력성의 표현 강도: 빨강을 “상처”로 읽히지 않게, 열·압력의 물리적 과열로 번역(톤 조절 필요).
- 소거의 타이밍: 너무 빨리 비면 허무로만 끝날 수 있음(감쇠 곡선/주기 튜닝 필요).
- “너”의 존재감: 직접 캐릭터로 보이지 않게 하되, 초록의 도주 규칙으로 충분히 읽히는지(테스트 후 조정).
