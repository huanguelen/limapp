# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lima FC · Plantel — a formation builder and team roster management PWA for an amateur soccer team. UI is in Spanish.

## Development

**No build process.** This is a zero-build application. To run locally:

```bash
# Any static HTTP server works, e.g.:
npx serve .
python -m http.server 8080
```

Serve from the repo root so that `/sw.js`, `/manifest.json`, `/icons/`, and `/images/` resolve correctly. Opening `index.html` directly (via `file://`) will break Service Worker registration and Firebase module imports.

When deploying, copy all files to a static host. The `_headers` file is formatted for Netlify.

To update the Service Worker cache, bump the version string in `sw.js` (e.g., `lima-v35` → `lima-v36`).

## Architecture

Everything lives in a **single `index.html`** (≈3 000 lines):

- **Lines 1–~200** — `<head>`: meta, PWA manifest link, Google Fonts, Firebase SDK CDN imports, Google Analytics/GTM snippets.
- **Lines ~200–~1 780** — `<style>`: full CSS with design-token custom properties, component styles, animations.
- **Lines ~1 780–end** — `<body>` markup + `<script type="module">`: Firebase initialization, global `State` object, global `UI` object, all event listeners and rendering logic.

Supporting files:
- `sw.js` — Service Worker (network-first for HTML/APIs, cache-first for images/icons).
- `manifest.json` — PWA manifest.
- `_headers` — Netlify security headers + Content-Security-Policy.
- `images/` — Player photos (one `.jpg` per player, named by nickname).
- `icons/` — App icons (32, 192, 512 px + Apple touch icon).

## Data Model (Firebase Realtime Database)

Root path: `lima/`

```
partidos/
  <id>/
    fecha, rival, cancha, camiseta, tipo
    score_lima, score_rival
    stats/
      <player_name>/
        presente, goles, asistencias, amarillas, rojas, mvp
        gol_urls[]   ← video links for goals
```

## Design System

CSS custom properties defined at `:root`:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0b0e1f` | page background |
| `--surface` | `#111426` | cards / modals |
| `--blue` | `#2E3092` | brand primary |
| `--cyan` | `#00AEEF` | brand accent |
| `--gk/--def/--mid/--fwd` | cyan/blue/green/red | position colors |
| `--win/--draw/--loss` | green/yellow/red | match result colors |

Typefaces: **Bebas Neue** (headlines), **Barlow Condensed** (body), **Inter** (labels).

## Key Globals (runtime)

- `State` — app state object (`mode`, `dt`, `currentMatchStats`, `editingMatchId`, `modalMode`).
- `UI` — UI helper methods.
- Firebase `db` — Realtime Database reference, synced live.
