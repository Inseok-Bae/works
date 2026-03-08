---
name: implementation-plan-writer
description: Convert a locked piece spec for this `works` repo into a concrete file-by-file implementation plan with exact modules, handlers, assets, palette, animations, and validation steps. Use after `$piece-spec-writer` or curator preflight, when the form is already chosen.
---

# Implementation Plan Writer

## Inputs

- `<project-folder>/analysis.md`
- `<project-folder>/directions.md`
- `<project-folder>/spec.md`
- optional preflight review from `curation/`

## Read First

- `../works-spec-kit/references/works-piece-invariants.md`
- repo-root `docs/studio-memory/failure-patterns.md`
- repo-root `docs/studio-memory/promotable-rules.md`

## Procedure

1. Read the analysis, chosen direction, and locked spec.
2. Keep the chosen medium and interaction contract fixed.
3. Translate the spec into exact implementation scope:
  - files
  - classes/functions
  - input handlers
  - public/private state boundaries
  - log schema
  - palette and motion
  - assets and fallbacks
  - validation steps
4. Write the result to `<project-folder>/plan.md`.

## Rules

- Do not invent a different substrate or UI shell than the one locked in `spec.md`.
- Keep checklist items concrete enough that code can be written directly from them.
- Always include pointer-accessible interaction paths, pre-roll/menu wiring, and the two-axis log split.
- If the piece has a meaningful end state, make its start, phase changes, end, and restart explicit in the plan.

## Output Template

```md
# Plan: <working title>

## 0) TL;DR
<3-6 lines>

## 1) Spec Recap
- Thesis:
- Selected medium:
- Visitor role:
- Rhythm:

## 2) Model / Logic Plan
- Shared model candidates:
- Piece entities:
- Orchestration:
- Public/private state:

## 3) UI Translation Plan
- State -> signal mapping:
- Layout shell:
- Overlay/menu plan:

## 4) Files / Change Scope
- <project-folder>/acting.js
- <project-folder>/entities/*
- <project-folder>/utils/*
- <project-folder>/index.js
- <project-folder>/index.html
- <project-folder>/styles.css
- <project-folder>/README.md
- (optional) root index.html

## 5) Implementation Steps (Checklist)
- [ ] Dependencies:
- [ ] Assets:
- [ ] `<project-folder>/index.html`:
- [ ] `<project-folder>/styles.css`:
- [ ] `<project-folder>/entities/*`:
- [ ] `<project-folder>/utils/*`:
- [ ] `<project-folder>/acting.js`:
- [ ] Logging split:
- [ ] `<project-folder>/index.js`:
- [ ] `<project-folder>/README.md`:

## 6) Validation
- Targeted checks:
- Build/run notes:

## 7) Risks / Open Questions
- ...
```
