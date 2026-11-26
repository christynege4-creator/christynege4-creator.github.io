import { CATEGORIES, FEATURED_DROPS, HERO_STATS, TOOLS } from '../data';
import { startCounter } from '../components/counter';
import { voxelArt } from '../components/voxel';

function featuredCard(drop: (typeof FEATURED_DROPS)[number]): string {
  return `
    <a class="card" href="${drop.url}" target="_blank" rel="noopener">
      <div class="card__art">
        ${voxelArt(drop.accent)}
        <span class="card__badge">${drop.kind}</span>
        <span class="card__grid" aria-hidden="true"></span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${drop.name}</h3>
        <p class="card__copy">${drop.copy}</p>
        <div class="card__meta"><span>by ${drop.author}</span><span>${drop.saves}</span></div>
      </div>
      <span class="card__cta">Get access <span aria-hidden="true">↗</span></span>
    </a>
  `;
}

export function renderHome(mount: HTMLElement) {
  mount.innerHTML = `
    <section class="hero">
      <div class="hero__head" data-reveal>
        <span class="eyebrow"><span class="dot"></span>Structural Synapse · creator command center</span>
        <h1 class="display">BLOXDBASE</h1>
        <div class="hero__meta">
          <p class="lede">
            The orbital station for Bloxd.io creation. Two engines — one for logic, one
            for structure — wired into a single terminal.
          </p>
          <div class="hero__readout">
            <div><span>Node</span><strong>EU-WEST / 01</strong></div>
            <div><span>Uptime</span><strong>99.98%</strong></div>
            <div><span>Build</span><strong>v2.6.0</strong></div>
          </div>
        </div>
      </div>

      <div class="gate" data-gate data-reveal>
        <div class="gate__grid" aria-hidden="true"></div>
        <div class="gate__glow gate__glow--logic" aria-hidden="true"></div>
        <div class="gate__glow gate__glow--build" aria-hidden="true"></div>

        <a class="gate__side gate__side--logic" href="/forge" data-link data-side="logic">
          <span class="side__index">01 / logic engine</span>
          <h2 class="side__title">Bloxd<span>Blocks</span></h2>
          <p class="side__copy">
            Wire events, game APIs and control blocks in a visual workspace — then copy
            production-ready JavaScript into your world.
          </p>
          <dl class="side__specs">
            <div><dt>Events</dt><dd>07</dd></div>
            <div><dt>API methods</dt><dd>120+</dd></div>
            <div><dt>Output</dt><dd>JS · copy</dd></div>
          </dl>
          <span class="side__cta">Enter the Forge <i aria-hidden="true">→</i></span>
        </a>

        <div class="nexus">
          <span class="nexus__label">Nexus / live feed</span>
          <div class="nexus__stats">
            ${HERO_STATS.map(
              (stat, index) => `
              <div class="nexus__stat">
                <span class="nexus__num" data-counter="${index}">0</span>
                <span class="nexus__cap">${stat.label}</span>
              </div>`,
            ).join('')}
          </div>
          <div class="nexus__actions">
            <a class="btn btn--primary" href="/forge" data-link>Launch Forge</a>
            <a class="btn btn--ghost" href="/registry" data-link>Registry</a>
          </div>
          <span class="nexus__foot">SYNC 0.4s · 2 ENGINES ONLINE</span>
        </div>

        <a class="gate__side gate__side--build" href="/plinth" data-link data-side="build">
          <span class="side__index">02 / structure engine</span>
          <h2 class="side__title">Bloxd<span>Builder</span></h2>
          <p class="side__copy">
            Stack terrain, structures and props in an immersive studio. Check the build,
            then deploy it straight into your Bloxd world.
          </p>
          <dl class="side__specs">
            <div><dt>Layers</dt><dd>05</dd></div>
            <div><dt>Block library</dt><dd>1.2M</dd></div>
            <div><dt>Export</dt><dd>.bb · deploy</dd></div>
          </dl>
          <span class="side__cta">Enter the Plinth <i aria-hidden="true">→</i></span>
        </a>
      </div>
    </section>

    <section class="section" data-reveal>
      <div class="section__head">
        <span class="eyebrow">Signal summary</span>
        <h2 class="section__title">Station readouts</h2>
      </div>
      <div class="stats">
        <div class="stat"><span class="stat__num">03</span><span class="stat__label">Featured drops</span></div>
        <div class="stat"><span class="stat__num">01</span><span class="stat__label">Community script</span></div>
        <div class="stat"><span class="stat__num">04</span><span class="stat__label">Content categories</span></div>
        <div class="stat"><span class="stat__num">100%</span><span class="stat__label">Free to join</span></div>
      </div>
    </section>

    <section class="section" data-reveal>
      <div class="section__head section__head--row">
        <div>
          <span class="eyebrow">Featured content</span>
          <h2 class="section__title">Drops from the grid</h2>
        </div>
        <a class="link-arrow" href="/registry?type=asset" data-link>View registry <span aria-hidden="true">→</span></a>
      </div>
      <div class="cards">
        ${FEATURED_DROPS.map(featuredCard).join('')}
      </div>
    </section>

    <section class="section" data-reveal>
      <div class="section__head">
        <span class="eyebrow">Content categories</span>
        <h2 class="section__title">Choose your layer</h2>
      </div>
      <div class="categories">
        ${CATEGORIES.map(
          (category, index) => `
          <a class="cat" href="/registry?type=${category.type}" data-link>
            <span class="cat__index">0${index + 1}</span>
            <span class="cat__name">${category.name}</span>
            <span class="cat__note">${category.note}</span>
            <span class="cat__count">${category.count} records <i aria-hidden="true">→</i></span>
          </a>`,
        ).join('')}
      </div>
    </section>

    <section class="cta" data-reveal>
      <div class="cta__grid" aria-hidden="true"></div>
      <div class="cta__inner">
        <span class="eyebrow">Deployment ready</span>
        <h2 class="cta__title">Ready to build something?</h2>
        <p class="cta__copy">
          Open a live editor, wire your first event, and ship a world that runs on its
          own logic.
        </p>
        <div class="cta__actions">
          <a class="btn btn--primary" href="${TOOLS.blocks.url}" target="_blank" rel="noopener">
            Open BloxdBlocks <span aria-hidden="true">↗</span>
          </a>
          <a class="btn btn--ghost" href="/plinth" data-link>Open BloxdBuilder</a>
        </div>
      </div>
    </section>
  `;

  mount.querySelectorAll<HTMLElement>('[data-counter]').forEach((node) => {
    const index = Number(node.dataset.counter ?? 0);
    const stat = HERO_STATS[index];
    if (stat) startCounter(node, stat.value);
  });

  const gate = mount.querySelector<HTMLElement>('[data-gate]');
  if (gate) {
    gate.querySelectorAll<HTMLElement>('[data-side]').forEach((side) => {
      side.addEventListener('pointerenter', () => {
        gate.dataset.hover = side.dataset.side ?? '';
      });
      side.addEventListener('focus', () => {
        gate.dataset.hover = side.dataset.side ?? '';
      });
      side.addEventListener('pointerleave', () => {
        delete gate.dataset.hover;
      });
      side.addEventListener('blur', () => {
        delete gate.dataset.hover;
      });
    });
  }
}
