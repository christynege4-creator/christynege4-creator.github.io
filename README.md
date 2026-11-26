# BloxdBase

The creator command center for [Bloxd.io](https://bloxd.io) — one station that wires the
**BloxdBlocks** logic engine and the **BloxdBuilder** world studio into a single terminal,
with every related resource indexed in one registry.

Built with Vite + TypeScript and a small vanilla DOM component layer. No framework, no
runtime dependencies, no backend.

---

## The four views

| Route       | View                 | What it does                                                                                                      |
| ----------- | -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `/`         | **Nexus**            | Landing station: hero readouts, live counters, category matrix, featured drops.                                    |
| `/forge`    | **The Logic Forge**  | Three-pane workbench: logic node rail, the live BloxdBlocks editor embedded in an iframe, and a command terminal.  |
| `/plinth`   | **Architect's Plinth** | Isometric construction stage with a five-layer stack, blueprint/render toggle and a validated deploy hand-off.   |
| `/registry` | **The Global Registry** | Searchable, filterable index of every external node (logic, structure, asset, core).                            |

Unknown paths render a "Signal lost" 404 inside the shell. All routing is client-side
(`history.pushState`), so deep links work without a server rewrite.

## Connected tools

| Tool         | URL                                                                        | Where it appears            |
| ------------ | -------------------------------------------------------------------------- | --------------------------- |
| BloxdBlocks  | `https://christynege4-creator.github.io/bloxdblocks2/bloxdcodetool.html`    | Embedded on `/forge`        |
| BloxdBlocks docs / download / home | `.../bloxdblocks2/{docs/docs,download,}` | Registry + header/footer links |
| BloxdBuilder | `https://christynege4-creator.github.io/`                                   | `/plinth` hand-off links    |

Every external URL lives in one place: [`src/data.ts`](src/data.ts). Nothing else in the
codebase hardcodes a destination.

> The Plinth does not frame BloxdBuilder: that URL currently serves an empty document, so
> the view renders its own isometric stage and hands off through "Open BloxdBuilder" /
> "Deploy to Bloxd". When the studio publishes a real page, point `TOOLS.builder.url` at it
> and the frame can take over.

## Running it

The project ships without a `package.json` — Vite is the only requirement.

```bash
# any machine with Node 20+
npx vite --host 0.0.0.0 --port 5173
```

Open <http://localhost:5173>.

In the Base44 sandbox the app is served by Docker Compose on **host port 3000**, from a
`node:22-alpine` image with the repository bind-mounted and Vite running in dev mode, so
edits hot-reload with no rebuild. See the environment setup notes for the Compose file,
healthcheck and preview-host configuration.

### Preview hosts

Vite accepts the sandbox preview hostname through the platform-provided
`__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` variable (appended to `server.allowedHosts` by
Vite ≥ 6.1). No `vite.config.ts` is needed today; if one is added, keep appending that
variable so the preview keeps working.

## Project layout

```
index.html              app shell — header, <main id="app">, footer, toast, scan beam
index.css               design system: tokens, layout, header/footer, hero, cards
src/main.ts             entry point: mounts chrome, registers routes, starts the router
src/router.ts           history-API router with data-link interception and popstate
src/data.ts             all content: tool URLs, logic nodes, commands, resources, drops
src/pages/              nexus (home), forge, plinth, registry
src/components/         header, footer, toast/clipboard, effects, counters, voxel art, iso stage
src/styles/pages.css    page-level layouts (workbench, studio, registry matrix)
assets/                 logo + favicon (served from /assets)
```

Content is data-driven: to add a registry entry, a logic node or a featured drop, edit
`src/data.ts` and the views pick it up.

## Design system

"Structural Synapse" / Obsidian Blueprint — a dark charcoal base (`#0A0B10`) with teal and
orange accents, Space Grotesk for display/UI and JetBrains Mono for readouts, hairline
grid overlays and a single scan beam. Tokens live at the top of `index.css`; both fonts
load from Google Fonts and degrade to system fonts when blocked.

## Behaviour notes

- **Copy to clipboard** — the Forge terminal and node cartridges copy the generated
  JavaScript. If the browser denies clipboard access (unfocused or headless tab), the
  snippet is printed to the console and the toast reports the fallback instead of failing
  silently.
- **Motion** — reveal-on-scroll and the header's sliding nav indicator respect
  `prefers-reduced-motion`.
- **No data collection** — the site stores nothing, sets no cookies and calls no API of its
  own. It only links to and frames the external tools above.

## License

[MIT](LICENSE) © 2026 BloxdBase
