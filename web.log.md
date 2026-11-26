# web.log

Running build log for **BloxdBase** — the Bloxd.io creator command center.
Newest entries first. Each entry records what changed on the web surface and how it was
checked, so the next session knows where the seams are.

---

## 2026-11-26 · v2.6.0 — launch build

**Status:** all four views live, both engines connected.

### Nexus (`/`)
- Hero station readout (node / uptime / build), animated counters for builds, scripted
  blocks, creators online and wired nodes.
- Category matrix (texture packs, mods, schematics, world tools) with per-type accents.
- Featured drops strip — three cards (Gravity Shift Mod, Spawn Castle, Neon Cyber Pack)
  with voxel artwork and external "get access" links.
- **Checked:** `/` renders with counters animating and no console errors.

### The Logic Forge (`/forge`)
- Three-pane workbench: 07 logic cartridges (event / action / control / value), the live
  BloxdBlocks editor embedded from
  `christynege4-creator.github.io/bloxdblocks2/bloxdcodetool.html`, and a reference
  terminal of `api.*` commands.
- Selecting a cartridge prints its snippet and copies it; the terminal lists signatures
  for quick lookup.
- **Checked:** the iframe loads the editor cross-origin with no local configuration. If
  the upstream page is down the frame shows its own error page and the workbench around it
  keeps working.

### Architect's Plinth (`/plinth`)
- Full-bleed isometric stage built from generated voxel geometry, five-layer stack
  (terrain → structures → props → lighting → scripts) with the scripts layer off by
  default, blueprint/render mode toggle.
- Deploy hand-off validates the stack, then links out to BloxdBuilder.
- **Open item:** BloxdBuilder's root URL (`christynege4-creator.github.io`) serves an empty
  document, so the Plinth deliberately does **not** frame it. Swap in a frame once that
  site ships a real page and `TOOLS.builder.url` points at it.

### The Global Registry (`/registry`)
- 12 indexed nodes across logic / structure / asset / core, with free-text search across
  name, kind, note and tags, plus type filters. Filter state is readable from the URL
  (`/registry?type=logic`).

### Shell
- Header with sliding nav indicator (Nexus / Forge / Plinth / Registry) and persistent
  BloxdBlocks + Launch Forge actions.
- Footer as a blueprint tree (`bloxdbase/`, `forge/`, `plinth/`, `registry/`,
  `external/`) plus an external-node list and a build readout.
- Single scan beam, hairline grid overlays, reveal-on-scroll — all gated on
  `prefers-reduced-motion`.

### Notes for the next build
- Clipboard writes only succeed from a real click in a focused tab; the headless
  verification browser has no focus, so the terminal prints the snippet to the console and
  the toast reports the fallback. This is expected, not a bug.
- All external destinations are in `src/data.ts` — the only file to touch when a tool
  moves.
- No `package.json` in the repo: the dev server is plain `npx vite`. Adding one is safe;
  keep Vite ≥ 6.1 so the platform's `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` still applies.

---

## 2026-11-26 · assets

- Brand mark `assets/logo.png` and `assets/favicon.png` uploaded and wired into the shell;
  the earlier `bloxdblocks.logo.png` / `favicon.ico` iterations were removed.
- Favicons referenced as `/assets/favicon.png`; theme colour `#0A0B10`.

---

## 2026-11-26 · foundation

- Vite + TypeScript project with a zero-framework DOM layer: `index.html` shell, a tiny
  history-API router (`src/router.ts`) and per-view render functions in `src/pages/`.
- "Structural Synapse" design system: charcoal base, teal/orange accents, Space Grotesk +
  JetBrains Mono, tokenised in `index.css`.
- Routing covers `/`, `/forge`, `/plinth`, `/registry` with an in-shell 404 fallback.
