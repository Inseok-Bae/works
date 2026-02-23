# Rule Update Plan: bleeding-colors

## 1) Why Update
- 이 작품에서 반복 가능한 “규칙 레벨 질문”(언어 이음새, 자동 이벤트의 개념 로그, 로그 위생)이 드러났고, 이를 제작 규칙에 명시하면 다음 작품들이 더 빠르게 수렴하고 일관성을 유지할 수 있다.

## 2) Candidate Changes
- File: `AGENTS.md`
- Current Gap: 개념 로그 언어와 THOUGHT 언어의 관계(불일치를 결함으로 볼지, 의도적 이음새로 둘지)에 대한 명시 규칙이 없다.
- Proposed Rule: 각 작품 계획에 `개념 로그 언어`를 반드시 선언한다: `원문과 일치`, `양언어`, `의도적 불일치(이음새)` 중 하나.
- Rationale: 우연한 불일치를 방지하고, 번역의 이음새를 “의도”로 남긴다.
- Risk: 강제 규칙처럼 느껴지면 실험을 줄일 수 있으니, 금지가 아니라 체크리스트 항목으로 둔다.

- File: `skills/plan-from-thought/SKILL.md`
- Current Gap: 계획은 개념 로그 변주를 요구하지만, 사용자 의도뿐 아니라 *자동* 단계 변화(phase change)도 개념 이벤트를 내보내야 한다는 점이 명시되어 있지 않다.
- Proposed Rule: `acting.js` 체크리스트에 추가: “자동 이벤트도 개념 로그를 남기고, 사용자 입력이 없어도 publicState traces를 갱신한다.”
- Rationale: 관객이 개입하지 않아도 세계가 읽히게 하고, 조용한 상태 전이를 방지한다.
- Risk: 자동 로그가 과잉이 될 수 있으니, 임계치/레이트리밋으로 완화한다.

- File: `skills/plan-from-thought/SKILL.md`
- Current Gap: “다운로드 UI 금지”는 있으나, export 헬퍼가 UI에 연결되는 실수가 생길 여지가 있다.
- Proposed Rule: 명시 체크 추가: “로그 export UI 금지. export 헬퍼가 있어도 UI에 연결하지 않는다.”
- Rationale: 로그가 ‘관찰/전송 채널’에서 ‘관객용 산출물’로 변질되는 것을 방지한다.
- Risk: 개발 중 디버그 export가 필요할 수 있으니, UI가 아닌 코드 플래그 기반으로만 opt-in 허용.

- File: `skills/curator-reflection-loop/SKILL.md`
- Current Gap: 세션 템플릿이 Q/A를 전제로 해서, 사용자가 아직 질문을 던지지 않은 호출에서는 기록이 비어 보일 수 있다.
- Proposed Rule: “프레이밍+보류 질문”으로 세션 파일을 먼저 만들고, 이후 턴에서 transcript를 append하는 흐름을 허용한다.
- Rationale: 1회 호출에서도 루프가 성립한다.
- Risk: 하루에 세션 파일이 여러 개 생길 수 있으니, 기본은 최신 세션에 append하도록 완화한다.

## 3) Apply Order
1. `skills/plan-from-thought/SKILL.md`: 자동 이벤트 개념 로그 + 언어 선언 체크박스 추가.
2. `AGENTS.md`: “개념 로그 언어” 결정을 가볍게 명시(소프트 가이드).
3. `skills/curator-reflection-loop/SKILL.md`: “세션-선생성” 동작을 명확히.

## 4) Validation
- Check: 새 계획마다 개념 로그 언어를 명시하고, `acting.js`에 자동 이벤트 개념 로그가 포함되는가.
- Expected Evidence: 이후 작품의 `plan.md`에 해당 체크가 들어가고, 구현에서 사용자 입력 없이도 단계 변화가 개념 로그로 남으며 UI export 컨트롤이 없다.
