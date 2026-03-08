# Rule Update Plan: bleeding-colors (2026-02-23 21:26)

## 1) Why Update
- `bleeding-colors`는 “겹침→마름→소거”가 끝까지 가야 문장이 완성되는데, 인터랙션 작품에서는 **루프의 종결(끝)**이 명시되지 않으면 여운이 약해질 수 있음이 드러났다.
- 기존 규칙들은 프리롤(THOUGHT overlay)·로그 2축·지연 반응을 잘 다루지만, **시간/마름/소거 같은 과정이 ‘한 번 끝나야 하는’ 작품**에 대한 설계 체크가 부족하다.

## 2) Candidate Changes
- File: `AGENTS.md`
  - Current Gap: “과정 기반 모델링/리듬”은 있으나, **종결 상태(END)와 재시작 경로**를 기본 체크로 요구하지 않음.
  - Proposed Rule:
    - 시간 축이 핵심인 작품은 `Loop(phase)`를 명시한다: 시작 조건, 전이 조건, 종료 조건, 종료 후 UX(정지/백지/얼룩 유지)와 재시작(메뉴/버튼/새로고침 유도 금지)까지 포함.
    - 종료 구간에서는 “입력의 효능이 바뀌거나 감소하는 규칙(무력/지연/고정)”을 최소 1개 포함해, 끝이 다가오는 감각을 만든다.
  - Rationale: 인터랙션이 무한히 반복되면 생각의 문장 구조가 평면화되기 쉬움.
  - Risk: 모든 작품에 강제하면 제약이 될 수 있으니, “과정 기반(시간·엔트로피)이 전면인 작품”에 한정하는 조건을 둔다.

- File: `skills/plan-from-thought/SKILL.md`
  - Current Gap: plan 템플릿에서 `time dynamics`는 다루지만, **끝(END)과 재시작 UX**를 체크리스트로 강제하지 않음.
  - Proposed Rule:
    - Implementation Steps에 “Loop design” 항목 추가: phase 목록 + 전이 조건 + 종료 조건 + 종료 후 화면 상태 + 재시작 액션.
    - “시간이 UI에 어떻게 읽히는지”를 최소 2개 신호(질감/리듬/입력 비용/밀도 변화 등)로 명시하도록 요구.
  - Rationale: thought가 ‘끝’까지 밀고 가는 구조일 때 구현이 더 설득력 있어짐.
  - Risk: 계획이 길어질 수 있으니 ‘필수 1줄 요약 + 선택 세부’로 단계화.

- File: `skills/plan-from-thought/SKILL.md`
  - Current Gap: 인터랙션을 “여러 제스처 설계”로 과잉 설계하기 쉬운데, thought가 “우연히 촉발되고 불가역으로 진행되는” 구조일 때 **단일 트리거(닿음) + 자동 루프**가 더 맞을 수 있다는 선택지가 템플릿에 없음.
  - Proposed Rule:
    - “Interaction Minimalism (optional)” 항목 추가: `single trigger → autonomous loop` 패턴을 허용하고, 그 경우 입력은 `시작/재시작`에 국한될 수 있음을 명시한다.
    - 단일 트리거를 택해도 “즉시 시각 반응 금지/지연·누적·비가역” 원칙은 유지하도록 체크한다.
  - Rationale: 관객을 조작자가 아니라 “촉발자”로 두는 작품에서 플롯/여운이 선명해짐.
  - Risk: 최소주의가 무책임한 단순화가 되지 않게, 자동 루프의 신호(시간이 읽히는 UI 매핑)를 함께 요구해야 함.

- File: `skills/curator-reflection-loop/SKILL.md`
  - Current Gap: Unresolved seam을 뽑을 때 “종결/여운”이 누락될 수 있음.
  - Proposed Rule:
    - `Unresolved Seam` 점검에 “loop end(종결) 감각이 존재하는가?” 체크 추가.
    - Dialogue에서 “끝이 필요하다면, 끝을 무엇으로 느끼게 할지(정지/백지/얼룩/무력)”를 질문 프롬프트로 제공.
  - Rationale: 큐레이터 리뷰가 UX-구조를 함께 다루게 됨.
  - Risk: 프롬프트가 과잉이 되지 않게 1문장 프롬프트로 제한.

## 3) Apply Order (Plan)
1. `skills/plan-from-thought/SKILL.md`: Loop/End/Restart 체크리스트 추가(필수/선택 분리).
2. `AGENTS.md`: “과정 기반 작품의 종결” 규칙을 조건부(해당 시)로 삽입.
3. `skills/curator-reflection-loop/SKILL.md`: 종결 감각 점검 프롬프트 보강.

## 4) Validation
- Check: 새 작품 plan에서 `Loop phases + 종료 조건 + 재시작 UX`가 빠지지 않는지 확인.
- Expected Evidence: 구현 후 관객이 설명 없이도 “이제 마른다 / 고정됐다 / 끝났다”를 질감·리듬·입력 효능 변화로 체감하고, 메뉴에서 재시작을 선택할 수 있음.
