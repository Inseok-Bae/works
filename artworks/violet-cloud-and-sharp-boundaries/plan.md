# Plan: 보라 구름과 각진 경계

## 0) TL;DR
집으로 “돌아옴”을 기준 상태로 두고, 노래(목소리)가 과거의 보라색 안개를 다시 호출하는 느린 시스템을 만든다.  
사용자 입력은 즉시 효과가 아니라 `models`(규칙/상태)의 압력(안개 vs 경계)을 바꾸고, 결과는 지연·누적·비용으로만 드러난다.  
경계를 각지게 만들수록 단단함(치석/냄새/어지러움)이 누적되어 방향감(갈피)을 흐리게 한다.  
되돌아온 “모호한 목소리”는 주기적으로 시스템을 안개 쪽으로 당기며, 마지막에는 “보라색 그림을 걸기”라는 비가역적 커밋이 가능하다.  
모든 인터랙션은 2축 로그로 기록한다: 개발/전송용 프로그래머틱 로그와 관객용 실시간 개념 로그.

## 1) THOUGHT Summary
갑작스런 휴가 이후 ‘몇 년 더 집이라 부를 수 있는 곳’으로 돌아오는 길에, 어린 시절 엄마가 틀어두던 이소라의 노래가 다시 들린다. 그 노래는 이유 없는 우울과 느린 시선(동태 눈깔 같은 눈빛)을 형성했고, 엄마는 더 깊이 빠져들었지만 나는 보랏빛 뭉게 구름에서 빠져나오려 했다. 흐릿한 경계를 각지게 다듬고 명확한 메시지를 만들려 했지만, 각짐은 딱딱해져 치석 같은 냄새/어지러움이 되고, 걷는 중에도 귀를 잡아당겨 갈피를 찾을 만큼 방향감이 흔들린다. 그러다 어느 날 모호한 목소리가 다시 돌아오고, 커다란 보라색 그림을 사 벽에 걸어야 할지도 모른다는 생각에 닿는다.

## 2) Extraction
- Entity: `Listener(나)`, `Mother(엄마)`, `Voice(이소라/목소리)`, `AmbiguityFog(보라 뭉게 구름)`, `Boundary(각진 경계/명확한 메시지)`, `Residue(치석/냄새)`, `Home(집/돌아감)`, `Orientation(갈피/방향감)`, `PurplePainting(벽의 큰 보라 그림)`
- Relationship: `Listener ↔ Voice`(기억 호출/우울 리듬 재가동), `Mother ↔ Voice`(더 깊이 잠수하는 편향), `Listener ↔ AmbiguityFog`(탈출했다가 재진입), `Listener ↔ Boundary`(명확화 시도/딱딱해짐), `Boundary → Residue`(각짐의 비용/냄새/어지러움 생성), `Residue → Orientation`(갈피 교란/오차 증가), `Home ↔ Orientation`(돌아감이 기준이지만 불안정), `PurplePainting ↔ AmbiguityFog`(안개를 외부 객체로 고정/전시), `Listener ↔ Mother`(같은 노래를 공유하지만 다른 방향으로 움직임)
- Tension: `모호함(안개) vs 명확함(경계)`, `몰입(엄마) vs 탈출(나)`, `돌아감(집) vs 방향 상실(갈피 붕괴)`
- Signal (observable via UI): 안개 밀도/가시거리, 보라 채도/확산, 경계의 각/직선성, 냄새(입자/파형) 강도, 어지러움(카메라 흔들림) 정도, 방향 오차(목표와 궤적의 어긋남), 목소리 “재등장” 펄스, 엄마-나 거리(관계선 장력), 보라 그림의 크기/고정도
- Time Dynamics: Rhythm=slow; Rules=목소리 펄스가 주기적으로 안개를 증가시키고(지연), 경계 강화 입력은 즉시 반영되지 않고 관성으로 누적되며(누적), 과도한 경계 강화는 `Residue`를 쌓아 `Orientation`을 악화(비용)시키고, “그림 걸기”는 상태 전이를 되돌리기 어렵게 만든다(비가역).
- Space Metaphor: “집으로 가는 길/방” 위에 안개가 깔리고, 벽에 보라 그림(외부화된 안개)을 거는 장면이 중심 공간 은유가 된다.

## 3) Translation Agreement
- Preserve: 보라색 모호함이 ‘퇴치 대상’이 아니라 되돌아오는 힘이며, 명확화의 시도가 비용(냄새/어지러움/갈피 상실)을 만든다는 감각
- Allowed distortion: 이소라/엄마/나를 실존 인물 재현이 아니라 “편향을 가진 에이전트/프로세스”로 추상화(개인 서사를 규칙으로 번역)
- Amplify: 안개↔경계의 줄다리기를 ‘리듬(느림)’과 ‘비용(치석/냄새)’으로 체감되게, 마지막의 “그림 걸기”를 비가역적 커밋으로 강조

