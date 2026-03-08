---
name: curator-reflection-loop
description: Curate and review a proposed or built artwork in this repo, record preflight/build reviews and user sessions, and sync reusable lessons into studio-memory and rule-update plans. Use when the user wants curator-style explanation, review-backed iteration, or learning to carry into future pieces.
---

# Curator Reflection Loop

## Inputs

- `project-folder`: target piece folder
- `mode` (optional): `post-build` by default
  - `preflight`
  - `post-build`
  - `session-append`
  - `memory-sync`
  - `apply-rules`
- `focus` (optional): a particular seam, gesture, layer, or decision to inspect

## Read By Mode

- `preflight`
  - `<project-folder>/analysis.md`
  - `<project-folder>/directions.md`
  - `<project-folder>/variation-audit.md` if present
  - `<project-folder>/spec.md`
  - repo-root `docs/studio-memory/review-ledger.md`
  - repo-root `docs/studio-memory/variation-atlas.md`
  - repo-root `docs/studio-memory/failure-patterns.md`
- `post-build`
  - `<project-folder>/README.md`
  - `<project-folder>/spec.md`
  - `<project-folder>/plan.md`
  - `<project-folder>/acting.js`
  - `<project-folder>/entities/*.js`
  - `<project-folder>/index.html`
  - `<project-folder>/index.js`
  - `<project-folder>/styles.css`
  - latest files in `<project-folder>/curation/`
- `session-append`
  - latest `preflight-*.md`, `review-*.md`, `session-*.md`, `maturity-delta-*.md` in `<project-folder>/curation/`
- `memory-sync`
  - all `*.md` files in `<project-folder>/curation/`
  - repo-root `docs/studio-memory/review-ledger.md`
  - repo-root `docs/studio-memory/variation-atlas.md`
  - repo-root `docs/studio-memory/failure-patterns.md`
  - repo-root `docs/studio-memory/promotable-rules.md`
- `apply-rules`
  - latest `rule-update-plan-*.md`
  - rule files only after explicit user approval

## Workflow

### 1) `preflight`

- Review the proposed piece before implementation.
- Check:
  - thesis vs mechanism alignment
  - variation distance from recent works
  - whether interaction is necessary or over-designed
  - whether the temporal structure has a felt ending when needed
  - whether private state remains indirect
- Write `<project-folder>/curation/preflight-YYYYMMDD-HHmm.md`.

### 2) `post-build`

- Curate the built piece with code-grounded review.
- Organize the reading through:
  - `Thesis`
  - `Mechanism`
  - `Visitor Path`
  - `Aesthetic Translation`
  - `Variation Distance`
  - `Unresolved Seam`
- Check the repo invariants:
  - log split
  - pre-roll overlay + floating menu
  - pointer-accessible interaction path
  - no log download UI
  - explicit end/restart path for time-driven works
- Write `<project-folder>/curation/review-YYYYMMDD-HHmm.md`.

### 3) `session-append`

- Keep the dialogue user-led.
- Answer the user's question, then append the exchange to `<project-folder>/curation/session-YYYYMMDD-HHmm.md`.
- Maintain or update:
  - `Preserve`
  - `Allow Distortion`
  - `Amplify`
  - `Interaction Constraint`
  - `Hidden Internal State`
- Preserve the user's wording in the transcript.

### 4) `memory-sync`

- Compress local review/session artifacts into a reusable delta.
- Write `<project-folder>/curation/maturity-delta-YYYYMMDD-HHmm.md`.
- Update repo-level memory files:
  - repo-root `docs/studio-memory/review-ledger.md`
  - repo-root `docs/studio-memory/variation-atlas.md`
  - repo-root `docs/studio-memory/failure-patterns.md`
  - repo-root `docs/studio-memory/promotable-rules.md`
- If a lesson looks reusable but not yet stable enough for rules, add or update `rule-update-plan-YYYYMMDD-HHmm.md`.

### 5) `apply-rules`

- Modify `AGENTS.md` or skill files only when the user explicitly asks to promote a rule.
- Use the latest `rule-update-plan-*.md` as the basis.

## Output Templates

### A) `preflight-YYYYMMDD-HHmm.md`

```md
# Preflight Review: <project-folder>

## 1) Curator Framing
- Thesis:
- Mechanism:
- Visitor Path:
- Aesthetic Translation:
- Variation Distance:
- Unresolved Seam:

## 2) Pre-Build Risks
- ...

## 3) Required Changes Before Implementation
- ...

## 4) Proceed Decision
- Status:
- Reason:
```

### B) `review-YYYYMMDD-HHmm.md`

```md
# Build Review: <project-folder>

## 1) Curator Framing
- Thesis:
- Mechanism:
- Visitor Path:
- Aesthetic Translation:
- Variation Distance:
- Unresolved Seam:

## 2) Invariant Checks
- Log split:
- Overlay/menu:
- Pointer path:
- End/restart:

## 3) Findings
- ...

## 4) Recommended Next Moves
- ...
```

### C) `session-YYYYMMDD-HHmm.md`

```md
# Curator Session: <project-folder>

## 1) Active Review Context
- Latest preflight:
- Latest build review:

## 2) Dialogue Transcript
Q1.
A1.
Q2.
A2.

## 3) Extracted Signals
- Preserve:
- Allow Distortion:
- Amplify:
- Interaction Constraint:
- Hidden Internal State:

## 4) Working Decisions
- ...

## 5) Pending Questions
- ...
```

### D) `maturity-delta-YYYYMMDD-HHmm.md`

```md
# Maturity Delta: <project-folder>

## 1) Preserve
- ...

## 2) Avoid Repeating
- ...

## 3) Amplify Next Time
- ...

## 4) Promote To Rule?
- Candidate:
- Evidence:
- Scope:
```

### E) `rule-update-plan-YYYYMMDD-HHmm.md`

```md
# Rule Update Plan: <project-folder>

## 1) Why Update
- ...

## 2) Candidate Changes
- File:
- Current Gap:
- Proposed Rule:
- Rationale:
- Risk:

## 3) Apply Order
1. ...
2. ...

## 4) Validation
- Check:
- Expected Evidence:
```

## Guardrails

- Keep curator claims grounded in actual files or explicit spec decisions.
- Promote local review lessons into repo-root `docs/studio-memory/*.md` before promoting them into rule files.
- Do not overwrite user dialogue with paraphrase; preserve transcript wording.
- If no meaningful finding exists, say so explicitly instead of inventing one.
