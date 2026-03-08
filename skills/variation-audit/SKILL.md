---
name: variation-audit
description: Compare a proposed direction, spec, plan, or built piece in this `works` repo against recent works and studio-memory records to catch repeated forms, stale interaction patterns, and underused possibilities. Use before locking a direction and after build reviews.
---

# Variation Audit

## Inputs

- `<project-folder>/analysis.md`, `directions.md`, `spec.md`, `plan.md`, or an existing piece folder

## Read First

- `../works-spec-kit/references/variation-checklist.md`
- repo-root `docs/studio-memory/review-ledger.md`
- repo-root `docs/studio-memory/variation-atlas.md`
- repo-root `docs/studio-memory/failure-patterns.md`
- recent piece plans or specs that look nearby

## Procedure

1. Identify the nearest comparison pieces or plans.
2. Compare on these axes:
  - substrate
  - visitor role
  - input density
  - layout shell
  - time model
  - terminal state
  - log posture
  - space metaphor
3. Flag repetitions, weak novelty, and unearned complexity.
4. Require changes when the proposal repeats 3 or more axes from a recent piece without a compensating shift elsewhere.
5. Write the result to `<project-folder>/variation-audit.md`.

## Output Template

```md
# Variation Audit: <working title>

## 1) Compared References
- ...

## 2) Repeated Axes
- ...

## 3) Underused Possibilities
- ...

## 4) Required Changes
- ...

## 5) Proceed Decision
- Status:
- Reason:
```
