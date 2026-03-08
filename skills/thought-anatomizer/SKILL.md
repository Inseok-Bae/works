---
name: thought-anatomizer
description: Analyze a raw THOUGHT for this `works` repo into entities, relationships, tensions, signals, time dynamics, space metaphor, translation priorities, and folder/title candidates. Use before choosing a medium or writing a detailed plan.
---

# Thought Anatomizer

## Inputs

- `THOUGHT`: user-provided text.
- `project-folder` (optional): existing folder. If missing, derive a short English ASCII `kebab-case` slug.

## Read First

- `../works-spec-kit/references/works-piece-invariants.md`

## Procedure

1. Read the THOUGHT without choosing a final UI family yet.
2. Extract:
  - entity
  - relationship
  - tension
  - observable signal
  - time dynamics
  - space metaphor
  - structure / desire / value lenses
  - preserve / distort / amplify
  - public/private state hypotheses
  - artist question
  - likely zoom-out / zoom-in layers
3. Propose:
  - short working title
  - `<project-folder>` slug
4. Write the result to `<project-folder>/analysis.md`.

## Rules

- Ask at most 2 clarification questions, only if the THOUGHT is truly blocked by ambiguity.
- Do not lock the medium, substrate, or interaction pattern here.
- Prefer verbs and processes over essentialized identities.
- Keep the analysis concrete enough that later skills can diverge from it in multiple directions.

## Output Template

```md
# Analysis: <working title>

## 0) Working Title
- Title:
- Project Folder:

## 1) THOUGHT Summary
<compress without flipping meaning>

## 2) Core Extraction
- Entity:
- Relationship:
- Tension:
- Signal:
- Time Dynamics:
- Space Metaphor:

## 3) Lenses
- Structure:
- Desire:
- Value:

## 4) Translation Agreement
- Preserve:
- Allowed Distortion:
- Amplify:

## 5) State Hypotheses
- Public:
- Private:

## 6) Zoom Layers
- Zoom-out:
- Zoom-in:

## 7) Artist Question
- ...

## 8) Notes For Divergence
- Under-specified on purpose:
- Avoid locking too early:
```