## 4) Model/Logic Plan
- Reuse/Add model candidates (`models/`): 우선 작품 전용 개념은 `violet-cloud-and-sharp-boundaries/entities/`에 엔티티별 파일로 시작(`AmbiguityField`, `BoundarySharpeningProcess`, `ResidueField`, `OrientationMetric`, `VoiceReturnProcess`, `PaintingCommitProcess` 등); 재사용성이 보이면 `models/`로 승격
- Piece-specific rules (`violet-cloud-and-sharp-boundaries/acting.js`): `fogPressure`(안개 압력) vs `edgePressure`(경계 압력) 2축을 핵심 상태로 두고, `edgePressure`가 높을수록 `residue`가 비선형으로 증가; `residue`는 `orientationError`를 키워 목표(집/기준점)로의 이동이 계속 미끄러지게 만든다; `voicePulse`는 시간 기반으로 랜덤/준주기적 재등장(확률+지연)
- Public/Private state sketch:

| Component | Public (UI) | Private (Hidden; inferred by traces) |
|---|---|---|
| ListenerAgent | 현재 위치/속도, 보이는 집중도(포커스 링), 목표 대비 궤적 | 탈출 충동/관성, “명확화 집착” |
| MotherAgent | 안개 쪽 인력(관계선 장력), 거리 | 몰입 편향(안개 선호) |
| VoiceReturnProcess | 펄스(시각/타이포), 리듬의 흔들림 | 재등장 확률/트리거(기억 저장량) |
| AmbiguityField | 안개 밀도, 보라 채도/확산 | 잠재 기억 저장량(축적 탱크) |
| BoundarySharpeningProcess | 선의 각/직선성, 두께 | 경계 부채(단단함의 빚) |
| ResidueField | 냄새 입자/노이즈, 어지러움 | 치석 질량(누적 비용) |
| PaintingCommitProcess | 벽의 그림 크기/고정 | 커밋 잠금(되돌림 저항) |

## 5) Interaction Design
- Inputs touch “world rules”, not instant effects: 사용자는 “안개/경계 압력”을 조절하는 행위를 하지만, 화면은 즉시 반짝이지 않고 관성/지연으로 반응한다(예: 경계 강화 후 몇 초 뒤 각이 생기고, 그 뒤에 냄새가 따라온다).
- Delayed/accumulative/irreversible/cost mechanisms (pick >=2): 지연(voicePulse/관성), 누적(residue/기억 저장량), 비용(orientationError·어지러움), 비가역(“보라 그림 걸기” 커밋)
- Interaction logging plan: 이벤트 단위(JSON)로 `timestamp`, `eventType`(tune/sharpen/pullEar/hangPainting/reset), `params`, `stateSnapshot(public metrics)`, `derivedSignals`를 기록; 저장은 `localStorage`(키: `violet-cloud-and-sharp-boundaries:interactionLog:v1`) + 세션 메모리 동시; UI에서 `Download log`로 `.jsonl` 또는 `.json` 내보내기

## 6) UI Translation Plan
- State → visual signal mapping (>=6): `fogPressure`→블러/가시거리 감소, `purpleSaturation`→배경 채도/그라데이션 확산, `edgePressure`→선의 직선성/각/두께, `residue`→입자성 노이즈/“냄새 파형” 레이어, `orientationError`→카메라 드리프트/미세 흔들림/목표 마커 오차, `voicePulse`→느린 타이포 박동(짧은 문구/숨), `motherDistance`→관계선 장력/길이, `paintingCommit`→벽(프레임) 사각형의 크기·고정(고정되면 안개가 벽으로 흡수되는 듯 보임)
- Zoom layers (zoom-out / zoom-in): 줌아웃은 `나-엄마-목소리` 관계 그래프 + 지표(안개/경계/잔여물/방향오차) 대시보드; 줌인은 “길/방” 장면(안개+각+냄새+어지러움)을 감각적으로 체험

## 7) Files / Change Scope
- `violet-cloud-and-sharp-boundaries/acting.js`
- `violet-cloud-and-sharp-boundaries/entities/InteractionLogger.js`
- `violet-cloud-and-sharp-boundaries/entities/IntentionQueue.js`
- `violet-cloud-and-sharp-boundaries/entities/AmbiguityField.js`
- `violet-cloud-and-sharp-boundaries/entities/BoundarySharpeningProcess.js`
- `violet-cloud-and-sharp-boundaries/entities/ResidueField.js`
- `violet-cloud-and-sharp-boundaries/entities/OrientationMetric.js`
- `violet-cloud-and-sharp-boundaries/entities/VoiceReturnProcess.js`
- `violet-cloud-and-sharp-boundaries/entities/PaintingCommitProcess.js`
- `violet-cloud-and-sharp-boundaries/utils/math.js`
- `violet-cloud-and-sharp-boundaries/utils/mulberry32.js`
- `violet-cloud-and-sharp-boundaries/index.js`
- `violet-cloud-and-sharp-boundaries/index.html`
- `violet-cloud-and-sharp-boundaries/styles.css`
- `violet-cloud-and-sharp-boundaries/README.md`
- `index.html` (optional)

