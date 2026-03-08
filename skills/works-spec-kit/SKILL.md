---
name: works-spec-kit
description: Orchestrate a multi-stage spec-kit workflow for this `works` repo from THOUGHT through analysis, divergent form options, piece spec, implementation plan, build, curator review, and memory sync. Use when the user wants a full workflow instead of a one-shot plan, or when the work needs more variation and review-driven refinement.
---

# Works Spec Kit

## Inputs

- `THOUGHT`: user-provided text.
- `mode` (optional): `plan-only` by default. Other common modes: `build`, `review-sync`.
- `project-folder` (optional): existing folder to continue working in.

## Always Read

- `references/works-piece-invariants.md`

## Read When Needed

- During divergence/spec selection:
  - `references/media-families.md`
  - `references/interaction-archetypes.md`
  - `references/rhythm-profiles.md`
- During review against repetition:
  - `references/variation-checklist.md`
  - repo-root `docs/studio-memory/review-ledger.md`
  - repo-root `docs/studio-memory/variation-atlas.md`
  - repo-root `docs/studio-memory/failure-patterns.md`
  - repo-root `docs/studio-memory/promotable-rules.md`

## Workflow

1. Run `$thought-anatomizer` to create `<project-folder>/analysis.md`.
2. Run `$form-divergence` to create `<project-folder>/directions.md`.
3. Run `$variation-audit` on the proposed directions before locking a form.
4. Run `$piece-spec-writer` to create `<project-folder>/spec.md`.
5. Run `$curator-reflection-loop` with `mode=preflight` to record a curator review before implementation.
6. If the user approves implementation, run `$implementation-plan-writer` to create `<project-folder>/plan.md`.
7. Build the piece only after `spec.md`, preflight review, and `plan.md` agree on the same form.
8. After implementation, run `$curator-reflection-loop` with `mode=post-build`.
9. If the user gives feedback, run `$curator-reflection-loop` with `mode=session-append`.
10. When a review yields reusable insight, run `$curator-reflection-loop` with `mode=memory-sync` to update repo-root `docs/studio-memory/*.md`.

## Rules

- Do not jump from raw THOUGHT straight to `plan.md` unless the user explicitly asks for a fast one-shot path.
- Treat `spec.md` as the lock point for medium, viewer role, rhythm, and interaction contract.
- Use `variation-audit` before implementation whenever two or more directions still look too close to existing pieces.
- Use curator review twice for mature work:
  - once before code (`preflight`)
  - once after code (`post-build`)
- Promote repeated lessons into repo-root `docs/studio-memory/*.md` before promoting them into `AGENTS.md` or skill rules.
- Keep review artifacts concrete and file-backed. Do not leave learning only in chat.
