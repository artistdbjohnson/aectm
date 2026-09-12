# AECTM Design Meeting — Factory Transplant

**Domain:** UI/UX — factory transplant (pitch). Portuguese public school cluster (Castro Marim).  
**Source:** https://aectm.pt/  
**Date:** 2026-09-12

## Craft vote

**WINNER: Motionsites `duolingo-styleguide-hero`**

Rationale (education / onboarding IA fit):
- Explicit education craft: friendly hierarchy, uppercase section labels, 3D pressed CTAs, rounded cards, clear type scale.
- Better family/student portal tone than `aurora-onboard` (dark signup / studio registration).
- Applied richly with **recolor** — not a Duolingo green clone. Algarve institutional palette: sea teal `#0B8FAD`, warm sun `#F5A623`, deep navy `#0F1B2D`, chalk white, soft sand surfaces. Nunito (craft primary) + clean geometric display.

`aurora-onboard` lost: two-column dark signup IA does not map to school information architecture (news, estrutura, alunos, documentos).

Framer free education template: not needed — Motionsites won IA fit.

## Loader choice (kill the blue bars)

**OriginKit `stagger-text-rise`** revealing:
1. “AECTM”
2. “Agrupamento de Escolas de Castro Marim”
then quiet dissolve into the app shell.

- School-appropriate quiet luxury; no neon thinking-orbs; no WordPress blue signal-bar splash.
- `prefers-reduced-motion: reduce` → static mark (logo + wordmark), no stagger.
- Hallmark microinteraction status recipe consulted; stagger-text-rise preferred for brand reveal ceremony.

## Axiom twists (applied)

1. **Logo-collapse sticky nav** — Hero-scale mark morphs to compact sticky bar on scroll (`layoutId`).
2. **Section-aware sticky chrome** — Active section underline via IntersectionObserver.
3. **Theme/locale as designed chrome** — Dark|light + PT|EN as tonal craft controls (not system defaults).
4. **Provenance panel (optional)** — Sliding sheet on Erasmus+ / guiding docs for project provenance.

## Locks

- PT default + EN twin (chrome + key page titles; body copy stays exact PT from live — do not invent school policy).
- Stack: React + Tailwind + Next.js + GitHub + Vercel.
- Attribution: built by dglxss → douglxss.com (localized).
- `vercel.json` = `{"cleanUrls":true,"trailingSlash":false}` only.

## Imagery

Live site photos / WP media where possible; Firefly only if gaps.
