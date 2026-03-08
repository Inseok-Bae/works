---
name: form-divergence
description: Generate materially different artwork directions from an existing THOUGHT analysis in this `works` repo. Use after `$thought-anatomizer` and before locking a single form, especially when recent outputs feel too similar.
---

# Form Divergence

## Inputs

- `<project-folder>/analysis.md`
- Optional user preference about what to preserve, distort, or amplify

## Read First

- `../works-spec-kit/references/works-piece-invariants.md`
- `../works-spec-kit/references/media-families.md`
- `../works-spec-kit/references/interaction-archetypes.md`
- `../works-spec-kit/references/rhythm-profiles.md`
- `../works-spec-kit/references/variation-checklist.md`
- repo-root `docs/studio-memory/review-ledger.md`
- repo-root `docs/studio-memory/variation-atlas.md`
- repo-root `docs/studio-memory/failure-patterns.md`

## Procedure

1. Read the analysis and studio-memory files before proposing directions.
2. Produce exactly 3 directions.
3. Make each direction differ on at least 3 of these axes:
  - primary substrate
  - visitor role
  - time model
  - space metaphor
  - layout shell
  - input density
  - asset dependence
4. For each direction, explain:
  - what it preserves
  - what it amplifies
  - why the chosen medium fits
  - what repetition risk remains
5. Recommend one direction, but do not collapse the others into minor variants.
6. Write the result to `<project-folder>/directions.md`.

## Rules

- At most one direction may rely on the repo's currently familiar `field-canvas` path unless the THOUGHT explicitly requires it.
- At least one direction should reduce interaction density if the THOUGHT can sustain a trigger-only or observer-led form.
- Treat variation as structural, not cosmetic.

## Output Template

```md
# Directions: <working title>

## 0) Shared Constraints
- Preserve:
- Avoid repeating:
- Studio-memory notes used:

## 1) Direction A
- Tagline:
- Primary Substrate:
- Visitor Role:
- Time Model:
- Space Metaphor:
- Interaction Contract:
- Why It Fits:
- Main Risk:

## 2) Direction B
- Tagline:
- Primary Substrate:
- Visitor Role:
- Time Model:
- Space Metaphor:
- Interaction Contract:
- Why It Fits:
- Main Risk:

## 3) Direction C
- Tagline:
- Primary Substrate:
- Visitor Role:
- Time Model:
- Space Metaphor:
- Interaction Contract:
- Why It Fits:
- Main Risk:

## 4) Recommendation
- Pick:
- Why:
- What this choice still needs to prove:
```
