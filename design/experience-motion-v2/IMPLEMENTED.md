# Experience Motion V2 — Implemented

The Experience section now switches its active tab, detail panel, visual theme, and documentary photo as one 680 ms sequence.

## Original-photo mapping

- RAHO Premier: `/images/manga/concert-panel-v2.webp`
- Sekawan Media: `/images/manga/stadium-front-panel-v1.webp`
- Genbatik: `/images/manga/arms-crossed-panel-v1.webp`
- Batikpedia: `/images/about-beach-v1.webp`

All comic treatments are CSS edits: crop, grayscale, contrast, halftone, red overlays, torn clipping, and paper framing. No generated face or pose is used.

## Motion

- active-tab hit and spark
- red/white slash masking the content replacement
- outgoing image separated into three diagonal slices
- incoming image impact with a chapter-specific burst angle
- stable stage and detail dimensions to prevent layout shifts
- instant replacement for `prefers-reduced-motion`

## Verification

- Astro check: 0 errors, 0 warnings, 0 hints
- production build completed
- all four tabs select the correct panel, theme, and image
- rapid selection settles on the latest choice
- Arrow Up/Down, Home, and End remain supported
- zero horizontal overflow at 1600 px and 390 px
- screenshots are stored in `implemented/`
