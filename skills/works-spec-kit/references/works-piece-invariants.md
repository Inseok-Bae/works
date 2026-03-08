# Works Piece Invariants

Read this file before planning, building, or reviewing a piece in this repo.

## Hard Invariants

- Translate `THOUGHT -> structure -> interaction -> exhibition experience`.
- Design relationships and rules first. UI is a translation layer, not the source of meaning.
- Keep reusable concepts in `models/` only when they truly repeat across pieces.
- Keep piece-specific concepts in `<project-folder>/entities/`, one file per concept entity.
- Keep pure helpers in `<project-folder>/utils/`.
- Keep orchestration, delayed intentions, and logs in `<project-folder>/acting.js`.
- Keep DOM/Canvas/input/render code in `<project-folder>/index.js`.
- Require these files for every new piece:
  - `<project-folder>/index.html`
  - `<project-folder>/styles.css`
  - `<project-folder>/README.md`
- Keep `public/private` state separate. Private state should surface only as traces, residue, noise, error, lag, or drift.
- Map input to world rules first. Do not implement input as instant visual feedback.
- Favor delayed, accumulative, indirect, costly, or irreversible effects.
- Provide a mobile-capable pointer path even if keyboard shortcuts also exist.
- Split logs into two axes:
  - `programmatic log`: structured events, shared transport via `utils/programmatic-log-transport.js`
  - `conceptual log`: real-time UI interpretation using non-technical language
- Do not add log download UI.
- Show THOUGHT text first as a pre-roll overlay.
- After closing the overlay, provide an icon-based floating menu with at least:
  - `글 다시 보기`
  - `목차로 돌아가기`
- Keep developer-attached assets under `<project-folder>/assets/`.
- Keep `<project-folder>/README.md` bilingual with the original THOUGHT and English translation separated by `---`.

## Conditional Invariants

- If the piece is driven by time, entropy, drying, fading, or other one-way processes, specify:
  - start condition
  - phase changes
  - end condition
  - post-end UX
  - restart path
- If the piece uses a single-trigger autonomous loop, still preserve delayed/indirect causality and avoid fake instant feedback.