## 8) Implementation Steps (Checklist)
- [ ] `<project-folder>` 확정: `violet-cloud-and-sharp-boundaries/` (폴더명 = 작품 폴더명)
- [ ] 의존성 확정: 추가 의존성 없음(기존 `mobx`만 사용). 안개/흔들림은 `Math.sin` 기반 pseudo-noise로 구현
- [ ] 개발자 첨부 assets 정책 확정(필수 0, 선택 3): `violet-cloud-and-sharp-boundaries/assets/painting.(jpg|png|webp)`, `violet-cloud-and-sharp-boundaries/assets/fog.(webm|mp4)`, `violet-cloud-and-sharp-boundaries/assets/voice.(ogg|mp3|wav)` (사용자 업로드 UI 없음). 미첨부 시: 그림/안개는 캔버스 그라데이션+수학적 drift로 대체, 목소리는 확률 펄스만 사용
- [ ] `violet-cloud-and-sharp-boundaries/index.html`: `<canvas id="stage">` + `<aside id="panel">`(metrics/controls) + `<article id="readme_section">` + `<button id="zoomToggle">`/`commitPainting`/`resetSoft` 추가
- [ ] `violet-cloud-and-sharp-boundaries/styles.css`: 팔레트 CSS 변수 정의(예: `--bg0:#07020d`, `--bg1:#14062b`, `--violet0:#cbb3ff`, `--violet1:#8b5cf6`, `--edge:#f5f3ff`, `--tartar:#d8c38a`, `--odor:#c7ff4a`) + 패널(반투명/블러) + 버튼(무광) + `prefers-reduced-motion` 대응
- [ ] `violet-cloud-and-sharp-boundaries/entities/*.js`: 개념(ENTITY/METHOD) 영역을 엔티티별 파일로 분리(예: `AmbiguityField`, `ResidueField`, `VoiceReturnProcess` 등). 엔티티는 DOM에 접근하지 않고 상태/규칙만 노출
- [ ] `violet-cloud-and-sharp-boundaries/utils/*.js`: 유틸성 순수 계산 로직(`clamp`, easing, RNG 등)을 분리하고, 엔티티에서 상대 import로 참조
- [ ] `violet-cloud-and-sharp-boundaries/acting.js`: 상호작용 로직 전개(엔티티 조합/업데이트/지연 큐/로그). `export const acting = () => { ... }`로 월드 생성, 반환값은 `{ world, publicState }` (UI는 `publicState`만 구독)
- [ ] `violet-cloud-and-sharp-boundaries/acting.js`: `class VioletCloudWorld`(단일 진입점)에서 엔티티를 조합 → `intentionLagMs=1200`, `tickHz=20`, `enqueueIntention(i)`, `setAssets({ audioBuffer?, paintingBitmap?, fogVideoEl? })` 메서드 포함
- [ ] `violet-cloud-and-sharp-boundaries/acting.js`: `publicState = observable({ mode:'zoom-in'|'zoom-out', metrics:{ fogPressure, edgePressure, residue, orientationError, voicePulse, paintingCommit, motherDistance }, traces:{ boundarySegments:[], odorParticles:[], voiceMarks:[], painting:{ locked:boolean } } })` 형태로 고정(수치 범위는 0..1로 정규화)
- [ ] `violet-cloud-and-sharp-boundaries/entities/IntentionQueue.js`: 입력은 즉시 반영 금지 → 큐에 쌓고 `atMs` 이후에만 적용(지연). intention 타입 고정: `LISTEN_HOLD`, `SHARPEN_STROKE`, `SMUDGE_STROKE`, `PULL_EAR`, `COMMIT_PAINTING`, `TOGGLE_ZOOM`, `RESET_SOFT`
- [ ] `violet-cloud-and-sharp-boundaries/acting.js`: 비용 경로 수식 확정(비선형): `residue += (edgePressure^2)*0.015*dt`, `orientationError = clamp01(base + residue*0.6 + fogPressure*0.2 - earPullAssist*0.3)`; `odorParticles`는 `residue`가 임계치(>0.35) 넘으면 3초 지연 후 발생
- [ ] `violet-cloud-and-sharp-boundaries/acting.js`: “목소리 재등장” 규칙 확정: 기본은 확률 펄스(`p=0.08`/tick) + `LISTEN_HOLD` 누적 시 `p` 상승; 오디오 제공 시엔 WebAudio 엔벌로프(10~30Hz 저해상도)로 `voicePulse`를 덮어씀
- [ ] `violet-cloud-and-sharp-boundaries/acting.js`: “그림 걸기” 비가역 커밋 확정: `COMMIT_PAINTING` 수신 후 2초 지연 → `painting.locked=true`, `paintingCommit` 0→1로 6초 ease-in; locked 이후 `RESET_SOFT`는 커밋 해제 불가(되돌림 저항)
- [ ] `violet-cloud-and-sharp-boundaries/acting.js`: 로그를 2축으로 분리: (1) 프로그래머틱 로그(JSONL 스키마 `{ t:number, type:string, params:{...}, metrics:{...}, mode:string }`)는 `localStorage['violet-cloud-and-sharp-boundaries:interactionLog:v1']` 저장 + 공통 전송 유틸(`utils/programmatic-log-transport.js`) 경유 전송(현재 sink=`console.log`), (2) 개념 로그는 실시간 UI 표시용 해석 이벤트로 별도 유지
- [ ] `violet-cloud-and-sharp-boundaries/index.js`: 라이브러리 사용 고정 → `mobx`의 `autorun`으로 metrics 바(HTML) 업데이트(10Hz throttling), 렌더는 `requestAnimationFrame` 단일 루프
- [ ] `violet-cloud-and-sharp-boundaries/index.js`: 입력 매핑(정확히 고정, 모바일 우선): 캔버스 `pointerdown/move/up`로 스트로크 수집 → 1손가락(또는 마우스 좌클릭)=`SHARPEN_STROKE`, 2손가락 제스처(또는 마우스 우클릭)=`SMUDGE_STROKE`; `pinch`(또는 휠)=`PULL_EAR`; 버튼 `#listenHold` press+hold=200ms 간격 `LISTEN_HOLD`; 버튼 `#zoomToggle/#commitPainting/#resetSoft`로 각각 `TOGGLE_ZOOM/COMMIT_PAINTING/RESET_SOFT` (키보드 의존 금지, 단축키는 보조만)
- [ ] `violet-cloud-and-sharp-boundaries/index.js`: 오디오/이미지/비디오 로더 구현(정적 첨부): `./assets/`에서 `fetch`로 존재하는 파일만 best-effort 로드 → `paintingBitmap`(캔버스 프레임), `fogVideoEl`(저알파 오버레이), `audioBuffer`(후속 확장용)로 저장 후 `world.setAssets(...)`
- [ ] `violet-cloud-and-sharp-boundaries/index.js`: 캔버스 렌더 스펙 고정(형태/애니메이션): 배경=세로 그라데이션(`--bg0`→`--bg1`), 안개=보라(#8b5cf6/#cbb3ff) 원형 puff 60개(저출력) + `Math.sin` 기반 drift + (선택) `fogVideoEl` 프레임을 저알파로 오버레이, 경계=각진 폴리라인(선색 `--edge`, `lineWidth=2..6`은 edgePressure에 비례), 치석=경계 주변 점 입자(`--tartar`), 냄새=하단 파형(색 `--odor`, residue>0.35부터 3초 지연 후 등장), 어지러움=orientationError에 비례한 카메라 회전(최대 2.2deg) + 진동(6~9Hz)
- [ ] `violet-cloud-and-sharp-boundaries/index.js`: “목소리” 시각화 고정: `voicePulse`가 0.6 넘으면 1.8초 동안 중앙에 텍스트(기본 `"..."` 또는 THOUGHT 요약에서 6~10자 추출) 스케일 0.98→1.05, 알파 0→0.9→0 (ease-out)
- [ ] `violet-cloud-and-sharp-boundaries/index.js`: 프로그래머틱 로그는 공통 전송 유틸(`utils/programmatic-log-transport.js`) 경유로만 처리하고, 개념 로그는 패널에서만 실시간 표시한다(두 로그 모두 다운로드 버튼 없음)
- [ ] `violet-cloud-and-sharp-boundaries/README.md`: 원문 THOUGHT 전문 + 영어 번역(다른 작품 README처럼 `---`로 분리)
- [ ] (선택) 루트 `index.html`: 작품 목록에 `violet-cloud-and-sharp-boundaries` 링크 추가(없으면 계획 단계에선 생략 가능)

## 9) Risks / Open Questions
- 실제 오디오(이소라 노래) 재생을 포함할지, “목소리”를 시각/리듬만으로 번역할지 결정이 필요함(저작권/자산 이슈).
- “엄마”를 명시적 인물 노드로 둘지, ‘몰입 편향’이라는 익명 프로세스로 둘지에 따라 감정의 방향이 달라짐(전시 톤 선택).
