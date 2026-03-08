---
name: piece-spec-writer
description: Turn a selected direction for this `works` repo into a locked artwork spec that defines medium, viewer role, temporal envelope, interaction contract, logging, assets, and success criteria. Use after `$form-divergence` and before detailed implementation planning.
---

# Piece Spec Writer

## Inputs

- `<project-folder>/analysis.md`
- `<project-folder>/directions.md`
- the selected direction

## Read First

- `../works-spec-kit/references/works-piece-invariants.md`
- `../works-spec-kit/references/media-families.md`
- `../works-spec-kit/references/interaction-archetypes.md`
- `../works-spec-kit/references/rhythm-profiles.md`
- repo-root `docs/studio-memory/review-ledger.md`
- repo-root `docs/studio-memory/failure-patterns.md`

## Procedure

1. Lock one direction from `directions.md`.
2. Translate that direction into a spec that future planning/building should follow without silently changing the medium.
3. Define:
  - thesis
  - translation agreement
  - medium/substrate
  - visitor role
  - world rules
  - interaction contract
  - temporal envelope
  - UI and sensory grammar
  - logging contract
  - assets and dependencies
  - success criteria
4. Write the result to `<project-folder>/spec.md`.

## Rules

- Do not drift into file-by-file implementation detail yet.
- Do not revert to a familiar layout shell unless the selected direction explicitly calls for it.
- If the piece is time-driven, define the loop, ending behavior, and restart path in the spec.
- If the piece is observer-led or trigger-led, keep the interaction contract sparse and intentional.

## Output Template

```md
# Spec: <working title>

## 0) Thesis
- ...

## 1) Selected Direction
- Direction:
- Why this one:

## 2) Translation Agreement
- Preserve:
- Allowed Distortion:
- Amplify:

## 3) Medium Contract
- Primary Substrate:
- Viewer Role:
- Space Metaphor:

## 4) World Rules
- Core entities/processes:
- Main tensions:
- Public/private state boundary:

## 5) Interaction Contract
- Inputs:
- What inputs change first:
- What must stay indirect or delayed:

## 6) Temporal Envelope
- Rhythm:
- Phase logic:
- End condition:
- Restart path:

## 7) UI / Sensory Grammar
- Visual language:
- Sound posture:
- Overlay / menu posture:

## 8) Logging Contract
- Programmatic log:
- Conceptual log:

## 9) Assets / Dependencies
- Required:
- Optional:
- Fallbacks:

## 10) Success Criteria
- ...

## 11) Open Questions
- ...
```
